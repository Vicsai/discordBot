const getLocationID = require('./getLocationID.js');
const getWeather = require('./getWeather.js');

async function weatherCommand(arg) {
  const location = arg.join(' ');

  const locationID = getLocationID(location);
  if (Number.isNaN(parseInt(locationID, 10))) return 'invalid city';
  const weatherData = getWeather(locationID);
}
module.exports = {
  command: weatherCommand,
  name: 'weather',
  usage: '!weather <city>',
  description: 'shows the weather for the following days'
};
