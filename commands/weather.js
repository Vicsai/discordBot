const getLocationID = require('./getLocationID.js');
const getWeather = require('./getWeather.js');

function formatMsg(weather, minTemp, maxTemp) {
  const msg = ['```\n'];
  for (let i = 0; i < weather.length; i += 1) msg.push(`| ${weather[i]}|`);
  msg.push('\n');
  for (let i = 0; i < minTemp.length; i += 1) msg.push(`|Min Temp ${minTemp[i]}|`);
  msg.push('\n');
  for (let i = 0; i < maxTemp.length; i += 1) msg.push(`|Max Temp ${maxTemp[i]}|`);
  msg.push('```');
  return msg.join('');
}

async function weatherCommand(arg) {
  if (arg.length === 0) return 'no location given';
  const location = arg.join(' ');

  const locationID = await getLocationID(location);
  if (Number.isNaN(parseInt(locationID, 10))) return locationID;
  const weatherData = await getWeather(locationID);
  const weather = weatherData[0];
  const minTemp = weatherData[1];
  const maxTemp = weatherData[2];
  const returnMsg = formatMsg(weather, minTemp, maxTemp);
  return returnMsg;
}

module.exports = {
  command: weatherCommand,
  name: 'weather',
  usage: '!weather <city>',
  description: 'shows the weather for the following days'
};
