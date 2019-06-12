async function addCommand(arg) {
  if (arg[0] === undefined || arg[1] === undefined) return 'missing arg';
  const str = arg.join(' ');
  if (arg[0].toLowerCase() === 'game') {
    this.games.push(str);
    return `successfully added ${str} to games`;
  }
  if (arg[0].toLowerCase() === 'show') {
    this.tvShows.push(str);
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
