import { bootstrap } from '@xinix/xin';

(async function () {
  // use below polyfill to support unsupported customElements v0
  // if (!document.registerElement) await import('webcomponentsjs/micro');
  // use below polyfill to support unsupported customElements v1
  // if (!window.customElements) await import('@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce');

  bootstrap({
    // 'customElements.version': 'v0',
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
    setTimeout(() => {
      document.body.removeAttribute('unresolved');
    }, 100);
  });
})();
