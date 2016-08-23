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
        observer: '_itemsChanged'
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
      var _set = this.rowProto.set;
      this.rowProto.set = function(name, value) {
        var nameSegments = name.split('.');
        switch(nameSegments[0]) {
          case templateHost.as:
          case templateHost.indexAs:
            return _set.apply(this, arguments);
          default:
            var oldValue = this._host.get(name);
            return this._host.set(name, value);
        }
      };

      var _get = this.rowProto.get;
      this.rowProto.get = function(name) {
        var nameSegments = name.split('.');
        switch(nameSegments[0]) {
          case templateHost.as:
          case templateHost.indexAs:
            return _get.apply(this, arguments);
          default:
            return this._host.get(name, value);
        }
      };

      if (!this.content && HTMLTemplateElement.decorate) {
        HTMLTemplateElement.decorate(this);
      }
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

    _insertRow: function(item, index) {
      var fragment = document.importNode(this.content, true);
      var row = {
        _root: xin.Dom(fragment).childNodes
      };

      row._root.forEach(function(node) {
        node.__model = row;
        node.__index = index;
        node.__item = item;
      });

      Object.setPrototypeOf(row, this.rowProto);

      row._initData();

      row._host = this._parent;

      row._parseAnnotations();

      row._parsePropertyAnnotations();

      row.set(this.as, item);

      if (this.parentElement) {
        xin.Dom(this.parentElement).insertBefore(fragment, this);
      }

      return row;
    },

    _itemsChanged: function(items, oldItems) {
      if (this.rows && this.rows.length) {
        this.rows.forEach(function(row) {
          row._children.forEach(function(node) {
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
          var row = this._insertRow(item, index);
          this.rows.push(row);
        } catch(e) {
          console.error(e.message + '\n' + e.stack);
        }
      }.bind(this));
    }
  });
})(this);
