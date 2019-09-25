import { EventEmitter } from '../events';

export class Repository extends EventEmitter {
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
    super();

    this.data = {
      'customElements.version': 'v1',
      ...data,
    };
  }

  update (data = {}) {
    this.data = {
      ...this.data,
      ...data,
    };
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
