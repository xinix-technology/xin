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

  var XIN_DEBUG = root.XIN_DEBUG;

  var ViewBehaviorImpl = {
    properties: {
      uri: {
        type: String,
        required: true
      }
    },

    listeners: {
      'focusing': '_focusing',
      'focus': '_focused',
      'blur': '_blurred',
    },

    created: function() {
      this.classList.add('xin-view-behavior');
    },

    attached: function() {
      this.classList.remove('xin-view-focus');
      this.classList.remove('xin-view-visible');

      if (this.parentElement.add) {
        this.parentElement.add(this);
      }

      // this.async(function() {
        this._parameterNames = (this.uri.match(/((\(\?)?:\w+|\*\w+)/g) || []).map(function(param) {
          return param.substr(1);
        });

        // this.log('routed', this.uri);
        this._app.route(this.uri, this.focus.bind(this));
        this.fire('routed');
      // });
    },

    _focusing: function() {
      if (XIN_DEBUG) {
        console.info('Focusing   ' + this.__getId());
      }

      if (typeof this.focusing === 'function') {
        return this.focusing.apply(this, arguments);
      }
    },

    _focused: function() {
      if (XIN_DEBUG) {
        console.info('Focused    ' + this.__getId());
      }

      if (typeof this.focused === 'function') {
        return this.focused.apply(this, arguments);
      }
    },

    focus: function() {
      var args = arguments;
      var parameters = {};
      this._parameterNames.forEach(function(name, index) {
        // console.log(arguments, index, arguments[index])
        parameters[name] = args[index];
      });
      this.set('parameters', parameters);

      this.fire('focusing');

      if (this.parentElement.setFocus) {
        this.parentElement.setFocus(this);
      } else {
        xin.Dom(this.parentElement).children.forEach(function(element) {
          element.setFocus(false);
          element.setVisible(false);
        });

        this.setFocus(true);
        this.setVisible(true);
      }
    },

    _blurred: function() {
      if (typeof this.blurred === 'function') {
        return this.blurred.apply(this, arguments);
      }
    },

    setVisible: function(visible) {
      this.classList[visible ? 'add' : 'remove']('xin-view-visible');

      this.fire(visible ? 'show' : 'hide');
    },

    setFocus: function(focus) {
      this.classList[focus ? 'add' : 'remove']('xin-view-focus');

      this.fire(focus ? 'focus' : 'blur');
    },
  };

  xin.ViewBehavior = [xin.ContainerBehavior, ViewBehaviorImpl];
})(this);