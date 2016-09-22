(function(root) {
  'use strict';

  var xin = root.xin;

  var XIN_DEBUG = xin.setup('debug') || false;

  var AppBehavior = {
    properties: {
      mode: {
        type: String,
        value: 'hash',
      },

      rootUri: {
        type: String,
        value: '/',
      },

      hashSeparator: {
        type: String,
        value: '#!',
        observer: '__hashSeparatorChanged',
      },
    },

    __hashSeparatorChanged: function(hashSeparator) {
      this.reHashSeparator = new RegExp(hashSeparator + '(.*)$');
    },

    created: function() {
      // i dont thing we need to set app to xin.app
      // xin.app = this;

      this.classList.add('xin-app-behavior');

      this.storage = sessionStorage;

      // if location and history are nulls then you are not in browser
      this.location = root.location;
      this.history = root.history;

      // default values
      this.handlers = [];
      this.middlewares = [];

      this.__started = false;

      this.addEventListener('route-not-found', function(evt) {
        root.console.error('Route not found: ' + evt.detail);
      });

      var originalNotify = this.__notify;
      this.__notify = function(path, value, oldValue) {
        originalNotify.apply(this, arguments);
        if (path[0] === '$') {
          this.fire('property-sync', {
            property: path,
            value: value,
            oldValue: oldValue,
          });
        }
      };
    },

    attached: function() {
      this.start();
    },

    __isStatic: function(pattern) {
      return !pattern.match(/[[{]/);
    },

    __routeRegExp: function(str) {
      var chunks = str.split('[');

      if (chunks.length > 2) {
        throw new Error('Invalid use of optional params');
      }

      var tokens = [];
      var re = chunks[0].replace(/{([^}]+)}/g, function(g, token) {
        tokens.push(token);
        return '([^/]+)';
      }).replace(/\//g, '\\/');

      var optRe = '';

      if (chunks[1]) {
        optRe = '(?:' + chunks[1].slice(0, -1).replace(/{([^}]+)}/g, function(g, token) {
          tokens.push(token);
          return '([^/]+)';
        }).replace(/\//g, '\\/') + ')?';
      }
      return [new RegExp('^' + re + optRe + '$'), tokens];
    },

    route: function(route, callback) {
      var routeHandler = {
        route: route,
        type: 's',
        pattern: null,
        args: [],
        callback: callback,
      };

      if (!this.__isStatic(route)) {
        routeHandler.type = 'v';
        var result = this.__routeRegExp(route);
        routeHandler.pattern = result[0];
        routeHandler.args = result[1];
      }

      this.handlers.push(routeHandler);

      // when app already on starting state but not accomplished yet will try start when one handler pushed
      if (this.__starting) {
        this.__starting = false;
        this.async(this.__tryStart);
      }
    },

    start: function() {
      this.__starting = true;
      this.check().then(function(executors) {
        if (executors.length > 0) {
          this.__starting = false;
          this.__tryStart();
        }
      }.bind(this));
    },

    __tryStart: function() {
      if (this.mode === 'history') {
        window.addEventListener('popstate', this.checkAndExecute.bind(this), false);
        document.addEventListener('click', function(evt) {
          if (!evt.defaultPrevented && evt.target.nodeName === 'A' && evt.target.target === '') {
            evt.preventDefault();
            this.history.pushState({
              url: evt.target.getAttribute('href'),
            }, evt.target.innerHTML, evt.target.href);
            this.checkAndExecute();
          }
        }.bind(this));
      } else {
        window.addEventListener('hashchange', this.checkAndExecute.bind(this), false);
      }

      this.checkAndExecute()
        .then(function() {
          if (XIN_DEBUG) {
            root.console.info('Started    ' + this.__getId());
          }
          this.fire('started');
          this.__started = true;
        }.bind(this));
    },

    isStarted: function() {
      return this.__started || false;
    },

    check: function(fragment) {
      return new Promise(function(resolve, reject) {
        try {
          fragment = fragment || this.getFragment();
          var running = [];
          this.handlers.forEach(function(handler) {
            if (handler.type === 's') {
              if (fragment === handler.route) {
                running.push({
                  handler: handler,
                  args: {},
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

                handler.args.forEach(function(name, index) {
                  args[name] = result[index + 1];
                });

                running.push({
                  handler: handler,
                  args: args,
                });
              }
            }
          });

          resolve(running);
        } catch (err) {
          reject(err);
        }
      }.bind(this));
    },

    checkAndExecute: function() {
      var fragment = this.getFragment();

      return this.check(fragment)
        .then(function(executers) {
          if (executers.length) {
            var promise = Promise.resolve();
            this.middlewares.forEach(function(middleware) {
              promise = promise.then(function() {
                return middleware.apply(this);
              }.bind(this));
            }.bind(this));

            return promise.then(function() {
              executers.forEach(function(executer) {
                executer.handler.callback(executer.args);
              });

              this.fire('navigated', {uri: fragment});
              return executers;
            }.bind(this));
          }

          this.fire('route-not-found', fragment);
          return [];
        }.bind(this))
        .catch(function(err) {
          root.console.error('Uncaught checkAndExecute error, ' + err.message);
        });
    },

    navigate: function(path, options) {
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
    },

    use: function(middleware) {
      this.middlewares.push(middleware);
    },

    // REMOVED, you can use getFragment()
    // getURI: function () {
    //   if (this.mode === 'hash') {
    //     return this.location.hash.replace(this.hashSeparator, '') || '/';
    //   } else {
    //     throw new Error('Unimplemented getURI from history mode');
    //   }
    // },

    getFragment: function() {
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
    },

    $back: function(evt) {
      evt.preventDefault();
      this.history.back();
    },
  };

  xin.AppBehavior = xin.createBehavior('xin.AppBehavior', AppBehavior);
}(this));
