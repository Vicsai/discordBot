// libraries
const Discord = require('discord.js');
const auth = require('./auth.json');
// variables
const games = [];
const commands = {};
let voiceChannel;
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
  ({ voiceChannel } = message.member);
  currentChannel.send(commands[command](arg));
});

// commands
commands.add = function add(game) {
  games.push(game);
  return `successfully added ${game}`;
};
commands.remove = function remove(game) {
  const index = games.find(game);
  if (index !== -1) {
    games.splice(index, 1);
    return `successfully removed ${game}`;
  }
  return `${game} was not in the array`;
};
commands.show = function show() {
  if (games.length !== 0) return games.toString();
  return 'no games in array';
};
commands.pick = function pick() {
  const rand = Math.floor(Math.random() * games.length);
  return games[rand];
};
commands.igl = function igl() {
  if (voiceChannel === undefined) return 'please join a voice channel';
  const usersInChannel = voiceChannel.members;
  const users = [];
  for (let [snowflake, guildMember] of usersInChannel) {
    users.push(guildMember.user.username);
  }
  const rand = Math.floor(Math.random() * users.length);
  return users[rand];
};
commands.help = function help() {
  return Object.keys(commands);
};
