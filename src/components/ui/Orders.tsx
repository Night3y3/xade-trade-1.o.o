/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { useOrderStream } from "@orderly.network/hooks";
import { OrderSide, OrderStatus, OrderType } from "@orderly.network/types";
import NoDataPortfolio from "./NoDataPortfolio";

interface OrdersProps {
  // Define prop types here
  symbol: string;
}

type Order = {
  price: number;
  quantity: number;
  created_time: number;
  order_id: number;
  side: OrderSide;
  type: OrderType;
  status: OrderStatus;
  executed: number;
};

const OrderCard = ({ index, order }: { index: number; order: any }) => {
  return (
    <TableRow key={index} className="border-none font-primaryRegular">
      <TableCell
        className={` border-l-2 bg-gradient-to-r ${
          order.side === OrderSide.BUY
            ? "border-[#C7F052] from-[#1E2311] from-10% via-[#2A3311]"
            : "border-[#F35540] from-[#1E2311] from-10% via-[#861000]"
        }  via-20% to-black to-50% text-start pl-7`}
      >
        <div>{order?.symbol.split("_")[1]}</div>
        <div
          className={` ${
            order.side === OrderSide.BUY ? "text-[#C7F052] " : "text-red-500 "
          }`}
        >
          {order.side}
        </div>
      </TableCell>
      <TableCell className=" text-start">{order.price}</TableCell>
      <TableCell className="text-start">{order.quantity}</TableCell>
      <TableCell className="text-start">{order.type}</TableCell>

      <TableCell
        className={
          OrderStatus.FILLED === order.status
            ? `#C7F052 text-start`
            : `red-500 text-start`
        }
      >
        {order.status}
      </TableCell>
    </TableRow>
  );
};
const Orders: React.FC<OrdersProps> = ({ symbol }) => {
  const [o] = useOrderStream({ symbol: symbol });
  const orders = o as Order[] | null;

  if (!orders) {
    return <NoDataPortfolio message="orders" />;
  }

  return (
    <div
      style={{ width: "100%", overflow: "scroll", maxHeight: "50%" }}
      className=" scrollbar-hide"
    >
      <Table>
        <TableHeader className="text-[#4B4B4B]">
          <TableRow className="border-none font-primaryRegular">
            <TableHead className="">Market</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className="">Quantity</TableHead>
            <TableHead className="">Type</TableHead>

            <TableHead className="">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#D4D4D4] border-none border-[#171717] scrollbar-hide">
          {orders?.map((order, index) => (
            <OrderCard index={index} order={order} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Orders;
