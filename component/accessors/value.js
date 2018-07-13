import { BaseAccessor } from './base';

const { TEXT_NODE, ELEMENT_NODE } = window.Node;
export class ValueAccessor extends BaseAccessor {
  static test (node, name) {
    if (name === 'value' && node.nodeType === ELEMENT_NODE && node.nodeName === 'INPUT') {
      return true;
    }

    if (node.nodeType === TEXT_NODE && node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {
      return true;
    }
  }

  constructor (node) {
    super(node, 'value');

    if (node.nodeType === TEXT_NODE && node.parentElement && node.parentElement.nodeName === 'TEXTAREA') {
      this.node = node.parentElement;
    }
  }

  set (value = '') {
    if (document.activeElement !== this.node) {
      super.set(value);
    }
  }
}
