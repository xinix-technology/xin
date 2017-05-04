/* eslint-env mocha */

import assert from 'assert';
import xin from '../../';
import '../../components/app';

describe('App', () => {
  it('defined', () => {
    assert(xin.get('xin-app'));
  });
});
