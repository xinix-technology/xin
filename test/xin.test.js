import assert from 'assert';

describe('xin', () => {
  it('has core functionalities', async () => {
    const imported = await import('@xinix/xin');

    assert(typeof imported.bootstrap === 'function');
    assert(typeof imported.getInstance === 'function');
    assert(imported.Repository);
  });

  it('has component functionalities', async () => {
    const imported = await import('@xinix/xin');

    assert(typeof imported.define === 'function');
    assert(typeof imported.base === 'function');
    assert(imported.Component);
    assert(imported.T);
    assert(imported.Filter);
  });

  it('define global xin repository', () => {
    assert(typeof window.xin.__repository.get === 'function');
    assert(typeof window.xin.__repository.put === 'function');
    assert(typeof window.xin.__repository.update === 'function');
  });
});
