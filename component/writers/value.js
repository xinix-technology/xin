import { nothing } from '../../helpers';

export function valueWriter (node) {
  return function valueWrite (value) {
    if (document.activeElement !== node) {
      if (nothing(value)) {
        value = '';
      }

      node.value = value;
    }
  };
}
