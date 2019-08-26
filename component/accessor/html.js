import { BaseAccessor } from './base';

export class HTMLAccessor extends BaseAccessor {
  static test (node, name) {
    return name === 'html' && node.nodeType === Node.ELEMENT_NODE;
  }

  set (value) {
    if (value === null || value === undefined) {
      value = '';
    }

    this.node.innerHTML = value;
  }

  get () {
    throw new Error('HTMLAccessor is write-only');
  }
}
