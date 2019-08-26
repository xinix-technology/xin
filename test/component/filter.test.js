import assert from 'assert';
import { Filter } from '@xinix/xin';
import { Fixture } from '@xinix/xin/components/fixture';

describe('component:filter Filter', () => {
  it('format currency', async () => {
    const fixture = await Fixture.create(`
      <span id="val">[[money|currency]]</span>
    `);

    await fixture.waitConnected();

    fixture.set('money', 12345);

    assert.strictEqual(fixture.$.val.textContent, '12,345.00');

    fixture.dispose();
  });

  it('format string', () => {
    assert.strictEqual(Filter.get('string').invoke('foo'), 'foo');
    assert.strictEqual(Filter.get('string').invoke(undefined), '');
    assert.strictEqual(Filter.get('string').invoke(null), '');
    assert.strictEqual(Filter.get('string').invoke(true), 'true');
    assert.strictEqual(Filter.get('string').invoke(100), '100');
  });

  it('format number', () => {
    assert.strictEqual(Filter.get('number').invoke('1000'), '1,000');
  });

  it('format boolean', () => {
    assert.strictEqual(Filter.get('boolean').invoke(true), 'true');
    assert.strictEqual(Filter.get('boolean').invoke(false), 'false');
  });

  it('format default', () => {
    assert.strictEqual(Filter.get('default:foo').invoke(0), 'foo');
    assert.strictEqual(Filter.get('default:foo').invoke('bar'), 'bar');
  });

  it('format upper', () => {
    assert.strictEqual(Filter.get('upper').invoke('foo'), 'FOO');
  });

  it('format lower', () => {
    assert.strictEqual(Filter.get('lower').invoke('FOO'), 'foo');
  });

  it('format not', () => {
    assert.strictEqual(Filter.get('not').invoke(''), true);
    assert.strictEqual(Filter.get('not').invoke(0), true);
    assert.strictEqual(Filter.get('not').invoke('foo'), false);
  });

  it('format cssurl', () => {
    assert.strictEqual(Filter.get('cssurl').invoke('/foo'), 'url(/foo)');
  });

  it('put new filter', () => {
    Filter.put('bar', (v, ...args) => {
      return `${v} ${args.toString()}`.trim();
    });

    assert.strictEqual(Filter.get('bar:1,2,3').invoke('foo'), 'foo 1,2,3');
  });
});
