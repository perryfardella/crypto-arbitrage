"use client";
import { useEffect, useState } from "react";
import { exchanges } from "./apiConfig";

interface Price {
  exchange: string;
  price: string;
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
          const pricePath = exchange.pricePath;
          const price = eval(`response.${pricePath}`);
          return {
            exchange: exchange.exchangeName,
            price: String(price),
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
        <h2>Bitcoin/{currency} Prices</h2>
        <ul>
          {prices.map((price) => (
            <li key={price.exchange}>
              {price.exchange}: ${price.price}
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
