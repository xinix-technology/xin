import { define, Component } from '../';
import { Fixture } from '../components/fixture';

describe('xin', () => {
  it('define in window', () => {
    expect('xin' in window).toBeTruthy();
  });

  describe('new component', () => {
    it('new component with full slot', async done => {
      try {
        define('foo-1', class extends Component {
          get template () {
            return 'foo <slot></slot> bar';
          }
        });

        let fixture = Fixture.create(`
          <foo-1 id="foo">baz</foo-1>
        `);

        await fixture.waitConnected();

        await new Promise(resolve => {
          setTimeout(resolve, 1);
        });

        expect(window.foo.textContent).toEqual('foo baz bar');

        fixture.dispose();

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('new component with name slot', async done => {
      try {
        define('foo-2', class extends Component {
          get template () {
            return '<slot name="first"></slot> <slot name="last"></slot>';
          }
        });

        let fixture = Fixture.create(`
          <foo-2 id="foo">
            <span slot="first">first</span>
            <span slot="last">last</span>
          </foo-2>
        `);

        await fixture.waitConnected();

        expect(window.foo.textContent).toEqual('first last');

        fixture.dispose();

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
