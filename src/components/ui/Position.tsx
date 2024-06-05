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
  const { onSubmit, maxQty } = useOrderEntry(
    {
      symbol: "PERP_ETH_USDC",
      side: OrderSide.SELL,
      order_type: OrderType.MARKET,
      reduce_only: true,
    },
    { watchOrderbook: true }
  );
  const closePosition = async () => {
    if (!processing) {
      setIsProcessing(true);
      try {
        await onSubmit({
          order_type: OrderType.MARKET,
          symbol: "PERP_ETH_USDC",
          reduce_only: true,
          side: OrderSide.SELL,
          order_quantity: maxQty,
        });
        refresh();
        setIsProcessing(false);
      } catch (error) {
        setIsProcessing(false);
      }
    }
  };
  return (
    <TableRow key={index} className="border-none">
      <TableCell className=" border-l-2 bg-gradient-to-r border-[#C7F052] from-[#1E2311] from-10% via-[#2A3311] via-20% to-[#171717] to-50% text-start pl-7">
        {position.symbol}
      </TableCell>
      <TableCell className="">{position?.position_qty}</TableCell>
      <TableCell className="">$ {position?.mark_price}</TableCell>

      <TableCell
        className={
          position?.unrealized_pnl >= 0 ? `text-green-500` : `text-red-500`
        }
      >
        {position?.unrealized_pnl?.toFixed(3)}
      </TableCell>
      <TableCell
        onClick={async () => await closePosition()}
        style={{ cursor: "pointer" }}
      >
        Close
      </TableCell>
    </TableRow>
  );
};
const Position: React.FC<PositionProps> = ({ symbol }) => {
  const [positions, _, { refresh }] = usePositionStream(symbol);

  return (
    <div className="relative w-full overflow-auto">
      <Table className="border-none">
        <TableHeader className="text-[#4B4B4B]">
          <TableRow className="border-none">
            <TableHead className="">Symbol</TableHead>
            <TableHead className="">Notional Size</TableHead>
            <TableHead className="">Average Price</TableHead>
            <TableHead className="">Unrealized P&L </TableHead>
            <TableHead>Action(Close Position)</TableHead>
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
