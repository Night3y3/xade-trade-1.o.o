import styled from "styled-components";
import { TradingView } from "@orderly.network/trading-view";
import Portfolio from "./portfolio";
// import { TVChartContainer } from "../TVChartContainer";

const Container = styled.div`
  height: 130vh;
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  margin-right: 0;
  @media (max-width: 768px) {
    width: 100%;
    height: 80vh;
  }
`;

const TradingViewChart = ({ symbol }: { symbol: string }) => {
  return (
    <Container>
      <div style={{ width: "100%", height: "90%" }}>
        <TradingView
          symbol={symbol}
          libraryPath="charting_library/bundles"
          tradingViewScriptSrc="charting_library/charting_library.js"
          overrides={{
            "mainSeriesProperties.candleStyle.borderDownColor": "#DC2140",
            "mainSeriesProperties.candleStyle.borderUpColor": "#1F8040",
            "mainSeriesProperties.candleStyle.downColor": "#DC2140",
            "mainSeriesProperties.candleStyle.upColor": "#1F8040",
            "mainSeriesProperties.candleStyle.wickDownColor": "#DC2140",
            "mainSeriesProperties.candleStyle.wickUpColor": "#1F8040",
            "paneProperties.background": "#000000",
            "paneProperties.backgroundType": "solid",
            "paneProperties.separatorColor": "#1d1d1d",
            "paneProperties.horzGridProperties.color": "#1d1d1d",
            "paneProperties.vertGridProperties.color": "#1d1d1d",
            "paneProperties.vertGridProperties.style": "1",
            "paneProperties.horzGridProperties.style": "1",
            "toolbarProperties.background": "#000000",
            "timeScale.backgroundColor": "#000",
            "timeScale.borderColor": "#333333",
            "paneProperties.legendProperties.showSeriesTitle": "true",
            "paneProperties.legendProperties.showLegend": "true",
            "scalesProperties.lineColor": "#333333",
            "scalesProperties.textColor": "#B2B5BE",
            "scalesProperties.backgroundColor": "#1B1B1B",
            "paneProperties.legendProperties.showSeriesOHLC": "true",
            "paneProperties.legendProperties.showVolume": "true",
            "paneProperties.legendProperties.showBackground": "true",
            "paneProperties.legendProperties.backgroundTransparency": "90",
            "crossHairProperties.color": "#626c72",
            "crossHairProperties.style": "1",
            "crossHairProperties.width": "1",
            "mainSeriesProperties.priceLineColor": "#FFFFFF",
            "mainSeriesProperties.priceLineWidth": "1",
            "mainSeriesProperties.showPriceLine": "true",
            "timeScale.rightOffset": "10",
            "timeScale.barSpacing": "8",
            "timeScale.lockVisibleTimeRangeOnResize": "true",
            "timeScale.visible": "true",
            "timeScale.timeVisible": "true",
            "timeScale.secondsVisible": "false",
            volumePaneSize: "medium",
          }}
        />
      </div>
      <Portfolio symbol={symbol} />
    </Container>
  );
};

export default TradingViewChart;
