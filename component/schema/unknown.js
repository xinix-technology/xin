import { Field } from './field';

export class UnknownField extends Field {
  constructor () {
    super('', {});
  }

  cast (value) {
    return value;
  }
}
