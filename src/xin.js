const lib = require('../');
const xin = lib.getInstance();
const proto = Object.getPrototypeOf(xin);

Object.setPrototypeOf(proto, lib);

xin.component = require('../components');
xin.middleware = require('../middlewares');

require('./xin.scss');
