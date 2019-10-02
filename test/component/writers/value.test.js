import { valueWriter } from '../../../component/writers/value';
import assert from 'assert';

describe('component:writers:value', () => {
  function createNode () {
    const node = document.createElement('input');
    node.type = 'text';
    return node;
  }

  describe('valueWriter()', () => {
    it('write value of value', () => {
      const node = createNode();

      const write = valueWriter(node, 'value');
      write('foo');
      assert.strictEqual(node.value, 'foo');
      write('');
      assert.strictEqual(node.value, '');
      write(0);
      assert.strictEqual(node.value, '0');
      write(null);
      assert.strictEqual(node.value, '');
      write(undefined);
      assert.strictEqual(node.value, '');
    });
  });
});
