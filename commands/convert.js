const getExchangeRate = require('./getExchangeRate.js');

async function convertCommand(arg) {
  const value = arg[0];
  let currency = arg[1];

  if (value === undefined) return 'nothing to convert';
  if (Number.isNaN(parseFloat(arg[0], 10))) return 'number was not given';

  if (currency === undefined) currency = 'usd';
  currency = currency.toLowerCase();
  if (currency.length !== 3 || currency === 'cad') return 'invalid currency given';
  currency = currency.toUpperCase();
  const exchangeRate = await getExchangeRate(currency);
  const exchangeValue = parseFloat(value * exchangeRate).toFixed(2);
  return `${value} ${currency} is about ~$${exchangeValue} CAD`;
}
module.exports = {
  command: convertCommand,
  name: 'convert',
  usage: '!convert <value> <currency>',
  description:
    'convert the current value into Canadian dollars, if no currency is given usd is set as default'
};
