const BetterBeebo = require('./betterBeebo.js');

const initGames = [];
const initShows = [
  'The Flash',
  'Arrow',
  "DC's Legends of Tomorrow",
  'Black Lightning',
  'Gotham',
  'Modern Family',
  'Titans'
];
const initExchangeRates = {
  usd: 1.35,
  jpy: 0.012,
  cny: 0.2
};

const bot = new BetterBeebo(initGames, initShows, initExchangeRates);
