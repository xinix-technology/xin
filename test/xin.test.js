import assert from 'assert';

describe('xin', () => {
  it('has core functionalities', async () => {
    let imported = await import('@xinix/xin');

    assert(typeof imported.bootstrap === 'function');
    assert(typeof imported.getInstance === 'function');
    assert(imported.Repository);
  });

  it('has component functionalities', async () => {
    let imported = await import('@xinix/xin');

    assert(typeof imported.define === 'function');
    assert(typeof imported.base === 'function');
    assert(imported.Component);
    assert(imported.T);
    assert(imported.Filter);
  });

  it('define global xin as repository', () => {
    assert(typeof window.xin.get === 'function');
    assert(typeof window.xin.put === 'function');
    assert(typeof window.xin.rebootstrap === 'function');
  });
});
