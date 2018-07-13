import { getInstance, idGenerator, event } from '../core';
import { dashify } from '../core/string';
import { deserialize, val } from './helpers';
import { T } from './template';
import { Expr } from './expr';
import { Accessor } from './accessor';
import { NotifyAnnotation } from './annotation';
import { Async, Debounce } from '../core/fn';
import { sprintf } from 'sprintf-js';

const debug = require('debug')('xin::component');
const nextId = idGenerator();
const baseComponents = {};

export function base (base) {
  const repository = getInstance();

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

    get props () {
      return {
        ref: {
          type: Object,
          readonly: true,
          notify: true,
        },
      };
    }

    created () {}

    ready () {}

    attached () {}

    detached () {}

    createdCallback () {
      debug(`CREATED ${this.is}`);

      this.__id = nextId();

      this.created();

      this.__initData();

      // move to readyCallback
      // this.__initProps();
      //
      // this.__initListeners();
      // move to readyCallback

      // move to attachedCallback
      // this.async(this.readyCallback);
      // move to attachedCallback
    }

    readyCallback () {
      this.__componentReady = true;

      debug(`READY ${this.is}`);

      // moved from attachedCallback
      if (!this.hasAttribute('xin-id')) {
        // deferred set attributes until connectedCallback
        this.setAttribute('xin-id', this.__id);
      }
      // moved from attachedCallback

      // moved from createdCallback
      this.__initListeners();

      this.__initTemplate();

      this.__initProps();
      // moved from createdCallback

      this.__initPropValues();

      let contentFragment;

      if (this.__template) {
        contentFragment = document.createDocumentFragment();
        [].slice.call(this.childNodes).forEach(node => {
          if (node === this.__templateMarker) return;
          contentFragment.appendChild(node);
        });
      }

      this.__templateRender(contentFragment);

      this.ready();

      if (this.__componentAttaching) {
        this.attachedCallback();
      }
    }

    attachedCallback () {
      this.__repository.put(this.__id, this);

      this.__componentAttaching = true;

      // moved from createdCallback
      if (!this.__componentReady) {
        this.async(this.readyCallback);
        return;
      }
      // moved from createdCallback

      // notify default props
      this.notify('__global');
      this.notify('__repository');
      this.notify('__app');

      debug(`ATTACHED ${this.is} ${this.__componentAttaching ? '(delayed)' : ''}`);

      this.set('ref', this);
      this.attached();

      this.__componentAttaching = false;
    }

    detachedCallback () {
      this.__repository.remove(this.__id);

      this.detached();
      this.set('ref', null);
    }

    connectedCallback () {
      return this.attachedCallback();
    }

    disconnectedCallback () {
      return this.detachedCallback();
    }

    get __app () {
      if (!this.__app$) {
        if (this.__appSignature) {
          this.__app$ = this;
        } else {
          let app = this.parentElement;
          while (app && !app.__appSignature) {
            app = app.parentElement;
          }
          this.__app$ = app;
        }
      }

      return this.__app$;
    }

    get __global () {
      return window;
    }

    get __repository () {
      return repository;
    }

    __initData () {
      this.__componentContent = [];
      this.__componentDebouncers = {};
      this.__componentNotifiers = {};
      this.__componentReady = false;
      this.__componentAttaching = false;
      this.__componentInitialPropValues = {};
      this.__componentNotifiedProps = {};
    }

    __initProps () {
      let props = this.__getProps();
      for (let propName in props) {
        let property = props[propName];
        let attrName = dashify(propName);

        if ('computed' in property) {
          let accessor = Accessor.get(this, propName);
          let expr = Expr.getFn(property.computed, [], true);
          this.__templateAnnotate(expr, accessor);

          this.__componentInitialPropValues[propName] = () => expr.invoke(this);
        } else if (this.hasAttribute(attrName)) {
          let attrVal = this.getAttribute(attrName);

          // copy value from attribute to property
          // fallback to property.value
          let expr = Expr.get(attrVal);
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
          let expr = Expr.getFn(property.observer, [ propName ], true);
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
      let props = this.__getProps();

      for (let propName in props) {
        let property = props[propName];

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
      let template;

      if (this.childElementCount === 1 && this.firstElementChild.nodeName === 'TEMPLATE' && !this.firstElementChild.hasAttribute('is')) {
        // when instance template exist detach from component content
        template = this.firstElementChild;
        this.removeChild(template);
      } else if (this.template) {
        // create new template based on template property
        template = document.createElement('template');
        template.innerHTML = this.template;
      }

      this.__templateInitialize(template, this);
    }

    __initListeners () {
      if (!this.listeners) {
        return;
      }

      Object.keys(this.listeners).forEach(key => {
        let meta = parseListenerMetadata(key);
        let expr = Expr.getFn(this.listeners[key], [], true);
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
        let element = evt.target;

        if (element.__templateModel !== this) {
          return;
        }

        evt.stopImmediatePropagation();

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
      this.__componentNotifiers[eventName] = null;
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

    sprintf (...args) {
      return sprintf(...args);
    }

    // T overriden
    // -------------------------------------------------------------------------
    //

    __templateAnnotate (expr, accessor) {
      if (!T.prototype.__templateAnnotate.call(this, expr, accessor)) {
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

  let tproto = T.prototype;
  for (let key in tproto) {
    // exclude __templateAnnotate because will be override
    if (!tproto.hasOwnProperty(key)) {
      continue;
    }

    if (key === '$' || key === '__templateAnnotate') {
      continue;
    }

    Component.prototype[key] = tproto[key];
  }

  baseComponents[base] = Component;

  return Component;
}

function parseListenerMetadata (key) {
  key = key.trim();
  let [ eventName, ...selectorArr ] = key.split(/\s+/);
  let selector = selectorArr.length ? selectorArr.join(' ') : null;
  let metadata = { key, eventName, selector };
  return metadata;
}

function isUndefinedPropValue (propName, propValue) {
  return propValue === undefined || (propName === 'title' && !propValue);
}
