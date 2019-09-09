const handlers = [
  {
    type: Number,
    value (value) {
      if (typeof value === 'number') {
        return value;
      }

      return Number(value);
    },
  },
  {
    type: Boolean,
    value (value) {
      if (typeof value === 'string') {
        return Boolean(value === 'true' || value === '1' || value === 'on' || value === 'yes');
      }

      return !!value;
    },
  },
  {
    type: Object,
    value (value) {
      if (typeof value === 'object') {
        return value;
      }

      try {
        return JSON.parse(value);
      } catch (err) {
        // allow non-JSON literals like Strings and Numbers
        console.warn(`Failed decode json: "${value}" to Object`);
        return null;
      }
    },
  },
  {
    type: Array,
    value (value) {
      if (value instanceof Array) {
        return value;
      }

      try {
        return JSON.parse(value);
      } catch (err) {
        console.warn(`Failed decode json: "${value}" to Array`);
        return null;
      }
    },
  },
  {
    type: Date,
    value (value) {
      if (value instanceof Date) {
        return value;
      }

      return new Date(value);
    },
  },
  {
    type: RegExp,
    value (value) {
      if (value instanceof RegExp) {
        return value;
      }

      return new RegExp(value);
    },
  },
  {
    type: Function,
    value (value) {
      if (typeof value === 'function') {
        return value;
      }

      return new Function(value); // eslint-disable-line no-new-func
    },
  },
  {
    type: String,
    value (value) {
      return String(value);
    },
  },
];

export function deserialize (value, type) {
  if (value === undefined) {
    return undefined;
  }

  const handler = handlers.find(handler => handler.type === type);
  if (!handler) {
    return value;
  }

  return handler.value(value);
}
