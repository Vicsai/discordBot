const BetterBeebo = require('./betterBeebo.js');

const initGames = [];
const initShows = [
  'The Flash',
  'Arrow',
  "DC's Legends of Tomorrow",
  'Black Lightning',
  'Gotham',
  'Modern Family',
  'Titans',
  'One-Punch Man',
  'The Rising of the Shield Hero'
];

const bot = new BetterBeebo(initGames, initShows);
