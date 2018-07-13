export default function (val) {
  if (val === undefined || val === null) {
    return '';
  }
  return String(val);
}
