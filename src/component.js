import T from 'template-binding';
import { put } from './repository';
import object from './object';
import { dashify } from './inflector';
import Async from './async';
import Debounce from './debounce';
import setup from './setup';

let componentId = 0;
function nextId () {
  return componentId++;
}

let baseComponents = {};

function base (base) {
  if (baseComponents[base]) {
    return baseComponents[base];
  }

  class Component extends window[base] {
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
      if (setup.get('debug')) console.info(`CREATED ${this.is}`);

      this.__id = nextId();
      put(this.__id, this);
      this.setAttribute('xin-id', this.__id);

      this.created();

      this.__initData();

      this.__initTemplate();

      this.__initProps();

      this.__initListeners();

      this.async(this.readyCallback);
    }

    readyCallback () {
      this.__componentReady = true;

      if (setup.get('debug')) console.info(`READY ${this.is}`);

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
      this.__componentAttaching = true;

      if (!this.__componentReady) {
        return;
      }

      if (setup.get('debug')) console.info(`ATTACHED ${this.is} ${this.__componentAttaching ? '(delayed)' : ''}`);

      this.attached();

      this.__componentAttaching = false;
    }

    detachedCallback () {
      this.detached();
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

    __initData () {
      this.__componentContent = [];
      this.__componentDebouncers = {};
      this.__componentNotifiers = {};
      this.__componentReady = false;
      this.__componentAttaching = false;
    }

    __initProps () {
      for (let propName in this.props) {
        // exclude prototype properties
        // if (!Object.prototype.hasOwnProperty.call(this.props, propName)) {
        //   continue;
        // }

        let property = this.props[propName];
        let attrName = dashify(propName);

        let propValue;

        if ('computed' in property) {
          let accessor = T.Accessor.get(this, propName);
          let expr = T.Expr.getFn(property.computed, [], true);
          this.__templateAnnotate(expr, accessor);

          // compute value of computed prop
          propValue = expr.invoke(this);
        } else if (this.hasAttribute(attrName)) {
          let attrVal = this.getAttribute(attrName);

          // copy value from attribute to property
          // fallback to property.value
          let expr = T.Expr.get(attrVal);
          if (expr.type === 's') {
            propValue = T.deserialize(attrVal, property.type);
          }
        }

        if (propValue === undefined && 'value' in property) {
          propValue = object.v(property.value);
        }

        // when property is undefined, log error when property is required otherwise assign to default value
        if (property.required && propValue === undefined /* (propValue === undefined || propValue === null) */) {
          throw new Error(`${this.is}:${this.__id} missing required ${propName}`);
        }

        if ('observer' in property) {
          let expr = T.Expr.getFn(property.observer, [ propName ], true);
          this.__templateAnnotate(expr);
        }

        if ('notify' in property) {
          this.__templateGetBinding(propName).annotations.push(new NotifyAnnotation(this, propName));
        }

        // set and force notify for the first time
        this[propName] = propValue;
        this.notify(propName, propValue);
      }
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
        let expr = T.Expr.getFn(this.listeners[key], [], true);
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
        switch (eventName) {
          case 'input':
            element.__templateModel.set(element.__templateNotifyKey, element.value);
            break;
          case '-notify':
            element.__templateModel.set(evt.detail.name, evt.detail.value);
            break;
          default:
            throw new Error('Unimplemented');
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
      return T.Event(this).fire(type, detail, options);
    }

    async (callback, waitTime) {
      return Async.run(this, callback, waitTime);
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

    // T overriden
    // -------------------------------------------------------------------------
    //

    __templateAnnotate (expr, accessor) {
      if (!T.prototype.__templateAnnotate.call(this, expr, accessor)) {
        return false;
      }

      // register event notifier
      if (expr.mode === '{' && expr.type === 'p' && accessor.node instanceof window.HTMLElement) {
        switch (accessor.node.nodeName) {
          case 'INPUT':
          case 'TEXTAREA':
            if (accessor.name === 'value') {
              accessor.node.__templateNotifyKey = expr.name;
              this.__addNotifier('input');
            }
            break;
          default:
            // register event for custom notifier
            this.__addNotifier('-notify');
            break;
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

class NotifyAnnotation {
  constructor (model, name) {
    let expr = T.Expr.get(model.getAttribute(name));
    this.model = model;
    this.name = expr.name;
  }

  effect (value) {
    this.model.fire('-notify', {
      name: this.name,
      value: value,
    });
  }
}

function parseListenerMetadata (key) {
  key = key.trim();

  let splitted = key.split(' ');
  let metadata = {
    key: key,
    eventName: splitted[0],
    selector: splitted[1] ? splitted.slice(1).join(' ') : null,
  };

  return metadata;
}

function useCustomElements () {
  if ('value' in useCustomElements === false) {
    let customElementsVersion = setup.get('customElements.version');
    useCustomElements.value = (
      (customElementsVersion === 'v1') ||
      ((!customElementsVersion || customElementsVersion === 'auto') && 'customElements' in window)
    );

    // console.log('Use customElements = ' + useCustomElements.value);
  }

  return useCustomElements.value;
}

function define (name, Component, options) {
  if (useCustomElements()) {
    window.customElements.define(name, Component, options);
    return Component;
  }

  let ElementPrototype = {
    prototype: Object.create(Component.prototype, { is: { value: name } }),
    extends: (options && options.extends) ? options.extends : undefined,
  };

  let ElementClass = document.registerElement(name, ElementPrototype);

  put(name, ElementClass);

  return ElementClass;
}

const Component = base('HTMLElement');

export { Component, base, define };
