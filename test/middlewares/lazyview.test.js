import assert from 'assert';
import { Fixture } from '@xinix/xin/components';

import '@xinix/xin/middlewares/lazy-view';

import '../../scss/xin.scss';
import '../../scss/xin-components.scss';

describe('<xin-lazy-view-middleware>', () => {
  it('import view lazily', async () => {
    let fixture = Fixture.create(`
      <xin-app>
        <template>
          <xin-lazy-view-middleware id="md"></xin-lazy-view-middleware>
          <xin-pager>
            <xin-view uri="/">home</xin-view>
            <test-lazyview-1-view lazy-view uri="/1" id="lazyView">foo</test-lazyview-1-view>
          </xin-pager>
        </template>
      </xin-app>
    `);

    try {
      await fixture.waitConnected();

      fixture.$.md.loaders.push({
        test: /^test-lazyview/,
        load (view) {
          return import(`./views/${view.name}`);
        },
      });

      await new Promise(resolve => setTimeout(resolve, 500));

      assert(!fixture.$.lazyView.classList.contains('xin-view--visible'));
      assert(!fixture.$.lazyView.classList.contains('xin-view--focus'));

      location.href = '#!/1';
      await new Promise(resolve => setTimeout(resolve, 500));

      assert(fixture.$.lazyView.classList.contains('xin-view--visible'));
      assert(fixture.$.lazyView.classList.contains('xin-view--focus'));
    } finally {
      fixture.dispose();

      location.href = '#';
    }
  }).timeout(5000);
});
