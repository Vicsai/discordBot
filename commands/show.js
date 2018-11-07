async function showCommand(arg) {
  if (arg[0] === undefined) return 'please specify what to show';
  if (arg[0].toLowerCase() === 'game' && this.games.length !== 0) {
    return this.games.toString();
  }
  if (arg[0].toLowerCase() === 'show' && this.shows.length !== 0) {
    return this.shows.toString();
  }
  return 'array is empty';
}
module.exports = {
  command: showCommand,
  name: 'show',
  usage: '!show (game or show)',
  description: 'show all games or shows'
};
