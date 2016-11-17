/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length)
/******/ 			resolves.shift()();
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		5: 0
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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return Promise.resolve();
/******/
/******/ 		// an Promise means "currently loading".
/******/ 		if(installedChunks[chunkId]) {
/******/ 			return installedChunks[chunkId][2];
/******/ 		}
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		return installedChunks[chunkId][2] = promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _repository = __webpack_require__(9);

var _component = __webpack_require__(21);

var _fx = __webpack_require__(22);

var _fx2 = _interopRequireDefault(_fx);

var _setup = __webpack_require__(10);

var _setup2 = _interopRequireDefault(_setup);

var _object = __webpack_require__(8);

var _object2 = _interopRequireDefault(_object);

var _templateBinding = __webpack_require__(1);

var _templateBinding2 = _interopRequireDefault(_templateBinding);

var _async = __webpack_require__(2);

var _async2 = _interopRequireDefault(_async);

var _debounce = __webpack_require__(7);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_typeof(window.xin) === 'object') {
  _setup2.default.load(window.xin);
}

var xin = function xin(id) {
  return (0, _repository.get)(id);
};

xin.put = _repository.put;
xin.Component = _component.Component;
xin.define = _component.define;
xin.base = _component.base;
xin.object = _object2.default;
xin.setup = _setup2.default;
xin.filter = _templateBinding2.default.Filter;
xin.event = _templateBinding2.default.Event;
xin.Fx = _fx2.default;
xin.Async = _async2.default;
xin.Debounce = _debounce2.default;

window.xin = xin;

exports.default = xin;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expr = __webpack_require__(19);

var _expr2 = _interopRequireDefault(_expr);

var _binding = __webpack_require__(16);

var _binding2 = _interopRequireDefault(_binding);

var _accessor = __webpack_require__(14);

var _accessor2 = _interopRequireDefault(_accessor);

var _annotation = __webpack_require__(15);

var _annotation2 = _interopRequireDefault(_annotation);

var _filter = __webpack_require__(5);

var _filter2 = _interopRequireDefault(_filter);

var _token = __webpack_require__(6);

var _token2 = _interopRequireDefault(_token);

var _event = __webpack_require__(18);

var _event2 = _interopRequireDefault(_event);

var _css = __webpack_require__(17);

var _css2 = _interopRequireDefault(_css);

var _serializer = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var templateId = 0;
function nextId() {
  return templateId++;
}

var SLOT_SUPPORTED = typeof window === 'undefined' ? false : 'HTMLUnknownElement' in window && !(document.createElement('slot') instanceof window.HTMLUnknownElement);

function slotName(element) {
  return SLOT_SUPPORTED ? element.name : element.getAttribute('name');
}

function fixTemplate(template) {
  if (!template.content && window.HTMLTemplateElement && window.HTMLTemplateElement.decorate) {
    window.HTMLTemplateElement.decorate(template);
  }
  return template;
}

function T(template, host, marker) {
  this.__templateInitialize(template, host, marker);
  this.__templateRender();
}

T.prototype = {
  get $() {
    return this.__templateHost.getElementsByTagName('*');
  },

  $$: function $$(selector) {
    return this.querySelector(selector);
  },
  on: function on() {
    var _Event;

    (_Event = (0, _event2.default)(this.__templateHost)).on.apply(_Event, arguments);
  },
  off: function off() {
    var _Event2;

    (_Event2 = (0, _event2.default)(this.__templateHost)).off.apply(_Event2, arguments);
  },
  once: function once() {
    var _Event3;

    (_Event3 = (0, _event2.default)(this.__templateHost)).once.apply(_Event3, arguments);
  },
  all: function all(obj) {
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        this.set(i, obj[i]);
      }
    }
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
  push: function push(path) {
    var _object$property;

    path = this.__templateGetPathAsArray(path);

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

    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }

    var result = (_object$property = object[property]).push.apply(_object$property, values);

    this.notify(path, object[property]);

    return result;
  },
  pop: function pop(path) {
    path = this.__templateGetPathAsArray(path);

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

    var result = object[property].pop();

    this.notify(path, object[property]);

    return result;
  },
  splice: function splice(path) {
    var _object$property2;

    path = this.__templateGetPathAsArray(path);

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

    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    var result = (_object$property2 = object[property]).splice.apply(_object$property2, args);

    this.notify(path, object[property]);

    return result;
  },
  notify: function notify(path, value) {
    path = this.__templateGetPathAsString(path);

    if (!this.__templateReady) {
      if (this.__templateNotifyOnReady.indexOf(path) === -1) {
        this.__templateNotifyOnReady.push(path);
      }
      return;
    }

    // try {
    var binding = this.__templateGetBinding(path);
    if (binding) {
      if (typeof value === 'undefined') {
        value = this.get(path);
      }

      binding.walkEffect(value);
    }
    // } catch (err) {
    //   console.warn(`#notify caught error: ${err.message}\n Stack trace: ${err.stack}`);
    // }
  },
  __templateInitialize: function __templateInitialize(template, host, marker) {
    this.__templateId = nextId();
    this.__templateBindings = {};
    this.__templateHost = host || (template ? template.parentElement : null);
    this.__templateMarker = marker;

    this.__templateReady = false;
    this.__templateNotifyOnReady = [];

    if (!template) {
      return;
    }

    // do below only if template is exists
    this.__template = fixTemplate(template);
    this.__templateChildNodes = [];

    this.__templateFragment = document.importNode(this.__template.content, true);
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
  __templateRender: function __templateRender(contentFragment) {
    var _this = this;

    this.__templateReady = true;

    this.__templateNotifyOnReady.forEach(function (key) {
      _this.notify(key, _this.get(key));
    });
    this.__templateNotifyOnReady = [];

    if (!this.__template) {
      return;
    }

    var fragment = this.__templateFragment;
    this.__templateFragment = null;

    if (contentFragment && contentFragment instanceof window.DocumentFragment) {
      // try {
      [].forEach.call(fragment.querySelectorAll('slot'), function (slot) {
        var name = slotName(slot);
        var parent = slot.parentElement || fragment;
        var marker = document.createComment('slot ' + name);

        parent.insertBefore(marker, slot);
        parent.removeChild(slot);

        if (name) {
          var node = contentFragment.querySelectorAll('[slot="' + name + '"]');
          [].forEach.call(node, function (node) {
            parent.insertBefore(node, marker);
          });
        } else {
          parent.insertBefore(contentFragment, marker);
        }
      });
    }

    this.__templateMarker.parentElement.insertBefore(fragment, this.__templateMarker);
  },
  __templateUninitialize: function __templateUninitialize() {
    this.__templateChildNodes.forEach(function (node) {
      node.parentElement.removeChild(node);
    });
  },
  __templateGetPathAsArray: function __templateGetPathAsArray(path) {
    // if (!path) {
    //   throw new Error(`Unknown path ${path} to set to ${this.is}`);
    // }

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
  __parseAnnotations: function __parseAnnotations() {
    this.__templateChildNodes = [].concat(_toConsumableArray(this.__templateFragment.childNodes));

    var len = this.__templateChildNodes.length;

    for (var i = 0; i < len; i++) {
      var node = this.__templateChildNodes[i];

      switch (node.nodeType) {
        case window.Node.ELEMENT_NODE:
          this.__parseElementAnnotations(node);
          break;
        case window.Node.TEXT_NODE:
          this.__parseTextAnnotations(node);
          break;
      }
    }
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
    var expr = _expr2.default.getFn(attrValue, [], true);

    this.on(eventName, element, function (evt) {
      expr.invoke(context, { evt: evt });
    });
  },
  __parseAttributeAnnotations: function __parseAttributeAnnotations(element) {
    // clone attributes to array first then foreach because we will remove
    // attribute later if already processed
    // this hack to make sure when attribute removed the attributes index doesnt shift.
    var annotated = false;

    var len = element.attributes.length;

    for (var i = 0; i < len; i++) {
      var attr = element.attributes[i];

      var attrName = attr.name;

      if (attrName.indexOf('(') === 0) {
        this.__parseEventAnnotations(element, attrName);
      } else {
        // bind property annotation
        annotated = this.__templateAnnotate(_expr2.default.get(attr.value), _accessor2.default.get(element, attrName)) || annotated;
      }
    }

    return annotated;
  },
  __parseElementAnnotations: function __parseElementAnnotations(element) {
    var _this2 = this;

    var annotated = false;

    var scoped = element.__templateModel;

    if (scoped) {
      return annotated;
    }

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
        annotated = _this2.__parseNodeAnnotations(node) || annotated;
      });
    });

    return annotated;
  },
  __parseNodeAnnotations: function __parseNodeAnnotations(node) {
    switch (node.nodeType) {
      case window.Node.TEXT_NODE:
        return this.__parseTextAnnotations(node);
      case window.Node.ELEMENT_NODE:
        return this.__parseElementAnnotations(node);
    }
  },
  __parseTextAnnotations: function __parseTextAnnotations(node) {
    var expr = _expr2.default.get(node.textContent);
    var accessor = _accessor2.default.get(node);
    return this.__templateAnnotate(expr, accessor);
  },
  __templateAnnotate: function __templateAnnotate(expr, accessor) {
    var _this3 = this;

    if (expr.type === 's') {
      return false;
    }

    if (expr.constant) {
      var val = expr.invoke(this);
      accessor.set(val);
      return false;
    }

    // annotate every paths
    var annotation = new _annotation2.default(this, expr, accessor);

    if (expr.type === 'm') {
      this.__templateGetBinding(expr.fn.name).annotations.push(annotation);
    }

    expr.vpaths.forEach(function (arg) {
      return _this3.__templateGetBinding(arg.name).annotations.push(annotation);
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
        bindings[segment] = new _binding2.default(this, segment);
      }

      binding = bindings[segment];
    }

    return binding;
  }
};

T.Filter = _filter2.default;
T.Accessor = _accessor2.default;
T.Token = _token2.default;
T.Expr = _expr2.default;
T.Event = _event2.default;
T.Css = _css2.default;
T.deserialize = _serializer.deserialize;

window.T = T;

exports.default = T;

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.oCancelRequestAnimationFrame || window.oCancelAnimationFrame || window.msCancelRequestAnimationFrame || window.msCancelAnimationFrame;

var id = 0;
function nextId() {
  return id++;
}

var Async = function () {
  _createClass(Async, null, [{
    key: 'nextFrame',
    value: function nextFrame(callback) {
      return requestAnimationFrame(callback);
      // requestAnimationFrame(() => {
      // });
    }
  }, {
    key: 'run',
    value: function run(context, callback, wait) {
      var asyncO = new Async(context);
      asyncO.start(callback, wait);
      return asyncO;
    }
  }]);

  function Async(context) {
    _classCallCheck(this, Async);

    this.id = nextId();
    this.context = context;
    this.handle = null;
    this.frameHandle = null;
    this.cleared = true;
  }

  _createClass(Async, [{
    key: 'start',
    value: function start(callback, wait) {
      if (typeof callback !== 'function') {
        throw new Error('Async should specify function');
      }

      if (!this.cleared) {
        throw new Error('Async already run');
      }

      this.cleared = false;

      wait = wait || 0;

      var self = this;
      var context = this.context;
      var boundCallback = function boundCallback() {
        self.frameHandle = requestAnimationFrame(function () {
          self.__clear();
          callback.call(context);
        });
      };

      if (wait) {
        this.handle = setTimeout(boundCallback, wait);
      } else {
        boundCallback();
      }
    }
  }, {
    key: '__clear',
    value: function __clear() {
      this.cleared = true;

      cancelAnimationFrame(~~this.frameHandle);
      clearTimeout(~~this.handle);
      this.handle = this.frameHandle = null;
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.__clear();
    }
  }]);

  return Async;
}();

;

exports.default = Async;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports) {

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
	if(typeof DEBUG !== "undefined" && DEBUG) {
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


/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = Filter;

/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CACHE = new Map();

var Token = function () {
  _createClass(Token, null, [{
    key: 'get',
    value: function get(name) {
      if (CACHE.has(name)) {
        return CACHE.get(name);
      }

      var token = new Token(name);
      CACHE.set(name, token);
      return token;
    }
  }, {
    key: 'CACHE',
    get: function get() {
      return CACHE;
    }
  }]);

  function Token(name) {
    _classCallCheck(this, Token);

    this.name = name;
    this._value = null;
    this.type = 'v';

    if (!this.name.match(/^[a-zA-Z_]/)) {
      try {
        this._value = JSON.parse(this.name);
        this.type = 's';
      } catch (err) {}
    }
  }

  _createClass(Token, [{
    key: 'value',
    value: function value(context, others) {
      context = context || window;

      if (this.type === 's') {
        return this._value;
      }

      var val = valueOf(context, this.name);
      if (typeof val !== 'undefined') {
        return val;
      }

      val = valueOf(others, this.name);
      if (typeof val !== 'undefined') {
        return val;
      }

      return;
    }
  }]);

  return Token;
}();

function valueOf(context, key) {
  if (context) {
    return typeof context.get === 'function' ? context.get(key) : context[key];
  }
}

exports.default = Token;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _async = __webpack_require__(2);

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
      var _this = this;

      if (this.immediate) {
        throw new Error('Unimplemented yet!');
      }

      this.running = true;
      this.async = new _async2.default(this.context);
      this.async.start(function () {
        callback.call(_this.context);
        _this.running = false;
        _this.async = null;
      }, wait);
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

exports.default = Debounce;

/***/ },
/* 8 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function v(value) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return typeof value === 'function' ? value.apply(undefined, args) : value;
}

function mix() {
  for (var _len2 = arguments.length, objects = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    objects[_key2] = arguments[_key2];
  }

  return objects.reduce(function (result, o) {
    for (var i in o) {
      result[i] = o[i];
    }
  }, {});
}

exports.default = { v: v, mix: mix };

/***/ },
/* 9 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var REPOSITORY = {};

function get(id) {
  if (!isNaN(id)) {
    return REPOSITORY[id];
  }

  if (REPOSITORY[id]) {
    return REPOSITORY[id];
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
  REPOSITORY[id] = value;
}

exports.get = get;
exports.put = put;

/***/ },
/* 10 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var setup = new Map();

setup.load = function (obj) {
  for (var i in obj) {
    setup.set(i, obj[i]);
  }
};

exports.default = setup;

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseAccessor = function () {
  _createClass(BaseAccessor, null, [{
    key: 'get',
    value: function get(node, name) {
      if (node && 'nodeType' in node) {
        switch (node.nodeType) {
          case window.Node.ELEMENT_NODE:
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
          case window.Node.TEXT_NODE:
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
  }]);

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
      if (document.activeElement !== this.node) {
        _get(ValueAccessor.prototype.__proto__ || Object.getPrototypeOf(ValueAccessor.prototype), 'set', this).call(this, typeof value === 'undefined' ? '' : value);
      }
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

exports.default = BaseAccessor;

/***/ },
/* 15 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
        // FIXME implement composite annotation
        this.accessor.set(this.expr.invoke(this.model));
      } else {
        this.expr.invoke(this.model);
      }
    }
  }]);

  return Annotation;
}();

exports.default = Annotation;

/***/ },
/* 16 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    key: "walkEffect",
    value: function walkEffect(value) {
      var _this = this;

      this.annotations.forEach(function (annotation) {
        // try {
        annotation.effect(value /* , this.model */);
        // } catch (err) {
        //   console.error(`Error caught while walk effect annotation: ${annotation.expr ? annotation.expr.value : '#unknown'}\n ${err.stack}`);
        // }
      });

      Object.keys(this.paths).forEach(function (i) {
        _this.paths[i].walkEffect(value ? value[i] : undefined);
      });
    }
  }]);

  return Binding;
}();

exports.default = Binding;

/***/ },
/* 17 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function camelize(str) {
  return str.replace(/-\D/g, function (match) {
    return match.charAt(1).toUpperCase();
  });
}

// function hyphenate (str) {
//   return str.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
// }

var setters = {};

function setter(key) {
  if ('key' in setters) {
    return setters[key];
  }

  var fn = setters[key] = function (element, value) {
    element.style[camelize(key)] = value;
  };
  return fn;
}

function set(element, key, value) {
  setter(key)(element, value);
}

function Css(element) {
  if (this instanceof Css === false) {
    return new Css(element);
  }

  this.element = element;
}

Css.prototype.set = function (key, value) {
  if (typeof key === 'string') {
    set(this.element, key, value);
  } else {
    for (var k in key) {
      set(this.element, k, key[k]);
    }
  }

  return this;
};

exports.default = Css;

// -webkit-backface-visibility: hidden;
// backface-visibility: hidden;
// will-change: transform, -webkit-transform;
// -webkit-transition: -webkit-transform 3s;
// transition: transform 3s;
// this.element.style.webkitTransform = 'translateX(100%)';
// this.element.style.transform = 'translateX(100%)';

/***/ },
/* 18 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _matcher = void 0;
var _level = 0;
var _id = 0;
var _handlers = {};
var _delegatorInstances = {};

function _addEvent(delegator, type, callback) {
  // blur and focus do not bubble up but if you use event capturing
  // then you will get them
  var useCapture = type === 'blur' || type === 'focus';
  delegator.element.addEventListener(type, callback, useCapture);
}

function _cancel(e) {
  e.preventDefault();
  e.stopPropagation();
}

/**
 * returns function to use for determining if an element
 * matches a query selector
 *
 * @returns {Function}
 */
function _getMatcher(element) {
  if (_matcher) {
    return _matcher;
  }

  if (element.matches) {
    _matcher = element.matches;
    return _matcher;
  }

  if (element.webkitMatchesSelector) {
    _matcher = element.webkitMatchesSelector;
    return _matcher;
  }

  if (element.mozMatchesSelector) {
    _matcher = element.mozMatchesSelector;
    return _matcher;
  }

  if (element.msMatchesSelector) {
    _matcher = element.msMatchesSelector;
    return _matcher;
  }

  if (element.oMatchesSelector) {
    _matcher = element.oMatchesSelector;
    return _matcher;
  }

  // if it doesn't match a native browser method
  // fall back to the delegator function
  _matcher = EventDelegator.matchesSelector;
  return _matcher;
}

/**
 * determines if the specified element matches a given selector
 *
 * @param {Node} element - the element to compare against the selector
 * @param {string} selector
 * @param {Node} boundElement - the element the listener was attached to
 * @returns {void|Node}
 */
function _matchesSelector(element, selector, boundElement) {
  // no selector means this event was bound directly to this element
  if (selector === '_root') {
    return boundElement;
  }

  // if we have moved up to the element you bound the event to
  // then we have come too far
  if (element === boundElement) {
    return;
  }

  // if this is a match then we are done!
  if (_getMatcher(element).call(element, selector)) {
    return element;
  }

  // if this element did not match but has a parent we should try
  // going up the tree to see if any of the parent elements match
  // for example if you are looking for a click on an <a> tag but there
  // is a <span> inside of the a tag that it is the target,
  // it should still work
  if (element.parentNode) {
    _level++;
    return _matchesSelector(element.parentNode, selector, boundElement);
  }
}

function _addHandler(delegator, event, selector, callback) {
  if (!_handlers[delegator.id]) {
    _handlers[delegator.id] = {};
  }

  if (!_handlers[delegator.id][event]) {
    _handlers[delegator.id][event] = {};
  }

  if (!_handlers[delegator.id][event][selector]) {
    _handlers[delegator.id][event][selector] = [];
  }

  _handlers[delegator.id][event][selector].push(callback);
}

function _removeHandler(delegator, event, selector, callback) {
  // if there are no events tied to this element at all
  // then don't do anything
  if (!_handlers[delegator.id]) {
    return;
  }

  // if there is no event type specified then remove all events
  // example: EventDelegator(element).off()
  if (!event) {
    for (var type in _handlers[delegator.id]) {
      if (_handlers[delegator.id].hasOwnProperty(type)) {
        _handlers[delegator.id][type] = {};
      }
    }
    return;
  }

  // if no callback or selector is specified remove all events of this type
  // example: EventDelegator(element).off('click')
  if (!callback && !selector) {
    _handlers[delegator.id][event] = {};
    return;
  }

  // if a selector is specified but no callback remove all events
  // for this selector
  // example: EventDelegator(element).off('click', '.sub-element')
  if (!callback) {
    delete _handlers[delegator.id][event][selector];
    return;
  }

  // if we have specified an event type, selector, and callback then we
  // need to make sure there are callbacks tied to this selector to
  // begin with.  if there aren't then we can stop here
  if (!_handlers[delegator.id][event][selector]) {
    return;
  }

  // if there are then loop through all the callbacks and if we find
  // one that matches remove it from the array
  for (var i = 0; i < _handlers[delegator.id][event][selector].length; i++) {
    if (_handlers[delegator.id][event][selector][i] === callback) {
      _handlers[delegator.id][event][selector].splice(i, 1);
      break;
    }
  }
}

function _handleEvent(id, e, type) {
  if (!_handlers[id][type]) {
    return;
  }

  var target = e.target || e.srcElement;
  var selector = void 0;
  var match = void 0;
  var matches = {};
  var i = 0;
  var j = 0;

  // find all events that match
  _level = 0;
  for (selector in _handlers[id][type]) {
    if (_handlers[id][type].hasOwnProperty(selector)) {
      match = _matchesSelector(target, selector, _delegatorInstances[id].element);

      if (match && EventDelegator.matchesEvent(type, _delegatorInstances[id].element, match, selector === '_root', e)) {
        _level++;
        _handlers[id][type][selector].match = match;
        matches[_level] = _handlers[id][type][selector];
      }
    }
  }

  // stopPropagation() fails to set cancelBubble to true in Webkit
  // @see http://code.google.com/p/chromium/issues/detail?id=162270
  e.stopPropagation = function () {
    e.cancelBubble = true;
  };

  for (i = 0; i <= _level; i++) {
    if (matches[i]) {
      for (j = 0; j < matches[i].length; j++) {
        if (matches[i][j].call(matches[i].match, e) === false) {
          EventDelegator.cancel(e);
          return;
        }

        if (e.cancelBubble) {
          return;
        }
      }
    }
  }
}

var id = 0;
function nextId() {
  return id++;
}

var aliases = new Map();
var aliasesDefaultTranslator = function aliasesDefaultTranslator(name) {
  return [name];
};
var aliasesTranslators = {
  transitionend: function transitionend(name) {
    var el = document.createElement('fakeelement');
    var transitions = {
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd',
      'transition': 'transitionend'
    };

    for (var t in transitions) {
      if (el.style[t] !== undefined) {
        return [transitions[t]];
      }
    }
  }
};

function _aliases(name) {
  var theAliases = void 0;
  if (aliases.has(name)) {
    theAliases = aliases.get(name);
  } else {
    var translator = aliasesTranslators[name] || aliasesDefaultTranslator;
    theAliases = translator(name);
    aliases.set(name, theAliases);
  }

  return theAliases;
}

/**
 * binds the specified events to the element
 *
 * @param {string|Array} events
 * @param {string} selector
 * @param {Function} callback
 * @param {boolean=} remove
 * @returns {Object}
 */
function _bind(events, selector, callback, remove) {
  var _this = this;

  // fail silently if you pass null or undefined as an alement
  // in the EventDelegator constructor
  if (!this.element) {
    return;
  }

  if (!(events instanceof Array)) {
    events = [events];
  }

  if (!callback && typeof selector === 'function') {
    callback = selector;
    selector = '_root';
  }

  if (selector instanceof window.HTMLElement) {
    var _id2 = void 0;
    if (selector.hasAttribute('bind-event-id')) {
      _id2 = selector.getAttribute('bind-event-id');
    } else {
      _id2 = nextId();
      selector.setAttribute('bind-event-id', _id2);
    }
    selector = '[bind-event-id="' + _id2 + '"]';
  }

  var id = this.id;
  var i = void 0;

  function _getGlobalCallback(type) {
    return function (e) {
      _handleEvent(id, e, type);
    };
  }

  for (i = 0; i < events.length; i++) {
    _aliases(events[i]).forEach(function (alias) {
      // console.info('> ' + events[i] + ':' + alias);
      if (remove) {
        _removeHandler(_this, alias, selector, callback);
        return;
      }

      if (!_handlers[id] || !_handlers[id][alias]) {
        EventDelegator.addEvent(_this, alias, _getGlobalCallback(alias));
      }

      _addHandler(_this, alias, selector, callback);
    });
  }

  return this;
}

/**
 * EventDelegator object constructor
 *
 * @param {Node} element
 */
function EventDelegator(element, id) {
  // called as function
  if (!(this instanceof EventDelegator)) {
    // only keep one EventDelegator instance per node to make sure that
    // we don't create a ton of new objects if you want to delegate
    // multiple events from the same node
    //
    // for example: EventDelegator(document).on(...
    for (var key in _delegatorInstances) {
      if (_delegatorInstances[key].element === element) {
        return _delegatorInstances[key];
      }
    }

    _id++;
    _delegatorInstances[_id] = new EventDelegator(element, _id);

    return _delegatorInstances[_id];
  }

  this.element = element;
  this.id = id;
}

/**
 * adds an event
 *
 * @param {string|Array} events
 * @param {string} selector
 * @param {Function} callback
 * @returns {Object}
 */
EventDelegator.prototype.on = function (events, selector, callback) {
  return _bind.call(this, events, selector, callback);
};

/**
 * removes an event
 *
 * @param {string|Array} events
 * @param {string} selector
 * @param {Function} callback
 * @returns {Object}
 */
EventDelegator.prototype.off = function (events, selector, callback) {
  return _bind.call(this, events, selector, callback, true);
};

EventDelegator.prototype.once = function (events, selector, callback) {
  var _this2 = this;

  if (!callback && typeof selector === 'function') {
    callback = selector;
    selector = '_root';
  }

  var proxyCallback = function proxyCallback() {
    _this2.off(events, selector, proxyCallback);
    return callback.apply(undefined, arguments);
  };

  return this.on(events, selector, proxyCallback);
};

EventDelegator.prototype.fire = function (type, detail, options) {
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

  this.element.dispatchEvent(evt);

  return evt;
};

EventDelegator.matchesSelector = function () {};
EventDelegator.cancel = _cancel;
EventDelegator.addEvent = _addEvent;
EventDelegator.aliases = _aliases;
EventDelegator.matchesEvent = function () {
  return true;
};

exports.default = EventDelegator;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _token = __webpack_require__(6);

var _token2 = _interopRequireDefault(_token);

var _filter = __webpack_require__(5);

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CACHE = {
  's': {
    '[': new Map(),
    '{': new Map()
  },
  'v': {
    '[': new Map(),
    '{': new Map()
  }
};

function _get(value, mode, type) {
  var cache = CACHE[type][mode];
  if (cache.has(value)) {
    return cache.get(value);
  }

  var expr = new Expr(value, mode, type);
  if (type !== 's') {
    cache.set(value, expr);
  }

  return expr;
}

var Expr = function () {
  _createClass(Expr, null, [{
    key: 'get',
    value: function get(value, unwrapped) {
      value = (value || '').trim();

      if (unwrapped) {
        return _get(value, '[', 'v');
      }

      var mode = value[0];
      if ((mode === '[' || mode === '{') && value[1] === mode) {
        value = value.slice(2, -2).trim();
        return _get(value, mode, 'v');
      }

      return _get(value, '[', 's');
    }
  }, {
    key: 'getFn',
    value: function getFn(value, args, unwrapped) {
      return Expr.get(value.indexOf('(') === -1 ? value + '(' + args.join(', ') + ')' : value, unwrapped);
    }
  }, {
    key: 'rawTokenize',
    value: function rawTokenize(str) {
      var count = 0;
      var tokens = [];

      while (str && count++ < 10) {
        var matches = str.match(/^\s*("[^"]*"|[^,]+),?/);

        str = str.substr(matches[0].length);
        tokens.push(matches[1].trim());
      }

      return tokens;
    }
  }, {
    key: 'tokenize',
    value: function tokenize(str) {
      return Expr.rawTokenize(str).map(function (token) {
        return _token2.default.get(token);
      });
    }
  }, {
    key: 'CACHE',
    get: function get() {
      return CACHE;
    }
  }]);

  function Expr(value, mode, type) {
    _classCallCheck(this, Expr);

    // define base properties
    this.mode = mode;
    this.type = type;
    this.name = '';
    this.args = [];
    this.filters = [];
    this.value = value;

    if (type === 's') {
      return;
    }

    var tokens = value.split('|');
    var token = tokens[0].trim();

    this.filters = tokens.slice(1).map(function (word) {
      return _filter2.default.get(word.trim());
    });

    if (token.indexOf('(') < 0) {
      this.type = 'p';
      this.name = token;
      this.args.push(_token2.default.get(token));
    } else {
      // force mode to '[' when type is !p
      this.mode = '[';
      this.type = 'm';

      var matches = token.match(/([^(]+)\(([^)]*)\)/);

      this.name = matches[1].trim();
      this.fn = _token2.default.get(this.name);

      this.args = Expr.tokenize(matches[2]);
    }
  }

  _createClass(Expr, [{
    key: 'invoke',
    value: function invoke(context, otherArgs) {
      if (this.type === 'p') {
        var val = this.args[0].value(context, otherArgs);
        return this.filters.reduce(function (val, filter) {
          return filter.invoke(val);
        }, val);
      }

      var fn = this.fn.value(context, context.__templateHost);
      if (typeof fn !== 'function') {
        throw new Error('Method is not eligible, ' + (context.__templateHost.nodeName || '$anonymous') + '#' + this.name);
      }

      var args = this.args.map(function (arg) {
        return arg.value(context, otherArgs);
      });

      return fn.apply(context, args);
    }
  }, {
    key: 'constant',
    get: function get() {
      return this.type !== 'm' && this.vpaths.length !== this.args.length;
    }
  }, {
    key: 'vpaths',
    get: function get() {
      var _this = this;

      if (!this._vpaths) {
        (function () {
          var paths = [];
          _this.args.forEach(function (arg) {
            if (arg.type === 'v' && paths.indexOf(arg.name) === -1) {
              paths.push(arg);
            }
          });
          _this._vpaths = paths;
        })();
      }

      return this._vpaths;
    }
  }]);

  return Expr;
}();

exports.default = Expr;

/***/ },
/* 20 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function serialize(value) {
  switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
    case 'boolean':
      return value ? '' : undefined;

    case 'object':
      if (value instanceof Date) {
        return value;
      } else if (value instanceof RegExp) {
        return value.toString().slice(1, -1);
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

    case RegExp:
      value = new RegExp(value);
      break;

    case Function:
      value = new Function(value); // eslint-disable-line
      break;

    // behave like default for now
    // case String:
    default:
      break;
  }
  return value;
}

exports.serialize = serialize;
exports.deserialize = deserialize;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.define = exports.base = exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateBinding = __webpack_require__(1);

var _templateBinding2 = _interopRequireDefault(_templateBinding);

var _repository = __webpack_require__(9);

var _object = __webpack_require__(8);

var _object2 = _interopRequireDefault(_object);

var _inflector = __webpack_require__(23);

var _async = __webpack_require__(2);

var _async2 = _interopRequireDefault(_async);

var _debounce = __webpack_require__(7);

var _debounce2 = _interopRequireDefault(_debounce);

var _setup = __webpack_require__(10);

var _setup2 = _interopRequireDefault(_setup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

      var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this));

      _this.is = _this.nodeName.toLowerCase();

      _this.createdCallback();
      return _this;
    }

    _createClass(Component, [{
      key: 'created',
      value: function created() {}
    }, {
      key: 'ready',
      value: function ready() {}
    }, {
      key: 'attached',
      value: function attached() {}
    }, {
      key: 'detached',
      value: function detached() {}
    }, {
      key: 'createdCallback',
      value: function createdCallback() {
        if (_setup2.default.get('debug')) console.info('CREATED ' + this.is);

        this.__id = nextId();
        (0, _repository.put)(this.__id, this);
        this.setAttribute('xin-id', this.__id);

        this.created();

        this.__initData();

        this.__initTemplate();

        this.__initProps();

        this.__initListeners();

        this.async(this.readyCallback);
      }
    }, {
      key: 'readyCallback',
      value: function readyCallback() {
        var _this2 = this;

        this.__componentReady = true;

        if (_setup2.default.get('debug')) console.info('READY ' + this.is);

        var contentFragment = void 0;

        if (this.__template) {
          contentFragment = document.createDocumentFragment();
          [].slice.call(this.childNodes).forEach(function (node) {
            if (node === _this2.__templateMarker) return;
            contentFragment.appendChild(node);
          });
        }

        this.__templateRender(contentFragment);

        this.ready();

        if (this.__componentAttaching) {
          this.attachedCallback();
        }
      }
    }, {
      key: 'attachedCallback',
      value: function attachedCallback() {
        this.__componentAttaching = true;

        if (!this.__componentReady) {
          return;
        }

        if (_setup2.default.get('debug')) console.info('ATTACHED ' + this.is + ' ' + (this.__componentAttaching ? '(delayed)' : ''));

        this.attached();

        this.__componentAttaching = false;
      }
    }, {
      key: 'detachedCallback',
      value: function detachedCallback() {
        this.detached();
      }
    }, {
      key: 'connectedCallback',
      value: function connectedCallback() {
        return this.attachedCallback();
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        return this.detachedCallback();
      }
    }, {
      key: '__initData',
      value: function __initData() {
        this.__componentContent = [];
        this.__componentDebouncers = {};
        this.__componentNotifiers = {};
        this.__componentReady = false;
        this.__componentAttaching = false;
      }
    }, {
      key: '__initProps',
      value: function __initProps() {
        for (var propName in this.props) {
          // exclude prototype properties
          // if (!Object.prototype.hasOwnProperty.call(this.props, propName)) {
          //   continue;
          // }

          var property = this.props[propName];
          var attrName = (0, _inflector.dashify)(propName);

          var propValue = void 0;

          if ('computed' in property) {
            var accessor = _templateBinding2.default.Accessor.get(this, propName);
            var expr = _templateBinding2.default.Expr.getFn(property.computed, [], true);
            this.__templateAnnotate(expr, accessor);

            // compute value of computed prop
            propValue = expr.invoke(this);
          } else if (this.hasAttribute(attrName)) {
            var attrVal = this.getAttribute(attrName);

            // copy value from attribute to property
            // fallback to property.value
            var _expr = _templateBinding2.default.Expr.get(attrVal);
            if (_expr.type === 's') {
              propValue = _templateBinding2.default.deserialize(attrVal, property.type);
            }
          } else if ('value' in property) {
            propValue = _object2.default.v(property.value);
          }

          // when property is undefined, log error when property is required otherwise assign to default value
          if (property.required && propValue === undefined /* (propValue === undefined || propValue === null) */) {
              throw new Error(this.is + ':' + this.__id + ' missing required ' + propName);
            }

          if ('observer' in property) {
            var _expr2 = _templateBinding2.default.Expr.getFn(property.observer, [propName], true);
            this.__templateAnnotate(_expr2);
          }

          if ('notify' in property) {
            this.__templateGetBinding(propName).annotations.push(new NotifyAnnotation(this, propName));
          }

          // set and force notify for the first time
          this[propName] = propValue;
          this.notify(propName, propValue);
        }
      }
    }, {
      key: '__initTemplate',
      value: function __initTemplate() {
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

        this.__templateInitialize(template, this);
      }
    }, {
      key: '__initListeners',
      value: function __initListeners() {
        var _this3 = this;

        if (!this.listeners) {
          return;
        }

        Object.keys(this.listeners).forEach(function (key) {
          var meta = parseListenerMetadata(key);
          var expr = _templateBinding2.default.Expr.getFn(_this3.listeners[key], [], true);
          if (meta.selector) {
            _this3.on(meta.eventName, meta.selector, function (evt) {
              expr.invoke(_this3, { evt: evt });
            });
          } else {
            _this3.on(meta.eventName, function (evt) {
              expr.invoke(_this3, { evt: evt });
            });
          }
        });
      }
    }, {
      key: '__addNotifier',
      value: function __addNotifier(eventName) {
        var _this4 = this;

        if (this.__componentNotifiers[eventName]) {
          return;
        }

        this.__componentNotifiers[eventName] = function (evt) {
          var element = evt.target;

          if (element.__templateModel !== _this4) {
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
    }, {
      key: '__removeNotifier',
      value: function __removeNotifier(eventName) {
        if (!this.__componentNotifiers[eventName]) {
          return;
        }

        this.off(eventName, this.__componentNotifiers[eventName]);
        this.__componentNotifiers[eventName] = null;
      }
    }, {
      key: 'fire',
      value: function fire(type, detail, options) {
        return _templateBinding2.default.Event(this).fire(type, detail, options);
      }
    }, {
      key: 'async',
      value: function async(callback, waitTime) {
        return _async2.default.run(this, callback, waitTime);
      }
    }, {
      key: 'debounce',
      value: function debounce(job, callback, wait, immediate) {
        var debouncer = this.__componentDebouncers[job];
        if (debouncer && debouncer.running) {
          debouncer.cancel();
        } else {
          debouncer = this.__componentDebouncers[job] = new _debounce2.default(this, immediate);
        }
        debouncer.start(callback, wait);

        return debouncer;
      }

      // T overriden
      // -------------------------------------------------------------------------
      //

    }, {
      key: '__templateAnnotate',
      value: function __templateAnnotate(expr, accessor) {
        if (!_templateBinding2.default.prototype.__templateAnnotate.call(this, expr, accessor)) {
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
    }, {
      key: '$',
      get: function get() {
        return this.__templateHost.getElementsByTagName('*');
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
    }]);

    return Component;
  }(window[base]);

  var tproto = _templateBinding2.default.prototype;
  for (var key in tproto) {
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
  key = key.trim();

  var splitted = key.split(' ');
  var metadata = {
    key: key,
    eventName: splitted[0],
    selector: splitted[1] ? splitted.slice(1).join(' ') : null
  };

  return metadata;
}

function useCustomElements() {
  if ('value' in useCustomElements === false) {
    var customElementsVersion = _setup2.default.get('customElements.version');
    useCustomElements.value = customElementsVersion === 'v1' || (!customElementsVersion || customElementsVersion === 'auto') && 'customElements' in window;

    // console.log('Use customElements = ' + useCustomElements.value);
  }

  return useCustomElements.value;
}

function define(name, Component, options) {
  if (useCustomElements()) {
    window.customElements.define(name, Component, options);
    return Component;
  }

  var ElementPrototype = {
    prototype: Object.create(Component.prototype, { is: { value: name } }),
    extends: options && options.extends ? options.extends : undefined
  };

  var ElementClass = document.registerElement(name, ElementPrototype);

  (0, _repository.put)(name, ElementClass);

  return ElementClass;
}

var Component = base('HTMLElement');

exports.Component = Component;
exports.base = base;
exports.define = define;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateBinding = __webpack_require__(1);

var _templateBinding2 = _interopRequireDefault(_templateBinding);

var _async = __webpack_require__(2);

var _async2 = _interopRequireDefault(_async);

__webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Fx = function () {
  _createClass(Fx, null, [{
    key: 'add',
    value: function add(name, transition) {
      adapters[name] = transition;
    }
  }, {
    key: 'get',
    value: function get(name) {
      return adapters[name] || adapters.none;
    }
  }]);

  function Fx(element, transition) {
    _classCallCheck(this, Fx);

    this.element = element;
    this.duration = 0;
    this.transition = transition || element.transition || 'none';
    this.running = false;
    this.method = 'in';
    this.direction = 0;

    this.adapter = Fx.get(this.transition);
  }

  _createClass(Fx, [{
    key: 'play',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(method, direction) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.running = true;
                this.method = method;
                this.direction = direction;

                _context.next = 5;
                return this.adapter.play(this);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function play(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return play;
    }()
  }, {
    key: 'stop',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.adapter.stop(this);

              case 2:

                this.running = false;
                this.method = 'in';
                this.direction = 0;

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function stop() {
        return _ref2.apply(this, arguments);
      }

      return stop;
    }()
  }]);

  return Fx;
}();

var adapters = {
  'none': {
    play: function play() {
      var _this = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }))();
    },
    stop: function stop() {
      var _this2 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this2);
      }))();
    }
  },
  'slide': {
    play: function play(fx) {
      return new Promise(function (resolve) {
        _templateBinding2.default.Event(fx.element).once('transitionend', function () {
          fx.element.classList.remove('trans-slide__animate');
          resolve();
        });
        fx.element.classList.add('trans-slide__' + fx.method + '-' + (fx.direction > 0 ? 'left' : 'right'));

        _async2.default.nextFrame(function () {
          fx.element.classList.add('trans-slide__animate');
          _async2.default.nextFrame(function () {
            return fx.element.classList.add('trans-slide__' + fx.method);
          });
        });
      });
    },
    stop: function stop(fx) {
      return new Promise(function (resolve) {
        _async2.default.nextFrame(function () {
          fx.element.classList.remove('trans-slide__' + fx.method + '-' + (fx.direction > 0 ? 'left' : 'right'));
          fx.element.classList.remove('trans-slide__' + fx.method);
          resolve();
        });
      });
    }
  }
};

exports.default = Fx;

/***/ },
/* 23 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.camelize = camelize;
exports.dashify = dashify;

/***/ },
/* 24 */,
/* 25 */,
/* 26 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)();
// imports


// module
exports.push([module.i, ".trans-slide__in-left {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n  display: block!important;\n}\n\n.trans-slide__in-right {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n  display: block!important;\n}\n\n.trans-slide__out-left,\n.trans-slide__out-right {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n  display: block!important;\n}\n\n.trans-slide__animate {\n  will-change: transform, -webkit-transform;\n  -webkit-transition: -webkit-transform .3s;\n  transition: transform .3s;\n}\n\n.trans-slide__out {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n}\n\n.trans-slide__out.trans-slide__out-left {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n}\n\n/* inherit common slide out */\n/*.trans-slide__out.trans-slide__out-right {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n}*/\n\n\n.trans-slide__in {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n}\n\n/*.trans-animated {\n  -webkit-animation-duration: 300ms;\n  animation-duration: 300ms;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}*/\n", ""]);

// exports


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
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
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }
/******/ ]);
//# sourceMappingURL=xin.js.map