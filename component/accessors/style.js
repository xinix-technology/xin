import { BaseAccessor } from './base';

export class StyleAccessor extends BaseAccessor {
  set (value = '') {
    this.node.style[this.name] = value;
  }

  get () {
    throw new Error('Unimplemented');
  }
}
