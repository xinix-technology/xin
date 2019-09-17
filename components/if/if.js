import { Component, define } from '../../component';
import { Row } from './row';
import { Async } from '../../core';

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
        observer: '__ifObserveCondition(condition)',
      },

      to: {
        type: String,
        value: '',
      },
    };
  }

  attached () {
    super.attached();

    this.__ifSetupRows();
    this.__ifObserveCondition(this.condition);
  }

  detached () {
    super.detached();

    this.__ifTeardownRows();
  }

  __ifSetupRows () {
    const paths = [];
    this.__ifRows = this.__ifTemplates.map(template => {
      const row = new Row(template, this);
      row.__templateBinding.getAnnotatedPaths({ includeMethods: false }).forEach(path => {
        if (paths.indexOf(path) === -1) {
          paths.push(path);
        }
      });
      return row;
    });

    const change = (path, value) => {
      this.set(path, value);
      this.__ifRows.forEach(row => row.set(path, value));
    };

    this.__ifAnnotations = [];

    paths.forEach(path => {
      if (path === 'condition' || path === 'to') {
        return;
      }

      const update = value => change(path, value);

      update(this.__templateParent.get(path));

      const annotation = this.__templateParent.__templateBinding.bindFunction(path, update);
      this.__ifRows.forEach(row => row.__templateBinding.bindFunction(path, value => {
        this.__templateParent.set(path, value);
      }));

      this.__ifAnnotations.push({ path, annotation });
    });
  }

  __ifTeardownRows () {
    this.__ifAnnotations.forEach(({ path, annotation }) => {
      this.__templateParent.__templateBinding.deannotate(path, annotation);
    });
    this.__ifAnnotations = undefined;

    this.__ifRows.forEach(row => row.dispose());
    this.__ifRows = undefined;
  }

  __componentInitTemplate () {
    const children = this.children;
    if (children.length < 1 || children.length > 2 || this.firstElementChild.nodeName !== 'TEMPLATE') {
      throw new Error(ERR_INVALID_DEFINITION);
    }

    this.__ifTemplates = [this.firstElementChild];
    this.removeChild(this.firstElementChild);

    if (children.length === 1 && this.firstElementChild.nodeName === 'TEMPLATE') {
      this.__ifTemplates.push(this.firstElementChild);
      this.removeChild(this.firstElementChild);
    }

    super.__componentInitTemplate();
  }

  __componentMount () {
    this.__ifHost = this.__templateParent;
    this.__ifSetupMarker();
    this.mount(this, this.__ifMarker);
  }

  __componentUnmount () {
    super.__componentUnmount();
    this.__ifTeardownMarker();
    this.__ifHost = undefined;
  }

  __ifSetupMarker () {
    const toAttr = this.getAttribute('to');
    if (!toAttr) {
      this.__ifMarker = this;
      return;
    }

    const container = this.parentElement.querySelector(toAttr) || document.querySelector(toAttr);
    if (!container) {
      throw new Error(`xin-if render to unknown element ${toAttr}`);
    }

    this.__ifMarker = document.createComment(`marker-if-${this.__id}`);
    container.appendChild(this.__ifMarker);
  }

  __ifTeardownMarker () {
    if (this.__ifMarker !== this) {
      this.__ifMarker.parentElement.removeChild(this.__ifMarker);
    }

    this.__ifMarker = undefined;
  }

  __ifObserveCondition (condition) {
    if (!this.__ifRows) {
      return;
    }

    Async.cancel(this.__ifObserveConditionDebounce);
    this.__ifObserveConditionDebounce = Async.run(() => {
      if (condition) {
        this.__ifUnmount(this.__ifRows[1]);
        this.__ifMount(this.__ifRows[0]);
      } else {
        this.__ifUnmount(this.__ifRows[0]);
        this.__ifMount(this.__ifRows[1]);
      }
    });
  }

  __ifMount (row) {
    if (row && !row.__templateMounted) {
      row.mount(this.__ifHost, this.__ifMarker);
    }
  }

  __ifUnmount (row) {
    if (row && row.__templateMounted) {
      row.unmount();
    }
  }
}

define('xin-if', If);
