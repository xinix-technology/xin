import { BaseAccessor } from './base';
import { nothing } from '../../helpers';

export class HTMLAccessor extends BaseAccessor {
  static test (node, name) {
    return name === 'html' && node.nodeType === Node.ELEMENT_NODE;
  }

  write (value) {
    if (nothing(value)) {
      value = '';
    }

    this.node.innerHTML = value;
  }
}
