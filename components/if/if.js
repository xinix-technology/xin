import { Component, define, Template } from '../../component';
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
        throw new Error('Invalid xin-if definition, must be <xin-if items="[[items]]"><template>...</template><template else>...</template></xin-if>');
      }

      this.__ifElseTemplate = children[0];
      this.removeChild(this.__ifElseTemplate);
    }

    Template.prototype.__templateInitialize.call(this);
  }

  observeCondition (condition) {
    if (condition) {
      this.__ifThenRow = new Row(this.__ifThenTemplate, this);
      this.__ifThenRow.mount(this.__templateModel, this);

      if (this.__ifElseRow) {
        this.__ifElseRow.dismount();
        this.__ifElseRow = null;
      }
    } else {
      if (this.__ifThenRow) {
        this.__ifThenRow.dismount();
        this.__ifThenRow = null;
      }

      if (this.__ifElseTemplate) {
        this.__ifElseRow = new Row(this.__ifElseTemplate, this);
        this.__ifElseRow.mount(this.__templateModel, this);
      }
    }
  }
}

define('xin-if', If);
