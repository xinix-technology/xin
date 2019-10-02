export class BaseAccessor {
  constructor (node, name) {
    this.node = node;
    this.name = name;
  }

  write (value) {
    throw new Error(`${this.constructor.name} #write() unimplemented`);
  }
}
