const SLOT_SUPPORTED = (() => {
  if (typeof window === 'undefined') {
    return false;
  }

  return (
    'HTMLUnknownElement' in window &&
    !(document.createElement('slot') instanceof window.HTMLUnknownElement)
  );
})();

function slotName (element) {
  return SLOT_SUPPORTED ? element.name : element.getAttribute('name');
}

export { slotName };
