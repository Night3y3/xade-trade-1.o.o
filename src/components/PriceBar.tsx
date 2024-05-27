import React from 'react';
import { Button } from './ui/button';
import ethlogo from '../assets/eth-logo.svg';
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Separator } from './ui/separator';

interface PriceBarProps {
    // Define prop types here
}

const PriceBar: React.FC<PriceBarProps> = () => {
    // Component logic using props
    return (
        <div className=' text-white flex justify-between items-center border-b border-[#4B4B4B]'>
            <div className=' flex gap-4'>
                <div className='flex gap-4 items-center hover:bg-gray-700 p-5'>
                    <img src={ethlogo} alt="" />
                    <h1 className=' font-medium text-xl'>ETH/USDC</h1>
                    <ChevronDownIcon className='w-5 h-5' />
                </div>
                <Separator orientation="vertical" />
            </div>
            <Button variant="ghost" color=''>Customize</Button>
        </div>
    );
};

export default PriceBar;