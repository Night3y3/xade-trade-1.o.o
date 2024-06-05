import React from 'react';
import { Separator } from './ui/separator';
import SelectingMarket from './SelectingMarket';
import { useAppSelector } from '@/redux/hooks';
import '../App.css';

interface PriceBarProps {
    // Define prop types here
}

const PriceBar: React.FC<PriceBarProps> = () => {
    const market = useAppSelector((state) => state.market);
    return (
        <div className='price-bar'>
            <div className='price-bar-content'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <SelectingMarket />
                    <h1 className='text-green-500 text-xl font-bold price'>${market.index_price}</h1>
                </div>
                <Separator className="h-full w-[1px] bg-[#4B4B4B] dark:bg-gray-700" />
                <div className='price-bar-item'>
                    <h1 className='text-[#4B4B4B] font-normal text-sm'>Index Price</h1>
                    <h1 className='text-[#fff] price'>${market.index_price}</h1>
                </div>

                <Separator className="h-full w-[1px] bg-[#4B4B4B] dark:bg-gray-700" />
                <div className='price-bar-item'>
                    <h1 className='text-[#4B4B4B] font-normal text-sm'>24h Change</h1>
                    <h1 className={`${market.change_24h_percent > 0 ? 'text-[#40F388]' : 'text-[#F46140]'} price`}>{market.change_24h_percent}%</h1>
                </div>
                <Separator className="h-full w-[1px] bg-[#4B4B4B] dark:bg-gray-700" />
                <div className='price-bar-item'>
                    <h1 className='text-[#4B4B4B] font-normal text-sm'>24H Volume</h1>
                    <h1 className='price text-[#fff]'>{market.volume_24h}</h1>
                </div>
                <Separator className="h-full w-[1px] bg-[#4B4B4B] dark:bg-gray-700" />
                <div className='price-bar-item'>
                    <h1 className='text-[#4B4B4B] font-normal text-sm'>Open Interest</h1>
                    <h1 className='price text-[#fff]'>{market.open_interest}</h1>
                </div>
                <Separator className="h-full w-[1px] bg-[#4B4B4B] dark:bg-gray-700" />
                <div className='price-bar-item'>
                    <h1 className='text-[#4B4B4B] font-normal text-sm'>8h Funding Rate</h1>
                    <h1 className='price text-[#fff]'>{market.volume_24h}%</h1>
                </div>
            </div>
        </div>
    );
};

export default PriceBar;