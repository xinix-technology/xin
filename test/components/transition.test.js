import { Fixture } from '@xinix/xin/components/fixture';
import { Async } from '@xinix/xin';
import '@xinix/xin/components/if';
import '@xinix/xin/components/transition';

describe('components:transition <xin-transition>', () => {
  it('render', async () => {
    const fixture = await Fixture.create(`
      <style>
      .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
      }
      .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }

      xin-transition {
        display: block;
        position: relative;
      }

      .block {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }

      .red {
        background-color: red;
      }

      .blue {
        background-color: blue;
      }
      </style>
      <div>
        <button (click)="doToggle(evt)">Toggle</button>
      </div>
      <xin-transition name="fade">
        <xin-if condition="[[show]]">
          <template>
            <div class="block blue">
              <h3>if</h3>
              <p>
                hello <span>[[name]]</span>
              </p>
            </div>
          </template>
          <template else>
            <div class="block red">
              <h3>else</h3>
              <p>
                change <span>[[name]]</span>
              </p>
            </div>
          </template>
        </xin-if>
      </xin-transition>
    `, {
      show: false,
      name: 'Ganesha',
      doToggle () {
        this.set('show', !this.show);
      },
    });

    try {
      await fixture.waitConnected();

      await Async.sleep();

      await new Promise(resolve => {
        function onTransitionEnd (evt) {
          fixture.removeEventListener('transitionend', onTransitionEnd);
          resolve();
        }
        fixture.addEventListener('transitionend', onTransitionEnd);
        fixture.set('show', true);
      });

      const style = fixture.$$('style');
      style.parentElement.removeChild(style);

      await new Promise((resolve, reject) => {
        Async.run(() => {
          fixture.removeEventListener('transitionend', onTransitionEnd);
          resolve();
        }, 500);

        function onTransitionEnd (evt) {
          fixture.removeEventListener('transitionend', onTransitionEnd);
          reject(new Error('Must not invoked'));
        }
        fixture.addEventListener('transitionend', onTransitionEnd);
        fixture.set('show', false);
      });
    } finally {
      fixture.dispose();
    }
  });
});
