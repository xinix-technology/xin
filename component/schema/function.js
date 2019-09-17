import { Field } from './field';

export class FunctionField extends Field {
  static test (type) {
    return type === Function;
  }

  cast (value) {
    if (typeof value === 'function') {
      return value;
    }

    return new Function(value); // eslint-disable-line no-new-func
  }

  eq (value1, value2) {
    return this.get(value1).toString() === this.get(value2).toString();
  }
}
