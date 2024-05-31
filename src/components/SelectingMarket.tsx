import React, { useEffect, useState } from 'react';
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
import { change24hour, change24hourPercent, parseString } from '@/utils/helper';
import { useAppDispatch } from '@/redux/hooks';
import { setMarket, setVolume24h, setIndexPrice, setChange24hPercent } from '@/redux/slices/marketSlice';
import { Row, Data } from '@/types';


interface SelectingMarketProps {
    // Define prop types here
}

const fetcher = (...arg) => {
    return fetch(...arg).then(res => res.json())
}

const SelectingMarket: React.FC<SelectingMarketProps> = () => {

    const { data, error } = useSWR('https://api-evm.orderly.network/v1/public/futures', fetcher, { refreshInterval: 1000 })
    const [market, setMarket] = useState<string | null>("Select a Market")
    const dispatch = useAppDispatch();

    function handleSelect(symbol: string) {
        setMarket(symbol);
    }

    useEffect(() => {
        // Set up an interval that updates the count every second
        const interval = setInterval(() => {
            const selectedMarket = data.data.rows.find((row: Row) => parseString(row.symbol) === market);
            if (selectedMarket) {
                dispatch(setIndexPrice(selectedMarket.index_price));
                dispatch(setChange24hPercent(change24hourPercent(selectedMarket['24h_open'], selectedMarket['24h_close'])));
                dispatch(setVolume24h(selectedMarket['24h_volume']));
            }
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [data]);

    return (
        <div className='flex gap-4 items-center pl-5'>
            <Select onValueChange={handleSelect}>
                <SelectTrigger className=' border-none focus:border-none selection:border-none default:border-none flex gap-2'>

                    <SelectValue placeholder={market} className=' font-medium text-xl' onChange={() => console.log("changed")} />
                </SelectTrigger>
                <SelectContent>
                    <Table>
                        <TableHeader>
                            <TableRow className=' border-none'>
                                <TableHead>Symbol</TableHead>
                                <TableHead>Last Price</TableHead>
                                <TableHead>24hr Change</TableHead>
                                <TableHead>24hr Change(%)</TableHead>
                                <TableHead>8hr Funding(%)</TableHead>
                                <TableHead>Volume</TableHead>
                                <TableHead >Open Interest</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.data.rows.map((item: Row) => (

                                <TableRow key={item.symbol} className=' border-none'>
                                    <SelectItem value={parseString(item.symbol)} >

                                        <TableCell className='flex items-center gap-4 font-medium text-xl'>
                                            <img src={`https://oss.orderly.network/static/symbol_logo/${parseString(item.symbol)}.png`} alt="" className=' w-[1vw]' />
                                            {parseString(item.symbol)}
                                        </TableCell>
                                    </SelectItem>
                                    <TableCell>${item.mark_price}</TableCell>
                                    <TableCell className={`${change24hour(item['24h_open'], item['24h_close']) > 0 ? 'text-[#40F388]' : 'text-[#F46140]'}`}>${change24hour(item['24h_open'], item['24h_close'])}</TableCell>
                                    <TableCell className={`${change24hourPercent(item['24h_open'], item['24h_close']) > 0 ? 'text-[#40F388]' : 'text-[#F46140]'}`}>{change24hourPercent(item['24h_open'], item['24h_close'])}%</TableCell>
                                    <TableCell>{item.est_funding_rate}</TableCell>
                                    <TableCell>${item['24h_volume']}</TableCell>
                                    <TableCell>${item.open_interest}</TableCell>
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