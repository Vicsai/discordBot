const expect = require('expect.js');
const tvGuide = require('../commands/tvGuide.js');
const tvGuideSearch = require('../commands/tvGuideSearch');

describe('tvGuide returns shows airing on the given date', () => {
  it('converts date to YYYY-MM-DD', () => {
    const returnMsg = tvGuide.formatDate(new Date(2019, 0, 12));
    expect(returnMsg).to.equal('2019-01-12');
  });
  it('return no shows found', async () => {
    const returnMsg = await tvGuide.command([], []);
    expect(returnMsg).to.equal('no shows airing');
  });
  it('return found show', async () => {
    const returnMsg = await tvGuideSearch('2019-02-01', ['The Blacklist']);
    expect(returnMsg).to.equal('The Blacklist 6x5 Alter Ego');
  });
});
