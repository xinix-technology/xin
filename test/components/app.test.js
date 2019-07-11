import assert from 'assert';
import { Fixture } from '@xinix/xin/components';

import '../../scss/xin.scss';
import '../../scss/xin-components.scss';

describe('<xin-app>', () => {
  it('run routes', async () => {
    const fixture = await Fixture.create(`
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

      await fixture.$$('xin-app').waitFor('started');

      assert(fixture.$$('xin-view[uri="/"]').classList.contains('xin-view--visible'));
      assert(fixture.$$('xin-view[uri="/"]').classList.contains('xin-view--focus'));

      fixture.$$('xin-app').navigate('/foo');
      await fixture.$$('xin-view[uri="/foo"]').waitFor('focus');

      assert(!fixture.$$('xin-view[uri="/"]').classList.contains('xin-view--visible'));
      assert(!fixture.$$('xin-view[uri="/"]').classList.contains('xin-view--focus'));
      assert(fixture.$$('xin-view[uri="/foo"]').classList.contains('xin-view--visible'));
      assert(fixture.$$('xin-view[uri="/foo"]').classList.contains('xin-view--focus'));

      location.hash = '#!/bar';
      await fixture.$$('xin-view[uri="/bar"]').waitFor('focus');

      assert(!fixture.$$('xin-view[uri="/foo"]').classList.contains('xin-view--visible'));
      assert(!fixture.$$('xin-view[uri="/foo"]').classList.contains('xin-view--focus'));
      assert(fixture.$$('xin-view[uri="/bar"]').classList.contains('xin-view--visible'));
      assert(fixture.$$('xin-view[uri="/bar"]').classList.contains('xin-view--focus'));

      location.hash = '#!/foo';
      await fixture.$$('xin-view[uri="/foo"]').waitFor('focus');

      assert(fixture.$$('xin-view[uri="/foo"]').classList.contains('xin-view--visible'));
      assert(fixture.$$('xin-view[uri="/foo"]').classList.contains('xin-view--focus'));
    } finally {
      fixture.dispose();

      location.hash = '#';
    }
  });

  it('run dynamic route', async () => {
    const fixture = await Fixture.create(`
      <xin-app>
        <xin-pager>
          <xin-view uri="/">home</xin-view>
          <xin-view uri="/foo/{name}">
            <template>
              foo <span>[[parameters.name]]</span>
            </template>
          </xin-view>
        </xin-pager>
      </xin-app>
    `);

    try {
      await fixture.waitConnected();
      await fixture.$$('xin-app').waitFor('started');

      fixture.$$('xin-app').navigate('/foo/bar');
      await fixture.$$('xin-view[uri^="/foo"]').waitFor('focus');

      assert(!fixture.$$('xin-view[uri="/"]').classList.contains('xin-view--visible'));
      assert(!fixture.$$('xin-view[uri="/"]').classList.contains('xin-view--focus'));
      assert(fixture.$$('xin-view[uri^="/foo"]').classList.contains('xin-view--visible'));
      assert(fixture.$$('xin-view[uri^="/foo"]').classList.contains('xin-view--focus'));

      assert(fixture.$$('xin-view[uri^="/foo"]').textContent.trim(), 'foo bar');
    } finally {
      fixture.dispose();

      location.hash = '#';
    }
  });

  it('navigate with specified parameters', async () => {
    const fixture = await Fixture.create(`
      <xin-app>
        <xin-pager>
          <xin-view uri="/">home</xin-view>
          <xin-view uri="/foo/{bar}">foo</xin-view>
        </xin-pager>
      </xin-app>
    `);

    try {
      await fixture.waitConnected();
      await fixture.$$('xin-app').waitFor('started');

      fixture.$$('xin-app').navigate('/foo/bar', { parameters: { foo: 'fooz', bar: 'barz' } });
      await fixture.$$('xin-app').waitFor('navigated');

      assert.strictEqual(fixture.$$('xin-view[uri^="/foo"]').parameters.foo, 'fooz');
      assert.strictEqual(fixture.$$('xin-view[uri^="/foo"]').parameters.bar, 'barz');

      fixture.$$('xin-app').navigate('/');
      await fixture.$$('xin-app').waitFor('navigated');

      fixture.$$('xin-app').navigate('/foo/bar');
      await fixture.$$('xin-app').waitFor('navigated');

      assert.strictEqual(fixture.$$('xin-view[uri^="/foo"]').parameters.foo, undefined);
      assert.strictEqual(fixture.$$('xin-view[uri^="/foo"]').parameters.bar, 'bar');
    } finally {
      fixture.dispose();

      location.hash = '#';
    }
  });
});
