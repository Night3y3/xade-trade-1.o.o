import React from 'react';
import { StackIcon } from "@radix-ui/react-icons";

interface NoDataPortfolioProps {
    // Define prop types here
    message?: string;
}

const NoDataPortfolio: React.FC<NoDataPortfolioProps> = ({ message = "history" }) => {
    // Component logic using props
    return (
        <div className=" flex flex-col items-center py-8 bg-black">
            <StackIcon className="text-[#4B4B4B] size-10" />
            <h1 className=" text-[#4B4B4B]">
                You don’t have any open {message}
            </h1>
        </div>
    );
};

export default NoDataPortfolio;