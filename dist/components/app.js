webpackJsonp([2],{

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

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
        tokens.push(token);
        return '([^/]+)';
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

/* harmony default export */ exports["a"] = Route;

/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_event_helper__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0_event_helper__["a"]; });


/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_route__ = __webpack_require__(16);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






class App extends __WEBPACK_IMPORTED_MODULE_0____["default"].Component {
  get props() {
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

  get hashRegexp() {
    if (!this._hashRegexp || this._hash !== this.hash) {
      this._hashRegexp = new RegExp(`${ this.hash }(.*)$`);
      this._hash = this.hash;
    }

    return this._hashRegexp;
  }

  notFound(fragment) {
    console.warn(`Route not found: ${ fragment }`);
  }

  _titleChanged(title) {
    document.title = title;
  }

  created() {
    __WEBPACK_IMPORTED_MODULE_0____["default"].put('app', this);

    this.__appSignature = true;
    this.location = window.location;
    this.history = window.history;

    // default values
    this.handlers = [];
    this.middlewares = [];

    this.__started = false;
    this.__starting = false;
  }

  attached() {
    if (!this.manual) {
      this.async(() => {
        this.start();
      });
    }
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

      console.info(`Starting ${ _this.is }:${ _this.__id } ...`);

      _this.__starting = true;
      let executed = yield _this.__execute();
      _this.__starting = false;

      if (executed) {
        console.info(`Started ${ _this.is }:${ _this.__id }`);

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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__event__["a" /* default */])(window).on('popstate', callback);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__event__["a" /* default */])(document).on('click', evt => {
        if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {
          evt.preventDefault();

          let state = { url: evt.target.getAttribute('href') };
          this.history.pushState(state, evt.target.innerHTML, evt.target.href);

          callback();
        }
      });
    } else {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__event__["a" /* default */])(window).on('hashchange', callback);
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

__WEBPACK_IMPORTED_MODULE_0____["default"].define('xin-app', App);

function compose(middlewares) {
  for (let fn of middlewares) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware must be composed of functions!');
    }
  }

  return (() => {
    var _ref = _asyncToGenerator(function* (context, next) {
      let dispatch = (() => {
        var _ref2 = _asyncToGenerator(function* (i) {
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

        return function dispatch(_x3) {
          return _ref2.apply(this, arguments);
        };
      })();

      // last called middlewares #
      let index = -1;

      return dispatch(0);
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })();
}

/* harmony default export */ exports["default"] = App;

/***/ }

},[37]);
//# sourceMappingURL=app.js.map