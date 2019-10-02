import { Expr } from '../../component/expr';
import assert from 'assert';

describe('component:expr Expr', () => {
  describe('.validate()', () => {
    it('validate expr string', () => {
      assert.strictEqual(Expr.validate('[[foo]]'), true);
      assert.strictEqual(Expr.validate('{{foo}}'), true);
      assert.strictEqual(Expr.validate(' {{ foo }} '), true);
      assert.strictEqual(Expr.validate('foo'), false);
      assert.strictEqual(Expr.validate('[[foo'), false);
    });
  });

  describe('.unwrap()', () => {
    it('unwrap exp string', () => {
      assert.deepStrictEqual(Expr.unwrap('[[foo]]'), ['foo', Expr.READONLY]);
      assert.deepStrictEqual(Expr.unwrap('{{foo}}'), ['foo', Expr.READWRITE]);
      assert.deepStrictEqual(Expr.unwrap(' [[ foo ]] '), ['foo', Expr.READONLY]);
    });
  });

  describe('.parse()', () => {
    it('parse exp string', () => {
      const { fn, args, varArgs, filters } = Expr.parse('foo');
      assert.strictEqual(fn, undefined);
      assert.strictEqual(args.length, 1);
      assert.strictEqual(args[0].string, 'foo');
      assert.strictEqual(args[0], varArgs[0]);
      assert.strictEqual(filters.length, 0);
    });
  });

  describe('constructor', () => {
    it('create new expr', () => {
      {
        const expr = new Expr(' [[ foo ]] ');
        assert.strictEqual(expr.mode, Expr.READONLY);
        assert.strictEqual(expr.string, 'foo');
      }

      {
        const expr = new Expr(' foo', Expr.READWRITE);
        assert.strictEqual(expr.mode, Expr.READWRITE);
        assert.strictEqual(expr.string, 'foo');
      }
    });

    it('create new invocable expr', () => {
      const expr = new Expr('{{foo(bar)}}');
      assert.strictEqual(expr.mode, Expr.READONLY);
      assert.strictEqual(expr.string, 'foo(bar)');
      assert.strictEqual(expr.fn.string, 'foo');
      assert.strictEqual(expr.args.length, 1);
      assert.strictEqual(expr.args[0].string, 'bar');
    });
  });

  describe('#eval()', () => {
    it('eval expr', () => {
      const expr = new Expr('[[foo]]');
      assert.strictEqual(expr.eval({ foo: 'bar' }), 'bar');
    });
  });

  describe('#isInvocable()', () => {
    it('true if expr is invocable', () => {
      assert.strictEqual(new Expr('[[foo(bar)]]').isInvocable(), true);
    });

    it('false if expr is not invocable', () => {
      assert.strictEqual(new Expr('[[foo]]').isInvocable(), false);
    });
  });
});
