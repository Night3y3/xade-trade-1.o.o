import "./polyfills";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import NavBar from "./components/NavBar";
// import TradingView from "./components/ui/tradingview";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import injectedModule from "@web3-onboard/injected-wallets";
// import Portfolio from "./components/ui/portfolio";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config";
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { BROKER_ID, supportedChains } from "./utils/constantValues";
import { ThemeProvider } from "./components/theme-provider";
import { OrderlyConfigProvider } from "@orderly.network/hooks";
import MarketSection from "./components/MarketSection";
import { Web3OnboardProvider, init } from "@web3-onboard/react";
import walletConnectModule from "@web3-onboard/walletconnect";
import Chart from "./components/Charts";
import Trade from "./components/Trade";
import Leaderboard from "./components/Leaderboard";

const queryClient = new QueryClient();

function App() {
  const injected = injectedModule();
  const walletConnect = walletConnectModule({
    projectId: "5f4e967f02cf92c8db957c56e877e149",
    requiredChains: [42161],
    optionalChains: [421614],
    dappUrl: "https://orderlynetwork.github.io/example-dex",
  });

  const web3Onboard = init({
    wallets: [injected, walletConnect],
    chains: supportedChains.map(({ id, token, label, rpcUrl }) => ({
      id,
      token,
      label,
      rpcUrl,
    })),
    appMetadata: {
      name: "Xade Pro",
      description: "Fully fledged DEX using Orderly Network",
    },
    accountCenter: {
      desktop: { enabled: false },
      mobile: { enabled: false },
    },
    connect: {
      autoConnectLastWallet: true,
    },
  });
  return (
    <OrderlyConfigProvider brokerId={BROKER_ID} networkId="mainnet">
      <Web3OnboardProvider web3Onboard={web3Onboard}>
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
                <div className="flex flex-col overflow-hidden -mt-7">
                  <Router>
                    <NavBar />
                    <Routes>
                      <Route path="/trade" element={<Trade />} />
                      <Route path="/leaderboard" element={<Leaderboard />} />
                      <Route path="/" element={<Trade />} />
                    </Routes>
                  </Router>
                  {/* <Chart /> */}

                </div>
              </ThemeProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </Web3OnboardProvider>
    </OrderlyConfigProvider>
  );
}

export default App;
