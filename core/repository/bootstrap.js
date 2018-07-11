import { Repository } from './repository';

export function bootstrap (data) {
  let repository = window.xin;
  if (repository) {
    repository.rebootstrap(data);
  } else {
    window.xin = repository = new Repository(data);
  }
  return repository;
}
