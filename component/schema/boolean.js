import { Field } from './field';

export class BooleanField extends Field {
  static test (type) {
    return type === Boolean;
  }

  cast (value) {
    if (typeof value === 'string') {
      return value === 'true' || value === '1' || value === 'on' || value === 'yes';
    }

    return Boolean(value);
  }
}
