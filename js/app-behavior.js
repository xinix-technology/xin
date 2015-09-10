/**
 * Copyright (c) 2015 Xinix Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

(function(root) {
  'use strict';

  var xin = root.xin;

  var XIN_DEBUG = root.XIN_DEBUG || false;

  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  var AppBehavior = xin.AppBehavior = {

    created: function() {
      // console.log('created on app-behavior');
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

      this.addEventListener('route-not-found', function(evt) {
        console.error('Route not found: ' + evt.detail);
      });
    },

    attached: function() {
      this.async(function() {
        this.start();
      });
    },

    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
        .replace(optionalParam, '(?:$1)?')
        .replace(namedParam, function(match, optional) {
          return optional ? match : '([^/?]+)';
        })
        .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    route: function(route, callback) {
      var re;
      if (route instanceof RegExp) {
        re = route;
      } else {
        re = this._routeToRegExp(route);
      }
      this.handlers.push({
        re: re,
        route: route,
        callback: callback
      });
    },

    start: function() {

      this.reHashSeparator = new RegExp(this.hashSeparator + '(.*)$');

      if (this.mode === 'history') {
        window.addEventListener('popstate', this.checkAndExecute.bind(this), false);
      } else {
        window.addEventListener('hashchange', this.checkAndExecute.bind(this), false);
      }

      this.addEventListener('click', function(evt) {
        var target = evt.target;

        var realTarget = (target === this.element) ? target : xin.Dom(target).parent('a');

        if (!realTarget) {
          return;
        }

        if (this.mode === 'hash' && realTarget.getAttribute('href')[0] === '#') {
          return;
        }

        evt.preventDefault();

        var href = realTarget.href,
          rootUrl = location.origin + this.rootUri,
          uri;

        if (href.indexOf(rootUrl) === 0) {
          uri = '/' + href.substr(rootUrl.length);
        } else {
          uri = '/_/' + href;
        }

        this.navigate(uri);
      }.bind(this));

      this.checkAndExecute().then(function() {
        if (XIN_DEBUG) {
          console.info('Started    ' + this.__getId());
        }
        this.fire('started');
      }.bind(this));
    },

    check: function(fragment) {
      return new Promise(function(resolve, reject) {
        try {
          fragment = fragment || this.getFragment();

          var running = [];
          this.handlers.forEach(function(handler) {
            var matches = fragment.match(handler.re);
            if (matches) {
              matches.shift();

              running.push({
                handler: handler,
                args: matches
              });
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
                executer.handler.callback.apply(this, executer.args);
              }.bind(this));

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