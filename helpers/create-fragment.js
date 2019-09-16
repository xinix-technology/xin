export function createFragment (from, excludes = []) {
  const fragment = document.createDocumentFragment();
  from.forEach(node => {
    if (excludes.indexOf(node) === -1) {
      fragment.appendChild(node);
    }
  });
  return fragment;
}
