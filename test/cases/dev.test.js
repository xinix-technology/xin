import { testing } from '../..';

describe('cases:dev', () => {
  it('bind', async () => {
    window.foo = {
      bar: 'ini global foo.bar',
    };

    const fixture = await testing.createFixture(`
      <div>[[$global.foo.bar]]</div>
    `);

    try {
      await fixture.waitConnected();
    } finally {
      fixture.dispose();
    }
  });
});
