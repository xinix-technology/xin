if ('xin' in window) {
  throw new Error('Xin already declared!');
}

const xin = window.xin = require('../');
xin.components = require('../components');
