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
	var Component = __webpack_require__(3);
	var Fx = __webpack_require__(20);
	var asyncModule = __webpack_require__(18);
	var dom = __webpack_require__(17);
	var inflector = __webpack_require__(16);
	var setup = __webpack_require__(19);
	
	module.exports = window.xin = repository.get;
	module.exports.put = repository.put;
	module.exports.define = repository.define;
	module.exports.Component = Component;
	module.exports.Fx = Fx;
	module.exports.async = asyncModule;
	module.exports.dom = dom;
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
	  return typeof value === 'function' ? value() : value;
	}
	
	function define(name, Comp, options) {
	  if (window.customElements) {
	    throw new Error('Unimplemented webcomponents v1');
	  }
	
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
	
	module.exports.get = get;
	module.exports.put = put;
	module.exports.define = define;
	module.exports.v = v;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* globals HTMLElement */
	
	var _assert = __webpack_require__(4);
	
	var _assert2 = _interopRequireDefault(_assert);
	
	var _templateBinding = __webpack_require__(9);
	
	var _templateBinding2 = _interopRequireDefault(_templateBinding);
	
	var _repository = __webpack_require__(2);
	
	var _inflector = __webpack_require__(16);
	
	var _inflector2 = _interopRequireDefault(_inflector);
	
	var _dom = __webpack_require__(17);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _async = __webpack_require__(18);
	
	var _setup = __webpack_require__(19);
	
	var _setup2 = _interopRequireDefault(_setup);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEBUG = _setup2.default.withDefault('debug', false);
	
	var componentId = 0;
	function nextId() {
	  return componentId++;
	}
	
	var Component = function () {
	  function Component() {
	    _classCallCheck(this, Component);
	  }
	
	  _createClass(Component, [{
	    key: 'createdCallback',
	    value: function createdCallback() {
	      if (DEBUG) console.info('CREATED ' + this.is);
	
	      this.__id = nextId();
	      (0, _repository.put)(this.__id, this);
	      this.setAttribute('xin-id', this.__id);
	
	      this.classList.add(this.is);
	
	      if (this.created) {
	        this.created();
	      }
	
	      this.__initData();
	
	      this.__initTemplate();
	
	      this.__initProps();
	
	      this.readyCallback();
	    }
	  }, {
	    key: 'readyCallback',
	    value: function readyCallback() {
	      if (DEBUG) console.info('READY ' + this.is);
	
	      if (this.ready) {
	        this.ready();
	      }
	    }
	  }, {
	    key: 'attachedCallback',
	    value: function attachedCallback() {
	      if (DEBUG) console.info('ATTACHED ' + this.is);
	
	      if (this.attached) {
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
	      this.__content = [];
	      this.__debouncers = {};
	    }
	  }, {
	    key: '__initProps',
	    value: function __initProps() {
	      for (var propName in this.props) {
	        // exclude prototype properties
	        if (!{}.hasOwnProperty.call(this.props, propName)) {
	          continue;
	        }
	
	        var property = this.props[propName];
	        var attrName = _inflector2.default.dashify(propName);
	        var attrVal = this.getAttribute(attrName);
	
	        var expr = _templateBinding2.default.Expr.get(attrVal);
	
	        // copy value from attribute to property
	        if (typeof attrVal === 'string') {
	          var val;
	          // set property value when attr set and the value specified is static
	          // otherwise set it to #__unprocessedProperties tobe processed later
	          if (expr.type !== 's') {
	            this.__unprocessedProperties[propName] = expr;
	          } else {
	            val = _templateBinding2.default.Serializer.deserialize(attrVal, property.type);
	          }
	
	          // this.removeAttribute(attrName);
	          this[propName] = val;
	        }
	
	        // when property is undefined, log error when property is required otherwise assign to default value
	        if (undefined === this[propName]) {
	          if (property.required) {
	            throw new Error('"' + this.__getId() + '" missing required "' + propName + '"');
	          } else {
	            this[propName] = (0, _repository.v)(property.value);
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
	  }, {
	    key: '__initTemplate',
	    value: function __initTemplate() {
	      var _this = this;
	
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
	
	      // when template does not exist just initialize template to get binding but do not render
	      if (!template) {
	        _templateBinding2.default.prototype.__initialize.call(this, template, this);
	        return;
	      }
	
	      (0, _dom2.default)(this).childNodes.forEach(function (node) {
	        _this.__content.push(node);
	        _this.removeChild(node);
	      });
	
	      _templateBinding2.default.prototype.__initialize.call(this, template, this);
	
	      this.render(this.__content);
	    }
	  }, {
	    key: 'fire',
	    value: function fire(type, detail, options) {
	      return (0, _dom2.default)(this).fire(type, detail, options);
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
	  }], [{
	    key: 'add',
	    value: function add(meta) {
	      _assert2.default.equal(typeof meta === 'undefined' ? 'undefined' : _typeof(meta), 'object');
	      (0, _assert2.default)(meta.is);
	
	      var SuperClass = Component;
	      var ext = '';
	      var is = '';
	
	      var protoOptions = {};
	
	      Object.keys(meta).forEach(function (key) {
	        var val = meta[key];
	        switch (key) {
	          case 'is':
	            is = val;
	            break;
	          case 'extends':
	            switch (typeof val === 'undefined' ? 'undefined' : _typeof(val)) {
	              case 'function':
	                SuperClass = val;
	                break;
	              case 'string':
	                ext = val;
	                break;
	              case 'object':
	                SuperClass = val[0];
	                ext = val[1];
	                break;
	            }
	            break;
	          case 'props':
	            protoOptions[key] = {
	              get: function get() {
	                var props = SuperClass.prototype.props;
	                for (var i in val) {
	                  props[i] = val[i];
	                }
	                return props;
	              }
	            };
	            break;
	          default:
	            protoOptions[key] = {
	              value: val
	            };
	        }
	      });
	
	      var proto = Object.create(SuperClass.prototype, protoOptions);
	
	      function ComponentClass() {}
	
	      ComponentClass.prototype = proto;
	
	      if (ext) {
	        (0, _repository.define)(is, ComponentClass, { extends: ext });
	      } else {
	        (0, _repository.define)(is, ComponentClass);
	      }
	
	      return ComponentClass;
	    }
	  }]);
	
	  return Component;
	}();
	
	for (var key in _templateBinding2.default.prototype) {
	  if (_templateBinding2.default.prototype.hasOwnProperty(key)) {
	    Component.prototype[key] = _templateBinding2.default.prototype[key];
	  }
	}
	
	Object.setPrototypeOf(Component.prototype, HTMLElement.prototype);
	
	module.exports = Component;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:
	
	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }
	
	  var x = a.length;
	  var y = b.length;
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }
	
	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}
	
	// based on node assert, original notice:
	
	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var util = __webpack_require__(5);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.
	
	var assert = module.exports = ok;
	
	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })
	
	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;
	
	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }
	
	      this.stack = out;
	    }
	  }
	};
	
	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);
	
	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}
	
	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.
	
	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	
	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}
	
	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;
	
	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	
	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;
	
	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);
	
	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};
	
	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	
	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};
	
	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};
	
	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};
	
	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;
	
	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;
	
	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;
	
	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;
	
	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};
	
	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }
	
	    memos.actual.push(actual);
	    memos.expected.push(expected);
	
	    return objEquiv(actual, expected, strict, memos);
	  }
	}
	
	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}
	
	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}
	
	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};
	
	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}
	
	
	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};
	
	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};
	
	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }
	
	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }
	
	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }
	
	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }
	
	  return expected.call({}, actual) === true;
	}
	
	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}
	
	function _throws(shouldThrow, block, expected, message) {
	  var actual;
	
	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }
	
	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }
	
	  actual = _tryBlock(block);
	
	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');
	
	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }
	
	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;
	
	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }
	
	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}
	
	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	
	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};
	
	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};
	
	assert.ifError = function(err) { if (err) throw err; };
	
	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};
	
	
	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	
	  return deprecated;
	};
	
	
	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};
	
	
	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;
	
	
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};
	
	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	
	
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	
	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	
	
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	
	
	function arrayToHash(array) {
	  var hash = {};
	
	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });
	
	  return hash;
	}
	
	
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }
	
	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }
	
	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }
	
	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }
	
	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	
	  var base = '', array = false, braces = ['{', '}'];
	
	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }
	
	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }
	
	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }
	
	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }
	
	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	
	  ctx.seen.push(value);
	
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	
	  ctx.seen.pop();
	
	  return reduceToSingleString(output, base, braces);
	}
	
	
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}
	
	
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	
	
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}
	
	
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	
	  return name + ': ' + str;
	}
	
	
	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	
	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }
	
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}
	
	
	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;
	
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;
	
	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;
	
	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;
	
	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;
	
	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;
	
	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;
	
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;
	
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	
	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;
	
	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;
	
	exports.isBuffer = __webpack_require__(7);
	
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	
	
	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}
	
	
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];
	
	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}
	
	
	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};
	
	
	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(8);
	
	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};
	
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/* globals Node, HTMLUnknownElement */
	var Expr = __webpack_require__(10);
	var Binding = __webpack_require__(12);
	var Accessor = __webpack_require__(13);
	var Annotation = __webpack_require__(14);
	var Token = __webpack_require__(11);
	var Serializer = __webpack_require__(15);
	
	var SLOT_SUPPORTED = !(document.createElement('slot') instanceof HTMLUnknownElement);
	
	var templateId = 0;
	
	function nextId() {
	  return templateId++;
	}
	
	function slotName(element) {
	  return SLOT_SUPPORTED ? element.name : element.getAttribute('name');
	}
	
	function slotAppend(slot, node) {
	  if (!slot.__appended) {
	    slot.__appended = true;
	    slot.__fallbackContent = slot.innerHTML;
	    slot.innerHTML = '';
	  }
	
	  slot.appendChild(node);
	}
	
	function elementSlot(element) {
	  return SLOT_SUPPORTED ? element.slot : element.getAttribute('slot');
	}
	
	function T(template, host) {
	  this.__initialize(template, host);
	}
	
	T.prototype = {
	  __initialize: function __initialize(template, host) {
	    this.__templateId = nextId();
	    this.__templateAnnotatedElements = [];
	    this.__templateBindings = {};
	    this.__templateListeners = {};
	
	    if (!template) {
	      return;
	    }
	
	    // do below only if template is exists
	    this.__template = template;
	    this.__templateHost = host || (template ? template.parentElement : null);
	    this.__templateFragment = document.importNode(this.__template.content, true);
	    this.__templateMarker = document.createComment(this.__templateId);
	
	    this.__parseAnnotations();
	
	    if (this.__template.parentElement === this.__templateHost) {
	      this.__templateHost.insertBefore(this.__templateMarker, this.__template);
	      this.__templateHost.removeChild(this.__template);
	    } else {
	      this.__templateHost.appendChild(this.__templateMarker);
	    }
	  },
	  render: function render(content) {
	    if (content) {
	      try {
	        [].forEach.call(this.__templateFragment.querySelectorAll('slot'), function (slot) {
	          var name = slotName(slot);
	          if (name) {
	            content.forEach(function (node) {
	              if (node.nodeType === Node.ELEMENT_NODE && name === elementSlot(node)) {
	                slotAppend(slot, node);
	              }
	              // TODO query to childnodes looking for slot
	            });
	          } else {
	            content.forEach(function (node) {
	              slotAppend(slot, node);
	            });
	          }
	        });
	      } catch (err) {
	        console.error(err.stack);
	        throw err;
	      }
	    }
	
	    this.__templateHost.insertBefore(this.__templateFragment, this.__templateMarker);
	  },
	  get: function get(path) {
	    var object = this;
	
	    var segments = path.split('.');
	
	    segments.some(function (segment) {
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
	    var oldValue = this.get(path);
	
	    if (value === oldValue) {
	      return;
	    }
	
	    var object = this;
	
	    var segments = path.split('.');
	
	    segments.slice(0, -1).forEach(function (segment) {
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
	
	    this.notify(path, value, oldValue);
	  },
	  __getBinding: function __getBinding(path) {
	    var binding = void 0;
	
	    var segments = path.split('.');
	
	    var bindings = this.__templateBindings;
	    var found = segments.every(function (segment) {
	      var currentBinding = binding ? binding.paths[segment] : bindings[segment];
	      if (!currentBinding) {
	        return false;
	      }
	
	      binding = currentBinding;
	      return true;
	    }, null);
	
	    if (found) {
	      return binding;
	    }
	  },
	  notify: function notify(path, value, oldValue) {
	    try {
	      var binding = this.__getBinding(path);
	      if (binding) {
	        binding.walkEffect(value);
	      }
	    } catch (err) {
	      console.warn('#notify caught error: ' + err.message + '\n Stack trace: ' + err.stack);
	    }
	  },
	  addObserver: function addObserver(propName, fnExpr) {
	    var expr = Expr.getFn(fnExpr, [propName], true);
	    var accessor = Accessor.get(null, null, expr);
	    var result = Annotation.annotate(this, accessor);
	
	    // invoke first time;
	    expr.invoke(this);
	
	    return result;
	  },
	  addComputedProperty: function addComputedProperty(propName, fnExpr) {
	    var expr = Expr.getFn(fnExpr, [], true);
	    var accessor = Accessor.get(this, propName, expr);
	    var annotation = Annotation.annotate(this, accessor);
	
	    // invoke first time;
	    this.set(propName, expr.invoke(this));
	
	    return annotation;
	  },
	  __parseAnnotations: function __parseAnnotations() {
	    var _this = this;
	
	    this.__templateAnnotatedElements = [];
	
	    var len = this.__templateFragment.childNodes.length;
	    for (var i = 0; i < len; i++) {
	      var node = this.__templateFragment.childNodes[i];
	      if (node.nodeType === window.Node.ELEMENT_NODE) {
	        this.__parseElementAnnotations(node);
	      } else {
	        this.__parseTextAnnotations(node);
	      }
	    }
	
	    Object.keys(this.__templateBindings).forEach(function (key) {
	      return _this.notify(key, _this.get(key));
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
	
	    // TODO might be slow or memory leak setting event listener to inside element
	    element.addEventListener(eventName, function (evt) {
	      return expr.invoke(context, { evt: evt });
	    }, true);
	  },
	  __parseAttributeAnnotations: function __parseAttributeAnnotations(element) {
	    var context = this;
	
	    // clone attributes to array first then foreach because we will remove
	    // attribute later if already processed
	    // this hack to make sure when attribute removed the attributes index doesnt shift.
	    return Array.prototype.slice.call(element.attributes).reduce(function (annotated, attr) {
	      var attrName = attr.name;
	
	      if (attrName.indexOf('(') === 0) {
	        context.__parseEventAnnotations(element, attrName);
	      } else {
	        // bind property annotation
	        var expr = Expr.get(attr.value);
	        if (expr.type !== 's') {
	          annotated = Annotation.annotate(context, Accessor.get(element, attrName)) || annotated;
	        }
	      }
	
	      return annotated;
	    }, false);
	  },
	  __parseElementAnnotations: function __parseElementAnnotations(element) {
	    var annotated = false;
	
	    if (element.__templateInstance) {
	      return false;
	    }
	
	    element.__templateInstance = this;
	
	    if (element.attributes && element.attributes.length) {
	      annotated = this.__parseAttributeAnnotations(element) || annotated;
	    }
	
	    if (element.childNodes && element.childNodes.length) {
	      var childNodes = [].slice.call(element.childNodes);
	      var childNodesLength = childNodes.length;
	
	      for (var i = 0; i < childNodesLength; i++) {
	        var childNode = childNodes[i];
	
	        switch (childNode.nodeType) {
	          case Node.TEXT_NODE:
	            annotated = this.__parseTextAnnotations(childNode) || annotated;
	            break;
	          case Node.ELEMENT_NODE:
	            annotated = this.__parseElementAnnotations(childNode) || annotated;
	            break;
	          default:
	          // noop
	        }
	      }
	    }
	
	    if (annotated) {
	      this.__templateAnnotatedElements.push(element);
	    }
	
	    return annotated;
	  },
	  __parseTextAnnotations: function __parseTextAnnotations(node) {
	    return Annotation.annotate(this, Accessor.get(node));
	  },
	  __templateGetBinding: function __templateGetBinding(name) {
	    var segments = name.split('.');
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
	  },
	  addTargetedListener: function addTargetedListener(eventName, target, callback) {
	    var self = this;
	    var listeners = this.__templateListeners[eventName] = this.__templateListeners[eventName] || [];
	
	    var listener = {
	      name: eventName,
	      target: target,
	      callback: callback,
	      listenerCallback: function listenerCallback(evt) {
	        if (evt.target.__templateInstance !== self) {
	          return;
	        }
	
	        if (evt.target === listener.target) {
	          callback.apply(null, arguments);
	        }
	      }
	    };
	
	    listeners.push(listener);
	
	    this.__templateHost.addEventListener(eventName, listener.listenerCallback, true);
	  },
	  removeTargetedListener: function removeTargetedListener(eventName, target, callback) {
	    var listeners = [];
	    if (target && this.__templateListeners[eventName]) {
	      this.__templateListeners[eventName].forEach(function (listener) {
	        if (listener.target === target && (!callback || listener.callback === callback)) {
	          return;
	        }
	
	        listeners.push(listener);
	      });
	    }
	    this.__templateListeners[eventName] = listeners;
	  }
	};
	
	if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
	  window.T = T;
	}
	
	module.exports = T;
	module.exports.Expr = Expr;
	module.exports.Token = Token;
	module.exports.Serializer = Serializer;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Token = __webpack_require__(11);
	
	var Expr = function () {
	  function Expr(value, unwrapped) {
	    _classCallCheck(this, Expr);
	
	    // define base properties
	    this.value = value;
	    this.unwrapped = Boolean(unwrapped);
	    this.mode = '[';
	    this.type = 's';
	    this.name = '';
	    this.args = [];
	
	    // validate args
	    if (typeof value !== 'string') {
	      return;
	    }
	
	    // cleanse value
	    value = value.trim();
	
	    var token = value;
	    if (!this.unwrapped) {
	      if (value[0] !== '[' && value[0] !== '{') {
	        return;
	      }
	      token = value.slice(2, -2).trim();
	      this.mode = value[0];
	    }
	
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
	      var f = typeof context.get === 'function' ? context.get(this.name) : context[this.name];
	
	      if (this.type === 'p') {
	        return f;
	      }
	
	      if (typeof f !== 'function') {
	        throw new Error('Method is not eligible, ' + context.nodeName + '#' + this.name);
	      }
	
	      var args = this.args.map(function (arg) {
	        return arg.value(context, otherArgs);
	      });
	
	      return f.apply(context, args);
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
	
	function get(value, unwrapped) {
	  // FIXME implement cache
	  return new Expr(value, unwrapped);
	}
	
	function getFn(value, args, unwrapped) {
	  return get(value.indexOf('(') === -1 ? value + '(' + args.join(', ') + ')' : value, unwrapped);
	}
	
	function rawTokenize(str) {
	  var count = 0;
	  var tokens = [];
	
	  while (str && count++ < 10) {
	    var matches = str.match(/^\s*("[^"]*"|'[^']*'|[^,]+),?/);
	
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
/* 11 */
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
	
	      return this.name in context ? context[this.name] : others[this.name];
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
/* 12 */
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
	          annotation.effect(value);
	        } catch (err) {
	          console.error('Error caught while walk effect annotation: ' + annotation.expr.value + '\n' + err.stack);
	        }
	      });
	
	      Object.keys(this.paths).forEach(function (i) {
	        return _this.paths[i].walkEffect(value ? value[i] : undefined);
	      });
	    }
	  }]);
	
	  return Binding;
	}();
	
	module.exports = Binding;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* globals Node */
	
	var Expr = __webpack_require__(10);
	
	var Accessor = function () {
	  function Accessor(node, name, expr) {
	    _classCallCheck(this, Accessor);
	
	    this.node = node;
	    this.name = name;
	    this.expr = expr;
	
	    this.changeEvents = [];
	  }
	
	  _createClass(Accessor, [{
	    key: 'set',
	    value: function set(value, model) {
	      if (typeof this.node === 'function') {
	        this.node(this.name, this.expr.invoke(model));
	      } else {
	        this.node[this.name] = this.expr.invoke(model);
	      }
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      return this.node[this.name];
	    }
	  }]);
	
	  return Accessor;
	}();
	
	var TextAccessor = function (_Accessor) {
	  _inherits(TextAccessor, _Accessor);
	
	  function TextAccessor(node) {
	    _classCallCheck(this, TextAccessor);
	
	    return _possibleConstructorReturn(this, (TextAccessor.__proto__ || Object.getPrototypeOf(TextAccessor)).call(this, node, 'textContent', Expr.get(node.textContent)));
	  }
	
	  _createClass(TextAccessor, [{
	    key: 'set',
	    value: function set(value, model) {
	      this.node.textContent = this.expr.invoke(model) || '';
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      return this.node.textContext;
	    }
	  }]);
	
	  return TextAccessor;
	}(Accessor);
	
	var ValueAccessor = function (_Accessor2) {
	  _inherits(ValueAccessor, _Accessor2);
	
	  function ValueAccessor(node) {
	    _classCallCheck(this, ValueAccessor);
	
	    var _this2 = _possibleConstructorReturn(this, (ValueAccessor.__proto__ || Object.getPrototypeOf(ValueAccessor)).call(this, node, 'value', Expr.get(node.value)));
	
	    if (_this2.node.nodeName === 'INPUT') {
	      _this2.changeEvents.push('input');
	    }
	    return _this2;
	  }
	
	  _createClass(ValueAccessor, [{
	    key: 'set',
	    value: function set(value, model) {
	      this.node.value = this.expr.invoke(model) || '';
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      return this.node.value;
	    }
	  }]);
	
	  return ValueAccessor;
	}(Accessor);
	
	var AttributeAccessor = function (_Accessor3) {
	  _inherits(AttributeAccessor, _Accessor3);
	
	  function AttributeAccessor(node, name) {
	    _classCallCheck(this, AttributeAccessor);
	
	    return _possibleConstructorReturn(this, (AttributeAccessor.__proto__ || Object.getPrototypeOf(AttributeAccessor)).call(this, node, name.slice(0, -1), Expr.get(node.getAttribute(name))));
	  }
	
	  _createClass(AttributeAccessor, [{
	    key: 'set',
	    value: function set(value) {
	      this.node.setAttribute(this.name, value);
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      return this.node.getAttribute(this.name);
	    }
	  }]);
	
	  return AttributeAccessor;
	}(Accessor);
	
	function get(node, name, expr) {
	  if (node && 'nodeType' in node) {
	    switch (node.nodeType) {
	      case Node.ELEMENT_NODE:
	        if (name === 'value') {
	          return new ValueAccessor(node);
	        } else if (name.endsWith('$')) {
	          return new AttributeAccessor(node, name);
	        }
	
	        return new Accessor(node, name, expr || Expr.get(node.getAttribute(name)));
	      case Node.TEXT_NODE:
	        if (node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {
	          return new ValueAccessor(node.parentElement);
	        }
	        return new TextAccessor(node);
	      default:
	        throw new Error('Unimplemented resolving accessor for nodeType: ' + node.nodeType);
	    }
	  } else {
	    return new Accessor(node, name, expr);
	  }
	}
	
	module.exports = Accessor;
	module.exports.get = get;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Annotation = function () {
	  function Annotation(accessor) {
	    _classCallCheck(this, Annotation);
	
	    this.accessor = accessor;
	  }
	
	  _createClass(Annotation, [{
	    key: 'annotate',
	    value: function annotate(model) {
	      var _this = this;
	
	      var accessor = this.accessor;
	      var expr = accessor.expr;
	
	      this.model = model;
	
	      expr.annotatedPaths.forEach(function (arg) {
	        return model.__templateGetBinding(arg.name).annotations.push(_this);
	      });
	
	      if (expr.mode === '{') {
	        (function () {
	          var notifyCallback = function notifyCallback(evt) {
	            evt.stopImmediatePropagation();
	            model.set(accessor.expr.name, accessor.get());
	          };
	
	          accessor.changeEvents.forEach(function (name) {
	            return model.addTargetedListener(name, accessor.node, notifyCallback);
	          });
	        })();
	      }
	    }
	  }, {
	    key: 'effect',
	    value: function effect(value) {
	      // FIXME implement composite annotation
	      // FIXME implement filtered annotation
	      // FIXME implement function type annotation
	      this.accessor.set(value, this.model);
	    }
	  }]);
	
	  return Annotation;
	}();
	
	function annotate(model, accessor) {
	  if (accessor.expr.type === 's') {
	    return false;
	  }
	
	  new Annotation(accessor).annotate(model);
	
	  return true;
	}
	
	module.exports = Annotation;
	module.exports.annotate = annotate;

/***/ },
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* globals HTMLElement, Event, CustomEvent */
	
	var _matches = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;
	
	var Dom = function () {
	  function Dom(element) {
	    _classCallCheck(this, Dom);
	
	    this.element = element;
	  }
	
	  _createClass(Dom, [{
	    key: 'querySelector',
	    value: function querySelector(selector) {
	      return this.element.querySelector(selector);
	    }
	  }, {
	    key: 'querySelectorAll',
	    value: function querySelectorAll(selector) {
	      return Array.prototype.slice.call(this.element.querySelectorAll(selector));
	    }
	  }, {
	    key: 'parent',
	    value: function parent(selector) {
	      var parent$ = this.element.parentElement;
	
	      if (!selector) {
	        return parent$;
	      }
	
	      while (parent$) {
	        if (!selector || _matches.call(parent$, selector)) {
	          break;
	        }
	        parent$ = parent$.parentElement;
	      }
	
	      return parent$;
	    }
	  }, {
	    key: 'parents',
	    value: function parents(selector) {
	      var parents$ = [];
	      var parent$ = this.element.parentElement;
	
	      while (parent$) {
	        if (!selector || _matches.call(parent$, selector)) {
	          parents$.push(parent$);
	        }
	        parent$ = parent$.parentElement;
	      }
	
	      return parents$;
	    }
	  }, {
	    key: 'matches',
	    value: function matches(selector) {
	      return _matches.call(this.element, selector);
	    }
	  }, {
	    key: 'is',
	    value: function is(selector) {
	      return _matches.call(this.element, selector);
	    }
	  }, {
	    key: 'appendChild',
	    value: function appendChild(node) {
	      this.element.appendChild(node);
	      return node;
	    }
	  }, {
	    key: 'insertBefore',
	    value: function insertBefore(node, refNode) {
	      if (!refNode) {
	        return this.appendChild(node);
	      }
	
	      this.element.insertBefore(node, refNode);
	
	      return node;
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.element.parentNode.removeChild(this.element);
	    }
	  }, {
	    key: 'fire',
	    value: function fire(type, detail, options) {
	      options = options || {};
	      detail = detail || {};
	
	      var event;
	      var node = options.node || this.element;
	      var bubbles = options.bubbles === undefined ? true : options.bubbles;
	      var cancelable = Boolean(options.cancelable);
	
	      switch (type) {
	        case 'click':
	          event = new Event(type, {
	            bubbles: bubbles,
	            cancelable: cancelable
	          });
	
	          // TODO check if without this works on every browsers
	          // event = document.createEvent('HTMLEvents');
	          // event.initEvent(type, true, false);
	
	          node.dispatchEvent(event);
	
	          break;
	        default:
	          event = new CustomEvent(type, {
	            bubbles: Boolean(bubbles),
	            cancelable: cancelable,
	            detail: detail
	          });
	          node.dispatchEvent(event);
	          break;
	      }
	
	      return event;
	    }
	  }, {
	    key: 'transform',
	    value: function transform(_transform) {
	      this.style.webkitTransform = _transform;
	      this.style.mozTransform = _transform;
	      this.style.msTransform = _transform;
	      this.style.oTransform = _transform;
	      this.style.transform = _transform;
	    }
	  }, {
	    key: 'childNodes',
	    get: function get() {
	      return Array.prototype.slice.call(this.element.childNodes);
	    }
	  }, {
	    key: 'children',
	    get: function get() {
	      return Array.prototype.slice.call(this.element.children);
	    }
	  }]);
	
	  return Dom;
	}();
	
	function dom(element) {
	  return new Dom(element);
	}
	
	module.exports = dom;

/***/ },
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	__webpack_require__(21);
	
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(24)(content, {});
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(23)();
	// imports
	
	
	// module
	exports.push([module.id, ".transition-slide-in-left {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n  display: block!important;\n}\n\n.transition-slide-in-right {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n  display: block!important;\n}\n\n.transition-slide-out-left,\n.transition-slide-out-right {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n  display: block!important;\n}\n\n.transition-slide-animate {\n  -webkit-transition: -webkit-transform 300ms;\n  transition: transform 300ms, -webkit-transform 300ms;\n}\n\n.transition-slide-out.transition-slide-out-left {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n}\n\n.transition-slide-out.transition-slide-out-right {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n}\n\n.transition-slide-in {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n}\n\n.trans-animated {\n  -webkit-animation-duration: 300ms;\n  animation-duration: 300ms;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n", ""]);
	
	// exports


/***/ },
/* 23 */
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
/* 24 */
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