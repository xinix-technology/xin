export class IdGenerator {
  constructor (key = '') {
    this.key = key;
    this.value = 0;
  }

  next () {
    return this.value++;
  }
}
