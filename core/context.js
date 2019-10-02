import { nothing, pathArray } from '../helpers';

export class Context {
  constructor () {
    this.instance = this;
  }

  traverse (path, immediateReturn) {
    return traverse(this.instance, pathArray(path), immediateReturn);
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

  all (object) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        this.set(key, object[key]);
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

  /**
   * Splice an array at path
   * @param {any} path
   * @param {any} index
   * @param {any} removeCount
   * @param  {...any} values
   */
  splice () {
    const [path, index, removeCount, ...values] = arguments;
    const { object, key } = this.traverse(path, false);
    object[key] = ([...(object[key] || [])]);

    return object[key].splice(index, removeCount, ...values);
  }
}

function traverse (object, path, immediateReturn = true) {
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
