const ids = {};

export function nextId (key) {
  ids[key] = ids[key] || 0;
  return ids[key]++;
}
