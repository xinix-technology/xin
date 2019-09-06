import { ValueAccessor } from '../../../component/accessor/value';
import assert from 'assert';

describe('component:accessor:value ValueAccessor', () => {
  function createNode () {
    const node = document.createElement('input');
    node.type = 'text';
    return node;
  }

  describe('.test()', () => {
    it('detect element with attribute name starts with value.', () => {
      const node = createNode();
      assert.strictEqual(ValueAccessor.test(node, 'value'), true);
    });
  });

  describe('#set()', () => {
    it('set value of value', () => {
      const node = createNode();

      const accessor = new ValueAccessor(node, 'value');
      accessor.set('foo');
      assert.strictEqual(node.value, 'foo');
      accessor.set('');
      assert.strictEqual(node.value, '');
      accessor.set(0);
      assert.strictEqual(node.value, '0');
      accessor.set(null);
      assert.strictEqual(node.value, '');
      accessor.set(undefined);
      assert.strictEqual(node.value, '');
    });
  });
});
