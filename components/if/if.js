import { Component, define } from '../../component';
import { Row } from './row';
import { pathArray } from '../../helpers';

const ERR_INVALID_DEFINITION = `Invalid xin-if definition,
must be:
<xin-if items="[[items]]">
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

    this.__ifSetupExternals();
    this.__ifObserveCondition(this.condition);
  }

  detached () {
    super.detached();

    this.__ifThenRow.dispose();
    this.__ifElseRow.dispose();
    this.__ifThenRow = undefined;
    this.__ifElseRow = undefined;

    this.__ifTeardownExternals();
  }

  __ifSetupExternals () {
    this.__ifThenRow = new Row(this.__ifThenTemplate, this);
    if (this.__ifElseTemplate) {
      this.__ifElseRow = new Row(this.__ifElseTemplate, this);
    }

    this.__ifExternalAnnotations = [];

    const row = this.__ifThenRow;
    const paths = row.__templateGetBinding().getAnnotatedPaths({ excludeMethods: true });

    paths.forEach(path => {
      const pathArr = pathArray(path);
      this.__ifAddExternalAnnotation(pathArr[0]);
      if (path !== pathArr[0]) {
        this.__ifAddExternalAnnotation(path);
      }
    });
  }

  __ifAddExternalAnnotation (path) {
    if (this.__ifExternalAnnotations.find(ea => ea.path === path)) {
      return;
    }

    const update = value => {
      this.set(path, value);
      this.__ifThenRow.set(path, value);
      if (this.__ifElseRow) {
        this.__ifElseRow.set(path, value);
      }
    };

    const annotation = this.__templateModel.__templateAddCallbackBinding(path, update);
    update(this.__templateModel.get(path));

    this.__ifExternalAnnotations.push({ path, annotation });
  }

  __ifTeardownExternals () {
    this.__ifExternalAnnotations.forEach(({ path, annotation }) => {
      this.__templateModel.__templateGetBinding(path).deannotate(annotation);
    });
    this.__ifExternalAnnotations = [];
  }

  __componentInitTemplate () {
    const children = this.children;
    if (this.children.length < 1 || this.children.length > 2 || this.firstElementChild.nodeName !== 'TEMPLATE') {
      throw new Error(ERR_INVALID_DEFINITION);
    }

    this.__ifThenTemplate = this.firstElementChild;
    this.removeChild(this.firstElementChild);

    if (children.length !== 1 || this.firstElementChild.nodeName !== 'TEMPLATE') {
      throw new Error(ERR_INVALID_DEFINITION);
    }

    this.__ifElseTemplate = this.firstElementChild;
    this.removeChild(this.firstElementChild);

    super.__componentInitTemplate();
  }

  __componentMount () {
    this.__ifHost = this.__templateModel;
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
    if (toAttr) {
      const container = this.parentElement.querySelector(toAttr) || document.querySelector(toAttr);
      if (!container) {
        throw new Error(`xin-if render to unknown element ${toAttr}`);
      }

      this.__ifMarker = document.createComment('marker-if');
      container.appendChild(this.__ifMarker);

      return;
    }

    this.__ifMarker = this;
  }

  __ifTeardownMarker () {
    if (this.__ifMarker !== this) {
      this.__ifMarker.parentElement.removeChild(this.__ifMarker);
    }

    this.__ifMarker = undefined;
  }

  __ifObserveCondition (condition) {
    if (!this.__ifThenRow) {
      return;
    }

    if (condition) {
      this.__ifMount(this.__ifThenRow);
      this.__ifUnmount(this.__ifElseRow);
    } else {
      this.__ifMount(this.__ifElseRow);
      this.__ifUnmount(this.__ifThenRow);
    }
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
