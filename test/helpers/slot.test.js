import { Component, testing } from '../..';
import assert from 'assert';

describe('helpers:slot', () => {
  it('new component with full slot', async () => {
    const componentName = testing.define(class extends Component {
      get template () {
        return 'foo <slot></slot> bar';
      }
    });

    const fixture = await testing.createFixture(`
      <${componentName} id="foo">baz</${componentName}>
    `);

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.$.foo.textContent, 'foo baz bar');
    } finally {
      fixture.dispose();
    }
  });

  it('new component with name slot', async () => {
    const componentName = testing.define(class extends Component {
      get template () {
        return '<slot name="first"></slot> <slot name="last"></slot>';
      }
    });

    const fixture = await testing.createFixture(`
      <${componentName} id="foo">
        <span slot="first">first</span>
        <span slot="last">last</span>
      </${componentName}>
    `);

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.$.foo.textContent, 'first last');
    } finally {
      fixture.dispose();
    }
  });
});
