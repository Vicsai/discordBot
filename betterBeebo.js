// libraries
const Discord = require('discord.js');
const fs = require('fs');
const schedule = require('node-schedule');

const auth = require('./auth.json');

class BetterBeebo {
  constructor(games, tvShows) {
    const bot = new Discord.Client();

    this.server = '';
    this.textChannel = '';

    this.games = games;
    this.tvShows = tvShows;
    this.commands = {}; // object that contains the commands
    this.loadCommands();

    bot.login(auth.token);

    bot.on('ready', () => {
      // initialize server id and text channel id
      this.server = bot.guilds.get(auth.testID);
      this.channels = Array.from(this.server.channels.keys());
      for (let i = 0; i < this.channels.length; i += 1) {
        if (this.server.channels.get(this.channels[i]).type === 'text') {
          this.textChannel = this.server.channels.get(this.channels[i]);
          break;
        }
      }
      schedule.scheduleJob('1 * * *', () => {
        this.commands.tvGuide.command([], this.tvShows).then(res => {
          this.sendMessage(res);
        });
      });
    });
    bot.on('message', msg => {
      if (!msg.content.startsWith('!') || msg.author.bot) return;
      this.author = msg.author.id;
      this.textChannel = msg.channel;
      this.server = msg.guild;
      const arg = msg.content.slice(1).split(' ');
      let command = arg.shift();
      if (command in this.commands) {
        command = this.commands[command];
        command.command.call(this, arg, this.games, this.tvShows).then(res => {
          if (res !== undefined) this.sendMessage(res, false);
        });
      }
    });

    // bot.on('voiceStateUpdate', (oldMember, newMember) => {
    //   const oldUserChannel = oldMember.voiceChannel;
    //   const newUserChannel = newMember.voiceChannel;
    //   // check if user joined a channel
    //   if (newUserChannel !== undefined && oldUserChannel === undefined) {
    //     this.sendMessage(`${newMember.user.username} has joined your channel`, true);
    //   }
    // });
    function graceful() {
      bot.destroy().then(process.exit(0));
    }
    process.on('SIGTERM', graceful);
    process.on('SIGINT', graceful);
  }

  async loadCommands() {
    fs.readdir(`./commands`, (err, files) => {
      if (err) return 'failed to load commands';
      files.forEach(file => {
        try {
          const command = require(`./commands/${file}`);
          if (command.usage === undefined) return;
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

  async sendMessage(message, tts) {
    this.textChannel.send(message, { tts });
  }
}

module.exports = BetterBeebo;
