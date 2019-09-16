export class CallbackAccessor {
  static test (callback) {
    return typeof callback === 'function';
  }

  constructor (callback) {
    this.callback = callback;
  }

  write (value) {
    const callback = this.callback;
    callback(value);
  }
}
