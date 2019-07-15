if ('xin' in window) {
  throw new Error('Xin already declared!');
}

require('../');

window.xin.components = require('../components');
