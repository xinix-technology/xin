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

(function(root, factory) {
  'use strict';

  root.xin = root.xin || {};
  root.xin.App = factory(root, root.xin);

})(this, function(root, xin) {
  'use strict';

  var inherits = function(ctor, superCtor) {
    if (!superCtor) return;

    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };

  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  var addEventListener = window.addEventListener || function (eventName, listener) {
    return attachEvent('on' + eventName, listener);
  };

  var App = function(options) {
    if (!(this instanceof App)) return new App(options);

    // if location and history are nulls then you are not in browser
    this.location = root.location;
    this.history = root.history;

    // default values
    this.mode = 'hash';
    this.hashSeparator = '#!';
    this.rootUri = '/';
    this.handlers = [];
    this.middlewares = [];

    options = options || {
      el: document.body
    };

    if (options instanceof HTMLElement) {
      options = {
        el: options
      };
    }

    // mixin options to app instance
    for(var i in options) {
      this[i] = options[i];
    }

    if (xin.EventEmitter) {
      this.on('*', function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift('event:');
        console.log.apply(console, args);
      });
    }
  };

  if (xin.EventEmitter) {
    inherits(App, xin.EventEmitter);
  }

  App.prototype._routeToRegExp = function(route) {
    route = route.replace(escapeRegExp, '\\$&')
      .replace(optionalParam, '(?:$1)?')
      .replace(namedParam, function(match, optional) {
        return optional ? match : '([^/?]+)';
      })
      .replace(splatParam, '([^?]*?)');
    return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
  };

  App.prototype.route = function(route, callback) {
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
  };

  App.prototype.getFragment = function() {
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
  };

  App.prototype.start = function() {

    this.reHashSeparator = new RegExp(this.hashSeparator + '(.*)$');

    if (this.mode === 'history') {
      window.addEventListener('popstate', this.checkAndExecute.bind(this), false);
    } else {
      window.addEventListener('hashchange', this.checkAndExecute.bind(this), false);
    }

    this.el.addEventListener('click', function(evt) {
      var target = evt.target;
      var realTarget = target;
      while(realTarget.nodeName !== 'A' && realTarget !== this.el) {
        realTarget = realTarget.parentElement;
      }

      if (realTarget.nodeName !== 'A') {
        return;
      }

      if (this.mode === 'hash' && realTarget.getAttribute('href')[0] === '#') {
        return;
      }

      var href = realTarget.href,
        rootUrl = location.origin + this.rootUri,
        uri;

      if (href.indexOf(rootUrl) === 0) {
        uri = '/' + href.substr(rootUrl.length);
      } else {
        uri = '/_/' + href;
      }

      this.navigate(uri);

      evt.preventDefault();

    }.bind(this));

    this.checkAndExecute();
  };

  App.prototype.check = function(fragment) {
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
  };

  App.prototype.checkAndExecute = function() {
    var fragment = this.getFragment();

    return this.check(fragment)
      .then(function(executers) {
        if (executers.length) {
          var promise = Promise.resolve();
          this.middlewares.forEach(function(middleware) {
            promise.then(function() {
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
          this.emit('not-found', fragment);
          return [];
        }
      }.bind(this));
  };

  App.prototype.navigate = function(path, options) {
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
  };

  App.prototype.use = function(middleware) {
    this.middlewares.push(middleware);
  };

  return App;
});