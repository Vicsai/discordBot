// libraries
const Discord = require('discord.js');
const auth = require('./auth.json');
// variables
const games = [];
const commands = {};
let voiceChannel;
let currentChannel = '';
let tts = false;

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
  if (Object.keys(commands).indexOf(command) !== -1)
    currentChannel.send(commands[command](arg), { tts });
  tts = false;
});
// COMMANDS
// adding/deleting and picking a game
commands.add = function add(game) {
  if (game === undefined) return 'please provide a game to add';
  games.push(game);
  return `successfully added ${game}`;
};
commands.remove = function remove(game) {
  if (game === undefined) return 'please provide a game to remove';
  const index = games.indexOf(game);
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
// picking igl
commands.igl = function igl() {
  if (voiceChannel === undefined) return 'please join a voice channel';
  const usersInChannel = voiceChannel.members;
  const users = [];
  for (const [snowflake, guildMember] of usersInChannel) {
    users.push(guildMember.user.username);
  }
  const rand = Math.floor(Math.random() * users.length);
  tts = true;
  return `${users[rand]} is team leader`;
};
// help
commands.help = function help() {
  return Object.keys(commands);
};
