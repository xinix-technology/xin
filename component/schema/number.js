import { Field } from './field';

export class NumberField extends Field {
  static test (type) {
    return type === Number;
  }

  cast (value) {
    if (typeof value === 'number') {
      return value;
    }

    return Number(value);
  }
}
