import ccxt from 'ccxt';

const exchange = new ccxt.coinbasepro({});
const ticker = await exchange.fetchTicker('BTC/USD');
console.log(ticker.last);