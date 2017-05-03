import { BaseAccessor } from './base';

export class ValueAccessor extends BaseAccessor {
  constructor (node) {
    super(node, 'value');
  }

  set (value = '') {
    if (document.activeElement !== this.node) {
      super.set(value);
    }
  }
}
