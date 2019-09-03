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
        const weather = [];
        const minTemp = [];
        const maxTemp = [];
        obj.consolidated_weather.forEach(day => {
          weather.push(day.weather_state_name);
          minTemp.push(day.min_temp.toFixed(1));
          maxTemp.push(day.max_temp.toFixed(1));
        });
        resolve([weather, minTemp, maxTemp]);
      });
    });
    req.on('error', error => {
      reject(error);
    });
    req.end();
  });
}
module.exports = getWeather;
