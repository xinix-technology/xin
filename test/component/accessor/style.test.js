import { StyleAccessor } from '../../../component/accessor/style';
import { Fixture } from '../../../components/fixture';
import assert from 'assert';

describe('component:accessor:style StyleAccessor', () => {
  describe('.test()', () => {
    it('detect element with attribute name starts with style.', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);
      try {
        await fixture.waitConnected();

        assert.strictEqual(StyleAccessor.test(fixture.$.here, 'style.foo'), true);
      } finally {
        fixture.dispose();
      }
    });
  });

  describe('#set()', () => {
    it('set value of style', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        {
          const accessor = new StyleAccessor(fixture.$.here, 'style.backgroundColor');
          accessor.set('white');
          assert.strictEqual(fixture.$.here.style.backgroundColor, 'white');
        }

        {
          const accessor = new StyleAccessor(fixture.$.here, 'style.background-color');
          accessor.set('black');
          assert.strictEqual(fixture.$.here.style.backgroundColor, 'black');
        }
      } finally {
        fixture.dispose();
      }
    });
  });

  describe('#get()', () => {
    it('get value of style throw error', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new StyleAccessor(fixture.$.here, 'style.border');
        assert.throws(() => {
          accessor.get();
        }, /StyleAccessor is write-only/);
      } finally {
        fixture.dispose();
      }
    });
  });
});
