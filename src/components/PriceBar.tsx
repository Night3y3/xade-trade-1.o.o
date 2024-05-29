import React from 'react';
import { Button } from './ui/button';

import { Separator } from './ui/separator';
import SelectingMarket from './SelectingMarket';

interface PriceBarProps {
    // Define prop types here
}

const PriceBar: React.FC<PriceBarProps> = () => {
    // Component logic using props
    return (
        <div className=' text-white flex justify-between items-center border-b border-[#4B4B4B]'>
            <div className=' flex gap-4  h-[7vh] py-3 items-center'>
                <SelectingMarket />

                <Separator className="h-full w-[1px] bg-[#4B4B4B] dark:bg-gray-700" />
                <h1 className='text-green-500 text-xl font-bold'>3,751.6</h1>
                <Separator className="h-full w-[1px] bg-[#4B4B4B] dark:bg-gray-700" />
                <div className=' flex flex-col items-start'>
                    <h1 className=' text-[#4B4B4B] font-normal text-sm'>Index Price</h1>
                    <h1 className=''>3,751.6</h1>
                </div>
                <Separator className="h-full w-[1px] bg-[#4B4B4B] dark:bg-gray-700" />
                <div className=' flex flex-col items-start'>
                    <h1 className=' text-[#4B4B4B] font-normal text-sm'>Oracle Price</h1>
                    <h1 className=''>3,751.5</h1>
                </div>
                <Separator className="h-full w-[1px] bg-[#4B4B4B] dark:bg-gray-700" />
                <div className=' flex flex-col items-start'>
                    <h1 className=' text-[#4B4B4B] font-normal text-sm'>24h Change</h1>
                    <h1 className='text-green-500'>0.09 (0.02%)</h1>
                </div>
                <Separator className="h-full w-[1px] bg-[#4B4B4B] dark:bg-gray-700" />
                <div className=' flex flex-col items-start'>
                    <h1 className=' text-[#4B4B4B] font-normal text-sm'>24H Volume</h1>
                    <h1 className=''>150,951.669</h1>
                </div>

                {/* </div> */}
            </div>
            <Button variant="ghost" color=''>Customize</Button>
        </div>
    );
};

export default PriceBar;