import { BaseAccessor } from './base';

const { TEXT_NODE, ELEMENT_NODE } = window.Node;

export class TextAccessor extends BaseAccessor {
  static test (node, name) {
    if (node.nodeType === TEXT_NODE) {
      return true;
    }

    return name === 'text' && node.nodeType === ELEMENT_NODE;
  }

  constructor (node) {
    super(node, 'textContent');
  }

  set (value) {
    value = value || '';
    if (value !== this.node.textContent) {
      this.node.textContent = value;
    }
  }
}
