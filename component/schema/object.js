import { Field } from './field';
import { Schema } from './schema';

export class ObjectField extends Field {
  static test (type) {
    return type === Object || (type instanceof Array && type[0] === Object);
  }

  constructor (name, prop) {
    super(name, prop);

    const props = prop.type instanceof Array ? prop.type[1] : {};
    this.schema = new Schema(props);
  }

  traverse (path) {
    return this.schema.traverse(path);
  }

  cast (value) {
    if (typeof value === 'object') {
      return value;
    }

    try {
      return JSON.parse(value);
    } catch (err) {
      // allow non-JSON literals like Strings and Numbers
      console.warn(`Failed decode json: "${value}" to Object`);
      return undefined;
    }
  }
}
