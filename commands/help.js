async function helpCommand() {
  const str = [];
  Object.keys(this.commands).forEach(key => {
    str.push(`${this.commands[key].usage}`);
  });
  if (str.length >= 1) return str.join('\n');
  return 'failed';
}
module.exports = {
  command: helpCommand,
  name: 'help',
  usage: '!help',
  description: 'shows all commands'
};
