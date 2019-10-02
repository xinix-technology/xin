import { Token } from './token';
import { Filter } from './filter';

const FN_MATCHER = /([^(]+)\(([^)]*)\)/;
const FN_TOKENIZER_MATCHER = /^\s*("[^"]*"|[^,]+),?/;

export class Expr {
  static prepareFnString (string, args = []) {
    if (string.includes('(')) {
      return string;
    }

    console.warn(
      `[Deprecation] Bare fn string support will be removed from expr, please use "fn(...args)", "${string}"`
    );

    return `${string}(${args.join(', ')})`;
  }

  static validate (string) {
    string = string.trim();
    return (
      (string.startsWith('[[') && string.endsWith(']]')) ||
      (string.startsWith('{{') && string.endsWith('}}'))
    );
  }

  static unwrap (string) {
    string = string.trim();
    const mode = string[0];
    if (mode !== Expr.READONLY && mode !== Expr.READWRITE) {
      throw new Error(`Invalid expr string, "${string}"`);
    }
    return [string.slice(2, -2).trim(), mode];
  }

  static parse (string) {
    const tokens = string.split('|');
    const token = tokens[0].trim();
    const filters = tokens.slice(1).map(token => Filter.resolve(token.trim()));
    const varArgs = [];
    let args;
    let fn;

    if (token.indexOf('(') === -1) {
      args = [new Token(token)];
    } else {
      [fn, args] = Expr.parseFn(token);
    }

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg.type === Token.VARY && !varArgs.includes(arg.string)) {
        varArgs.push(arg);
      }
    }

    return { fn, args, varArgs, filters };
  }

  static parseFn (token) {
    const matches = token.match(FN_MATCHER);
    const fn = new Token(matches[1]);
    const args = rawTokenize(matches[2]).map(token => new Token(token));
    return [fn, args];
  }

  constructor (string, mode) {
    if (!mode) {
      [string, mode] = Expr.unwrap(string);
    }

    string = string.trim();

    const { fn, args, varArgs, filters } = Expr.parse(string);

    this.string = string;
    this.mode = fn ? Expr.READONLY : mode;
    this.fn = fn;
    this.args = args;
    this.varArgs = varArgs;
    this.filters = filters;
  }

  isInvocable () {
    return Boolean(this.fn);
  }

  isReadWrite () {
    return this.mode === Expr.READWRITE;
  }

  isReadOnly () {
    return this.mode === Expr.READONLY;
  }

  eval (model, args = []) {
    let value;

    if (this.fn) {
      const invokeArgs = this.args.map(arg => arg.value(model, args));
      value = this.fn.invoke(model, invokeArgs);
    } else {
      value = this.args[0].value(model, args);
    }

    return this.filters.reduce((value, filter) => filter.invoke(value), value);
  }
}

Expr.READONLY = '[';
Expr.READWRITE = '{';

function rawTokenize (str) {
  let count = 0;
  const tokens = [];

  while (str && count++ < 10) {
    const matches = str.match(FN_TOKENIZER_MATCHER);

    str = str.substr(matches[0].length);
    tokens.push(matches[1].trim());
  }

  return tokens;
}
