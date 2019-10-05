import assert from 'assert';

describe('xin', () => {
  it('has core functionalities', async () => {
    const imported = await import('..');

    assert(imported.Repository);
  });

  it('has component functionalities', async () => {
    const imported = await import('..');

    assert(typeof imported.define === 'function');
    assert(typeof imported.base === 'function');
    assert(imported.Component);
    assert(imported.Template);
    assert(imported.Filter);
  });
});
