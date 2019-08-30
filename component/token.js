const CACHE = {};

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
    this._value = null;
    this.type = 'v';

    if (!this.name.match(/^[a-zA-Z_]/)) {
      try {
        this._value = JSON.parse(this.name);
        this.type = 's';
        return;
      } catch (err) {
        // noop
      }
    }

    if (this.type === 'v') {
      const nameSegments = this.name.split('.');
      this.baseName = nameSegments.pop();
      this.contextName = nameSegments.join('.');
    }
  }

  value (...models) {
    if (this.type === 's') {
      return this._value;
    }

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

  invoke (args, model) {
    if (this.type === 's') {
      throw new Error(`Method is not eligible, ${model.is}:${model.__templateId}#${this.name}`);
    }

    const delegator = model.__templateDelegator;

    if (typeof delegator.get === 'function') {
      const ctx = this.contextName ? delegator.get(this.contextName) : delegator;
      if (typeof ctx[this.baseName] === 'function') {
        return ctx[this.baseName](...args);
      }
    } else if (typeof delegator[this.name] === 'function') {
      return delegator[this.name](...args);
    }

    throw new Error(`Method is not eligible, ${model.is}:${model.__templateId}#${this.name}`);
  }
}
