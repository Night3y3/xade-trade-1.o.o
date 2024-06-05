import React from "react";
import styled from "styled-components";
import { TradingView } from "@orderly.network/trading-view";
import Portfolio from "./portfolio";
// import { TVChartContainer } from "../TVChartContainer";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  margin-right: 0;
  @media (max-width: 768px) {
    width: 100%;
    height: 50vh;
  }
`;

const TradingViewChart = ({ symbol }: { symbol: string }) => {
  return (
    <Container>
      <div style={{ width: "100%", height: "70%" }}>
        <TradingView
          symbol={symbol}
          libraryPath="/charting_library/bundles"
          tradingViewScriptSrc="/charting_library/charting_library.js"
          overrides={{
            "mainSeriesProperties.candleStyle.borderDownColor": "#DC2140",
            "mainSeriesProperties.candleStyle.borderUpColor": "#1F8040",
            "mainSeriesProperties.candleStyle.downColor": "#DC2140",
            "mainSeriesProperties.candleStyle.upColor": "#1F8040",
            "mainSeriesProperties.candleStyle.wickDownColor": "#DC2140",
            "mainSeriesProperties.candleStyle.wickUpColor": "#1F8040",
            "paneProperties.background": "#000000",
            "paneProperties.backgroundType": "solid",
            "paneProperties.separatorColor": "#000000",
            "paneProperties.horzGridProperties.color": "#000000",
            "paneProperties.vertGridProperties.color": "#000000",
            "paneProperties.legendProperties.showSeriesTitle": "true",
          }}
        />
      </div>
      <Portfolio symbol={symbol} />
    </Container>
  );
};

export default TradingViewChart;
