class Setup {
  constructor (obj) {
    Object.assign(this, obj);
  }

  get (key) {
    return this[key];
  }

  set (key, value) {
    this[key] = value;
  }
}

export default (
  'xin' in window && 'setup' in window.xin
    ? window.xin.setup
    : new Setup(window.xin)
);
