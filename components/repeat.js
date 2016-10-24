/* globals Node */

const xin = require('../src');
const T = require('template-binding');

const FILTER_ALL = () => true;

class RepeatRow extends T {
  constructor (repeat, item, index) {
    super(repeat, repeat.__templateModel, repeat);

    this.__repeat = repeat;
    this.__repeatAs = repeat.as;
    this.__repeatIndexAs = repeat.indexAs;

    this.__templateChildNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        node.__repeatModel = this;
      }
    });

    this.update(item, index);

    this.render();
  }

  update (item, index) {
    this[this.__repeatAs] = item;
    this[this.__repeatIndexAs] = index;
    this.notify(this.__repeatAs);
    this.notify(this.__repeatIndexAs);
  }

  set (path, value) {
    if (typeof path === 'object') {
      return super.set(path);
    }

    if (!path.startsWith(this.__repeatAs) && !path.startsWith(this.__repeatIndexAs)) {
      return this.__templateHost.set(path, value);
    }

    return super.set(path, value);
  }

  get (path) {
    if (!path.startsWith(this.__repeatAs) && !path.startsWith(this.__repeatIndexAs)) {
      return this.__templateHost.get(path);
    }

    return super.get(path);
  }

  notify (path, value, oldValue) {
    if (!path.startsWith(this.__repeatAs) && !path.startsWith(this.__repeatIndexAs)) {
      return this.__templateHost.notify(path, value, oldValue);
    }

    return super.notify(path, value, oldValue);
  }
};

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
            this.rows[index].update(item, index);
          } else {
            this.rows.push(new RepeatRow(this, item, index));
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
}

xin.define('xin-repeat', Repeat, { extends: 'template' });
xin.Repeat = Repeat;

module.exports = Repeat;
