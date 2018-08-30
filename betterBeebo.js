// libraries
const Discord = require('discord.js');
const auth = require('./auth.json');
// variables
const games = [];
const commands = {};
let voiceChannel;
let textChannel = '';
const ttsArray = [];

const bot = new Discord.Client();

function parseMessage(message) {
  const formatted = message.content.substring(1);
  const parsed = formatted.split(' ');
  return parsed;
}

bot.login(auth.token);

bot.on('ready', () => {
  console.log('beebo lives!');
  for (let i = 0; i < Object.keys(commands).length; i += 1) ttsArray.push(false);
});
bot.on('message', message => {
  if (!message.content.startsWith('!') || message.author.bot) return;
  textChannel = message.channel;
  const parsed = parseMessage(message);
  const command = parsed[0];
  const arg = parsed[1];
  ({ voiceChannel } = message.member);

  if (Object.keys(commands).indexOf(command) !== -1) {
    const commandIndex = Object.keys(commands).indexOf(command);
    const commandTTS = ttsArray[commandIndex];
    const mes = commands[command](arg);
    if (mes !== '-1') textChannel.send(mes, { tts: commandTTS });
  }
});
bot.on('voiceStateUpdate', (oldMember, newMember) => {
  // use newMember.voiceChannelID to detect which channel
  // TODO change to not use tts
  const oldUserChannel = oldMember.voiceChannel;
  const newUserChannel = newMember.voiceChannel;
  const oldUsers = [];
  const newUsers = [];
  // check if voice channel is not empty before/after change
  if (newUserChannel !== undefined && oldUserChannel !== undefined) {
    // record all users in new state
    for (const [, guildMember] of newUserChannel.members) {
      newUsers.push(guildMember.user.username);
    }
    // record all users in old state
    for (const [, guildMember] of oldUserChannel.members) {
      oldUsers.push(guildMember.user.username);
    }
    // check if there are more users after the state change
    if (newUsers.length > oldUsers.length) {
      for (let i = 0; i < newUsers.length; i += 1) {
        if (oldUsers.indexOf(newUsers[i]) === -1) {
          textChannel.send(`${newUsers[i]} has joined your channel`, { tts: true });
        }
      }
    }
  }
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
  for (const [, guildMember] of usersInChannel) {
    users.push(guildMember.user.username);
  }
  const rand = Math.floor(Math.random() * users.length);
  return `${users[rand]} is team leader`;
};
// toggle tts on commands
commands.tts = function tts(command) {
  const commandIndex = Object.keys(commands).indexOf(command);
  if (commandIndex !== -1) {
    ttsArray[commandIndex] = !ttsArray[commandIndex];
    return `tts for ${command} is ${ttsArray[commandIndex]}`;
  }
  return `unable to toggle tts for ${command}`;
};
// help
commands.help = function help() {
  return Object.keys(commands);
};
