async function addCommand(arg) {
  if (arg[0] === undefined) return 'please specify if the title is a game or show';
  if (arg[0].toLowerCase() === 'game' && arg[1] !== undefined) {
    arg.shift();
    const str = arg.join(' ');
    this.games.push(str);
    return `successfully added ${str} to games`;
  }
  if (arg[0].toLowerCase() === 'show' && arg[1] !== undefined) {
    arg.shift();
    const str = arg.join(' ');
    this.tvShows.push(str);
    return `successfully added ${str} to shows`;
  }
  return 'please specify a title to add';
}
module.exports = {
  command: addCommand,
  name: 'add',
  usage: '!add (game or show) <title>',
  description: 'add a game or show to the array'
};
