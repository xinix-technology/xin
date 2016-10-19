/* globals HTMLElement */
/* eslint no-proto: 0 */

import T from 'template-binding';
import { put, v } from './repository';
import inflector from './inflector';
import dom from './dom';
import { Async, Debounce } from './async';
import setup from './setup';

const DEBUG = setup.withDefault('debug', false);

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
    get props () {
      return {};
    }

    createdCallback () {
      if (DEBUG) console.info('CREATED ' + this.is);

      this.__id = nextId();
      put(this.__id, this);
      this.setAttribute('xin-id', this.__id);

      this.classList.add(this.is);

      if (this.created) {
        this.created();
      }

      this.__initData();

      this.__initTemplate();

      this.__initProps();

      this.__initListeners();

      this.readyCallback();
    }

    readyCallback () {
      if (DEBUG) console.info('READY ' + this.is);

      if (this.ready) {
        this.ready();
      }
    }

    attachedCallback () {
      if (DEBUG) console.info('ATTACHED ' + this.is);

      if (this.attached) {
        this.attached();
      }
    }

    __getId () {
      return this.is + (this.__id ? (':' + this.__id) : '');
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
      this.__content = [];
      this.__debouncers = {};
      this.__notifiers = {};
    }

    __initProps () {
      for (let propName in this.props) {
        // exclude prototype properties
        if (!{}.hasOwnProperty.call(this.props, propName)) {
          continue;
        }

        let property = this.props[propName];
        let attrName = inflector.dashify(propName);
        let attrVal = this.getAttribute(attrName);

        let expr = T.Expr.get(attrVal);

        // copy value from attribute to property
        if (typeof attrVal === 'string') {
          if (expr.type === 's') {
            this[propName] = T.Serializer.deserialize(attrVal, property.type);
            this.notify(propName, this[propName]);
          }
          // if expr not static do nothing
        }

        // when property is undefined, log error when property is required otherwise assign to default value
        if (undefined === this[propName]) {
          if (property.required) {
            throw new Error('"' + this.__getId() + '" missing required "' + propName + '"');
          } else {
            this[propName] = v(property.value);
          }
        }

        if (property.observer) {
          let expr = T.Expr.getFn(property.observer, [ propName ], true);
          this.__templateAnnotate(expr);

          // invoke first time for observer annotation
          expr.invoke(this);
        }

        let accessor = T.Accessor.get(this, propName);

        if (property.computed) {
          let expr = T.Expr.getFn(property.computed, [], true);
          this.__templateAnnotate(expr, accessor);

          // invoke first time;
          this.set(propName, expr.invoke(this));
        }

        if (property.notify) {
          this.__templateGetBinding(propName).annotations.push(new NotifyAnnotation(this, propName));
        }
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

      // when template does not exist just initialize template to get binding but do not render
      if (!template) {
        T.prototype.__initialize.call(this, template, this);
        return;
      }

      dom(this).childNodes.forEach(node => {
        this.__content.push(node);
        this.removeChild(node);
      });

      T.prototype.__initialize.call(this, template, this);

      this.render(this.__content);
    }

    __templateAnnotate (expr, accessor) {
      if (!T.prototype.__templateAnnotate.call(this, expr, accessor)) {
        return false;
      }

      // register event notifier
      if (expr.mode === '{' && expr.type === 'p' && accessor.node instanceof HTMLElement) {
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

    __addNotifier (eventName) {
      if (this.__notifiers[eventName]) {
        return;
      }

      this.__notifiers[eventName] = (evt) => {
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

      this.__templateHost.addEventListener(eventName, this.__notifiers[eventName]);
    }

    __removeNotifier (eventName) {
      if (!this.__notifiers[eventName]) {
        return;
      }

      this.__templateHost.removeEventListener(eventName, this.__notifiers[eventName], true);
      this.__notifiers[eventName] = null;
    }

    __initListeners () {
      if (!this.listeners) {
        return;
      }

      Object.keys(this.listeners).forEach(key => {
        let listenerMetadata = parseListenerMetadata(key);
        let listenerHandler = this[this.listeners[key]];
        this.addEventListener(listenerMetadata.eventName, function (evt) {
          if (listenerMetadata.selector && !dom(evt.target).matches(listenerMetadata.selector) && !dom(evt.target).matches(listenerMetadata.selector + ' *')) {
            return;
          }
          return listenerHandler.apply(this, arguments);
        }.bind(this), true);
      });
    }

    fire (type, detail, options) {
      return dom(this).fire(type, detail, options);
    }

    async (callback, waitTime) {
      let asyncO = new Async(this);
      asyncO.start(callback, waitTime);
      return asyncO;
    }

    debounce (job, callback, wait, immediate) {
      let debouncer = this.__debouncers[job];
      if (debouncer && debouncer.running) {
        debouncer.cancel();
      } else {
        debouncer = this.__debouncers[job] = new Debounce(this, immediate);
      }
      debouncer.start(callback, wait);

      return debouncer;
    }
  }


  for (let key in T.prototype) {
    // exclude __templateAnnotate because will be override
    if (key !== '__templateAnnotate' && T.prototype.hasOwnProperty(key)) {
      Component.prototype[key] = T.prototype[key];
    }
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
  let splitted = key.split(' ');
  let metadata = {
    eventName: splitted[0],
    selector: splitted[1] ? splitted.slice(1).join(' ') : null,
  };
  return metadata;
}

module.exports.Component = base('HTMLElement');
module.exports.base = base;
