async function tvRemoveCommand(tvSeries) {
  if (tvSeries === undefined || tvSeries.length === 0) {
    return 'no tv show specified';
  }
  const str = tvSeries.join(' ');
  const index = this.tvShows.indexOf(str);
  if (index !== -1) {
    this.tvShows.splice(index, 1);
    return `successfully removed ${tvSeries}`;
  }
  return `${tvSeries} not found in array`;
}
module.exports = {
  command: tvRemoveCommand,
  name: 'tvRemove',
  usage: '!tvRemove <tvSeries>',
  description: 'remove a tv series that is tracked'
};
