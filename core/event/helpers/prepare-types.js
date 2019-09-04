import { aliases } from './aliases';

export function prepareTypes (types) {
  const preparedTypes = [];

  if (typeof types === 'string') {
    types = types.trim().split(/\s+/);
  }

  if (types instanceof Array === false) {
    throw new Error('Unknown event type');
  }

  types.forEach(type => {
    preparedTypes.push(...aliases(type));
  });

  return preparedTypes;
}
