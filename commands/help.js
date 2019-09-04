async function helpCommand() {
  const str = ['```md\n'];
  Object.keys(this.commands).forEach(key => {
    str.push(`#${this.commands[key].usage}\n`);
    str.push(`<  ${this.commands[key].description}>\n`);
  });
  if (str.length >= 1) {
    str.push('```');
    return str.join('');
  }
  return 'failed';
}
module.exports = {
  command: helpCommand,
  name: 'help',
  usage: '!help',
  description: 'shows all commands'
};
