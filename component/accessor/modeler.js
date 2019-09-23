import { camelize } from '../../helpers';
import { BaseAccessor } from './base';
import { Modeler } from '../modeler';

export class ModelerAccessor extends BaseAccessor {
  static test (node, _) {
    return node instanceof Modeler;
  }

  constructor (node, name) {
    super(node, camelize(name));
  }

  write (value) {
    this.node.set(this.name, value);
  }

  read () {
    return this.node.get(this.name);
  }
}
