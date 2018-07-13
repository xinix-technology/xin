import { Component, define, T } from '../../component';
import { Row } from './row';

const FILTER_ALL = () => true;

export class For extends Component {
  get props () {
    return Object.assign({}, super.props, {
      items: {
        type: Array,
        observer: '_itemsChanged(items, filter)',
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
        type: Function,
        observer: '_itemsChanged(items, filter)',
      },

      to: {
        type: String,
        value: '',
      },
    });
  }

  created () {
    super.created();

    this.rows = [];
  }

  __initTemplate () {
    this.__templateFor = this.firstElementChild;
    if (!this.__templateFor) {
      throw new Error('Invalid xin-for definition, must be <xin-for items="[[items]]"><template>...</template></xin-for>');
    }
    // this.__templateFor.__templateHost = this.__templateHost;
    this.removeChild(this.__templateFor);

    let marker = this;
    let toAttr = this.getAttribute('to');
    if (toAttr) {
      let container = this.parentElement.querySelector(toAttr) || document.querySelector(toAttr);
      if (!container) {
        throw new Error(`xin-for render to unknown element ${toAttr}`);
      }
      marker = document.createComment(`marker-for`);
      container.appendChild(marker);
    }

    T.prototype.__templateInitialize.call(this, null, this, marker);
  }

  _itemsChanged (items, filter) {
    this.debounce('_itemsChanged', () => {
      let len = 0;

      if (items && items.length) {
        let filter = this.filter || FILTER_ALL;
        items.filter(filter).forEach((item, index) => {
          if (this.rows[index]) {
            this.rows[index].update(item, index);
          } else {
            this.rows.push(new Row(this.__templateFor, this, item, index));
          }

          len++;
        });
      }

      // move to detach
      this.rows.splice(len).forEach(row => {
        row.__templateUninitialize();
      });
    });
  }

  itemForElement (element) {
    return this.modelForElement(element).get(this.as);
  }

  indexForElement (element) {
    return this.modelForElement(element).get(this.indexAs);
  }

  modelForElement (element) {
    while (element && !element.__repeatModel) {
      element = element.parentElement;
    }
    return element.__repeatModel;
  }
}

define('xin-for', For);
