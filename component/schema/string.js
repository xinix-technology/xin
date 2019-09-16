import { Field } from './field';
import { nothing } from '../../helpers';

export class StringField extends Field {
  static test (type) {
    return type === String;
  }

  cast (value) {
    if (nothing(value)) {
      return undefined;
    }

    return String(value);
  }
}
