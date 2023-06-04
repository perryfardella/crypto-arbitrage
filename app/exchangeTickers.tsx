"use client";
import { useEffect, useState } from "react";
import { exchanges } from "./apiConfig";

interface Price {
  exchange: string;
  askPrice: string;
  bidPrice: string;
  currency: string;
}

export default function ExchangeTickers() {
  const [prices, setPrices] = useState<Price[] | null>(null);

  console.log(prices);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = exchanges.map((exchange) => fetch(exchange.link));
        const responses = await Promise.all(requests);
        const data = await Promise.all(
          responses.map((response) => response.json())
        );

        const formattedPrices: Price[] = data.map((response, index) => {
          const exchange = exchanges[index];
          const askPricePath = exchange.askPricePath;
          const bidPricePath = exchange.bidPricePath;
          const askPrice = eval(`response.${askPricePath}`);
          const bidPrice = eval(`response.${bidPricePath}`);
          return {
            exchange: exchange.exchangeName,
            askPrice: String(askPrice),
            bidPrice: String(bidPrice),
            currency: exchange.currency,
          };
        });

        setPrices(formattedPrices);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const groupByCurrency = () => {
    if (!prices) return {};

    const groupedPrices: { [currency: string]: Price[] } = {};
    prices.forEach((price) => {
      const { currency } = price;
      if (!groupedPrices[currency]) {
        groupedPrices[currency] = [];
      }
      groupedPrices[currency].push(price);
    });

    return groupedPrices;
  };

  const renderPricesByCurrency = () => {
    const groupedPrices = groupByCurrency();

    return Object.entries(groupedPrices).map(([currency, prices]) => (
      <div key={currency}>
        <h2>{currency} primary currency</h2>
        <ul>
          {prices.map((price) => (
            <li key={price.exchange}>
              <strong>{price.exchange}:</strong> Ask: ${price.askPrice}, Bid: $
              {price.bidPrice}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div>
      {prices ? <div>{renderPricesByCurrency()}</div> : <p>Loading...</p>}
    </div>
  );
}
