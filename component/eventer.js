import { event } from '../core';

export class Eventer {
  constructor () {
    this.handlers = [];
    this.host = undefined;
  }

  on () {
    event(this.host).on(...arguments);
  }

  off () {
    event(this.host).off(...arguments);
  }

  once () {
    event(this.host).once(...arguments);
  }

  waitFor () {
    return event(this.host).waitFor(...arguments);
  }

  fire (type, detail, options) {
    return event(this.host).fire(type, detail, options);
  }

  addHandler (handler) {
    if (!handler.name) {
      throw new Error('Event listener must define name');
    }

    if (!handler.listener) {
      throw new Error('Event listener must define listener callback');
    }

    this.handlers.push(handler);
  }

  removeHandler ({ name, selector, listener } = {}) {
    const matchName = elName => name === undefined || name === elName;
    const matchSelector = elSelector => selector === undefined || selector === elSelector;
    const matchListener = elListener => listener === undefined || listener === elListener;

    this.handlers = this.handlers.filter(el => {
      return !(matchName(el.name) && matchSelector(el.selector) && matchListener(el.listener));
    });
  }

  start (host) {
    this.host = host;
    this.handlers.forEach(({ name, selector, listener }) => this.on(name, selector, listener));
  }

  stop () {
    this.handlers.forEach(({ name, selector, listener }) => this.off(name, selector, listener));
    this.host = undefined;
  }

  dispose () {
    if (this.host) {
      this.stop();
    }

    this.handlers = [];
    this.host = undefined;
  }
}
