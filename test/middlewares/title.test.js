import assert from 'assert';
import { Fixture } from '@xinix/xin/components';

import '@xinix/xin/middlewares/title';

import '../../scss/xin.scss';
import '../../scss/xin-components.scss';

describe('xin-title-middleware', () => {
  it('change title', async () => {
    let fixture = Fixture.create(`
      <xin-app>
        <template>
          <xin-title-middleware></xin-title-middleware>
          <xin-pager>
            <xin-view uri="/" title="Home">home</xin-view>
            <xin-view uri="/foo" title="Foo">foo</xin-view>
          </xin-pager>
        </template>
      </xin-app>
    `);

    try {
      await fixture.waitConnected();

      await new Promise(resolve => setTimeout(resolve, 500));
      assert(document.title, 'Home');

      location.href = '#!/foo';
      await new Promise(resolve => setTimeout(resolve, 500));
      assert(document.title, 'Foo');
    } finally {
      fixture.dispose();

      document.title = '';
      location.href = '#';
    }
  }).timeout(5000);
});
