import { nothing } from './nothing';

export function inspect (object) {
  if (nothing(object)) {
    return object;
  }

  if (typeof object.__xinInspect === 'function') {
    return object.__xinInspect();
  }

  return object.toString();
}
