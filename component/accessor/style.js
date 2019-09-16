import { BaseAccessor } from './base';

export class StyleAccessor extends BaseAccessor {
  static test (_, name) {
    return name && name.startsWith('style.');
  }

  constructor (node, name) {
    super(node, name.split('.').splice(1).join('.'));
  }

  write (value) {
    this.node.style[this.name] = value || '';
  }
}
