/**
 * Copyright (c) 2015 Xinix Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

(function(root) {
  'use strict';

  var xin = root.xin;

  if (undefined !== xin.Component) {
    console.warn('xin.Component already exists, please check your script order.');
    return;
  }

  var XIN_DEBUG = xin.setup('debug') || false;

  var WrappedElement = function(ext) {
    this.__ext = ext;
    switch(ext || '') {
      case 'template':
        Object.setPrototypeOf(this, HTMLTemplateElement.prototype);
        break;
      default:
        Object.setPrototypeOf(this, HTMLElement.prototype);
    }
  };

  function __basePopulateListeners(listeners) {
    // FIXME review this, pass through listeners
    return listeners || {};
  }

  function __baseTranslateListenerDef(listener) {
    // FIXME review this, pass through listener value only
    return listener;
  }

  function __basePopulateProperties(properties) {
    var baseProperties = {
      //parameters: Object,
    };
    if (properties) {
      for(var key in properties) {
        baseProperties[key] = __baseTranslatePropertyDef(properties[key]);
      }
    }
    return baseProperties;
  }

  function __baseTranslatePropertyDef(prop) {
    var definition = {
      type: String,
      value: null,
      observer: null,
      readOnly: false,
      notify: false,
    };
    switch(typeof prop) {
      case 'object':
        for(var i in prop) {
          definition[i] = prop[i];
        }
        break;
      case 'function':
        definition.type = prop;
        break;
    }

    return definition;
  }

  function __basePopulateBehaviors (behaviors, arr) {
    if (!behaviors) return xin.ear;

    arr = arr || [];

    behaviors.forEach(function(behavior) {
      if (!behavior) return;

      if (typeof behavior === 'string') {
        var resolvedBehavior = xin.get(behavior);
        if (!resolvedBehavior) {
          throw new Error('Cannot found named behavior: ' + behavior);
        }
        behavior = resolvedBehavior;
      }

      if (Array.isArray(behavior)) {
        __basePopulateBehaviors(behavior, arr);
      } else {
        arr.push(behavior);
      }
    });

    return arr;
  }

  function __parseListenerMetadata(key) {
    var splitted = key.split(' ');
    var metadata = {
      eventName: splitted[0],
      selector: splitted[1] ? splitted.slice(1).join(' ') : null,
    };
    return metadata;
  }

  function __printAnnotationError(context, annotation, e) {
    console.error('Error caught on ' +
        context.__getId() +
        '#__notify#walkEffect annotation: ' +
        (annotation.inspect ? annotation.inspect() : '#' + annotation.kind) + '\n'  + e.stack);
  }

  var Base = xin.Base = function(options) {
    options = options || {};

    // prototype specific properties, which never changed across instances
    this.is = options.is;
    this.extends = options.extends;
    this.__properties = __basePopulateProperties(options.properties);
    this.__listeners = __basePopulateListeners(options.listeners);
    this.__behaviors = __basePopulateBehaviors(options.behaviors);
    this.__options = options;

    // instance specific properties, which each instance will have different data
    // should go to Component instead of Base

    Object.setPrototypeOf(this, new WrappedElement(options.extends));

    this.createdCallback = function() {
      // TODO this is to avoid unnecessary template xin-repeat render on
      // scoped template instance, do we still need this?
      if (xin.Dom(this).parent('template')) return;

      this.__id = Component.nextId();
      xin.__components[this.__id] = this;
      this.setAttribute('xin-id', this.__id);

      // move initialize before createdCallback
      this.__initialize();

      this.__host = this.__host || this;
      if (this.is) {
        var ref = this.getAttribute('ref');
        if (ref && ref.startsWith('$')) {
          this.__ref = ref;
        }
      }


      if (XIN_DEBUG) {
        console.info('Created    ' + this.__getId());
      }

      this.behave('created');

      this.__populateProperties();

      this.__prepareTemplate();

      // prepare root will render children components first and current component will halt
      this.__prepareRoot();

      this.__parseAnnotations();

      this.__notifyProperties();

      this.__isReady()
      .then(function() {
        this.__ready = true;

        if (XIN_DEBUG) {
          console.info('Ready      ' + this.__getId());
        }

        // populate light dom after ready, before it was before ready
        this.__populateLightDoms();

        this.__prepareListeners();

        this.render();

        this.behave('ready');

        if (this.__attachedPending) {
          this.async(function() {
            this.attachedCallback();
          });
        }

      }.bind(this), function(e) {
        console.error(e);
      }.bind(this));
    };

    this.attachedCallback = function() {
      if (this.__ready) {
        if (XIN_DEBUG) {
          console.info('Attached   ' + this.__getId() + (this.__attachedPending ? ' (delayed)' : ''));
        }

        this.__attachedPending = false;

        var app = this.__getApp();
        if (app) {
          if (this.__ref) {
            app.set(this.__ref, this);
          }

          app.addEventListener('property-sync', function(evt) {
            this.set(evt.detail.property, evt.detail.value);
          }.bind(this));
        }
        this.behave('attached');
      } else {
        this.__attachedPending = true;
      }
    };

    this.detachedCallback = function() {
      if (this.__ready) {
        if (XIN_DEBUG) {
          console.info('Detached   ' + this.__getId());
        }
        this.__app = null;
        this.behave('detached');
      }
    };

    // query single element which is child of element
    this.$$ = function(selector) {
      return this.querySelector(selector);
    };

    this.fire = function(type, detail, options) {
      return xin.Dom(this).fire(type, detail, options);
    };

    this.get = function(path) {
      var object = this;

      var segments = path.split('.');

      segments.some(function(segment) {
        if (typeof object === 'undefined' || object === null) {
          return object;
        }
        object = object[segment];
      });

      return object;
    };

    this.set = function(path, value) {
      if (undefined === value) {
        return;
      }

      var oldValue = this.get(path);
      if (value === oldValue) {
        return;
      }

      var object = this;

      var segments = path.split('.');

      segments.slice(0, -1).forEach(function(segment) {
        if (!object) {
          return;
        }
        if (undefined === object[segment] || null === object[segment]) {
          object[segment] = {};
        }
        object = object[segment];
      });

      var property = segments.slice(-1).pop();

      object[property] = value;

      this.__notify(path, value, oldValue);
    };

    this.push = function(path, value) {
      if (value === undefined) {
        return;
      }

      var destination = this.get(path);
      if (!destination || typeof destination.push !== 'function') {
        throw new Error('Cannot push to non array');
      }
      var newValue = destination.slice();
      var oldValue = destination;

      var result = newValue.push.apply(newValue, Array.prototype.slice.call(arguments, 1));

      this.set(path, newValue);

      this.__notify(path, newValue, oldValue);

      return result;
    };

    this.splice = function(path) {
      var destination = this.get(path);
      if (!destination || typeof destination.push !== 'function') {
        throw new Error('Cannot push to non array');
      }
      var newValue = destination.slice();
      var oldValue = destination;

      var result = newValue.splice.apply(newValue, Array.prototype.slice.call(arguments, 1));
      this.set(path, newValue);

      this.__notify(path, newValue, oldValue);

      return result;
    };

    this.async = function(callback, waitTime) {
      var asyncO = new xin.Async(this);
      asyncO.start(callback, waitTime);
      return asyncO;
    };

    this.debounce = function(job, callback, wait, immediate) {
      var debouncer = this.__debouncers[job];
      if (debouncer && debouncer.running) {
        debouncer.cancel();
      } else {
        debouncer = this.__debouncers[job] = new xin.Debounce(this, immediate);
      }
      debouncer.start(callback, wait);

      return debouncer;
    };

    this.behave = function(method) {
      var args = Array.prototype.slice(arguments, 1);
      this.__behaviors.forEach(function(behavior) {
        if (behavior[method]) {
          behavior[method].apply(this, args);
        }
      }.bind(this));

      if (Object.getPrototypeOf(this).hasOwnProperty(method)) {
        this[method].apply(this, args);
      }

      this.fire(method);
    };

    this.render = function() {
      // var doRender = function() {
      this.classList.add(this.is);

      if (!this.__root) {
        return;
      }

      this.__root.forEach(function(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          node.classList.add(this.is);
        }
        this.appendChild(node);
      }.bind(this));

      try {
        xin.Dom(this).querySelectorAll('content').forEach(function(element) {
          var parent = element.parentElement;
          if (element.getAttribute('select')) {
            var selector = element.getAttribute('select');

            this.__lightDoms.forEach(function(node) {
              if (node.nodeType === 1 && xin.Dom(node).is(selector)) {
                var fragment = document.createDocumentFragment();
                xin.Dom(node).childNodes.forEach(function(childNode) {
                  fragment.appendChild(childNode);
                });
                parent.insertBefore(fragment, element);
              }
            });
          } else {
            this.__lightDoms.forEach(function(node) {
              parent.insertBefore(node, element);
            });
          }
          // remove leaked content insertion to above ancestors component
          xin.Dom(element).remove();
        }.bind(this));
      } catch(e) {
        console.error(e.stack);
        throw e;
      }
      // }.bind(this);
      //
      // doRender();
    };

    this.__getApp = function() {
      if (!this.__app) {
        this.__app = xin.Dom(this).parent('.xin-app-behavior');
      }

      return this.__app;
    };

    this.__getId = function() {
      return this.is + ':' + this.__id;
    };

    // FIXME revisit this
    this.__notify = function(path, value, oldValue) {
      var segments = path.split('.');
      try {
        var walkingSegments = [];
        var binding;
        try {
          var found = segments.every(function(segment) {
            var currentBinding = binding ? binding.paths[segment] : this.__bindings[segment];
            if (!currentBinding) {
              return false;
            }

            walkingSegments.push(segment);
            binding = currentBinding;
            return true;
          }.bind(this), null);

          if (!found) {
            return;
          }
        } catch(e) {
          console.trace(e.stack);
          return;
        }

        var walkEffect = function(binding, value, oldValue) {
          binding.annotations.forEach(function(annotation) {
            try {
              annotation.effect(value, oldValue);
            } catch(e) {
              __printAnnotationError(this, annotation, e);
            }
          }.bind(this));

          for (var i in binding.paths) {
            walkEffect(binding.paths[i], value? value[i] : undefined);
          }
        }.bind(this);

        walkEffect(binding, value, oldValue);
      } catch(e) {
        //if (XIN_DEBUG) {
          console.warn(this.__getId() + '#__notify caught error: ' + e.message +
              '\n Stack trace: ' + e.stack);
        //}
      }
    };

    this.__serialize = function(value) {
      switch (typeof value) {
        case 'boolean':
          return value ? '' : undefined;

        case 'object':
          if (value instanceof Date) {
            return value;
          } else if (value) {
            try {
              return JSON.stringify(value);
            } catch(e) {
              return '';
            }
          }
      }
      return value !== null ? value : undefined;
    };

    this.__deserialize = function(value, type) {
      switch (type) {
        case Number:
          value = Number(value);
          break;

        case Boolean:
          if (value === 'true' || value == 1 || value === 'on') value = true;
          else value = false;
          break;

        case Object:
          try {
            value = JSON.parse(value);
          } catch(e) {
            // allow non-JSON literals like Strings and Numbers
            if (XIN_DEBUG) {
              console.warn('Failed decode json: "' + value + '" to Object');
            }
          }
          break;

        case Array:
          try {
            value = JSON.parse(value);
          } catch(x) {
            if (XIN_DEBUG) {
              console.warn('Failed decode json: "' + value + '" to Array');
            }
            value = null;
          }
          break;

        case Date:
          value = new Date(value);
          break;

        // behave like default for now
        // case String:
        default:
          break;
      }
      return value;
    };

    this.__populateProperties = function() {
      for(var propName in this.__properties) {
        // exclude prototype properties
        if (!this.__properties.hasOwnProperty(propName)) {
          continue;
        }

        var property = this.__properties[propName];
        var attrName = xin.Inflector.dashify(propName);
        var attrVal = this.getAttribute(attrName);

        var expr = xin.Expr(attrVal);

        // copy value from attribute to property
        if ('string' === typeof attrVal) {
          var val;
          // set property value when attr set and the value specified is static
          // otherwise set it to #__unprocessedProperties tobe processed later
          if (expr.isValid()) {
            this.__unprocessedProperties[propName] = expr;
          } else {
            val = this.__deserialize(attrVal, property.type);
          }

          this.removeAttribute(attrName);
          this[propName] = val;
        }

        // when property is undefined, log error when property is required otherwise assign to default value
        if (undefined === this[propName]) {
          if (property.required) {
            throw Error('"' + this.__getId() + '" missing required "' + propName + '"');
          } else {
            this[propName] = xin.v(property.value);
          }
        }

        if (property.observer) {
          this.__bind(new xin.ObserverAnnotation(this, propName, property.observer));
        }

        if (property.computed) {
          var annotations = xin.ComputedAnnotation.all(this, this, propName, property.computed);
          for(var i = 0; i < annotations.length; i++) {
            this.__bind(annotations[i]);
          }
        }

        if (property.notify && attrVal) {
          if (!expr.writable()) {
            console.warn('Cannot attach notification to host for one-way binding expr: ' + attrVal);
            return;
          }

          if (!expr.isPropertyExpression()) {
            console.warn('Cannot attach notification to host for non-property expr: ' + attrVal);
            return;
          }

          this.__bind(new xin.NotifyAnnotation(this, propName, expr.getToken()));
        }
      }
    };

    this.__notifyProperties = function() {
      Object.getOwnPropertyNames(this.__properties).forEach(function(name) {
        if (this[name]) {
          this.__notify(name, this[name]);
        }
      }.bind(this));
    };

    /**
     * Import root element members from template
     * @return {void}
     */
    this.__prepareRoot = function() {
      if (this.__template) {
        // fix nested templates for older browser
        xin.__fixNestedTemplate(this.__template);

        this.__root = xin.Dom(document.importNode(this.__template.content, true)).childNodes;
      }
    };

    this.__prepareTemplate = function() {
      if (this.children.length === 1 && this.children[0].tagName === 'TEMPLATE') {
        this.__template = this.children[0];
        // TODO reinspect this if bugs occured on template polyfill
        // dont have to decorate, wont be here in old browser, already populated with xin.__fixNestedTemplate
        // if (HTMLTemplateElement.decorate) {
        //  HTMLTemplateElement.decorate(this.__template);
        //}
      } else {
        this.__template = xin.templateFor(this);
      }
    };

    this.__populateLightDoms = function() {
      this.__lightDoms = [];

      if (this.__template) {
        xin.Dom(this).childNodes.forEach(function(node) {
          this.__lightDoms.push(node);
          this.removeChild(node);
        }.bind(this));
      }
    };

    this.__parseAttributeAnnotations = function(node) {
      if (node.__unprocessedProperties) {
        for(var propName in node.__unprocessedProperties) {
          var expr = node.__unprocessedProperties[propName];
          if (!expr.isValid()) {
            throw new Error('Compromised unprocessed properties with invalid token: ' + expr.expression);
          }

          expr.getAnnotationsOf(this, node, propName).forEach(function(annotation) {
            this.__bind(annotation);
          }.bind(this));

          node.__unprocessedProperties[propName] = null;
        }
      }

      Array.prototype.forEach.call(node.attributes, function(attr) {
        var attrName = attr.name;

        if (attrName.indexOf('on-') === 0) {
          // bind event annotation
          var eventName = attrName.substr(3);
          if (eventName === 'tap') {
            eventName = 'click';
          }
          node.addEventListener(eventName, function(evt) {
            var concreteHost = this.__getConcreteHost();

            // when method startsWith $, call method of app
            if (attr.value.startsWith('$')) {
              var app = concreteHost.__getApp();
              if (!app) {
                return console.warn(
                  'Cannot bind event ' + attrName + ', app not found!'
                );
              }
              concreteHost = app;
            }

            var method = concreteHost[attr.value];
            if (!method) {
              return console.warn(
                'Cannot bind event ' + attrName + ', method ' +
                concreteHost.__getId() + '#' + attr.value + ' not found!'
              );
            }
            method.call(concreteHost, evt, evt.detail);
          }.bind(this));
        } else {
          // bind property annotation
          var expr = xin.Expr(attr.value);

          if (expr.isValid()) {
            expr.getAnnotationsOf(this, node, attrName).forEach(function(annotation) {
              this.__bind(annotation);
            }.bind(this));

            node.removeAttribute(attrName);
            attr.value = '';
          }
        }
      }.bind(this));
    };

    this.__getConcreteHost = function() {
      // search host until the host is not template
      var host = this.__host;
      while (host && !host.is) {
        host = host.__host;
      }
      return host;
    };

    this.__bind = function(annotation) {
      // console.trace(annotation);
      this.__getBindingOf(annotation.property).annotate(annotation);
    };

    this.__getBindingOf = function(property) {
      var segments = property.name.split('.');

      var bindings;
      var binding;

      for (var i = 0; i < segments.length; i++) {
        var segment = segments[i];

        bindings = binding ? binding.paths : this.__bindings;

        if (!bindings[segment]) {
          bindings[segment] = new xin.Binding(segment);
        }

        binding = bindings[segment];
      }

      return binding;
    };

    this.__parseTextAnnotations = function(node) {
      var expr = xin.Expr(node.textContent);
      if (!expr.isValid()) {
        return;
      }

      expr.getAnnotationsOf(this, node).forEach(function(annotation) {
        this.__bind(annotation);
      }.bind(this));

      // TODO why ' ' why not ''
      // node.textContent = ' ';
      node.textContent = '';
    };

    this.__parseElementAnnotations = function(node) {
      // FIXME scoping bocor makanya harus gini
      if (node.__parent) {
        return;
      }

      node.__parent = this;
      this.__children.push(node);

      // populate $
      if (node.id && !this.$[node.id]) {
        this.$[node.id] = node;
      }

      if (node.attributes && node.attributes.length) {
        this.__parseAttributeAnnotations(node);
      }

      if (node.childNodes && node.childNodes.length) {
        var childNodes = xin.Dom(node).childNodes;
        for(var i = 0; i < childNodes.length; i++) {
          var childNode = childNodes[i];
          switch (childNode.nodeType) {
            case Node.TEXT_NODE:
              this.__parseTextAnnotations(childNode);
              break;
            case Node.ELEMENT_NODE:
              this.__parseElementAnnotations(childNode);
              break;
          }
        }
      }
    };

    this.__parseAnnotations = function() {
      if (!this.__root) {
        return;
      }

      this.__root.forEach(function(node) {
        switch(node.nodeType) {
          case Node.ELEMENT_NODE:
            this.__parseElementAnnotations(node);
            break;
        }
      }.bind(this));
    };

    this.__prepareListeners = function() {
      Object.keys(this.__listeners).forEach(function(key) {
        var listenerMetadata = __parseListenerMetadata(key);
        var listenerHandler = this[this.__listeners[key]];
        this.addEventListener(listenerMetadata.eventName, function(evt) {
          if (listenerMetadata.selector && !xin.Dom(evt.target).matches(listenerMetadata.selector)) {
            return;
          }
          return listenerHandler.apply(this, arguments);
        }.bind(this));
      }.bind(this));
    };

    this.__initialize = function() {
      this.__debouncers = {};
      this.__unprocessedProperties = {};
      this.__bindings = {};
      this.__children = [];
      this.$ = {};
    };

    this.__isReady = function() {
      return Promise.all(this.__children.map(function(child) {
          if (!child.is) {
            return;
          }
          return child.__isReady();
        }.bind(this)));
    };

    this.__initBehaviors = function() {
      var proto = Object.getPrototypeOf(this);

      var properties = {};
      var listeners = {};

      this.__behaviors.forEach(function(behavior) {
        // mixin behavior functions
        for(var key in behavior) {
          if (behavior.hasOwnProperty(key) && (typeof behavior[key]) === 'function') {
            proto[key] = behavior[key];
          }
        }

        // mixing behavior properties
        for(var propKey in behavior.properties) {
          properties[propKey] = __baseTranslatePropertyDef(behavior.properties[propKey]);
        }

        // mixing behavior listeners
        for(var listenerKey in behavior.listeners) {
          listeners[listenerKey] = __baseTranslateListenerDef(behavior.listeners[listenerKey]);
        }
      });

      // populate properties from behaviors
      for(var pKey in properties) {
        if (!this.__properties[pKey]) {
          this.__properties[pKey] = properties[pKey];
        }
      }

      // populate listeners from behaviors
      for(var lKey in listeners) {
        if (!this.__listeners[lKey]) {
          this.__listeners[lKey] = listeners[lKey];
        }
      }
    };

    // initialize behaviors to make sure createdCallback ready with behaviors
    this.__initBehaviors();
  };

  var Component = xin.Component = function(options) {
    var Element = {
      prototype: new Base(options)
    };

    //console.log(Element);

    for(var key in options) {
      if (options.hasOwnProperty(key) && typeof options[key] === 'function') {
        Element.prototype[key] = options[key];
      }
    }

    if (options.extends) {
      Element.extends = options.extends;
    }

    return document.registerElement(options.is, Element);
  };

  var ID = 0;
  Component.nextId = function() {
    return ID++;
  };
})(this);
