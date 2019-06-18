const getExchangeRate = require('./getExchangeRate.js');

async function convertCommand(arg) {
  const value = arg[0];
  let currency = arg[1];

  if (value === undefined) return 'nothing to convert';
  if (Number.isNaN(parseFloat(arg[0], 10))) return 'number was not given';

  if (currency === undefined) currency = 'usd';
  currency = currency.toUpperCase();
  const exchangeRate = await getExchangeRate(currency);
  if (Number.isNaN(parseFloat(exchangeRate), 10)) return 'invalid currency given';
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
