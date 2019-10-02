import { nothing } from '../../helpers';

export function attributeWriter (node, name) {
  return function attributeWrite (value) {
    if (nothing(value) || value === '') {
      node.removeAttribute(name);
    } else {
      node.setAttribute(name, value);
    }
  };
}
