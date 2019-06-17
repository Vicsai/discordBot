const expect = require('expect.js');
const remind = require('../commands/remind.js');

describe('remind a user', () => {
  it('no user given', async () => {
    const returnMsg = await remind.command([]);
    expect(returnMsg).to.equal('please provide a valid user after the command');
  });
  it('invalid user given', async () => {
    const returnMsg = await remind.command(['bob']);
    expect(returnMsg).to.equal('please provide a valid user after the command');
  });
  it('no time given', async () => {
    const returnMsg = await remind.command(['<@123>']);
    expect(returnMsg).to.equal('please provide a valid time');
  });
  it('invalid time given', async () => {
    const returnMsg = await remind.command(['<@123>', 'a', 'sec']);
    expect(returnMsg).to.equal('please provide a valid time');
  });
  it('successfully reminds user', async () => {
    const returnMsg = await remind.command(['<@123>', '1', 'sec', 'hello']);
    expect(returnMsg).to.equal('<@123> hello');
  });
});
