import { bootstrap } from './bootstrap';

export function getInstance () {
  let instance = window.xin;
  if (!instance) {
    instance = bootstrap();
  }

  if (typeof instance.rebootstrap !== 'function') {
    throw new Error('Invalid global xin repository found!');
  }

  return instance;
}
