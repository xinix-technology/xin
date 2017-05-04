import { bootstrap } from './bootstrap';
import { deprecated } from '../deprecated';

export function getInstance () {
  if ('xin' in window === false || 'get' in window.xin === false) {
    if (window.xin) {
      deprecated('', 'Do not use window.xin to set configuration. Please use bootstrap(config) instead.');
    }
    bootstrap(window.xin, window);
  }

  return window.xin;
}
