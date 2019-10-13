import { Field } from '../../../component/schema/field';
import assert from 'assert';

describe('component:schema Field', () => {
  class TestField extends Field {
    cast (value) {
      return value;
    }
  }

  describe('#getDefaultValue()', () => {
    it('get default value', () => {
      const field = new TestField('foo', {
        type: String,
        value: 'foo',
      });

      assert.strictEqual(field.getDefaultValue(), 'foo');
    });

    it('get default value in function form', () => {
      const field = new TestField('foo', {
        type: String,
        value: () => 'foo',
      });

      assert.strictEqual(field.getDefaultValue(), 'foo');
    });
  });
});
