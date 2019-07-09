const https = require('https');

function getWeather(locationID) {
  return new Promise((resolve, reject) => {
    const url = `https://www.metaweather.com/api/location/${locationID}/`;
    const req = https.request(url, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        const obj = JSON.parse(data);
        if (Object.prototype.hasOwnProperty.call(obj, 'detail')) resolve('invalid link');
      });
    });
  });
}
module.exports = getWeather;
