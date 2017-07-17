import xin from '../../';
import '../../components/xhr';

// <template id="tpl">
//   <xin-xhr url="../mock/people.json"></xin-xhr>
// </template>

describe('XHR', () => {
  it('defined', () => {
    expect(xin.get('xin-xhr')).toBeTruthy();
  });
});
