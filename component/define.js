import { repository } from '../core';

export function define (name, Component, options) {
  let ElementClass = repository.$elements[name];

  if (ElementClass) {
    repository.warn(`Duplicate registering "${name}"`);
    return ElementClass;
  }

  if (repository.$config.ceVersion === 'v0') {
    const prototype = Object.create(Component.prototype, { is: { value: name } });
    const ElementPrototype = { prototype };

    if (options && options.extends) {
      ElementPrototype.extends = options.extends;
    }

    ElementClass = document.registerElement(name, ElementPrototype);
  } else {
    // v1 the element class is the component itself
    ElementClass = Component;
    customElements.define(name, Component, options);
  }

  repository.$elements[name] = ElementClass;

  return ElementClass;
}
