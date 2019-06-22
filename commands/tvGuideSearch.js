const tvmaze = require('tvmaze-node');

function tvGuideSearch(date, tvShows) {
  const usSearch = new Promise((resolve, reject) => {
    const usMes = [];
    tvmaze.schedule('US', date, (error, response) => {
      if (error) reject(error);
      const sched = JSON.parse(response);
      sched.forEach(episode => {
        if (tvShows.indexOf(episode.show.name) !== -1) {
          usMes.push(`${episode.show.name} ${episode.season}x${episode.number} ${episode.name}`);
        }
      });
      resolve(usMes.join('\n'));
    });
  });
  const jpSearch = new Promise((resolve, reject) => {
    tvmaze.schedule('JP', date, (error, response) => {
      const jpMes = [];
      if (error) reject(error);
      const sched1 = JSON.parse(response);
      sched1.forEach(episode => {
        if (tvShows.indexOf(episode.show.name) !== -1) {
          jpMes.push(`${episode.show.name} ${episode.season}x${episode.number} ${episode.name}`);
        }
      });
      resolve(jpMes.join('\n'));
    });
  });

  return Promise.all([usSearch, jpSearch]).then(values => {
    if (values[0] === '' && values[1] === '') return 'no shows airing';
    const mes = values.join('\n');
    return mes;
  });
}
module.exports = tvGuideSearch;
