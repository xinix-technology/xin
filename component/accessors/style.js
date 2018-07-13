import { BaseAccessor } from './base';

export class StyleAccessor extends BaseAccessor {
  static test (node, name) {
    return name && name.startsWith('style.');
  }

  constructor (node, name) {
    super(node, name.split('.').splice(1).join('.'));
  }

  set (value = '') {
    this.node.style[this.name] = value;
  }

  get () {
    throw new Error('Unimplemented');
  }
}
