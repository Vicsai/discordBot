async function iglCommand() {
  for (let i = 0; i < this.channels.length; i += 1) {
    const currentChannel = this.server.channels.get(this.channels[i]);
    const members = Array.from(currentChannel.members.keys());
    if (currentChannel.type === 'voice' && members.length === 1) {
      return 'not enough people in channel';
    }
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
}
module.exports = {
  command: iglCommand,
  name: 'igl',
  usage: '!igl',
  description: 'randomly choose someone from the voice channel'
};
