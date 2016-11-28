webpackJsonp([2],{

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_helper__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "default", function() { return __WEBPACK_IMPORTED_MODULE_0_event_helper__["a"]; });



/***/ },

/***/ 14:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Route = function () {
  _createClass(Route, null, [{
    key: 'routeRegExp',
    value: function routeRegExp(str) {
      var chunks = str.split('[');

      if (chunks.length > 2) {
        throw new Error('Invalid use of optional params');
      }

      var tokens = [];
      var re = chunks[0].replace(/{([^}]+)}/g, function (g, token) {
        tokens.push(token);
        return '([^/]+)';
      }).replace(/\//g, '\\/');

      var optRe = '';

      if (chunks[1]) {
        optRe = '(?:' + chunks[1].slice(0, -1).replace(/{([^}]+)}/g, function (g, token) {
          tokens.push(token);
          return '([^/]+)';
        }).replace(/\//g, '\\/') + ')?';
      }
      return [new RegExp('^' + re + optRe + '$'), tokens];
    }
  }, {
    key: 'isStatic',
    value: function isStatic(pattern) {
      return !pattern.match(/[[{]/);
    }
  }]);

  function Route(route, callback) {
    _classCallCheck(this, Route);

    this.route = route;
    this.callback = callback;

    if (Route.isStatic(route)) {
      this.type = 's';
      this.pattern = null;
      this.args = [];
    } else {
      var result = Route.routeRegExp(route);
      this.type = 'v';
      this.pattern = result[0];
      this.args = result[1];
    }
  }

  _createClass(Route, [{
    key: 'getExecutorFor',
    value: function getExecutorFor(fragment) {
      var _this = this;

      if (this.type === 's') {
        if (fragment === this.route) {
          return { handler: this, args: {} };
        }
      } else if (this.type === 'v') {
        var _ret = function () {
          var result = fragment.match(_this.pattern);
          if (result) {
            return {
              v: {
                handler: _this,
                args: _this.args.reduce(function (args, name, index) {
                  args[name] = result[index + 1];
                  return args;
                }, {})
              }
            };
          }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    }
  }]);

  return Route;
}();

exports.default = Route;

/***/ },

/***/ 17:
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

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = __webpack_require__(0);

var _2 = _interopRequireDefault(_);

var _event = __webpack_require__(13);

var _event2 = _interopRequireDefault(_event);

var _route2 = __webpack_require__(14);

var _route3 = _interopRequireDefault(_route2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_xin$Component) {
  _inherits(App, _xin$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'notFound',
    value: function notFound(fragment) {
      console.warn('Route not found: ' + fragment);
    }
  }, {
    key: '_titleChanged',
    value: function _titleChanged(title) {
      document.title = title;
    }
  }, {
    key: 'created',
    value: function created() {
      _2.default.put('app', this);

      this.__appSignature = true;
      this.location = window.location;
      this.history = window.history;

      // default values
      this.handlers = [];
      this.middlewares = [];

      this.__started = false;
      this.__starting = false;
    }
  }, {
    key: 'attached',
    value: function attached() {
      var _this2 = this;

      if (!this.manual) {
        this.async(function () {
          _this2.start();
        });
      }
    }
  }, {
    key: 'route',
    value: function route(_route, callback) {
      this.handlers.push(new _route3.default(_route, callback));
    }
  }, {
    key: 'start',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var executed;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.__started || this.__starting)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return');

              case 2:

                this.__middlewareChainRun = compose(this.middlewares);

                this.__listenNavigation();

                console.info('Starting ' + this.is + ':' + this.__id + ' ...');

                this.__starting = true;
                _context.next = 8;
                return this.__execute();

              case 8:
                executed = _context.sent;

                this.__starting = false;

                if (executed) {
                  console.info('Started ' + this.is + ':' + this.__id);

                  this.__started = true;

                  this.fire('started');
                }

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: '__listenNavigation',
    value: function __listenNavigation() {
      var _this3 = this;

      var callback = function callback() {
        _this3.__execute();
      };

      if (this.mode === 'history') {
        (0, _event2.default)(window).on('popstate', callback);
        (0, _event2.default)(document).on('click', function (evt) {
          if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {
            evt.preventDefault();

            var state = { url: evt.target.getAttribute('href') };
            _this3.history.pushState(state, evt.target.innerHTML, evt.target.href);

            callback();
          }
        });
      } else {
        (0, _event2.default)(window).on('hashchange', callback);
      }
    }
  }, {
    key: 'getFragmentExecutors',
    value: function getFragmentExecutors(fragment) {
      return this.handlers.reduce(function (executors, handler) {
        var executor = handler.getExecutorFor(fragment);
        if (executor) executors.push(executor);
        return executors;
      }, []);
    }
  }, {
    key: '__execute',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _this4 = this;

        var fragment, context, willContinue;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fragment = this.getFragment();
                context = { app: this, uri: fragment };

                // run middleware chain then execute all executors

                _context2.next = 4;
                return this.__middlewareChainRun(context, function () {
                  var executors = _this4.getFragmentExecutors(context.uri);
                  if (executors.length === 0) {
                    _this4.notFound(fragment);
                    _this4.fire('route-not-found', fragment);
                    return;
                  }

                  executors.forEach(function (executor) {
                    executor.handler.callback(executor.args, context);
                  });
                });

              case 4:
                willContinue = _context2.sent;

                if (!(willContinue === false)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return', false);

              case 7:

                this.fire('navigated', context);
                return _context2.abrupt('return', true);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function __execute() {
        return _ref2.apply(this, arguments);
      }

      return __execute;
    }()
  }, {
    key: 'navigate',
    value: function navigate(path, options) {
      path = path || '/';
      options = options || {};

      if (this.mode === 'history') {
        var url = this.rootUri + path.toString().replace(/\/$/, '').replace(/^\//, '');
        if (this.location.href.replace(this.location.origin, '') !== url) {
          this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
          this.__execute();
        }
      } else {
        this.location.hash = this.hash + path;
      }
      return this;
    }
  }, {
    key: 'use',
    value: function use(middleware) {
      this.middlewares.push(middleware);
    }
  }, {
    key: 'getFragment',
    value: function getFragment() {
      try {
        var fragment = void 0;
        if (this.mode === 'history') {
          fragment = decodeURI(this.location.pathname + this.location.search);
          fragment = fragment.replace(/\?(.*)$/, '');
          fragment = this.rootUri === '/' ? fragment : fragment.replace(this.rootUri, '');
        } else {
          var match = this.location.href.match(this.hashRegexp);
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

  }, {
    key: 'props',
    get: function get() {
      return {
        docTitle: {
          type: String,
          value: 'Application',
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
        }
      };
    }
  }, {
    key: 'hashRegexp',
    get: function get() {
      if (!this._hashRegexp || this._hash !== this.hash) {
        this._hashRegexp = new RegExp(this.hash + '(.*)$');
        this._hash = this.hash;
      }

      return this._hashRegexp;
    }
  }, {
    key: 'started',
    get: function get() {
      return this.__started || false;
    }
  }]);

  return App;
}(_2.default.Component);

_2.default.define('xin-app', App);

function compose(middlewares) {
  var _this5 = this;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = middlewares[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var fn = _step.value;

      if (typeof fn !== 'function') {
        throw new TypeError('Middleware must be composed of functions!');
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(context, next) {
      var dispatch = function () {
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(i) {
          var fn;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(i <= index)) {
                    _context3.next = 2;
                    break;
                  }

                  throw new Error('next() called multiple times');

                case 2:

                  index = i;
                  fn = middlewares[i];

                  if (i === middlewares.length) {
                    fn = next;
                  }

                  if (fn) {
                    _context3.next = 7;
                    break;
                  }

                  return _context3.abrupt('return');

                case 7:
                  _context3.next = 9;
                  return fn(context, function () {
                    return dispatch(i + 1);
                  });

                case 9:
                  return _context3.abrupt('return', _context3.sent);

                case 10:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        return function dispatch(_x3) {
          return _ref4.apply(this, arguments);
        };
      }();

      var index;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // last called middlewares #
              index = -1;
              return _context4.abrupt('return', dispatch(0));

            case 2:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this5);
    }));

    return function (_x, _x2) {
      return _ref3.apply(this, arguments);
    };
  }();
}

exports.default = App;

/***/ }

},[35]);
//# sourceMappingURL=app.js.map