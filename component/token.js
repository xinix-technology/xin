import { pathArray, inspect } from '../helpers';
import { repository } from '../core';

export class Token {
  static get CACHE () {
    return CACHE;
  }

  static get (name) {
    if (name in CACHE) {
      return CACHE[name];
    }

    const token = new Token(name);
    CACHE[name] = token;
    return token;
  }

  constructor (name) {
    this.name = name;
    this.contextName = '';
    this.baseName = '';
    this.staticValue = undefined;
    this.type = Token.VARIABLE;

    if (!this.name.match(/^[a-zA-Z_]/)) {
      try {
        this.staticValue = JSON.parse(this.name);
        this.type = Token.STATIC;
        return;
      } catch (err) {
        // noop
      }
    }

    if (this.type === Token.VARIABLE) {
      const pathArr = pathArray(this.name);
      this.baseName = pathArr.pop();
      this.contextName = pathArr.join('.');
    }
  }

  value (...models) {
    if (this.type === Token.STATIC) {
      return this.staticValue;
    }

    return getValue(this.name, ...models);
  }

  invoke (model, args = []) {
    if (this.type === Token.STATIC) {
      throw new Error(`Method is not eligible for static, ${inspect(model)}#${this.name}()`);
    }

    const invoker = getInvoker(model);
    if (!repository.isSpecialScope(this.contextName) && !invoker) {
      throw new Error(`Model does not have invoker, ${inspect(invoker)}#${this.name}()`);
    }

    const context = getValue(this.contextName, invoker);
    if (typeof context[this.baseName] !== 'function') {
      throw new Error(`Method is not eligible, ${inspect(invoker)}#${this.name}()`);
    }

    return context[this.baseName](...args);
  }
}

const CACHE = {};

function getModelValue (name, ...models) {
  for (const model of models) {
    if (!model) {
      continue;
    }

    const val = typeof model.get === 'function' ? model.get(name) : model[name];
    if (val !== undefined) {
      return val;
    }
  }
}

function getValue (name, ...models) {
  if (!name) {
    return models[0];
  }

  if (repository.isSpecialScope(name)) {
    return repository.get(name);
  }

  return getModelValue(name, ...models);
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

Token.VARIABLE = 'v';
Token.STATIC = 's';
