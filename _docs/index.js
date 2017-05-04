require('file-loader?name=[name].[ext]!extract-loader?!./index.html'); // eslint-disable-line import/no-webpack-loader-syntax

require('./css/main.css');

require('file-loader?name=pages/[name].[ext]!./pages/index.md'); // eslint-disable-line import/no-webpack-loader-syntax
let file = 'index';
require('file-loader?name=pages/guides/[name].[ext]!./pages/guides/' + file + '.md');
require('file-loader?name=pages/concepts/[name].[ext]!./pages/concepts/' + file + '.md');
require('file-loader?name=pages/views/[name].[ext]!./pages/views/' + file + '.md');

require('file-loader?name=[name].[ext]!./favicon.ico'); // eslint-disable-line import/no-webpack-loader-syntax
require('file-loader?name=[name].[ext]!./manifest.json'); // eslint-disable-line import/no-webpack-loader-syntax
file = 'apple-icon';
require('file-loader?name=icons/[name].[ext]!./icons/' + file + '.png');

let next = Promise.resolve();
if ('fetch' in window === false) {
  next = next.then(() => System.import('whatwg-fetch'));
}

if ('customElements' in window === false) {
  next = next.then(() => System.import('@webcomponents/custom-elements'));
}

window.xin = {
  // 'env.debug': true,
  'view.transition': 'fade',
};

next.then(() => System.import('./components/doc-app'));
