import { Component, define } from '../../component';
import { Row } from './row';
import { pathArray, setupMarker } from '../../helpers';

const ERR_INVALID_DEFINITION = `Invalid xin-for definition,
must be:
<xin-for items="[[items]]">
  <template>...</template>
</xin-for>`;

export class For extends Component {
  get props () {
    return {
      ...super.props,
      items: {
        type: Array,
        observer: '__loopItemsChanged(items)',
      },
      as: {
        type: String,
        value: 'item',
      },
      indexAs: {
        type: String,
        value: 'index',
      },
      to: {
        type: String,
        value: '',
      },
    };
  }

  get __loopHost () {
    return this.__templatePresenter.parent.__templatePresenter.host;
  }

  attached () {
    super.attached();

    this.__loopRows = [];
    this.__loopValues = {};

    this.__loopSetupMarker();
    this.__loopSetupAnnotations();

    this.__loopItemsChanged();
  }

  detached () {
    this.__loopRows.forEach(row => row.dispose());

    this.__loopTeardownAnnotations();
    this.__loopTeardownMarker();

    this.__loopValues = undefined;
    this.__loopRows = undefined;

    super.detached();
  }

  __loopSetupAnnotations () {
    this.__loopAnnotations = [];

    const excludedProps = ['items', 'as', 'indexAs', 'to', this.as, this.indexAs];
    const row = new Row(this.__loopTemplate, this);
    this.__loopAnnotatedPaths = row.__templateModeler.getAnnotatedPaths({
      includeProperties: true,
      includeMethods: false,
    }).filter(path => !excludedProps.includes(pathArray(path)[0]));

    this.__loopBindAnnotations(this.__templateModeler).forEach(bindAnnotation => {
      this.__loopAnnotations.push(bindAnnotation);
    });

    this.__loopBindAnnotations(this.__loopHost.__templateModeler).forEach(bindAnnotation => {
      this.__loopAnnotations.push(bindAnnotation);
    });

    row.dispose();
  }

  __loopTeardownAnnotations () {
    this.__loopAnnotations.forEach(({ modeler, path, annotation }) => modeler.deannotate(path, annotation));
    this.__loopAnnotations = undefined;
  }

  __loopBindAnnotations (modeler) {
    return this.__loopAnnotatedPaths.map(path => {
      const prop = pathArray(path)[0];
      const initialPropValue = this.__loopHost.get(prop);
      modeler.set(prop, initialPropValue);

      const annotation = modeler.bindFunction(path, value => this.__loopSetValue(path, value));

      return { modeler, path, annotation };
    });
  }

  __loopSetValue (path, value) {
    if (this.__loopValues[path] === value) {
      return;
    }

    this.__loopValues[path] = value;

    this.__templateModeler.set(path, value);
    this.__templateModeler.notify(path);
    this.__loopHost.__templateModeler.set(path, value);
    this.__loopHost.__templateModeler.notify(path);

    this.__loopRows.forEach(row => {
      row.__templateModeler.set(path, value);
      row.__templateModeler.notify(path);
    });
  }

  __componentGetTemplate () {
    if (this.children.length !== 1 && this.firstElementChild.nodeName !== 'TEMPLATE') {
      throw new Error(ERR_INVALID_DEFINITION);
    }

    this.__loopTemplate = this.firstElementChild;
    this.removeChild(this.__loopTemplate);
  }

  __loopItemsChanged () {
    if (!this.__loopRows) {
      return;
    }

    const items = this.items || [];
    let len = 0;
    items.forEach((item, index) => {
      if (!this.__loopRows[index]) {
        const row = new Row(this.__loopTemplate, this);
        row.mount(this.__loopHost, this.__loopMarker);
        this.__loopRows.push(row);
      }

      this.__loopRows[index].update(item, index);

      len++;
    });

    this.__loopRows.splice(len).forEach(row => {
      row.unmount();
      row.dispose();
    });
  }

  __loopSetupMarker () {
    if (!this.to) {
      this.__loopMarker = this;
      return;
    }

    const container = this.parentElement.querySelector(this.to) || document.querySelector(this.to);
    if (!container) {
      throw new Error(`xin-for render to unknown element ${this.to}`);
    }

    this.__loopMarker = setupMarker(container, `loop-${this.__id}`);
    container.appendChild(this.__loopMarker);
  }

  __loopTeardownMarker () {
    if (this.__loopMarker && this.__loopMarker !== this) {
      this.__loopMarker.parentElement.removeChild(this.__loopMarker);
    }

    this.__loopMarker = undefined;
  }

  itemForElement (element) {
    return this.rowForElement(element).get(this.as);
  }

  indexForElement (element) {
    return this.rowForElement(element).get(this.indexAs);
  }

  rowForElement (element) {
    while (element && !element.__loopRow) {
      element = element.parentElement;
    }
    return element.__loopRow;
  }
}

define('xin-for', For);
