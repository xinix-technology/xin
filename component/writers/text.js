import { nothing } from '../../helpers';

export function textWriter (node) {
  return function textWrite (value) {
    if (nothing(value)) {
      value = '';
    }

    node.textContent = value;
  };
}
