import { Token } from './token';
import { Filter } from './filter';

const CACHE = {
  s: {
    '[': {},
    '{': {},
  },
  v: {
    '[': {},
    '{': {},
  },
};

function _create (value, mode, type) {
  const cache = CACHE[type][mode];
  if (value in cache) {
    return cache[value];
  }

  const expr = new Expr(value, mode, type);
  if (type !== Expr.STATIC) {
    cache[value] = expr;
  }

  return expr;
}

function unwrap (value) {
  return value.slice(2, -2).trim();
}

function parseMode (value) {
  if (!value) {
    return;
  }

  if (value[0] === value[1] && (value[0] === Expr.READONLY || value[0] === Expr.READWRITE)) {
    return value[0];
  }
}

export class Expr {
  static get CACHE () {
    return CACHE;
  }

  static create (value, unwrapped = false) {
    let mode = Expr.READONLY;
    let type = Expr.VARY;

    value = value.trim();
    if (!unwrapped) {
      mode = parseMode(value);
      if (!mode) {
        type = Expr.STATIC;
        mode = Expr.READONLY;
      } else {
        value = unwrap(value);
      }
    }

    return _create(value, mode, type);
  }

  /**
   * Create new function expression
   * @param {string} value
   * @param {array} args
   * @param {boolean} unwrapped
   * @returns {Expr}
   */
  static createFn (value, args, unwrapped = false) {
    value = value.trim();
    value = value.indexOf('(') === -1 ? `${value}(${args.join(', ')})` : value;

    if (!unwrapped) {
      value = unwrap(value);
    }

    return _create(value, Expr.READONLY, Expr.VARY);
  }

  static rawTokenize (str) {
    let count = 0;
    const tokens = [];

    while (str && count++ < 10) {
      const matches = str.match(/^\s*("[^"]*"|[^,]+),?/);

      str = str.substr(matches[0].length);
      tokens.push(matches[1].trim());
    }

    return tokens;
  }

  static tokenize (str) {
    return Expr.rawTokenize(str).map(token => Token.get(token));
  }

  constructor (value, mode, type) {
    // define base properties
    this.mode = mode;
    this.type = type;
    this.name = '';
    this.args = [];
    this.filters = [];
    this.value = value;
    this.varArgs = [];
    this.originalValue = value;

    if (type === Expr.STATIC) {
      return;
    }

    const tokens = value.split('|');
    const token = tokens[0].trim();

    this.filters = tokens.slice(1).map(word => {
      return Filter.get(word.trim());
    });

    if (token.indexOf('(') === -1) {
      this.type = Expr.PROPERTY;
      this.name = token;
      this.args.push(Token.get(token));
    } else {
      // force mode to Expr.READONLY when type is not Expr.PROPERTY
      this.mode = Expr.READONLY;
      this.type = Expr.METHOD;

      const matches = token.match(/([^(]+)\(([^)]*)\)/);

      this.name = matches[1].trim();
      this.fn = Token.get(this.name);
      this.args = Expr.tokenize(matches[2]);
    }

    this.varArgs = this.args.reduce((varArgs, arg) => {
      if (arg.type === 'v' && varArgs.indexOf(arg.name) === -1) {
        varArgs.push(arg);
      }

      return varArgs;
    }, []);
  }

  returnValue (model, otherArgs) {
    if (this.type === Expr.STATIC) {
      return this.value;
    }

    return this.invoke(model, otherArgs);
  }

  invoke (model, otherArgs) {
    if (this.type === Expr.PROPERTY) {
      const val = this.args[0].value(model, otherArgs);
      return this.filters.reduce((val, filter) => filter.invoke(val), val);
    }

    const args = this.args.map(arg => {
      return arg.value(model, otherArgs);
    });

    return this.fn.invoke(model, args);
  }
}

Expr.STATIC = 's';
Expr.METHOD = 'm';
Expr.VARY = 'v';
Expr.PROPERTY = 'p';
Expr.READONLY = '[';
Expr.READWRITE = '{';
