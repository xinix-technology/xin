import { BaseAccessor } from './base';
import { nothing } from '../../helpers';

const { TEXT_NODE, ELEMENT_NODE } = Node;

export class ValueAccessor extends BaseAccessor {
  static test (node, name) {
    if (name === 'value' && isInputOrSelect(node)) {
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

  write (value) {
    if (document.activeElement !== this.node) {
      if (nothing(value)) {
        value = '';
      }

      this.node.value = value;
    }
  }

  read () {
    return this.node.value;
  }
}

function isInputOrSelect (node) {
  return node.nodeType === ELEMENT_NODE && (node.nodeName === 'INPUT' || node.nodeName === 'SELECT');
}

function isTextareaText (node) {
  return node.nodeType === TEXT_NODE && node.parentElement && node.parentElement.nodeName === 'TEXTAREA';
}
