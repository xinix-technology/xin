const requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame;

const cancelAnimationFrame = window.cancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelRequestAnimationFrame || window.mozCancelAnimationFrame ||
  window.oCancelRequestAnimationFrame || window.oCancelAnimationFrame ||
  window.msCancelRequestAnimationFrame || window.msCancelAnimationFrame;

class Async {
  static nextFrame (callback) {
    requestAnimationFrame(() => {
      requestAnimationFrame(callback);
    });
  }

  static run (context, callback, wait) {
    let asyncO = new Async(context);
    asyncO.start(callback, wait);
    return asyncO;
  }

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

    if (wait) {
      this.handle = setTimeout(() => (this.frameHandle = requestAnimationFrame(boundCallback)), wait);
    } else {
      this.frameHandle = requestAnimationFrame(boundCallback);
    }
  }

  cancel () {
    cancelAnimationFrame(~~this.frameHandle);
    clearTimeout(~~this.handle);
  }
};

export default Async;
