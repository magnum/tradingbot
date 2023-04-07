import os
import sys
import time
from datetime import datetime
from pprint import pprint

import ccxt

exchange = ccxt.coinbasepro
price = exchange.fetchTicker('BTC/USDT')['last']
print(price)