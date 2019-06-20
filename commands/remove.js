/**
 * remove a title from either from games or tvShows
 * @param {string[]} arg -rest of the message after the users calls the command
 * @param {string[]} games -list of games
 * @param {string[]} tvShows -list of tvShows
 * @return {string}
 */
async function removeCommand(arg, games, tvShows) {
  if (arg.length < 2) return 'missing arg';
  const container = arg.shift().toLowerCase();
  const str = arg.join(' ');
  if (container === 'game') {
    const index = games.indexOf(str);
    if (index !== -1) {
      games.splice(index, 1);
      return `successfully removed ${str} from games`;
    }
    return `${str} was not in games`;
  }
  if (container === 'show') {
    const index = tvShows.indexOf(str);
    if (index !== -1) {
      tvShows.splice(index, 1);
      return `successfully removed ${str} from shows`;
    }
    return `${str} was not in shows`;
  }
  return `container doesn't exist`;
}
module.exports = {
  command: removeCommand,
  name: 'remove',
  usage: '!remove (game or show) <title>',
  description: 'remove a game or show from the array'
};
