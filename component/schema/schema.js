import { UnknownField } from './unknown';
import { pathArray } from '../../helpers';

let types = [];

const UNKNOWN_FIELD = new UnknownField();

export class Schema {
  static reset () {
    reset();
  }

  static createField (name, prop) {
    if (typeof prop === 'function' || prop instanceof Array) {
      prop = { type: prop };
    }

    const Type = types.find(type => type.test(prop.type));
    if (!Type) {
      return UNKNOWN_FIELD;
    }
    return new Type(name, prop);
  }

  constructor (fields = {}, fieldCallback) {
    this.fields = {};

    for (const name in fields) {
      const field = this.fields[name] = Schema.createField(name, fields[name]);
      if (fieldCallback) {
        fieldCallback(field);
      }
    }
  }

  traverse (path) {
    const [name, ...newPath] = pathArray(path);

    const field = this.fields[name];
    if (newPath.length === 0 || !field || !field.traverse) {
      return field || UNKNOWN_FIELD;
    }

    return field.traverse(newPath);
  }

  cast (path, value) {
    const field = this.traverse(path);
    return field.cast(value);
  }

  get (path, value) {
    const field = this.traverse(path);
    return field.get(value);
  }

  eq (path, value1, value2) {
    const field = this.traverse(path);
    return field.eq(value1, value2);
  }

  forEach (callback) {
    for (const name in this.fields) {
      callback(this.fields[name]);
    }
  }
}

function reset () {
  types = [
    require('./string').StringField,
    require('./date').DateField,
    require('./number').NumberField,
    require('./boolean').BooleanField,
    require('./object').ObjectField,
    require('./array').ArrayField,
    require('./function').FunctionField,
  ];
}

reset();
