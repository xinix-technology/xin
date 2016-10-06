const options = window.xinOptions || {};

function setup (key, value) {
  switch (arguments.length) {
    case 0:
      return options;
    case 1:
      return options[key] || undefined;
    default:
      options[key] = value;
  }
}

function defaults (values, defaultValues) {
  if (typeof defaultValues !== 'object') {
    return values || defaultValues;
  }

  values = values || {};
  for (var i in defaultValues) {
    if (i in values) {
      continue;
    }

    values[i] = defaultValues[i];
  }
  return values;
}

function withDefault (key, defaultValues) {
  return defaults(setup(key), defaultValues);
}

module.exports = setup;
module.exports.defaults = defaults;
module.exports.withDefault = withDefault;
