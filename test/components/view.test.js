import assert from 'assert';
import { Fixture } from '@xinix/xin/components';

import '../../scss/xin.scss';
import '../../scss/xin-components.scss';

describe('View', () => {
  it('render list', async () => {
    let fixture = Fixture.create(`
      <xin-app>
        <xin-pager>
          <xin-view uri="/">home</xin-view>
          <xin-view uri="/foo">foo</xin-view>
          <xin-view uri="/bar">bar</xin-view>
        </xin-pager>
      </xin-app>
    `);

    try {
      await fixture.waitConnected();

      assert(fixture.$$('xin-app').getAttribute('xin-id'));
      assert(fixture.$$('xin-pager').getAttribute('xin-id'));
      assert(fixture.$$('xin-view').getAttribute('xin-id'));

      await new Promise(resolve => setTimeout(resolve, 500));

      assert(fixture.$$('xin-view[uri="/"]').classList.contains('xin-view--visible'));
      assert(fixture.$$('xin-view[uri="/"]').classList.contains('xin-view--focus'));

      fixture.$$('xin-app').navigate('/foo');
      await new Promise(resolve => setTimeout(resolve, 500));

      assert(!fixture.$$('xin-view[uri="/"]').classList.contains('xin-view--visible'));
      assert(!fixture.$$('xin-view[uri="/"]').classList.contains('xin-view--focus'));
      assert(fixture.$$('xin-view[uri="/foo"]').classList.contains('xin-view--visible'));
      assert(fixture.$$('xin-view[uri="/foo"]').classList.contains('xin-view--focus'));

      location.href = '#!/bar';
      await new Promise(resolve => setTimeout(resolve, 500));

      assert(!fixture.$$('xin-view[uri="/foo"]').classList.contains('xin-view--visible'));
      assert(!fixture.$$('xin-view[uri="/foo"]').classList.contains('xin-view--focus'));
      assert(fixture.$$('xin-view[uri="/bar"]').classList.contains('xin-view--visible'));
      assert(fixture.$$('xin-view[uri="/bar"]').classList.contains('xin-view--focus'));

      location.href = '#!/foo';
      await new Promise(resolve => setTimeout(resolve, 500));

      assert(fixture.$$('xin-view[uri="/foo"]').classList.contains('xin-view--visible'));
      assert(fixture.$$('xin-view[uri="/foo"]').classList.contains('xin-view--focus'));
    } finally {
      fixture.dispose();

      location.href = '#';
    }
  }).timeout(5000);
});
