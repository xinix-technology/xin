import { nothing } from '../../helpers';

export class Field {
  constructor (name, { type, value, required = false, computed, observer, notify = false }) {
    this.name = name;
    this.type = type;
    this.value = nothing(value) ? undefined : this.cast(value);
    this.required = required;
    this.computed = computed;
    this.observer = observer;
    this.notify = notify;
  }

  cast () {
    throw new Error('Unimplemented #cast()');
  }

  get (value) {
    if (nothing(value)) {
      return this.value;
    }

    value = this.cast(value);

    if (nothing(value)) {
      return this.value;
    }

    return value;
  }

  eq (value1, value2) {
    return this.get(value1) === this.get(value2);
  }
}
