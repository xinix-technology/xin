export default function (val) {
  if (val === undefined || val === null || val === '') {
    throw new Error('Value is required');
  }
  return val;
}
