import { camelize } from '../../helpers';
import { BaseAccessor } from './base';

const { ELEMENT_NODE } = Node;

export class PropertyAccessor extends BaseAccessor {
  static test (node, _) {
    return node.nodeType === ELEMENT_NODE;
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

  read () {
    if (typeof this.node.get === 'function') {
      return this.node.get(this.name);
    } else {
      return this.node[this.name];
    }
  }
}
