import filters from './filters';

let registry;

export class Filter {
  static reset () {
    registry = {
      ...filters,
    };
  }

  static put (name, callback) {
    registry[name] = callback;
  }

  static resolve (name) {
    const segments = name.split(':');
    const args = segments.splice(1).join(':').split(',');
    const key = segments.pop();

    const callback = registry[key];
    if (!callback) {
      throw new Error(`Filter "${name}" not found.`);
    }

    return new Filter(key, callback, args);
  }

  constructor (name, callback, otherArgs) {
    this.name = name;
    this.callback = callback;
    this.otherArgs = otherArgs;
  }

  invoke (val) {
    const args = [val];
    [].push.apply(args, this.otherArgs);
    return this.callback.apply(null, args);
  }
}

Filter.reset();
