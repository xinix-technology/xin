const handlers = [
  {
    type: Number,
    value (value) {
      return Number(value);
    },
  },
  {
    type: Boolean,
    value (value) {
      return Boolean(value === '' || value === 'true' || value === '1' || value === 'on');
    },
  },
  {
    type: Object,
    value (value) {
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
      return new Date(value);
    },
  },
  {
    type: RegExp,
    value (value) {
      return new RegExp(value);
    },
  },
  {
    type: Function,
    value (value) {
      return new Function(value); // eslint-disable-line no-new-func
    },
  },
];

export function deserialize (value, type) {
  const handler = handlers.find(handler => handler.type === type);
  if (!handler) {
    return value;
  }

  return handler.value(value);
}
