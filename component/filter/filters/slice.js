export default function (val, begin, end) {
  return Array.prototype.slice.call(val || [], begin, end);
}
