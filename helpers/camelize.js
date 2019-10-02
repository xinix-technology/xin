const DASH_REPLACER = /-([a-z])/g;

const camelized = {};

export function camelize (dash) {
  const mapped = camelized[dash];
  if (mapped) {
    return mapped;
  }
  if (dash.indexOf('-') === -1) {
    camelized[dash] = dash;
  } else {
    camelized[dash] = dash.replace(DASH_REPLACER, m => m[1].toUpperCase());
  }

  return camelized[dash];
}
