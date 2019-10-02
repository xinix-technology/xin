import { repository } from '../core';
import { idGenerator } from '../helpers/id-generator';

export function define (name, Component, options) {
  let ElementClass = repository.$elements[name];

  if (ElementClass) {
    repository.warn(`Duplicate registering "${name}"`);
    return ElementClass;
  }

  if (repository.$config.customElementsVersion === 'v0') {
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

const nextVal = idGenerator();

export function defineTest (Component, options) {
  const name = `test-${nextVal()}`;

  define(name, Component, options);

  return name;
}
