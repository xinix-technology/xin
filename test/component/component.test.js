import { Component, event, testing } from '../..';
import assert from 'assert';

describe('component:component Component', () => {
  it('make sure invoke ready once when reattached', async () => {
    const hits = {};
    event(document.body).on('ready', evt => {
      hits[evt.target.nodeName] = hits[evt.target.nodeName] || 0;
      hits[evt.target.nodeName]++;
    });

    const comp1 = testing.define(class extends Component {
      get template () {
        return `
          <div>
            <slot />
          </div>
        `;
      }
    });

    const comp2 = testing.define(class extends Component {
      get template () {
        return `
          ini component 2
        `;
      }
    });

    const fixture = await testing.createFixture(`
      <${comp1}>
        <${comp2}></${comp2}>
      </${comp1}>
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
    const comp1 = testing.define(class extends Component {
      get template () {
        return `
          <div id="foo"></div>
        `;
      }

      get listeners () {
        return {
          'click #foo': 'doSomething()',
        };
      }

      doSomething () {
        hit = true;
      }
    });

    const fixture = await testing.createFixture(`
    <${comp1}></${comp1}>
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
