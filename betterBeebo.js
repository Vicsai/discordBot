// libraries
const Discord = require('discord.js');
const fs = require('fs');

const auth = require('./auth.json');

class BetterBeebo {
  constructor() {
    const bot = new Discord.Client();

    this.server = bot.guilds.get(auth.testID);
    this.textChannel = '';
    let channels; // array of text and voice channels in server

    this.games = [];
    this.tvShows = [
      'The Flash',
      'Arrow',
      "DC's Legends of Tomorrow",
      'Black Lightning',
      'Gotham',
      'Modern Family',
      'Titans'
    ];
    this.commands = {}; // object that contains the commands
    this.loadCommands();
    this.ttsArray = []; // array of booleans that dictates the use of text-to-speech

    bot.login(auth.token);

    bot.on('ready', () => {
      console.log('beebo lives!');
      this.server = bot.guilds.get(auth.testID);
      channels = Array.from(this.server.channels.keys());
      for (let i = 0; i < channels.length; i += 1) {
        if (this.server.channels.get(channels[i]).type === 'text') {
          this.textChannel = this.server.channels.get(channels[i]);
          return;
        }
      }
    });
    bot.on('message', msg => {
      if (!msg.content.startsWith('!') || msg.author.bot) return;
      const arg = msg.content.slice(1).split(' ');
      let command = arg.shift();
      if (command in this.commands) {
        command = this.commands[command];
        command.command.call(this, arg).then(res => {
          if (res !== undefined) this.sendMessage(res);
        });
      }
    });

    bot.on('voiceStateUpdate', (oldMember, newMember) => {
      const oldUserChannel = oldMember.voiceChannel;
      const newUserChannel = newMember.voiceChannel;
      // check if user joined a channel
      if (newUserChannel !== undefined && oldUserChannel === undefined) {
        this.sendMessage(`${newMember.user.username} has joined your channel`);
      }
    });
  }

  async loadCommands() {
    fs.readdir(`./commands`, (err, files) => {
      if (err) return 'failed to load commands';
      files.forEach(file => {
        try {
          const command = require(`./commands/${file}`);
          this.commands[command.name] = Object.assign(
            {
              usage: '',
              description: ''
            },
            command
          );
        } catch (err1) {
          console.log(`failed to load command ${file}`);
        }
      });
      return 0;
    });
  }

  async init() {}

  async sendMessage(message) {
    this.textChannel.send(message);
  }
}

module.exports = BetterBeebo;
