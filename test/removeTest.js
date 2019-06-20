const expect = require('expect.js');
const remove = require('../commands/remove.js');

describe('remove title', () => {
  it('no arg', async () => {
    const returnMsg = await remove.command([]);
    expect(returnMsg).to.equal('missing arg');
  });
  it('unknown container', async () => {
    const returnMsg = await remove.command(['foo', 'bar']);
    expect(returnMsg).to.equal(`container doesn't exist`);
  });
  it('title not in shows', async () => {
    const returnMsg = await remove.command(['show', 'testShow'], [], []);
    expect(returnMsg).to.equal('testShow was not in shows');
  });
  it('title not in games', async () => {
    const returnMsg = await remove.command(['game', 'testGame'], [], []);
    expect(returnMsg).to.equal('testGame was not in games');
  });
  it('successfully removed a show', async () => {
    const returnMsg = await remove.command(['show', 'testShow'], [], ['testShow']);
    expect(returnMsg).to.equal('successfully removed testShow from shows');
  });
  it('successfully removed a game', async () => {
    const returnMsg = await remove.command(['game', 'testGame'], ['testGame'], []);
    expect(returnMsg).to.equal('successfully removed testGame from games');
  });
});
