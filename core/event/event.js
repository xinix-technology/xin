import { Delegator } from './delegator';

export function event (element) {
  if (!element.__eventDelegator) {
    element.__eventDelegator = new Delegator(element);
  }

  return element.__eventDelegator;
}
