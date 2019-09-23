export function matches (element, selector) {
  const matcher = element.matches ||
    element.webkitMatchesSelector ||
    element.mozMatchesSelector ||
    element.msMatchesSelector ||
    element.oMatchesSelector;

  return matcher.call(element, selector);
}
