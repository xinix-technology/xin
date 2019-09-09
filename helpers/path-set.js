import { pathArray } from './path-array';
import { nothing } from './nothing';

export function pathSet (object, path, value) {
  if (nothing(object)) {
    throw new Error('Cannot set to nothing');
  }

  return _pathSet(object, pathArray(path), value);
}

function _pathSet (object, path, value) {
  const segment = path.shift();

  if (path.length === 0) {
    object[segment] = value;
    return;
  }

  if (nothing(object[segment])) {
    object[segment] = {};
  }

  return _pathSet(object[segment], path, value);
}
