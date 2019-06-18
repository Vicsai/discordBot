/**
 * show all entries in either games or tvShows
 * @param {string[]} arg -rest of the message after the users calls the command
 */
async function showCommand(arg, games, tvShows) {
  if (arg[0] === undefined) return 'please specify what to show';
  if (arg[0].toLowerCase() === 'games' && games.length !== 0) {
    return games.toString();
  }
  if (arg[0].toLowerCase() === 'shows' && tvShows.length !== 0) {
    return tvShows.toString();
  }
  return 'array is empty';
}
module.exports = {
  command: showCommand,
  name: 'show',
  usage: '!show (game or show)',
  description: 'show all games or shows'
};
