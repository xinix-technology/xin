function camelize (str) {
  return str.replace(/-\D/g, match => match.charAt(1).toUpperCase());
}

// function hyphenate (str) {
//   return str.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
// }

const setters = {

};

function setter (key) {
  if ('key' in setters) {
    return setters[key];
  }

  let fn = setters[key] = (element, value) => {
    element.style[camelize(key)] = value;
  };
  return fn;
}

function set (element, key, value) {
  setter(key)(element, value);
}

function Css (element) {
  if (this instanceof Css === false) {
    return new Css(element);
  }

  this.element = element;
}

Css.prototype.set = function (key, value) {
  if (typeof key === 'string') {
    set(this.element, key, value);
  } else {
    for (let k in key) {
      set(this.element, k, key[k]);
    }
  }

  return this;
};

export default Css;

// -webkit-backface-visibility: hidden;
// backface-visibility: hidden;
// will-change: transform, -webkit-transform;
// -webkit-transition: -webkit-transform 3s;
// transition: transform 3s;
// this.element.style.webkitTransform = 'translateX(100%)';
// this.element.style.transform = 'translateX(100%)';
