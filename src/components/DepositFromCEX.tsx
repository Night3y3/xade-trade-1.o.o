import React, { useEffect } from "react";
import { renderSendWidget } from "@cedelabs/widgets-universal";

const rootSelector = "#cede-widget";

const widgetConfig = {
  tokenSymbol: "USDC",
  network: "arbitrum",
//   address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
//   amount: "123.37",
//   lockNetwork: false,
  exchangeIds: ["binance", "coinbase", "bybit", "kraken"],
};

const widgetTheme: {
  logoTheme: "light" | "dark" | undefined,
  borderRadius: number,
  mode: "light" | "dark" | undefined,
  primaryColor: string,
  primaryTextColor: string,
  secondaryTextColor: string,
  borderColor: string,
  logoBorderColor: string,
  accentColor: string
} = {
  logoTheme: "light",
  borderRadius: 0,
  mode: "dark",
  primaryColor: "#000000",
  primaryTextColor: "#dadada",
  secondaryTextColor: "#ffffff",
  borderColor: "#4B4B4B",
  logoBorderColor: "#ffffff",
  accentColor: "#ffffff"
};

const DepositFromCEX = () => {
  useEffect(() => {
    renderSendWidget(rootSelector, { config: widgetConfig, theme: widgetTheme });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Deposit from CEX</h1>
      <p>Here you can deposit funds from a centralized exchange.</p>
      <div id="cede-widget"></div>
    </div>
  );
};

export default DepositFromCEX;