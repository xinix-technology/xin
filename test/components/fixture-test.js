import xin from '../../';
import { Fixture } from '../../components/fixture';

describe('Fixture', () => {
  it('defined', () => {
    expect(xin.get('xin-fixture')).toBeTruthy();
  });

  describe('.create()', () => {
    it('return fixture instance', () => {
      let fixture = Fixture.create('foo bar');

      expect(fixture).toBeTruthy();
      expect(document.querySelector('xin-fixture')).toBeTruthy();
      expect(document.querySelector('xin-fixture')).toEqual(fixture);

      fixture.dispose();
    });
  });

  describe('#dispose()', () => {
    it('remove itself from dom', () => {
      let fixture = Fixture.create('foo bar');

      expect(document.querySelector('xin-fixture')).toBeTruthy();

      fixture.dispose();

      expect(document.querySelector('xin-fixture')).toEqual(null);
    });
  });

  describe('#waitConnected()', () => {
    it('return promise instance', () => {
      let fixture = Fixture.create('foo bar');
      expect(fixture.waitConnected()).toEqual(jasmine.any(Promise));
      fixture.dispose();
    });

    it('has status connected after waitConnected and return immediate', async done => {
      try {
        let fixture = Fixture.create('foo bar');
        expect(fixture.connected).toBeFalsy();
        await fixture.waitConnected();
        expect(fixture.connected).toBeTruthy();
        fixture.waitConnected();
        fixture.dispose();
        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });

  describe('#waitDisconnected()', () => {
    it('wait itself detached from dom', async () => {
      let fixture = Fixture.create('foo bar');
      await fixture.waitConnected();

      await new Promise(resolve => {
        fixture.waitDisconnected().then(resolve);
        fixture.dispose();
      });
    });

    it('has status disconnected after waitDisconnected and return immediate', async done => {
      try {
        let fixture = Fixture.create('foo bar');
        await fixture.waitConnected();
        fixture.dispose();
        await fixture.waitDisconnected();
        expect(fixture.connected).toBeFalsy();
        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
