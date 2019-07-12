import assert from 'assert';
import { Repository, bootstrap } from '@xinix/xin/core/repository';

describe('core/repository/bootstrap bootstrap()', () => {
  it('rebootstrap with data', () => {
    const repo = Repository.singleton();

    assert.strictEqual(repo.get('foo'), undefined);

    bootstrap({
      foo: 'bar',
    });

    assert.strictEqual(repo.get('foo'), 'bar');

    bootstrap({
      foo: undefined,
    });
  });
});
