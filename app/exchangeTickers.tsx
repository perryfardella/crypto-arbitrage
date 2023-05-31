"use client";
import { useEffect, useState } from "react";
import { apiLinks, pricePaths } from "./apiConfig";

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
        const requests = apiLinks.map((link) => fetch(link));
        const responses = await Promise.all(requests);
        const data = await Promise.all(
          responses.map((response) => response.json())
        );

        const formattedPrices: Price[] = data.map((response, index) => {
          const pricePath = pricePaths[index];
          const price = eval(`response.${pricePath}`);
          return {
            exchange: getExchangeName(index),
            price: String(price),
          };
        });

        setPrices(formattedPrices);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getExchangeName = (index: number): string => {
    switch (index) {
      case 0:
        return "Kraken";
      case 1:
        return "ByBit";
      case 2:
        return "Coinbase";
      case 3:
        return "Binance";
      case 4:
        return "Gemini";
      case 5:
        return "Huobi";
      default:
        return "";
    }
  };

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
