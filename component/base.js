// eslint-disable-line max-lines
import { Repository, event } from '../core';
import { dashify } from '../core/string';
import { idGenerator, deserialize, val } from '../core/helpers';
import { Template } from './template';
import { Expr } from './expr';
import { accessorFactory } from './accessor';
import { Annotation } from './annotation';
import { Async, Debounce } from '../core/fn';

const debug = require('debug')('xin::component');
const nextId = idGenerator();
const baseComponents = {};

const tProto = Template.prototype;
const tProtoProps = Object.getOwnPropertyNames(tProto);

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

  class Component extends BaseElement {
    constructor () {
      super();

      this.is = this.nodeName.toLowerCase();

      this.createdCallback();
    }

    get $ () {
      return this.__templateHost.getElementsByTagName('*');
    }

    created () {}

    ready () {}

    attached () {}

    detached () {}

    createdCallback () {
      if (debug.enabled) /* istanbul ignore next */ debug(`CREATED ${this.is}`);

      this.__id = nextId();

      this.created();

      this.__componentInitData();
    }

    readyCallback () {
      this.__componentReady = true;

      event(this).fire('before-ready');

      if (debug.enabled) /* istanbul ignore next */ debug(`READY ${this.is}`);

      if (!this.hasAttribute('xin-id')) {
        // deferred set attributes until connectedCallback
        this.setAttribute('xin-id', this.__id);
        repository.put(this.__id, this);
      }

      this.__componentInitTemplate();
      this.__componentInitListeners();
      this.__componentInitProps();
      this.__componentInitPropValues();

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
          this.async(this.readyCallback);
        }
        return;
      }

      this.__componentMount();

      // notify default props
      this.notify('$global');
      this.notify('$repository');

      if (debug.enabled) { /* istanbul ignore next */
        debug(`ATTACHED ${this.is} ${this.__componentAttaching ? '(delayed)' : ''}`);
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

    get $global () {
      return window;
    }

    get $repository () {
      return repository;
    }

    __componentInitData () {
      this.__componentDebouncers = {};
      this.__componentReady = false;
      this.__componentReadyInvoked = false;
      this.__componentAttaching = false;
      this.__componentInitialPropValues = {};
    }

    __componentInitProps () {
      const props = this.__componentGetProps();
      for (const propName in props) {
        const property = props[propName];
        const attrName = dashify(propName);

        if ('computed' in property) {
          const expr = Expr.getFn(property.computed, [], true);
          this.__templateAnnotate(expr, accessorFactory(this, propName));

          this.__componentInitialPropValues[propName] = () => expr.invoke(this);
        }

        if ('observer' in property) {
          const expr = Expr.getFn(property.observer, [propName], true);
          this.__templateAnnotate(expr);
        }

        if (this.hasAttribute(attrName)) {
          const attrVal = this.getAttribute(attrName);
          const expr = Expr.get(attrVal);

          if ('notify' in property && expr.mode === Expr.READWRITE) {
            const accessor = accessorFactory(value => this.__templateModel.set(expr.name, value));
            this.__templateGetBinding(propName).annotate(new Annotation(Expr.get(propName, true), accessor));
          }

          this.__componentInitialPropValues[propName] = expr.type === Expr.STATIC
            ? () => deserialize(attrVal, property.type)
            : () => expr.invoke(this.__templateModel);
        }
      }
    }

    __componentGetProps () {
      if (!this.__componentProps) {
        this.__componentProps = this.props || {};
      }
      return this.__componentProps;
    }

    __componentInitPropValues () {
      const props = this.__componentGetProps();

      for (const propName in props) {
        const property = props[propName];

        let propValue;

        if (this.__componentInitialPropValues[propName]) {
          propValue = this.__componentInitialPropValues[propName]();
        } else {
          propValue = this[propName];
        }

        if ('value' in property && isUndefinedPropValue(propName, propValue)) {
          propValue = val(property.value);
        }

        // when property is undefined, log error when property is required otherwise assign to default value
        if (property.required && propValue === undefined /* (propValue === undefined || propValue === null) */) {
          throw new Error(`${this.is}:${this.__id} missing required ${propName}`);
        }

        // set and force notify for the first time
        this[propName] = propValue;

        // only notify if propValue already defined otherwise undefined value will be propagated to model
        if (propValue !== undefined) {
          this.notify(propName, propValue);
        }
      }
    }

    __componentInitTemplate () {
      let template = this.template;

      if (this.childElementCount === 1 && this.firstElementChild.nodeName === 'TEMPLATE') {
        // when instance template exist detach from component content
        template = this.firstElementChild;
        this.removeChild(template);
      }

      this.__templateInitialize(template);
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
      this.unmount();
    }

    async (callback, waitTime) {
      return (new Async(this)).start(callback, waitTime);
    }

    debounce (job, callback, wait, immediate) { // eslint-disable-line max-params
      let debouncer = this.__componentDebouncers[job];
      if (debouncer && debouncer.running) {
        debouncer.cancel();
      } else {
        debouncer = this.__componentDebouncers[job] = new Debounce(this, immediate);
      }
      debouncer.start(callback, wait);

      return debouncer;
    }

    nextFrame (callback) {
      return Async.nextFrame(callback.bind(this));
    }
  }

  tProtoProps.forEach(key => {
    if (key === '$') {
      return;
    }

    Component.prototype[key] = tProto[key];
  });

  baseComponents[base] = Component;

  return Component;
}

function parseListenerMetadata (key) {
  key = key.trim();
  const [eventName, ...selectorArr] = key.split(/\s+/);
  const selector = selectorArr.length ? selectorArr.join(' ') : null;
  const metadata = { key, eventName, selector };
  return metadata;
}

function isUndefinedPropValue (propName, propValue) {
  return propValue === undefined || (propName === 'title' && !propValue);
}
