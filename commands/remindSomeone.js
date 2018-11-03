const time = { sec: 1000, min: 60000, hr: 3600000 };

async function remindSomeone(user, msg) {
  if (time[msg[1]] !== undefined) {
    const timeValue = time[msg[1]];
    const givenTime = parseInt(msg[0], 10);
    msg.splice(0, 2);
    const message = msg.join(' ');
    const waitTime = givenTime * timeValue;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`${user} ${message}`);
      }, waitTime);
    });
  }
}
module.exports = remindSomeone;