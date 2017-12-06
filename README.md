<p align=center>
<img src="https://raw.githubusercontent.com/bichenkk/coinmon/master/logo.png">
</p>
<p align=center>
<a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node.js-%3E=_6.0-green.svg"></a>
<a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
</p>  

> Minimal cryptocurrency price ticker CLI based on [COINMON](https://github.com/bichenkk/coinmon)

Check cryptocurrencies' prices, changes on your console.

All data comes from [coinmarketcap.com](https://coinmarketcap.com/) APIs.

## Install

In order to use coinmon, make sure that you have [Node](https://nodejs.org/) version 6.0.0 or higher.

```
$ npm install -g coinmon
```

## Usage

To check the top 10 cryptocurrencies ranked by their market cap, simply enter
```
$ coinmon
```

## Options

You can use the `-c` (or `--convert`) with the fiat currency symbol to find in terms of another currency.
The default currency is USD and it supports AUD, BRL, CAD, CHF, CLP, CNY, CZK, DKK, EUR, GBP, HKD, HUF, IDR, ILS, INR, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PKR, PLN, RUB, SEK, SGD, THB, TRY, TWD, ZAR.

```
$ coinmon -c eur // convert prices to Eurodollars
$ coinmon -c jpy // convert prices to the Japanese yen
```

You can use the `-u` (or `--usd`) to display USD in addition to your currency

```
$ coinmon -u // show USD value
```

You can use the `-f` (or `--find`) with coin symbol to search cryptocurrencies. You can add symbols seperated by comma. Credit to @maticrivo

```
$ coinmon -f btc // search coins included keyword btc
$ coinmon -f btc,eth // search coins included keyword btc or eth
```

You can use the `-t` (or `--top`) with the index to find the top n cryptocurrencies ranked by their market cap.

```
$ coinmon -t 50 // find top 50
$ coinmon -t 1000 // find top 1000
```

You can use the `-h` (or `--help`) to find all valid options of coinmon

```
$ coinmon -h
```

## Screenshot

<img src="https://raw.githubusercontent.com/sublistic/coinmon/minimal/screenshot.png">

## Development

It's simple to run `coinmon` on your local computer.  
The following is step-by-step instruction.

```
$ git clone https://github.com/bichenkk/coinmon.git
$ cd coinmon
$ yarn
$ npm install -g
$ npm link
$ coinmon
```

## Docker

### Initial usage

```
$ docker run --rm -ti jaymoulin/coinmon
```

You can pass parameters just like `coinmon` binary

```
$ docker run --rm -ti jaymoulin/coinmon --help
```

### Local usage

#### Build image

```
$ docker build -t coinmon .
```

#### Usage

```
$ docker run --rm -ti coinmon
```

You can pass parameters just like `coinmon` binary

```
$ docker run --rm -ti coinmon --help
```

## License

MIT
