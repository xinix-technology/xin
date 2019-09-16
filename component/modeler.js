import { nothing, pathArray } from '../helpers';

export class Modeler {
  constructor (data) {
    this.data = data;
  }

  traverse (path, callback, immediateReturn) {
    return traverse(this.data, pathArray(path), callback, immediateReturn);
  }

  get (path) {
    return this.traverse(path, value => value);
  }

  set (path, value) {
    if (arguments.length === 1 && typeof path === 'object') {
      const data = path;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          this.set(key, data[key]);
        }
      }
      return;
    }

    const callback = (_, object, segment) => (object[segment] = value);
    return this.traverse(path, callback, false);
  }

  push (path, ...values) {
    const callback = (_, object, segment) => {
      object[segment] = ([...(object[segment] || [])]);
      return object[segment].push(...values);
    };
    return this.traverse(path, callback, false);
  }

  pop (path) {
    const callback = (_, object, segment) => {
      object[segment] = ([...(object[segment] || [])]);
      return object[segment].pop();
    };
    return this.traverse(path, callback, false);
  }

  splice (path, index, removeCount, ...values) { // eslint-disable-line max-params
    const callback = (_, object, segment) => {
      object[segment] = ([...(object[segment] || [])]);
      return object[segment].splice(index, removeCount, ...values);
    };
    return this.traverse(path, callback, false);
  }

  dispose () {
    this.data = undefined;
  }
}

function traverse (object, path, callback, immediateReturn = true) { // eslint-disable-line max-params
  const segment = path.shift();

  const value = nothing(object[segment]) ? undefined : object[segment];

  if (path.length === 0) {
    return callback(value, object, segment, path);
  }

  if (nothing(value)) {
    if (immediateReturn) {
      return callback(undefined, object, segment, path);
    }

    object[segment] = {};
  }

  return traverse(object[segment], path, callback, immediateReturn);
}
