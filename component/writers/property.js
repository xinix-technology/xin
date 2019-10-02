export function propertyWriter (node, name) {
  return function propertyWrite (value) {
    if (typeof node.set === 'function') {
      node.set(name, value);
    } else {
      node[name] = value;
    }
  };
}
