import { AttributeAccessor } from '@xinix/xin/component/accessor/attribute';
import { Fixture } from '@xinix/xin/components/fixture';
import assert from 'assert';

describe('component/accessor/attribute AttributeAccessor', () => {
  describe('.test()', () => {
    it('detect element with attribute name ends with dollar sign', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);
      try {
        await fixture.waitConnected();

        assert.strictEqual(AttributeAccessor.test(fixture.$.here, 'foo$'), true);
        assert.strictEqual(AttributeAccessor.test(fixture.$.here, 'bar'), false);
      } finally {
        fixture.dispose();
      }
    });
  });

  describe('#set()', () => {
    it('set value of attribute', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new AttributeAccessor(fixture.$.here, 'foo$');

        accessor.set('23');
        assert.strictEqual(fixture.$.here.getAttribute('foo'), '23');
        accessor.set(undefined);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), null);
        accessor.set(null);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), null);
        accessor.set('');
        assert.strictEqual(fixture.$.here.getAttribute('foo'), null);
        accessor.set(0);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), '0');
        accessor.set(true);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), 'true');
        accessor.set(false);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), 'false');
      } finally {
        fixture.dispose();
      }
    });
  });

  describe('#get()', () => {
    it('get value of attribute is null', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new AttributeAccessor(fixture.$.here, 'foo$');
        const value = accessor.get();

        assert.strictEqual(value, null);
      } finally {
        fixture.dispose();
      }
    });

    it('get value of attribute', async () => {
      const fixture = await Fixture.create(`
        <div id="here" foo="23"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new AttributeAccessor(fixture.$.here, 'foo$');
        const value = accessor.get();

        assert.strictEqual(value, '23');
      } finally {
        fixture.dispose();
      }
    });
  });
});
