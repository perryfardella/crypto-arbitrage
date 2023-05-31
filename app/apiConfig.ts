export const apiLinks = [
  "https://api.kraken.com/0/public/Ticker?pair=xbtusd",
  "https://api.bybit.com/v2/public/tickers?symbol=BTCUSD",
  "https://api.coinbase.com/v2/prices/BTC-USD/buy",
  "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
  "https://api.gemini.com/v2/ticker/btcusd",
  "https://api.huobi.pro/market/detail/merged?symbol=btcusdt",
];

export const pricePaths = [
  "result.XXBTZUSD.c[0]", // Kraken
  "result[0].last_price", // ByBit
  "data.amount", // Coinbase
  "price", // Binance
  "last", // Gemini
  "tick.close", // Huobi
];
