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
      return this.__templatePresenter.$;
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
        const template = this.__componentGetTemplate();
        this.__templateInitialize(template, this.props);

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

      this.__componentPrepareListeners();

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
            await Async.waitNextFrame();
            this.readyCallback();
          }
        };
        await tryReady();

        this.mount(this);

        await this.attached();
      } catch (err) {
        repository.error(err);
      }

      this.__componentAttaching = false;
    }

    detachedCallback () {
      this.detached();

      try {
        if (this.__componentReady) {
          this.unmount();
        }
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

    __componentGetTemplate () {
      if (this.childElementCount === 1 && this.firstElementChild.nodeName === 'TEMPLATE') {
        // when instance template exist detach from component content
        const template = this.firstElementChild;
        this.removeChild(template);
        return template;
      }

      return this.template;
    }

    __componentPrepareListeners () {
      if (!this.listeners) {
        return;
      }

      Object.keys(this.listeners).forEach(key => {
        const { type, selector } = parseListenerMetadata(key);
        const fnString = Expr.prepareFnString(this.listeners[key]);
        const expr = new Expr(fnString, Expr.READONLY);
        const callback = evt => expr.eval(this.__templateModeler, { evt });
        this.__templatePresenter.addHandler(type, selector, callback);
      });
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
  const [type, ...selectorArr] = key.split(SPACE_DELIMITED_SPLITTER);
  const selector = selectorArr.length ? selectorArr.join(' ') : null;
  return { type, selector };
}

function getBaseElement (base) {
  if (repository.$config.ceVersion === 'v0') {
    const BaseElement = function () {};
    BaseElement.prototype = Object.create(window[base].prototype);
    return BaseElement;
  }

  return window[base];
}
