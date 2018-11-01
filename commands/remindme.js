const timeName = ['sec', 'min', 'hr'];
const timeValue = [1000, 60000, 3600000];
async function remindmeCommand(msg) {
  const user = this.author;
  const message = msg.join(' ');
  for (let i = 0; i < timeName.length; i += 1) {
    if (message.search(timeName[i]) !== -1) {
      const givenTime = parseInt(message.slice(0, message.search(timeName[i])), 10);
      const waitTime = givenTime * timeValue[i];
      setTimeout(() => {
        this.sendMessage(`<@${user}>`);
      }, waitTime);
    }
  }
}
module.exports = {
  command: remindmeCommand,
  name: 'remindme',
  usage: '!remindme <int value> <sec,min,hr>',
  description: 'remind user after a given time'
};
