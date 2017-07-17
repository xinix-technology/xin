import xin from '../../';
import '../../components/pager';

describe('Pager', () => {
  it('defined', () => {
    expect(xin.get('xin-pager')).toBeTruthy();
  });
});
