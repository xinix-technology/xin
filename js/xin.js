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

  // when xin already defined stop there to avoid multiple xin object declaration
  /* istanbul ignore if  */
  if (undefined !== root.xin) {
    console.warn('xin already exists, please check your script order.');
    return;
  }

  /**
   * Repository to put xin elements or data
   * @type {Object}
   */
  const repository = {};

  /**
   * Global options
   * @type {Object}
   */
  const options = {};

  /**
   * Get xin element by its id or data from repository by its name
   * @param  {mixed} id When id is number get xin element otherwise get data from repository
   * @return {mixed} object
   */
  function xin(id) {
    if (!isNaN(id)) {
      return repository[id];
    }

    if (repository[id]) {
      return repository[id];
    }

    var idSplitted = id.split('.');
    var scope = root;
    idSplitted.find(function(token) {
      scope = scope[token];
      return !scope;
    });

    return scope;
  }

  /**
   * Clean repository from already putted data
   * @return {void} void
   */
  xin.clean = function() {
    for (var i in repository) {
      repository[i] = null;
    }
  };

  /**
   * Put data to repository with specified id
   * @param  {mixed} id     id
   * @param  {mixed} value  value to put
   * @return {void} void
   */
  xin.put = function(id, value) {
    repository[id] = value;
  };

  // i dont thing we need to set app to xin.app
  // /**
  // * Default application instance
  // * @type {object}
  // */
  // xin.app = null;

  // REMOVED
  // xin.clone = function(obj) {
  //   var newObj = {};
  //   for (var i in obj) {
  //     if ({}.hasOwnProperty.call(obj, i)) {
  //       newObj = obj;
  //     }
  //   }
  //   return newObj;
  // };

  xin.setup = function(key, value) {
    switch (arguments.length) {
      case 0:
        return options;
      case 1:
        return options[key] || undefined;
      default:
        options[key] = value;
    }
  };

  xin.defaults = function(values, defaultValues) {
    for (var i in defaultValues) {
      if (typeof values[i] === 'undefined') {
        values[i] = defaultValues[i];
      }
    }
    return values;
  };

  xin.$$ = function(selector) {
    return document.querySelector(selector);
  };

  xin.v = function(value) {
    return typeof value === 'function' ? value() : value;
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
      if (typeof callback !== 'function') {
        throw new Error('Async should specify function');
      }

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
    this.immediate = Boolean(immediate);
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

  xin.createBehavior = function(name, behavior) {
    behavior.__name = name;
    xin.put(name, behavior);
    return behavior;
  };

  // DEPRECATED xin.Behavior
  xin.Behavior = xin.createBehavior;

  if (root.xinOptions) {
    for (var i in root.xinOptions) {
      if ({}.hasOwnProperty.call(root.xinOptions, i)) {
        xin.setup(i, root.xinOptions[i]);
      }
    }
  }

  /**
   * published xin
   * @type {object}
   */
  root.xin = xin;
})(this);
