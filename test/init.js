window.XIN_CE_VERSION = window.XIN_CE_VERSION || process.env.XIN_CE_VERSION || 'v1';

console.warn('XIN_CE_VERSION =', window.XIN_CE_VERSION);

const { repository } = require('..');
repository.$config.errorHandler = err => {
  console.error('Xin uncaught err', err);
};
