import { Field } from './field';

export class StringField extends Field {
  static test (type) {
    return type === String;
  }

  cast (value) {
    return String(value);
  }
}
