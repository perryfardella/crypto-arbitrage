export type Exchange = {
  exchangeName: string;
  link: string;
  askPricePath: string;
  bidPricePath: string;
  currency: string;
};

export const exchanges: Exchange[] = [
  {
    exchangeName: "Kraken",
    link: "https://api.kraken.com/0/public/Ticker?pair=xbtusd",
    askPricePath: "result.XXBTZUSD.a[0]",
    bidPricePath: "result.XXBTZUSD.b[0]",
    currency: "USD",
  },
  {
    exchangeName: "ByBit",
    link: "https://api.bybit.com/v2/public/tickers?symbol=BTCUSD",
    askPricePath: "result[0].ask_price",
    bidPricePath: "result[0].bid_price",
    currency: "USD",
  },
  {
    exchangeName: "Coinbase",
    link: "https://api.coinbase.com/v2/prices/BTC-USD/buy",
    askPricePath: "data.amount",
    bidPricePath: "data.amount",
    currency: "USD",
  },
  {
    exchangeName: "Binance",
    link: "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
    askPricePath: "price",
    bidPricePath: "price",
    currency: "USDT",
  },
  {
    exchangeName: "Gemini",
    link: "https://api.gemini.com/v2/ticker/btcusd",
    askPricePath: "ask",
    bidPricePath: "bid",
    currency: "USD",
  },
  {
    exchangeName: "Huobi",
    link: "https://api.huobi.pro/market/detail/merged?symbol=btcusdt",
    askPricePath: "tick.ask[0]",
    bidPricePath: "tick.close[0]",
    currency: "USDT",
  },
  // Commented out for now as we need an API key to make this request
  // {
  //   exchangeName: "BTC Markets",
  //   link: "https://api.btcmarkets.net/v3/markets/BTC/AUD/ticker",
  //   askPricePath: "bestAsk",
  //   bidPricePath: "bestBid",
  //   currency: "AUD",
  // },
  {
    exchangeName: "Luno",
    link: "https://api.luno.com/api/1/ticker?pair=XBTZAR",
    askPricePath: "ask",
    bidPricePath: "bid",
    currency: "ZAR",
  },
  {
    exchangeName: "Valr",
    link: "https://api.valr.com/v1/public/BTCZAR/marketsummary",
    askPricePath: "askPrice",
    bidPricePath: "bidPrice",
    currency: "ZAR",
  },
];
