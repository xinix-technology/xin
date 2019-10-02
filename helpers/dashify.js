const CAMEL_REPLACER = /([a-z][A-Z])/g;

const dashified = {};

export function dashify (camel) {
  const mapped = dashified[camel];
  if (mapped) {
    return mapped;
  }
  dashified[camel] = camel.replace(CAMEL_REPLACER, g => `${g[0]}-${g[1].toLowerCase()}`);

  return dashified[camel];
}
