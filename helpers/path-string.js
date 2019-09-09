export function pathString (path) {
  if (typeof path === 'string') {
    return path;
  }

  return path.join('.');
}
