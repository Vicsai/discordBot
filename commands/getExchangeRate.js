const https = require('https');

function getExchangeRate(currency) {
  return new Promise((resolve, reject) => {
    const code = `FXCAD${currency}`;
    const url = `https://www.bankofcanada.ca/valet/observations/${code}/json`;
    const req = https.request(url, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        const obj = JSON.parse(data);
        if (obj.hasOwnProperty('message')) resolve('invalid link');
        else {
          const lastElement = Object.keys(obj.observations).length - 1;
          const rate = obj.observations[lastElement][code].v;
          resolve(rate);
        }
      });
    });
    req.on('error', error => {
      reject(error);
    });
    req.end();
  });
}
module.exports = getExchangeRate;
