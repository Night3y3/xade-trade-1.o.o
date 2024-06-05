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
    // <div style={{ width: "100%" }}>
    <Container>
      {/* <TVChartContainer /> */}
      <div style={{ width: "100%", height: "80%" }}>
        <TradingView
          symbol={symbol}
          libraryPath="/charting_library/bundles"
          tradingViewScriptSrc="/charting_library/charting_library.js"
          // libraryPath="/tradingview/charting_library/bundles"
          // tradingViewScriptSrc="/tradingview/charting_library/charting_library.js"
          overrides={{
            "mainSeriesProperties.candleStyle.borderDownColor": "#DC2140",
            "mainSeriesProperties.candleStyle.borderUpColor": "#1F8040",
            "mainSeriesProperties.candleStyle.downColor": "#DC2140",
            "mainSeriesProperties.candleStyle.upColor": "#1F8040",
            "mainSeriesProperties.candleStyle.wickDownColor": "#DC2140",
            "mainSeriesProperties.candleStyle.wickUpColor": "#1F8040",
            "paneProperties.background": "#000",
            "paneProperties.backgroundType": "solid",
            "paneProperties.separatorColor": "#164165",
            "paneProperties.horzGridProperties.color": "#161B22",
            "paneProperties.vertGridProperties.color": "#161B22",
            "paneProperties.legendProperties.showSeriesTitle": "false",
          }}
        />
      </div>
      <Portfolio symbol={symbol} />
      {/* </div> */}
    </Container>
  );
};

export default TradingViewChart;
