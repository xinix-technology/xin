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
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setup__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__repository__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component__ = __webpack_require__(15);




if (typeof window.xin === 'object') {
  __WEBPACK_IMPORTED_MODULE_0__setup__["a" /* default */].load(window.xin);
}

const xin = id => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__repository__["b" /* get */])(id);

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
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
let _matcher;
let _level = 0;
let _id = 0;
let _handlers = {};
let _delegatorInstances = {};

function _addEvent (delegator, type, callback) {
    // blur and focus do not bubble up but if you use event capturing
    // then you will get them
  let useCapture = type === 'blur' || type === 'focus';
  delegator.element.addEventListener(type, callback, useCapture);
}

function _cancel (evt) {
  evt.preventDefault();
  evt.stopPropagation();
}

/**
 * returns function to use for determining if an element
 * matches a query selector
 *
 * @returns {Function}
 */
function _getMatcher (element) {
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
  _matcher = Delegator.matchesSelector;
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
function _matchesSelector (element, selector, boundElement) {
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

function _addHandler (delegator, event, selector, callback) {
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

function _removeHandler (delegator, event, selector, callback) {
    // if there are no events tied to this element at all
    // then don't do anything
  if (!_handlers[delegator.id]) {
    return;
  }

    // if there is no event type specified then remove all events
    // example: Delegator(element).off()
  if (!event) {
    for (let type in _handlers[delegator.id]) {
      if (_handlers[delegator.id].hasOwnProperty(type)) {
        _handlers[delegator.id][type] = {};
      }
    }
    return;
  }

    // if no callback or selector is specified remove all events of this type
    // example: Delegator(element).off('click')
  if (!callback && !selector) {
    _handlers[delegator.id][event] = {};
    return;
  }

    // if a selector is specified but no callback remove all events
    // for this selector
    // example: Delegator(element).off('click', '.sub-element')
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
  for (let i = 0; i < _handlers[delegator.id][event][selector].length; i++) {
    if (_handlers[delegator.id][event][selector][i] === callback) {
      _handlers[delegator.id][event][selector].splice(i, 1);
      break;
    }
  }
}

function _handleEvent (id, e, type) {
  if (!_handlers[id][type]) {
    return;
  }

  let target = e.target || e.srcElement;
  let selector;
  let match;
  let matches = {};
  let i = 0;
  let j = 0;

    // find all events that match
  _level = 0;
  for (selector in _handlers[id][type]) {
    if (_handlers[id][type].hasOwnProperty(selector)) {
      match = _matchesSelector(target, selector, _delegatorInstances[id].element);

      if (match && Delegator.matchesEvent(type, _delegatorInstances[id].element, match, selector === '_root', e)) {
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
          Delegator.cancel(e);
          return;
        }

        if (e.cancelBubble) {
          return;
        }
      }
    }
  }
}

let id = 0;
function nextId () {
  return id++;
}

const aliases = new Map();
const aliasesDefaultTranslator = name => ([ name ]);
const aliasesTranslators = {
  transitionend (name) {
    let el = document.createElement('fakeelement');
    let transitions = {
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd',
      'transition': 'transitionend',
    };

    for (let t in transitions) {
      if (el.style[t] !== undefined) {
        return [transitions[t]];
      }
    }
  },
};

function _aliases (name) {
  let theAliases;
  if (aliases.has(name)) {
    theAliases = aliases.get(name);
  } else {
    let translator = aliasesTranslators[name] || aliasesDefaultTranslator;
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
function _bind (events, selector, callback, remove) {
    // fail silently if you pass null or undefined as an alement
    // in the Delegator constructor
  if (!this.element) {
    return;
  }

  if (!(events instanceof Array)) {
    events = [events];
  }

  if (!callback && typeof (selector) === 'function') {
    callback = selector;
    selector = '_root';
  }

  if (selector instanceof window.HTMLElement) {
    let id;
    if (selector.hasAttribute('bind-event-id')) {
      id = selector.getAttribute('bind-event-id');
    } else {
      id = nextId();
      selector.setAttribute('bind-event-id', id);
    }
    selector = `[bind-event-id="${id}"]`;
  }

  let id = this.id;
  let i;

  function _getGlobalCallback (type) {
    return function (e) {
      _handleEvent(id, e, type);
    };
  }

  for (i = 0; i < events.length; i++) {
    _aliases(events[i]).forEach(alias => {
      // console.info('> ' + events[i] + ':' + alias);
      if (remove) {
        _removeHandler(this, alias, selector, callback);
        return;
      }

      if (!_handlers[id] || !_handlers[id][alias]) {
        Delegator.addEvent(this, alias, _getGlobalCallback(alias));
      }

      _addHandler(this, alias, selector, callback);
    });
  }

  return this;
}

/**
 * Delegator object constructor
 *
 * @param {Node} element
 */
function Delegator (element, id) {
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
Delegator.prototype.on = function (events, selector, callback) {
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
Delegator.prototype.off = function (events, selector, callback) {
  return _bind.call(this, events, selector, callback, true);
};

Delegator.prototype.once = function (events, selector, callback) {
  if (!callback && typeof (selector) === 'function') {
    callback = selector;
    selector = '_root';
  }

  const proxyCallback = (...args) => {
    this.off(events, selector, proxyCallback);
    return callback(...args);
  };

  return this.on(events, selector, proxyCallback);
};

Delegator.prototype.fire = function (type, detail, options) {
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

      // XXX check if without this works on every browsers
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

  this.element.dispatchEvent(evt);

  return evt;
};

Delegator.matchesSelector = function () {};
Delegator.cancel = _cancel;
Delegator.addEvent = _addEvent;
Delegator.aliases = _aliases;
Delegator.matchesEvent = function () {
  return true;
};

function eventHelper (element) {
  // only keep one Delegator instance per node to make sure that
  // we don't create a ton of new objects if you want to delegate
  // multiple events from the same node
  //
  // for example: eventHelper(document).on(...
  for (let key in _delegatorInstances) {
    if (_delegatorInstances[key].element === element) {
      return _delegatorInstances[key];
    }
  }

  _id++;
  _delegatorInstances[_id] = new Delegator(element, _id);

  return _delegatorInstances[_id];
}

/* harmony default export */ exports["a"] = eventHelper;


/***/ },
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__token__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter__ = __webpack_require__(22);



const CACHE = {
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
  let cache = CACHE[type][mode];
  if (cache.has(value)) {
    return cache.get(value);
  }

  let expr = new Expr(value, mode, type);
  if (type !== 's') {
    cache.set(value, expr);
  }

  return expr;
}

class Expr {
  static get CACHE() {
    return CACHE;
  }

  static get(value, unwrapped) {
    value = (value || '').trim();

    if (unwrapped) {
      return _get(value, '[', 'v');
    }

    let mode = value[0];
    if ((mode === '[' || mode === '{') && value[1] === mode) {
      value = value.slice(2, -2).trim();
      return _get(value, mode, 'v');
    }

    return _get(value, '[', 's');
  }

  static getFn(value, args, unwrapped) {
    return Expr.get(value.indexOf('(') === -1 ? `${ value }(${ args.join(', ') })` : value, unwrapped);
  }

  static rawTokenize(str) {
    let count = 0;
    let tokens = [];

    while (str && count++ < 10) {
      let matches = str.match(/^\s*("[^"]*"|[^,]+),?/);

      str = str.substr(matches[0].length);
      tokens.push(matches[1].trim());
    }

    return tokens;
  }

  static tokenize(str) {
    return Expr.rawTokenize(str).map(token => __WEBPACK_IMPORTED_MODULE_0__token__["a" /* default */].get(token));
  }

  constructor(value, mode, type) {
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

    let tokens = value.split('|');
    let token = tokens[0].trim();

    this.filters = tokens.slice(1).map(word => {
      return __WEBPACK_IMPORTED_MODULE_1__filter__["a" /* default */].get(word.trim());
    });

    if (token.indexOf('(') < 0) {
      this.type = 'p';
      this.name = token;
      this.args.push(__WEBPACK_IMPORTED_MODULE_0__token__["a" /* default */].get(token));
    } else {
      // force mode to '[' when type is !p
      this.mode = '[';
      this.type = 'm';

      let matches = token.match(/([^(]+)\(([^)]*)\)/);

      this.name = matches[1].trim();
      this.fn = __WEBPACK_IMPORTED_MODULE_0__token__["a" /* default */].get(this.name);

      this.args = Expr.tokenize(matches[2]);
    }
  }

  get constant() {
    return this.type !== 'm' && this.vpaths.length !== this.args.length;
  }

  get vpaths() {
    if (!this._vpaths) {
      let paths = [];
      this.args.forEach(arg => {
        if (arg.type === 'v' && paths.indexOf(arg.name) === -1) {
          paths.push(arg);
        }
      });
      this._vpaths = paths;
    }

    return this._vpaths;
  }

  invoke(context, otherArgs) {
    if (this.type === 'p') {
      let val = this.args[0].value(context, otherArgs);
      return this.filters.reduce((val, filter) => filter.invoke(val), val);
    }

    let fn = this.fn.value(context, context.__templateHost);
    if (typeof fn !== 'function') {
      throw new Error(`Method is not eligible, ${ context.__templateHost.nodeName || '$anonymous' }#${ this.name }`);
    }

    let args = this.args.map(arg => {
      return arg.value(context, otherArgs);
    });

    return fn.apply(context, args);
  }
}

/* harmony default export */ exports["a"] = Expr;

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__async__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__debounce__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__async__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__debounce__["a"]; });




/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_helper__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__expr__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__binding__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__accessor__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__annotation__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers_template__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helpers_slot__ = __webpack_require__(23);










// new version will not export filter token and css modules
// import Filter from './filter';
// import Token from './token';
// import Css from './css';

let templateId = 0;
function nextId() {
  return templateId++;
}

function T(template, host, marker) {
  this.__templateInitialize(template, host, marker);
  this.__templateRender();
}

T.prototype = {
  get $() {
    return this.__templateHost.getElementsByTagName('*');
  },

  $$(selector) {
    return this.querySelector(selector);
  },

  on() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_event_helper__["a" /* default */])(this.__templateHost).on(...arguments);
  },

  off() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_event_helper__["a" /* default */])(this.__templateHost).off(...arguments);
  },

  once() {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_event_helper__["a" /* default */])(this.__templateHost).once(...arguments);
  },

  all(obj) {
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        this.set(i, obj[i]);
      }
    }
  },

  get(path) {
    let object = this;

    this.__templateGetPathAsArray(path).some(segment => {
      if (object === undefined || object === null) {
        object = undefined;
        return true;
      }

      object = object[segment];
      return false;
    });

    return object;
  },

  set(path, value) {
    path = this.__templateGetPathAsArray(path);

    let oldValue = this.get(path);

    if (value === oldValue) {
      return;
    }

    let object = this;

    path.slice(0, -1).forEach(segment => {
      if (!object) {
        return;
      }
      if (object[segment] === undefined || object[segment] === null) {
        object[segment] = {};
      }

      object = object[segment];
    });

    let property = path.slice(-1).pop();

    object[property] = value;

    this.notify(path, value);
  },

  push(path, ...values) {
    path = this.__templateGetPathAsArray(path);

    let object = this;

    path.slice(0, -1).forEach(segment => {
      if (!object) {
        return;
      }
      if (object[segment] === undefined || object[segment] === null) {
        object[segment] = {};
      }

      object = object[segment];
    });

    let property = path.slice(-1).pop();

    let result = object[property].push(...values);

    this.notify(path, object[property]);

    return result;
  },

  pop(path) {
    path = this.__templateGetPathAsArray(path);

    let object = this;

    path.slice(0, -1).forEach(segment => {
      if (!object) {
        return;
      }
      if (object[segment] === undefined || object[segment] === null) {
        object[segment] = {};
      }

      object = object[segment];
    });

    let property = path.slice(-1).pop();

    let result = object[property].pop();

    this.notify(path, object[property]);

    return result;
  },

  splice(path, ...args) {
    path = this.__templateGetPathAsArray(path);

    let object = this;

    path.slice(0, -1).forEach(segment => {
      if (!object) {
        return;
      }
      if (object[segment] === undefined || object[segment] === null) {
        object[segment] = {};
      }

      object = object[segment];
    });

    let property = path.slice(-1).pop();

    let result = object[property].splice(...args);

    this.notify(path, object[property]);

    return result;
  },

  notify(path, value) {
    path = this.__templateGetPathAsString(path);

    if (!this.__templateReady) {
      if (this.__templateNotifyOnReady.indexOf(path) === -1) {
        this.__templateNotifyOnReady.push(path);
      }
      return;
    }

    // try {
    let binding = this.__templateGetBinding(path);
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

  __templateInitialize(template, host, marker) {
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
    this.__template = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__helpers_template__["a" /* fix */])(template);
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
      this.__templateMarker = document.createComment(`marker-${ this.__templateId }`);
      this.__templateHost.appendChild(this.__templateMarker);
    }
  },

  __templateRender(contentFragment) {
    this.__templateReady = true;

    this.__templateNotifyOnReady.forEach(key => {
      this.notify(key, this.get(key));
    });
    this.__templateNotifyOnReady = [];

    if (!this.__template) {
      return;
    }

    let fragment = this.__templateFragment;
    this.__templateFragment = null;

    if (contentFragment && contentFragment instanceof window.DocumentFragment) {
      // try {
      [].forEach.call(fragment.querySelectorAll('slot'), slot => {
        let name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__helpers_slot__["a" /* slotName */])(slot);
        let parent = slot.parentElement || fragment;
        let marker = document.createComment(`slot ${ name }`);

        parent.insertBefore(marker, slot);
        parent.removeChild(slot);

        if (name) {
          let node = contentFragment.querySelectorAll(`[slot="${ name }"]`);
          [].forEach.call(node, node => {
            parent.insertBefore(node, marker);
          });
        } else {
          parent.insertBefore(contentFragment, marker);
        }
      });
    }

    this.__templateMarker.parentElement.insertBefore(fragment, this.__templateMarker);
  },

  __templateUninitialize() {
    this.__templateChildNodes.forEach(node => {
      node.parentElement.removeChild(node);
    });
  },

  __templateGetPathAsArray(path) {
    // if (!path) {
    //   throw new Error(`Unknown path ${path} to set to ${this.is}`);
    // }

    if (typeof path !== 'string') {
      return path;
    }

    return path.split('.');
  },

  __templateGetPathAsString(path) {
    if (typeof path === 'string') {
      return path;
    }

    return path.join('.');
  },

  __parseAnnotations() {
    this.__templateChildNodes = [...this.__templateFragment.childNodes];

    let len = this.__templateChildNodes.length;

    for (let i = 0; i < len; i++) {
      let node = this.__templateChildNodes[i];

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

  __parseEventAnnotations(element, attrName) {
    // bind event annotation
    let attrValue = element.getAttribute(attrName);
    let eventName = attrName.slice(1, -1);
    // let eventName = attrName.substr(3);
    if (eventName === 'tap') {
      eventName = 'click';
    }

    let context = this;
    let expr = __WEBPACK_IMPORTED_MODULE_1__expr__["a" /* default */].getFn(attrValue, [], true);

    this.on(eventName, element, evt => {
      expr.invoke(context, { evt });
    });
  },

  __parseAttributeAnnotations(element) {
    // clone attributes to array first then foreach because we will remove
    // attribute later if already processed
    // this hack to make sure when attribute removed the attributes index doesnt shift.
    let annotated = false;

    let len = element.attributes.length;

    for (let i = 0; i < len; i++) {
      let attr = element.attributes[i];

      let attrName = attr.name;

      if (attrName === 'id' || attrName === 'class' || attrName === 'style') {
        continue;
      }

      if (attrName.indexOf('(') === 0) {
        this.__parseEventAnnotations(element, attrName);
      } else {
        // bind property annotation
        annotated = this.__templateAnnotate(__WEBPACK_IMPORTED_MODULE_1__expr__["a" /* default */].get(attr.value), __WEBPACK_IMPORTED_MODULE_3__accessor__["a" /* default */].get(element, attrName)) || annotated;
      }
    }

    return annotated;
  },

  __parseElementAnnotations(element) {
    let annotated = false;

    let scoped = element.__templateModel;

    if (scoped) {
      return annotated;
    }

    element.__templateModel = this;

    if (element.attributes && element.attributes.length) {
      annotated = this.__parseAttributeAnnotations(element) || annotated;
    }

    if (element.childNodes && element.childNodes.length) {
      let childNodes = [].slice.call(element.childNodes);
      let childNodesLength = childNodes.length;

      for (let i = 0; i < childNodesLength; i++) {
        annotated = this.__parseNodeAnnotations(childNodes[i]) || annotated;
      }
    }

    [].forEach.call(element.getElementsByTagName('slot'), slot => {
      [].forEach.call(slot.childNodes, node => {
        annotated = this.__parseNodeAnnotations(node) || annotated;
      });
    });

    return annotated;
  },

  __parseNodeAnnotations(node) {
    switch (node.nodeType) {
      case window.Node.TEXT_NODE:
        return this.__parseTextAnnotations(node);
      case window.Node.ELEMENT_NODE:
        return this.__parseElementAnnotations(node);
    }
  },

  __parseTextAnnotations(node) {
    let expr = __WEBPACK_IMPORTED_MODULE_1__expr__["a" /* default */].get(node.textContent);
    let accessor = __WEBPACK_IMPORTED_MODULE_3__accessor__["a" /* default */].get(node);
    return this.__templateAnnotate(expr, accessor);
  },

  __templateAnnotate(expr, accessor) {
    if (expr.type === 's') {
      return false;
    }

    if (expr.constant) {
      let val = expr.invoke(this);
      accessor.set(val);
      return false;
    }

    // annotate every paths
    let annotation = new __WEBPACK_IMPORTED_MODULE_4__annotation__["a" /* default */](this, expr, accessor);

    if (expr.type === 'm') {
      this.__templateGetBinding(expr.fn.name).annotations.push(annotation);
    }

    expr.vpaths.forEach(arg => this.__templateGetBinding(arg.name).annotations.push(annotation));

    return true;
  },

  __templateGetBinding(path) {
    let segments = path.split('.');
    let bindings;
    let binding;

    for (let i = 0; i < segments.length; i++) {
      let segment = segments[i];

      bindings = binding ? binding.paths : this.__templateBindings;

      if (!bindings[segment]) {
        bindings[segment] = new __WEBPACK_IMPORTED_MODULE_2__binding__["a" /* default */](this, segment);
      }

      binding = bindings[segment];
    }

    return binding;
  }
};

// new version will not export filter token and css modules
// T.Filter = Filter;
// T.Accessor = Accessor;
// T.Token = Token;
// T.Css = Css;

window.T = T;

/* harmony default export */ exports["a"] = T;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return put; });
const REPOSITORY = {};

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



/***/ },
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inflector__ = __webpack_require__(14);


class BaseAccessor {
  static get(node, name) {
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

          return new PropertyAccessor(node, name);
        case window.Node.TEXT_NODE:
          if (node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {
            return new ValueAccessor(node.parentElement);
          }

          return new TextAccessor(node);
        default:
          throw new Error(`Unimplemented resolving accessor for nodeType: ${ node.nodeType }`);
      }
    } else {
      console.warn('xxxx', node, name);
      return new BaseAccessor(node, name);
    }
  }

  constructor(node, name) {
    this.node = node;
    this.name = name;
  }

  set(value) {
    if (typeof this.node.set === 'function') {
      this.node.set(this.name, value);
    } else {
      this.node[this.name] = value;
    }
  }

  get() {
    if (typeof this.node.get === 'function') {
      return this.node.get(this.name);
    } else {
      return this.node[this.name];
    }
  }
}

class PropertyAccessor extends BaseAccessor {
  constructor(node, name) {
    super();

    this.node = node;
    this.name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_inflector__["a" /* camelize */])(name);
  }
}

class TextAccessor extends BaseAccessor {
  constructor(node) {
    super(node, 'textContent');
  }

  set(value) {
    this.node.textContent = typeof value === 'undefined' ? '' : value;
  }
}

class ClassAccessor extends BaseAccessor {
  set(value) {
    if (value) {
      this.node.classList.add(this.name);
    } else {
      this.node.classList.remove(this.name);
    }
  }

  get() {
    throw new Error('Unimplemented');
  }
}

class StyleAccessor extends BaseAccessor {
  set(value) {
    this.node.style[this.name] = value || '';
  }

  get() {
    throw new Error('Unimplemented');
  }
}

class HTMLAccessor extends BaseAccessor {
  set(value) {
    this.node.innerHTML = typeof value === 'undefined' ? '' : value;
  }

  get() {
    return this.node.innerHTML;
  }
}

class ValueAccessor extends BaseAccessor {
  constructor(node) {
    super(node, 'value');
  }

  set(value) {
    if (document.activeElement !== this.node) {
      super.set(typeof value === 'undefined' ? '' : value);
    }
  }
}

class AttributeAccessor extends BaseAccessor {
  constructor(node, name) {
    super(node, name.slice(0, -1));
  }

  set(value) {
    if (value) {
      this.node.setAttribute(this.name, value);
    } else {
      this.node.removeAttribute(this.name);
    }
  }

  get() {
    return this.node.getAttribute(this.name);
  }
}

/* harmony default export */ exports["a"] = BaseAccessor;

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dashify__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__camelize__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__dashify__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__camelize__["a"]; });




/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_template_binding__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_template_binding_expr__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_template_binding_accessor__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_event_helper__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_serializer__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_object_helper__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_function_helper__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__repository__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_inflector__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__setup__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__notify_annotation__ = __webpack_require__(26);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return base; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return define; });













let componentId = 0;
function nextId() {
  return componentId++;
}

let baseComponents = {};

function base(base) {
  if (baseComponents[base]) {
    return baseComponents[base];
  }

  class Component extends window[base] {
    constructor() {
      super();

      this.is = this.nodeName.toLowerCase();

      this.createdCallback();
    }

    get $() {
      return this.__templateHost.getElementsByTagName('*');
    }

    created() {}

    ready() {}

    attached() {}

    detached() {}

    createdCallback() {
      if (__WEBPACK_IMPORTED_MODULE_9__setup__["a" /* default */].get('debug')) console.info(`CREATED ${ this.is }`);

      this.__id = nextId();
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__repository__["a" /* put */])(this.__id, this);
      this.setAttribute('xin-id', this.__id);

      this.created();

      this.__initData();

      this.__initTemplate();

      this.__initProps();

      this.__initListeners();

      this.async(this.readyCallback);
    }

    readyCallback() {
      this.__componentReady = true;

      if (__WEBPACK_IMPORTED_MODULE_9__setup__["a" /* default */].get('debug')) console.info(`READY ${ this.is }`);

      this.__initPropValues();

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

    attachedCallback() {
      this.__componentAttaching = true;

      if (!this.__componentReady) {
        return;
      }

      if (__WEBPACK_IMPORTED_MODULE_9__setup__["a" /* default */].get('debug')) console.info(`ATTACHED ${ this.is } ${ this.__componentAttaching ? '(delayed)' : '' }`);

      this.attached();

      this.__componentAttaching = false;
    }

    detachedCallback() {
      this.detached();
    }

    connectedCallback() {
      return this.attachedCallback();
    }

    disconnectedCallback() {
      return this.detachedCallback();
    }

    get __app() {
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

    __initData() {
      this.__componentContent = [];
      this.__componentDebouncers = {};
      this.__componentNotifiers = {};
      this.__componentReady = false;
      this.__componentAttaching = false;
      this.__componentInitialPropValues = {};
      this.__componentNotifiedProps = {};
    }

    __initProps() {
      for (let propName in this.props) {
        let property = this.props[propName];
        let attrName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_inflector__["b" /* dashify */])(propName);

        if ('computed' in property) {
          let accessor = __WEBPACK_IMPORTED_MODULE_2_template_binding_accessor__["a" /* default */].get(this, propName);
          let expr = __WEBPACK_IMPORTED_MODULE_1_template_binding_expr__["a" /* default */].getFn(property.computed, [], true);
          this.__templateAnnotate(expr, accessor);

          this.__componentInitialPropValues[propName] = () => expr.invoke(this);
        } else if (this.hasAttribute(attrName)) {
          let attrVal = this.getAttribute(attrName);

          // copy value from attribute to property
          // fallback to property.value
          let expr = __WEBPACK_IMPORTED_MODULE_1_template_binding_expr__["a" /* default */].get(attrVal);
          if (expr.type === 's') {
            this.__componentInitialPropValues[propName] = () => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_serializer__["a" /* deserialize */])(attrVal, property.type);
          } else {
            if ('notify' in property && expr.mode === '{') {
              this.__componentNotifiedProps[propName] = true;
              this.__templateGetBinding(propName).annotations.push(new __WEBPACK_IMPORTED_MODULE_10__notify_annotation__["a" /* default */](this, propName));
            }
            this.__componentInitialPropValues[propName] = () => expr.invoke(this.__templateModel);
          }
        }

        if ('observer' in property) {
          let expr = __WEBPACK_IMPORTED_MODULE_1_template_binding_expr__["a" /* default */].getFn(property.observer, [propName], true);
          this.__templateAnnotate(expr);
        }
      }
    }

    __initPropValues() {
      for (let propName in this.props) {
        let property = this.props[propName];

        let propValue;

        if (this.__componentInitialPropValues[propName]) {
          propValue = this.__componentInitialPropValues[propName]();
        } else {
          propValue = this[propName];
        }

        if (propValue === undefined && 'value' in property) {
          propValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_object_helper__["a" /* val */])(property.value);
        }

        // when property is undefined, log error when property is required otherwise assign to default value
        if (property.required && propValue === undefined /* (propValue === undefined || propValue === null) */) {
            throw new Error(`${ this.is }:${ this.__id } missing required ${ propName }`);
          }

        // set and force notify for the first time
        this[propName] = propValue;

        // only notify if propValue already defined otherwise undefined value will be propagated to model
        if (propValue !== undefined) {
          this.notify(propName, propValue);
        }
      }
    }

    __isNotified(name) {
      return name in this.__componentNotifiedProps;
    }

    __initTemplate() {
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

    __initListeners() {
      if (!this.listeners) {
        return;
      }

      Object.keys(this.listeners).forEach(key => {
        let meta = parseListenerMetadata(key);
        let expr = __WEBPACK_IMPORTED_MODULE_1_template_binding_expr__["a" /* default */].getFn(this.listeners[key], [], true);
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

    __addNotifier(eventName) {
      if (this.__componentNotifiers[eventName]) {
        return;
      }

      this.__componentNotifiers[eventName] = evt => {
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

    __removeNotifier(eventName) {
      if (!this.__componentNotifiers[eventName]) {
        return;
      }

      this.off(eventName, this.__componentNotifiers[eventName]);
      this.__componentNotifiers[eventName] = null;
    }

    fire(type, detail, options) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_event_helper__["a" /* default */])(this).fire(type, detail, options);
    }

    async(callback, waitTime) {
      return new __WEBPACK_IMPORTED_MODULE_6_function_helper__["a" /* Async */](this).start(callback, waitTime);
    }

    debounce(job, callback, wait, immediate) {
      let debouncer = this.__componentDebouncers[job];
      if (debouncer && debouncer.running) {
        debouncer.cancel();
      } else {
        debouncer = this.__componentDebouncers[job] = new __WEBPACK_IMPORTED_MODULE_6_function_helper__["b" /* Debounce */](this, immediate);
      }
      debouncer.start(callback, wait);

      return debouncer;
    }

    // T overriden
    // -------------------------------------------------------------------------
    //

    __templateAnnotate(expr, accessor) {
      if (!__WEBPACK_IMPORTED_MODULE_0_template_binding__["a" /* default */].prototype.__templateAnnotate.call(this, expr, accessor)) {
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

  let tproto = __WEBPACK_IMPORTED_MODULE_0_template_binding__["a" /* default */].prototype;
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

function parseListenerMetadata(key) {
  key = key.trim();

  let splitted = key.split(' ');
  let metadata = {
    key: key,
    eventName: splitted[0],
    selector: splitted[1] ? splitted.slice(1).join(' ') : null
  };

  return metadata;
}

function useCustomElements() {
  if ('value' in useCustomElements === false) {
    let customElementsVersion = __WEBPACK_IMPORTED_MODULE_9__setup__["a" /* default */].get('customElements.version');
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

  let ElementPrototype = {
    prototype: Object.create(Component.prototype, { is: { value: name } }),
    extends: options && options.extends ? options.extends : undefined
  };

  let ElementClass = document.registerElement(name, ElementPrototype);

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__repository__["a" /* put */])(name, ElementClass);

  return ElementClass;
}

const Component = base('HTMLElement');



/***/ },
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
class Annotation {
  constructor(model, expr, accessor) {
    this.model = model;
    this.expr = expr;
    this.accessor = accessor;
  }

  effect(value) {
    if (this.accessor) {
      this.accessor.set(this.expr.invoke(this.model));
    } else {
      this.expr.invoke(this.model);
    }
  }
}

/* harmony default export */ exports["a"] = Annotation;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
class Binding {
  constructor(context, model) {
    this.context = context;
    this.model = model;
    this.paths = {};
    this.annotations = [];
  }

  walkEffect(value) {
    this.annotations.forEach(annotation => {
      // try {
      annotation.effect(value /* , this.model */);
      // } catch (err) {
      //   console.error(`Error caught while walk effect annotation: ${annotation.expr ? annotation.expr.value : '#unknown'}\n ${err.stack}`);
      // }
    });

    Object.keys(this.paths).forEach(i => {
      this.paths[i].walkEffect(value ? value[i] : undefined);
    });
  }
}

/* harmony default export */ exports["a"] = Binding;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
class Filter {
  constructor(name, callback, otherArgs) {
    this.name = name;
    this.callback = callback;
    this.otherArgs = otherArgs;
  }

  invoke(val) {
    let args = [val];
    [].push.apply(args, this.otherArgs);
    return this.callback.apply(null, args);
  }

  static put(name, callback) {
    registry[name] = callback;
  }

  static get(name) {
    let segments = name.split(':');
    let args = segments.splice(1);
    let key = segments.pop();
    return new Filter(key, registry[key], args);
  }
}

const registry = {
  required: val => {
    if (val === undefined || val === null || val === '') {
      throw new Error('Value is required');
    }
    return val;
  },
  upper: val => String.prototype.toUpperCase.call(val || ''),
  lower: val => String.prototype.toLowerCase.call(val || ''),
  not: val => !val,
  slice: (val, begin, end) => Array.prototype.slice.call(val || [], begin, end)
};

/* harmony default export */ exports["a"] = Filter;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return slotName; });
const SLOT_SUPPORTED = (() => {
  if (typeof window === 'undefined') {
    return false;
  }

  return 'HTMLUnknownElement' in window && !(document.createElement('slot') instanceof window.HTMLUnknownElement);
})();

function slotName(element) {
  return SLOT_SUPPORTED ? element.name : element.getAttribute('name');
}



/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return fix; });
function fix(template) {
  if (!template.content && window.HTMLTemplateElement && window.HTMLTemplateElement.decorate) {
    window.HTMLTemplateElement.decorate(template);
  }
  return template;
};



/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
const CACHE = new Map();

class Token {
  static get CACHE() {
    return CACHE;
  }

  static get(name) {
    if (CACHE.has(name)) {
      return CACHE.get(name);
    }

    let token = new Token(name);
    CACHE.set(name, token);
    return token;
  }

  constructor(name) {
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

  value(context, others) {
    context = context || window;

    if (this.type === 's') {
      return this._value;
    }

    let val = valueOf(context, this.name);
    if (typeof val !== 'undefined') {
      return val;
    }

    val = valueOf(others, this.name);
    if (typeof val !== 'undefined') {
      return val;
    }

    return;
  }
}

function valueOf(context, key) {
  if (context) {
    return typeof context.get === 'function' ? context.get(key) : context[key];
  }
}

/* harmony default export */ exports["a"] = Token;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_template_binding_expr__ = __webpack_require__(5);


class NotifyAnnotation {
  constructor(model, name) {
    let expr = __WEBPACK_IMPORTED_MODULE_0_template_binding_expr__["a" /* default */].get(model.getAttribute(name));
    this.model = model;
    this.name = expr.name;
  }

  effect(value) {
    this.model.fire('-notify', {
      name: this.name,
      value: value
    });
  }
}

/* harmony default export */ exports["a"] = NotifyAnnotation;

/***/ },
/* 27 */,
/* 28 */,
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__async__ = __webpack_require__(13);


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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
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

/* harmony default export */ exports["a"] = camelize;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
var dashified = {};

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

/* harmony default export */ exports["a"] = dashify;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__val__ = __webpack_require__(33);


/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__val__["a"]; });



/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = v;
function v (value, ...args) {
  return typeof value === 'function' ? value(...args) : value;
};


/***/ },
/* 34 */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serialize__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__deserialize__ = __webpack_require__(34);



/* unused harmony reexport serialize */
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__deserialize__["a"]; });



/***/ },
/* 36 */
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


/***/ }
/******/ ]);
//# sourceMappingURL=xin.js.map