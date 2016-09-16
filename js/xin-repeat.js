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
    is: 'xin-repeat',

    extends: 'template',

    properties: {
      items: {
        type: Array,
        observer: '__itemsChanged'
      },

      as: {
        type: String,
        value: 'item',
      },

      indexAs: {
        type: String,
        value: 'index',
      },
    },

    created: function() {
      // TODO do we still need this chunk?
      // avoid unnecessary template xin-repeat render on scoped template instance
      // if (xin.Dom(this).parent('template')) return;

      this.rowProto = new xin.Base();

      var templateHost = this;
      var __set = this.rowProto.set;
      this.rowProto.set = function(name, value) {
        var nameSegments = name.split('.');
        switch(nameSegments[0]) {
          case templateHost.as:
          case templateHost.indexAs:
            return __set.apply(this, arguments);
          default:
            // var oldValue = this.__host.get(name);
            return this.__host.set(name, value);
        }
      };

      var __get = this.rowProto.get;
      this.rowProto.get = function(name) {
        var nameSegments = name.split('.');
        switch(nameSegments[0]) {
          case templateHost.as:
          case templateHost.indexAs:
            return __get.apply(this, arguments);
          default:
            return this.__host.get(name, value);
        }
      };

      if (!this.content && HTMLTemplateElement.decorate) {
        HTMLTemplateElement.decorate(this);
      }

      // Row is class to create new row
      var self = this;
      this.Row = function(item, index) {
        var row = this;
        var fragment = document.importNode(self.content, true);
        this.__root = xin.Dom(fragment).childNodes.map(function(node) {
          node.__model = row;
          node.__index = index;
          node.__item = item;
          return node;
        });

        this.__initialize();

        this.__host = self.__parent;

        this.__parseAnnotations();

        this.set(self.as, item);

        if (self.parentElement) {
          xin.Dom(self.parentElement).insertBefore(fragment, self);
        }
      };
      this.Row.prototype = this.rowProto;
    },

    itemForElement: function(element) {
      while (element && !element.__model) {
        element = element.parentElement;
      }
      return element.__item;
    },

    indexForElement: function(element) {
      while (element && !element.__model) {
        element = element.parentElement;
      }
      return element.__index;
    },

    modelForElement: function(element) {
      while (element && !element.__model) {
        element = element.parentElement;
      }
      return element.__model;
    },

    __insertRow: function(item, index) {
      //var fragment = document.importNode(this.content, true);
      //var row = {
      //  __root: xin.Dom(fragment).childNodes
      //};

      //row.__root.forEach(function(node) {
      //  node.__model = row;
      //  node.__index = index;
      //  node.__item = item;
      //});

      //Object.setPrototypeOf(row, this.rowProto);

      //row.__initialize();

      //row.__host = this.__parent;

      //row.__parseAnnotations();

      //row.set(this.as, item);

      //if (this.parentElement) {
      //  xin.Dom(this.parentElement).insertBefore(fragment, this);
      //}

      var row = new this.Row(item, index);

      return row;
    },

    __itemsChanged: function(items /*, oldItems */) {
      if (this.rows && this.rows.length) {
        this.rows.forEach(function(row) {
          row.__children.forEach(function(node) {
            node.parentElement.removeChild(node);
          });
        }.bind(this));
      }

      this.rows = [];

      // when no items rows must be empty
      if (!items) {
        return;
      }

      items.forEach(function(item, index) {
        try {
          var row = this.__insertRow(item, index);
          this.rows.push(row);
        } catch(e) {
          console.error(e.message + '\n' + e.stack);
        }
      }.bind(this));
    }
  });
})(this);
