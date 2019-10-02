import { nothing } from '../../helpers';

export function htmlWriter (node) {
  return function htmlWrite (value) {
    if (nothing(value)) {
      value = '';
    }

    node.innerHTML = value;
  };
}
