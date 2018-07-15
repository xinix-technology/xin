import { bootstrap } from '@xinix/xin';
import './scss/docs.scss';

(async function () {
  bootstrap({
    // 'customElements.version': 'v0',
    'view.transitionIn': 'fade',
    'view.transitionOut': 'fade',
    'view.loaders': [
      {
        test: /^x-/,
        load (view) {
          return import(`./views/${view.name}`);
        },
      },
    ],
  });

  await import('./components/x-app');

  document.addEventListener('started', () => {
    document.body.removeAttribute('unresolved');
  });
})();
