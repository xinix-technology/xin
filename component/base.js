import { Repository, event, Async } from '../core';
import { dashify } from '../core/string';
import { deserialize } from '../core/helpers';
import { Template } from './template';
import { Expr } from './expr';

const debug = require('debug')('xin::component');
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

    get $global () {
      return window;
    }

    get $repository () {
      return repository;
    }

    created () {}

    ready () {}

    attached () {}

    detached () {}

    createdCallback () {
      this.__templateAssignId();

      if (debug.enabled) /* istanbul ignore next */ debug(`CREATED ${this.is}:${this.__id}`);

      this.created();

      this.__componentReady = false;
      this.__componentReadyInvoked = false;
      this.__componentAttaching = false;
      this.__componentInitialPropValues = {};
      this.__componentProps = null;
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

      this.__componentInitTemplate();
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
      this.__componentAttaching = true;

      if (!this.__componentReady) {
        if (!this.__componentReadyInvoked) {
          this.__componentReadyInvoked = true;
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

      this.__componentUnmount();
    }

    connectedCallback () {
      return this.attachedCallback();
    }

    disconnectedCallback () {
      return this.detachedCallback();
    }

    __templateInitProp (propKey, prop) {
      Template.prototype.__templateInitProp.call(this, propKey, prop);

      const attrName = dashify(propKey);
      if (!this.hasAttribute(attrName)) {
        return;
      }

      const attrVal = fixAttrValue(this.getAttribute(attrName), prop.type);
      const expr = Expr.get(attrVal);

      if ('notify' in prop && expr.mode === Expr.READWRITE) {
        this.__templateAddCallbackBinding(propKey, value => this.__templateModel.set(expr.name, value));
      }

      this.__templateInitialValues[propKey] = expr.type === Expr.STATIC
        ? () => deserialize(attrVal, prop.type)
        : () => expr.invoke(this.__templateModel);
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
        const expr = Expr.getFn(this.listeners[key], [], true);

        this.__templateAddEventListener({
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
    if (key === '$' || key === '$global' || key === '$repository' || key === '__templateInitProp') {
      return;
    }

    BaseComponent.prototype[key] = tProto[key];
  });

  baseComponents[base] = BaseComponent;

  return BaseComponent;
}

function parseListenerMetadata (key) {
  key = key.trim();
  const [eventName, ...selectorArr] = key.split(/\s+/);
  const selector = selectorArr.length ? selectorArr.join(' ') : null;
  const metadata = { key, eventName, selector };
  return metadata;
}

function fixAttrValue (value, type) {
  if (type === Boolean && value === '') {
    return 'on';
  }

  return value;
}
