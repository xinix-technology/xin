import { BaseAccessor } from './base';

export class TextAccessor extends BaseAccessor {
  constructor (node) {
    super(node, 'textContent');
  }

  set (value = '') {
    if (value !== this.node.textContent) {
      this.node.textContent = value;
    }
  }
}
