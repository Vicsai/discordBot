const remindMe = require('./remindme.js');
const remindSomeone = require('./remindSomeone.js');

async function remindCommand(arg) {
  if (arg[0] !== undefined && arg[0].toLowerCase() === 'me') {
    arg.shift();
    const user = this.author;
    const msg = await remindMe(user, arg);
    return msg;
  }
  if (arg[0] !== undefined && arg[0].startsWith('<@') && arg[0].endsWith('>')) {
    const user = arg.shift();
    const msg = await remindSomeone(user, arg);
    return msg;
  }
}
module.exports = {
  command: remindCommand,
  name: 'remind',
  usage: '!remind (<me> or <@user>) <time> <message>',
  description: 'remind user after a given time with a message'
};
