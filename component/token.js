import { pathArray, inspect } from '../helpers';
import { repository, Context } from '../core';

const SPECIAL_STRINGS = [
  'true',
  'false',
  'null',
  'undefined',
];

const VAR_MATCHER = /^[a-zA-Z_$]/;

export class Token {
  constructor (string) {
    this.string = string;
    this.type = Token.VARY;

    if (!vary(string)) {
      try {
        this.type = Token.STATIC;
        this.staticValue = JSON.parse(string);
      } catch (err) {
        throw new Error(`Invalid token string, "${string}`);
      }
    }

    if (this.type === Token.VARY) {
      const pathArr = pathArray(string);
      this.baseName = pathArr.pop();
      this.contextName = pathArr.join('.');
    }
  }

  value (model, extendedContext) {
    if (this.type === Token.STATIC) {
      return this.staticValue;
    }

    return getValue(this.string, model, extendedContext);
  }

  invoke (model, args = []) {
    if (this.type === Token.STATIC) {
      throw new Error(`Method is not eligible for static, ${inspect(model)}#${this.string}()`);
    }

    const invoker = model.invoker;
    if (!repository.isSpecialScope(this.contextName) && !invoker) {
      throw new Error(`Model does not have invoker, ${inspect(invoker)}#${this.string}()`);
    }

    const context = getValue(this.contextName, invoker);
    if (typeof context[this.baseName] !== 'function') {
      throw new Error(`Method is not eligible, ${inspect(invoker)}#${this.string}()`);
    }

    return context[this.baseName](...args);
  }
}

Token.STATIC = 's';
Token.VARY = 'v';

function vary (string) {
  return !SPECIAL_STRINGS.includes(string) && string.match(VAR_MATCHER);
}

function getValue (name, model, extendedContext = {}) {
  if (!name) {
    return model;
  }

  if (extendedContext[name]) {
    return extendedContext[name];
  }

  if (repository.isSpecialScope(name)) {
    return repository.get(name);
  }

  if (model instanceof Context === false) {
    throw new Error('Cannot get value from non model context');
  }
  return model.get(name);
}
