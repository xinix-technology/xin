webpackJsonp([2],{

/***/ 11:
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

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _src = __webpack_require__(0);

var _src2 = _interopRequireDefault(_src);

var _route2 = __webpack_require__(11);

var _route3 = _interopRequireDefault(_route2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const NOOP = () => {};

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
      _src2.default.put('app', this);

      // this.classList.add('xin-app');

      this.__appSignature = true;
      this.location = window.location;
      this.history = window.history;

      // default values
      this.handlers = [];
      this.middlewares = [];

      // this.__awaitRouteCallback = NOOP;
      this.__started = false;
      this.__starting = false;
    }
  }, {
    key: 'attached',
    value: function attached() {
      var _this2 = this;

      if (!this.manual) {
        this.async(function () {
          // this.__availableUris = [].map.call(this.querySelectorAll('.xin-view'), el => el.uri);
          _this2.start();
        });
      }
    }
  }, {
    key: 'route',
    value: function route(_route, callback) {
      this.handlers.push(new _route3.default(_route, callback));
      // this.__awaitRouteCallback(this.getFragmentExecutors(this.getFragment()));
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
        _src2.default.event(window).on('popstate', callback);
        _src2.default.event(document).on('click', function (evt) {
          if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {
            evt.preventDefault();

            var state = { url: evt.target.getAttribute('href') };
            _this3.history.pushState(state, evt.target.innerHTML, evt.target.href);

            callback();
          }
        });
      } else {
        _src2.default.event(window).on('hashchange', callback);
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

    // __waitForRoute () {
    //   return new Promise((resolve, reject) => {
    //     this.__awaitRouteCallback = (executors) => {
    //       if (executors.length === 0) {
    //         return;
    //       }
    //
    //       this.__awaitRouteCallback = NOOP;
    //       resolve(executors);
    //     };
    //   });
    // }

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
                    // if (this.__availableUris.indexOf(fragment) === -1) {
                    // }
                    // executors = await this.__waitForRoute();
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
        this.location.href.match(this.hashSeparator);
        this.location.href = this.location.href.replace(this.hashSeparator, '') + this.hashSeparator + path;
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
          var match = this.location.href.match(this.hashSeparator);
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

        hashSeparator: {
          type: RegExp,
          value: function value() {
            return (/#!(.*)$/
            );
          }
        }
      };
    }
  }, {
    key: 'started',
    get: function get() {
      return this.__started || false;
    }
  }]);

  return App;
}(_src2.default.Component);

_src2.default.define('xin-app', App);

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

// xin.App = App;
exports.default = App;

/***/ }

},[28]);
//# sourceMappingURL=app.js.map