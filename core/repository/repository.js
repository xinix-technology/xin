export class Repository {
  constructor (data = {}, fallbackScope = window) {
    this.data = Object.assign({
      'env.debug': false,
      'customElements.version': 'v1',
    }, data);
    this.fallbackScope = fallbackScope;
  }

  rebootstrap (data = {}, fallbackScope = this.fallbackScope) {
    console.info('Repository rebootstrapping ...');
    this.data = Object.assign(this.data, data);
    this.fallbackScope = fallbackScope;
  }

  get (id) {
    if (!isNaN(id)) {
      return this.data[id];
    }

    if (id in this.data) {
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
    if (value === undefined) {
      return this.remove(id);
    }
    this.data[id] = value;
  }

  remove (id) {
    delete this.data[id];
  }
}
