import "./polyfills";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import NavBar from "./components/NavBar";
import Footer from "./components/ui/footer"; // Add this import
// import TradingView from "./components/ui/tradingview";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider, useAccount } from "wagmi";
// import Portfolio from "./components/ui/portfolio";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config";
import PriceBar from "./components/PriceBar";
import { BROKER_ID } from "./utils/constantValues";
import { ThemeProvider } from "./components/theme-provider";
import { OrderlyConfigProvider } from "@orderly.network/hooks";
import MarketSection from "./components/MarketSection";
import { TVChartContainer } from "./components/TVChartContainer";
import React from "react";

const queryClient = new QueryClient();

function App() {
  const account = useAccount({ config });

  return (
    <OrderlyConfigProvider brokerId={BROKER_ID} networkId="mainnet">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#7b3fe4",
              accentColorForeground: "black",
              borderRadius: "small",
              fontStack: "system",
              overlayBlur: "small",
            })}
          >
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <div className="flex flex-col overflow-hidden">
                <NavBar />
                <PriceBar />
                {/* <TVChartContainer /> */}

                <MarketSection accountInfo={account} />
              </div>
            </ThemeProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </OrderlyConfigProvider>
  );
}

export default App;
