import { Config } from './config';

export class Repository {
  static getInstance () {
    if ('xin' in window && typeof window.__xinInstance === 'function') {
      return window.__xinInstance;
    }

    let instance = window.__xinInstance = new Repository();
    let config = new Config(window.xin);
    if (config.get('customElements.version') !== 'v0') {
      config.set('customElements.version', 'v1');
    }
    instance.put('config', config);

    return window.__xinInstance;
  }

  constructor (fallbackScope = window) {
    this.data = {};
    this.fallbackScope = fallbackScope;
  }

  get (id) {
    if (!isNaN(id)) {
      return this.data[id];
    }

    if (this.data[id]) {
      return this.data[id];
    }

    let idSplitted = id.split('.');
    let scope = this.fallbackScope;
    idSplitted.find(function (token) {
      scope = scope[token];
      return !scope;
    });

    return scope;
  }

  put (id, value) {
    this.data[id] = value;
  }
}

// //   const scope = function () {
// //     return get(id);
// //   };

// //   scope.put = put;
// //   scope.setup = setup;
// //   scope.Component = Component;
// //   scope.base = base;
// //   scope.define = define;

// //   return scope;
