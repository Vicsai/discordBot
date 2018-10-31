const tvmaze = require('tvmaze-node');

async function tvGuideCommand(x) {
  // x can pass in day of the week or all; if nothing then defaults to today
  let date;
  if (x === undefined) {
    date = new Date();
    date = formatDate(date);
  }
  tvmaze.schedule('US', date, (error, response) => {
    if (error) return 'error';
    const sched = JSON.parse(response);
    sched.forEach(episode => {
      if (this.tvShows.indexOf(episode.show.name) !== -1) {
        const mes = `${episode.show.name} ${episode.season}x${episode.number} ${episode.name}`;
        this.sendMessage(mes);
      }
    });
  });
}
function formatDate(date) {
  const month = `0${date.getMonth() + 1}`;
  const formattedDate = `${date.getFullYear()}-${month.substring(0, 2)}-${date.getDate()}`;
  return formattedDate;
}
module.exports = {
  command: tvGuideCommand,
  name: 'tvGuide',
  usage: '!tvGuide <param>',
  description: 'show information on tracked shows'
};
