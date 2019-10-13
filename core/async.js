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

  static cancelNextFrame (f) {
    cancelAnimationFrame(f);
  }

  static waitNextFrame () {
    return new Promise(resolve => this.nextFrame(resolve));
  }

  static run (callback, wait = 0) {
    return setTimeout(callback, wait);
  }

  static cancel (t) {
    clearTimeout(t);
  }

  static waitRun (callback, wait = 0) {
    return new Promise(resolve => {
      this.run(async () => {
        if (callback) {
          await callback();
        }
        resolve();
      }, wait);
    });
  }

  static sleep (wait = 0) {
    return wait ? this.waitRun(undefined, wait) : this.waitNextFrame();
  }
}
