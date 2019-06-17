async function addCommand(arg, test) {
  if (arg[0] === undefined || arg[1] === undefined) return 'missing arg';
  const container = arg.shift();
  const str = arg.join(' ');
  if (container.toLowerCase() === 'game') {
    if (!test) this.games.push(str);
    return `successfully added ${str} to games`;
  }
  if (container.toLowerCase() === 'show') {
    if (!test) this.tvShows.push(str);
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
