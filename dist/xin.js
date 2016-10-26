/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		5:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"components/app","1":"components/pager","2":"components/repeat","3":"components/view","4":"components/xhr"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var repository = __webpack_require__(2);
	var component = __webpack_require__(3);
	var Fx = __webpack_require__(15);
	var asyncModule = __webpack_require__(13);
	var inflector = __webpack_require__(12);
	var setup = __webpack_require__(14);
	var T = __webpack_require__(4);
	
	module.exports = window.xin = repository.get;
	module.exports.put = repository.put;
	module.exports.define = repository.define;
	module.exports.v = repository.v;
	module.exports.mix = repository.mix;
	module.exports.filter = T.Filter;
	module.exports.Component = component.Component;
	module.exports.base = component.base;
	module.exports.Fx = Fx;
	module.exports.async = asyncModule;
	module.exports.inflector = inflector;
	module.exports.setup = setup;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var repository = {};
	
	function get(id) {
	  if (!isNaN(id)) {
	    return repository[id];
	  }
	
	  if (repository[id]) {
	    return repository[id];
	  }
	
	  var idSplitted = id.split('.');
	  var scope = window;
	  idSplitted.find(function (token) {
	    scope = scope[token];
	    return !scope;
	  });
	
	  return scope;
	}
	
	function put(id, value) {
	  repository[id] = value;
	}
	
	function v(value) {
	  return typeof value === 'function' ? value.apply(null, [].slice.call(arguments, 1)) : value;
	}
	
	function define(name, Comp, options) {
	  // TODO please make it happen for v1
	  // if (window.customElements) {
	  //   throw new Error('Unimplemented webcomponents v1');
	  //   // window.customElements.define(name, Comp, options);
	  //   // return Comp;
	  // }
	
	  var Proto = {
	    prototype: Object.create(Comp.prototype, {
	      is: {
	        get: function get() {
	          return name;
	        }
	      }
	    }),
	    extends: options && options.extends ? options.extends : undefined
	  };
	
	  var ElementClass = document.registerElement(name, Proto);
	
	  put(name, ElementClass);
	
	  return ElementClass;
	}
	
	function mix() {
	  var data = {};
	  [].forEach.call(arguments, function (collection) {
	    for (var i in collection) {
	      data[i] = collection[i];
	    }
	  });
	  return data;
	}
	
	module.exports.get = get;
	module.exports.put = put;
	module.exports.define = define;
	module.exports.v = v;
	module.exports.mix = mix;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _templateBinding = __webpack_require__(4);
	
	var _templateBinding2 = _interopRequireDefault(_templateBinding);
	
	var _repository = __webpack_require__(2);
	
	var _inflector = __webpack_require__(12);
	
	var _inflector2 = _interopRequireDefault(_inflector);
	
	var _async = __webpack_require__(13);
	
	var _setup = __webpack_require__(14);
	
	var _setup2 = _interopRequireDefault(_setup);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals HTMLElement */
	/* eslint no-proto: 0 */
	
	var DEBUG = _setup2.default.withDefault('debug', false);
	
	var componentId = 0;
	function nextId() {
	  return componentId++;
	}
	
	var baseComponents = {};
	
	function base(base) {
	  if (baseComponents[base]) {
	    return baseComponents[base];
	  }
	
	  var Component = function (_window$base) {
	    _inherits(Component, _window$base);
	
	    function Component() {
	      _classCallCheck(this, Component);
	
	      return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
	    }
	
	    _createClass(Component, [{
	      key: 'createdCallback',
	      value: function createdCallback() {
	        if (DEBUG) console.info('CREATED ' + this.is);
	
	        this.__id = nextId();
	        (0, _repository.put)(this.__id, this);
	        this.setAttribute('xin-id', this.__id);
	
	        // this.classList.add(this.is);
	
	        if (typeof this.created === 'function') {
	          this.created();
	        }
	
	        this.__initData();
	
	        this.__initTemplate();
	
	        this.__initProps();
	
	        this.__initListeners();
	
	        this.readyCallback();
	      }
	    }, {
	      key: 'readyCallback',
	      value: function readyCallback() {
	        if (DEBUG) console.info('READY ' + this.is);
	
	        if (typeof this.ready === 'function') {
	          this.ready();
	        }
	      }
	    }, {
	      key: 'attachedCallback',
	      value: function attachedCallback() {
	        if (DEBUG) console.info('ATTACHED ' + this.is);
	
	        if (typeof this.attached === 'function') {
	          this.attached();
	        }
	      }
	    }, {
	      key: '__getId',
	      value: function __getId() {
	        return this.is + (this.__id ? ':' + this.__id : '');
	      }
	    }, {
	      key: '__initData',
	      value: function __initData() {
	        this.__componentContent = [];
	        this.__debouncers = {};
	        this.__notifiers = {};
	        // this.__componentFilters = {};
	      }
	    }, {
	      key: '__initProps',
	      value: function __initProps() {
	        for (var propName in this.props) {
	          // exclude prototype properties
	          if (!Object.prototype.hasOwnProperty.call(this.props, propName)) {
	            continue;
	          }
	
	          var property = this.props[propName];
	          var attrName = _inflector2.default.dashify(propName);
	
	          var defaultValue = void 0;
	          if (this.hasAttribute(attrName)) {
	            var attrVal = this.getAttribute(attrName);
	
	            // copy value from attribute to property
	            // fallback to property.value
	            var expr = _templateBinding2.default.Expr.get(attrVal);
	            if (expr.type === 's') {
	              defaultValue = _templateBinding2.default.Serializer.deserialize(attrVal, property.type);
	            }
	          }
	
	          // force notify first
	          this.set(propName, defaultValue === undefined ? (0, _repository.v)(property.value) : defaultValue);
	
	          // when property is undefined, log error when property is required otherwise assign to default value
	          if (property.required && (this[propName] === undefined || this[propName] === null)) {
	            throw new Error('"' + this.__getId() + '" missing required "' + propName + '"');
	          }
	
	          if (property.observer) {
	            var _expr = _templateBinding2.default.Expr.getFn(property.observer, [propName], true);
	            this.__templateAnnotate(_expr);
	
	            // invoke first time for observer annotation
	            _expr.invoke(this);
	          }
	
	          var accessor = _templateBinding2.default.Accessor.get(this, propName);
	
	          if (property.computed) {
	            var _expr2 = _templateBinding2.default.Expr.getFn(property.computed, [], true);
	            this.__templateAnnotate(_expr2, accessor);
	
	            // invoke first time;
	            this.set(propName, _expr2.invoke(this));
	          }
	
	          if (property.notify) {
	            this.__templateGetBinding(propName).annotations.push(new NotifyAnnotation(this, propName));
	          }
	        }
	      }
	    }, {
	      key: '__initTemplate',
	      value: function __initTemplate() {
	        var _this2 = this;
	
	        var template = void 0;
	
	        if (this.childElementCount === 1 && this.firstElementChild.nodeName === 'TEMPLATE' && !this.firstElementChild.hasAttribute('is')) {
	          // when instance template exist detach from component content
	          template = this.firstElementChild;
	          this.removeChild(template);
	        } else if (this.template) {
	          // create new template based on template property
	          template = document.createElement('template');
	          template.innerHTML = this.template;
	        }
	
	        // when template does not exist do not populate content
	        if (template) {
	          [].slice.call(this.childNodes).forEach(function (node) {
	            _this2.__componentContent.push(node);
	            _this2.removeChild(node);
	          });
	        }
	
	        _templateBinding2.default.prototype.__templateInitialize.call(this, template, this);
	
	        this.render(this.__componentContent);
	      }
	    }, {
	      key: '__addNotifier',
	      value: function __addNotifier(eventName) {
	        var _this3 = this;
	
	        if (this.__notifiers[eventName]) {
	          return;
	        }
	
	        this.__notifiers[eventName] = function (evt) {
	          var element = evt.target;
	
	          if (element.__templateModel !== _this3) {
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
	    }, {
	      key: '__removeNotifier',
	      value: function __removeNotifier(eventName) {
	        if (!this.__notifiers[eventName]) {
	          return;
	        }
	
	        this.__templateHost.removeEventListener(eventName, this.__notifiers[eventName], true);
	        this.__notifiers[eventName] = null;
	      }
	    }, {
	      key: '__initListeners',
	      value: function __initListeners() {
	        var _this4 = this;
	
	        if (!this.listeners) {
	          return;
	        }
	
	        Object.keys(this.listeners).forEach(function (key) {
	          var listenerMetadata = parseListenerMetadata(key);
	          var expr = _templateBinding2.default.Expr.getFn(_this4.listeners[key], [], true);
	
	          _this4.addEventListener(listenerMetadata.eventName, function (evt) {
	            if (listenerMetadata.selector && !evt.target.matches(listenerMetadata.selector) && !evt.target.matches(listenerMetadata.selector + ' *')) {
	              return;
	            }
	
	            return expr.invoke(_this4, { evt: evt });
	          }, true);
	        });
	      }
	    }, {
	      key: 'fire',
	      value: function fire(type, detail, options) {
	        options = options || {};
	        detail = detail || {};
	
	        var evt = void 0;
	        var bubbles = options.bubbles === undefined ? true : options.bubbles;
	        var cancelable = Boolean(options.cancelable);
	
	        switch (type) {
	          case 'click':
	            evt = new window.Event(type, {
	              bubbles: bubbles,
	              cancelable: cancelable
	            });
	
	            // TODO check if without this works on every browsers
	            // evt = document.createEvent('HTMLEvents');
	            // evt.initEvent(type, true, false);
	            break;
	          default:
	            evt = new window.CustomEvent(type, {
	              bubbles: Boolean(bubbles),
	              cancelable: cancelable,
	              detail: detail
	            });
	            break;
	        }
	
	        this.dispatchEvent(evt);
	
	        return evt;
	      }
	    }, {
	      key: 'async',
	      value: function async(callback, waitTime) {
	        var asyncO = new _async.Async(this);
	        asyncO.start(callback, waitTime);
	        return asyncO;
	      }
	    }, {
	      key: 'debounce',
	      value: function debounce(job, callback, wait, immediate) {
	        var debouncer = this.__debouncers[job];
	        if (debouncer && debouncer.running) {
	          debouncer.cancel();
	        } else {
	          debouncer = this.__debouncers[job] = new _async.Debounce(this, immediate);
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
	
	    }, {
	      key: '__templateAnnotate',
	
	
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
	
	      value: function __templateAnnotate(expr, accessor) {
	        if (!_templateBinding2.default.prototype.__templateAnnotate.call(this, expr, accessor)) {
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
	    }, {
	      key: 'props',
	      get: function get() {
	        return {};
	      }
	    }, {
	      key: '__app',
	      get: function get() {
	        if (!this.__app$) {
	          if (this.__appSignature) {
	            this.__app$ = this;
	          } else {
	            var app = this.parentElement;
	            while (app && !app.__appSignature) {
	              app = app.parentElement;
	            }
	            this.__app$ = app;
	          }
	        }
	
	        return this.__app$;
	      }
	    }, {
	      key: '$',
	      get: function get() {
	        // return this.getElementsByTagName('*');
	        return this.__templateHost.getElementsByTagName('*');
	      }
	    }]);
	
	    return Component;
	  }(window[base]);
	
	  var tproto = _templateBinding2.default.prototype;
	  for (var key in tproto) {
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
	
	var NotifyAnnotation = function () {
	  function NotifyAnnotation(model, name) {
	    _classCallCheck(this, NotifyAnnotation);
	
	    var expr = _templateBinding2.default.Expr.get(model.getAttribute(name));
	    this.model = model;
	    this.name = expr.name;
	  }
	
	  _createClass(NotifyAnnotation, [{
	    key: 'effect',
	    value: function effect(value) {
	      this.model.fire('-notify', {
	        name: this.name,
	        value: value
	      });
	    }
	  }]);
	
	  return NotifyAnnotation;
	}();
	
	function parseListenerMetadata(key) {
	  var splitted = key.split(' ');
	  var metadata = {
	    eventName: splitted[0],
	    selector: splitted[1] ? splitted.slice(1).join(' ') : null
	  };
	  return metadata;
	}
	
	module.exports.Component = base('HTMLElement');
	module.exports.base = base;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/* globals Node, HTMLUnknownElement */
	var Expr = __webpack_require__(5);
	var Filter = __webpack_require__(7);
	var Binding = __webpack_require__(8);
	var Accessor = __webpack_require__(9);
	var Annotation = __webpack_require__(10);
	var Token = __webpack_require__(6);
	var Serializer = __webpack_require__(11);
	
	var SLOT_SUPPORTED = 'HTMLUnknownElement' in window && !(document.createElement('slot') instanceof HTMLUnknownElement);
	
	var templateId = 0;
	
	function nextId() {
	  return templateId++;
	}
	
	function slotName(element) {
	  return SLOT_SUPPORTED ? element.name : element.getAttribute('name');
	}
	
	function slotAppend(slot, node, root) {
	  if (!slot.__slotHasChildren) {
	    slot.__slotHasChildren = true;
	    slot.__slotFallbackContent = slot.innerHTML;
	    slot.innerHTML = '';
	  }
	
	  slot.appendChild(node);
	}
	
	function elementSlot(element) {
	  return SLOT_SUPPORTED ? element.slot : element.getAttribute('slot');
	}
	
	function fixTemplate(template) {
	  if (!template.content && window.HTMLTemplateElement && window.HTMLTemplateElement.decorate) {
	    window.HTMLTemplateElement.decorate(template);
	  }
	  return template;
	}
	
	function T(template, host, marker) {
	  this.__templateInitialize(template, host, marker);
	}
	
	T.prototype = {
	  get $() {
	    return this.__templateHost.getElementsByTagName('*');
	  },
	
	  __templateInitialize: function __templateInitialize(template, host, marker) {
	    this.__templateId = nextId();
	    this.__templateBindings = {};
	    this.__templateHost = host || (template ? template.parentElement : null);
	    this.__templateMarker = marker;
	
	    if (!template) {
	      return;
	    }
	
	    // do below only if template is exists
	    this.__template = fixTemplate(template);
	    this.__templateFragment = document.importNode(this.__template.content, true);
	    this.__templateChildNodes = [].slice.call(this.__templateFragment.childNodes);
	    this.__parseAnnotations();
	
	    if (marker) {
	      return;
	    }
	
	    if (this.__template.parentElement === this.__templateHost) {
	      // when template parent is template host, it means that template is specific template
	      // then use template as marker
	      this.__templateMarker = this.__template;
	    } else {
	      // when template is not child of host, put marker to host
	      this.__templateMarker = document.createComment('marker-' + this.__templateId);
	      this.__templateHost.appendChild(this.__templateMarker);
	    }
	  },
	  $$: function $$(selector) {
	    return this.querySelector(selector);
	  },
	  render: function render(content) {
	    var _this = this;
	
	    if (!this.__template) {
	      return;
	    }
	
	    if (content) {
	      try {
	        [].forEach.call(this.__templateFragment.querySelectorAll('slot'), function (slot) {
	          var name = slotName(slot);
	          if (name) {
	            content.forEach(function (node) {
	              if (node.nodeType === Node.ELEMENT_NODE && name === elementSlot(node)) {
	                slotAppend(slot, node, _this.__templateFragment);
	              }
	              // TODO query to childnodes looking for slot
	            });
	          } else {
	            content.forEach(function (node) {
	              slotAppend(slot, node, _this.__templateFragment);
	            });
	          }
	        });
	      } catch (err) {
	        console.error(err.stack);
	        throw err;
	      }
	    }
	
	    this.__templateMarker.parentElement.insertBefore(this.__templateFragment, this.__templateMarker);
	  },
	  __templateUninitialize: function __templateUninitialize() {
	    this.__templateChildNodes.forEach(function (node) {
	      node.parentElement.removeChild(node);
	    });
	  },
	  all: function all(obj) {
	    for (var i in obj) {
	      if (obj.hasOwnProperty(i)) {
	        this.set(i, obj[i]);
	      }
	    }
	  },
	  __templateGetPathAsArray: function __templateGetPathAsArray(path) {
	    if (!path) {
	      throw new Error('Unknown path ' + path + ' to set to ' + this.is);
	    }
	
	    if (typeof path !== 'string') {
	      return path;
	    }
	
	    return path.split('.');
	  },
	  __templateGetPathAsString: function __templateGetPathAsString(path) {
	    if (typeof path === 'string') {
	      return path;
	    }
	
	    return path.join('.');
	  },
	  get: function get(path) {
	    var object = this;
	
	    this.__templateGetPathAsArray(path).some(function (segment) {
	      if (object === undefined || object === null) {
	        object = undefined;
	        return true;
	      }
	
	      object = object[segment];
	      return false;
	    });
	
	    return object;
	  },
	  set: function set(path, value) {
	    path = this.__templateGetPathAsArray(path);
	
	    var oldValue = this.get(path);
	
	    if (value === oldValue) {
	      return;
	    }
	
	    var object = this;
	
	    path.slice(0, -1).forEach(function (segment) {
	      if (!object) {
	        return;
	      }
	      if (object[segment] === undefined || object[segment] === null) {
	        object[segment] = {};
	      }
	
	      object = object[segment];
	    });
	
	    var property = path.slice(-1).pop();
	
	    object[property] = value;
	
	    this.notify(path, value);
	  },
	  notify: function notify(path, value) {
	    path = this.__templateGetPathAsString(path);
	
	    // console.log(this.__getId(), '<notify>', path, '?', value, `<${typeof value}>`);
	
	    try {
	      var binding = this.__templateGetBinding(path);
	      if (binding) {
	        binding.walkEffect(value);
	      }
	    } catch (err) {
	      console.warn('#notify caught error: ' + err.message + '\n Stack trace: ' + err.stack);
	    }
	  },
	  __parseAnnotations: function __parseAnnotations() {
	    var _this2 = this;
	
	    // this.__templateAnnotatedElements = [];
	
	    var len = this.__templateFragment.childNodes.length;
	    for (var i = 0; i < len; i++) {
	      var node = this.__templateFragment.childNodes[i];
	      switch (node.nodeType) {
	        case Node.ELEMENT_NODE:
	          this.__parseElementAnnotations(node);
	          break;
	        case Node.TEXT_NODE:
	          this.__parseTextAnnotations(node);
	          break;
	      }
	    }
	
	    Object.keys(this.__templateBindings).forEach(function (key) {
	      _this2.notify(key, _this2.get(key));
	    });
	  },
	  __parseEventAnnotations: function __parseEventAnnotations(element, attrName) {
	    // bind event annotation
	    var attrValue = element.getAttribute(attrName);
	    var eventName = attrName.slice(1, -1);
	    // let eventName = attrName.substr(3);
	    if (eventName === 'tap') {
	      eventName = 'click';
	    }
	
	    var context = this;
	    var expr = Expr.getFn(attrValue, [], true);
	
	    // console.log(this, element);
	    // TODO might be slow or memory leak setting event listener to inside element
	    element.addEventListener(eventName, function (evt) {
	      return expr.invoke(context, { evt: evt });
	    }, true);
	  },
	  __parseAttributeAnnotations: function __parseAttributeAnnotations(element) {
	    var _this3 = this;
	
	    // clone attributes to array first then foreach because we will remove
	    // attribute later if already processed
	    // this hack to make sure when attribute removed the attributes index doesnt shift.
	    return [].slice.call(element.attributes).reduce(function (annotated, attr) {
	      var attrName = attr.name;
	
	      if (attrName.indexOf('(') === 0) {
	        _this3.__parseEventAnnotations(element, attrName);
	      } else {
	        // bind property annotation
	        annotated = _this3.__templateAnnotate(Expr.get(attr.value), Accessor.get(element, attrName)) || annotated;
	      }
	
	      return annotated;
	    }, false);
	  },
	  __parseElementAnnotations: function __parseElementAnnotations(element) {
	    var _this4 = this;
	
	    var annotated = false;
	    var scoped = element.__templateModel;
	
	    if (scoped) {
	      return annotated;
	    }
	
	    // element.classList.add(`${this.__templateHost.is || 'template'}__scope`);
	    element.__templateModel = this;
	
	    if (element.attributes && element.attributes.length) {
	      annotated = this.__parseAttributeAnnotations(element) || annotated;
	    }
	
	    if (element.childNodes && element.childNodes.length) {
	      var childNodes = [].slice.call(element.childNodes);
	      var childNodesLength = childNodes.length;
	
	      for (var i = 0; i < childNodesLength; i++) {
	        annotated = this.__parseNodeAnnotations(childNodes[i]) || annotated;
	      }
	    }
	
	    [].forEach.call(element.getElementsByTagName('slot'), function (slot) {
	      [].forEach.call(slot.childNodes, function (node) {
	        annotated = _this4.__parseNodeAnnotations(node) || annotated;
	      });
	    });
	
	    return annotated;
	  },
	  __parseNodeAnnotations: function __parseNodeAnnotations(node) {
	    switch (node.nodeType) {
	      case Node.TEXT_NODE:
	        return this.__parseTextAnnotations(node);
	      case Node.ELEMENT_NODE:
	        return this.__parseElementAnnotations(node);
	    }
	  },
	  __parseTextAnnotations: function __parseTextAnnotations(node) {
	    var expr = Expr.get(node.textContent);
	
	    var accessor = void 0;
	    if (node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {
	      accessor = Accessor.get(node.parentElement, 'value');
	    } else {
	      accessor = Accessor.get(node);
	    }
	
	    return this.__templateAnnotate(expr, accessor);
	  },
	  __templateAnnotate: function __templateAnnotate(expr, accessor) {
	    var _this5 = this;
	
	    if (expr.type === 's') {
	      return false;
	    }
	
	    // annotate every paths
	    var annotation = new Annotation(this, expr, accessor);
	
	    expr.annotatedPaths.forEach(function (arg) {
	      return _this5.__templateGetBinding(arg.name).annotations.push(annotation);
	    });
	
	    return true;
	  },
	  __templateGetBinding: function __templateGetBinding(path) {
	    var segments = path.split('.');
	    var bindings = void 0;
	    var binding = void 0;
	
	    for (var i = 0; i < segments.length; i++) {
	      var segment = segments[i];
	
	      bindings = binding ? binding.paths : this.__templateBindings;
	
	      if (!bindings[segment]) {
	        bindings[segment] = new Binding(this, segment);
	      }
	
	      binding = bindings[segment];
	    }
	
	    return binding;
	  }
	};
	
	if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
	  window.T = T;
	}
	
	module.exports = T;
	module.exports.Filter = Filter;
	module.exports.Accessor = Accessor;
	module.exports.Expr = Expr;
	module.exports.Token = Token;
	module.exports.Serializer = Serializer;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Token = __webpack_require__(6);
	var Filter = __webpack_require__(7);
	
	var Expr = function () {
	  function Expr(value, mode, type) {
	    _classCallCheck(this, Expr);
	
	    // define base properties
	    this.mode = mode;
	    this.type = type;
	    this.name = '';
	    this.args = [];
	    this.filters = [];
	    this.value = value;
	    // this.unwrapped = Boolean(unwrapped);
	
	    // TODO support expr with function or others
	    // let valType = typeof value;
	    // if (valType === 'function') {
	    //   this.type = 'm';
	    //   return;
	    // } else if (valType !== 'string') {
	    //   // validate args
	    //   return;
	    // }
	
	    // cleanse value
	    // value = value.trim();
	
	    if (type === 's') {
	      return;
	    }
	
	    var tokens = value.split('|');
	    var token = tokens[0].trim();
	
	    this.filters = tokens.slice(1).map(function (word) {
	      return Filter.get(word.trim());
	    });
	
	    // if (!this.unwrapped) {
	    //   if (value[0] !== '[' && value[0] !== '{') {
	    //     return;
	    //   }
	    //   token = value.slice(2, -2).trim();
	    //   this.mode = value[0];
	    // }
	
	    if (token.indexOf('(') < 0) {
	      this.type = 'p';
	      this.name = token;
	      this.args.push(new Token(token));
	    } else {
	      // force mode to '[' when type is !p
	      this.mode = '[';
	      this.type = 'm';
	
	      var matches = token.match(/([^(]+)\(([^)]*)\)/);
	
	      this.name = matches[1].trim();
	
	      this.args = tokenize(matches[2]);
	    }
	  }
	
	  _createClass(Expr, [{
	    key: 'invoke',
	    value: function invoke(context, otherArgs) {
	      if (this.type === 'p') {
	        var val = typeof context.get === 'function' ? context.get(this.name) : context[this.name];
	        return this.filters.reduce(function (val, filter) {
	          return filter.invoke(val);
	        }, val);
	      }
	
	      var fn = context.__templateHost[this.name];
	      if (typeof fn !== 'function') {
	        throw new Error('Method is not eligible, ' + (context.__templateHost.nodeName || '$anonymous') + '#' + this.name);
	      }
	
	      var args = this.args.map(function (arg) {
	        return arg.value(context, otherArgs);
	      });
	
	      return fn.apply(context, args);
	    }
	  }, {
	    key: 'annotatedPaths',
	    get: function get() {
	      var _this = this;
	
	      if (!this._annotatedPaths) {
	        (function () {
	          var annotatedPaths = [];
	          _this.args.forEach(function (arg) {
	            if (arg.type === 'v' && annotatedPaths.indexOf(arg.name) === -1) {
	              annotatedPaths.push(arg);
	            }
	          });
	          _this._annotatedPaths = annotatedPaths;
	        })();
	      }
	
	      return this._annotatedPaths;
	    }
	  }]);
	
	  return Expr;
	}();
	
	Expr.CACHE = {
	  '[s': new Expr('', '[', 's')
	};
	
	function _get(value, mode, type) {
	  var key = value + mode + type;
	  var expr = Expr.CACHE[key];
	
	  if (!expr) {
	    expr = new Expr(value, mode, type);
	    if (type !== 's') {
	      Expr.CACHE[key] = expr;
	    }
	  }
	
	  return expr;
	}
	
	function get(value, unwrapped) {
	  value = (value || '').trim();
	
	  if (unwrapped) {
	    return _get(value, '[', 'v');
	  }
	
	  var mode = value[0];
	  if (mode === '[' || mode === '{') {
	    value = value.slice(2, -2).trim();
	    return _get(value, mode, 'v');
	  }
	
	  return _get(value, '[', 's');
	}
	
	function getFn(value, args, unwrapped) {
	  // if (typeof value === 'function') {
	  //   return get(value, unwrapped);
	  // }
	  return get(value.indexOf('(') === -1 ? value + '(' + args.join(', ') + ')' : value, unwrapped);
	}
	
	function rawTokenize(str) {
	  var count = 0;
	  var tokens = [];
	
	  while (str && count++ < 10) {
	    var matches = str.match(/^\s*("[^"]*"|[^,]+),?/);
	
	    str = str.substr(matches[0].length);
	    tokens.push(matches[1].trim());
	  }
	
	  return tokens;
	}
	
	function tokenize(str) {
	  return rawTokenize(str).map(function (token) {
	    return new Token(token);
	  });
	}
	
	module.exports = Expr;
	module.exports.getFn = getFn;
	module.exports.get = get;
	module.exports.rawTokenize = rawTokenize;
	module.exports.tokenize = tokenize;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GLOBAL = global || window;
	
	var Token = function () {
	  function Token(name) {
	    _classCallCheck(this, Token);
	
	    this.name = name;
	    try {
	      var value = JSON.parse(this.name);
	      this.type = 's';
	      this._value = value;
	    } catch (err) {
	      this.type = 'v';
	      this._value = null;
	    }
	  }
	
	  _createClass(Token, [{
	    key: 'value',
	    value: function value(context, others) {
	      context = context || GLOBAL;
	
	      if (this.type === 's') {
	        return this._value;
	      }
	
	      if (context) {
	        var val = context.get ? context.get(this.name) : context[this.name];
	        if (typeof val !== 'undefined') {
	          return val;
	        }
	      }
	
	      if (others) {
	        var _val = others.get ? others.get(this.name) : others[this.name];
	        if (typeof _val !== 'undefined') {
	          return _val;
	        }
	      }
	
	      return;
	    }
	  }]);
	
	  return Token;
	}();
	
	function get(name) {
	  // FIXME implement cache
	  return new Token(name);
	}
	
	module.exports = Token;
	module.exports.get = get;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Filter = function () {
	  function Filter(name, callback, otherArgs) {
	    _classCallCheck(this, Filter);
	
	    this.name = name;
	    this.callback = callback;
	    this.otherArgs = otherArgs;
	  }
	
	  _createClass(Filter, [{
	    key: 'invoke',
	    value: function invoke(val) {
	      var args = [val];
	      [].push.apply(args, this.otherArgs);
	      return this.callback.apply(null, args);
	    }
	  }], [{
	    key: 'put',
	    value: function put(name, callback) {
	      registry[name] = callback;
	    }
	  }, {
	    key: 'get',
	    value: function get(name) {
	      var segments = name.split(':');
	      var args = segments.splice(1);
	      var key = segments.pop();
	      return new Filter(key, registry[key], args);
	    }
	  }]);
	
	  return Filter;
	}();
	
	var registry = {
	  required: function required(val) {
	    if (val === undefined || val === null || val === '') {
	      throw new Error('Value is required');
	    }
	    return val;
	  },
	  upper: function upper(val) {
	    return String.prototype.toUpperCase.call(val || '');
	  },
	  lower: function lower(val) {
	    return String.prototype.toLowerCase.call(val || '');
	  },
	  not: function not(val) {
	    return !val;
	  },
	  slice: function slice(val, begin, end) {
	    return Array.prototype.slice.call(val || [], begin, end);
	  }
	};
	
	module.exports = Filter;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Binding = function () {
	  function Binding(context, model) {
	    _classCallCheck(this, Binding);
	
	    this.context = context;
	    this.model = model;
	    this.paths = {};
	    this.annotations = [];
	  }
	
	  _createClass(Binding, [{
	    key: 'walkEffect',
	    value: function walkEffect(value) {
	      var _this = this;
	
	      this.annotations.forEach(function (annotation) {
	        try {
	          annotation.effect(value, _this.model);
	        } catch (err) {
	          console.error('Error caught while walk effect annotation: ' + (annotation.expr ? annotation.expr.value : '#unknown') + '\n ' + err.stack);
	        }
	      });
	
	      Object.keys(this.paths).forEach(function (i) {
	        _this.paths[i].walkEffect(value ? value[i] : undefined);
	      });
	    }
	  }]);
	
	  return Binding;
	}();
	
	module.exports = Binding;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* globals Node */
	
	var BaseAccessor = function () {
	  function BaseAccessor(node, name) {
	    _classCallCheck(this, BaseAccessor);
	
	    this.node = node;
	    this.name = name;
	  }
	
	  _createClass(BaseAccessor, [{
	    key: 'set',
	    value: function set(value) {
	      if (typeof this.node.set === 'function') {
	        this.node.set(this.name, value);
	      } else {
	        this.node[this.name] = value;
	      }
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      if (typeof this.node.get === 'function') {
	        return this.node.get(this.name);
	      } else {
	        return this.node[this.name];
	      }
	    }
	  }]);
	
	  return BaseAccessor;
	}();
	
	var TextAccessor = function (_BaseAccessor) {
	  _inherits(TextAccessor, _BaseAccessor);
	
	  function TextAccessor(node) {
	    _classCallCheck(this, TextAccessor);
	
	    return _possibleConstructorReturn(this, (TextAccessor.__proto__ || Object.getPrototypeOf(TextAccessor)).call(this, node, 'textContent'));
	  }
	
	  _createClass(TextAccessor, [{
	    key: 'set',
	    value: function set(value) {
	      this.node.textContent = typeof value === 'undefined' ? '' : value;
	    }
	  }]);
	
	  return TextAccessor;
	}(BaseAccessor);
	
	var ClassAccessor = function (_BaseAccessor2) {
	  _inherits(ClassAccessor, _BaseAccessor2);
	
	  function ClassAccessor() {
	    _classCallCheck(this, ClassAccessor);
	
	    return _possibleConstructorReturn(this, (ClassAccessor.__proto__ || Object.getPrototypeOf(ClassAccessor)).apply(this, arguments));
	  }
	
	  _createClass(ClassAccessor, [{
	    key: 'set',
	    value: function set(value) {
	      if (value) {
	        this.node.classList.add(this.name);
	      } else {
	        this.node.classList.remove(this.name);
	      }
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      throw new Error('Unimplemented');
	    }
	  }]);
	
	  return ClassAccessor;
	}(BaseAccessor);
	
	var StyleAccessor = function (_BaseAccessor3) {
	  _inherits(StyleAccessor, _BaseAccessor3);
	
	  function StyleAccessor() {
	    _classCallCheck(this, StyleAccessor);
	
	    return _possibleConstructorReturn(this, (StyleAccessor.__proto__ || Object.getPrototypeOf(StyleAccessor)).apply(this, arguments));
	  }
	
	  _createClass(StyleAccessor, [{
	    key: 'set',
	    value: function set(value) {
	      this.node.style[this.name] = value || '';
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      throw new Error('Unimplemented');
	    }
	  }]);
	
	  return StyleAccessor;
	}(BaseAccessor);
	
	var HTMLAccessor = function (_BaseAccessor4) {
	  _inherits(HTMLAccessor, _BaseAccessor4);
	
	  function HTMLAccessor() {
	    _classCallCheck(this, HTMLAccessor);
	
	    return _possibleConstructorReturn(this, (HTMLAccessor.__proto__ || Object.getPrototypeOf(HTMLAccessor)).apply(this, arguments));
	  }
	
	  _createClass(HTMLAccessor, [{
	    key: 'set',
	    value: function set(value) {
	      this.node.innerHTML = typeof value === 'undefined' ? '' : value;
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      return this.node.innerHTML;
	    }
	  }]);
	
	  return HTMLAccessor;
	}(BaseAccessor);
	
	var ValueAccessor = function (_BaseAccessor5) {
	  _inherits(ValueAccessor, _BaseAccessor5);
	
	  function ValueAccessor(node) {
	    _classCallCheck(this, ValueAccessor);
	
	    return _possibleConstructorReturn(this, (ValueAccessor.__proto__ || Object.getPrototypeOf(ValueAccessor)).call(this, node, 'value'));
	  }
	
	  _createClass(ValueAccessor, [{
	    key: 'set',
	    value: function set(value) {
	      var selectable = document.activeElement === this.node;
	      if (!selectable) {
	        _get(ValueAccessor.prototype.__proto__ || Object.getPrototypeOf(ValueAccessor.prototype), 'set', this).call(this, typeof value === 'undefined' ? '' : value);
	      }
	      //  &&
	      //   this.node.nodeName === 'INPUT' && (
	      //       this.node.type !== 'email' &&
	      //       this.node.type !== 'range' &&
	      //       this.node.type !== 'checkbox'
	      //       );
	      //
	      // var selStart;
	      // var selEnd;
	      // if (selectable) {
	      //   selStart = this.node.selectionStart;
	      //   selEnd = this.node.selectionEnd;
	      // }
	      //
	      // this.node[this.name] = value === undefined ? '' : value;
	      //
	      // if (selectable) {
	      //   this.node.setSelectionRange(selStart, selEnd);
	      //
	      //   // does not work well with below
	      //   // this.context.selectionStart = selStart;
	      //   // this.context.selectionEnd = selStart;
	      // }
	      // super.set(typeof value === 'undefined' ? '' : value);
	    }
	  }]);
	
	  return ValueAccessor;
	}(BaseAccessor);
	
	var AttributeAccessor = function (_BaseAccessor6) {
	  _inherits(AttributeAccessor, _BaseAccessor6);
	
	  function AttributeAccessor(node, name) {
	    _classCallCheck(this, AttributeAccessor);
	
	    return _possibleConstructorReturn(this, (AttributeAccessor.__proto__ || Object.getPrototypeOf(AttributeAccessor)).call(this, node, name.slice(0, -1)));
	  }
	
	  _createClass(AttributeAccessor, [{
	    key: 'set',
	    value: function set(value) {
	      if (value) {
	        this.node.setAttribute(this.name, value);
	      } else {
	        this.node.removeAttribute(this.name);
	      }
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      return this.node.getAttribute(this.name);
	    }
	  }]);
	
	  return AttributeAccessor;
	}(BaseAccessor);
	
	function get(node, name) {
	  if (node && 'nodeType' in node) {
	    switch (node.nodeType) {
	      case Node.ELEMENT_NODE:
	        if (name.endsWith('$')) {
	          return new AttributeAccessor(node, name);
	        } else if (name === 'text') {
	          return new TextAccessor(node);
	        } else if (name === 'html') {
	          return new HTMLAccessor(node, name);
	        } else if (name === 'value' && node.nodeName === 'INPUT') {
	          return new ValueAccessor(node);
	        }
	
	        if (name.startsWith('class.')) {
	          return new ClassAccessor(node, name.split('.').splice(1).join('.'));
	        } else if (name.startsWith('style.')) {
	          return new StyleAccessor(node, name.split('.').splice(1).join('.'));
	        }
	
	        return new BaseAccessor(node, name);
	      case Node.TEXT_NODE:
	        if (node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {
	          return new ValueAccessor(node.parentElement);
	        }
	
	        return new TextAccessor(node);
	      default:
	        throw new Error('Unimplemented resolving accessor for nodeType: ' + node.nodeType);
	    }
	  } else {
	    return new BaseAccessor(node, name);
	  }
	}
	
	module.exports = BaseAccessor;
	module.exports.get = get;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Annotation = function () {
	  function Annotation(model, expr, accessor) {
	    _classCallCheck(this, Annotation);
	
	    this.model = model;
	    this.expr = expr;
	    this.accessor = accessor;
	  }
	
	  _createClass(Annotation, [{
	    key: "effect",
	    value: function effect(value) {
	      if (this.accessor) {
	        var _value = this.expr.invoke(this.model);
	        // FIXME implement composite annotation
	        // FIXME implement filtered annotation
	        // FIXME implement function type annotation
	        this.accessor.set(_value);
	      } else {
	        this.expr.invoke(this.model);
	      }
	    }
	  }]);
	
	  return Annotation;
	}();
	
	module.exports = Annotation;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function serialize(value) {
	  switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
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
	}
	
	function deserialize(value, type) {
	  switch (type) {
	    case Number:
	      value = Number(value);
	      break;
	
	    case Boolean:
	      value = Boolean(value === '' || value === 'true' || value === '1' || value === 'on');
	      break;
	
	    case Object:
	      try {
	        value = JSON.parse(value);
	      } catch (err) {
	        // allow non-JSON literals like Strings and Numbers
	        // console.warn('Failed decode json: "' + value + '" to Object');
	      }
	      break;
	
	    case Array:
	      try {
	        value = JSON.parse(value);
	      } catch (err) {
	        // .console.warn('Failed decode json: "' + value + '" to Array');
	        value = null;
	      }
	      break;
	
	    case Date:
	      console.log('>>>', value);
	      value = new Date(value);
	      break;
	
	    // behave like default for now
	    // case String:
	    default:
	      break;
	  }
	  return value;
	}
	
	module.exports.serialize = serialize;
	module.exports.deserialize = deserialize;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	var dashified = {};
	var camelized = {};
	
	function camelize(dash) {
	  var mapped = camelized[dash];
	  if (mapped) {
	    return mapped;
	  }
	  if (dash.indexOf('-') < 0) {
	    camelized[dash] = dash;
	  } else {
	    camelized[dash] = dash.replace(/-([a-z])/g, function (m) {
	      return m[1].toUpperCase();
	    });
	  }
	
	  return camelized[dash];
	}
	
	function dashify(camel) {
	  var mapped = dashified[camel];
	  if (mapped) {
	    return mapped;
	  }
	  dashified[camel] = camel.replace(/([a-z][A-Z])/g, function (g) {
	    return g[0] + '-' + g[1].toLowerCase();
	  });
	
	  return dashified[camel];
	}
	
	module.exports.camelize = camelize;
	module.exports.dashify = dashify;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Async = function () {
	  function Async(context) {
	    _classCallCheck(this, Async);
	
	    this.context = context;
	    this.handle = null;
	  }
	
	  _createClass(Async, [{
	    key: 'start',
	    value: function start(callback, wait) {
	      if (typeof callback !== 'function') {
	        throw new Error('Async should specify function');
	      }
	
	      wait = wait || 0;
	
	      var context = this.context;
	      var boundCallback = function boundCallback() {
	        callback.call(context);
	      };
	      this.handle = setTimeout(boundCallback, wait);
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel() {
	      clearTimeout(~~this.handle);
	    }
	  }]);
	
	  return Async;
	}();
	
	;
	
	var Debounce = function () {
	  function Debounce(context, immediate) {
	    _classCallCheck(this, Debounce);
	
	    this.context = context;
	    this.immediate = Boolean(immediate);
	    this.async = null;
	    this.running = false;
	  }
	
	  _createClass(Debounce, [{
	    key: 'start',
	    value: function start(callback, wait) {
	      if (this.immediate) {
	        throw new Error('Unimplemented yet!');
	      }
	
	      this.running = true;
	      this.async = new Async(this.context);
	      this.async.start(function () {
	        callback.call(this.context);
	        this.running = false;
	        this.async = null;
	      }.bind(this), wait);
	    }
	  }, {
	    key: 'cancel',
	    value: function cancel() {
	      this.running = false;
	      this.async.cancel();
	      this.async = null;
	    }
	  }]);
	
	  return Debounce;
	}();
	
	module.exports.Async = Async;
	module.exports.Debounce = Debounce;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var options = window.xinOptions || {};
	
	function setup(key, value) {
	  switch (arguments.length) {
	    case 0:
	      return options;
	    case 1:
	      return options[key] || undefined;
	    default:
	      options[key] = value;
	  }
	}
	
	function defaults(values, defaultValues) {
	  if ((typeof defaultValues === 'undefined' ? 'undefined' : _typeof(defaultValues)) !== 'object') {
	    return values || defaultValues;
	  }
	
	  values = values || {};
	  for (var i in defaultValues) {
	    if (i in values) {
	      continue;
	    }
	
	    values[i] = defaultValues[i];
	  }
	  return values;
	}
	
	function withDefault(key, defaultValues) {
	  return defaults(setup(key), defaultValues);
	}
	
	module.exports = setup;
	module.exports.defaults = defaults;
	module.exports.withDefault = withDefault;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	__webpack_require__(16);
	
	var Fx = function () {
	  function Fx(element, transition) {
	    _classCallCheck(this, Fx);
	
	    this.element = element;
	    this.duration = 0;
	    this.transition = transition || element.transition || 'none';
	
	    var merged = Fx.get(this.transition);
	    for (var i in merged) {
	      if (typeof merged[i] === 'function') {
	        this[i] = merged[i];
	      }
	    }
	  }
	
	  _createClass(Fx, [{
	    key: 'play',
	    value: function play(method, direction) {
	      return this[method](direction);
	    }
	  }]);
	
	  return Fx;
	}();
	
	var adapters = {
	  'none': {
	    in: function _in() /* direction */{
	      return Promise.resolve();
	    },
	    out: function out() /* direction */{
	      return Promise.resolve();
	    }
	  },
	  'transition-slide': {
	    in: function _in(direction) {
	      var directionClass = direction > 0 ? 'transition-slide-in-right' : 'transition-slide-in-left';
	
	      return new Promise(function (resolve /* , reject */) {
	        var onEnd = function () {
	          this.element.removeEventListener('webkitTransitionEnd', onEnd);
	          this.element.removeEventListener('transitionend', onEnd);
	
	          this.element.classList.remove('transition-slide-animate');
	
	          resolve();
	
	          setTimeout(function () {
	            this.element.classList.remove(directionClass);
	            this.element.classList.remove('transition-slide-in');
	          }.bind(this), 50);
	        }.bind(this);
	
	        this.element.addEventListener('webkitTransitionEnd', onEnd);
	        this.element.addEventListener('transitionend', onEnd);
	        this.element.classList.add(directionClass);
	
	        setTimeout(function () {
	          this.element.classList.add('transition-slide-animate');
	
	          setTimeout(function () {
	            this.element.classList.add('transition-slide-in');
	          }.bind(this), 50);
	        }.bind(this), 50);
	      }.bind(this));
	    },
	    out: function out(direction) {
	      var directionClass = direction > 0 ? 'transition-slide-out-left' : 'transition-slide-out-right';
	      return new Promise(function (resolve /* , reject */) {
	        var onEnd = function () {
	          this.element.removeEventListener('webkitTransitionEnd', onEnd);
	          this.element.removeEventListener('transitionend', onEnd);
	
	          this.element.classList.remove('transition-slide-animate');
	
	          resolve();
	
	          setTimeout(function () {
	            this.element.classList.remove(directionClass);
	            this.element.classList.remove('transition-slide-out');
	          }.bind(this), 50);
	        }.bind(this);
	
	        this.element.addEventListener('webkitTransitionEnd', onEnd);
	        this.element.addEventListener('transitionend', onEnd);
	        this.element.classList.add(directionClass);
	
	        setTimeout(function () {
	          this.element.classList.add('transition-slide-animate');
	
	          setTimeout(function () {
	            this.element.classList.add('transition-slide-out');
	          }.bind(this), 50);
	        }.bind(this), 50);
	      }.bind(this));
	    }
	  }
	};
	
	Fx.add = function (name, transition) {
	  adapters[name] = transition;
	};
	
	Fx.get = function (name) {
	  return adapters[name] || adapters.none;
	};
	
	module.exports = Fx;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(19)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./transition-animate.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./transition-animate.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(18)();
	// imports
	
	
	// module
	exports.push([module.id, ".transition-slide-in-left {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n  display: block!important;\n}\n\n.transition-slide-in-right {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n  display: block!important;\n}\n\n.transition-slide-out-left,\n.transition-slide-out-right {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n  display: block!important;\n}\n\n.transition-slide-animate {\n  -webkit-transition: -webkit-transform 300ms;\n  transition: transform 300ms, -webkit-transform 300ms;\n  will-change: transform, -webkit-transform;\n}\n\n.transition-slide-out.transition-slide-out-left {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n}\n\n.transition-slide-out.transition-slide-out-right {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n}\n\n.transition-slide-in {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n}\n\n.trans-animated {\n  -webkit-animation-duration: 300ms;\n  animation-duration: 300ms;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n", ""]);
	
	// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=xin.js.map