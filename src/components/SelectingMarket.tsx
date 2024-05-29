import React from 'react';
import ethlogo from '../assets/eth-logo.svg';
import useSWR from 'swr'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { parseString } from '@/utils/helper';


interface SelectingMarketProps {
    // Define prop types here
}

const fetcher = (...arg) => {
    return fetch(...arg).then(res => res.json())
}

const SelectingMarket: React.FC<SelectingMarketProps> = () => {

    const { data, error } = useSWR('https://testnet-api-evm.orderly.network/v1/public/futures', fetcher, { refreshInterval: 1000 })

    console.log({ data, error })

    return (
        <div className='flex gap-4 items-center pl-5'>
            <Select>
                <SelectTrigger className=' border-none focus:border-none selection:border-none default:border-none flex gap-2'>

                    <SelectValue placeholder={"Select a Market"} className=' font-medium text-xl' />
                </SelectTrigger>
                <SelectContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Symbol</TableHead>
                                <TableHead>Last Price</TableHead>
                                <TableHead>24hr Change</TableHead>
                                <TableHead>8hr Funding</TableHead>
                                <TableHead>Volume</TableHead>
                                <TableHead >Open Interest</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.data.rows.map((item) => (

                                <TableRow key={item.symbol}>
                                    <SelectItem value={item.symbol}>

                                        <TableCell className='flex items-center gap-4 font-medium text-xl'>
                                            <img src={`https://oss.orderly.network/static/symbol_logo/${parseString(item.symbol)}.png`} alt="" className=' w-[1vw]' />
                                            {parseString(item.symbol)}

                                        </TableCell>
                                    </SelectItem>
                                    <TableCell>{item.index_price}</TableCell>
                                    <TableCell>{item.priceChange * 100}%</TableCell>
                                    <TableCell>{item.est_funding_rate}</TableCell>
                                    <TableCell>{item.mark_price}</TableCell>
                                    <TableCell>{item.open_interest}</TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>


                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectingMarket;