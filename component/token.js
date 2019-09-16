import { pathArray, val } from '../helpers';
import { Modeler } from './modeler';
import { Repository } from '../core';

const CACHE = {};
let globalContext = {};

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

  static resetGlobal () {
    globalContext = {
      $global: window,
      $repository: () => Repository.singleton(),
    };
  }

  static registerGlobal (name, resolver) {
    globalContext[name] = resolver;
  }

  constructor (name) {
    this.name = name;
    this.contextName = '';
    this.baseName = '';
    this._value = undefined;
    this.type = Token.VARIABLE;

    if (!this.name.match(/^[a-zA-Z_]/)) {
      try {
        this._value = JSON.parse(this.name);
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

  get isGlobalScoped () {
    if (this.name[0] !== '$') {
      return false;
    }

    if (this.name === '$' || this.name === '$$' || this.name[1] === '.') {
      return false;
    }

    return true;
  }

  value (...models) {
    if (this.type === Token.STATIC) {
      return this._value;
    }

    if (this.isGlobalScoped) {
      return this._valueFromGlobalContext();
    }

    return this._valueFromModels(...models);
  }

  _valueFromGlobalContext () {
    const [contextName, ...path] = pathArray(this.name);
    const model = new Modeler(val(globalContext[contextName]));
    return model.get(path);
  }

  _valueFromModels (...models) {
    for (const model of models) {
      if (!model) {
        continue;
      }

      const val = typeof model.get === 'function' ? model.get(this.name) : model[this.name];
      if (val !== undefined) {
        return val;
      }
    }
  }

  invoke (model, args) {
    if (this.type === Token.STATIC) {
      throw new Error(`Method is not eligible, ${model.is}:${model.__id}#${this.name}`);
    }

    const invoker = model.__templateInvoker;
    if (typeof invoker.get === 'function') {
      const ctx = this.contextName ? invoker.get(this.contextName) : invoker;
      if (typeof ctx[this.baseName] === 'function') {
        return ctx[this.baseName](...args);
      }
    } else if (typeof invoker[this.name] === 'function') {
      return invoker[this.name](...args);
    }

    throw new Error(`Method is not eligible, ${model.is}:${model.__id}#${this.name}`);
  }
}

Token.VARIABLE = 'v';
Token.STATIC = 's';

Token.resetGlobal();
