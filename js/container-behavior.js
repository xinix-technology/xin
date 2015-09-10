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

  // TODO please write global notify after writing basic notify
  var ContainerBehavior = xin.ContainerBehavior = {
    properties: {
      ref: {
        type: Object,
        readOnly: true,
      }
    },

    created: function() {
      var property = this.getAttribute('ref');
      if (property && property.indexOf('{{$') === 0) {
        this._appProperty = property.slice(2, -2).trim();
        Object.defineProperty(this, 'ref', {
          set: function(value) {
            if (this._app) {
              this._app.set(this._appProperty, value);
            }
          },

          get: function() {
            if (this._app) {
              return this._app.get(this._appProperty);
            }
          }
        });
      }

    },

    attached: function() {
      this._app = xin.Dom(this).parent('.xin-app-behavior');

      if (!this._app) {
        throw new Error('Cannot use ContainerBehavior without AppBehavior scope [' + this.__getId() + ']');
      }

      if (this._appProperty) {
        this._app._bind({
          kind: 'custom',
          mode: '{',
          target: this,
          property: this._appProperty,
          value: 'ref',
          effect: function(value) {
            this._app.fire('property-sync', {
              property: this._appProperty,
              value: value,
            });
          }.bind(this),
        });

        // console.log(this._app._bindings);

        this.__syncProperty = this._syncProperty.bind(this);
        this._app.addEventListener('property-sync', this.__syncProperty);

        var createFn = function(key) {
          return function() {
            this._app[key].apply(this._app, arguments);
          };
        };

        for(var key in this._app) {
          if (key[0] !== '$' || this.hasOwnProperty(key)) continue;
          if (typeof this._app[key] !== 'function') {
            this.set(key, this._app[key]);
          } else if (!this[key]) {
            this[key] = createFn(key);
          }
        }
        // this._app._proxiedFunctions.forEach(function(fnName) {
        //   this[fnName] = function() {
        //     return this._app[fnName].apply(this._app, arguments);
        //   };
        // }.bind(this));

        this.set('ref', this);
      }
    },

    detached: function() {
      this._app._proxiedFunctions.forEach(function(fnName) {
        delete this[fnName];
      }.bind(this));

      this._app.removeEventListener('property-sync', this.__syncProperty);
      delete this.__syncProperty;

      delete this._app;
    },

    _syncProperty: function(evt) {
      this.set(evt.detail.property, evt.detail.value);
    }
  };
})(this);