async function removeCommand(arg) {
  if (arg[0] === undefined) return 'please specify if the title is a game or show';
  if (arg[0].toLowerCase() === 'game' && arg[1] !== undefined) {
    const str = arg.join(' ');
    const index = this.games.indexOf(str);
    if (index !== -1) {
      this.games.splice(index, 1);
      return `successfully removed ${str} from games`;
    }
    return `${str} was not in games`;
  }
  if (arg[0].toLowerCase() === 'show' && arg[1] !== undefined) {
    const str = arg.join(' ');
    const index = this.tvShows.indexOf(str);
    if (index !== -1) {
      this.tvShows.splice(index, 1);
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
