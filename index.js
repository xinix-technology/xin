const xin = window.xin = window.xin || {
  ...require('./core'),
  ...require('./component'),
  components: require('./components'),
};

/**
 * @typedef {import('./core').Async} Async
 * @typedef {import('./core').Context} Context
 * @typedef {import('./core').Repository} Repository
 * @typedef {import('./core').repository} repository
 * @typedef {import('./core').event} event
 * @typedef {import('./core').define} define
 * @typedef {import('./component').html} html
 * @typedef {import('./component').Template} Template
 * @typedef {import('./component').base} base
 * @typedef {import('./component').Component} Component
 * @typedef {import('./component').Schema} Schema
 * @typedef {import('./component').Filter} Filter
 * @typedef {import('./component').testing} testing
 */

/**
 * @typedef {Object} xin
 * @property {html} html
 * @property {Async} Async
 * @property {base} base
 */

/**
 * @type {xin} xin
 */
export const {
  Async,
  Context,
  Repository,
  repository,
  event,
  define,
  html,
  Template,
  base,
  Component,
  Schema,
  Filter,
  testing,
} = xin;
