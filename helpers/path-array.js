export function pathArray (path) {
  if (typeof path !== 'string') {
    return path;
  }

  return path.split('.');
}
