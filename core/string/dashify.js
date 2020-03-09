const dashified = {};

export function dashify (camel) {
  const mapped = dashified[camel];
  if (mapped) {
    return mapped;
  }
  dashified[camel] = camel.replace(
    /([a-z][A-Z])/g,
    function (g) {
      return g[0] + '-' + g[1].toLowerCase();
    },
  );

  return dashified[camel];
}
