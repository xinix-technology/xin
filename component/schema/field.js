import { nothing, val } from '../../helpers';
import { Expr } from '../expr';

export class Field {
  constructor (name, { type, value, required = false, computed, observer, observers = [], notify = false }) {
    observers = prepareObservers(observers, observer, name);
    computed = prepareInvocableExpr(computed);

    this.name = name;
    this.type = type;
    this.value = value;
    this.required = required;
    this.computed = computed;
    this.observers = observers;
    this.notify = notify;
  }

  cast () {
    throw new Error('Unimplemented #cast()');
  }

  getDefaultValue () {
    return val(this.value);
  }

  get (value) {
    return nothing(value) ? undefined : this.cast(value);
  }

  eq (value1, value2) {
    return this.get(value1) === this.get(value2);
  }
}

function prepareObservers (observers = [], observer, name) {
  if (!observers.length && observer) {
    observers = [observer];
  }

  return observers.map(observer => {
    observer = Expr.prepareFnString(observer, [name]);
    const expr = prepareInvocableExpr(observer);
    if (!expr || !expr.args.find(arg => arg.string === name)) {
      throw new Error(`Invalid observer string for field:"${name}", "${observer}"`);
    }
    return expr;
  });
}

function prepareInvocableExpr (string, args = []) {
  if (!string) {
    return;
  }

  const expr = new Expr(string, Expr.READONLY);
  if (!expr.isInvocable()) {
    throw new Error('Invalid invocable expr value');
  }

  return expr;
}
