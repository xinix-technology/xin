import assert from 'assert';
import XinFixture from '../components/fixture';

describe('Binding', () => {
  it('change value', async () => {
    let fixture = XinFixture.create(require('./binding.test.html'), {
      value: 'original',
    });

    try {
      await fixture.waitConnected();

      assert.equal(fixture.value, 'original');
      assert.equal(fixture.$.input.value, 'original');
      assert.equal(fixture.$.textarea.value, 'original');
      assert.equal(fixture.$.result.textContent.trim(), 'original');

      fixture.set('value', 'foo');

      assert.equal(fixture.value, 'foo');
      assert.equal(fixture.$.input.value, 'foo');
      assert.equal(fixture.$.textarea.value, 'foo');
      assert.equal(fixture.$.result.textContent, 'foo');

      fixture.set('otherValue', '<i>baz</i>');
      fixture.set('propValue', 'baz');

      assert.equal(fixture.$.textEl.innerHTML, '&lt;i&gt;baz&lt;/i&gt;');
      assert.equal(fixture.$.htmlEl.innerHTML, '<i>baz</i>');
      assert.equal(fixture.$.propEl.getAttribute('prop-data'), 'baz');

      fixture.set('foo', 1);
      fixture.set('displayValue', 'none');

      assert.equal(fixture.$.classEl.classList.contains('foo'), true);
      assert.equal(fixture.$.styleEl.style.display, 'none');
    } finally {
      fixture.dispose();
    }
  });
});
