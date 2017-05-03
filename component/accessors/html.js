import { BaseAccessor } from './base';

export class HTMLAccessor extends BaseAccessor {
  set (value = '') {
    this.node.innerHTML = value;
  }

  get () {
    return this.node.innerHTML;
  }
}
