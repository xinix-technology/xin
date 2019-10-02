import { camelize } from '../../helpers';
import { BaseAccessor } from './base';

export class PropertyAccessor extends BaseAccessor {
  static test (node, _) {
    return node.nodeType === Node.ELEMENT_NODE;
  }

  constructor (node, name) {
    super(node, camelize(name));
  }

  write (value) {
    if (typeof this.node.set === 'function') {
      this.node.set(this.name, value);
    } else {
      this.node[this.name] = value;
    }
  }
}
