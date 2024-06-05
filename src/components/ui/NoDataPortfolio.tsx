import React from 'react';
import { StackIcon } from "@radix-ui/react-icons";

interface NoDataPortfolioProps {
    // Define prop types here
}

const NoDataPortfolio: React.FC<NoDataPortfolioProps> = () => {
    // Component logic using props
    return (
        <div className=" flex flex-col items-center py-24 bg-[#171717]">
            <StackIcon className="text-[#4B4B4B] size-10" />
            <h1 className=" text-[#4B4B4B]">
                You don’t have any open positions
            </h1>
        </div>
    );
};

export default NoDataPortfolio;