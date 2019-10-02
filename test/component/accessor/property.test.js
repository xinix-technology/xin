import { PropertyAccessor } from '../../../component/accessor/property';
import assert from 'assert';

describe('component:accessor:property PropertyAccessor', () => {
  describe('#write()', () => {
    it('write value of object by setter', () => {
      let k;
      let v;
      const object = {
        set (key, value) {
          k = key;
          v = value;
        },
      };
      const accessor = new PropertyAccessor(object, 'foo');
      accessor.write('23');
      assert.strictEqual(k, 'foo');
      assert.strictEqual(v, '23');
      assert.strictEqual(object.foo, undefined);
    });

    it('set value of object property', () => {
      const object = {};
      const accessor = new PropertyAccessor(object, 'foo');
      accessor.write('23');
      assert.strictEqual(object.foo, '23');
    });
  });
});
