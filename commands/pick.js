/**
 * randomly pick a title from the games array
 * @return {string} a game title
 */
async function pickCommand(games) {
  if (games.length === 0) return 'no games in array';
  const rand = Math.floor(Math.random() * this.games.length);
  return games[rand];
}
module.exports = {
  command: pickCommand,
  name: 'pick',
  usage: '!pick',
  description: 'randomly picks a game from the games array'
};
