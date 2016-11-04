function v (value, ...args) {
  return typeof value === 'function' ? value(...args) : value;
}

function mix (...objects) {
  return objects.reduce((result, o) => {
    for (let i in o) result[i] = o[i];
  }, {});
}

export default { v, mix };
