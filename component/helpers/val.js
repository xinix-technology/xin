export function val (value, ...args) {
  return typeof value === 'function' ? value(...args) : value;
}
