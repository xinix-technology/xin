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

  eq (v1, v2) {
    return this.cast(v1).toString() === this.cast(v2).toString();
  }
}
