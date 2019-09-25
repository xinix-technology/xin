import { idGenerator } from '../../id-generator';

const nextId = idGenerator();

export function elementToSelector (selector) {
  if (selector.hasAttribute('event-selector-id')) {
    const selectorId = selector.getAttribute('event-selector-id');
    return `[event-selector-id="${selectorId}"]`;
  }

  const selectorId = nextId();
  selector.setAttribute('event-selector-id', selectorId);
  return `[event-selector-id="${selectorId}"]`;
}
