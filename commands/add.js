/**
 * adds a given string into a given array
 * @param {string[]} arg -rest of the message after the users calls the command
 * @param {string[]} games -list of games
 * @param {string[]} tvShows -list of tvShows
 * @return {string} message to be sent
 */
async function addCommand(arg, games, tvShows) {
  if (arg.length < 2) return 'missing arg';
  const container = arg.shift();
  const str = arg.join(' ');
  if (container.toLowerCase() === 'game') {
    games.push(str);
    return `successfully added ${str} to games`;
  }
  if (container.toLowerCase() === 'show') {
    tvShows.push(str);
    return `successfully added ${str} to shows`;
  }
  return `container doesn't exist`;
}
module.exports = {
  command: addCommand,
  name: 'add',
  usage: '!add (game or show) <title>',
  description: 'add a game or show to the array'
};
