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

const OrderCard = ({ index, order }: { index: number; order: Order }) => {
  return (
    <TableRow key={index} className="border-none">
      <TableCell
        className={` border-l-2 bg-gradient-to-r ${
          order.side === OrderSide.BUY
            ? "border-[#C7F052] from-[#1E2311] from-10% via-[#2A3311]"
            : "border-[#F35540] from-[#1E2311] from-10% via-[#861000]"
        }  via-20% to-[#171717] to-50% text-start pl-7`}
      >
        <div>{order.type}</div>
        <div
          className={` ${
            order.side === OrderSide.BUY ? "text-[#C7F052] " : "text-red-500 "
          }`}
        >
          {order.side}
        </div>
      </TableCell>
      <TableCell className="">{order.price}</TableCell>
      <TableCell className="">{order.quantity}</TableCell>
      <TableCell>{order.type}</TableCell>

      <TableCell
        className={OrderStatus.FILLED === order.status ? `#C7F052` : `red-500`}
      >
        {order.status}
      </TableCell>
    </TableRow>
  );
};
const Orders: React.FC<OrdersProps> = ({ symbol }) => {
  const [o, { cancelOrder }] = useOrderStream({ symbol: symbol });
  const orders = o as Order[] | null;
  return (
    <div style={{ width: "100%", overflow: "scroll", maxHeight: "50%" }}>
      <Table>
        <TableHeader className="text-[#4B4B4B]">
          <TableRow className="border-none">
            <TableHead className="">Market</TableHead>
            <TableHead className=" text-center">Price</TableHead>
            <TableHead className=" text-center">Quantity</TableHead>
            <TableHead className=" text-center">Type</TableHead>

            <TableHead className=" text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-[#D4D4D4] border-none border-[#171717]">
          {orders?.map((order, index) => (
            <OrderCard index={index} order={order} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Orders;
