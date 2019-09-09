import { pathArray } from './path-array';
import { nothing } from './nothing';

export function pathGet (object, path) {
  if (nothing(object)) {
    throw new Error('Cannot get from nothing');
  }

  return _pathGet(object, pathArray(path));
}

function _pathGet (object, path) {
  const segment = path.shift();

  if (nothing(object[segment])) {
    return undefined;
  }

  if (path.length === 0) {
    return object[segment];
  }

  return _pathGet(object[segment], path);
}
