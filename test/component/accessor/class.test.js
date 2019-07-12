import { ClassAccessor } from '@xinix/xin/component/accessor/class';
import { Fixture } from '@xinix/xin/components/fixture';
import assert from 'assert';

describe('component/accessor/class ClassAccessor', () => {
  describe('.test()', () => {
    it('detect element with attribute name starts with class.', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);
      try {
        await fixture.waitConnected();

        assert.strictEqual(ClassAccessor.test(fixture.$.here, 'class.foo'), true);
      } finally {
        fixture.dispose();
      }
    });
  });

  describe('#set()', () => {
    it('set value of class', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new ClassAccessor(fixture.$.here, 'class.foo');
        assert.strictEqual(fixture.$.here.classList.contains('foo'), false);
        accessor.set(1);
        assert.strictEqual(fixture.$.here.classList.contains('foo'), true);
        accessor.set(0);
        assert.strictEqual(fixture.$.here.classList.contains('foo'), false);
      } finally {
        fixture.dispose();
      }
    });
  });

  describe('#get()', () => {
    it('get value of class throw error', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new ClassAccessor(fixture.$.here, 'class.foo');
        assert.throws(() => {
          accessor.get();
        }, /ClassAccessor is write-only/);
      } finally {
        fixture.dispose();
      }
    });
  });
});
