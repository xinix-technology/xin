import { BaseAccessor } from './base';

export class HTMLAccessor extends BaseAccessor {
  static test (node, name) {
    return name === 'html' && node.nodeType === window.Node.ELEMENT_NODE;
  }

  set (value) {
    this.node.innerHTML = value || '';
  }

  get () {
    throw new Error('HTMLAccessor is write-only');
  }
}
