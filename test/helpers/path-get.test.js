import assert from 'assert';
import { pathGet } from '../../helpers';

describe('helpers:path-get #pathGet()', () => {
  it('get value from nested object', () => {
    const object = {
      foo: 'bar',
      bar: {
        baz: 'baz',
      },
    };

    assert.strictEqual(pathGet(object, 'foo'), 'bar');
    assert.strictEqual(pathGet(object, 'bar.baz'), 'baz');
    assert.strictEqual(pathGet(object, 'bar.bar'), undefined);
  });
});
