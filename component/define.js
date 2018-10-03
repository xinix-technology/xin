import { getInstance } from '../core';

const debug = require('debug')('xin::core:define');

export function define (name, Component, options) {
  const repository = getInstance();

  let ElementClass = repository.get(name);

  if (ElementClass) {
    if (debug.enabled) debug(`Duplicate registering "${name}"`);
    return ElementClass;
  }

  if (repository.get('customElements.version') === 'v1') {
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

  repository.put(name, ElementClass);

  return ElementClass;
}
