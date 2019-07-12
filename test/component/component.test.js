import { define, Component, event } from '@xinix/xin';
import { Fixture } from '@xinix/xin/components';
import assert from 'assert';

describe('component/component Component', () => {
  it('make sure invoke ready once when reattached', async () => {
    const hits = {};
    event(document.body).on('before-ready', evt => {
      hits[evt.target.nodeName] = hits[evt.target.nodeName] || 0;
      hits[evt.target.nodeName]++;
    });

    define('test-component-component1', class extends Component {
      get template () {
        return `
          <div>
            <slot />
          </div>
        `;
      }
    });

    define('test-component-component2', class extends Component {
      get template () {
        return `ini component 2`;
      }
    });

    const fixture = await Fixture.create(`
      <test-component-component1>
        <test-component-component2></test-component-component2>
      </test-component-component1>
    `);

    try {
      await fixture.waitConnected();

      for (const k in hits) {
        assert.strictEqual(hits[k], 1);
      }
    } finally {
      await fixture.dispose();

      event(document.body).off('before-ready');
    }
  });
});
