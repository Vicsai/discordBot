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

const bot = new BetterBeebo(initGames, initShows);
