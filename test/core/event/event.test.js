import { event, Delegator } from '../../../core/event';
import assert from 'assert';

describe('core:event event()', () => {
  it('return unique delegator for each element', () => {
    const div = document.createElement('div');
    const div2 = document.createElement('div');

    const delegator = event(div);
    assert(delegator instanceof Delegator);

    assert.strictEqual(delegator, event(div));

    assert.notStrictEqual(delegator, event(div2));
  });
});
