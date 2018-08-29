const Discord = require('discord.js');
const auth = require('./auth.json');

const games = [];

const bot = new Discord.Client();

function parseMessage(message) {
  const formatted=message.substring(1);
  const parsed = message.content.split(' ');
  return parsed;
}
bot.login(auth.token);

bot.on('ready', () => {
  console.log('beebo lives!');
});
bot.on('message', message => {
  if (!message.content.startsWith('!') || message.author.bot) return;
  const parsed = parseMessage(message);
  const command = parsed[0];
  const arg= parsed[1];
  if (command === 'test') message.channel.send('I AM BEEBO');
  if (command === 'add') {
    games.push(arg);
    message.channel.send('successfully added');
  }
  if (command==='remove'){
    if (games.find(arg)
  }
  if (command === 'show') message.channel.send(games.toString());
});
