import { nothing, pathArray } from '../helpers';

export class Context {
  constructor () {
    this.data = this;
  }

  traverse (path, immediateReturn) {
    return traverse(this.data, pathArray(path), immediateReturn);
  }

  get (path) {
    const { value } = this.traverse(path);
    return value;
  }

  set (path, value) {
    if (typeof path === 'object') {
      return this.all(path);
    }

    const { object, key } = this.traverse(path, false);

    object[key] = value;
  }

  all (data) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        this.set(key, data[key]);
      }
    }
  }

  push (path, ...values) {
    const { object, key } = this.traverse(path, false);
    object[key] = ([...(object[key] || [])]);

    return object[key].push(...values);
  }

  pop (path) {
    const { object, key } = this.traverse(path, false);
    object[key] = ([...(object[key] || [])]);

    return object[key].pop();
  }

  splice (path, index, removeCount, ...values) { // eslint-disable-line max-params
    const { object, key } = this.traverse(path, false);
    object[key] = ([...(object[key] || [])]);

    return object[key].splice(index, removeCount, ...values);
  }
}

function traverse (object, path, immediateReturn = true) { // eslint-disable-line max-params
  const key = path.shift();

  const value = nothing(object[key]) ? undefined : object[key];

  if (path.length === 0) {
    return { value, object, key, path };
  }

  if (nothing(value)) {
    if (immediateReturn) {
      const value = undefined;
      return { value, object, key, path };
    }

    object[key] = {};
  }

  return traverse(object[key], path, immediateReturn);
}
