export type Exchange = {
  exchangeName: string;
  link: string;
  pricePath: string;
  currency: string;
};

export const exchanges = [
  {
    exchangeName: "Kraken",
    link: "https://api.kraken.com/0/public/Ticker?pair=xbtusd",
    pricePath: "result.XXBTZUSD.c[0]",
    currency: "USD",
  },
  {
    exchangeName: "ByBit",
    link: "https://api.bybit.com/v2/public/tickers?symbol=BTCUSD",
    pricePath: "result[0].last_price",
    currency: "USD",
  },
  {
    exchangeName: "Coinbase",
    link: "https://api.coinbase.com/v2/prices/BTC-USD/buy",
    pricePath: "data.amount",
    currency: "USD",
  },
  {
    exchangeName: "Binance",
    link: "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
    pricePath: "price",
    currency: "USD",
  },
  {
    exchangeName: "Gemini",
    link: "https://api.gemini.com/v2/ticker/btcusd",
    pricePath: "ask",
    currency: "USD",
  },
  {
    exchangeName: "Huobi",
    link: "https://api.huobi.pro/market/detail/merged?symbol=btcusdt",
    pricePath: "tick.close",
    currency: "USD",
  },
  {
    exchangeName: "BTC Markets",
    link: "https://api.btcmarkets.net/v3/markets/BTC/AUD/ticker",
    pricePath: "lastPrice",
    currency: "AUD",
  },
];
