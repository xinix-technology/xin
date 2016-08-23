(function(root) {
  'use strict';

  var xin = root.xin;

  var XIN_DEBUG = xin.setup('debug') || false;

  var AppBehavior = xin.AppBehavior = {
    properties: {
      mode: {
        type: String,
        value: 'hash',
      },
    },

    created: function() {
      xin.app = this;

      this.classList.add('xin-app-behavior');

      this.storage = sessionStorage;

      // if location and history are nulls then you are not in browser
      this.location = root.location;
      this.history = root.history;

      // default values
      this.mode = 'hash';
      this.hashSeparator = '#!';
      this.rootUri = '/';
      this.handlers = [];
      this.middlewares = [];

      this._started = false;

      this.addEventListener('route-not-found', function(evt) {
        console.error('Route not found: ' + evt.detail);
      });
    },

    attached: function() {
      this.async(function() {
        this.start();
      });
    },

    _isStatic: function(pattern) {
      return pattern.match(/[[{]/) ? false: true;
    },

    _routeRegExp: function(str) {
      var chunks = str.split('[');

      if(chunks.length > 2) {
        throw new Error('Invalid use of optional params');
      }

      var tokens = [];
      var re = chunks[0].replace(/{([^}]+)}/g, function(g, token) {
        tokens.push(token);
        return '([^\/]+)';
      }).replace(/\//g, '\\/');

      var optRe = '';

			if (chunks[1]) {
        optRe = '(?:' + chunks[1].slice(0, -1).replace(/{([^}]+)}/g, function(g, token) {
          tokens.push(token);
          return '([^\/]+)';
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
      if (!this._isStatic(route)) {
        routeHandler.type = 'v';
        var result = this._routeRegExp(route);
        routeHandler.pattern = result[0];
        routeHandler.args = result[1];
      }

      this.handlers.push(routeHandler);
    },

    start: function() {
      this.reHashSeparator = new RegExp(this.hashSeparator + '(.*)$');

      if (this.mode === 'history') {
        window.addEventListener('popstate', this.checkAndExecute.bind(this), false);
        document.addEventListener('click', function(evt) {
          if (!evt.defaultPrevented && evt.target.nodeName === 'A') {
            evt.preventDefault();
            history.pushState({
              url: evt.target.getAttribute('href')
            }, evt.target.innerHTML, evt.target.href);
            this.checkAndExecute();
          }
        }.bind(this));
      } else {
        window.addEventListener('hashchange', this.checkAndExecute.bind(this), false);
      }

      this.checkAndExecute().then(function() {
        if (XIN_DEBUG) {
          console.info('Started    ' + this.__getId());
        }
        this.fire('started');
        this._started = true;
      }.bind(this));
    },

    isStarted: function() {
      return this._started || false;
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
              var matches = [];
              var result = fragment.match(handler.pattern);
              if (result) {
                matches = result.slice(1)
              }

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
        } catch(e) {
          reject(e);
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
              }.bind(this));

              this.fire('navigated', {uri:fragment});
              return executers;
            }.bind(this));
          } else {
            this.fire('route-not-found', fragment);
            return [];
          }
        }.bind(this))
        .catch(function(err) {
          console.error('app-behavior> ' + err.message);
        });
    },

    navigate: function(path, options) {
      path = path || '/';
      options = options || {};

      if(this.mode === 'history') {
        var url = this.rootUri + path.toString().replace(/\/$/, '').replace(/^\//, '');
        if (this.location.href.replace(this.location.origin, '') !== url) {
          this.history[options.replace ? 'replaceState': 'pushState']({}, document.title, url);
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

    getURI: function() {
      if (this.mode === 'hash') {
        return location.hash.replace(this.hashSeparator, '') || '/';
      } else {
        throw new Error('Unimplemented getURI from history mode');
      }
    },

    getFragment: function() {
      var fragment;
      if(this.mode === 'history') {
          fragment = decodeURI(this.location.pathname + this.location.search);
          fragment = fragment.replace(/\?(.*)$/, '');
          fragment = this.rootUri != '/' ? fragment.replace(this.rootUri, '') : fragment;
      } else {
          var match = this.location.href.match(this.reHashSeparator);
          fragment = match ? match[1] : '';
      }
      return '/' + fragment.toString().replace(/\/$/, '').replace(/^\//, '');
    },

    $back: function(evt) {
      history.back();
    },
  };
})(this);
