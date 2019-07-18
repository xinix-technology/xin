import assert from 'assert';
import { Fixture } from '@xinix/xin/components/fixture';
import { Async } from '@xinix/xin';
import '@xinix/xin/components/if';

describe('components/if <xin-if>', () => {
  it('render', async () => {
    const fixture = await Fixture.create(`
      <div>
        <button (click)="doToggle(evt)">Toggle</button>
      </div>
      <xin-if condition="[[show]]">
        <template>
          <h3>if</h3>
          <p>
            hello <span>[[name]]</span>
          </p>
        </template>
        <template else>
          <h3>else</h3>
          <p>
            bye <span>[[name]]</span>
          </p>
        </template>
      </xin-if>
    `, {
      show: false,
      name: 'Ganesha',
      doToggle () {
        this.set('show', !this.show);
      },
    });

    try {
      await fixture.waitConnected();

      fixture.set('show', false);
      await Async.sleep(50);

      assert.strictEqual(fixture.$$('h3').textContent.trim(), 'else');

      fixture.set('show', true);
      await Async.sleep(50);

      assert.strictEqual(fixture.$$('h3').textContent.trim(), 'if');
    } finally {
      fixture.dispose();
    }
  });
});
