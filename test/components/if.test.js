import assert from 'assert';
import { Fixture } from '../../components/fixture';
import '../../components/if';

describe('components:if <xin-if>', () => {
  it('render', async () => {
    const fixture = await Fixture.create(`
      <div>
        <div>
          <button (click)="doToggle(evt)">Toggle</button>
        </div>
        <div>
          <input type="text" value="{{name}}">
        </div>
        <xin-if id="selection" condition="[[show]]">
          <template>
            <h3>if</h3>
            <div>
              <input type="text" value="{{name}}">
            </div>
            <p>hello <span>[[name]]</span></p>
            <p>[[display(show)]]</p>
          </template>
          <template else>
            <h3>else</h3>
            <p>bye <span>[[name]]</span></p>
            <p>[[display(show)]]</p>
          </template>
        </xin-if>
      </div>
    `, {
      show: false,
      name: 'Ganesha',
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
      assert.strictEqual(fixture.$$('h3').textContent.trim(), 'else');

      fixture.set('show', true);
      assert.strictEqual(fixture.$$('h3').textContent.trim(), 'if');
    } finally {
      fixture.dispose();
    }
  });
});
