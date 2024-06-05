import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface PositionProps {
    // Define prop types here
}

interface PositionData {
    market: string;
    qty: number;
    value: string;
    entryPrice: string;
    unrealizedPL: string;
    plColor: string; // This will be used to dynamically set the color of the P&L cell
}

const positions: PositionData[] = [
    { market: "BTC", qty: 1.25, value: "$35,000", entryPrice: "$30,000", unrealizedPL: "+16.67%", plColor: "text-green-500" },
    { market: "ETH", qty: 3.50, value: "$12,250", entryPrice: "$10,000", unrealizedPL: "+22.50%", plColor: "text-green-500" },
    { market: "AAPL", qty: 25, value: "$4,500", entryPrice: "$150", unrealizedPL: "-10.00%", plColor: "text-red-500" },
    { market: "TSLA", qty: 10, value: "$2,800", entryPrice: "$250", unrealizedPL: "+12.00%", plColor: "text-green-500" },
    { market: "MSFT", qty: 15, value: "$4,200", entryPrice: "$250", unrealizedPL: "+6.67%", plColor: "text-green-500" }
];

const Position: React.FC<PositionProps> = () => {
    return (
        <div className="relative w-full overflow-auto">
            <Table className='border-none'>
                <TableHeader className='text-[#4B4B4B]'>
                    <TableRow className='border-none'>
                        <TableHead className="">Quantity</TableHead>
                        <TableHead className="">Notional Size</TableHead>
                        <TableHead className="">Average Price</TableHead>
                        <TableHead className="">Unrealized P&L </TableHead>
                        <TableHead>Action(Close Position)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='text-[#D4D4D4] border-none border-[#171717]'>
                    {positions.map((position, index) => (
                        <TableRow key={index} className='border-none'>
                            <TableCell className=' border-l-2 bg-gradient-to-r border-[#C7F052] from-[#1E2311] from-10% via-[#2A3311] via-20% to-[#171717] to-50% text-start pl-7'>{position.market}</TableCell>
                            <TableCell className="">{position.qty}</TableCell>
                            <TableCell className="">{position.value}</TableCell>

                            <TableCell className={` ${position.plColor}`}>{position.unrealizedPL}</TableCell>
                            <TableCell className="">Close</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Position;
