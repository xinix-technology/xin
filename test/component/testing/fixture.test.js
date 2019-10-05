import assert from 'assert';
import { testing } from '../../..';

describe('components:fixture <xin-fixture>', () => {
  it('render list', async () => {
    const fixture = await testing.createFixture(`
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
