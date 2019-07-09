const https = require('https');

function getLocationID(location) {
  return new Promise((resolve, reject) => {
    const url = `https://www.metaweather.com/api/location/search/?query=${location}`;
    const req = https.request(url, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        const obj = JSON.parse(data);
        if (Object.keys(obj).length === 0) resolve('cannot find city');
        if (Object.keys(obj).length > 1) resolve('please use full name of the city');
        const id = obj[0].woeid;
        resolve(id);
      });
    });
    req.on('error', error => {
      reject(error);
    });
    req.end();
  });
}
module.exports = getLocationID;
