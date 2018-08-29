const Discord = require('discord.io');
const auth = require('./auth.json');

const bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
