import { idGenerator } from '../../../helpers';

const nextId = idGenerator();

export function elementToSelector (selector) {
  if (selector.hasAttribute('event-selector-id')) {
    return selector.getAttribute('event-selector-id');
  }

  const selectorId = nextId();
  selector.setAttribute('event-selector-id', selectorId);
  return `[event-selector-id="${selectorId}"]`;
}
