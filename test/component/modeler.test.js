import assert from 'assert';
import { Binding } from '../../component/binding';
import { Modeler } from '../../component/modeler';

describe('component:modeler Modeler', () => {
  let instance;
  let binding;
  beforeEach(() => {
    binding = new Binding();
    instance = {
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
      const model = new Modeler({ instance });

      {
        const { value, object, key, path } = model.traverse('obj.foo');
        assert.strictEqual(value, 'bar');
        assert.deepStrictEqual(object, { foo: 'bar' });
        assert.strictEqual(key, 'foo');
        assert.strictEqual(path.length, 0);
      }

      {
        const { value, object, key, path } = model.traverse('one.dua.tiga');
        assert.strictEqual(value, undefined);
        assert.deepStrictEqual(object, { two: { three: '3' } });
        assert.strictEqual(key, 'dua');
        assert.strictEqual(path.length, 1);
      }

      {
        const { value, object, key, path } = model.traverse('one.dua.tiga', false);
        assert.strictEqual(value, undefined);
        assert.deepStrictEqual(object, {});
        assert.strictEqual(key, 'tiga');
        assert.strictEqual(path.length, 0);
      }
    });
  });

  describe('#get()', () => {
    it('get value', () => {
      const model = new Modeler({ instance });

      assert.strictEqual(model.get('str'), 'foobar');
      assert.strictEqual(model.get('obj.foo'), 'bar');
      assert.strictEqual(model.get('arr.2'), 'baz');
    });
  });

  describe('#set()', () => {
    it('set value', () => {
      const model = new Modeler({ instance, binding });

      model.set('foo', 'bar');
      assert.strictEqual(instance.foo, 'bar');
      model.set('bar.baz', 'barbaz');
      assert.strictEqual(instance.bar.baz, 'barbaz');
    });

    it('set multiple value', () => {
      const instance = {};
      const model = new Modeler({ instance, binding });
      model.set({ foo: 'bar', bar: 'baz' });
      assert.deepStrictEqual(instance, { foo: 'bar', bar: 'baz' });
    });
  });

  describe('#push()', () => {
    it('push array', () => {
      const model = new Modeler({ instance, binding });

      model.push('arr', 'one', 'two');
      assert.deepStrictEqual(instance.arr, ['foo', 'bar', 'baz', 'one', 'two']);

      model.push('arr1', 'one', 'two');
      assert.deepStrictEqual(instance.arr1, ['one', 'two']);
    });
  });

  describe('#pop()', () => {
    it('pop array', () => {
      const model = new Modeler({ instance, binding });

      model.pop('arr');
      assert.deepStrictEqual(instance.arr, ['foo', 'bar']);
    });
  });

  describe('#splice()', () => {
    it('splice array', () => {
      const model = new Modeler({ instance, binding });

      model.splice('arr', 1, 1, 'one');
      assert.deepStrictEqual(instance.arr, ['foo', 'one', 'baz']);
    });
  });
});
