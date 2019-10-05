import { repository } from '../..';
import { Token } from '../../component/token';
import assert from 'assert';

describe('component:token Token', () => {
  describe('#invoke()', () => {
    beforeEach(() => {
      repository.reset();
    });

    afterEach(() => {
      repository.reset();
    });

    it('invoke function from model', () => {
      const token = new Token('fooFn');
      const model = {
        invoker: {
          fooFn () {
            return 'foo';
          },
        },
      };

      assert.strictEqual(token.invoke(model), 'foo');
    });

    it('invoke function from global', () => {
      repository.set('$foo', {
        fooFn () {
          return 'foo';
        },
      });

      const token = new Token('$foo.fooFn');
      assert.strictEqual(token.invoke(), 'foo');
    });
  });
});
