import assert from 'assert';
import { Fixture } from '@xinix/xin/components/fixture';

describe('components:fixture <xin-fixture>', () => {
  it('render list', async () => {
    const fixture = await Fixture.create(`
      <div id="here">foo</div>
    `);

    try {
      await fixture.waitConnected();
      assert.strictEqual(fixture.$.here.innerHTML, 'foo');
    } finally {
      fixture.dispose();
    }
  });
});
