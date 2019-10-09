const https = require('https');

/**
 *
 * @param {string} currency -a currency's ISO 4217 alphabetic code
 * @return {string} exchange rate from given currency to CAD
 */
function getExchangeRate(currency) {
  return new Promise((resolve, reject) => {
    const code = `FX${currency}CAD`;
    const url = `https://www.bankofcanada.ca/valet/observations/${code}/json`;
    const req = https.request(url, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', () => {
        const obj = JSON.parse(data);
        if (Object.prototype.hasOwnProperty.call(obj, 'message')) return resolve('invalid link');
        const lastElement = Object.keys(obj.observations).length - 1;
        const rate = obj.observations[lastElement][code].v;
        return resolve(rate);
      });
    });
    req.on('error', error => {
      reject(error);
    });
    req.end();
  });
}
module.exports = getExchangeRate;
