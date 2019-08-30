import { Async } from './async';

export class Debounce {
  constructor (immediate) {
    this.immediate = Boolean(immediate);
    this.async = null;
    this.running = false;
  }

  start (callback, wait) {
    if (this.immediate) {
      throw new Error('Unimplemented yet!');
    }

    if (this.running) {
      this.cancel();
    }

    this.running = true;
    this.async = new Async();
    this.async.start(() => {
      callback();
      this.running = false;
      this.async = null;
    }, wait);
  }

  cancel () {
    this.running = false;
    this.async.cancel();
    this.async = null;
  }
}
