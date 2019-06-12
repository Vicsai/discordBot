const expect = require('expect.js');
const add = require('../commands/add.js');

describe('adding tvshow', () => {
  it('no arg', async () => {
    const returnMsg = await add.command([], true);
    expect(returnMsg).to.equal('missing arg');
  });
  it('missing/unknown container', async () => {
    const returnMsg = await add.command(['food', 'burgers'], true);
    expect(returnMsg).to.equal(`container doesn't exist`);
  });
  it('successfully add to tvShow', async () => {
    const returnMsg = await add.command(['show', 'testShow'], true);
    expect(returnMsg).to.equal('successfully added testShow to shows');
  });
});
