import { AttributeAccessor } from '../../../component/accessor/attribute';
import { Fixture } from '../../../components/fixture';
import assert from 'assert';

describe('component:accessor:attribute AttributeAccessor', () => {
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

  describe('#write()', () => {
    it('write value of attribute', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new AttributeAccessor(fixture.$.here, 'foo$');

        window.accessor = accessor;

        accessor.write('23');
        assert.strictEqual(fixture.$.here.getAttribute('foo'), '23');
        accessor.write(undefined);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), null);
        accessor.write(null);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), null);
        accessor.write('');
        assert.strictEqual(fixture.$.here.getAttribute('foo'), null);
        accessor.write(0);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), '0');
        accessor.write(true);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), 'true');
        accessor.write(false);
        assert.strictEqual(fixture.$.here.getAttribute('foo'), 'false');
      } finally {
        fixture.dispose();
      }
    });
  });

  // describe('#read()', () => {
  //   it('read value of attribute is null', async () => {
  //     const fixture = await Fixture.create(`
  //       <div id="here"></div>
  //     `);

  //     try {
  //       await fixture.waitConnected();

  //       const accessor = new AttributeAccessor(fixture.$.here, 'foo$');
  //       const value = accessor.read();

  //       assert.strictEqual(value, null);
  //     } finally {
  //       fixture.dispose();
  //     }
  //   });

  //   it('read value of attribute', async () => {
  //     const fixture = await Fixture.create(`
  //       <div id="here" foo="23"></div>
  //     `);

  //     try {
  //       await fixture.waitConnected();

  //       const accessor = new AttributeAccessor(fixture.$.here, 'foo$');
  //       const value = accessor.read();

  //       assert.strictEqual(value, '23');
  //     } finally {
  //       fixture.dispose();
  //     }
  //   });
  // });
});
