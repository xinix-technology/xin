import { idGenerator } from '../id-generator';
import { prepareArgs } from './helpers/prepare-args';
import { Async } from '../fn/async';
import { matches } from './helpers/matches';

const WAIT_TIMEOUT = 3000;

const nextId = idGenerator();

export class Delegator {
  /**
   * Create new event delegator
   *
   * @param {Element} element
   */
  constructor (element) {
    if (!element) {
      throw new Error('Cannot create event delegator for unknown element');
    }

    this.id = nextId();
    this.element = element;

    this.listeners = {};
    this.proxies = new WeakMap();
  }

  on (types, selector, callback) {
    [types, selector, callback] = prepareArgs(types, selector, callback);

    types.forEach(type => {
      if (!this.listeners[type]) {
        this.__eventAddListener(type);
      }

      this.listeners[type].handlers.push({ selector, callback });
    });
  }

  off (types, selector, callback) {
    [types, selector, callback] = prepareArgs(types, selector, callback);

    types.forEach(type => {
      const listener = this.listeners[type];
      if (!listener) {
        return;
      }

      let index = listener.handlers.findIndex(handler => {
        return handler.selector === selector && handler.callback === callback;
      });

      if (index === -1) {
        const proxyCallback = this.proxies.get(callback);
        index = listener.handlers.findIndex(handler => {
          return handler.selector === selector && handler.callback === proxyCallback;
        });

        if (index === -1) {
          return;
        }

        this.proxies.delete(callback);
      }

      listener.handlers.splice(index, 1);
      if (listener.handlers.length !== 0) {
        return;
      }

      this.__eventRemoveListener(type);
    });
  }

  once (types, selector, callback) {
    if (!callback && typeof (selector) === 'function') {
      callback = selector;
      selector = '';
    }

    const proxyCallback = (...args) => {
      this.off(types, selector, proxyCallback);
      this.proxies.delete(callback);
      return callback.apply(null, args);
    };

    this.proxies.set(callback, proxyCallback);

    return this.on(types, selector, proxyCallback);
  }

  waitFor (types, timeout = WAIT_TIMEOUT) {
    return new Promise((resolve, reject) => {
      let async;
      const callback = evt => {
        Async.cancel(async);
        this.off(types, callback);
        resolve(evt);
      };
      if (timeout > 0) {
        async = Async.run(() => {
          this.off(types, callback);
          reject(new Error('Event#waitFor got timeout'));
        }, timeout);
      }
      this.on(types, callback);
    });
  }

  fire (type, detail, options) {
    options = options || {};
    detail = detail || {};

    let evt;
    const bubbles = options.bubbles === undefined ? true : options.bubbles;
    const cancelable = Boolean(options.cancelable);

    switch (type) {
      case 'click':
        evt = new Event(type, {
          bubbles: bubbles,
          cancelable: cancelable,
          // XXX is it ok to have detail here?
          detail: detail,
        });

        // XXX check if without this works on every browsers
        // evt = document.createEvent('HTMLEvents');
        // evt.initEvent(type, true, false);
        break;
      default:
        evt = new CustomEvent(type, {
          bubbles: Boolean(bubbles),
          cancelable: cancelable,
          detail: detail,
        });
        break;
    }

    this.element.dispatchEvent(evt);

    return evt;
  }

  dispose () {
    for (const type in this.listeners) {
      const listener = this.listeners[type];
      this.element.removeEventListener(type, listener);
    }
    this.listeners = {};

    this.element = undefined;
  }

  __eventAddListener (type) {
    const listener = evt => {
      const { target } = evt;

      for (const i in listener.handlers) {
        const { selector, callback } = listener.handlers[i];

        if (this.__eventTargetMatchesSelector(target, selector)) {
          if (callback(evt) === false) {
            evt.preventDefault();
            evt.stopPropagation();
          }
        }
      }
    };

    listener.handlers = [];
    this.listeners[type] = listener;

    this.element.addEventListener(type, listener, getOptions(type));
  }

  __eventTargetMatchesSelector (target, selector) {
    if (!selector) {
      return true;
    }

    if (target === this.element) {
      return false;
    }

    if (matches(target, selector)) {
      return true;
    }

    if (target.parentElement) {
      return this.__eventTargetMatchesSelector(target.parentElement, selector);
    }

    return false;
  }

  __eventRemoveListener (type) {
    const listener = this.listeners[type];
    if (!listener) {
      return;
    }

    this.element.removeEventListener(type, listener, getOptions(type));

    delete this.listeners[type];
  }
}

function getOptions (type) {
  if (isTouchAndMouseEventType(type)) {
    return { passive: true };
  }

  if (type === 'blur' || type === 'focus') {
    return true;
  }

  return false;
}

function isTouchAndMouseEventType (type) {
  return ['touchstart', 'touchmove', 'wheel', 'mousewheel'].indexOf(type) !== -1;
}
