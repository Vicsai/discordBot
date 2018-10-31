async function tvAddCommand(tvSeries) {
  if (tvSeries === undefined || tvSeries.length === 0) {
    return 'no tv show specified';
  }
  const str = tvSeries.join(' ');
  this.tvShows.push(str);
  return `${str} is added`;
}
module.exports = {
  command: tvAddCommand,
  name: 'tvAdd',
  usage: '!tvAdd <tvSeries>',
  description: 'add a series to track'
};
