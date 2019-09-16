import { Field } from './field';

export class UnknownField extends Field {
  constructor () {
    super('', {});
  }

  cast (value) {
    return value;
  }

  eq (value1, value2) {
    return value1 === value2;
  }
}
