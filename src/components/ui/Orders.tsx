import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface OrdersProps {
    // Define prop types here
}

interface OrderData {
    market: string;
    price: string;
    quantity: number;
    type: string;
    side: string;
    status: string;
    statusColor: string; // This will be used to dynamically set the color of the status text
}

const orders: OrderData[] = [
    { market: "BTC", price: "$35,000", quantity: 1.25, type: "Limit", side: "Buy", status: "Filled", statusColor: "#C7F052" },
    { market: "ETH", price: "$12,250", quantity: 3.50, type: "Market", side: "Buy", status: "Filled", statusColor: "#C7F052" },
    { market: "MSFT", price: "$4,500", quantity: 25, type: "Limit", side: "Buy", status: "Canceled", statusColor: "red-500" },
    { market: "TSLA", price: "$2,800", quantity: 10, type: "Market", side: "Sell", status: "Filled", statusColor: "#C7F052" },
    { market: "AAPL", price: "$4,200", quantity: 15, type: "Limit", side: "Buy", status: "Filled", statusColor: "#C7F052" }
];

const Orders: React.FC<OrdersProps> = () => {
    return (
        <div className="relative w-full overflow-auto">
            <Table>
                <TableHeader className='text-[#4B4B4B]'>
                    <TableRow className='border-none'>
                        <TableHead className="">Market</TableHead>
                        <TableHead className=" text-center">Price</TableHead>
                        <TableHead className=" text-center">Quantity</TableHead>
                        <TableHead className=" text-center">Type</TableHead>

                        <TableHead className=" text-center">Status</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody className='text-[#D4D4D4] border-none border-[#171717]'>
                    {orders.map((order, index) => (
                        <TableRow key={index} className='border-none'>
                            <TableCell className={` border-l-2 bg-gradient-to-r ${order.side === "Buy" ? "border-[#C7F052] from-[#1E2311] from-10% via-[#2A3311]" : "border-[#F35540] from-[#1E2311] from-10% via-[#861000]"}  via-20% to-[#171717] to-50% text-start pl-7`}><div>
                                {order.market}
                            </div><div className={` ${order.side === "Buy" ? "text-[#C7F052] " : "text-red-500 "}`}>{order.side}</div></TableCell>
                            <TableCell className="">{order.price}</TableCell>
                            <TableCell className="">{order.quantity}</TableCell>
                            <TableCell>{order.type}</TableCell>

                            <TableCell className={` ${order.statusColor}`}>{order.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Orders;
