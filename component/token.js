import { pathArray, inspect } from '../helpers';
import { repository } from '../core';

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

  value (model) {
    if (this.type === Token.STATIC) {
      return this.staticValue;
    }

    return getValue(this.string, model);
  }

  invoke (model, args = []) {
    if (this.type === Token.STATIC) {
      throw new Error(`Method is not eligible for static, ${inspect(model)}#${this.string}()`);
    }

    const invoker = getInvoker(model);
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

function getModelValue (name, model) {
  const val = typeof model.get === 'function' ? model.get(name) : model[name];
  if (val !== undefined) {
    return val;
  }
}

function getValue (name, model) {
  if (!name) {
    return model;
  }

  if (repository.isSpecialScope(name)) {
    return repository.get(name);
  }

  return getModelValue(name, model);
}

function getInvoker (model) {
  if (!model) {
    return undefined;
  }

  if (model.invoker) {
    return model.invoker;
  }

  if (model.__templateModeler) {
    return model.__templateModeler.invoker;
  }
}
