import { Repository } from './repository';

export function bootstrap (data, fallbackScope) {
  let repository = window.xin = new Repository(data, fallbackScope);

  return repository;
}
