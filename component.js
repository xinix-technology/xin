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

class Component {
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
        let val;
        // set property value when attr set and the value specified is static
        // otherwise set it to #__unprocessedProperties tobe processed later
        if (expr.type !== 's') {
          this.__unprocessedProperties[propName] = expr;
        } else {
          val = T.Serializer.deserialize(attrVal, property.type);
        }

        // this.removeAttribute(attrName);
        this[propName] = val;
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
        this.addObserver(propName, property.observer);
      }

      if (property.computed) {
        this.addComputedProperty(propName, property.computed);
      }

      // FIXME define observe, computed and notify annotation
      //
      // if (property.notify && attrVal) {
      //   if (!expr.writable()) {
      //     root.console.warn('Cannot attach notification to host for one-way binding expr: ' + attrVal);
      //     return;
      //   }
      //
      //   if (!expr.isPropertyExpression()) {
      //     root.console.warn('Cannot attach notification to host for non-property expr: ' + attrVal);
      //     return;
      //   }
      //
      //   this.__bind(new xin.NotifyAnnotation(this, propName, expr.getToken()));
      // }
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
      }.bind(this));
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

function parseListenerMetadata (key) {
  let splitted = key.split(' ');
  let metadata = {
    eventName: splitted[0],
    selector: splitted[1] ? splitted.slice(1).join(' ') : null,
  };
  return metadata;
}

for (let key in T.prototype) {
  if (T.prototype.hasOwnProperty(key)) {
    Component.prototype[key] = T.prototype[key];
  }
}

if ('setPrototypeOf' in Object) {
  Object.setPrototypeOf(Component.prototype, HTMLElement.prototype);
} else {
  Component.prototype.__proto__ = HTMLElement.prototype;
}

module.exports = Component;
