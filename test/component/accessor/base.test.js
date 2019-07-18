import { BaseAccessor } from '@xinix/xin/component/accessor/base';
import assert from 'assert';

describe('component/accessor/base BaseAccessor', () => {
  describe('#set()', () => {
    it('set value of object by setter', () => {
      let k;
      let v;
      const object = {
        set (key, value) {
          k = key;
          v = value;
        },
      };
      const accessor = new BaseAccessor(object, 'foo');
      accessor.set('23');
      assert.strictEqual(k, 'foo');
      assert.strictEqual(v, '23');
      assert.strictEqual(object.foo, undefined);
    });

    it('set value of object property', () => {
      const object = {};
      const accessor = new BaseAccessor(object, 'foo');
      accessor.set('23');
      assert.strictEqual(object.foo, '23');
    });
  });

  describe('#get()', () => {
    it('get value of object by getter', () => {
      const object = {
        get (key) {
          return 'bar';
        },
      };
      const accessor = new BaseAccessor(object, 'foo');
      assert.strictEqual(accessor.get(), 'bar');
    });

    it('get value of object property', () => {
      const object = {
        foo: 'baz',
      };
      const accessor = new BaseAccessor(object, 'foo');
      assert.strictEqual(accessor.get(), 'baz');
    });
  });
});
