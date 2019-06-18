const expect = require('expect.js');
const add = require('../commands/add.js');

describe('adding tvshow', () => {
  it('no arg', async () => {
    const returnMsg = await add.command([], true);
    expect(returnMsg).to.equal('missing arg');
  });
  it('missing/unknown container', async () => {
    const returnMsg = await add.command(['food', 'burgers']);
    expect(returnMsg).to.equal(`container doesn't exist`);
  });
});
