import { camelize } from '../../core/string';
import { BaseAccessor } from './base';

const { ELEMENT_NODE } = window.Node;

export class PropertyAccessor extends BaseAccessor {
  static test (node, name) {
    return node.nodeType === ELEMENT_NODE;
  }

  constructor (node, name) {
    super();

    this.node = node;
    this.name = camelize(name);
  }
}
