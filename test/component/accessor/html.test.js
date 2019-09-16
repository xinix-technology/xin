import { HTMLAccessor } from '../../../component/accessor/html';
import { Fixture } from '../../../components/fixture';
import assert from 'assert';

describe('component:accessor:html HTMLAccessor', () => {
  describe('.test()', () => {
    it('detect element with attribute name starts with html.', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);
      try {
        await fixture.waitConnected();

        assert.strictEqual(HTMLAccessor.test(fixture.$.here, 'html'), true);
      } finally {
        fixture.dispose();
      }
    });
  });

  describe('#write()', () => {
    it('write value of html', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new HTMLAccessor(fixture.$.here, 'html');
        accessor.write('foo');
        assert.strictEqual(fixture.$.here.innerHTML, 'foo');
        accessor.write('');
        assert.strictEqual(fixture.$.here.innerHTML, '');
        accessor.write(0);
        assert.strictEqual(fixture.$.here.innerHTML, '0');
        accessor.write(null);
        assert.strictEqual(fixture.$.here.innerHTML, '');
        accessor.write(undefined);
        assert.strictEqual(fixture.$.here.innerHTML, '');
      } finally {
        fixture.dispose();
      }
    });
  });
});
