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

  value (...contexts) {
    if (this.type === 's') {
      return this._value;
    }

    for (const context of contexts) {
      if (!context) {
        continue;
      }

      const val = typeof context.get === 'function' ? context.get(this.name) : context[this.name];
      if (val !== undefined) {
        return val;
      }
    }
  }

  invoke (args, ...contexts) { // eslint-disable-line complexity
    if (contexts.length === 0) {
      throw new Error(`Cannot invoke method ${this.name} of undefined context`);
    }

    if (this.type === 's') {
      const [context] = contexts;
      throw new Error(`Method is not eligible, ${context.__templateHost.nodeName || '$anonymous'}#${this.name}`);
    }

    for (const context of contexts) {
      if (!context) {
        continue;
      }

      if (typeof context.get === 'function') {
        const ctx = this.contextName ? context.get(this.contextName) : context;
        if (typeof ctx[this.baseName] === 'function') {
          return ctx[this.baseName](...args);
        }
      } else if (typeof context[this.name] === 'function') {
        return context[this.name].apply(context, args);
      }
    }

    const [context] = contexts;
    throw new Error(`Method is not eligible, ${context.__templateHost.nodeName || '$anonymous'}#${this.name}`);
  }
}
