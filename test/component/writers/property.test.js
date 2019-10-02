import { propertyWriter } from '../../../component/writers/property';
import assert from 'assert';

describe('component:writers:property', () => {
  describe('propertyWriter()', () => {
    it('write value of object by setter', () => {
      let k;
      let v;
      const object = {
        set (key, value) {
          k = key;
          v = value;
        },
      };
      const write = propertyWriter(object, 'foo');
      write('23');
      assert.strictEqual(k, 'foo');
      assert.strictEqual(v, '23');
      assert.strictEqual(object.foo, undefined);
    });

    it('set value of object property', () => {
      const object = {};
      const write = propertyWriter(object, 'foo');
      write('23');
      assert.strictEqual(object.foo, '23');
    });
  });
});
