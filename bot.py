import os
import sys
import time
from datetime import datetime
from pprint import pprint

import ccxt

exchange = ccxt.binance({}) 
price = exchange.fetchTicker('BTC/USDT')['last']
print(price)