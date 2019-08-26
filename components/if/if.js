import { Component, define } from '../../component';
import { Row } from './row';
// import { Async } from '../core/fn/async';

export class If extends Component {
  get props () {
    return {
      ...super.props,

      condition: {
        type: Boolean,
        observer: 'observeCondition(condition)',
      },

      to: {
        type: String,
        value: '',
      },
    };
  }

  __componentInitTemplate () {
    const children = this.children;

    if (children.length < 1 || children.length > 2 || children[0].nodeName !== 'TEMPLATE') {
      throw new Error('Invalid xin-if definition, must be <xin-if items="[[items]]"><template>...</template></xin-if>');
    }

    this.__ifThenTemplate = children[0];
    this.removeChild(this.__ifThenTemplate);

    if (children.length === 1) {
      if (children[0].nodeName !== 'TEMPLATE') {
        throw new Error(`Invalid xin-if definition,
must be:
<xin-if items="[[items]]">
  <template>...</template>
  <template else>...</template>
</xin-if>`);
      }

      this.__ifElseTemplate = children[0];
      this.removeChild(this.__ifElseTemplate);
    }

    super.__componentInitTemplate();
  }

  __componentMount () {
    let marker = this;
    const toAttr = this.getAttribute('to');
    if (toAttr) {
      const container = this.parentElement.querySelector(toAttr) || document.querySelector(toAttr);
      if (!container) {
        throw new Error(`xin-for render to unknown element ${toAttr}`);
      }
      marker = document.createComment('marker-for');
      container.appendChild(marker);
    }

    this.__ifHost = marker.parentElement;
    this.__ifMarker = marker;

    this.mount(this.__ifHost, this.__ifMarker);
  }

  __componentUnmount () {
    this.__ifThenRow.dispose();
    this.__ifElseRow.dispose();

    this.__ifThenRow = undefined;
    this.__ifElseRow = undefined;

    super.__componentUnmount();
  }

  observeCondition (condition) {
    if (!this.__ifThenRow) {
      this.__ifThenRow = new Row(this.__ifThenTemplate, this);

      if (this.__ifElseTemplate) {
        this.__ifElseRow = new Row(this.__ifElseTemplate, this);
      }
    }

    if (condition) {
      if (!this.__ifThenRow.__templateMounted) {
        this.__ifThenRow.mount(this.__ifHost, this.__ifMarker);
      }

      if (this.__ifElseRow && this.__ifElseRow.__templateMounted) {
        this.__ifElseRow.unmount();
      }
    } else {
      if (this.__ifThenRow.__templateMounted) {
        this.__ifThenRow.unmount();
      }

      if (this.__ifElseRow && !this.__ifElseRow.__templateMounted) {
        this.__ifElseRow.mount(this.__ifHost, this.__ifMarker);
      }
    }
  }
}

define('xin-if', If);
