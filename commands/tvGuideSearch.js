const tvmaze = require('tvmaze-node');

function tvGuideSearch(date, tvShows) {
  tvmaze.schedule('US', date, (error, response) => {
    if (error) {
      return 'error with tvMaze api';
    }
    const sched = JSON.parse(response);
    const msg = [];
    sched.forEach(episode => {
      if (tvShows.indexOf(episode.show.name) !== -1) {
        msg.push(`${episode.show.name} ${episode.season}x${episode.number} ${episode.name}`);
      }
    });
    if (msg.length >= 1) {
      return 'd'; //msg.join('\n');
    }
    return 'no shows airing today';
  });
}
module.exports = tvGuideSearch;
