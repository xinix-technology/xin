import { Repository } from '../core';

export function define (name, Component, options) {
  const repository = Repository.singleton();

  let ElementClass = repository.get(name);

  if (ElementClass) {
    console.warn(`Duplicate registering "${name}"`);
    return ElementClass;
  }

  if (repository.get('customElements.version') === 'v1') {
    // v1 the element class is the component itself
    ElementClass = Component;
    customElements.define(name, Component, options);
  } else {
    const prototype = Object.create(Component.prototype, { is: { value: name } });
    const ElementPrototype = { prototype };

    if (options && options.extends) {
      ElementPrototype.extends = options.extends;
    }

    ElementClass = document.registerElement(name, ElementPrototype);
  }

  repository.put(name, ElementClass);

  return ElementClass;
}
