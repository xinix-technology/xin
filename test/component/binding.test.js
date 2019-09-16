import { Binding } from '../../component/binding';
import { Annotation } from '../../component/annotation';
import { Expr } from '../../component/expr';
import assert from 'assert';

describe('component:binding Binding', () => {
  describe('#getAnnotatedPaths()', () => {
    it('return annotated paths', () => {
      const binding = new Binding();
      binding.bindAnnotation(new Annotation(Expr.create('[[some.method.foo(some.property.bar)]]')));

      assert.deepStrictEqual(binding.getAnnotatedPaths(), ['some.method.foo', 'some.property.bar']);

      {
        const annotations = binding.getAnnotatedPaths({ includeMethods: true, includeProperties: true });
        assert.deepStrictEqual(annotations, ['some.method.foo', 'some.property.bar']);
      }
      {
        const annotations = binding.getAnnotatedPaths({ includeMethods: false, includeProperties: true });
        assert.deepStrictEqual(annotations, ['some.property.bar']);
      }

      {
        const annotations = binding.getAnnotatedPaths({ includeMethods: true, includeProperties: false });
        assert.deepStrictEqual(annotations, ['some.method.foo']);
      }

      assert.deepStrictEqual(binding.getAnnotatedPaths({ includeMethods: false, includeProperties: false }), []);
    });
  });
});
