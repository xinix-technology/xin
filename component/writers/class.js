export function classWriter (node, name) {
  return function classWrite (value) {
    if (value) {
      node.classList.add(name);
    } else {
      node.classList.remove(name);
    }
  };
}
