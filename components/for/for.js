import { Component, define } from '../../component';
import { Row } from './row';
import { Async } from '../../core';
import { pathArray } from '../../helpers';

const ERR_INVALID_DEFINITION = `Invalid xin-for definition,
must be:
<xin-for items="[[items]]">
  <template>...</template>
</xin-for>`;

const FILTER_ALL = () => true;

export class For extends Component {
  get props () {
    return {
      ...super.props,
      items: {
        type: Array,
        notify: true,
        observer: '__loopObserverFn(items, filter)',
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
        observer: '__loopObserverFn(items, filter)',
      },
      to: {
        type: String,
        value: '',
      },
    };
  }

  attached () {
    super.attached();

    this.__loopSetupExternals();
    this.__loopRows = [];
    this.__loopObserverFn();
  }

  detached () {
    super.detached();

    Async.cancel(this.__loopDebounceItemsChanged);
    this.__loopRows.forEach(row => {
      row.unmount();
      row.dispose();
    });
    this.__loopRows = [];
    this.__loopTeardownExternals();
  }

  __loopSetupExternals () {
    this.__loopExternalAnnotations = [];

    const row = new Row(this.__loopTemplate, this);

    const paths = row.__templateBinding.getAnnotatedPaths({ includeMethod: false });

    paths.forEach(path => {
      const pathArr = pathArray(path);
      if (pathArr[0] === this.as || pathArr[0] === this.indexAs) {
        return;
      }

      this.__loopAddExternalAnnotation(pathArr[0]);
      if (path !== pathArr[0]) {
        this.__loopAddExternalAnnotation(path);
      }
    });
  }

  __loopAddExternalAnnotation (path) {
    if (this.__loopExternalAnnotations.find(ea => ea.path === path)) {
      return;
    }

    const update = value => {
      this.set(path, value);
      if (this.__loopRows) {
        this.__loopRows.forEach(row => row.set(path, value));
      }
    };
    const annotation = this.__templateParent.__templateBinding.bindFunction(path, update);
    update(this.__templateParent.get(path));

    this.__loopExternalAnnotations.push({ path, annotation });
  }

  __loopTeardownExternals () {
    this.__loopExternalAnnotations.forEach(({ path, annotation }) => {
      this.__templateParent.__templateBinding.deannotate(path, annotation);
    });
    this.__loopExternalAnnotations = [];
  }

  __componentInitTemplate () {
    if (this.children.length !== 1 && this.firstElementChild.nodeName !== 'TEMPLATE') {
      throw new Error(ERR_INVALID_DEFINITION);
    }

    this.__loopTemplate = this.firstElementChild;
    this.removeChild(this.__loopTemplate);

    super.__componentInitTemplate();
  }

  __componentMount () {
    this.__loopHost = this.__templateParent;
    this.__loopSetupMarker();
    this.mount(this, this.__loopMarker);
  }

  __componentUnmount () {
    super.__componentUnmount();
    this.__loopTeardownMarker();
    this.__loopHost = undefined;
  }

  __loopSetupMarker () {
    const toAttr = this.getAttribute('to');
    if (toAttr) {
      const container = this.parentElement.querySelector(toAttr) || document.querySelector(toAttr);
      if (!container) {
        throw new Error(`xin-for render to unknown element ${toAttr}`);
      }
      this.__loopMarker = document.createComment('marker-for');
      container.appendChild(this.__loopMarker);
      return;
    }

    this.__loopMarker = this;
  }

  __loopTeardownMarker () {
    if (this.__loopMarker !== this) {
      this.__loopMarker.parentElement.removeChild(this.__loopMarker);
    }

    this.__loopMarker = undefined;
  }

  __loopObserverFn () {
    Async.cancel(this.__loopDebounceItemsChanged);
    this.__loopDebounceItemsChanged = Async.run(() => {
      let len = 0;
      const items = this.items;
      if (items && items.length) {
        const filter = this.filter || FILTER_ALL;
        items.filter(filter).forEach((item, index) => {
          if (!this.__loopRows[index]) {
            const row = new Row(this.__loopTemplate, this);
            row.mount(this.__loopHost, this.__loopMarker);
            this.__loopRows.push(row);
          }

          this.__loopRows[index].update(item, index);

          len++;
        });
      }

      this.__loopRows.splice(len).forEach(row => {
        row.unmount();
        row.dispose();
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
