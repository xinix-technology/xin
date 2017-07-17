import xin from '../../';
import '../../components/app';

describe('App', () => {
  it('defined', () => {
    expect(xin.get('xin-app')).toBeTruthy();
  });
});
