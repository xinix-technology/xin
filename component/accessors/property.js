import { camelize } from '../../string';
import { BaseAccessor } from './base';

export class PropertyAccessor extends BaseAccessor {
  constructor (node, name) {
    super();

    this.node = node;
    this.name = camelize(name);
  }
}
