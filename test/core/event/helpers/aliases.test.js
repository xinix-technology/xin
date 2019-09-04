import { aliases } from '../../../../core/event/helpers/aliases';
import assert from 'assert';

describe('core:event:helpers aliases()', () => {
  it('return array', () => {
    assert(aliases('click') instanceof Array);
  });

  it('return transitionend', () => {
    const el = document.createElement('fake');
    if (el.style.transition) {
      assert.deepStrictEqual(aliases('transitionend'), ['transitionend']);
      return;
    }

    if (el.style.WebkitTransition) {
      assert.deepStrictEqual(aliases('transitionend'), ['webkitTransitionEnd']);
    }
  });

  it('contains click', () => {
    assert.notStrictEqual(aliases('tap').indexOf('click'), -1);
  });
});
