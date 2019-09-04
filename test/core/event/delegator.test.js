import { Delegator } from '../../../core/event';
import assert from 'assert';

describe('core:event Delegator', () => {
  describe('constructor', () => {
    it('create new delegator', () => {
      assert.throws(() => new Delegator());
      assert.throws(() => new Delegator({}));

      const div = document.createElement('div');
      const delegator = new Delegator(div);
      try {
        assert(delegator instanceof Delegator);
      } finally {
        delegator.dispose();
      }
    });
  });

  describe('#dispose()', () => {
    it('remove all active listeners', () => {
      const button = document.createElement('button');
      const delegator = new Delegator(button);
      let hit = 0;

      delegator.on('click', evt => hit++);
      delegator.dispose();

      assert(!delegator.element, 'Delegator still has element');

      button.click();
      assert.strictEqual(hit, 0);
    });
  });

  describe('#on()', () => {
    it('register new event listener', () => {
      const button = document.createElement('button');
      const delegator = new Delegator(button);

      try {
        let hit = 0;
        delegator.on('click', evt => hit++);
        button.click();
        assert.strictEqual(hit, 1);
      } finally {
        delegator.dispose();
      }
    });
  });

  describe('#off()', () => {
    it('deregister event listener', () => {
      const button = document.createElement('button');
      const delegator = new Delegator(button);

      try {
        let hit = 0;
        const callback = evt => hit++;
        delegator.on('click', callback);
        delegator.off('click', callback);
        button.click();
        assert.strictEqual(hit, 0);
      } finally {
        delegator.dispose();
      }
    });
  });

  describe('#once()', () => {
    it('register event listener and remove after once hit', () => {
      const button = document.createElement('button');
      const delegator = new Delegator(button);

      try {
        let hit = 0;
        delegator.once('click', evt => hit++);
        button.click();
        assert.strictEqual(hit, 1);
        button.click();
        assert.strictEqual(hit, 1);
      } finally {
        delegator.dispose();
      }
    });
  });

  describe('#waitFor()', () => {
    it('wait for event caught', async () => {
      const button = document.createElement('button');
      const delegator = new Delegator(button);

      try {
        const promised = delegator.waitFor('click');
        button.click();
        await promised;
      } finally {
        delegator.dispose();
      }
    });
  });

  describe('#fire()', () => {
    it('fire event', () => {
      const button = document.createElement('button');
      const delegator = new Delegator(button);

      try {
        let hit = 0;
        delegator.on('click', evt => hit++);
        delegator.fire('click');
        assert.strictEqual(hit, 1);
      } finally {
        delegator.dispose();
      }
    });
  });
});
