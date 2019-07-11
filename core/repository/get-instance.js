import { bootstrap } from './bootstrap';
import { hasInstance } from './has-instance';

export function getInstance () {
  if (!hasInstance()) {
    bootstrap();
  }

  const instance = window.xin.__repository;
  if (typeof instance.update !== 'function') {
    throw new Error('Invalid global xin repository found!');
  }

  return instance;
}
