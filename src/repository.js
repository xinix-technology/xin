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

function v (value) {
  return typeof value === 'function' ? value.apply(null, [].slice.call(arguments, 1)) : value;
}

function define (name, Comp, options) {
  // TODO please make it happen for v1
  // if (window.customElements) {
  //   throw new Error('Unimplemented webcomponents v1');
  //   // window.customElements.define(name, Comp, options);
  //   // return Comp;
  // }

  let Proto = {
    prototype: Object.create(Comp.prototype, {
      is: {
        get () {
          return name;
        },
      },
    }),
    extends: options && options.extends ? options.extends : undefined,
  };

  let ElementClass = document.registerElement(name, Proto);

  put(name, ElementClass);

  return ElementClass;
}

function mix () {
  let data = {};
  [].forEach.call(arguments, collection => {
    for (let i in collection) data[i] = collection[i];
  });
  return data;
}

module.exports.get = get;
module.exports.put = put;
module.exports.define = define;
module.exports.v = v;
module.exports.mix = mix;
