webpackJsonp([0],Array(25).concat([
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xin__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xin_components_app__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__doc_app_html__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__doc_app_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__doc_app_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_xin_components_pager__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__doc_header__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__doc_nav__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_xin_middlewares_lazy_view__ = __webpack_require__(51);









class DocApp extends __WEBPACK_IMPORTED_MODULE_1_xin_components_app__["a" /* default */] {
  get template() {
    return __WEBPACK_IMPORTED_MODULE_2__doc_app_html___default.a;
  }
}

__WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].define('doc-app', DocApp);

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setup__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__repository__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component__ = __webpack_require__(45);




const xin = (() => {
  if ('xin' in window && typeof window.xin === 'function') {
    return window.xin;
  }

  let xin = id => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__repository__["a" /* get */])(id);

  xin.put = __WEBPACK_IMPORTED_MODULE_1__repository__["b" /* put */];
  xin.setup = __WEBPACK_IMPORTED_MODULE_0__setup__["a" /* default */];
  xin.Component = __WEBPACK_IMPORTED_MODULE_2__component__["a" /* Component */];
  xin.base = __WEBPACK_IMPORTED_MODULE_2__component__["b" /* base */];
  xin.define = __WEBPACK_IMPORTED_MODULE_2__component__["c" /* define */];

  return xin;
})();

window.xin = xin;

/* harmony default export */ __webpack_exports__["a"] = (xin);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BaseAccessor {
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

/* harmony default export */ __webpack_exports__["a"] = (BaseAccessor);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

  if (selector instanceof window.Element) {
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
        // XXX is it ok to have detail here?
        detail: detail,
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

/* harmony default export */ __webpack_exports__["a"] = (eventHelper);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__token__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter__ = __webpack_require__(63);



const CACHE = {
  's': {
    '[': {},
    '{': {}
  },
  'v': {
    '[': {},
    '{': {}
  }
};

function _get(value, mode, type) {
  let cache = CACHE[type][mode];
  if (value in cache) {
    return cache[value];
  }

  let expr = new Expr(value, mode, type);
  if (type !== 's') {
    cache[value] = expr;
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
    return Expr.get(value.indexOf('(') === -1 ? `${value}(${args.join(', ')})` : value, unwrapped);
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

    let args = this.args.map(arg => {
      return arg.value(context, otherArgs);
    });

    return this.fn.invoke(args, context, context.__templateHost);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Expr);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Route {
  static routeRegExp(str) {
    let chunks = str.split('[');

    if (chunks.length > 2) {
      throw new Error('Invalid use of optional params');
    }

    let tokens = [];
    let re = chunks[0].replace(/{([^}]+)}/g, function (g, token) {
      tokens.push(token);
      return '([^/]+)';
    }).replace(/\//g, '\\/');

    let optRe = '';

    if (chunks[1]) {
      optRe = '(?:' + chunks[1].slice(0, -1).replace(/{([^}]+)}/g, function (g, token) {
        let [realToken, re = '[^/]+'] = token.split(':');
        tokens.push(realToken);
        return `(${re})`;
      }).replace(/\//g, '\\/') + ')?';
    }

    return [new RegExp('^' + re + optRe + '$'), tokens];
  }

  static isStatic(pattern) {
    return !pattern.match(/[[{]/);
  }

  constructor(route, callback) {
    this.route = route;
    this.callback = callback;

    if (Route.isStatic(route)) {
      this.type = 's';
      this.pattern = null;
      this.args = [];
    } else {
      let result = Route.routeRegExp(route);
      this.type = 'v';
      this.pattern = result[0];
      this.args = result[1];
    }
  }

  getExecutorFor(fragment) {
    if (this.type === 's') {
      if (fragment === this.route) {
        return { handler: this, args: {} };
      }
    } else if (this.type === 'v') {
      let result = fragment.match(this.pattern);
      if (result) {
        return {
          handler: this,
          args: this.args.reduce((args, name, index) => {
            args[name] = result[index + 1];
            return args;
          }, {})
        };
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Route);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_helper__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_function_helper__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_transition_animate_css__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_transition_animate_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__css_transition_animate_css__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






class Fx {
  static add(name, transition) {
    adapters[name] = transition;
  }

  static get(name) {
    return adapters[name] || adapters.none;
  }

  constructor(options) {
    options = options || {};
    this.element = options.element;
    this.duration = options.duration || 0;
    this.transition = options.transition || 'none';
    this.method = options.method || '';

    this.adapter = options.adapter || Fx.get(this.transition);

    this.running = false;
    this.direction = 0;
  }

  play(direction) {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.running = true;
      _this.direction = direction;

      yield _this.adapter.play(_this);
    })();
  }

  stop() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.adapter.stop(_this2);

      _this2.running = false;
      _this2.direction = 0;
    })();
  }
}

const adapters = {
  'none': {
    play() {
      return _asyncToGenerator(function* () {})();
    },

    stop() {
      return _asyncToGenerator(function* () {})();
    }
  },

  'slide': {
    play(fx) {
      return new Promise(resolve => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_event_helper__["a" /* default */])(fx.element).once('transitionend', () => {
          fx.element.classList.remove('trans-slide__animate');
          resolve();
        });
        fx.element.classList.add(`trans-slide__${fx.method}-${fx.direction > 0 ? 'left' : 'right'}`);

        __WEBPACK_IMPORTED_MODULE_1_function_helper__["a" /* Async */].nextFrame(() => {
          fx.element.classList.add('trans-slide__animate');
          __WEBPACK_IMPORTED_MODULE_1_function_helper__["a" /* Async */].nextFrame(() => fx.element.classList.add(`trans-slide__${fx.method}`));
        });
      });
    },

    stop(fx) {
      return new Promise(resolve => {
        __WEBPACK_IMPORTED_MODULE_1_function_helper__["a" /* Async */].nextFrame(() => {
          fx.element.classList.remove(`trans-slide__${fx.method}-${fx.direction > 0 ? 'left' : 'right'}`);
          fx.element.classList.remove(`trans-slide__${fx.method}`);
          resolve();
        });
      });
    }
  },

  'fade': {
    play(fx) {
      return new Promise(resolve => {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_event_helper__["a" /* default */])(fx.element).once('transitionend', () => {
          resolve();
        });

        fx.element.classList.add(`trans-fade__${fx.method}`);

        __WEBPACK_IMPORTED_MODULE_1_function_helper__["a" /* Async */].nextFrame(() => {
          fx.element.classList.add(`trans-fade__${fx.method}-animate`);
        });
      });
    },

    stop(fx) {
      return new Promise(resolve => {
        fx.element.classList.remove(`trans-fade__${fx.method}`);

        __WEBPACK_IMPORTED_MODULE_1_function_helper__["a" /* Async */].nextFrame(() => {
          fx.element.classList.remove(`trans-fade__${fx.method}-animate`);
          resolve();
        });
      });
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Fx);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return put; });
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



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Setup {
  constructor(obj) {
    Object.assign(this, obj);
  }

  get(key) {
    return this[key];
  }

  set(key, value) {
    this[key] = value;
  }
}

/* harmony default export */ __webpack_exports__["a"] = ('xin' in window && 'setup' in window.xin ? window.xin.setup : new Setup(window.xin));

/***/ }),
/* 37 */,
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__accessors_base__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__accessors_attribute__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__accessors_text__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__accessors_html__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__accessors_value__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__accessors_class__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__accessors_style__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__accessors_property__ = __webpack_require__(57);









/* harmony default export */ __webpack_exports__["a"] = ({
  get(node, name) {
    if (node && 'nodeType' in node) {
      switch (node.nodeType) {
        case window.Node.ELEMENT_NODE:
          if (name.endsWith('$')) {
            return new __WEBPACK_IMPORTED_MODULE_1__accessors_attribute__["a" /* default */](node, name);
          } else if (name === 'text') {
            return new __WEBPACK_IMPORTED_MODULE_2__accessors_text__["a" /* default */](node);
          } else if (name === 'html') {
            return new __WEBPACK_IMPORTED_MODULE_3__accessors_html__["a" /* default */](node, name);
          } else if (name === 'value' && node.nodeName === 'INPUT') {
            return new __WEBPACK_IMPORTED_MODULE_4__accessors_value__["a" /* default */](node);
          }

          if (name.startsWith('class.')) {
            return new __WEBPACK_IMPORTED_MODULE_5__accessors_class__["a" /* default */](node, name.split('.').splice(1).join('.'));
          } else if (name.startsWith('style.')) {
            return new __WEBPACK_IMPORTED_MODULE_6__accessors_style__["a" /* default */](node, name.split('.').splice(1).join('.'));
          }

          return new __WEBPACK_IMPORTED_MODULE_7__accessors_property__["a" /* default */](node, name);
        case window.Node.TEXT_NODE:
          if (node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {
            return new __WEBPACK_IMPORTED_MODULE_4__accessors_value__["a" /* default */](node.parentElement);
          }

          return new __WEBPACK_IMPORTED_MODULE_2__accessors_text__["a" /* default */](node);
        default:
          throw new Error(`Unimplemented resolving accessor for nodeType: ${node.nodeType}`);
      }
    } else {
      return new __WEBPACK_IMPORTED_MODULE_0__accessors_base__["a" /* default */](node, name);
    }
  }
});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

  static sleep (wait) {
    return new Promise(resolve => setTimeout(resolve, wait));
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

/* harmony default export */ __webpack_exports__["a"] = (Async);


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__async__ = __webpack_require__(39);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__async__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__debounce__ = __webpack_require__(75);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__debounce__["a"]; });




/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dashify__ = __webpack_require__(80);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__dashify__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__camelize__ = __webpack_require__(79);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__camelize__["a"]; });




/***/ }),
/* 42 */,
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xin__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__doc_header_html__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__doc_header_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__doc_header_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__doc_header_css__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__doc_header_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__doc_header_css__);





class DocHeader extends __WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].Component {
  get template() {
    return __WEBPACK_IMPORTED_MODULE_1__doc_header_html___default.a;
  }

  showNav(evt) {
    evt.preventDefault();
    window.nav.open();
  }
}

__WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].define('doc-header', DocHeader);

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_xin__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__doc_nav_html__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__doc_nav_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__doc_nav_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__doc_nav_css__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__doc_nav_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__doc_nav_css__);





class DocNav extends __WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].Component {
  get template() {
    return __WEBPACK_IMPORTED_MODULE_1__doc_nav_html___default.a;
  }

  get listeners() {
    return {
      'click a': 'tryClose(evt)'
    };
  }

  attached() {
    super.attached();

    this.navigatedCallback = evt => {
      let re = new RegExp(evt.detail.uri + '$');
      [...this.querySelectorAll('.doc-nav__item')].forEach(item => {
        if (item.href.match(re)) {
          item.classList.add('doc-nav--selected');
        } else {
          item.classList.remove('doc-nav--selected');
        }
      });
    };
    this.__app.on('navigated', this.navigatedCallback);
  }

  detached() {
    this.__app.off('navigated', this.navigatedCallback);
  }

  open(evt) {
    if (evt) {
      evt.preventDefault();
    }

    this.classList.add('doc-nav--visible');
  }

  close(evt) {
    if (evt) {
      evt.preventDefault();
    }

    this.classList.remove('doc-nav--visible');
  }

  tryClose(evt) {
    this.async(() => {
      this.close();
    }, 300);
  }
}

__WEBPACK_IMPORTED_MODULE_0_xin__["a" /* default */].define('doc-nav', DocNav);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_template_binding__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_template_binding_expr__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_template_binding_accessor__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_event_helper__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_serializer__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_object_helper__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_function_helper__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__repository__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_inflector__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__setup__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__notify_annotation__ = __webpack_require__(53);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return base; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return define; });













const nextId = function () {
  let id = 0;
  return function () {
    return id++;
  };
}();

let baseComponents = {};

function base(base) {
  if (baseComponents[base]) {
    return baseComponents[base];
  }

  let BaseElement;
  if (useCustomElements()) {
    BaseElement = window[base];
  } else {
    BaseElement = function () {};
    BaseElement.prototype = Object.create(window[base].prototype);
  }

  class Component extends BaseElement {
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
      if (__WEBPACK_IMPORTED_MODULE_9__setup__["a" /* default */].get('debug')) console.info(`CREATED ${this.is}`);

      this.__id = nextId();

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__repository__["b" /* put */])(this.__id, this);

      this.created();

      this.__initData();

      // move to readyCallback
      // this.__initProps();
      //
      // this.__initListeners();
      // move to readyCallback

      // move to attachedCallback
      // this.async(this.readyCallback);
      // move to attachedCallback
    }

    readyCallback() {
      this.__componentReady = true;

      if (__WEBPACK_IMPORTED_MODULE_9__setup__["a" /* default */].get('debug')) console.info(`READY ${this.is}`);

      // moved from attachedCallback
      if (!this.hasAttribute('xin-id')) {
        // deferred set attributes until connectedCallback
        this.setAttribute('xin-id', this.__id);
      }
      // moved from attachedCallback

      // moved from createdCallback
      this.__initTemplate();

      this.__initProps();

      this.__initListeners();
      // moved from createdCallback

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

      // moved from createdCallback
      if (!this.__componentReady) {
        this.async(this.readyCallback);
        return;
      }
      // moved from createdCallback

      // notify default props
      this.notify('__global');
      this.notify('__setup');
      this.notify('__app');

      if (__WEBPACK_IMPORTED_MODULE_9__setup__["a" /* default */].get('debug')) console.info(`ATTACHED ${this.is} ${this.__componentAttaching ? '(delayed)' : ''}`);

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

    get __global() {
      return window;
    }

    get __setup() {
      return window.xin.setup;
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
      let props = this.__getProps();
      for (let propName in props) {
        let property = props[propName];
        let attrName = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_inflector__["a" /* dashify */])(propName);

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
              this.__templateGetBinding(propName).annotate(new __WEBPACK_IMPORTED_MODULE_10__notify_annotation__["a" /* default */](this, propName));
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

    __getProps() {
      if (!this._props) {
        this._props = this.props;
      }
      return this._props;
    }

    __initPropValues() {
      let props = this.__getProps();

      for (let propName in props) {
        let property = props[propName];

        let propValue;

        if (this.__componentInitialPropValues[propName]) {
          propValue = this.__componentInitialPropValues[propName]();
        } else {
          propValue = this[propName];
        }

        if ('value' in property && isUndefinedPropValue(propName, propValue)) {
          propValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_object_helper__["a" /* val */])(property.value);
        }

        // when property is undefined, log error when property is required otherwise assign to default value
        if (property.required && propValue === undefined /* (propValue === undefined || propValue === null) */) {
            throw new Error(`${this.is}:${this.__id} missing required ${propName}`);
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

        if ('__componentNotifyKey' in element && '__componentNotifyAccessor' in element) {
          element.__templateModel.set(element.__componentNotifyKey, element[element.__componentNotifyAccessor]);
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

    nextFrame(callback) {
      return __WEBPACK_IMPORTED_MODULE_6_function_helper__["a" /* Async */].nextFrame(callback.bind(this));
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
        const node = accessor.node;
        const nodeName = node.nodeName;

        const startNotify = name => {
          node.__componentNotifyKey = expr.name;
          node.__componentNotifyAccessor = accessor.name;
          this.__addNotifier(name);
        };

        if (nodeName === 'INPUT') {
          const inputType = node.getAttribute('type');
          if (inputType === 'radio' || inputType === 'checkbox') {
            throw new Error('Unimplemented yet');
          } else {
            startNotify('input');
          }
        } else if (nodeName === 'TEXTAREA') {
          startNotify('input');
        } else if (nodeName === 'SELECT') {
          startNotify('change');
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

function isUndefinedPropValue(propName, propValue) {
  return propValue === undefined || propName === 'title' && !propValue;
}

function useCustomElements() {
  if ('value' in useCustomElements === false) {
    let customElementsVersion = __WEBPACK_IMPORTED_MODULE_9__setup__["a" /* default */].get('customElements.version');
    useCustomElements.value = customElementsVersion === 'v1' || (!customElementsVersion || customElementsVersion === 'auto') && 'customElements' in window;
  }

  return useCustomElements.value;
}

function define(name, Component, options) {
  let ElementClass = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__repository__["a" /* get */])(name);

  if (ElementClass) {
    console.warn(`Duplicate registering ${name}`);
    return ElementClass;
  }

  if (useCustomElements()) {
    // v1 the element class is the component itself
    ElementClass = Component;
    window.customElements.define(name, Component, options);
  } else {
    let prototype = Object.create(Component.prototype, { is: { value: name } });
    let ElementPrototype = {
      prototype: prototype
    };

    if (options && options.extends) {
      ElementPrototype.extends = options.extends;
    }

    ElementClass = document.registerElement(name, ElementPrototype);
  }

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__repository__["b" /* put */])(name, ElementClass);

  return ElementClass;
}

const Component = base('HTMLElement');



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_event_helper__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_route__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_app_css__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_app_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__css_app_css__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }







class App extends __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].Component {
  get props() {
    return {
      title: {
        type: String,
        observer: '_titleChanged'
      },

      manual: {
        type: Boolean
      },

      mode: {
        type: String,
        value: 'hash'
      },

      rootUri: {
        type: String,
        value: '/'
      },

      hash: {
        type: String,
        value: '#!'
      },

      delay: {
        type: Number,
        value: 1 }
    };
  }

  get hashRegexp() {
    if (!this._hashRegexp || this._hash !== this.hash) {
      this._hashRegexp = new RegExp(`${this.hash}(.*)$`);
      this._hash = this.hash;
    }

    return this._hashRegexp;
  }

  notFound(fragment) {
    console.warn(`Route not found: ${fragment}`);
  }

  _titleChanged(title) {
    if (title) {
      document.title = title;
    }
  }

  created() {
    __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].put('app', this);

    this.__appSignature = true;
    this.location = window.location;
    this.history = window.history;

    // default values
    this.handlers = [];
    this.middlewares = [];

    this.__started = false;
    this.__starting = false;

    this.classList.add('xin-app');
  }

  attached() {
    if (this.manual) {
      return;
    }

    this.async(() => {
      this.start();
    }, this.delay);
  }

  route(route, callback) {
    this.handlers.push(new __WEBPACK_IMPORTED_MODULE_2__lib_route__["a" /* default */](route, callback));
  }

  start() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.__started || _this.__starting) {
        return;
      }

      _this.__middlewareChainRun = compose(_this.middlewares);

      _this.__listenNavigation();

      console.info(`Starting ${_this.is}:${_this.__id} ...`);

      _this.__starting = true;
      let executed = yield _this.__execute();
      _this.__starting = false;

      if (executed) {
        console.info(`Started ${_this.is}:${_this.__id}`);

        _this.__started = true;

        _this.fire('started');
      }
    })();
  }

  __listenNavigation() {
    let callback = () => {
      this.__execute();
    };

    if (this.mode === 'history') {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_event_helper__["a" /* default */])(window).on('popstate', callback);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_event_helper__["a" /* default */])(document).on('click', evt => {
        if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {
          evt.preventDefault();

          let state = { url: evt.target.getAttribute('href') };
          this.history.pushState(state, evt.target.innerHTML, evt.target.href);

          callback();
        }
      });
    } else {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_event_helper__["a" /* default */])(window).on('hashchange', callback);
    }
  }

  get started() {
    return this.__started || false;
  }

  getFragmentExecutors(fragment) {
    return this.handlers.reduce((executors, handler) => {
      let executor = handler.getExecutorFor(fragment);
      if (executor) executors.push(executor);
      return executors;
    }, []);
  }

  __execute() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let fragment = _this2.getFragment();
      let context = { app: _this2, uri: fragment };

      // run middleware chain then execute all executors
      let willContinue = yield _this2.__middlewareChainRun(context, function () {
        let executors = _this2.getFragmentExecutors(context.uri);
        if (executors.length === 0) {
          _this2.notFound(fragment);
          _this2.fire('route-not-found', fragment);
          return;
        }

        executors.forEach(function (executor) {
          executor.handler.callback(executor.args, context);
        });
      });

      if (willContinue === false) {
        return false;
      }

      _this2.fire('navigated', context);
      return true;
    })();
  }

  navigate(path, options) {
    path = path || '/';
    options = options || {};

    if (this.mode === 'history') {
      let url = this.rootUri + path.toString().replace(/\/$/, '').replace(/^\//, '');
      if (this.location.href.replace(this.location.origin, '') !== url) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
        this.__execute();
      }
    } else {
      this.location.hash = this.hash + path;
    }
    return this;
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  getFragment() {
    try {
      let fragment;
      if (this.mode === 'history') {
        fragment = decodeURI(this.location.pathname + this.location.search);
        fragment = fragment.replace(/\?(.*)$/, '');
        fragment = this.rootUri === '/' ? fragment : fragment.replace(this.rootUri, '');
      } else {
        let match = this.location.href.match(this.hashRegexp);
        fragment = match ? match[1] : '';
      }

      return '/' + fragment.toString().replace(/\/$/, '').replace(/^\//, '');
    } catch (err) {
      console.error('Fragment is not match any pattern, fallback to /');
      return '/';
    }
  }

  // $back (evt) {
  //   evt.preventDefault();
  //   this.history.back();
  // }
}

__WEBPACK_IMPORTED_MODULE_0____["a" /* default */].define('xin-app', App);

function compose(middlewares) {
  for (let fn of middlewares) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!');
    }
  }

  return (context, next) => {
    let dispatch = (() => {
      var _ref = _asyncToGenerator(function* (i) {
        if (i <= index) {
          throw new Error('next() called multiple times');
        }

        index = i;
        let fn = middlewares[i];
        if (i === middlewares.length) {
          fn = next;
        }
        if (!fn) {
          return;
        }

        return yield fn(context, function () {
          return dispatch(i + 1);
        });
      });

      return function dispatch(_x) {
        return _ref.apply(this, arguments);
      };
    })();

    // last called middlewares #
    let index = -1;

    return dispatch(0);
  };
}

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(29);


class Middleware extends __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].Component {
  attached() {
    super.attached();

    this.__app.use(this.callback());
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Middleware);

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fx__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_pager_css__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_pager_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__css_pager_css__);





class Pager extends __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].Component {
  ready() {
    super.ready();

    for (let el = this.firstElementChild, i = 0; el; el = el.nextElementSibling, i++) {
      if ('set' in el) {
        el.set('index', i);
      } else {
        el.setAttribute('index', i);
      }
    }
  }

  setFocus(element) {
    if (element) {
      let index = element.index;
      let oldIndex = this.focused$ ? this.focused$.index : -1;
      if (oldIndex < index) {
        this.__transitionForward(this.focused$, element);
      } else if (oldIndex > index) {
        this.__transitionBackward(this.focused$, element);
      }
    } else if (this.focused$) {
      this.focused$.setFocus(false);
    }

    this.focused$ = element;
  }

  __transitionBackward(prevEl, nextEl) {
    Promise.all([nextEl.inFx.play(-1), prevEl.outFx.play(-1)]).then(() => {
      prevEl.setVisible(false);
      nextEl.setVisible(true);
      prevEl.setFocus(false);
      nextEl.setFocus(true);
      this.$focused = nextEl;

      nextEl.inFx.stop();
      prevEl.outFx.stop();
    });
  }

  __transitionForward(prevEl, nextEl) {
    if (prevEl) {
      Promise.all([nextEl.inFx.play(1), prevEl.outFx.play(1)]).then(() => {
        prevEl.setVisible(false);
        nextEl.setVisible(true);
        prevEl.setFocus(false);
        nextEl.setFocus(true);
        this.$focused = nextEl;

        nextEl.inFx.stop();
        prevEl.outFx.stop();
      });
    } else {
      let transitionFx = new __WEBPACK_IMPORTED_MODULE_1__fx__["a" /* default */]({
        element: nextEl,
        transition: 'none'
      });

      transitionFx.play('in', 1).then(() => {
        nextEl.setVisible(true);
        nextEl.setFocus(true);
        this.$focused = nextEl;

        transitionFx.stop();
      });
    }
  }
}

__WEBPACK_IMPORTED_MODULE_0____["a" /* default */].define('xin-pager', Pager);
// xin.Pager = Pager;

/* unused harmony default export */ var _unused_webpack_default_export = (Pager);

/***/ }),
/* 49 */,
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_helper__ = __webpack_require__(31);


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_event_helper__["a" /* default */]);

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_middleware__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_view__ = __webpack_require__(52);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





class LazyView extends __WEBPACK_IMPORTED_MODULE_1__components_middleware__["a" /* default */] {
  get props() {
    return Object.assign({}, super.props, {
      loaders: {
        type: Array,
        value: () => __WEBPACK_IMPORTED_MODULE_0____["a" /* default */].setup.get('viewLoaders') || []
      }
    });
  }

  created() {
    super.created();

    this.views = [];
  }

  attached() {
    super.attached();

    this.loaders.push({
      test: /^xin-/,
      load(view) {
        let name = view.name.match(/^xin-(.+)-view$/)[1];
        return __webpack_require__(96)(`./${name}`);
      }
    });
  }

  get(uri) {
    let view = this.views.find(view => view.uri === uri);
    if (view) {
      return view;
    }

    return this.views.find(view => {
      if (view.isStaticRoute && view.uri === uri) {
        return true;
      }

      return view.route.getExecutorFor(uri);
    });
  }

  put(view) {
    this.views.push(view);
  }

  ensure(app, uri) {
    if (this.views.length === 0) {
      [].forEach.call(app.querySelectorAll('[lazy-view]'), el => {
        let loader = this.loaders.find(loader => {
          return el.nodeName.toLowerCase().match(loader.test);
        });

        let view = new __WEBPACK_IMPORTED_MODULE_2__lib_view__["a" /* default */](this, el, loader);
        this.put(view);
      });
    }

    let view = this.get(uri);
    if (!view) {
      throw new Error('Unknown view for ' + uri);
    }

    return view.load();
  }

  callback(options) {
    var _this = this;

    return (() => {
      var _ref = _asyncToGenerator(function* (ctx, next) {
        yield _this.ensure(ctx.app, ctx.uri);

        yield next();
      });

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })();
  }
}

__WEBPACK_IMPORTED_MODULE_0____["a" /* default */].define('xin-lazy-view-middleware', LazyView);

/* unused harmony default export */ var _unused_webpack_default_export = (LazyView);

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_lib_route__ = __webpack_require__(33);



class View {
  constructor(bag, element, loader) {
    this.name = element.nodeName.toLowerCase();
    this.uri = element.getAttribute('uri');
    this.element = element;
    this.loader = loader;
    this.route = new __WEBPACK_IMPORTED_MODULE_1__components_lib_route__["a" /* default */](this.uri);
    this.isStaticRoute = __WEBPACK_IMPORTED_MODULE_1__components_lib_route__["a" /* default */].isStatic(this.uri);
    this.bag = bag;
  }

  get loaded() {
    if (this._loaded) {
      return true;
    }

    const loaded = this.element.classList.contains('xin-view');
    if (loaded) {
      this._loaded = true;
      return true;
    }
  }

  load() {
    return new Promise((resolve, reject) => {
      if (this.loaded) {
        return resolve();
      }

      // use global event helper because element does not created yet at this time
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__event__["a" /* default */])(this.element).once('routed', () => {
        this._loaded = true;
        resolve();
      });

      if (!this.loader) {
        throw new Error(`Cannot lazy load view: ${this.name}`);
      }

      this.loader.load(this);
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (View);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_template_binding_expr__ = __webpack_require__(32);


class NotifyAnnotation {
  constructor(model, name) {
    let expr = __WEBPACK_IMPORTED_MODULE_0_template_binding_expr__["a" /* default */].get(model.getAttribute(name));
    this.model = model;
    this.name = expr.name;
  }

  effect(type, value) {
    this.model.__templateModel.set(this.name, value);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (NotifyAnnotation);

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(30);


class AttributeAccessor extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */] {
  constructor(node, name) {
    super(node, name.slice(0, -1));
  }

  set(value) {
    if (value) {
      if (value !== this.node.getAttribute(this.name)) {
        this.node.setAttribute(this.name, value);
      }
    } else {
      this.node.removeAttribute(this.name);
    }
  }

  get() {
    return this.node.getAttribute(this.name);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AttributeAccessor);

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(30);


class ClassAccessor extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */] {
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

/* harmony default export */ __webpack_exports__["a"] = (ClassAccessor);

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(30);


class HTMLAccessor extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */] {
  set(value = '') {
    this.node.innerHTML = value;
  }

  get() {
    return this.node.innerHTML;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (HTMLAccessor);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inflector__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__(30);



class PropertyAccessor extends __WEBPACK_IMPORTED_MODULE_1__base__["a" /* default */] {
  constructor(node, name) {
    super();

    this.node = node;
    this.name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_inflector__["b" /* camelize */])(name);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PropertyAccessor);

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(30);


class StyleAccessor extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */] {
  set(value = '') {
    this.node.style[this.name] = value;
  }

  get() {
    throw new Error('Unimplemented');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (StyleAccessor);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(30);


class TextAccessor extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */] {
  constructor(node) {
    super(node, 'textContent');
  }

  set(value = '') {
    if (value !== this.node.textContent) {
      this.node.textContent = value;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TextAccessor);

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(30);


class ValueAccessor extends __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */] {
  constructor(node) {
    super(node, 'value');
  }

  set(value = '') {
    if (document.activeElement !== this.node) {
      super.set(value);
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ValueAccessor);

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Annotation {
  constructor(model, expr, accessor) {
    this.model = model;
    this.expr = expr;
    this.accessor = accessor;
  }

  effect(type, value) {
    if (this.accessor) {
      this.accessor.set(this.expr.invoke(this.model));
    } else {
      this.expr.invoke(this.model);
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Annotation);

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Binding {
  constructor(context, model) {
    this.context = context;
    this.model = model;
    this.paths = {};
    this.annotations = [];
  }

  annotate(annotation) {
    this.annotations.push(annotation);
  }

  walkEffect(type, value) {
    this.annotations.forEach(annotation => {
      annotation.effect(type, value /* , this.model */);
    });

    Object.keys(this.paths).forEach(i => {
      this.paths[i].walkEffect(type, value);
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Binding);

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

    if (key in registry === false) {
      throw new Error(`Filter "${name}" not found.`);
    }

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
  string: val => String(val),
  number: val => Number(val),
  boolean: val => Boolean(val),
  default: (val, defVal) => val || defVal,
  upper: val => String.prototype.toUpperCase.call(val || ''),
  lower: val => String.prototype.toLowerCase.call(val || ''),
  not: val => !val,
  slice: (val, begin, end) => Array.prototype.slice.call(val || [], begin, end),
  json: (val, indent) => JSON.stringify(val, null, Number(indent)),
  consoleTrace: val => console.trace(val),
  consoleLog: val => console.log(val),
  consoleInfo: val => console.info(val),
  consoleWarn: val => console.warn(val),
  consoleError: val => console.error(val),
  currency: val => (val || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
};

/* harmony default export */ __webpack_exports__["a"] = (Filter);

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return slotName; });
const SLOT_SUPPORTED = (() => {
  if (typeof window === 'undefined') {
    return false;
  }

  return 'HTMLUnknownElement' in window && !(document.createElement('slot') instanceof window.HTMLUnknownElement);
})();

function slotName(element) {
  return SLOT_SUPPORTED ? element.name : element.getAttribute('name');
}



/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fix; });
function fix(template) {
  if (!template.content && window.HTMLTemplateElement && window.HTMLTemplateElement.decorate) {
    window.HTMLTemplateElement.decorate(template);
  }
  return template;
};

function needFixImportNode() {
  // console.log('needFixImportNode?');
  if (document.__importNode) {
    // already fixed
    return false;
  }
  let template = document.createElement('template');
  template.innerHTML = '<template>i</template>';
  let imported = document.importNode(template.content, true);
  return imported.firstChild.content.firstChild.textContent !== 'i';
}

if (needFixImportNode()) {
  // console.log('fixed importNode');
  document.__importNode = document.importNode;
  document.importNode = function (node, deep) {
    if (!deep) {
      return document.__importNode(node, deep);
    }

    let sourceTpls = [].slice.call(node.querySelectorAll('template'));
    let imported = document.__importNode(node, deep);
    [].forEach.call(imported.querySelectorAll('template'), (child, i) => {
      child.innerHTML = sourceTpls[i].innerHTML;
    });

    return imported;
  };
}



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_helper__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__expr__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__binding__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__accessor__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__annotation__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers_template__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helpers_slot__ = __webpack_require__(64);










const nextId = function () {
  let id = 0;
  return function () {
    return id++;
  };
}();

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

  promised(eventName, selector) {
    return new Promise(resolve => {
      if (selector) {
        this.once(eventName, selector, resolve);
      } else {
        this.once(eventName, resolve);
      }
    });
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

    if (!Array.isArray(object[property])) {
      object[property] = [];
    }

    object[property] = object[property].slice();
    let result = object[property].push(...values);
    this.notify(path, object[property]);

    // let index = object[property].length;
    // let removed = [];
    // let addedCount = values.length;
    // let result = object[property].push(...values);
    //
    // object = object[property];
    //
    // this.notifySplices(path, [
    //   { index, removed, addedCount, object, type: 'splice' },
    // ]);

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

    if (!Array.isArray(object[property])) {
      object[property] = [];
    }

    object[property] = object[property].slice();
    let result = object[property].pop();
    this.notify(path, object[property]);

    // let index = object[property].length;
    // let addedCount = 0;
    // let result = object[property].pop();
    // let removed = [ result ];
    //
    // object = object[property];
    //
    // this.notifySplices(path, [
    //   { index, removed, addedCount, object, type: 'splice' },
    // ]);

    return result;
  },

  splice(path, index, removeCount, ...values) {
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

    if (!Array.isArray(object[property])) {
      object[property] = [];
    }

    object[property] = object[property].slice();
    let result = object[property].splice(index, removeCount, ...values);
    this.notify(path, object[property]);

    // let addedCount = values.length;
    // let result = object[property].splice(...values);
    // let removed = result;
    //
    // object = object[property];
    //
    // this.notifySplices(path, [
    //   { index, removed, addedCount, object, type: 'splice' },
    // ]);

    return result;
  },

  notify(path, value) {
    path = this.__templateGetPathAsString(path);

    if (!this.__templateReady) {
      this.__templateNotifyOnReady = this.__templateNotifyOnReady || [];
      if (this.__templateNotifyOnReady.indexOf(path) === -1) {
        this.__templateNotifyOnReady.push(path);
      }
      return;
    }

    let binding = this.__templateGetBinding(path);
    if (binding) {
      if (value === undefined) {
        value = this.get(path);
      }

      binding.walkEffect('set', value);
    }
  },

  // notifySplices (path, splices) {
  //   path = this.__templateGetPathAsString(path);
  //
  //   if (!this.__templateReady) {
  //     if (this.__templateNotifyOnReady.indexOf(path) === -1) {
  //       this.__templateNotifyOnReady.push(path);
  //     }
  //     return;
  //   }
  //
  //   let binding = this.__templateGetBinding(path);
  //   if (binding) {
  //     binding.walkEffect('splice', splices);
  //   }
  // },

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
      this.__templateMarker = document.createComment(`marker-${this.__templateId}`);
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
        let marker = document.createComment(`slot ${name}`);

        parent.insertBefore(marker, slot);
        parent.removeChild(slot);

        if (name) {
          let node = contentFragment.querySelectorAll(`[slot="${name}"]`);
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

    // when element already has template model it means it already parsed, skip
    // parsing that element
    if (element.__templateModel) {
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

    // TODO when the annotation to specific model, expr and accessor already exist
    // do not reannotate, see repeat@_itemsChanged
    // if (expr && expr.name === '_itemsChanged') {
    //   console.log(annotation);
    // }

    if (expr.type === 'm') {
      this.__templateGetBinding(expr.fn.name).annotate(annotation);
    }

    expr.vpaths.forEach(arg => this.__templateGetBinding(arg.name).annotate(annotation));

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

/* harmony default export */ __webpack_exports__["a"] = (T);

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CACHE = {};

class Token {
  static get CACHE() {
    return CACHE;
  }

  static get(name) {
    if (name in CACHE) {
      return CACHE[name];
    }

    let token = new Token(name);
    CACHE[name] = token;
    return token;
  }

  constructor(name) {
    this.name = name;
    this.contextName = '';
    this.baseName = '';
    this._value = null;
    this.type = 'v';

    if (!this.name.match(/^[a-zA-Z_]/)) {
      try {
        this._value = JSON.parse(this.name);
        this.type = 's';
        return;
      } catch (err) {}
    }

    if (this.type === 'v') {
      let nameSegments = this.name.split('.');
      this.baseName = nameSegments.pop();
      this.contextName = nameSegments.join('.');
    }
  }

  value(...contexts) {
    if (this.type === 's') {
      return this._value;
    }

    for (let context of contexts) {
      if (!context) {
        continue;
      }

      let val = typeof context.get === 'function' ? context.get(this.name) : context[this.name];
      if (val !== undefined) {
        return val;
      }
    }
  }

  invoke(args, ...contexts) {
    if (contexts.length === 0) {
      throw new Error(`Cannot invoke method ${this.name} of undefined context`);
    }

    if (this.type === 's') {
      let [context] = contexts;
      throw new Error(`Method is not eligible, ${context.__templateHost.nodeName || '$anonymous'}#${this.name}`);
    }

    for (let context of contexts) {
      if (!context) {
        continue;
      }

      if (typeof context.get === 'function') {
        let ctx = this.contextName ? context.get(this.contextName) : context;
        if (typeof ctx[this.baseName] === 'function') {
          return ctx[this.baseName](...args);
        }
      } else if (typeof context[this.name] === 'function') {
        return context[this.name].apply(context, args);
      }
    }

    let [context] = contexts;
    throw new Error(`Method is not eligible, ${context.__templateHost.nodeName || '$anonymous'}#${this.name}`);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Token);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "doc-header {\n  position: fixed;\n  width: 100%;\n  height: 50px!important;\n  display: block;\n  padding: 0 8px;\n  box-sizing: border-box;\n\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n\n  -ms-flex-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n\n  background-color: rgba(255,255,255,.8);\n  z-index: 99999;\n\n  /*border-bottom: 1px dashed #ddd;*/\n  box-shadow: 0px 2px 10px #ccc;\n}\n\ndoc-header .logo-link {\n  height: 32px;\n  text-decoration: none;\n  color: #333;\n}\n\ndoc-header .icon-link {\n  height: 32px;\n  text-decoration: none;\n  color: #333;\n  margin: 0 8px;\n}\n\ndoc-header .logo-link > * {\n  vertical-align: middle;\n}\n\ndoc-header .logo-link span {\n  font-weight: normal;\n  font-size: 18px;\n  margin-left: 5px;\n}\n\ndoc-header img.logo {\n  height: 32px;\n}\n\ndoc-header ~ div.content {\n  box-sizing: border-box;\n  padding-top: 50px;\n}\n\n@media screen and (min-width: 768px) {\n  doc-header {\n    padding: 0 25px;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "doc-nav {\n  display: none;\n  z-index: 9999;\n}\n\ndoc-nav .doc-nav__content {\n  position: fixed;\n  top: 32px;\n  bottom: 32px;\n  left: 32px;\n  right: 32px;\n  overflow: auto;\n  background-color: rgba(255, 255, 255, 0.9);\n  z-index: 99;\n  box-shadow: 0px 0px 32px rgba(0,0,0,.8);\n}\n\ndoc-nav .doc-nav__overlay {\n  background-color: rgba(0,0,0,.5);\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  z-index: 4;\n  transition-property: opacity;\n  transition-duration: .2s;\n  transition-timing-function: cubic-bezier(.4,0,.2,1);\n}\n\ndoc-nav .doc-nav__header,\ndoc-nav .doc-nav__item {\n  display: block;\n  line-height: 24px;\n  padding: 5px 30px;\n  margin: 0;\n  font-size: 1rem;\n  border-left: 4px solid transparent;\n}\n\ndoc-nav .doc-nav__item.doc-nav--selected {\n  border-left: 4px solid #f50057;\n  color: #f50057;\n}\n\ndoc-nav a {\n  text-decoration: none;\n  color: #333;\n}\n\ndoc-nav .doc-nav__header {\n  font-weight: bold;\n  margin-top: 20px;\n  font-size: .8rem;\n  border-bottom: 1px dashed #ddd;\n}\n\ndoc-nav .doc-nav__close {\n  width: 32px;\n  height: 32px;\n  right: 40px;\n  top: 40px;\n  position: absolute;\n  z-index: 99;\n}\n\ndoc-nav.doc-nav--visible {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 99999;\n}\n\n@media screen and (min-width: 768px) {\n  doc-nav {\n    display: block;\n  }\n\n  doc-nav .doc-nav__overlay {\n    display: none;\n  }\n\n  doc-nav .doc-nav__content {\n    width: 250px;\n    position: relative;\n    top: auto;\n    bottom: auto;\n    left: auto;\n    right: auto;\n    box-shadow: inherit;\n  }\n\n  doc-nav .doc-nav__close,\n  .doc-nav--handle {\n    display: none!important;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".xin-app {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "xin-pager {\n  box-sizing: border-box;\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\n\nxin-pager .xin-view {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ }),
/* 72 */,
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".trans-slide__in-left {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n  display: block!important;\n}\n\n.trans-slide__in-right {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n  display: block!important;\n}\n\n.trans-slide__out-left,\n.trans-slide__out-right {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n  display: block!important;\n}\n\n.trans-slide__animate {\n  will-change: transform, -webkit-transform;\n  -webkit-transition: -webkit-transform ease-out 200ms;\n  transition: transform ease-out 200ms;\n  z-index: 999;\n}\n\n.trans-slide__out {\n  -webkit-transform: translateX(100%);\n  transform: translateX(100%);\n}\n\n.trans-slide__out.trans-slide__out-left {\n  -webkit-transform: translateX(-100%);\n  transform: translateX(-100%);\n}\n\n.trans-slide__in {\n  -webkit-transform: translateX(0);\n  transform: translateX(0);\n}\n\n.trans-fade__in,\n.trans-fade__out {\n  display: block!important;\n  opacity: 0;\n  will-change: opacity;\n  -webkit-transition: opacity ease-in 200ms;\n  transition: opacity ease-in 200ms;\n}\n\n.trans-fade__out {\n  opacity: 1;\n}\n\n.trans-fade__in-animate {\n  opacity: 1;\n}\n\n.trans-fade__out-animate {\n  opacity: 0;\n}\n", ""]);

// exports


/***/ }),
/* 74 */,
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__async__ = __webpack_require__(39);


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

/* harmony default export */ __webpack_exports__["a"] = (Debounce);


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = "<xin-lazy-view-middleware></xin-lazy-view-middleware>\n\n<doc-header class=\"layout horizontal\"></doc-header>\n<div class=\"layout horizontal content\">\n  <doc-nav id=\"nav\"></doc-nav>\n  <xin-pager class=\"flex\">\n    <xin-markdown-view lazy-view uri=\"/\" src-fn=\"return (location.pathname === '/' ? '' : location.pathname) + '/pages/index.md'\" class=\"padding\"></xin-markdown-view>\n    <xin-markdown-view lazy-view uri=\"/pages/[.*]\" src-fn=\"return (location.pathname === '/' ? '' : location.pathname) + window.app.getFragment() + '.md'\" class=\"padding\"></xin-markdown-view>\n  </xin-pager>\n</div>\n";

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<a href=\"#\" class=\"icon-link doc-nav--handle\" (click)=\"showNav(evt)\">\n  <svg width=\"32\" height=\"32\">\n    <path d=\"M4,8 28,8\" stroke=\"#333\" stroke-width=\"3\"/>\n    <path d=\"M4,16 28,16\" stroke=\"#333\" stroke-width=\"3\"/>\n    <path d=\"M4,24 28,24\" stroke=\"#333\" stroke-width=\"3\"/>\n  </svg>\n</a>\n\n<a href=\"#!/\" class=\"logo-link\">\n  <img class=\"logo\" src=\"" + __webpack_require__(95) + "\" alt=\"Xin\">\n  <span>Xin</span>\n</a>\n\n<div class=\"flex\"></div>\n\n<a href=\"https://github.com/xinix-technology/xin\" class=\"icon-link\">\n  <svg aria-hidden=\"true\" class=\"octicon octicon-mark-github\" height=\"32\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"32\">\n    <path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z\"></path>\n  </svg>\n</a>\n";

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = "<div id=\"content\" class=\"doc-nav__content\">\n  <br>\n  <a class=\"doc-nav__item\" href=\"#!/pages/guides/getting-started\">Getting Started</a>\n\n  <h3 class=\"doc-nav__header\"><a href=\"#!/pages/concepts/components\">Concept</a></h3>\n  <a class=\"doc-nav__item\" href=\"#!/pages/concepts/components\">Component</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/concepts/selectors\">Selectors</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/concepts/events\">Events</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/concepts/binding\">Binding</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/concepts/defer\">Defer</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/concepts/helper-functions\">Helper Functions</a>\n\n  <h3 class=\"doc-nav__header\"><a href=\"#!/pages/components/app\">Components</a></h3>\n  <a class=\"doc-nav__item\" href=\"#!/pages/components/app\">App</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/components/for\">For / Repeat</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/components/pager\">Pager</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/components/view\">View</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/components/middleware\">Middleware</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/components/fixture\">Fixture</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/components/xhr\">XHR</a>\n\n  <h3 class=\"doc-nav__header\"><a href=\"#!/pages/views\">Views</a></h3>\n  <a class=\"doc-nav__item\" href=\"#!/pages/views/markdown\">Markdown</a>\n\n  <h3 class=\"doc-nav__header\"><a href=\"#!/pages/middlewares/lazy-view\">Middlewares</a></h3>\n  <a class=\"doc-nav__item\" href=\"#!/pages/middlewares/lazy-view\">Lazy View</a>\n\n  <h3 class=\"doc-nav__header\"><a href=\"#!/pages/advanced\">Advanced</a></h3>\n  <a class=\"doc-nav__item\" href=\"#!/pages/advanced/extends\">Extends</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/advanced/mobile-app\">Mobile App</a>\n  <a class=\"doc-nav__item\" href=\"#!/pages/advanced/pwa\">PWA</a>\n</div>\n\n<div class=\"doc-nav__overlay\" (tap)=\"close(evt)\"></div>\n<a href=\"#\" class=\"doc-nav__close\" (tap)=\"close(evt)\">\n  <svg viewbox=\"0 0 32 32\">\n    <path stroke=\"#333\"\n  fill=\"transparent\"\n  stroke-linecap=\"round\"\n  stroke-width=\"4\" d=\"M 8,8 L 24,24 M 24,8 L 8,24\" />\n  </svg>\n</a>\n\n<!-- <h3 class=\"doc-nav__header\">Resources</h3>\n<a class=\"doc-nav__item\" href=\"https://github.com/xinix-technology/xin\">Github</a> -->\n";

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

/* harmony default export */ __webpack_exports__["a"] = (camelize);


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

/* harmony default export */ __webpack_exports__["a"] = (dashify);


/***/ }),
/* 81 */,
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__val__ = __webpack_require__(83);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__val__["a"]; });





/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = v;
function v (value, ...args) {
  return typeof value === 'function' ? value(...args) : value;
};


/***/ }),
/* 84 */,
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

/* harmony default export */ __webpack_exports__["a"] = (deserialize);


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serialize__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__deserialize__ = __webpack_require__(85);
/* unused harmony reexport serialize */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__deserialize__["a"]; });






/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

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

/* unused harmony default export */ var _unused_webpack_default_export = (serialize);


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./doc-header.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./doc-header.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(69);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./doc-nav.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./doc-nav.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./app.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./app.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./pager.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./pager.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 92 */,
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(73);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./transition-animate.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./transition-animate.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 94 */,
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./img/xin.png";

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./markdown": [
		37,
		3
	],
	"./markdown.js": [
		37,
		3
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 96;

/***/ })
]));
//# sourceMappingURL=0.js.map