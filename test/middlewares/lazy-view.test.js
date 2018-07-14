import assert from 'assert';
import { Fixture } from '@xinix/xin/components';

import '@xinix/xin/middlewares/lazy-view';

import '../../scss/xin.scss';
import '../../scss/xin-components.scss';

describe('<xin-lazy-view-middleware>', () => {
  it('import view lazily', async () => {
    let fixture = await Fixture.create(`
      <xin-app id="app" manual="true">
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

      await fixture.$.app.start();

      assert(!fixture.$.lazyView.classList.contains('xin-view--visible'), 'Lazy view should not visible');
      assert(!fixture.$.lazyView.classList.contains('xin-view--focus'), 'Lazy view should not focused');

      location.hash = '#!/1';
      await fixture.$.app.waitFor('navigated');
      await fixture.$.lazyView.waitFor('focus');

      assert(fixture.$.lazyView.classList.contains('xin-view--visible'), 'Lazy view should visible');
      assert(fixture.$.lazyView.classList.contains('xin-view--focus'), 'Lazy view should focused');
    } finally {
      fixture.dispose();

      location.hash = '#';
    }
  });
});
