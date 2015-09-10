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

  xin.Component({
    is: 'xin-if',

    extends: 'template',

    properties: {
      'if': {
        type: Array,
        observer: '_ifChanged'
      },
    },

    created: function() {
      // avoid unnecessary template xin-if render on scoped template instance
      if (xin.Dom(this).parent('template')) return;

      this.modelProto = new xin.Base();

      // var templateHost = this;
      // var _set = this.rowProto.set;
      // this.rowProto.set = function(name, value) {
      //   switch(name) {
      //     case templateHost.as:
      //     case templateHost.indexAs:
      //       return _set.apply(this, arguments);
      //     default:
      //       var oldValue = this._host.get(name);
      //       return this._host.set(name, value);
      //   }
      // };

      // var _get = this.rowProto.get;
      // this.rowProto.get = function(name) {
      //   switch(name) {
      //     case templateHost.as:
      //     case templateHost.indexAs:
      //       return _get.apply(this, arguments);
      //     default:
      //       return this._host.get(name, value);
      //   }
      // };

      if (!this.content && HTMLTemplateElement.decorate) {
        HTMLTemplateElement.decorate(this);
      }
    },

    _insert: function() {
      var fragment = document.importNode(this.content, true);
      var model = {
        _root: xin.Dom(fragment).childNodes
      };

      model._root.forEach(function(node) {
        node.__model = model;
      });
      Object.setPrototypeOf(model, this.modelProto);

      model._initData();

      model._host = this._parent;

      model._parseAnnotations();

      model._parsePropertyAnnotations();

      xin.Dom(this.parentElement).insertBefore(fragment, this);

      return model;
    },

    _ifChanged: function(iff, oldIff) {
      if (this.model) {
        this.model._children.forEach(function(node) {
          node.parentElement.removeChild(node);
        });
      }

      if (iff) {
        this.model = this._insert();
      }
    }
  });
})(this);