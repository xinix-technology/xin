import { ClassAccessor } from '../../../component/accessor/class';
import { Fixture } from '../../../components/fixture';
import assert from 'assert';

describe('component:accessor:class ClassAccessor', () => {
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

  describe('#write()', () => {
    it('write value of class', async () => {
      const fixture = await Fixture.create(`
        <div id="here"></div>
      `);

      try {
        await fixture.waitConnected();

        const accessor = new ClassAccessor(fixture.$.here, 'class.foo');
        assert.strictEqual(fixture.$.here.classList.contains('foo'), false);
        accessor.write(1);
        assert.strictEqual(fixture.$.here.classList.contains('foo'), true);
        accessor.write(0);
        assert.strictEqual(fixture.$.here.classList.contains('foo'), false);
      } finally {
        fixture.dispose();
      }
    });
  });
});
