const repository = require('./repository');
const Component = require('./component');
const Fx = require('./fx');
const asyncModule = require('./async');
const dom = require('./dom');
const inflector = require('./inflector');
const setup = require('./setup');

module.exports = window.xin = repository.get;
module.exports.put = repository.put;
module.exports.define = repository.define;
module.exports.Component = Component;
module.exports.Fx = Fx;
module.exports.async = asyncModule;
module.exports.dom = dom;
module.exports.inflector = inflector;
module.exports.setup = setup;
