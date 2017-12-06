#!/usr/bin/env node
const program = require('commander');
const axios = require('axios');
const ora = require('ora');
const Table = require('cli-table2');
const colors = require('colors');
const humanize = require('humanize-plus');

const list = val => val.split(',')

program
  .version('0.0.1a')
  .option('-c, --convert [currency]', 'Convert to your fiat currency', 'usd')
  .option('-f, --find [symbol]', 'Find specific coin data with coin symbol (can be a comma seperated list)', list, [])
  .option('-t, --top [index]', 'Show the top coins ranked from 1 - [index] according to the market cap', null)
  .option('-H, --humanize [enable]', 'Show market cap as a humanized number, default true', true)
  .parse(process.argv);

const convert = program.convert.toUpperCase()
const availableCurrencies = ['USD', 'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR']
if (availableCurrencies.indexOf(convert) === -1) {
  return console.log('We cannot convert to your fiat currency.'.red)
}
const find = program.find
const top = !isNaN(program.top) && +program.top > 0 ? +program.top : (find.length > 0 ? 1500 : 10)
const humanizeIsEnabled = program.humanize !== 'false'
const table = new Table({
  chars: {
    'top': '',
    'top-mid': '',
    'top-left': '',
    'top-right': '',
    'bottom': '',
    'bottom-mid': '',
    'bottom-left': '',
    'bottom-right': '',
    'left': '',
    'left-mid': '' ,
    'mid': '' ,
    'mid-mid': '',
    'right': '',
    'right-mid': '',
    'middle': ''
  },
  head: ['Rank', 'Coin', `Price (${convert})`, 'Change (24H)', 'Change (1H)', `Market Cap (${convert})`].map(title => title.yellow),
  colWidths: [6, 14, 15, 15, 15, 20]
});

const spinner = ora('Loading data').start();
const sourceUrl = `https://api.coinmarketcap.com/v1/ticker/?limit=${top}&convert=${convert}`
axios.get(sourceUrl)
.then(function (response) {
  spinner.stop();
  response.data
    .filter(record => {
      if (find.length > 0) {
        return find.some(keyword => record.symbol.toLowerCase() === keyword.toLowerCase())
      }
      return true
    })
    .map(record => {
      const symbol = `${record.symbol}`
      const priceusd = usd? `${record.price_usd}` : ''
      const percentChange7d = record.percent_change_7d
      const textChange7d = `${percentChange7d}%`
      const change7d = percentChange7d? (percentChange7d > 0 ? ` ${textChange7d}` : textChange7d) : 'NA'
      const percentChange24h = record.percent_change_24h
      const textChange24h = `${percentChange24h}%`
      const change24h = percentChange24h? (percentChange24h > 0 ? ` ${textChange24h}` : textChange24h) : 'NA'
      const percentChange1h = record.percent_change_1h
      const textChange1h = `${percentChange1h}%`
      const marketCap = record[`market_cap_${convert}`.toLowerCase()];
      const displayedMarketCap = humanizeIsEnabled ? humanize.compactInteger(marketCap, 3) : marketCap;
      const change1h = percentChange1h ? (percentChange1h > 0 ? ` ${textChange1h}` : textChange1h) : 'NA'
      return [
        record.rank,
        symbol,
        record[`price_${convert}`.toLowerCase()],
        change24h,
        change1h,
        displayedMarketCap
      ]
    })
    .forEach(record => table.push(record))
  if (table.length === 0) {
    console.log('We are not able to find coins matching your keywords'.red);
  } else {
    console.log('\r');
    console.log(table.toString());
    console.log(`\n coinmarketcap.com at ${new Date().toLocaleTimeString()} \n`)
  }
})
.catch(function (error) {
  spinner.stop();
  console.error('Coinmon is not working now. Please try again later.'.red);
});
