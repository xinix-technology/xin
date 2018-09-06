export default function (val) {
  return (val || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
