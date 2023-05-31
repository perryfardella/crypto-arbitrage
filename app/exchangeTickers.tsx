"use client";
import { useEffect, useState } from "react";

interface Price {
  exchange: string;
  price: string;
}

export default function ExchangeTickers() {
  const [prices, setPrices] = useState<Price[] | null>(null);

  console.log(prices);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          fetch("https://api.kraken.com/0/public/Ticker?pair=xbtusd"),
          fetch("https://api.bybit.com/v2/public/tickers?symbol=BTCUSD"),
          fetch("https://api.coinbase.com/v2/prices/BTC-USD/buy"),
          fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"),
        ];

        const responses = await Promise.all(requests);

        const data = await Promise.all(
          responses.map((response) => response.json())
        );

        const formattedPrices: Price[] = data.map((response, index) => {
          switch (index) {
            case 0: // Kraken
              return {
                exchange: "Kraken",
                price: response.result.XXBTZUSD.c[0],
              };
            case 1: // ByBit
              return {
                exchange: "ByBit",
                price: response.result[0].last_price,
              };
            case 2: // Coinbase
              return {
                exchange: "Coinbase",
                price: response.data.amount,
              };
            case 3: // Binance
              return {
                exchange: "Binance",
                price: response.price,
              };
            default:
              return null as any;
          }
        });

        setPrices(formattedPrices);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {prices ? (
        <div>
          <h2>Bitcoin/USD Prices</h2>
          <ul>
            {prices.map((price) => (
              <li key={price.exchange}>
                {price.exchange}: ${price.price}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
