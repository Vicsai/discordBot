const expect = require('expect.js');
const add = require('../commands/add.js');

describe('add title', () => {
  it('no arg', async () => {
    const returnMsg = await add.command([]);
    expect(returnMsg).to.equal('missing arg');
  });
  it('missing/unknown container', async () => {
    const returnMsg = await add.command(['food', 'burgers']);
    expect(returnMsg).to.equal(`container doesn't exist`);
  });
  it('successfully added a show', async () => {
    const returnMsg = await add.command(['show', 'testShow'], [], []);
    expect(returnMsg).to.equal('successfully added testShow to shows');
  });
  it('successfully added a game', async () => {
    const returnMsg = await add.command(['game', 'testGame'], [], []);
    expect(returnMsg).to.equal('successfully added testGame to games');
  });
});
