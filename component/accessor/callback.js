export class CallbackAccessor {
  static test (callback) {
    return typeof callback === 'function';
  }

  constructor (callback) {
    this.callback = callback;
  }

  set (value) {
    const callback = this.callback;
    callback(value);
  }

  get () {
    throw new Error('CallbackAccessor is write-only');
  }
}
