let currency = '';
async function convertCommand(arg) {
  if (arg[0] === undefined) return 'nothing to convert';
  if (Number.isNaN(parseFloat(arg[0], 10))) return 'number was not given';
  if (arg[1] === undefined) currency = 'usd';
  else currency = arg[1];
  if (Object.keys(this.exchangeRates).includes(currency)) {
    const convertedValue = (parseFloat(arg[0], 10) * this.exchangeRates[currency]).toFixed(2);
    return `~$${convertedValue} CAD`;
  }
  return `exchange rate for currency not set`;
}
module.exports = {
  command: convertCommand,
  name: 'convert',
  usage: '!convert <value> <currency>',
  description:
    'convert the current value into Canadian dollars, if no currency is given usd is set as default'
};
