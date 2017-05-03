import { Repository, deprecated } from './core';
import { Component, define } from './component';

function bootstrap () {
  let instance = Repository.getInstance();

  if ('Component' in instance === false) {
    Object.defineProperties(instance, {
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

  return instance;
}
export default bootstrap();
export * from './component';
