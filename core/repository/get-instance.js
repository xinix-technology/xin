import { bootstrap } from './bootstrap';
import { deprecated } from '../deprecated';

export function getInstance () {
  let { xin } = window;

  if (!xin) {
    xin = bootstrap(undefined, window);
  } else if ('get' in xin === false) {
    deprecated('', 'Do not use window.xin to set configuration. Please use bootstrap(config) instead.');
    xin = bootstrap(xin, window);
  }

  return xin;
}
