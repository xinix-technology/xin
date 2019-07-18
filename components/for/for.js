import { Component, define, Template } from '../../component';
import { Row } from './row';

const FILTER_ALL = () => true;

export class For extends Component {
  get props () {
    return Object.assign({}, super.props, {
      items: {
        type: Array,
        observer: '__loopItemsChanged(items, filter)',
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
        observer: '__loopItemsChanged(items, filter)',
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

  attached () {
    super.attached();

    this.__loopItemsChanged(this.items, this.filter);
  }

  detached () {
    super.detached();

    // on detached will remove rows
    this.rows.forEach(row => {
      row.dismount();
    });
    this.rows = [];
  }

  __componentInitTemplate () {
    this.__loopTemplate = this.firstElementChild;
    if (!this.__loopTemplate) {
      throw new Error('Invalid xin-for definition, must be <xin-for items="[[items]]"><template>...</template></xin-for>');
    }

    this.removeChild(this.__loopTemplate);

    Template.prototype.__templateInitialize.call(this);
  }

  __componentMountTemplate () {
    let marker = this;
    const toAttr = this.getAttribute('to');
    if (toAttr) {
      const container = this.parentElement.querySelector(toAttr) || document.querySelector(toAttr);
      if (!container) {
        throw new Error(`xin-for render to unknown element ${toAttr}`);
      }
      marker = document.createComment(`marker-for`);
      container.appendChild(marker);
    }

    this.mount(this, marker);
  }

  __loopItemsChanged (items, _) {
    this.debounce('__loopItemsChanged', () => {
      let len = 0;

      if (items && items.length) {
        const filter = this.filter || FILTER_ALL;
        items.filter(filter).forEach((item, index) => {
          if (this.rows[index]) {
            this.rows[index].update(item, index);
          } else {
            const row = new Row(this.__loopTemplate, this, item, index);
            row.mount(this.__templateModel, this.__templateMarker);
            this.rows.push(row);
          }

          len++;
        });
      }

      this.rows.splice(len).forEach(row => {
        row.dismount();
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
    while (element && !element.__loopModel) {
      element = element.parentElement;
    }
    return element.__loopModel;
  }
}

define('xin-for', For);
