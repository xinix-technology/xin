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

  describe('#set()', () => {
    it('set value of html', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new HTMLAccessor(fixture.$.here, 'html');
        accessor.set('foo');
        assert.strictEqual(fixture.$.here.innerHTML, 'foo');
        accessor.set('');
        assert.strictEqual(fixture.$.here.innerHTML, '');
        accessor.set(0);
        assert.strictEqual(fixture.$.here.innerHTML, '0');
        accessor.set(null);
        assert.strictEqual(fixture.$.here.innerHTML, '');
        accessor.set(undefined);
        assert.strictEqual(fixture.$.here.innerHTML, '');
      } finally {
        fixture.dispose();
      }
    });
  });

  describe('#get()', () => {
    it('get value of html throw error', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new HTMLAccessor(fixture.$.here, 'html');
        assert.throws(() => {
          accessor.get();
        }, /HTMLAccessor is write-only/);
      } finally {
        fixture.dispose();
      }
    });
  });
});
