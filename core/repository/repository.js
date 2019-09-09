const debug = require('debug')('xin:core');

export class Repository {
  static bootstrap (data) {
    let repo = window.xin$repository;
    if (repo) {
      repo.update(data);
    } else {
      repo = window.xin$repository = new Repository(data);
    }

    return repo;
  }

  /**
   * Get singleton instance of repository
   *
   * @returns {Repository}
   */
  static singleton () {
    let repo = window.xin$repository;
    if (!repo) {
      repo = Repository.bootstrap();
    }

    if (typeof repo.update !== 'function') {
      throw new Error('Invalid global xin repository found!');
    }

    return repo;
  }

  constructor (data = {}) {
    if (debug.enabled) /* istanbul ignore next */ debug('Repository construct...');
    this.data = {
      'customElements.version': 'v1',
      ...data,
    };
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
