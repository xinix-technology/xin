export function deserialize (value, type) {
  switch (type) {
    case Number:
      value = Number(value);
      break;

    case Boolean:
      value = Boolean(value === '' || value === 'true' || value === '1' || value === 'on');
      break;

    case Object:
      try {
        value = JSON.parse(value);
      } catch (err) {
        // allow non-JSON literals like Strings and Numbers
        console.warn(`Failed decode json: "${value}" to Object`);
      }
      break;

    case Array:
      try {
        value = JSON.parse(value);
      } catch (err) {
        console.warn(`Failed decode json: "${value}" to Array`);
        value = null;
      }
      break;

    case Date:
      value = new Date(value);
      break;

    case RegExp:
      value = new RegExp(value);
      break;

    case Function:
      value = new Function(value); // eslint-disable-line no-new-func
      break;

    // behave like default for now
    // case String:
    default:
      break;
  }
  return value;
}
