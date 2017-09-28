import { Repository } from './repository';

export function bootstrap (data, fallbackScope) {
  let repository = window.xin;
  if (repository) {
    repository.rebootstrap(data, fallbackScope);
  } else {
    window.xin = repository = new Repository(data, fallbackScope);
  }
  return repository;
}
