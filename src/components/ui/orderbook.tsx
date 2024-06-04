import { API } from "@orderly.network/types";
import React from "react";
import ".././../App.css";

interface MarketSectionProps {
  symbolConfig: API.SymbolExt;
}

const OrderBook: React.FC<MarketSectionProps> = ({ symbolConfig }) => {
  console.log("Symbol......", symbolConfig?.quote, symbolConfig?.base);
  return <div></div>;
};

export default OrderBook;
