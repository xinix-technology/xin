import { BaseAccessor } from './base';

const { TEXT_NODE, ELEMENT_NODE } = Node;

export class ValueAccessor extends BaseAccessor {
  static test (node, name) {
    if (name === 'value' && isInput(node)) {
      return true;
    }

    if (isTextareaText(node)) {
      return true;
    }
  }

  constructor (node) {
    super(node, 'value');

    if (isTextareaText(node)) {
      this.node = node.parentElement;
    }
  }

  set (value) {
    if (document.activeElement !== this.node) {
      if (value === null || value === undefined) {
        value = '';
      }

      this.node.value = value;
    }
  }
}

function isInput (node) {
  return node.nodeType === ELEMENT_NODE && node.nodeName === 'INPUT';
}

function isTextareaText (node) {
  return node.nodeType === TEXT_NODE && node.parentElement && node.parentElement.nodeName === 'TEXTAREA';
}
