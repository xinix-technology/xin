export function addClass (elements, ...classes) {
  elements.forEach(el => {
    el.classList.add(...classes);
  });
}
