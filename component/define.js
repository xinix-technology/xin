import { Repository } from '../core';

export function define (name, Component, options) {
  const repo = Repository.getInstance();

  let ElementClass = repo.get(name);

  if (ElementClass) {
    console.warn(`Duplicate registering ${name}`);
    return ElementClass;
  }

  if (repo.get('config').get('customElements.version') === 'v1') {
    // v1 the element class is the component itself
    ElementClass = Component;
    window.customElements.define(name, Component, options);
  } else {
    let prototype = Object.create(Component.prototype, { is: { value: name } });
    let ElementPrototype = { prototype };

    if (options && options.extends) {
      ElementPrototype.extends = options.extends;
    }

    ElementClass = document.registerElement(name, ElementPrototype);
  }

  repo.put(name, ElementClass);

  return ElementClass;
}
