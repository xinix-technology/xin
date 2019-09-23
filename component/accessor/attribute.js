import { BaseAccessor } from './base';
import { nothing } from '../../helpers';

export class AttributeAccessor extends BaseAccessor {
  static test (node, name) {
    return node.nodeType === Node.ELEMENT_NODE && name.endsWith('$');
  }

  constructor (node, name) {
    super(node, name.slice(0, -1));
  }

  write (value) {
    if (nothing(value) || value === '') {
      this.node.removeAttribute(this.name);
    } else {
      this.node.setAttribute(this.name, value);
    }
  }
}
