const tvmaze = require('tvmaze-node');

function tvGuideSearch(date, tvShows) {
  const mes = [];
  return new Promise((resolve, reject) => {
    tvmaze.schedule('US', date, (error, response) => {
      if (error) reject(error);
      const sched = JSON.parse(response);
      sched.forEach(episode => {
        if (tvShows.indexOf(episode.show.name) !== -1) {
          mes.push(`${episode.show.name} ${episode.season}x${episode.number} ${episode.name}`);
        }
      });
    });
    tvmaze.schedule('JP', date, (error, response) => {
      if (error) reject(error);
      const sched1 = JSON.parse(response);
      sched1.forEach(episode => {
        if (tvShows.indexOf(episode.show.name) !== -1) {
          mes.push(`${episode.show.name} ${episode.season}x${episode.number} ${episode.name}`);
        }
      });
      if (mes.length >= 1) resolve(mes.join('\n'));
      resolve('no shows airing');
    });
  });
}
module.exports = tvGuideSearch;
