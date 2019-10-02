import { aliases } from './aliases';

const SPACE_DELIMITED_SPLITTER = /\s+/;

export function prepareTypes (types) {
  const preparedTypes = [];

  if (typeof types === 'string') {
    types = types.trim().split(SPACE_DELIMITED_SPLITTER);
  }

  if (types instanceof Array === false) {
    throw new Error('Unknown event type');
  }

  types.forEach(type => {
    preparedTypes.push(...aliases(type));
  });

  return preparedTypes;
}
