export function removeClass (elements, ...classes) {
  elements.forEach(el => {
    el.classList.remove(...classes);
  });
}
