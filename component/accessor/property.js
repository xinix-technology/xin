import { camelize } from '../../core/string';
import { BaseAccessor } from './base';

const { ELEMENT_NODE } = Node;

export class PropertyAccessor extends BaseAccessor {
  static test (node, _) {
    return node.nodeType === ELEMENT_NODE;
  }

  constructor (node, name) {
    super(node, camelize(name));
  }
}
