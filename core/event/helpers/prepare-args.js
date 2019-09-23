import { prepareTypes } from './prepare-types';
import { elementToSelector } from './element-to-selector';

export function prepareArgs (types, selector = '', callback) {
  types = prepareTypes(types);

  if (!callback && typeof (selector) === 'function') {
    callback = selector;
    selector = '';
  }

  if (selector instanceof Element) {
    selector = elementToSelector(selector);
  }

  return [types, selector, callback];
}
