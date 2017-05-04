import { getInstance, deprecated } from './core';
import { Component, define } from './component';

export default (function () {
  let repository = getInstance();

  if ('Component' in repository === false) {
    Object.defineProperties(repository, {
      Component: {
        get () {
          deprecated('xin.Component', 'import { Component } from \'@xinix/xin\'');
          return Component;
        },
      },

      define: {
        get () {
          deprecated('xin.define', 'import { define } from \'@xinix/xin\'');
          return define;
        },
      },
    });
  }

  return repository;
})();
export * from './core';
export * from './component';
