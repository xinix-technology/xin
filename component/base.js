import { Repository, event } from '../core';
import { dashify } from '../core/string';
import { idGenerator, deserialize, val } from '../core/helpers';
import { Template } from './template';
import { Expr } from './expr';
import { accessorFactory } from './accessor';
import { NotifyAnnotation } from './annotation';
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

      this.__initData();
    }

    readyCallback () {
      this.__componentReady = true;

      this.fire('before-ready');

      if (debug.enabled) /* istanbul ignore next */ debug(`READY ${this.is}`);

      // moved from attachedCallback
      if (!this.hasAttribute('xin-id')) {
        // deferred set attributes until connectedCallback
        this.setAttribute('xin-id', this.__id);
        repository.put(this.__id, this);
      }
      // moved from attachedCallback

      // moved from createdCallback
      this.__initListeners();

      this.__initTemplate();

      this.__initProps();
      // moved from createdCallback

      this.__initPropValues();

      this.__mountTemplate();
      // let contentFragment;

      // if (this.__template) {
      //   contentFragment = document.createDocumentFragment();
      //   [].slice.call(this.childNodes).forEach(node => {
      //     if (node === this.__templateMarker) return;
      //     contentFragment.appendChild(node);
      //   });
      // }

      // this.__templateRender(contentFragment);

      this.ready();

      this.fire('ready');

      if (this.__componentAttaching) {
        this.attachedCallback();
      }
    }

    // FIXME: note that connectedCallback can be called more than once, so any
    // initialization work that is truly one-time will need a guard to prevent
    // it from running twice.
    attachedCallback () {
      this.__componentAttaching = true;

      // moved from createdCallback
      if (!this.__componentReady) {
        if (!this.__componentBeforeReady) {
          this.__componentBeforeReady = true;
          this.async(this.readyCallback);
        }
        return;
      }
      // moved from createdCallback

      // notify default props
      this.notify('$global');
      this.notify('$repository');

      if (debug.enabled) /* istanbul ignore next */ debug(`ATTACHED ${this.is} ${this.__componentAttaching ? '(delayed)' : ''}`);

      this.attached();

      this.__componentAttaching = false;
    }

    detachedCallback () {
      // repository.remove(this.__id);

      this.detached();
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

    __initData () {
      this.__componentContent = [];
      this.__componentDebouncers = {};
      this.__componentNotifiers = {};
      this.__componentReady = false;
      this.__componentBeforeReady = false;
      this.__componentAttaching = false;
      this.__componentInitialPropValues = {};
      this.__componentNotifiedProps = {};
    }

    __initProps () {
      const props = this.__getProps();
      for (const propName in props) {
        const property = props[propName];
        const attrName = dashify(propName);

        if ('computed' in property) {
          const accessor = accessorFactory(this, propName);
          const expr = Expr.getFn(property.computed, [], true);
          this.__templateAnnotate(expr, accessor);

          this.__componentInitialPropValues[propName] = () => expr.invoke(this);
        } else if (this.hasAttribute(attrName)) {
          const attrVal = this.getAttribute(attrName);

          // copy value from attribute to property
          // fallback to property.value
          const expr = Expr.get(attrVal);
          if (expr.type === 's') {
            this.__componentInitialPropValues[propName] = () => deserialize(attrVal, property.type);
          } else {
            if ('notify' in property && expr.mode === '{') {
              this.__componentNotifiedProps[propName] = true;
              this.__templateGetBinding(propName).annotate(new NotifyAnnotation(this, propName));
            }
            this.__componentInitialPropValues[propName] = () => expr.invoke(this.__templateModel);
          }
        }

        if ('observer' in property) {
          const expr = Expr.getFn(property.observer, [propName], true);
          this.__templateAnnotate(expr);
        }
      }
    }

    __getProps () {
      if (!this._props) {
        this._props = this.props;
      }
      return this._props;
    }

    __initPropValues () {
      const props = this.__getProps();

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

    __isNotified (name) {
      return (name in this.__componentNotifiedProps);
    }

    __initTemplate () {
      let template = this.template;

      if (this.childElementCount === 1 && this.firstElementChild.nodeName === 'TEMPLATE') {
        // when instance template exist detach from component content
        template = this.firstElementChild;
        this.removeChild(template);
      }

      // this.__templateInitialize(template, this);
      this.__templateInitialize(template);
    }

    __mountTemplate () {
      this.mount(this);
    }

    __initListeners () {
      if (!this.listeners) {
        return;
      }

      Object.keys(this.listeners).forEach(key => {
        const meta = parseListenerMetadata(key);
        const expr = Expr.getFn(this.listeners[key], [], true);
        if (meta.selector) {
          this.on(meta.eventName, meta.selector, evt => {
            expr.invoke(this, { evt });
          });
        } else {
          this.on(meta.eventName, evt => {
            expr.invoke(this, { evt });
          });
        }
      });
    }

    __addNotifier (eventName) {
      if (this.__componentNotifiers[eventName]) {
        return;
      }

      this.__componentNotifiers[eventName] = (evt) => {
        const element = evt.target;

        if (element.__templateModel !== this) {
          return;
        }

        // TODO: ini buat apa ya dulu?
        // evt.stopImmediatePropagation();

        if ('__componentNotifyKey' in element && '__componentNotifyAccessor' in element) {
          element.__templateModel.set(element.__componentNotifyKey, element[element.__componentNotifyAccessor]);
        }
      };

      this.on(eventName, this.__componentNotifiers[eventName]);
    }

    __removeNotifier (eventName) {
      if (!this.__componentNotifiers[eventName]) {
        return;
      }

      this.off(eventName, this.__componentNotifiers[eventName]);

      delete this.__componentNotifiers[eventName];
    }

    fire (type, detail, options) {
      return event(this).fire(type, detail, options);
    }

    async (callback, waitTime) {
      return (new Async(this)).start(callback, waitTime);
    }

    debounce (job, callback, wait, immediate) {
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

    // Template overriden
    // -------------------------------------------------------------------------
    //

    __templateAnnotate (expr, accessor) {
      if (!Template.prototype.__templateAnnotate.call(this, expr, accessor)) {
        return false;
      }

      // register event notifier
      if (expr.mode === '{' && expr.type === 'p' && accessor.node instanceof window.HTMLElement) {
        const node = accessor.node;
        const nodeName = node.nodeName;

        const startNotify = (name) => {
          node.__componentNotifyKey = expr.name;
          node.__componentNotifyAccessor = accessor.name;
          this.__addNotifier(name);
        };

        if (nodeName === 'INPUT') {
          const inputType = node.getAttribute('type');
          if (inputType === 'radio' || inputType === 'checkbox') {
            throw new Error('Unimplemented yet');
          } else {
            startNotify('input');
          }
        } else if (nodeName === 'TEXTAREA') {
          startNotify('input');
        } else if (nodeName === 'SELECT') {
          startNotify('change');
        }
      }

      return true;
    }
  }

  tProtoProps.forEach(key => {
    // exclude $ and __templateAnnotate because will be override
    if (key === '$' || key === '__templateAnnotate') {
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
