async function pickCommand() {
  if (this.games.length === 0) return 'no games in array';
  const rand = Math.floor(Math.random() * this.games.length);
  return this.games[rand];
}
module.exports = {
  command: pickCommand,
  name: 'pick',
  usage: '!pick',
  description: 'randomly picks a game from the games array'
};
