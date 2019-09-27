import { Repository } from './repository';

export function bootstrap (data) {
  let instance = window.xin$__repository;
  if (instance) {
    instance.update(data);
  } else {
    instance = window.xin$__repository = new Repository(data);
  }

  return instance;
}
