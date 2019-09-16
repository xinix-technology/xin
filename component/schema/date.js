import { Field } from './field';

export class DateField extends Field {
  static test (type) {
    return type === Date;
  }

  cast (value) {
    if (value instanceof Date) {
      return value;
    }

    return new Date(value);
  }
}
