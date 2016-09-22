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

  /* istanbul ignore if  */
  if (undefined !== root.xin.createComponent) {
    root.console.warn('xin.createComponent already exists, please check your script order.');
    return;
  }

  const xin = root.xin;

  const XIN_DEBUG = xin.setup('debug') || false;

  var __id = 0;

  var __basePrototypes = {};

  var PROTO = {
    createdCallback: function() {
      // TODO this is to avoid unnecessary template xin-repeat render on
      // scoped template instance, do we still need this?
      if (xin.dom(this).parent('template')) {
        root.console.warn('hit createdCallback inside template');
        return;
      }

      this.__id = __nextId();
      xin.put(this.__id, this);
      this.setAttribute('xin-id', this.__id);

      // move initialize before createdCallback
      this.__initialize();

      this.__host = this.__host || this;
      if (this.__isConcrete()) {
        var ref = this.getAttribute('ref');
        if (ref && ref.startsWith('$')) {
          this.__ref = ref;
        }
      }

      if (XIN_DEBUG) {
        root.console.info('Created    ' + this.__getId());
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
          root.console.info('Ready      ' + this.__getId());
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
        root.console.error(e);
      });
    },

    attachedCallback: function() {
      if (this.__ready) {
        if (XIN_DEBUG) {
          root.console.info('Attached   ' + this.__getId() + (this.__attachedPending ? ' (delayed)' : ''));
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
    },

    detachedCallback: function() {
      if (this.__ready) {
        if (XIN_DEBUG) {
          root.console.info('Detached   ' + this.__getId());
        }
        this.__app = null;
        this.behave('detached');
      }
    },

    // query single element which is child of element
    $$: function(selector) {
      return this.querySelector(selector);
    },

    fire: function(type, detail, options) {
      return xin.dom(this).fire(type, detail, options);
    },

    get: function(path) {
      var object = this;

      var segments = path.split('.');

      segments.some(function(segment) {
        if (typeof object === 'undefined' || object === null) {
          return object;
        }
        object = object[segment];
        return false;
      });

      return object;
    },

    set: function(path, value) {
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
        if (undefined === object[segment] || object[segment] === null) {
          object[segment] = {};
        }
        object = object[segment];
      });

      var property = segments.slice(-1).pop();

      object[property] = value;

      this.__notify(path, value, oldValue);
    },

    push: function(path, value) {
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
    },

    splice: function(path) {
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
    },

    async: function(callback, waitTime) {
      var asyncO = new xin.Async(this);
      asyncO.start(callback, waitTime);
      return asyncO;
    },

    debounce: function(job, callback, wait, immediate) {
      var debouncer = this.__debouncers[job];
      if (debouncer && debouncer.running) {
        debouncer.cancel();
      } else {
        debouncer = this.__debouncers[job] = new xin.Debounce(this, immediate);
      }
      debouncer.start(callback, wait);

      return debouncer;
    },

    behave: function(method) {
      var args = Array.prototype.slice(arguments, 1);
      this.__behaviors.forEach(function(behavior) {
        if (behavior[method]) {
          behavior[method].apply(this, args);
        }
      }.bind(this));

      var proto = Object.getPrototypeOf(this);

      if ({}.hasOwnProperty.call(proto, method)) {
        this[method].apply(this, args);
      }

      this.fire(method);
    },

    render: function() {
      // var doRender = function () {
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
        xin.dom(this).querySelectorAll('content').forEach(function(element) {
          var parent = element.parentElement;
          if (element.getAttribute('select')) {
            var selector = element.getAttribute('select');

            this.__lightDoms.forEach(function(node) {
              if (node.nodeType === 1 && xin.dom(node).is(selector)) {
                var fragment = document.createDocumentFragment();
                xin.dom(node).childNodes.forEach(function(childNode) {
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
          xin.dom(element).remove();
        }.bind(this));
      } catch (err) {
        root.console.error(err.stack);
        throw err;
      }
      // }.bind(this);
      //
      // doRender();
    },

    __getApp: function() {
      if (!this.__app) {
        this.__app = xin.dom(this).parent('.xin-app-behavior');
      }

      return this.__app;
    },

    __getId: function() {
      return this.is + (this.__id ? (':' + this.__id) : '');
    },

    __notify: function(path, value, oldValue) {
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
        } catch (err) {
          root.console.trace(err.stack);
          return;
        }

        // FIXME keluarin walkEffect biar ga bikin function berulang kali
        var walkEffect = function(binding, value, oldValue) {
          binding.annotations.forEach(function(annotation) {
            try {
              annotation.effect(value, oldValue);
            } catch (err) {
              __printAnnotationError(this, annotation, err);
            }
          }.bind(this));

          Object.keys(binding.paths).forEach(function(i) {
            walkEffect(binding.paths[i], value ? value[i] : undefined);
          });
        }.bind(this);

        walkEffect(binding, value, oldValue);
      } catch (err) {
        // if (XIN_DEBUG) {
        root.console.warn(this.__getId() + '#__notify caught error: ' + err.message +
            '\n Stack trace: ' + err.stack);
        // }
      }
    },

    __serialize: function(value) {
      switch (typeof value) {
        case 'boolean':
          return value ? '' : undefined;

        case 'object':
          if (value instanceof Date) {
            return value;
          } else if (value) {
            try {
              return JSON.stringify(value);
            } catch (err) {
              return '';
            }
          }
          break;
        default:
          // noop
      }
      return value === null ? undefined : value;
    },

    __deserialize: function(value, type) {
      switch (type) {
        case Number:
          value = Number(value);
          break;

        case Boolean:
          value = Boolean(value === 'true' || value === '1' || value === 'on');
          break;

        case Object:
          try {
            value = JSON.parse(value);
          } catch (err) {
            // allow non-JSON literals like Strings and Numbers
            if (XIN_DEBUG) {
              root.console.warn('Failed decode json: "' + value + '" to Object');
            }
          }
          break;

        case Array:
          try {
            value = JSON.parse(value);
          } catch (err) {
            if (XIN_DEBUG) {
              root.console.warn('Failed decode json: "' + value + '" to Array');
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
    },

    __populateProperties: function() {
      for (var propName in this.__properties) {
        // exclude prototype properties
        if (!{}.hasOwnProperty.call(this.__properties, propName)) {
          continue;
        }

        var property = this.__properties[propName];
        var attrName = xin.Inflector.dashify(propName);
        var attrVal = this.getAttribute(attrName);

        var expr = xin.expr(attrVal);

        // copy value from attribute to property
        if (typeof attrVal === 'string') {
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
            throw new Error('"' + this.__getId() + '" missing required "' + propName + '"');
          } else {
            this[propName] = xin.v(property.value);
          }
        }

        if (property.observer) {
          this.__bind(new xin.ObserverAnnotation(this, propName, property.observer));
        }

        if (property.computed) {
          var annotations = xin.ComputedAnnotation.all(this, this, propName, property.computed);
          for (var i = 0; i < annotations.length; i++) {
            this.__bind(annotations[i]);
          }
        }

        if (property.notify && attrVal) {
          if (!expr.writable()) {
            root.console.warn('Cannot attach notification to host for one-way binding expr: ' + attrVal);
            return;
          }

          if (!expr.isPropertyExpression()) {
            root.console.warn('Cannot attach notification to host for non-property expr: ' + attrVal);
            return;
          }

          this.__bind(new xin.NotifyAnnotation(this, propName, expr.getToken()));
        }
      }
    },

    __notifyProperties: function() {
      Object.getOwnPropertyNames(this.__properties).forEach(function(name) {
        if (this[name]) {
          this.__notify(name, this[name]);
        }
      }.bind(this));
    },

    /**
     * Import root element members from template
     * @return {void}
     */
    __prepareRoot: function() {
      if (this.__template) {
        // fix nested templates for older browser
        xin.__fixNestedTemplate(this.__template);

        this.__root = xin.dom(document.importNode(this.__template.content, true)).childNodes;
      }
    },

    __prepareTemplate: function() {
      if (this.children.length === 1 && this.children[0].tagName === 'TEMPLATE') {
        this.__template = this.children[0];
      } else {
        this.__template = xin.templateFor(this);
      }
    },

    __populateLightDoms: function() {
      this.__lightDoms = [];

      if (this.__template) {
        xin.dom(this).childNodes.forEach(function(node) {
          this.__lightDoms.push(node);
          this.removeChild(node);
        }.bind(this));
      }
    },

    __parseAttributeAnnotations: function(node) {
      if (node.__unprocessedProperties) {
        var propNames = Object.keys(node.__unprocessedProperties);
        for (var i = 0; i < propNames.length; i++) {
          var propName = propNames[i];
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

      // clone attributes to array first then foreach because we will remove
      // attribute later if already processed
      // this hack to make sure when attribute removed the attributes index doesnt shift.
      Array.prototype.slice.call(node.attributes).forEach(function(attr) {
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
                return root.console.warn(
                  'Cannot bind event ' + attrName + ', app not found!'
                );
              }
              concreteHost = app;
            }

            var method = concreteHost[attr.value];
            if (!method) {
              return root.console.warn(
                'Cannot bind event ' + attrName + ', method ' +
                concreteHost.__getId() + '#' + attr.value + ' not found!'
              );
            }
            method.call(concreteHost, evt, evt.detail);
          }.bind(this));
        } else {
          // bind property annotation
          var expr = xin.expr(attr.value);

          if (expr.isValid()) {
            expr.getAnnotationsOf(this, node, attrName).forEach(function(annotation) {
              this.__bind(annotation);
            }.bind(this));

            node.removeAttribute(attrName);
            attr.value = '';
          }
        }
      }.bind(this));
    },

    __isConcrete: function() {
      return this.__concrete;
    },

    __getConcreteHost: function() {
      // search host until the host is not template
      var host = this.__host;
      while (host && !host.__concrete) {
        host = host.__host;
      }
      return host;
    },

    __bind: function(annotation) {
      // root.console.trace(annotation);
      this.__getBindingOf(annotation.property).annotate(annotation);
    },

    __getBindingOf: function(property) {
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
    },

    __parseTextAnnotations: function(node) {
      var expr = xin.expr(node.textContent);
      if (!expr.isValid()) {
        return;
      }

      expr.getAnnotationsOf(this, node).forEach(function(annotation) {
        this.__bind(annotation);
      }.bind(this));

      // TODO why ' ' why not ''
      // node.textContent = ' ';
      node.textContent = '';
    },

    __parseElementAnnotations: function(node) {
      // FIXME scoping bocor makanya harus gini
      if (node.__parent) {
        root.console.warn('__parseElementAnnotations scoping bocor dari parent', node.__parent);
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
        var childNodes = xin.dom(node).childNodes;
        for (var i = 0; i < childNodes.length; i++) {
          var childNode = childNodes[i];

          switch (childNode.nodeType) {
            case Node.TEXT_NODE:
              this.__parseTextAnnotations(childNode);
              break;
            case Node.ELEMENT_NODE:
              this.__parseElementAnnotations(childNode);
              break;
            default:
              // noop
          }
        }
      }
    },

    __parseAnnotations: function() {
      if (!this.__root) {
        return;
      }

      this.__root.forEach(function(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          this.__parseElementAnnotations(node);
        }
      }.bind(this));
    },

    __prepareListeners: function() {
      Object.keys(this.__listeners).forEach(function(key) {
        var listenerMetadata = __parseListenerMetadata(key);
        var listenerHandler = this[this.__listeners[key]];
        this.addEventListener(listenerMetadata.eventName, function(evt) {
          if (listenerMetadata.selector && !xin.dom(evt.target).matches(listenerMetadata.selector)) {
            return;
          }
          return listenerHandler.apply(this, arguments);
        }.bind(this));
      }.bind(this));
    },

    __initialize: function() {
      this.__debouncers = {};
      this.__unprocessedProperties = {};
      this.__bindings = {};
      this.__children = [];
      this.$ = {};
    },

    __isReady: function() {
      return Promise.all(this.__children.map(function(child) {
        if (!child.is) {
          return null;
        }
        return child.__isReady();
      }));
    },

    __initBehaviors: function() {
      var proto = Object.getPrototypeOf(this);

      var properties = {};
      var listeners = {};

      this.__behaviors.forEach(function(behavior) {
        // mixin behavior functions
        for (var key in behavior) {
          if ({}.hasOwnProperty.call(behavior, key) && typeof behavior[key] === 'function') {
            proto[key] = behavior[key];
          }
        }

        // mixing behavior properties
        if (behavior.properties) {
          Object.keys(behavior.properties).forEach(function(propKey) {
            properties[propKey] = __baseTranslatePropertyDef(behavior.properties[propKey]);
          });
        }

        // mixing behavior listeners
        if (behavior.listeners) {
          Object.keys(behavior.listeners).forEach(function(listenerKey) {
            listeners[listenerKey] = __baseTranslateListenerDef(behavior.listeners[listenerKey]);
          });
        }
      });

      // populate properties from behaviors
      for (var pKey in properties) {
        if (!this.__properties[pKey]) {
          this.__properties[pKey] = properties[pKey];
        }
      }

      // populate listeners from behaviors
      for (var lKey in listeners) {
        if (!this.__listeners[lKey]) {
          this.__listeners[lKey] = listeners[lKey];
        }
      }
    },
  };
  var PROTO_KEYS = Object.keys(PROTO);

  function __nextId() {
    return __id++;
  }

  function __basePopulateListeners(listeners) {
    // TODO review this, pass through listeners
    return listeners || {};
  }

  function __baseTranslateListenerDef(listener) {
    // TODO review this, pass through listener value only
    return listener;
  }

  function __basePopulateProperties(properties) {
    if (!properties) {
      return {};
    }

    var baseProperties = {};
    for (var key in properties) {
      if ({}.hasOwnProperty.call(properties, key)) {
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
    switch (typeof prop) {
      case 'object':
        for (var i in prop) {
          if ({}.hasOwnProperty.call(prop, i)) {
            definition[i] = prop[i];
          }
        }
        break;
      case 'function':
        definition.type = prop;
        break;
      default:
        // noop
    }

    return definition;
  }

  function __basePopulateBehaviors(behaviors, arr) {
    if (!behaviors) {
      return [];
    }

    arr = arr || [];

    behaviors.forEach(function(behavior) {
      if (!behavior) {
        return;
      }

      if (typeof behavior === 'string') {
        var resolvedBehavior = xin(behavior);
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
      (annotation.inspect ? annotation.inspect() : '#' + annotation.kind) + '\n' + e.stack);
  }

  function __preparePrototype(proto) {
    for (var i = 0; i < PROTO_KEYS.length; i++) {
      var key = PROTO_KEYS[i];
      proto[key] = PROTO[key];
    }
  }

  function __base(options) {
    options = options || {};

    var ext = options.extends || '';
    var BaseProto = __basePrototypes[ext];
    if (!BaseProto) {
      var IntermediateProto = function() {
        __preparePrototype(this);
      };
      switch (ext) {
        case 'template':
          IntermediateProto.prototype = HTMLTemplateElement.prototype;
          break;
        case 'input':
          IntermediateProto.prototype = HTMLInputElement.prototype;
          break;
        default:
          IntermediateProto.prototype = HTMLElement.prototype;
      }

      BaseProto = __basePrototypes[ext] = function(options) {
        // prototype specific properties, which never changed across instances
        this.is = options.is;
        this.extends = options.extends;
        this.__concrete = options.is[0] !== '$';
        this.__properties = __basePopulateProperties(options.properties);
        this.__listeners = __basePopulateListeners(options.listeners);
        this.__behaviors = __basePopulateBehaviors(options.behaviors);
        this.__options = options;

        // initialize behaviors to make sure createdCallback ready with behaviors
        this.__initBehaviors();

        for (var key in options) {
          if ({}.hasOwnProperty.call(options, key) && typeof options[key] === 'function') {
            this[key] = options[key];
          }
        }
      };
      BaseProto.prototype = new IntermediateProto();
    }

    return new BaseProto(options);
  }
  xin.base = __base;

  function __createComponent(options) {
    if (!options.is) {
      throw new Error('Component does not have "is" name');
    }
    var element;
    if (options.extends) {
      element = {
        extends: options.extends,
        prototype: __base(options),
      };
    } else {
      element = {
        prototype: __base(options),
      };
    }
    return document.registerElement(options.is, element);
  }

  xin.createComponent = __createComponent;

  // DEPRECATED
  xin.Component = function() {
    console.warn('DEPRECATED: xin.Component() is deprecated, please use xin.createComponent()');
    return __createComponent.apply(null, arguments);
  };
})(this);
