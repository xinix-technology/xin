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
    if (value === null || value === undefined) {
      value = '';
    }

    this.node.textContent = value;
  }

  get () {
    throw new Error('TextAccessor is write-only');
  }
}
