/**
 * remove a title from either from games or tvShows
 * @param {string[]} arg -rest of the message after the users calls the command
 * @return {string}
 */
async function removeCommand(arg, games, tvShows) {
  if (arg[0] === undefined) return 'please specify if the title is a game or show';
  const container = arg.shift();
  if (container.toLowerCase() === 'game' && arg[0] !== undefined) {
    const str = arg.join(' ');
    const index = games.indexOf(str);
    if (index !== -1) {
      games.splice(index, 1);
      return `successfully removed ${str} from games`;
    }
    return `${str} was not in games`;
  }
  if (container.toLowerCase() === 'show' && arg[0] !== undefined) {
    const str = arg.join(' ');
    const index = tvShows.indexOf(str);
    if (index !== -1) {
      tvShows.splice(index, 1);
      return `successfully removed ${str} from shows`;
    }
    return `${str} was not in shows`;
  }
  return 'please specify a title to remove';
}
module.exports = {
  command: removeCommand,
  name: 'remove',
  usage: '!remove (game or show) <title>',
  description: 'remove a game or show from the array'
};
