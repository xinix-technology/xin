const debug = require('debug')('xin::core');

window.xin = window.xin || {};

export class Repository {
  static bootstrap (data) {
    if (window.xin.$repository) {
      window.xin.$repository.update(data);
    } else {
      window.xin.$repository = new Repository(data);
    }

    return window.xin.$repository;
  }

  static singleton () {
    if (!window.xin.$repository) {
      Repository.bootstrap();
    }

    if (typeof window.xin.$repository.update !== 'function') {
      throw new Error('Invalid global xin repository found!');
    }

    return window.xin.$repository;
  }

  constructor (data = {}) {
    if (debug.enabled) /* istanbul ignore next */ debug('Repository construct...');
    this.data = Object.assign({
      'customElements.version': 'v1',
    }, data);
  }

  update (data = {}) {
    if (debug.enabled) /* istanbul ignore next */ debug('Repository update data...');
    this.data = Object.assign(this.data, data);
  }

  get (id) {
    return this.data[id];
  }

  put (id, value) {
    if (value === undefined) {
      return this.remove(id);
    }
    this.data[id] = value;
  }

  remove (id) {
    delete this.data[id];
  }
}
