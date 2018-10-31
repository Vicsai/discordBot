async function addCommand(game) {
  if (game === undefined || game.length === 0) {
    return 'please provide a game to add';
  }
  const str = game.join(' ');
  this.games.push(str);
  return `successfully added ${str}`;
}
module.exports = {
  command: addCommand,
  name: 'add',
  usage: '!add <game>',
  description: 'add a game'
};
