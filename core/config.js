export class Config {
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
