const Discord = require('discord.js');
const auth = require('./auth.json');

const games = [];
const commands = {};
let currentChannel = '';

const bot = new Discord.Client();

function parseMessage(message) {
  const formatted = message.content.substring(1);
  const parsed = formatted.split(' ');
  return parsed;
}

bot.login(auth.token);

bot.on('ready', () => {
  console.log('beebo lives!');
});
bot.on('message', message => {
  if (!message.content.startsWith('!') || message.author.bot) return;
  currentChannel = message.channel;
  const parsed = parseMessage(message);
  const command = parsed[0];
  const arg = parsed[1];
  commands[command](arg);
});
commands.add = function add(game) {
  games.push(game);
  currentChannel.send('successfully added');
};
commands.remove = function remove(game) {
  let i = games.find(game);
  if (i!==-1){
    games.
  }
};
commands.show = function show() {
  currentChannel.send(games.toString);
};
