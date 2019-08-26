import assert from 'assert';
import { accessorFactory } from '../../../component/accessor';

describe('component:accessor:accessor #accessorFactory()', () => {
  it('throw error', () => {
    assert.throws(() => {
      accessorFactory({}, 'foo');
    }, /Unimplemented resolving accessor for nodeType/);
  });
});
