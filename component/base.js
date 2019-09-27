import { repository, event, Async } from '../core';
import { Template } from './template';
import { Expr } from './expr';

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
  if (baseComponents[base]) {
    return baseComponents[base];
  }

  let BaseElement;
  if (repository.$config.customElementsVersion === 'v0') {
    BaseElement = function () {};
    BaseElement.prototype = Object.create(window[base].prototype);
  } else {
    BaseElement = window[base];
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

        this.created();

        this.__componentCreated = true;
      } catch (err) {
        repository.error(err);
      }
    }

    readyCallback () {
      this.__componentReady = true;

      event(this).fire('before-ready');

      if (!this.hasAttribute('xin-id')) {
        // deferred set attributes until readyCallback
        this.setAttribute('xin-id', this.__id);
      }

      this.__componentInitListeners();

      this.ready();

      event(this).fire('ready');
    }

    // note that connectedCallback can be called more than once, so any
    // initialization work that is truly one-time will need a guard to prevent
    // it from running twice.
    async attachedCallback () { // eslint-disable-line complexity
      if (!this.__componentCreated) {
        return;
      }

      this.__componentAttaching = true;

      try {
        if (!this.__componentReady) {
          if (this.__componentReadyInvoking) {
            return;
          }

          this.__componentReadyInvoking = true;
          await new Promise(resolve => {
            Async.run(() => {
              this.readyCallback();
              resolve();
            });
          });

          if (!this.__componentAttaching) {
            return;
          }
        }

        this.__componentMount();

        this.attached();
      } catch (err) {
        repository.error(err);
      }

      this.__componentAttaching = false;
    }

    detachedCallback () {
      this.detached();

      try {
        this.__componentUnmount();
      } catch (err) {
        repository.error(err);
      }
    }

    connectedCallback () {
      return this.attachedCallback();
    }

    disconnectedCallback () {
      return this.detachedCallback();
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
        const { name, selector } = parseListenerMetadata(key);
        const expr = Expr.createFn(this.listeners[key], [], true);
        const listener = evt => expr.invoke(this, { evt });
        this.__templateEventer.addHandler({ name, selector, listener });
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

function parseListenerMetadata (key) {
  key = key.trim();
  const [name, ...selectorArr] = key.split(/\s+/);
  const selector = selectorArr.length ? selectorArr.join(' ') : null;
  return { key, name, selector };
}
