import { Field } from './field';
import { Schema } from './schema';
import { pathArray } from '../../helpers';

export class ArrayField extends Field {
  static test (type) {
    return type === Array || (type instanceof Array && type[0] === Array);
  }

  constructor (name, field) {
    super(name, field);

    if (field.type instanceof Array && field.type[1]) {
      const type = field.type[1];
      this.field = Schema.createField('', { type });
    }
  }

  traverse (path) {
    const [, ...newPath] = pathArray(path);
    if (newPath.length === 0) {
      return this.field;
    }

    return this.field.traverse(newPath);
  }

  cast (value) {
    if (value instanceof Array) {
      return value;
    }

    try {
      const result = JSON.parse(value);
      if (result instanceof Array) {
        return result;
      }

      throw new Error('Value is not array');
    } catch (err) {
      console.warn(`Failed decode json: "${value}" to Array`);
      return undefined;
    }
  }
}
