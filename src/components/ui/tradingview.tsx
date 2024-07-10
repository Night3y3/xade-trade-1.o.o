import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TradingView } from '@orderly.network/trading-view';
import './themed.css'; // Import the theme CSS
import './customTradingViewStyles.css'; // Import the custom CSS file
import { FaExpand, FaCog, FaChartBar, FaChartLine, FaFx } from 'react-icons/fa';
import Portfolio from './portfolio'; // Import the Portfolio component

// Extend the Window interface to include tvWidget
declare global {
  interface Window {
    tvWidget: any;
  }
}

// Styled component for the container
const Container = styled.div`
  height: 130vh;
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  margin-right: 0;
  border-top: none;
  border-right: none;

  // Responsive design for smaller screens
  @media (max-width: 768px) {
    width: 100%;
    height: 80vh;
  }

  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #000;
  color: white;
`;

const Button = styled.button<{ selected: boolean }>`
  background: none;
  border: none;
  color: ${({ selected }) => (selected ? 'white' : 'grey')};
  cursor: pointer;
  margin: 0 10px; // Increased margin to 10px
`;

const TradingViewChart = ({ symbol }: { symbol: string }) => {
  const [timeframe, setTimeframe] = useState('D');
  const [fullscreen, setFullscreen] = useState(false);
  const [chartType, setChartType] = useState('1'); // Default to candle chart
  const [settingsOpen, setSettingsOpen] = useState(true); // State for settings
  const [indicatorsOpen, setIndicatorsOpen] = useState(true); // State for indicators
  const [lineType, setLineType] = useState('1'); // State for line type

  useEffect(() => {
    // Add the theme-dark class to the root element to apply the dark theme variables
    document.documentElement.classList.add('theme-dark');
    document.documentElement.classList.add('tv-custom-theme');
    return () => {
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.remove('tv-custom-theme');
    };
  }, []);

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const toggleIndicators = () => {
    setIndicatorsOpen(!indicatorsOpen);
  };

  const toggleLineType = () => {
    setLineType(lineType === '1' ? '2' : '1'); // Toggle between two line types
  };

  return (
    <Container className={`custom-tradingview-container ${fullscreen ? 'fullscreen' : ''}`}>
      <TopBar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button selected={timeframe === '1'} onClick={() => setTimeframe('1')}>1M</Button>
          <Button selected={timeframe === '5'} onClick={() => setTimeframe('5')}>5M</Button>
          <Button selected={timeframe === '15'} onClick={() => setTimeframe('15')}>15M</Button>
          <Button selected={timeframe === '30'} onClick={() => setTimeframe('30')}>30M</Button>
          <Button selected={timeframe === '60'} onClick={() => setTimeframe('60')}>1H</Button>
          <Button selected={timeframe === 'D'} onClick={() => setTimeframe('D')}>1D</Button>
          <Button selected={timeframe === 'W'} onClick={() => setTimeframe('W')}>1W</Button>
          <Button selected={timeframe === 'M'} onClick={() => setTimeframe('M')}>30D</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button selected={false} onClick={toggleSettings}>
            <FaCog />
          </Button>
          <Button selected={false} onClick={toggleIndicators}>
            <FaFx />
          </Button>
          <Button selected={false} onClick={toggleLineType}>
            <FaChartLine />
          </Button>
          <Button selected={false} onClick={toggleFullscreen}>
            <FaExpand />
          </Button>
        </div>
      </TopBar>
      <div className="custom-tradingview-toolbar" style={{ width: '100%', height: fullscreen ? '100%' : '90%' }}>
        <TradingView
          symbol={symbol}
          interval={timeframe}
          theme="Dark"
          mode={2}
          topToolbarOpenSetting={settingsOpen} // Use state for settings
          topToolbarOpenIndicators={indicatorsOpen} // Use state for indicators
          topToolbarLineType={lineType} // Use state for line type
          libraryPath="charting_library/bundles"
          tradingViewCustomCssUrl='/styles/chart.css'
          tradingViewScriptSrc="charting_library/charting_library.js"
          overrides={{
            "mainSeriesProperties.candleStyle.borderDownColor": "#F35540",
            "mainSeriesProperties.candleStyle.borderUpColor": "#40F388",
            "mainSeriesProperties.candleStyle.downColor": "#F35540",
            "mainSeriesProperties.candleStyle.upColor": "#40F388",
            "mainSeriesProperties.candleStyle.wickDownColor": "#F36B40",
            "mainSeriesProperties.candleStyle.wickUpColor": "#40F388",
            "paneProperties.background": "#000000",
            "paneProperties.backgroundType": "solid",
            "paneProperties.separatorColor": "#1d1d1d",
            "paneProperties.horzGridProperties.color": "#1d1d1d",
            "paneProperties.vertGridProperties.color": "#1d1d1d",
            "paneProperties.vertGridProperties.style": '1',
            "paneProperties.horzGridProperties.style": '1',
            "toolbarProperties.background": "#000000",
            "timeScale.backgroundColor": "#000",
            "timeScale.borderColor": "#333333",
            "paneProperties.legendProperties.showSeriesTitle": 'true',
            "paneProperties.legendProperties.showLegend": 'true',
            "scalesProperties.lineColor": "#333333",
            "scalesProperties.textColor": "#B2B5BE",
            "scalesProperties.backgroundColor": "#1B1B1B",
            "crossHairProperties.color": "#626c72",
            "crossHairProperties.style": '1',
            "crossHairProperties.width": '1',
            "mainSeriesProperties.priceLineColor": "#FFFFFF",
            "mainSeriesProperties.priceLineWidth": '1',
            "mainSeriesProperties.showPriceLine": 'true',
            "timeScale.lockVisibleTimeRangeOnResize": 'true',
            "timeScale.visible": 'true',
            "timeScale.timeVisible": 'true',
            "timeScale.secondsVisible": 'false',
            "volumePaneSize": "medium",
          }}
          studiesOverrides={{
            "volume.volume.color.0": "#40F388",
            "volume.volume.color.1": "#F36B40",
            "volume.volume.transparency": '70',
            "volume.volume ma.color": "#FF0000",
            "volume.volume ma.transparency": '30',
            "volume.volume ma.linewidth": '5',
            "volume.show ma": 'true',
            "volume.volume ma.length": '20',
          }}
        />
      </div>
      {!fullscreen && <Portfolio symbol={symbol} />}
    </Container>
  );
};

export default TradingViewChart;