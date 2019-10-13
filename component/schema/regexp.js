import { Field } from './field';

export class RegExpField extends Field {
  static test (type) {
    return type === RegExp;
  }

  cast (value) {
    if (value instanceof RegExp) {
      return value;
    }

    return new RegExp(value);
  }

  eq (value1, value2) {
    return (this.get(value1) || '').toString() === (this.get(value2) || '').toString();
  }
}
