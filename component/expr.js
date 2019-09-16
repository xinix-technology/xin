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

export class Expr {
  static get CACHE () {
    return CACHE;
  }

  static create (value, unwrapped) {
    value = (value || '').trim();

    if (unwrapped) {
      return _create(value, Expr.READONLY, 'v');
    }

    const mode = value[0];
    if ((mode === Expr.READONLY || mode === Expr.READWRITE) && value[1] === mode) {
      value = value.slice(2, -2).trim();
      return _create(value, mode, 'v');
    }

    return _create(value, Expr.READONLY, Expr.STATIC);
  }

  /**
   * Create new function expression
   * @param {string} value
   * @param {array} args
   * @param {boolean} unwrapped
   * @returns {Expr}
   */
  static createFn (value, args, unwrapped) {
    return Expr.create(value.indexOf('(') === -1 ? `${value}(${args.join(', ')})` : value, unwrapped);
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

  // get constant () {
  //   return this.type !== Expr.METHOD && this.varArgs.length !== this.args.length;
  // }

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
Expr.PROPERTY = 'p';
Expr.READONLY = '[';
Expr.READWRITE = '{';
