import dotenv from 'dotenv';
import ccxt from 'ccxt';
import dayjs from 'dayjs';

dotenv.config();
class Bot {
  constructor(exchange) {
    this.exchange = exchange;
  }

  async price_in_usd(currency) {
    const ticker = await this.exchange.fetchTicker(currency + '/USD');
    return ticker.last;
  }

  async value_in_usd(value, currency) {
    const price_in_usd = await this.price_in_usd(currency);
    return value / price_in_usd;
  }


  async run() {
    const amount = 100;
    const currency = 'ETH'
    const value = await this.value_in_usd(amount, currency);
    console.log(`${amount} $ is worth ${value.toFixed(2)} ${currency} at ${dayjs()}`);
  }
}


const exchange = new ccxt.coinbase({
  apiKey: process.env.COINBASE_API_KEY,
  secret: process.env.COINBASE_SECRET,
  enableRateLimit: true,
});
const bot = new Bot(exchange);
bot.run();