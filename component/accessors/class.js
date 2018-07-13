import { BaseAccessor } from './base';

export class ClassAccessor extends BaseAccessor {
  static test (node, name) {
    return name && name.startsWith('class.');
  }

  constructor (node, name) {
    super(node, name.split('.').splice(1).join('.'));
  }

  set (value) {
    if (value) {
      this.node.classList.add(this.name);
    } else {
      this.node.classList.remove(this.name);
    }
  }

  get () {
    throw new Error('Unimplemented');
  }
}
