import { Component, define } from '../../component';
import { Row } from './row';
import { setupMarker, pathArray } from '../../helpers';

const ERR_INVALID_DEFINITION = `Invalid xin-if definition,
must be:
<xin-if condition="[[condition]]">
  <template>...</template>
  <template else>...</template>
</xin-if>`;

export class If extends Component {
  get props () {
    return {
      ...super.props,

      condition: {
        type: Boolean,
        observer: '__ifConditionChanged(condition)',
      },

      to: {
        type: String,
        value: '',
      },
    };
  }

  attached () {
    super.attached();

    this.__ifSetupMarker();
    this.__ifSetupRows();

    this.__ifConditionChanged(this.condition);
  }

  detached () {
    this.__ifTeardownRows();
    this.__ifTeardownMarker();

    super.detached();
  }

  get __ifHost () {
    return this.__templatePresenter.parent.__templatePresenter.host;
  }

  __ifSetupRows () {
    this.__ifAnnotations = [];

    const annotatedPaths = [];
    const modelers = [this.__templateModeler, this.__ifHost.__templateModeler];
    const values = {};
    const setValue = (path, value) => {
      if (values[path] === value) {
        return;
      }

      values[path] = value;

      modelers.forEach(modeler => {
        modeler.set(path, value);
        modeler.notify(path);
      });
    };

    this.__ifRows = this.__ifTemplates.map(template => {
      const row = new Row(template, this);

      const paths = row.__templateModeler.getAnnotatedPaths({ includeProperties: true, includeMethods: false });
      paths.forEach(path => {
        if (!annotatedPaths.includes(path)) {
          annotatedPaths.push(path);
        }
      });

      modelers.push(row.__templateModeler);

      return row;
    });

    annotatedPaths.forEach(path => {
      const pathArr = pathArray(path);
      const prop = pathArr[0];
      if (['to', 'condition'].includes(prop)) {
        return;
      }

      const initialPropValue = this.__ifHost.get(prop);

      this.__ifRows.forEach(row => row.set(prop, initialPropValue));

      const update = value => setValue(path, value);
      modelers.forEach(modeler => {
        const annotation = modeler.bindFunction(path, update);
        this.__ifAnnotations.push({ modeler, path, annotation });
      });
    });
  }

  __ifTeardownRows () {
    if (!this.__ifAnnotations) {
      return;
    }

    this.__ifAnnotations.forEach(({ modeler, path, annotation }) => modeler.deannotate(path, annotation));
    this.__ifAnnotations = undefined;
    this.__ifRows.forEach(row => row.dispose());
    this.__ifRows = undefined;
  }

  __componentGetTemplate () {
    const children = this.children;
    if (children.length < 1 || children.length > 2 || this.firstElementChild.nodeName !== 'TEMPLATE') {
      throw new Error(ERR_INVALID_DEFINITION);
    }

    this.__ifTemplates = [this.firstElementChild];
    this.removeChild(this.firstElementChild);

    if (this.firstElementChild.nodeName !== 'TEMPLATE') {
      throw new Error(ERR_INVALID_DEFINITION);
    }

    this.__ifTemplates.push(this.firstElementChild);
    this.removeChild(this.firstElementChild);
  }

  __ifSetupMarker () {
    if (!this.to) {
      this.__ifMarker = this;
      return;
    }

    const container = this.parentElement.querySelector(this.to) || document.querySelector(this.to);
    if (!container) {
      throw new Error(`xin-if render to unknown element ${this.to}`);
    }

    this.__ifMarker = setupMarker(container, `if-${this.__id}`);
    container.appendChild(this.__ifMarker);
  }

  __ifTeardownMarker () {
    if (this.__ifMarker && this.__ifMarker !== this) {
      this.__ifMarker.parentElement.removeChild(this.__ifMarker);
    }

    this.__ifMarker = undefined;
  }

  __ifConditionChanged (condition) {
    if (!this.__ifRows) {
      return;
    }

    if (condition) {
      this.__ifUnmountRow(this.__ifRows[1]);
      this.__ifMountRow(this.__ifRows[0]);
    } else {
      this.__ifUnmountRow(this.__ifRows[0]);
      this.__ifMountRow(this.__ifRows[1]);
    }
  }

  /**
   * Mount row
   * @param {Row} row
   */
  __ifMountRow (row) {
    if (row && !row.isMounted()) {
      row.mount(this.__ifHost, this.__ifMarker);
    }
  }

  /**
   * Unmount row
   * @param {Row} row
   */
  __ifUnmountRow (row) {
    if (row && row.isMounted()) {
      row.unmount();
    }
  }
}

define('xin-if', If);
