import { BaseAccessor } from './base';
import { nothing } from '../../helpers';

const { TEXT_NODE, ELEMENT_NODE } = Node;

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

  write (value) {
    if (nothing(value)) {
      value = '';
    }

    this.node.textContent = value;
  }
}
