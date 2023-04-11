import dotenv from 'dotenv';
import ccxt from 'ccxt';
import dayjs from 'dayjs';

dotenv.config();
class Bot {
  constructor(exchange) {
    this.exchange = exchange;
  }

  async price_in_usd(currency) {
    const ticker = await this.exchange.fetchTicker(currency.toUpperCase() + '/USD');
    return ticker.last;
  }

  async value_in_usd(value, currency) {
    const price_in_usd = await this.price_in_usd(currency);
    return value / price_in_usd;
  }
  async getPositionStatus(currency) {
    const req = await this.exchange.fetchTicker(currency)
    const actual_price = await req.last
    const order_price = 1900.13
    const order_type = 'B'
    let balance;
    if (order_type === 'B') {
        balance = actual_price - order_price
    } else {
        balance = order_price - actual_price
    }
    const perc = ((actual_price / order_price) * 100) - 100
    console.log(`You have open a ${order_type} position into this market: ${req.symbol}. Your starting price is ${order_price} USD`)
    console.log(`Your balance is ${balance.toFixed(2)} USD from the opening position`)
    console.log(`Your position is ${perc.toFixed(2)}% from the opening position`)
}

  async run() {
    // const amount = 100;
    // const currency = 'eth'
    // const value = await this.value_in_usd(amount, currency);
    // console.log(`${amount} $ is worth ${value.toFixed(8)} ${currency} at ${dayjs()}`);
    this.getPositionStatus('ETH/EUR')
  }
}


const exchange = new ccxt.coinbase({
  apiKey: process.env.COINBASE_API_KEY,
  secret: process.env.COINBASE_SECRET,
  enableRateLimit: true,
});
const bot = new Bot(exchange);
bot.run();
  
  