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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setup__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__repository__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component__ = __webpack_require__(12);




// TODO refactor out async and debounce to another package

if (typeof window.xin === 'object') {
  __WEBPACK_IMPORTED_MODULE_0__setup__["a" /* default */].load(window.xin);
}

const xin = (id) => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__repository__["b" /* get */])(id);

xin.put = __WEBPACK_IMPORTED_MODULE_1__repository__["a" /* put */];
xin.setup = __WEBPACK_IMPORTED_MODULE_0__setup__["a" /* default */];
xin.Component = __WEBPACK_IMPORTED_MODULE_2__component__["a" /* Component */];
xin.base = __WEBPACK_IMPORTED_MODULE_2__component__["b" /* base */];
xin.define = __WEBPACK_IMPORTED_MODULE_2__component__["c" /* define */];

if (typeof window !== 'undefined') {
  window.xin = xin;
}

/* harmony default export */ exports["default"] = xin;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expr = __webpack_require__(30);

var _expr2 = _interopRequireDefault(_expr);

var _binding = __webpack_require__(27);

var _binding2 = _interopRequireDefault(_binding);

var _accessor = __webpack_require__(25);

var _accessor2 = _interopRequireDefault(_accessor);

var _annotation = __webpack_require__(26);

var _annotation2 = _interopRequireDefault(_annotation);

var _filter = __webpack_require__(10);

var _filter2 = _interopRequireDefault(_filter);

var _token = __webpack_require__(11);

var _token2 = _interopRequireDefault(_token);

var _event = __webpack_require__(29);

var _event2 = _interopRequireDefault(_event);

var _css = __webpack_require__(28);

var _css2 = _interopRequireDefault(_css);

var _serializer = __webpack_require__(31);

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
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const requestAnimationFrame = (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame
);

const cancelAnimationFrame = (
  window.cancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelRequestAnimationFrame || window.mozCancelAnimationFrame ||
  window.oCancelRequestAnimationFrame || window.oCancelAnimationFrame ||
  window.msCancelRequestAnimationFrame || window.msCancelAnimationFrame
);

let id = 0;
function nextId () {
  return id++;
}

class Async {
  static nextFrame (callback) {
    return requestAnimationFrame(callback);
    // requestAnimationFrame(() => {
    // });
  }

  static run (callback, wait) {
    return (new Async()).start(callback, wait);
  }

  constructor (context) {
    this.id = nextId();
    this.context = context || null;
    this.handle = null;
    this.frameHandle = null;
    this.cleared = true;
  }

  start (callback, wait) {
    if (typeof callback !== 'function') {
      throw new Error('Async should specify function');
    }

    if (!this.cleared) {
      throw new Error('Async already run');
    }

    this.cleared = false;

    wait = wait || 0;

    let self = this;
    let context = this.context;
    let boundCallback = function () {
      self.frameHandle = requestAnimationFrame(() => {
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

  __clear () {
    this.cleared = true;

    cancelAnimationFrame(~~this.frameHandle);
    clearTimeout(~~this.handle);
    this.handle = this.frameHandle = null;
  }

  cancel () {
    this.__clear();
  }
};

/* harmony default export */ exports["a"] = Async;


/***/ },
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return put; });
const REPOSITORY = {};

function get (id) {
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

function put (id, value) {
  REPOSITORY[id] = value;
}




/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const setup = new Map();

setup.load = obj => {
  for (let i in obj) {
    setup.set(i, obj[i]);
  }
};

/* harmony default export */ exports["a"] = setup;


/***/ },
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_template_binding__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_template_binding___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_template_binding__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_serializer__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_object_helper__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__repository__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__inflector__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__async__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__debounce__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__setup__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__notify_annotation__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return base; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return define; });










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
      if (__WEBPACK_IMPORTED_MODULE_7__setup__["a" /* default */].get('debug')) console.info(`CREATED ${this.is}`);

      this.__id = nextId();
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__repository__["a" /* put */])(this.__id, this);
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

      if (__WEBPACK_IMPORTED_MODULE_7__setup__["a" /* default */].get('debug')) console.info(`READY ${this.is}`);

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

      if (__WEBPACK_IMPORTED_MODULE_7__setup__["a" /* default */].get('debug')) console.info(`ATTACHED ${this.is} ${this.__componentAttaching ? '(delayed)' : ''}`);

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
      this.__componentNotifiedProps = [];
    }

    __initProps () {
      for (let propName in this.props) {
        // exclude prototype properties
        // if (!Object.prototype.hasOwnProperty.call(this.props, propName)) {
        //   continue;
        // }

        let property = this.props[propName];
        let attrName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__inflector__["a" /* dashify */])(propName);

        let propValue;

        if ('computed' in property) {
          let accessor = __WEBPACK_IMPORTED_MODULE_0_template_binding___default.a.Accessor.get(this, propName);
          let expr = __WEBPACK_IMPORTED_MODULE_0_template_binding___default.a.Expr.getFn(property.computed, [], true);
          this.__templateAnnotate(expr, accessor);

          // compute value of computed prop
          propValue = expr.invoke(this);
        } else if (this.hasAttribute(attrName)) {
          let attrVal = this.getAttribute(attrName);

          // copy value from attribute to property
          // fallback to property.value
          let expr = __WEBPACK_IMPORTED_MODULE_0_template_binding___default.a.Expr.get(attrVal);
          if (expr.type === 's') {
            propValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_serializer__["a" /* deserialize */])(attrVal, property.type);
          } else {
            if ('notify' in property && expr.mode === '{') {
              this.__componentNotifiedProps[propName] = true;
              this.__templateGetBinding(propName).annotations.push(new __WEBPACK_IMPORTED_MODULE_8__notify_annotation__["a" /* default */](this, propName));
            }
          }
        }

        if (propValue === undefined && 'value' in property) {
          propValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_object_helper__["a" /* val */])(property.value);
        }

        // when property is undefined, log error when property is required otherwise assign to default value
        if (property.required && propValue === undefined /* (propValue === undefined || propValue === null) */) {
          throw new Error(`${this.is}:${this.__id} missing required ${propName}`);
        }

        if ('observer' in property) {
          let expr = __WEBPACK_IMPORTED_MODULE_0_template_binding___default.a.Expr.getFn(property.observer, [ propName ], true);
          this.__templateAnnotate(expr);
        }

        // set and force notify for the first time
        this[propName] = propValue;

        // only notify if propValue already defined
        if (propValue !== undefined) {
          this.notify(propName, propValue);
        }
      }
    }

    __isNotified (name) {
      return (name in this.__componentNotifiedProps);
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
        let expr = __WEBPACK_IMPORTED_MODULE_0_template_binding___default.a.Expr.getFn(this.listeners[key], [], true);
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
            // console.log(evt.target, evt.detail);
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
      return __WEBPACK_IMPORTED_MODULE_0_template_binding___default.a.Event(this).fire(type, detail, options);
    }

    async (callback, waitTime) {
      return (new __WEBPACK_IMPORTED_MODULE_5__async__["a" /* default */](this)).start(callback, waitTime);
    }

    debounce (job, callback, wait, immediate) {
      let debouncer = this.__componentDebouncers[job];
      if (debouncer && debouncer.running) {
        debouncer.cancel();
      } else {
        debouncer = this.__componentDebouncers[job] = new __WEBPACK_IMPORTED_MODULE_6__debounce__["a" /* default */](this, immediate);
      }
      debouncer.start(callback, wait);

      return debouncer;
    }

    // T overriden
    // -------------------------------------------------------------------------
    //

    __templateAnnotate (expr, accessor) {
      if (!__WEBPACK_IMPORTED_MODULE_0_template_binding___default.a.prototype.__templateAnnotate.call(this, expr, accessor)) {
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

  let tproto = __WEBPACK_IMPORTED_MODULE_0_template_binding___default.a.prototype;
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
    let customElementsVersion = __WEBPACK_IMPORTED_MODULE_7__setup__["a" /* default */].get('customElements.version');
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

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__repository__["a" /* put */])(name, ElementClass);

  return ElementClass;
}

const Component = base('HTMLElement');




/***/ },
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__val__ = __webpack_require__(19);


/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__val__["a"]; });



/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = v;
function v (value, ...args) {
  return typeof value === 'function' ? value(...args) : value;
};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function deserialize (value, type) {
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

/* harmony default export */ exports["a"] = deserialize;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serialize__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__deserialize__ = __webpack_require__(20);



/* unused harmony reexport serialize */
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__deserialize__["a"]; });



/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function serialize (value) {
  switch (typeof value) {
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

/* unused harmony default export */ var _unused_webpack_default_export = serialize;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__async__ = __webpack_require__(5);


class Debounce {
  constructor (context, immediate) {
    this.context = context;
    this.immediate = Boolean(immediate);
    this.async = null;
    this.running = false;
  }

  start (callback, wait) {
    if (this.immediate) {
      throw new Error('Unimplemented yet!');
    }

    this.running = true;
    this.async = new __WEBPACK_IMPORTED_MODULE_0__async__["a" /* default */](this.context);
    this.async.start(() => {
      callback.call(this.context);
      this.running = false;
      this.async = null;
    }, wait);
  }

  cancel () {
    this.running = false;
    this.async.cancel();
    this.async = null;
  }
}

/* harmony default export */ exports["a"] = Debounce;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export camelize */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return dashify; });
var dashified = {};
var camelized = {};

function camelize (dash) {
  var mapped = camelized[dash];
  if (mapped) {
    return mapped;
  }
  if (dash.indexOf('-') < 0) {
    camelized[dash] = dash;
  } else {
    camelized[dash] = dash.replace(/-([a-z])/g,
      function (m) {
        return m[1].toUpperCase();
      }
    );
  }

  return camelized[dash];
}

function dashify (camel) {
  var mapped = dashified[camel];
  if (mapped) {
    return mapped;
  }
  dashified[camel] = camel.replace(/([a-z][A-Z])/g,
    function (g) {
      return g[0] + '-' + g[1].toLowerCase();
    }
  );

  return dashified[camel];
}




/***/ },
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _token = __webpack_require__(11);

var _token2 = _interopRequireDefault(_token);

var _filter = __webpack_require__(10);

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
/* 31 */
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
/* 32 */,
/* 33 */,
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_template_binding__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_template_binding___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_template_binding__);


class NotifyAnnotation {
  constructor (model, name) {
    let expr = __WEBPACK_IMPORTED_MODULE_0_template_binding___default.a.Expr.get(model.getAttribute(name));
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

/* harmony default export */ exports["a"] = NotifyAnnotation;


/***/ }
/******/ ]);
//# sourceMappingURL=xin.js.map