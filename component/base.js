import { Repository, event, Async } from '../core';
import { Template } from './template';
import { Expr } from './expr';

const debug = require('debug')('xin:component');
const baseComponents = {};

const tProto = Template.prototype;
const tProtoProps = Object.getOwnPropertyNames(tProto);

/**
 * Create base element
 *
 * @param {Element} base
 * @returns {BaseComponent}
 */
export function base (base) {
  const repository = Repository.singleton();

  if (baseComponents[base]) {
    return baseComponents[base];
  }

  let BaseElement;
  if (repository.get('customElements.version') === 'v1') {
    BaseElement = window[base];
  } else {
    BaseElement = function () {};
    BaseElement.prototype = Object.create(window[base].prototype);
  }

  class BaseComponent extends BaseElement {
    constructor () {
      super();

      this.createdCallback();
    }

    get is () {
      return this.nodeName.toLowerCase();
    }

    get $ () {
      return this.__templateHost.getElementsByTagName('*');
    }

    created () {}

    ready () {}

    attached () {}

    detached () {}

    createdCallback () {
      this.__componentCreated = false;
      this.__componentReady = false;
      this.__componentReadyInvoking = false;
      this.__componentAttaching = false;

      try {
        this.__componentInitTemplate();

        if (debug.enabled) /* istanbul ignore next */ debug(`CREATED ${this.is}:${this.__id}`);

        this.created();

        this.__componentCreated = true;
      } catch (err) {
        this.__componentEmitError(err);
      }
    }

    readyCallback () {
      this.__componentReady = true;

      event(this).fire('before-ready');

      if (!this.hasAttribute('xin-id')) {
        // deferred set attributes until readyCallback
        this.setAttribute('xin-id', this.__id);

        // XXX: cause leak here :(
        // repository.put(this.__id, this);
      }

      if (debug.enabled) /* istanbul ignore next */ debug(`READY ${this.is}:${this.__id}`);

      this.__componentInitListeners();

      this.ready();

      event(this).fire('ready');

      if (this.__componentAttaching) {
        this.attachedCallback();
      }
    }

    // note that connectedCallback can be called more than once, so any
    // initialization work that is truly one-time will need a guard to prevent
    // it from running twice.
    attachedCallback () {
      if (!this.__componentCreated) {
        return;
      }

      this.__componentAttaching = true;

      if (!this.__componentReady) {
        if (!this.__componentReadyInvoking) {
          this.__componentReadyInvoking = true;
          Async.run(() => this.readyCallback());
        }
        return;
      }

      this.__componentMount();

      if (debug.enabled) { /* istanbul ignore next */
        debug(`ATTACHED ${this.is}:${this.__id} ${this.__componentAttaching ? '(delayed)' : ''}`);
      }

      this.attached();

      this.__componentAttaching = false;
    }

    detachedCallback () {
      this.detached();

      try {
        this.__componentUnmount();
      } catch (err) {
        this.__componentEmitError(err);
      }
    }

    connectedCallback () {
      return this.attachedCallback();
    }

    disconnectedCallback () {
      return this.detachedCallback();
    }

    __componentEmitError (err) {
      repository.emit('error', err);
      if (repository.get('xin.silentError')) {
        return;
      }
      throw err;
    }

    __componentInitTemplate () {
      let template = this.template;

      if (this.childElementCount === 1 && this.firstElementChild.nodeName === 'TEMPLATE') {
        // when instance template exist detach from component content
        template = this.firstElementChild;
        this.removeChild(template);
      }

      this.__templateInitialize(template, this.props);
    }

    __componentInitListeners () {
      if (!this.listeners) {
        return;
      }

      Object.keys(this.listeners).forEach(key => {
        const meta = parseListenerMetadata(key);
        const expr = Expr.createFn(this.listeners[key], [], true);

        this.__templateEventer.addHandler({
          name: meta.eventName,
          selector: meta.selector,
          listener: evt => expr.invoke(this, { evt }),
        });
      });
    }

    __componentMount () {
      this.mount(this);
    }

    __componentUnmount () {
      if (!this.__componentReady) {
        return;
      }

      this.unmount();
    }
  }

  tProtoProps.forEach(key => {
    if (key === '$') {
      return;
    }

    BaseComponent.prototype[key] = tProto[key];
  });

  baseComponents[base] = BaseComponent;

  return BaseComponent;
}

// FIXME: revisit this to use template listener
function parseListenerMetadata (key) {
  key = key.trim();
  const [eventName, ...selectorArr] = key.split(/\s+/);
  const selector = selectorArr.length ? selectorArr.join(' ') : null;
  const metadata = { key, eventName, selector };
  return metadata;
}
