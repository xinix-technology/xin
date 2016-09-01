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

  var XIN_DEBUG = xin.setup('debug') || false;

  var WrappedElement = function(ext) {
    switch(ext || '') {
      case 'template':
        Object.setPrototypeOf(this, HTMLTemplateElement.prototype);
        break;
      default:
        Object.setPrototypeOf(this, HTMLElement.prototype);
    }
  };

  var __basePopulateListeners = function(listeners) {
    // FIXME review this, pass through listeners
    return listeners || {};
  };

  var __baseTranslateListenerDef = function(listener) {
    // FIXME review this, pass through listener value only
    return listener;
  };

  var __basePopulateProperties = function(properties) {
    var baseProperties = {
      //parameters: Object,
    };
    if (properties) {
      for(var key in properties) {
        baseProperties[key] = __baseTranslatePropertyDef(properties[key]);
      }
    }
    return baseProperties;
  };

  var __baseTranslatePropertyDef = function(prop) {
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
  };

  var __basePopulateBehaviors = function(behaviors, arr) {
    if (!behaviors) return xin.ear;

    arr = arr || [];

    behaviors.forEach(function(behavior) {
      if (!behavior) return;

      var i;

      if (typeof behavior === 'string') {
        behavior = xin.get(behavior);
      }

      if (Array.isArray(behavior)) {
        __basePopulateBehaviors(behavior, arr);
      } else {
        arr.push(behavior);
      }
    });

    return arr;
  };

  var Base = xin.Base = function(options) {
    options = options || {};

    Object.setPrototypeOf(this, new WrappedElement(options.extends));

    Object.defineProperties(this, {
      'is': {
        enumerable: true,
        writable: false,
        configurable: false,
        value: options.is
      },
      'extends': {
        enumerable: true,
        writable: false,
        configurable: false,
        value: options.extends,
      },
      '__properties': {
        enumerable: true,
        writable: false,
        configurable: false,
        value: __basePopulateProperties(options.properties)
      },
      '__listeners': {
        enumerable: true,
        writable: false,
        configurable: false,
        value: __basePopulateListeners(options.listeners)
      },
      'behaviors': {
        enumerable: true,
        writable: false,
        configurable: false,
        value: __basePopulateBehaviors(options.behaviors)
      },
      '__options': {
        enumerable: false,
        writable: false,
        configurable: false,
        value: options,
      },
      '__debouncers': {
        enumerable: false,
        writable: false,
        configurable: false,
        value: {},
      },
    });

    this.$$ = function(selector) {
      return this.querySelector(selector);
    };

    this.extend = function(options) {
      if (!options || typeof options !== 'object') {
        return;
      }

      for(var key in options) {
        if (options.hasOwnProperty(key)) {
          this[key] = options[key];
        }
      }
    };

    this.__getId = function() {
      return this.is + ':' + this.__id;
    };

    this._parseListenerMetadata = function(key) {
      var splitted = key.split(' ');
      var metadata = {
        eventName: splitted[0],
        selector: splitted[1] ? splitted.slice(1).join(' ') : null,
      };
      return metadata;
    };

    this._initBehaviors = function() {
      var proto = Object.getPrototypeOf(this);

      var properties = {};
      var listeners = {};

      this.behaviors.forEach(function(behavior) {
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
      if (value === undefined) {
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
        if (object[segment] === undefined || object[segment] === null) {
          object[segment] = {};
        }
        object = object[segment];
      });

      var property = segments.slice(-1).pop();

      object[property] = value;

      this._notify(path, value, oldValue);
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

      newValue.push(value);
      this.set(path, newValue);

      this._notify(path, newValue, oldValue);
    };

    this.splice = function(path, start, deleteCount) {
      var destination = this.get(path);
      if (!destination || typeof destination.push !== 'function') {
        throw new Error('Cannot push to non array');
      }
      var newValue = destination.slice();
      var oldValue = destination;

      newValue.splice.apply(newValue, Array.prototype.slice.call(arguments, 1));
      this.set(path, newValue);

      this._notify(path, newValue, oldValue);
    };

    this._notify = function(path, value, oldValue) {
      var segments = path.split('.');
      try {
        var walkingSegments = [];
        var binding;
        try {
          var found = segments.every(function(segment) {
            var currentBinding = binding ? binding.paths[segment] : this._bindings[segment];
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
          console.trace(e.message);
          return;
        }

        var walkEffect = function(binding, value, oldValue) {
          binding.annotations.forEach(function(annotation) {
            // TODO why do we need this, because we cant force notify if this one active
            // if (value === oldValue) {
            //   return;
            // }
            try {
              annotation.effect(value, oldValue);
            } catch(e) {
              var host = annotation.target._parent ? annotation.target._parent.is : 'null';
              var annotDescriptor = '(host:' + host + ' kind:' + annotation.kind;
              if (annotation.kind === 'method') {
                annotDescriptor += ' method:' + annotation.method;
              } else {
                annotDescriptor += ' property:' + annotation.property;
              }
              annotDescriptor += ')';
              console.error('Error caught on ' +
                  this.__getId() +
                  '#_notify#walkEffect annotation: ' +
                  annotDescriptor + '\n'  + e.stack);
            }
          }.bind(this));

          for (var i in binding.paths) {
            walkEffect(binding.paths[i], value? value[i] : undefined);
          }
        }.bind(this);

        walkEffect(binding, value, oldValue);
      } catch(e) {
        //if (XIN_DEBUG) {
          console.warn(this.__getId() + '#_notify caught error: ' + e.message +
              '\n Stack trace: ' + e.stack);
        //}
      }
    };

    this.async = function(callback, waitTime) {
      var async = new xin.Async(this);
      async.start(callback, waitTime);
      return async;

      //return ~setTimeout(callback.bind(this), waitTime || 0);
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

      //var timeout;
      //var context = this;
      //return function() {
      //  var args = arguments;
      //  var later = function() {
      //    timeout = null;
      //    if (!immediate) callback.apply(context, args);
      //  };
      //  var callNow = immediate && !timeout;
      //  clearTimeout(timeout);
      //  timeout = setTimeout(later, wait);
      //  if (callNow) callback.apply(context, args);
      //};
    };

    this.behave = function(method) {
      var args = Array.prototype.slice(arguments, 1);
      this.behaviors.forEach(function(behavior) {
        if (behavior[method]) {
          behavior[method].apply(this, args);
        }
      }.bind(this));

      if (Object.getPrototypeOf(this).hasOwnProperty(method)) {
        this[method].apply(this, args);
      }

      this.fire(method);
    };

    this._serialize = function(value) {
      switch (typeof value) {
        case 'boolean':
          return value ? '' : undefined;

        case 'object':
          if (value instanceof Date) {
            return value;
          } else if (value) {
            try {
              return JSON.stringify(value);
            } catch(x) {
              return '';
            }
          }
      }
      return value !== null ? value : undefined;
    };

    this._deserialize = function(value, type) {
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
          } catch(x) {
            // allow non-JSON literals like Strings and Numbers
          }
          break;

        case Array:
          try {
            value = JSON.parse(value);
          } catch(x) {
            value = null;
            console.warn('Couldn\'t decode Array as JSON');
          }
          break;

        case Date:
          value = new Date(value);
          break;

        case String:
          // behave like default for now
        default:
          break;
      }
      return value;
    };

    this._populateProperties = function() {
      Object.getOwnPropertyNames(this.__properties).forEach(function(name) {
        var attrName = xin.Inflector.dashify(name);
        var val = null;
        var attrVal = this.getAttribute(attrName);

        // set property value when attr set and the value specified is static
        if (typeof attrVal === 'string') {
          var prefix = attrVal.substr(0, 2);
          if (prefix !== '{{' && prefix !== '[[') {
            val = this._deserialize(attrVal, this.__properties[name].type);
          }
          this[name] = val;
        }
      }.bind(this));


      // validate each property requirements
      for(var key in this.__properties) {
        // only validate own property
        if (this.__properties.hasOwnProperty(key) && typeof this[key] === 'undefined') {
          // if property is required and empty show error
          // otherwise put the default value
          if (this.__properties[key].required) {
            console.error('"' + this.__getId() + '" missing required "' + key + '"');
          } else if (this.__properties[key].hasOwnProperty('value')) {
            this[key] = v(this.__properties[key].value);
          }
        }
      }
    };

    this._notifyProperties = function() {
      Object.getOwnPropertyNames(this.__properties).forEach(function(name) {
        if (this[name]) {
          this._notify(name, this[name]);
        }
      }.bind(this));
    };

    /**
     * Import root element members from template
     * @return {void}
     */
    this._prepareRoot = function() {
      if (this._template) {
        // fix nested templates for older browser
        xin._fixNestedTemplate(this._template);

        this._root = xin.Dom(document.importNode(this._template.content, true)).childNodes;
      }
    };

    this._prepareTemplate = function() {
      if (this.children.length === 1 && this.children[0].tagName === 'TEMPLATE') {
        this._template = this.children[0];
        // TODO reinspect this if bugs occured on template polyfill
        // dont have to decorate, wont be here in old browser, already populated with xin._fixNestedTemplate
        // if (HTMLTemplateElement.decorate) {
        //  HTMLTemplateElement.decorate(this._template);
        //}
      } else {
        this._template = xin.templateFor(this);
      }
    };

    this._populateLightDoms = function() {
      this._lightDoms = [];

      if (this._template) {
        xin.Dom(this).childNodes.forEach(function(node) {
          this._lightDoms.push(node);
          this.removeChild(node);
        }.bind(this));
      }
    };

    this._parseAttributeAnnotations = function(node) {
      Array.prototype.forEach.call(node.attributes, function(attr) {
        // bind event annotation
        if (attr.name.indexOf('on-') === 0) {
          var eventName = attr.name.substr(3);
          if (eventName === 'tap') {
            eventName = 'click';
          }
          node.addEventListener(eventName, function(evt) {
            var concreteHost = this._getConcreteHost();
            var method = concreteHost[attr.value];
            if (!method) {
              return console.warn(
                'Cannot bind event ' + attr.name + ', method ' +
                concreteHost.__getId() + '#' + attr.value + ' not found!'
              );
            }
            method.call(concreteHost, evt, evt.detail);
          }.bind(this));
        // bind property annotation
        } else {
          var mode = attr.value.substr(0, 2);
          if (mode === '[[' || mode === '{{') {
            var annotation = {
              mode: mode[0],
              value: attr.value.slice(2, -2).trim(),
              target: node,
              attribute: attr.name
            };

            attr.value = '';
            this._bind(annotation);
          }
        }
      }.bind(this));
    };

    this._getConcreteHost = function() {
      var host = this._host;
      while (host && !host.is) {
        host = host._host;
      }
      return host;
    },

    this._bind = function(annotation) {
      var binding;

      switch(annotation.kind) {
        case 'observer':
        case 'notify':
        case 'custom':
          binding = this._bindings[annotation.property] = this._bindings[annotation.property] || createBinding(annotation.property);
          binding.annotations.push(annotation);
          break;
        default:
          // when annotation value does not have to be computed by method
          if (annotation.value.indexOf('(') === -1) {
            if (annotation.target.__properties &&
                annotation.target.__properties[annotation.attribute] &&
                annotation.target.__properties[annotation.attribute].readOnly) {
              return;
            }

            if (annotation.mode === '{' && annotation.target.nodeType === Node.ELEMENT_NODE) {
              switch(annotation.target.nodeName) {
                case 'INPUT':
                case 'TEXTAREA':
                  // FIXME kalau unbind harus distate waktu apa?
                  annotation.target.addEventListener('input', function(evt) {
                    this.set(annotation.value, annotation.target.value);
                  }.bind(this));
                  break;
                case 'SELECT':
                  annotation.target.addEventListener('change', function(evt) {
                    this.set(annotation.value, annotation.target.value);
                  }.bind(this));
                  break;
              }
            }

            var segments = annotation.value.split('.');
            var bindings = this._bindings;

            segments.forEach(function(segment) {
              binding = bindings[segment] = bindings[segment] || createBinding(segment);

              bindings = binding.paths;
            }.bind(this));

            if (annotation.method) {
              annotation.kind = 'method';

              annotation.effect = function(value) {
                var concreteHost = this._getConcreteHost();
                if (!concreteHost[annotation.method]) {
                  return console.warn('Annotation method: ' + annotation.method + ' of component: ' + concreteHost.is + ' not found!');
                }

                var args = annotation.args.map(function(arg) {
                  try {
                    var parsed;
                    if (arg[0] === '"' || arg[0] === "'") {
                      parsed = arg.substr(1, arg.length - 2);
                    } else {
                      parsed = JSON.parse(arg);
                    }
                    return parsed;
                  } catch(e) {
                    var val = this.get(arg);
                    return val;
                  }
                }.bind(this));

                value = concreteHost[annotation.method].apply(concreteHost, args);

                if (annotation.attribute) {
                  var attribute = annotation.attribute;

                  if (attribute.substr(-1) === '$') {
                    attribute = attribute.substr(0, attribute.length - 1);
                    annotation.target.setAttribute(attribute, value);
                  }

                  if (annotation.target.set) {
                    annotation.target.set(attribute, value);
                  } else {
                    annotation.target[attribute] = value;
                  }
                } else {
                  annotation.target.textContent = value || '';
                }
              }.bind(this);
            } else {
              if (annotation.mode === '{' && annotation.target.__properties) {
                var prop = annotation.target.__properties[annotation.attribute];

                if (prop && prop.notify) {
                  annotation.target.addEventListener(annotation.value + '-changed', function(evt) {
                    this.set(annotation.value, evt.detail.value);
                  }.bind(this));
                }
              }

              annotation.kind = 'value';

              annotation.effect = function(value) {
                if (annotation.attribute) {
                  var attribute = annotation.attribute;

                  if (attribute.substr(-1) === '$') {
                    attribute = attribute.substr(0, attribute.length - 1);
                    annotation.target.setAttribute(attribute, value);
                  }

                  // attribute name html is special
                  if (attribute === 'html') {
                    annotation.target.innerHTML = value || '';
                  } else if (annotation.target.set) {
                    annotation.target.set(xin.Inflector.camelize(attribute), value || null);
                  } else {
                    var selectable = document.activeElement === annotation.target &&
                      annotation.target.tagName === 'INPUT';

                    var selStart, selEnd;
                    if (selectable) {
                      selStart = annotation.target.selectionStart;
                      selEnd = annotation.target.selectionEnd;
                    }
                    annotation.target[attribute] = value || null;
                    if (selectable) {
                      annotation.target.setSelectionRange(selStart, selEnd);
                      //annotation.target.selectionStart = selStart;
                      //annotation.target.selectionEnd = selStart;
                    }
                  }
                } else {
                  annotation.target.textContent = value || '';
                }
              };
            }

            binding.annotations.push(annotation);
          } else { // when annotation value must be computed by method
            // computed annotation must have arguments
            var matches = annotation.value.match(/^(\w+)\(([^)]+)\)$/);
            if (matches === null) {
              throw new Error('Invalid computed annotation: ' + annotation.value + ' for component: ' + annotation.target._parent.is);
            }

            var method = matches[1];
            var args = matches[2].split(/\s*,\s*/);
            args.forEach(function(arg) {
              try {
                // FIXME check if arg parsable
                if (arg[0] === '"' || arg[0] === "'") {
                  // noop
                } else {
                  JSON.parse(arg);
                }
              } catch(e) {
                var newAnnotation = {
                  mode: annotation.mode,
                  method: method,
                  args: args,
                  value: arg,
                  target: annotation.target,
                  attribute: annotation.attribute
                };
                this._bind(newAnnotation);
              }
              // TODO below cannot detect arg with type object or array value
              //if (
              //    arg !== 'true' && arg !== 'false' &&
              //    arg !== 'null' && arg !== 'undefined' &&
              //    arg[0] !== '"' && arg[0] !== "'" &&
              //    !isNaN(parseFloat(arg)))
              //{
              //  var newAnnotation = {
              //    mode: annotation.mode,
              //    method: method,
              //    args: args,
              //    value: arg,
              //    target: annotation.target,
              //    attribute: annotation.attribute
              //  };
              //  this._bind(newAnnotation);
              //}
            }.bind(this));
          }
      }
    };

    this._parseTextAnnotations = function(node) {
      var mode = node.textContent.substr(0, 2);
      if (mode === '[[' || mode === '{{') {
        var annotation = {
          mode: mode[0],
          value: node.textContent.slice(2, -2).trim(),
          target: node
        };

        if (node.parentElement.tagName === 'TEXTAREA') {
          annotation.target = node.parentElement;
        }

        node.textContent = ' ';

        this._bind(annotation);
      }
    };

    this._parseElementAnnotations = function(node) {
      // FIXME scoping bocor makanya harus gini
      if (node._parent) {
        return;
      }

      node._parent = this;
      this._children.push(node);

      // populate $
      if (node.id && !this.$[node.id]) {
        this.$[node.id] = node;
      }

      if (node.attributes && node.attributes.length) {
        this._parseAttributeAnnotations(node);
      }

      if (node.childNodes && node.childNodes.length) {
        xin.Dom(node).childNodes.forEach(function(childNode) {
          switch (childNode.nodeType) {
            case Node.TEXT_NODE:
              this._parseTextAnnotations(childNode);
              break;
            case Node.ELEMENT_NODE:
              this._parseElementAnnotations(childNode);
              break;
          }
        }.bind(this));
      }
    };

    this._parseAnnotations = function() {
      (this._root || []).forEach(function(node) {
        switch(node.nodeType) {
          case Node.ELEMENT_NODE:
            this._parseElementAnnotations(node);
            break;
        }
      }.bind(this));
    };

    this._parsePropertyAnnotations = function() {
      Object.getOwnPropertyNames(this.__properties).forEach(function(name) {
        var prop = this.__properties[name];
        if (prop.observer) {
          this._bind({
            kind: 'observer',
            target: this,
            property: name,
            value: name,
            effect: function(value, oldValue) {
              if (!this[prop.observer]) {
                return console.warn('Cannot observe property, method ' + prop.observer + ' not found!');
              }
              return this[prop.observer](value, oldValue);
            }.bind(this)
          });
        }

        if (prop.computed) {
          this._bind({
            target: this,
            attribute: name,
            property: name,
            value: prop.computed,
          });
        }

        var attrName = xin.Inflector.dashify(name);
        var annot = this.getAttribute(attrName);
        if (prop.notify && annot) {
          if (annot[0] !== '{' || annot[1] !== '{') {
            console.warn('Cannot attach notification to host for one-way binding as ' + annot);
            return;
          }

          var property = annot.slice(2, -2).trim();
          this._bind({
            kind: 'notify',
            mode: annot[0],
            target: this,
            property: name,
            value: name,
            effect: function(value, oldValue) {
              var detail = {
                value: value,
                oldValue: oldValue
              };

              this.fire(property + '-changed', detail);
            }.bind(this)
          });
        }
      }.bind(this));
    };

    this._initData = function() {
      this._host = this;
      this._bindings = {};
      this._children = [];
      // listener should be populated from created options
      //this._listeners = [];
      this.$ = {};
    };

    this._isReady = function() {
      return Promise.all(this._children.map(function(child) {
          if (!child.is) {
            return;
          }
          return child._isReady();
        }.bind(this)));
    };

    this.attachedCallback = function() {
      if (this._ready) {

        if (XIN_DEBUG) {
          console.info('Attached   ' + this.__getId() + (this._attachedPending ? ' (delayed)' : ''));
        }

        this._attachedPending = false;

        this.behave('attached');
      } else {
        this._attachedPending = true;
      }
    };

    this._prepareListeners = function() {
      Object.keys(this.__listeners).forEach(function(key) {
        var listenerMetadata = this._parseListenerMetadata(key);
        var listenerHandler = this[this.__listeners[key]];
        this.addEventListener(listenerMetadata.eventName, function(evt) {
          if (listenerMetadata.selector && !xin.Dom(evt.target).matches(listenerMetadata.selector)) {
            return;
          }
          return listenerHandler.apply(this, arguments);
        }.bind(this));
      }.bind(this));
      // apply behavior listeners
      //this.behaviors.forEach(function(behavior) {
      //  if (!behavior.listeners) return;

      //  Object.keys(behavior.listeners).forEach(function(key) {
      //    var listenerMetadata = this._parseListenerMetadata(key);
      //    this.addEventListener(listenerMetadata.eventName, function(evt) {
      //      if (listenerMetadata.selector && !xin.Dom(evt.target).matches(listenerMetadata.selector)) {
      //        return;
      //      }
      //      return behavior[behavior.listeners[key]].apply(this, arguments);
      //    }.bind(this));
      //  }.bind(this));
      //}.bind(this));
    };

    this.createdCallback = function() {
      // TODO this is to avoid unnecessary template xin-repeat render on
      // scoped template instance, do we still need this?
      if (xin.Dom(this).parent('template')) return;

      this.__id = Component.getId();
      xin.__components[this.__id] = this;
      this.setAttribute('xin-id', this.__id);

      this._initData();

      if (XIN_DEBUG) {
        console.info('Created    ' + this.__getId());
      }

      this.behave('created');

      this._populateProperties();

      this._prepareTemplate();

      this._prepareRoot();

      this._parseAnnotations();

      this._parsePropertyAnnotations();

      this._notifyProperties();

      this._isReady()
        .then(function() {
          this._ready = true;

          if (XIN_DEBUG) {
            console.info('Ready      ' + this.__getId());
          }

          // populate light dom after ready, before it was before ready
          this._populateLightDoms();

          this._prepareListeners();

          this.render();

          this.behave('ready');

          if (this._attachedPending) {
            this.async(function() {
              this.attachedCallback();
            });
          }

        }.bind(this), function(e) {
          console.error(e);
        }.bind(this));
    };

    this.render = function() {
      var doRender = function() {
        this.classList.add(this.is);

        if (!this._root) {
          return;
        }

        this._root.forEach(function(node) {
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

              this._lightDoms.forEach(function(node) {
                if (node.nodeType === 1 && xin.Dom(node).is(selector)) {
                  var fragment = document.createDocumentFragment();
                  xin.Dom(node).childNodes.forEach(function(childNode) {
                    fragment.appendChild(childNode);
                  });
                  parent.insertBefore(fragment, element);
                }
              });
            } else {
              this._lightDoms.forEach(function(node) {
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
      }.bind(this);

      doRender();
    };

    this._initBehaviors();
  };

  var createBinding = function(model) {
    return {
      model: model,
      paths: {},
      annotations: []
    };
  };

  var v = function(value) {
    if (typeof value === 'function') {
      return value();
    } else {
      return value;
    }
  };

  var Component = xin.Component = function(options) {

    var Element = {
      prototype: new Base(options)
    };

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

  var id = 0;
  Component.getId = function() {
    return id++;
  };
})(this);
