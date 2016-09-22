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

  xin.createComponent({
    is: 'xin-if',

    extends: 'template',

    properties: {
      if: {
        type: Array,
        observer: '__ifChanged',
      },
    },

    created: function() {
      // avoid unnecessary template xin-if render on scoped template instance
      if (xin.dom(this).parent('template')) {
        return;
      }

      this.modelProto = new xin.Base();

      // var templateHost = this;
      // var __set = this.rowProto.set;
      // this.rowProto.set = function(name, value) {
      //   switch(name) {
      //     case templateHost.as:
      //     case templateHost.indexAs:
      //       return __set.apply(this, arguments);
      //     default:
      //       var oldValue = this.__host.get(name);
      //       return this.__host.set(name, value);
      //   }
      // };

      // var __get = this.rowProto.get;
      // this.rowProto.get = function(name) {
      //   switch(name) {
      //     case templateHost.as:
      //     case templateHost.indexAs:
      //       return __get.apply(this, arguments);
      //     default:
      //       return this.__host.get(name, value);
      //   }
      // };

      if (!this.content && HTMLTemplateElement.decorate) {
        HTMLTemplateElement.decorate(this);
      }
    },

    __insert: function() {
      var fragment = document.importNode(this.content, true);
      var model = {
        __root: xin.dom(fragment).childNodes,
      };

      model.__root.forEach(function(node) {
        node.__model = model;
      });
      Object.setPrototypeOf(model, this.modelProto);

      model.__initialize();

      model.__host = this.__parent;

      model.__parseAnnotations();

      // model.__parsePropertyAnnotations();

      xin.dom(this.parentElement).insertBefore(fragment, this);

      return model;
    },

    __ifChanged: function(iff/* , oldIff */) {
      if (this.model) {
        this.model.__children.forEach(function(node) {
          node.parentElement.removeChild(node);
        });
      }

      if (iff) {
        this.model = this.__insert();
      }
    },
  });
})(this);
