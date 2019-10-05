import { Schema } from '../../../component';
import assert from 'assert';

describe('component:schema Schema', () => {
  describe('constructor', () => {
    it('create new schema', () => {
      const schema = new Schema({
        foo: {
          type: String,
        },
        bar: String,
        array: [Array, Date],
      });

      assert.strictEqual(schema.traverse('foo').constructor.name, 'StringField');
      assert.strictEqual(schema.traverse('bar').constructor.name, 'StringField');
      assert.strictEqual(schema.traverse('array').constructor.name, 'ArrayField');
      assert.strictEqual(schema.traverse('array.0').constructor.name, 'DateField');
    });
  });

  describe('#cast()', () => {
    it('cast value to type', () => {
      const schema = new Schema({
        number: {
          type: Number,
        },
        object: {
          type: [Object, {
            bool: {
              type: Boolean,
            },
          }],
        },
        array: {
          type: [Array, Date],
        },
        array1: {
          type: [Array, [Object, {
            string: {
              type: String,
            },
          }]],
        },
      });

      assert.strictEqual(schema.cast('number', '123'), 123);
      assert.strictEqual(schema.cast('unknown', 'foo'), 'foo');
      assert.deepStrictEqual(schema.cast('object', '{"bool":false}'), { bool: false });
      assert.strictEqual(schema.cast('object.bool', 'yes'), true);

      assert.deepStrictEqual(schema.cast('array', '[]'), []);
      const date = new Date();
      assert.strictEqual(schema.cast('array.0', date), date);

      assert.strictEqual(schema.cast('array1.0.string', 100), '100');
    });
  });

  describe('#eq()', () => {
    it('compare functions', () => {
      const schema = new Schema({
        fun: {
          type: Function,
        },
      });

      const fun = () => 'somefunction';
      assert(schema.eq('fun', fun, fun));
    });
  });
});
