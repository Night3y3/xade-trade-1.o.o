import React from 'react';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { TVChartContainer } from './TVChartContainer';

interface AdvanceChartsProps {
    // Define prop types here
}

const AdvanceCharts: React.FC<AdvanceChartsProps> = () => {
    // Component logic using props
    return (
        <div className=' w-1/2 h-[30vw]'>
            <h1>hello</h1>
            <TVChartContainer />
        </div>

    );
};

export default AdvanceCharts;