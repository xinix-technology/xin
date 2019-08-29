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

  invoke (args, ...models) {
    if (models.length === 0) {
      throw new Error(`Cannot invoke method ${this.name} of undefined model`);
    }

    if (this.type === 's') {
      const [model] = models;
      throw new Error(`Method is not eligible, ${model.__templateHost.nodeName || '$anonymous'}#${this.name}`);
    }

    for (const model of models) {
      if (!model) {
        continue;
      }

      if (typeof model.get === 'function') {
        const ctx = this.contextName ? model.get(this.contextName) : model;
        if (typeof ctx[this.baseName] === 'function') {
          return ctx[this.baseName](...args);
        }
      } else if (typeof model[this.name] === 'function') {
        return model[this.name].apply(model, args);
      }
    }

    throw new Error(`Method is not eligible, ${models[0].__templateHost.nodeName || '$anonymous'}#${this.name}`);
  }
}
