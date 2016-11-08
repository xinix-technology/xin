import xin from '../src';
import T from 'template-binding';

const FILTER_ALL = () => true;

class RepeatRow extends T {
  constructor (repeat, item, index) {
    super();

    // override T constructor
    this.__templateInitialize(repeat, repeat.__templateModel, repeat);

    this.is = '$repeat-row';
    this.__id = this.__templateId;

    this.__repeat = repeat;
    this.__repeatAs = repeat.as;
    this.__repeatIndexAs = repeat.indexAs;

    this.__templateChildNodes.forEach(node => {
      if (node.nodeType === window.Node.ELEMENT_NODE) {
        node.__repeatModel = this;
      }
    });

    this.update(item, index);

    this.__templateRender();
  }

  update (item, index) {
    this[this.__repeatAs] = item;
    this[this.__repeatIndexAs] = index;
    this.notify(this.__repeatAs, item);
    this.notify(this.__repeatIndexAs, index);
  }

  set (path, value) {
    path = this.__templateGetPathAsArray(path);

    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
      return super.set(path, value);
    }

    return this.__templateHost.set(path, value);
  }

  get (path) {
    path = this.__templateGetPathAsArray(path);

    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
      return super.get(path);
    }

    return this.__templateHost.get(path);
  }

  notify (path, value) {
    path = this.__templateGetPathAsArray(path);

    if (path[0] === this.__repeatAs || path[0] === this.__repeatIndexAs) {
      return super.notify(path, value);
    }

    return this.__templateHost.notify(path, value);
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

    // move to detach
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

export default Repeat;
