import React from 'react';

interface OverviewProps {
  symbol: string;
}

const Overview: React.FC<OverviewProps> = ({ symbol }) => {
  return (
    <div>
      {/* Your component logic using the symbol prop */}
      {symbol}
    </div>
  );
};

export default Overview;