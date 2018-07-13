if ('xin' in window) {
  throw new Error('Xin already declared!');
}

const xin = window.xin = require('../');

xin.getInstance(); // force creating new instance of repository for the first time

xin.components = require('../components');
xin.middlewares = require('../middlewares');

require('./xin.scss');
