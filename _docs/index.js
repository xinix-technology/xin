require('file-loader?name=[name].[ext]!extract-loader?!./index.html');

require('./css/main.css');
require('xin/css/layout.css');

require('file-loader?name=pages/[name].[ext]!./pages/index.md');
let file = 'index';
require('file-loader?name=pages/guides/[name].[ext]!./pages/guides/' + file + '.md');
require('file-loader?name=pages/concepts/[name].[ext]!./pages/concepts/' + file + '.md');
require('file-loader?name=pages/views/[name].[ext]!./pages/views/' + file + '.md');

let next = Promise.resolve();
if ('customElements' in window === false) {
  next = next.then(() => System.import('@webcomponents/custom-elements'));
}

window.xin = {
  'xin.View.transition': 'fade',
};

next.then(() => System.import('./components/doc-app'));
