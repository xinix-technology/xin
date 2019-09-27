import { define, Component, event } from '../..';
import { Fixture } from '../../components';
import assert from 'assert';

describe('component:component Component', () => {
  it('make sure invoke ready once when reattached', async () => {
    const hits = {};
    event(document.body).on('ready', evt => {
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
        return `
          ini component 2
        `;
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
      fixture.dispose();

      event(document.body).off('ready');
    }
  });

  it('register listeners', async () => {
    let hit = false;
    define('test-component-component3', class extends Component {
      get template () {
        return `
          <div id="foo"></div>
        `;
      }

      get listeners () {
        return {
          'click #foo': 'doSomething',
        };
      }

      doSomething () {
        hit = true;
      }
    });

    const fixture = await Fixture.create(`
    <test-component-component3></test-component-component3>
    `);

    try {
      await fixture.waitConnected();

      event(fixture.$.foo).fire('click');
      assert(hit);
    } finally {
      fixture.dispose();
    }
  });
});
