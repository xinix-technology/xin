/* eslint-env mocha */

import assert from 'assert';
import xin from '../../';
import '../../components/view';

describe('View', () => {
  it('defined', () => {
    assert(xin.get('xin-view'));
  });
});
