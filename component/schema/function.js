import { Field } from './field';

export class FunctionField extends Field {
  static test (type) {
    return type === Function;
  }

  cast (value) {
    if (typeof value === 'function') {
      return value;
    }

    let fn;
    eval(`fn = ${value};`); // eslint-disable-line no-eval
    return fn;
  }

  eq (value1, value2) {
    return this.get(value1).toString() === this.get(value2).toString();
  }
}
