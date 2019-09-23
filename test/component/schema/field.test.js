import { Field } from '../../../component/schema/field';
import assert from 'assert';

describe('component:schema Field', () => {
  class TestField extends Field {
    cast (value) {
      return value;
    }
  }

  describe('constructor', () => {
    it('create new field with default value', () => {
      const field = new TestField('foo', {
        type: String,
        value: 'foo',
      });

      assert.strictEqual(field.get(), 'foo');
    });

    it('create new field with default value in function form', () => {
      const field = new TestField('foo', {
        type: String,
        value: () => 'foo',
      });

      assert.strictEqual(field.get(), 'foo');
    });
  });
});
