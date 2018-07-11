export function idGenerator () {
  let value = 0;
  return function next () {
    return value++;
  };
}
