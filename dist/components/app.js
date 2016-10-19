webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var xin = __webpack_require__(1);
	
	var App = function (_xin$Component) {
	  _inherits(App, _xin$Component);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	  }
	
	  _createClass(App, [{
	    key: '_titleChanged',
	    value: function _titleChanged(title) {
	      document.title = title;
	    }
	  }, {
	    key: 'created',
	    value: function created() {
	      this.__appSignature = true;
	      this.location = window.location;
	      this.history = window.history;
	
	      // default values
	      this.handlers = [];
	      this.middlewares = [];
	
	      this.__started = false;
	
	      this.addEventListener('route-not-found', function (evt) {
	        console.error('Route not found: ' + evt.detail);
	      });
	
	      // var originalNotify = this.__notify;
	      // this.__notify = function (path, value, oldValue) {
	      //   originalNotify.apply(this, arguments);
	      //   if (path[0] === '$') {
	      //     this.fire('property-sync', {
	      //       property: path,
	      //       value: value,
	      //       oldValue: oldValue,
	      //     });
	      //   }
	      // };
	    }
	  }, {
	    key: '_hashSeparatorChanged',
	    value: function _hashSeparatorChanged(hashSeparator) {
	      this.reHashSeparator = new RegExp(hashSeparator + '(.*)$');
	    }
	  }, {
	    key: 'attached',
	    value: function attached() {
	      this.start();
	    }
	  }, {
	    key: '__isStatic',
	    value: function __isStatic(pattern) {
	      return !pattern.match(/[[{]/);
	    }
	  }, {
	    key: '__routeRegExp',
	    value: function __routeRegExp(str) {
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
	    key: 'route',
	    value: function route(_route, callback) {
	      var routeHandler = {
	        route: _route,
	        type: 's',
	        pattern: null,
	        args: [],
	        callback: callback
	      };
	
	      if (!this.__isStatic(_route)) {
	        routeHandler.type = 'v';
	        var result = this.__routeRegExp(_route);
	        routeHandler.pattern = result[0];
	        routeHandler.args = result[1];
	      }
	
	      this.handlers.push(routeHandler);
	
	      // when app already on starting state but not accomplished yet will try start when one handler pushed
	      if (this.__starting) {
	        this.__starting = false;
	        this.async(this.__tryStart);
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this2 = this;
	
	      this.__starting = true;
	      this.check().then(function (executors) {
	        if (executors.length > 0) {
	          _this2.__starting = false;
	          _this2.__tryStart();
	        }
	      });
	    }
	  }, {
	    key: '__tryStart',
	    value: function __tryStart() {
	      if (this.mode === 'history') {
	        window.addEventListener('popstate', this.checkAndExecute.bind(this), false);
	        document.addEventListener('click', function (evt) {
	          if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {
	            evt.preventDefault();
	            this.history.pushState({
	              url: evt.target.getAttribute('href')
	            }, evt.target.innerHTML, evt.target.href);
	            this.checkAndExecute();
	          }
	        }.bind(this));
	      } else {
	        window.addEventListener('hashchange', this.checkAndExecute.bind(this), false);
	      }
	
	      this.checkAndExecute().then(function () {
	        console.info('Started    ' + this.__getId());
	        this.fire('started');
	        this.__started = true;
	      }.bind(this));
	    }
	  }, {
	    key: 'isStarted',
	    value: function isStarted() {
	      return this.__started || false;
	    }
	  }, {
	    key: 'check',
	    value: function check(fragment) {
	      return new Promise(function (resolve, reject) {
	        try {
	          fragment = fragment || this.getFragment();
	          var running = [];
	          this.handlers.forEach(function (handler) {
	            if (handler.type === 's') {
	              if (fragment === handler.route) {
	                running.push({
	                  handler: handler,
	                  args: {}
	                });
	                return;
	              }
	            } else if (handler.type === 'v') {
	              // matches is unused
	              // var matches = [];
	              var result = fragment.match(handler.pattern);
	              // if (result) {
	              //   matches = result.slice(1);
	              // }
	
	              if (result) {
	                var args = {};
	
	                handler.args.forEach(function (name, index) {
	                  args[name] = result[index + 1];
	                });
	
	                running.push({
	                  handler: handler,
	                  args: args
	                });
	              }
	            }
	          });
	
	          resolve(running);
	        } catch (err) {
	          reject(err);
	        }
	      }.bind(this));
	    }
	  }, {
	    key: 'checkAndExecute',
	    value: function checkAndExecute() {
	      var fragment = this.getFragment();
	
	      return this.check(fragment).then(function (executers) {
	        if (executers.length) {
	          var promise = Promise.resolve();
	          this.middlewares.forEach(function (middleware) {
	            promise = promise.then(function () {
	              return middleware.apply(this);
	            }.bind(this));
	          }.bind(this));
	
	          return promise.then(function () {
	            executers.forEach(function (executer) {
	              executer.handler.callback(executer.args);
	            });
	
	            this.fire('navigated', { uri: fragment });
	            return executers;
	          }.bind(this));
	        }
	
	        this.fire('route-not-found', fragment);
	        return [];
	      }.bind(this)).catch(function (err) {
	        console.error('Uncaught checkAndExecute error, ' + err.stack);
	      });
	    }
	  }, {
	    key: 'navigate',
	    value: function navigate(path, options) {
	      path = path || '/';
	      options = options || {};
	
	      if (this.mode === 'history') {
	        var url = this.rootUri + path.toString().replace(/\/$/, '').replace(/^\//, '');
	        if (this.location.href.replace(this.location.origin, '') !== url) {
	          this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
	          this.checkAndExecute();
	        }
	      } else {
	        this.location.href.match(this.reHashSeparator);
	        this.location.href = this.location.href.replace(this.reHashSeparator, '') + this.hashSeparator + path;
	      }
	      return this;
	    }
	  }, {
	    key: 'use',
	    value: function use(middleware) {
	      this.middlewares.push(middleware);
	    }
	
	    // REMOVED, you can use getFragment()
	    // getURI () {
	    //   if (this.mode === 'hash') {
	    //     return this.location.hash.replace(this.hashSeparator, '') || '/';
	    //   } else {
	    //     throw new Error('Unimplemented getURI from history mode');
	    //   }
	    // },
	
	  }, {
	    key: 'getFragment',
	    value: function getFragment() {
	      var fragment;
	      if (this.mode === 'history') {
	        fragment = decodeURI(this.location.pathname + this.location.search);
	        fragment = fragment.replace(/\?(.*)$/, '');
	        fragment = this.rootUri === '/' ? fragment : fragment.replace(this.rootUri, '');
	      } else {
	        var match = this.location.href.match(this.reHashSeparator);
	        fragment = match ? match[1] : '';
	      }
	
	      return '/' + fragment.toString().replace(/\/$/, '').replace(/^\//, '');
	    }
	  }, {
	    key: '$back',
	    value: function $back(evt) {
	      evt.preventDefault();
	      this.history.back();
	    }
	  }, {
	    key: 'props',
	    get: function get() {
	      return {
	        title: {
	          type: String,
	          value: 'Application',
	          observer: '_titleChanged'
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
	          type: String,
	          value: '#!',
	          observer: '_hashSeparatorChanged'
	        }
	      };
	    }
	  }]);
	
	  return App;
	}(xin.Component);
	
	xin.define('xin-app', App);
	
	xin.App = App;
	
	module.exports = App;

/***/ }
]);
//# sourceMappingURL=app.js.map