import { Fixture } from '../../components';

describe('cases:dev', () => {
  it('bind', async () => {
    window.foo = {
      bar: 'ini global foo.bar',
    };

    const fixture = await Fixture.create(`
      <div>[[$global.foo.bar]]</div>
    `);

    try {
      await fixture.waitConnected();
    } finally {
      fixture.dispose();
    }
  });
});
