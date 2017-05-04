/* eslint-env mocha */

import assert from 'assert';
import xin from '../../';
import Fixture from '../../components/fixture';

describe('Fixture', () => {
  it('defined', () => {
    assert(xin.get('xin-fixture'));
  });

  describe('.create()', () => {
    it('return fixture instance', () => {
      let fixture = Fixture.create('foo bar');

      assert(fixture);
      assert(document.querySelector('xin-fixture'));
      assert.equal(document.querySelector('xin-fixture'), fixture);

      fixture.dispose();
    });
  });

  describe('#dispose()', () => {
    it('remove itself from dom', () => {
      let fixture = Fixture.create('foo bar');

      assert(document.querySelector('xin-fixture'));

      fixture.dispose();

      assert.equal(document.querySelector('xin-fixture'), null);
    });
  });

  describe('#waitConnected()', () => {
    it('return promise instance', () => {
      let fixture = Fixture.create('foo bar');
      assert(fixture.waitConnected() instanceof Promise);
      fixture.dispose();
    });

    it('has status connected after waitConnected and return immediate', async () => {
      let fixture = Fixture.create('foo bar');
      assert(!fixture.connected);
      await fixture.waitConnected();
      assert(fixture.connected);
      fixture.waitConnected();
      fixture.dispose();
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

    it('has status disconnected after waitDisconnected and return immediate', async () => {
      let fixture = Fixture.create('foo bar');
      await fixture.waitConnected();
      fixture.dispose();
      await fixture.waitDisconnected();
      assert(!fixture.connected);
    });
  });
});
