class Async {
  constructor (context) {
    this.context = context;
    this.handle = null;
  }

  start (callback, wait) {
    if (typeof callback !== 'function') {
      throw new Error('Async should specify function');
    }

    wait = wait || 0;

    var context = this.context;
    var boundCallback = function () {
      callback.call(context);
    };
    this.handle = setTimeout(boundCallback, wait);
  }

  cancel () {
    clearTimeout(~~this.handle);
  }
};

class Debounce {
  constructor (context, immediate) {
    this.context = context;
    this.immediate = Boolean(immediate);
    this.async = null;
    this.running = false;
  }

  start (callback, wait) {
    if (this.immediate) {
      throw new Error('Unimplemented yet!');
    }

    this.running = true;
    this.async = new Async(this.context);
    this.async.start(function () {
      callback.call(this.context);
      this.running = false;
      this.async = null;
    }.bind(this), wait);
  }

  cancel () {
    this.running = false;
    this.async.cancel();
    this.async = null;
  }
}

export default { Async, Debounce };
