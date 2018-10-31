async function showCommand() {
  if (this.games.length !== 0) {
    return this.games.toString();
  }
  return 'no games in array';
}
module.exports = {
  command: showCommand,
  name: 'show',
  usage: '!show',
  description: 'show all games'
};
