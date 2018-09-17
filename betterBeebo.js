// libraries
const Discord = require('discord.js');
const tvmaze = require('tvmaze-node');
const auth = require('./auth.json');

// variables
let server; // server id
let channels; // array of text and voice channels in server
let textChannel; // text channel id

const games = [];
const tvShows = [];
const commands = {}; // object that contains the commands
const ttsArray = []; // array of booleans that dictates the use of text-to-speech

const bot = new Discord.Client();

function parseMessage(message) {
  const formatted = message.content.substring(1);
  const parsed = formatted.split(' ');
  return parsed;
}
function formatDate(date) {
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  console.log(formattedDate);
  return formattedDate;
}

bot.login(auth.token);

bot.on('ready', () => {
  console.log('beebo lives!');
  server = bot.guilds.get('484192628586577934'); // 484192628586577934
  channels = Array.from(server.channels.keys());
  for (let i = 0; i < channels.length; i += 1) {
    if (server.channels.get(channels[i]).type === 'text') {
      textChannel = server.channels.get(channels[i]);
    }
  }
  for (let i = 0; i < Object.keys(commands).length; i += 1) ttsArray.push(false);
});
bot.on('message', message => {
  if (!message.content.startsWith('!') || message.author.bot) return;
  const [command, arg] = parseMessage(message);
  const commandIndex = Object.keys(commands).indexOf(command);
  if (commandIndex !== -1) {
    const commandTTS = ttsArray[commandIndex];
    const mes = commands[command](arg);
    if (mes !== '-1') textChannel.send(mes, { tts: commandTTS });
  }
});
bot.on('voiceStateUpdate', (oldMember, newMember) => {
  // TODO change to not use tts
  const oldUserChannel = oldMember.voiceChannel;
  const newUserChannel = newMember.voiceChannel;
  // check if user joined a channel
  if (newUserChannel !== undefined && oldUserChannel === undefined) {
    textChannel.send(`${newMember.user.username} has joined your channel`);
  }
});
// COMMANDS

// add game into games array
commands.add = function add(game) {
  if (game === undefined) return 'please provide a game to add';
  games.push(game);
  return `successfully added ${game}`;
};
// remove game from games array if found
commands.remove = function remove(game) {
  if (game === undefined) return 'please provide a game to remove';
  const index = games.indexOf(game);
  if (index !== -1) {
    games.splice(index, 1);
    return `successfully removed ${game}`;
  }
  return `${game} was not in the array`;
};
// lists values in array games
commands.show = function show() {
  if (games.length !== 0) return games.toString();
  return 'no games in array';
};
commands.pick = function pick() {
  const rand = Math.floor(Math.random() * games.length);
  return games[rand];
};
// randomly selects a user from a voice channel
commands.igl = function igl() {
  for (let i = 0; i < channels.length; i += 1) {
    const currentChannel = server.channels.get(channels[i]);
    const members = Array.from(currentChannel.members.keys());
    if (currentChannel.type === 'voice' && members.length === 1)
      return 'not enough people in channel';
    if (currentChannel.type === 'voice' && members.length > 1) {
      const users = [];
      for (let j = 0; j < members.length; j += 1) {
        users.push(currentChannel.members.get(members[j]));
      }
      const rand = Math.floor(Math.random() * users.length);
      return `${users[rand]} is team leader`;
    }
  }
  return 'no one in voice channel';
};
commands.tvAdd = function tvAdd(tvSeries) {
  tvShows.push(tvSeries);
  return `${tvSeries} is added`;
};
commands.tvGuide = function tvGuide(x) {
  // x can pass in day of the week or all; if nothing then defaults to today
  const date = new Date();
  if (x === undefined) {
    formatDate(date);
  }
  tvmaze.schedule('US', date, (error, response) => {
    console.log(JSON.parse(response));

    return '0';
  });
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
