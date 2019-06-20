const tvmaze = require('tvmaze-node');

function tvGuideSearch(date, tvShows) {
  return new Promise((resolve, reject) => {
    tvmaze.schedule('US', date, (error, response) => {
      if (error) {
        reject(error);
      }
      const sched = JSON.parse(response);
      const mes = [];
      sched.forEach(episode => {
        if (tvShows.indexOf(episode.show.name) !== -1) {
          mes.push(`${episode.show.name} ${episode.season}x${episode.number} ${episode.name}`);
        }
      });
      if (mes.length >= 1) resolve(mes.join('\n'));
      resolve(`no shows airing`);
    });
  });
}
module.exports = tvGuideSearch;
