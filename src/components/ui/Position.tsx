import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useOrderEntry, usePositionStream } from "@orderly.network/hooks";
import { API, OrderSide, OrderType } from "@orderly.network/types";
import { KeyedMutator } from "swr";
import { useAppSelector } from "@/redux/hooks";
import NoDataPortfolio from "./NoDataPortfolio";

interface PositionProps {
  symbol: string;
  // Define prop types here
}

const PositionExt = ({
  index,
  position,
  refresh,
}: {
  index: number;
  position: API.PositionTPSLExt;
  refresh: KeyedMutator<API.PositionInfo>;
}) => {
  const [processing, setIsProcessing] = useState(false);
  const marketSymbol = useAppSelector((x) => x.market.symbol);
  console.log(position);
  const { onSubmit, maxQty } = useOrderEntry(
    {
      symbol: marketSymbol,
      side: position.position_qty > 0 ? OrderSide.SELL : OrderSide.BUY,
      order_type: OrderType.MARKET,
      reduce_only: true,
    },
    { watchOrderbook: true }
  );
  const closePosition = async () => {
    // if (!processing) {
    // setIsProcessing(true);

    try {
      console.log("here.........", marketSymbol, maxQty);
      await onSubmit({
        order_type: OrderType.MARKET,
        symbol: marketSymbol,
        reduce_only: true,
        side: position.position_qty > 0 ? OrderSide.SELL : OrderSide.BUY,
        order_quantity: maxQty,
      });
      refresh();
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
    }
    // }
  };
  const orderValue = position.mark_price * position.position_qty;
  return (
    <TableRow key={index} className="border-none">
      <TableCell
        className={`border-l-2 text-start pl-7 ${
          position.position_qty > 0
            ? "border-[#C7F052] from-[#1E2311] from-20% via-[#2A3311]"
            : "border-[#F35540] from-[#49150D] from-20%"
        } bg-gradient-to-r  to-50% text-left`}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {position.symbol.split("_")[1]}
        <span
          style={{
            color: position.position_qty < 0 ? "#F35540" : "green",
          }}
        >
          {position.position_qty < 0 ? "SELL" : "BUY"}
        </span>
      </TableCell>
      <TableCell className="text-left">
        {Math.abs(position?.position_qty)}
      </TableCell>
      <TableCell className="text-left">{orderValue}</TableCell>

      <TableCell
        className={`text-left ${
          position?.unrealized_pnl >= 0 ? `text-green-500` : `text-red-500`
        }`}
      >
        ${position?.unrealized_pnl?.toFixed(3)}
      </TableCell>
      <TableCell
        onClick={async () => await closePosition()}
        style={{ cursor: "pointer" }}
        className="text-left"
      >
        Close
      </TableCell>
    </TableRow>
  );
};
const Position: React.FC<PositionProps> = ({ symbol }) => {
  const [positions, _, { refresh }] = usePositionStream(symbol);

  // console.log("positions", positions);

  if (positions === undefined || positions?.rows === null) {
    return <NoDataPortfolio message="position" />;
  }

  return (
    <div className="relative w-full overflow-auto">
      <Table className="border-none">
        <TableHeader className="text-[#4B4B4B]">
          <TableRow className="border-none font-primaryRegular">
            <TableHead className="text-left">Symbol</TableHead>
            <TableHead className="text-left">Notional Size</TableHead>
            <TableHead className="text-left">Order Value</TableHead>
            <TableHead className="text-left">Unrealized P&L</TableHead>
            <TableHead className="text-left">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#D4D4D4] border-none border-[#171717]">
          {positions?.rows?.map((position, index) => (
            <PositionExt
              refresh={() => refresh()}
              position={position}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Position;
