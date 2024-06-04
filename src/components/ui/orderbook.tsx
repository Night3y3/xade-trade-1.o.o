import { API } from "@orderly.network/types";
import React from "react";
import { useOrderbookStream } from "@orderly.network/hooks";
import { OrderBook as OrderBookComponent } from "@orderly.network/react";
import ".././../App.css";

interface OrderBookProps {
  symbolConfig: API.SymbolExt;
  symbol: string;
}

const OrderBook: React.FC<OrderBookProps> = ({ symbol, symbolConfig }) => {
  console.log("Symbol......", symbolConfig, symbol);
  const [data, { onDepthChange, isLoading, onItemClick, depth, allDepths }] =
    useOrderbookStream(symbol, undefined, {
      level: 7,
    });
  // const config = useSymbolsInfo();
  // const symbolInfo = config ? config[symbol] : {};
  return (
    <div className="bg-neutral-900 px-5 py-3 w-[300px] rounded-lg h-[480px]">
      <OrderBookComponent
        level={7}
        asks={data.asks ?? []}
        bids={data.bids ?? []}
        markPrice={data.markPrice ?? 0}
        lastPrice={data.middlePrice!}
        depth={allDepths}
        activeDepth={depth?.toString()}
        base={symbolConfig?.base}
        quote={symbolConfig?.quote}
        isLoading={isLoading}
        onItemClick={onItemClick}
        onDepthChange={onDepthChange}
        cellHeight={22}
      />
    </div>
  );
};

export default OrderBook;

// export const MyOrderBook = () => {};
