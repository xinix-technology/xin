import { Modeler } from '../../component';
import assert from 'assert';

describe('component:modeler Modeler', () => {
  let data;
  beforeEach(() => {
    data = {
      obj: {
        foo: 'bar',
      },
      arr: ['foo', 'bar', 'baz'],
      str: 'foobar',
      one: {
        two: {
          three: '3',
        },
      },
    };
  });

  describe('#traverse()', () => {
    it('traverse to model', () => {
      const model = new Modeler(data);

      model.traverse('obj.foo', (value, object, segment, path) => { // eslint-disable-line max-params
        assert.strictEqual(value, 'bar');
        assert.deepStrictEqual(object, { foo: 'bar' });
        assert.strictEqual(segment, 'foo');
        assert.strictEqual(path.length, 0);
      });

      model.traverse('one.dua.tiga', (value, object, segment, path) => { // eslint-disable-line max-params
        assert.strictEqual(value, undefined);
        assert.deepStrictEqual(object, { two: { three: '3' } });
        assert.strictEqual(segment, 'dua');
        assert.strictEqual(path.length, 1);
      });

      model.traverse('one.dua.tiga', (value, object, segment, path) => { // eslint-disable-line max-params
        assert.strictEqual(value, undefined);
        assert.deepStrictEqual(object, {});
        assert.strictEqual(segment, 'tiga');
        assert.strictEqual(path.length, 0);
      }, false);
    });
  });

  describe('#get()', () => {
    it('get data', () => {
      const model = new Modeler(data);

      assert.strictEqual(model.get('str'), 'foobar');
      assert.strictEqual(model.get('obj.foo'), 'bar');
      assert.strictEqual(model.get('arr.2'), 'baz');
    });
  });

  describe('#set()', () => {
    it('set value', () => {
      const model = new Modeler(data);

      model.set('foo', 'bar');
      assert.strictEqual(model.data.foo, 'bar');
      model.set('bar.baz', 'barbaz');
      assert.strictEqual(model.data.bar.baz, 'barbaz');
    });

    it('set multiple value', () => {
      const data = {};
      const model = new Modeler(data);
      model.set({ foo: 'bar', bar: 'baz' });
      assert.deepStrictEqual(model.data, { foo: 'bar', bar: 'baz' });
    });
  });

  describe('#push()', () => {
    it('push array', () => {
      const model = new Modeler(data);

      model.push('arr', 'one', 'two');
      assert.deepStrictEqual(model.data.arr, ['foo', 'bar', 'baz', 'one', 'two']);

      model.push('arr1', 'one', 'two');
      assert.deepStrictEqual(model.data.arr1, ['one', 'two']);
    });
  });

  describe('#pop()', () => {
    it('pop array', () => {
      const model = new Modeler(data);

      model.pop('arr');
      assert.deepStrictEqual(model.data.arr, ['foo', 'bar']);
    });
  });

  describe('#splice()', () => {
    it('splice array', () => {
      const model = new Modeler(data);

      model.splice('arr', 1, 1, 'one');
      assert.deepStrictEqual(model.data.arr, ['foo', 'one', 'baz']);
    });
  });
});
