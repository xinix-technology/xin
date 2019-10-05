import { repository, event, Async } from '../core';
import { Template } from './template';
import { Expr } from './expr';

const SPACE_DELIMITED_SPLITTER = /\s+/;
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

  const BaseElement = getBaseElement(base);

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
    async attachedCallback () {
      if (!this.__componentCreated || this.__componentAttaching) {
        return;
      }

      this.__componentAttaching = true;

      try {
        const tryReady = async () => {
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
          }
        };
        await tryReady();

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
        const fnString = Expr.prepareFnString(this.listeners[key]);
        const expr = new Expr(fnString, Expr.READONLY);
        const listener = evt => expr.eval({
          ...this,
          evt,
        });
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
  const [name, ...selectorArr] = key.split(SPACE_DELIMITED_SPLITTER);
  const selector = selectorArr.length ? selectorArr.join(' ') : null;
  return { key, name, selector };
}

function getBaseElement (base) {
  if (repository.$config.ceVersion === 'v0') {
    const BaseElement = function () {};
    BaseElement.prototype = Object.create(window[base].prototype);
    return BaseElement;
  }

  return window[base];
}
