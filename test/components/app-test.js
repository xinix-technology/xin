/* globals describe, it */

import assert from 'assert';
import xin from '../../';
import '../../components/app';

describe('App', () => {
  it('defined', () => {
    assert(xin('xin-app'));
  });
});
