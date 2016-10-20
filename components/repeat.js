const xin = require('../src');
const T = require('template-binding');

const FILTER_ALL = () => true;

class Repeat extends xin.base('HTMLTemplateElement') {
  get props () {
    return {
      items: {
        type: Array,
        observer: '_itemsChanged',
      },

      as: {
        type: String,
        value: 'item',
      },

      indexAs: {
        type: String,
        value: 'index',
      },

      filter: {
        type: Object,
        observer: '_filterChanged',
      },
    };
  }

  __initTemplate () {
    T.prototype.__templateInitialize.call(this, null, this);
  }

  _itemsChanged (items) {
    this.rows = this.rows || [];

    let len = 0;

    if (items && items.length) {
      let filter = this.filter || FILTER_ALL;
      items.forEach((item, index) => {
        if (filter(item)) {
          if (this.rows[index]) {
            this.rows[index].set(this.as, item);
            this.rows[index].set(this.indexAs, index);
          } else {
            let row = new T(this, this.__templateModel, this);
            row.__templateChildNodes.forEach(node => {
              if (node.nodeType === window.Node.ELEMENT_NODE) {
                node.__repeatModel = row;
              }
            });
            row.set(this.as, item);
            row.set(this.indexAs, index);

            row.render();
            this.rows.push(row);
          }

          len++;
        }
      });
    }

    this.rows.splice(len).forEach(row => {
      row.__templateUninitialize();
    });
  }

  itemForElement (element) {
    while (element && !element.__repeatModel) {
      element = element.parentElement;
    }
    return element.__repeatModel.get(this.as);
  }

  indexForElement (element) {
    while (element && !element.__repeatModel) {
      element = element.parentElement;
    }
    return element.__repeatModel.get(this.indexAs);
  }

  modelForElement (element) {
    while (element && !element.__repeatModel) {
      element = element.parentElement;
    }
    return element.__repeatModel;
  }

  _filterChanged (filter) {
    if (typeof filter !== 'function') {
      return;
    }

    this._itemsChanged(this.items);
  }

  // created () {
  //   console.log('created', this);
  //   // this.rowProto = {}; //xin.Component;
  //   // xin.base({
  //   //   is: '$xin-repeat-row',
  //   // });
  //
  //   // var templateHost = this;
  //   // var __set = this.rowProto.set;
  //   // this.rowProto.set = function (name, value) {
  //   //   var nameSegments = name.split('.');
  //   //   switch (nameSegments[0]) {
  //   //     case templateHost.as:
  //   //     case templateHost.indexAs:
  //   //       return __set.apply(this, arguments);
  //   //     default:
  //   //       // var oldValue = this.__host.get(name);
  //   //       return this.__host.set(name, value);
  //   //   }
  //   // };
  //   //
  //   // var __get = this.rowProto.get;
  //   // this.rowProto.get = function (name) {
  //   //   var nameSegments = name.split('.');
  //   //   switch (nameSegments[0]) {
  //   //     case templateHost.as:
  //   //     case templateHost.indexAs:
  //   //       return __get.apply(this, arguments);
  //   //     default:
  //   //       return this.__host.get(name);
  //   //   }
  //   // };
  //
  //   // if (!this.content && HTMLTemplateElement.decorate) {
  //   //   HTMLTemplateElement.decorate(this);
  //   // }
  //
  //   // Row is class to create new row
  //   // var self = this;
  //   // this.Row = function (item, index) {
  //   //   var row = this;
  //   //   var fragment = this.fragment = document.importNode(self.content, true);
  //   //   this.__root = xin.dom(fragment).childNodes.map(function (node) {
  //   //     node.__repeatModel = row;
  //   //     node.__repeatIndex = index;
  //   //     node.__repeatItem = item;
  //   //     return node;
  //   //   });
  //   //
  //   //   this.__initialize();
  //   //
  //   //   this.__host = self.__parent;
  //   //
  //   //   this.__parseAnnotations();
  //   //
  //   //   this.set(self.as, item);
  //   //
  //   //   // if (self.parentElement) {
  //   //   //  xin.dom(self.parentElement).insertBefore(fragment, self);
  //   //   // }
  //   // };
  //   // this.Row.prototype = this.rowProto;
  // }

  // __insertRow (item, index) {
  //   console.log(item, index);
  //   // var fragment = document.importNode(this.content, true);
  //   // var row = {
  //   //  __root: xin.dom(fragment).childNodes
  //   // };
  //
  //   // row.__root.forEach(function(node) {
  //   //  node.__repeatModel = row;
  //   //  node.__repeatIndex = index;
  //   //  node.__repeatItem = item;
  //   // });
  //
  //   // Object.setPrototypeOf(row, this.rowProto);
  //
  //   // row.__initialize();
  //
  //   // row.__host = this.__parent;
  //
  //   // row.__parseAnnotations();
  //
  //   // row.set(this.as, item);
  //
  //   // if (this.parentElement) {
  //   //  xin.dom(this.parentElement).insertBefore(fragment, this);
  //   // }
  //
  //   var row = new this.Row(item, index);
  //
  //   return row;
  // }
}

xin.define('xin-repeat', Repeat, { extends: 'template' });
xin.Repeat = Repeat;

module.exports = Repeat;
