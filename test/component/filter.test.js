import Fixture from '@xinix/xin/components/fixture';
import assert from 'assert';
import { Filter } from '@xinix/xin';

describe('Filter', () => {
  it('format currency', async () => {
    let fixture = Fixture.create(`
      <span id="val">[[money|currency]]</span>
    `);

    await fixture.waitConnected();

    fixture.set('money', 12345);

    assert.equal(fixture.$.val.textContent, '12,345.00');

    fixture.dispose();
  });

  it('format string', () => {
    assert.equal(Filter.get('string').invoke('foo'), 'foo');
    assert.equal(Filter.get('string').invoke(undefined), '');
    assert.equal(Filter.get('string').invoke(null), '');
    assert.equal(Filter.get('string').invoke(true), 'true');
    assert.equal(Filter.get('string').invoke(100), '100');
  });

  it('format number', () => {
    assert.equal(Filter.get('number').invoke('1000'), '1,000');
  });

  it('format boolean', () => {
    assert.equal(Filter.get('boolean').invoke(true), 'true');
    assert.equal(Filter.get('boolean').invoke(false), 'false');
  });

  it('format default', () => {
    assert.equal(Filter.get('default:foo').invoke(0), 'foo');
    assert.equal(Filter.get('default:foo').invoke('bar'), 'bar');
  });

  it('format upper', () => {
    assert.equal(Filter.get('upper').invoke('foo'), 'FOO');
  });

  it('format lower', () => {
    assert.equal(Filter.get('lower').invoke('FOO'), 'foo');
  });

  it('format not', () => {
    assert.equal(Filter.get('not').invoke(''), true);
    assert.equal(Filter.get('not').invoke(0), true);
    assert.equal(Filter.get('not').invoke('foo'), false);
  });
});
