const REPOSITORY = {};

function get (id) {
  if (!isNaN(id)) {
    return REPOSITORY[id];
  }

  if (REPOSITORY[id]) {
    return REPOSITORY[id];
  }

  var idSplitted = id.split('.');
  var scope = window;
  idSplitted.find(function (token) {
    scope = scope[token];
    return !scope;
  });

  return scope;
}

function put (id, value) {
  REPOSITORY[id] = value;
}

export { get, put };
