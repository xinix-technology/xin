import assert from 'assert';
import { Fixture } from '../../components/fixture';
import '../../components/if';
import { Async } from '../../core';

describe('components:if <xin-if>', () => {
  it('render template', async () => {
    const fixture = await Fixture.create(`
      <div>
        <div>
          <button (click)="doToggle(evt)">Toggle</button>
        </div>
        <xin-if id="selection" condition="[[show]]">
          <template>
            <h3>if</h3>
          </template>
          <template else>
            <h3>else</h3>
          </template>
        </xin-if>
      </div>
    `, {
      show: false,
      display (show) {
        return show ? 'visible' : 'hidden';
      },
      doToggle () {
        this.set('show', !this.show);
      },
    });

    try {
      await fixture.waitConnected();

      fixture.set('show', false);
      await Async.sleep();
      assert.strictEqual(fixture.$$('h3').textContent.trim(), 'else');

      fixture.set('show', true);
      await Async.sleep();
      assert.strictEqual(fixture.$$('h3').textContent.trim(), 'if');
    } finally {
      fixture.dispose();
    }
  });

  it('propagate change to if parent, instance and row', async () => {
    const fixture = await Fixture.create(`
      <div>
        <input type="text" value="{{form.value}}">
      </div>
      <xin-if id="selection" condition="[[show]]">
        <template>
          <div>
            <input type="text" value="{{form.value}}">
          </div>
        </template>
        <template else>
          <div>
            <input type="text" value="{{form.value}}">
          </div>
        </template>
      </xin-if>
    `, {
      show: true,
      form: {
        value: 'foo',
      },
    });

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.form.value, 'foo');
      assert.strictEqual(fixture.$.selection.form.value, 'foo');
      assert.strictEqual(fixture.$.selection.__ifRows[0].form.value, 'foo');
      assert.strictEqual(fixture.$.selection.__ifRows[1].form.value, 'foo');

      fixture.set('form.value', 'bar');
      assert.strictEqual(fixture.form.value, 'bar');
      assert.strictEqual(fixture.$.selection.form.value, 'bar');
      assert.strictEqual(fixture.$.selection.__ifRows[0].form.value, 'bar');
      assert.strictEqual(fixture.$.selection.__ifRows[1].form.value, 'bar');

      fixture.$.selection.__ifRows[0].set('form.value', 'baz');
      assert.strictEqual(fixture.form.value, 'baz');
      assert.strictEqual(fixture.$.selection.form.value, 'baz');
      assert.strictEqual(fixture.$.selection.__ifRows[0].form.value, 'baz');
      assert.strictEqual(fixture.$.selection.__ifRows[1].form.value, 'baz');

      fixture.set('show', false);
      await Async.sleep();

      fixture.$.selection.__ifRows[1].set('form.value', 'baz1');
      assert.strictEqual(fixture.form.value, 'baz1');
      assert.strictEqual(fixture.$.selection.form.value, 'baz1');
      assert.strictEqual(fixture.$.selection.__ifRows[0].form.value, 'baz1');
      assert.strictEqual(fixture.$.selection.__ifRows[1].form.value, 'baz1');
    } finally {
      fixture.dispose();
    }
  });
});
