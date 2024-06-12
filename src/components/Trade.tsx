import React from 'react';
import PriceBar from './PriceBar';
import MarketSection from './MarketSection';

interface TradeProps {
    // Define prop types here
}

const Trade: React.FC<TradeProps> = () => {
    // Component logic using props
    return (
        <>
            <PriceBar />
            <MarketSection />
        </>
    );
};

export default Trade;