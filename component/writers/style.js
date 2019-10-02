export function styleWriter (node, name) {
  return function styleWrite (value) {
    node.style[name] = value || '';
  };
}
