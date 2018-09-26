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
  const parsed = [];
  const formatted = message.content.substring(1);
  const space = formatted.indexOf(' ');
  if (space !== -1) {
    parsed[0] = formatted.slice(0, space);
    parsed[1] = formatted.slice(space + 1);
  } else parsed[0] = formatted;
  return parsed;
}
function formatDate(date) {
  const month = `0${date.getMonth() + 1}`;
  const formattedDate = `${date.getFullYear()}-${month.substring(0, 2)}-${date.getDate()}`;
  console.log(formattedDate);
  return formattedDate;
}
// TODO add tts
function sendMessage(message) {
  textChannel.send(message);
  return message;
}

bot.login(auth.token);

bot.on('ready', () => {
  console.log('beebo lives!');
  server = bot.guilds.get('484192628586577934'); // 484192628586577934
  channels = Array.from(server.channels.keys());
  for (let i = 0; i < channels.length; i += 1) {
    if (server.channels.get(channels[i]).type === 'text') {
      textChannel = server.channels.get(channels[i]);
      return;
    }
  }
  for (let i = 0; i < Object.keys(commands).length; i += 1) ttsArray.push(false);
});
bot.on('message', message => {
  if (!message.content.startsWith('!') || message.author.bot) return;
  const [command, arg] = parseMessage(message);
  const commandIndex = Object.keys(commands).indexOf(command);
  if (commandIndex !== -1) {
    commands[command](arg);
  }
});
bot.on('voiceStateUpdate', (oldMember, newMember) => {
  // TODO change to not use tts
  const oldUserChannel = oldMember.voiceChannel;
  const newUserChannel = newMember.voiceChannel;
  // check if user joined a channel
  if (newUserChannel !== undefined && oldUserChannel === undefined) {
    sendMessage(`${newMember.user.username} has joined your channel`);
  }
});
// COMMANDS

// add game into games array
commands.add = function add(game) {
  if (game === undefined) {
    sendMessage('please provide a game to add');
    return 'undefined (add game)';
  }
  games.push(game);
  sendMessage(`successfully added ${game}`);
  return 'success (add game)';
};
// remove game from games array if found
commands.remove = function remove(game) {
  if (game === undefined) {
    sendMessage('please provide a game to remove');
    return 'undefined (remove game)';
  }
  const index = games.indexOf(game);
  if (index !== -1) {
    games.splice(index, 1);
    sendMessage(`successfully removed ${game}`);
    return 'success (remove game)';
  }
  sendMessage(`${game} was not in the array`);
  return 'game not in array (remove game)';
};
// lists values in array games
commands.show = function show() {
  if (games.length !== 0) {
    sendMessage(games.toString());
    return 'success (show game)';
  }
  sendMessage('no games in array');
  return 'no games in array (show game)';
};
commands.pick = function pick() {
  const rand = Math.floor(Math.random() * games.length);
  sendMessage(games[rand]);
  return 'success (pick game)';
};
// randomly selects a user from a voice channel
commands.igl = function igl() {
  for (let i = 0; i < channels.length; i += 1) {
    const currentChannel = server.channels.get(channels[i]);
    const members = Array.from(currentChannel.members.keys());
    if (currentChannel.type === 'voice' && members.length === 1) {
      sendMessage('not enough people in channel');
      return 'not enough people (igl)';
    }
    if (currentChannel.type === 'voice' && members.length > 1) {
      const users = [];
      for (let j = 0; j < members.length; j += 1) {
        users.push(currentChannel.members.get(members[j]));
      }
      const rand = Math.floor(Math.random() * users.length);
      sendMessage(`${users[rand]} is team leader`);
      return 'success (igl)';
    }
  }
  sendMessage('no one in voice channel');
  return 'no one in channel (igl)';
};
commands.tvAdd = function tvAdd(tvSeries) {
  tvShows.push(tvSeries);
  sendMessage(`${tvSeries} is added`);
  console.log(tvShows);
  return 'success (add show)';
};
commands.tvGuide = function tvGuide() {
  // x can pass in day of the week or all; if nothing then defaults to today
  let date = new Date();
  date = formatDate(date);
  tvmaze.schedule('US', date, (error, response) => {
    const sched = JSON.parse(response);
    sched.forEach(episode => {
      if (tvShows.indexOf(episode.show.name) !== -1) {
        const mes = `${episode.show.name} ${episode.season}x${episode.number} ${episode.name}`;
        sendMessage(mes);
      }
    });
  });
};
// toggle tts on commands
// commands.tts = function tts(command) {
//   const commandIndex = Object.keys(commands).indexOf(command);
//   if (commandIndex !== -1) {
//     ttsArray[commandIndex] = !ttsArray[commandIndex];
//     return `tts for ${command} is ${ttsArray[commandIndex]}`;
//   }
//   return `unable to toggle tts for ${command}`;
// };
// help
commands.help = function help() {
  return Object.keys(commands);
};
