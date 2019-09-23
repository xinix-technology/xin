import { nothing, val } from '../../helpers';

export class Field {
  constructor (name, { type, value, required = false, computed, observer, notify = false }) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.required = required;
    this.computed = computed;
    this.observer = observer;
    this.notify = notify;
  }

  cast () {
    throw new Error('Unimplemented #cast()');
  }

  getDefaultValue () {
    return val(this.value);
  }

  validate (value) {
    if (nothing(value) && this.required) {
      throw new Error(`Field ${this.name} empty but required`);
    }

    return value;
  }

  get (value) {
    if (!nothing(value)) {
      value = this.cast(value);
    }

    if (nothing(value)) {
      value = this.getDefaultValue();
    }

    return this.validate(value);
  }

  eq (value1, value2) {
    return this.get(value1) === this.get(value2);
  }
}
