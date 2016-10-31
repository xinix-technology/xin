import T from 'template-binding';
import repository from './repository';
import inflector from './inflector';
import async from './async';
import setup from './setup';

const put = repository.put;
const v = repository.v;

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
      if (DEBUG) console.info(`CREATED ${this.is}`);

      this.__id = nextId();
      put(this.__id, this);
      this.setAttribute('xin-id', this.__id);

      if (typeof this.created === 'function') {
        this.created();
      }

      this.__initData();

      this.__initTemplate();

      this.__initProps();

      this.__initListeners();

      this.async(this.readyCallback);
    }

    readyCallback () {
      this.__componentReady = true;

      if (DEBUG) console.info(`READY ${this.is}`);

      let contentFragment;

      if (this.__template) {
        contentFragment = document.createDocumentFragment();
        [].slice.call(this.childNodes).forEach(node => {
          if (node === this.__templateMarker) return;
          contentFragment.appendChild(node);
        });
      }

      this.__templateRender(contentFragment);

      if (typeof this.ready === 'function') {
        this.ready();
      }

      if (this.__componentAttaching) {
        this.attachedCallback();
      }
    }

    attachedCallback () {
      this.__componentAttaching = true;

      if (!this.__componentReady) {
        return;
      }

      if (DEBUG) console.info(`ATTACHED ${this.is} ${this.__componentAttaching ? '(delayed)' : ''}`);

      if (typeof this.attached === 'function') {
        this.attached();
      }

      this.__componentAttaching = false;
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
      this.__debouncers = {};
      this.__notifiers = {};
      this.__componentReady = false;
      this.__componentAttaching = false;
      // this.__componentFilters = {};
    }

    __initProps () {
      for (let propName in this.props) {
        // exclude prototype properties
        if (!Object.prototype.hasOwnProperty.call(this.props, propName)) {
          continue;
        }

        let property = this.props[propName];
        let attrName = inflector.dashify(propName);

        let defaultValue;
        if (this.hasAttribute(attrName)) {
          let attrVal = this.getAttribute(attrName);

          // copy value from attribute to property
          // fallback to property.value
          let expr = T.Expr.get(attrVal);
          if (expr.type === 's') {
            defaultValue = T.deserialize(attrVal, property.type);
          }
        }

        // force notify first
        this.set(propName, defaultValue === undefined ? v(property.value) : defaultValue);

        // when property is undefined, log error when property is required otherwise assign to default value
        if (property.required && (this[propName] === undefined || this[propName] === null)) {
          throw new Error(`${this.is}:${this.__id} missing required ${propName}`);
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
          let val = expr.invoke(this);
          this.set(propName, val);
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

      this.__templateInitialize(template, this);
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
        let expr = T.Expr.getFn(this.listeners[key], [], true);

        this.addEventListener(listenerMetadata.eventName, evt => {
          if (listenerMetadata.selector && !evt.target.matches(listenerMetadata.selector) && !evt.target.matches(listenerMetadata.selector + ' *')) {
            return;
          }

          expr.invoke(this, { evt });
        }, true);
      });
    }

    fire (type, detail, options) {
      options = options || {};
      detail = detail || {};

      let evt;
      let bubbles = options.bubbles === undefined ? true : options.bubbles;
      let cancelable = Boolean(options.cancelable);

      switch (type) {
        case 'click':
          evt = new window.Event(type, {
            bubbles: bubbles,
            cancelable: cancelable,
          });

          // TODO check if without this works on every browsers
          // evt = document.createEvent('HTMLEvents');
          // evt.initEvent(type, true, false);
          break;
        default:
          evt = new window.CustomEvent(type, {
            bubbles: Boolean(bubbles),
            cancelable: cancelable,
            detail: detail,
          });
          break;
      }

      this.dispatchEvent(evt);

      return evt;
    }

    async (callback, waitTime) {
      let asyncO = new async.Async(this);
      asyncO.start(callback, waitTime);
      return asyncO;
    }

    debounce (job, callback, wait, immediate) {
      let debouncer = this.__debouncers[job];
      if (debouncer && debouncer.running) {
        debouncer.cancel();
      } else {
        debouncer = this.__debouncers[job] = new async.Debounce(this, immediate);
      }
      debouncer.start(callback, wait);

      return debouncer;
    }

    // __componentGetFilters (path) {
    //   let propName = path[0];
    //   let propFilters = this.__componentFilters[propName];
    //   if (!propFilters) {
    //     let prop = this.props[propName];
    //     propFilters = {};
    //     if (prop && prop.filters) {
    //       propFilters = {};
    //       for (let key in prop.filters) {
    //         let pathFilters = prop.filters[key];
    //         propFilters[key] = pathFilters.split('|').map(filter => {
    //           return T.Filter.get(filter.trim());
    //         });
    //       }
    //     }
    //     this.__componentFilters[propName] = propFilters;
    //   }
    //
    //   return propFilters[path.slice(1).join('.')];
    // }

    // T overriden
    // -------------------------------------------------------------------------
    //

    get $ () {
      // return this.getElementsByTagName('*');
      return this.__templateHost.getElementsByTagName('*');
    }

    // set (path, value) {
    //   path = this.__templateGetPathAsArray(path);
    //
    //   if (path[0] === 'modelErrors') {
    //     return T.prototype.set.call(this, path, value);
    //   }
    //
    //   let modelErrorsPath = path.slice(0);
    //   modelErrorsPath.unshift('modelErrors');
    //
    //   try {
    //     let filters = this.__componentGetFilters(path);
    //     if (filters) {
    //       value = filters.reduce((val, filter) => filter.invoke(val), value);
    //     }
    //
    //     this.set(modelErrorsPath, undefined);
    //
    //     return T.prototype.set.call(this, path, value);
    //   } catch (err) {
    //     err.path = modelErrorsPath.join('.');
    //     this.set(modelErrorsPath, err);
    //   }
    // }

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

    switch (key) {
      // case 'set':
      case '$':
      case '__templateAnnotate':
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
  let splitted = key.split(' ');
  let metadata = {
    eventName: splitted[0],
    selector: splitted[1] ? splitted.slice(1).join(' ') : null,
  };
  return metadata;
}

const Component = base('HTMLElement');

export default { Component, base };
