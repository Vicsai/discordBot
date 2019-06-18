const expect = require('expect.js');
const convert = require('../commands/convert.js');

describe('converting currencies', () => {
  it('no arg', async () => {
    const returnMsg = await convert.command([]);
    expect(returnMsg).to.equal('nothing to convert');
  });
  it('value is not a number', async () => {
    const returnMsg = await convert.command(['foo', 'jpy']);
    expect(returnMsg).to.equal('number was not given');
  });
  it('invalid currency given', async () => {
    const returnMsg = await convert.command(['100', 'foo']);
    expect(returnMsg).to.equal('invalid currency given');
  });
});
