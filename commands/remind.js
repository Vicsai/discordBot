const remindSomeone = require('./remindSomeone.js');

/**
 * send an alert to a user after a given amount time with a message
 * @param {string[]} arg -rest of the message after the users calls the command
 * @return {string}
 */
async function remindCommand(arg) {
  if (arg[0] !== undefined && arg[0].toLowerCase() === 'me') {
    arg.shift();
    const user = this.author;
    const msg = await remindSomeone(user, arg);
    return msg;
  }
  if (arg[0] !== undefined && arg[0].startsWith('<@') && arg[0].endsWith('>')) {
    const user = arg.shift();
    const msg = await remindSomeone(user, arg);
    return msg;
  }
  return 'please provide a valid user after the command';
}
module.exports = {
  command: remindCommand,
  name: 'remind',
  usage: '!remind (me or <@user>) <time> <message>',
  description: 'remind user after a given time with a message'
};
