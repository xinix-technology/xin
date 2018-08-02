import assert from 'assert';
import { Async } from '@xinix/xin';
import { Fixture } from '@xinix/xin/components';

import '@xinix/xin/middlewares/title';

import '../../scss/xin.scss';
import '../../scss/xin-components.scss';

describe('<xin-title-middleware>', () => {
  it('change title', async () => {
    let fixture = await Fixture.create(`
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
      await fixture.$$('xin-app').waitFor('started');
      assert.strictEqual(document.title, 'Home');

      location.hash = '#!/foo';
      await fixture.$$('xin-app').waitFor('navigated');
      await Async.sleep(400);
      assert.strictEqual(document.title, 'Foo');
    } finally {
      fixture.dispose();

      document.title = '';
      location.hash = '#';
    }
  });
});
