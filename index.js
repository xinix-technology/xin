const xin = window.xin = window.xin || {
  ...require('./core'),
  ...require('./component'),
  components: require('./components'),
};

export const {
  html,
  Repository,
  repository,
  Async,
  Context,
  event,
  Template,
  base,
  Component,
  define,
  Schema,
  Filter,
  testing,
} = xin;
