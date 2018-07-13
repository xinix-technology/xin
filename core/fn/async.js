import { idGenerator } from '../id-generator';

const nextId = idGenerator();

const requestAnimationFrame = (
  window.requestAnimationFrame || /* istanbul ignore next */
  window.webkitRequestAnimationFrame || /* istanbul ignore next */
  window.mozRequestAnimationFrame || /* istanbul ignore next */
  window.oRequestAnimationFrame || /* istanbul ignore next */
  window.msRequestAnimationFrame
);

const cancelAnimationFrame = (
  window.cancelAnimationFrame || /* istanbul ignore next */
  window.webkitCancelRequestAnimationFrame || /* istanbul ignore next */
  window.webkitCancelAnimationFrame || /* istanbul ignore next */
  window.mozCancelRequestAnimationFrame || /* istanbul ignore next */
  window.mozCancelAnimationFrame || /* istanbul ignore next */
  window.oCancelRequestAnimationFrame || /* istanbul ignore next */
  window.oCancelAnimationFrame || /* istanbul ignore next */
  window.msCancelRequestAnimationFrame || /* istanbul ignore next */
  window.msCancelAnimationFrame
);

export class Async {
  static nextFrame (callback) {
    return requestAnimationFrame(callback);
  }

  static sleep (wait) {
    return new Promise(resolve => setTimeout(resolve, wait));
  }

  static run (callback, wait) {
    return (new Async()).start(callback, wait);
  }

  constructor (context) {
    this.id = nextId();
    this.context = context;
    // this.handle = null;
    // this.frameHandle = null;
    this.cleared = true;
  }

  start (callback, wait) {
    if (typeof callback !== 'function') {
      throw new Error('Async should specify function');
    }

    if (!this.cleared) {
      throw new Error('Async already run');
    }

    this.cleared = false;

    let self = this;
    let context = this.context;
    let boundCallback = function () {
      self.frameHandle = requestAnimationFrame(() => {
        self.__clear();
        callback.call(context);
      });
    };

    if (wait) {
      this.handle = setTimeout(boundCallback, wait);
    } else {
      boundCallback();
    }
  }

  __clear () {
    this.cleared = true;

    cancelAnimationFrame(~~this.frameHandle);
    clearTimeout(~~this.handle);
    this.handle = this.frameHandle = undefined;
  }

  cancel () {
    this.__clear();
  }
};
