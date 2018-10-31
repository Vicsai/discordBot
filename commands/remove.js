async function removeCommand(game) {
  if (game === undefined || game.length === 0) {
    return 'please provide a game to remove';
  }
  const str = game.join(' ');
  const index = this.games.indexOf(str);
  if (index !== -1) {
    this.games.splice(index, 1);
    return `successfully removed ${str}`;
  }
  return `${str} was not in the array`;
}
module.exports = {
  command: removeCommand,
  name: 'remove',
  usage: '!remove <game>',
  description: 'remove a game'
};
