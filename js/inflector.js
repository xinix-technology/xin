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

  var dashified = {};
  var camelized = {};

  var inflector = {
    camelize: function(dash) {
      var mapped = camelized[dash];
      if (mapped) {
        return mapped;
      }
      if (dash.indexOf('-') < 0) {
        camelized[dash] = dash;
      } else {
        camelized[dash] = dash.replace(/-([a-z])/g,
          function(m) {
            return m[1].toUpperCase();
          }
        );
      }

      return camelized[dash];
    },

    dashify: function(camel) {
      var mapped = dashified[camel];
      if (mapped) {
        return mapped;
      }
      dashified[camel] = camel.replace(/([a-z][A-Z])/g,
        function(g) {
          return g[0] + '-' + g[1].toLowerCase();
        }
      );

      return dashified[camel];
    },
  };

  xin.inflector = inflector;

    return  dashified[camel];
  };

  var repository = {};
  xin.get = function(name) {
    if (repository[name]) {
      return repository[name];
    }

    var nameSplitted = name.split('.');
    var scope = root;
    nameSplitted.find(function(token) {
      scope = scope[token];
      if (!scope) {
        return true;
      }
    });
    return scope;
  };

  xin.put = function(name, value) {
    repository[name] = value
  };

  /**
   * Async
   **/
  var Async = xin.Async = function(context) {
    this.context = context;
    this.handle = null;
  };

  Async.prototype = {
    start: function(callback, wait) {
      wait = wait || 0;

      var context = this.context;
      var boundCallback = function() {
        callback.call(context);
      };
      this.handle = setTimeout(boundCallback, wait);
    },

    cancel: function() {
      clearTimeout(~~this.handle);
    },
  };

  /**
   * Debounce
   **/
  var Debounce = xin.Debounce = function(context, immediate) {
    this.context = context;
    this.immediate = immediate ? true : false;
    this.async = null;
    this.running = false;
  };

  Debounce.prototype = {
    start: function(callback, wait) {
      if (this.immediate) {
        throw new Error('Unimplemented yet!');
      }

      this.running = true;
      this.async = new Async(this.context);
      this.async.start(function() {
        callback.call(this.context);
        this.running = false;
        this.async = null;
      }.bind(this), wait);
    },

    cancel: function() {
      this.running = false;
      this.async.cancel();
      this.async = null;
    },
  };

  xin.Behavior = function(name, behavior) {
    behavior.__name = name;
    xin.put(name, behavior);
    return behavior;
  };

  if (root.xinOptions) {
    for(var i in root.xinOptions) {
      xin.setup(i, root.xinOptions[i]);
    }
  }
})(this);
