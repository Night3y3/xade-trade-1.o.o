import React, { useEffect, useState } from "react";
import { useAccount } from "@orderly.network/hooks";
import { UseAccountReturnType, useConnect, useWalletClient } from "wagmi";
import { CHAIN_ID_Hex1 } from "@/utils/constantValues";
import { useOrderEntry } from "@orderly.network/hooks";
import {
  AccountStatusEnum,
  OrderSide,
  OrderType,
} from "@orderly.network/types";
import TradePanel from "./ui/TradePanel";
import OrderBook from "./Orderbook/index";
import TradingView from "./ui/tradingview";
import { useAppSelector } from "@/redux/hooks";
import { config } from "@/config";
// import { config } from "@/config";
// import { ethers } from "ethers";

interface MarketSectionProps {
  accountInfo: UseAccountReturnType;
}

const MarketSection: React.FC<MarketSectionProps> = ({ accountInfo }) => {
  const [initialized, setInitialized] = useState(false);
  const [onProcess, setOnProcess] = useState(false);
  const { account, state } = useAccount();
  const [orderSide, setOrderSide] = useState<OrderSide>(OrderSide.BUY);
  const [orderType, setOrderType] = useState<OrderType>(OrderType.MARKET);
  const [amountPrice, setAmountPrice] = useState<string>("1000");
  const marketSymbol = useAppSelector((x) => x.market.symbol);
  const result = useWalletClient();
  const [showTradePanel, setShowTradePanel] = useState(false); // Add state
  const { symbolConfig, markPrice } = useOrderEntry(
    {
      symbol: marketSymbol,
      side: orderSide,
      order_type: orderType,
    },
    { watchOrderbook: true }
  );

  useEffect(() => {
    const initialUserAccountSetup = async () => {
      if (accountInfo.address && accountInfo.isConnected && !onProcess) {
        setOnProcess(true);

        await account.setAddress(accountInfo.address, {
          provider: window?.ethereum,
          chain: {
            id: CHAIN_ID_Hex1,
          },
        });
        setOnProcess(false);
        setInitialized(true);
        console.log("account info!!!!", window?.ethereum, account);
      }
    };
    initialUserAccountSetup();
  }, [window?.ethereum, accountInfo]);

  useEffect(() => {
    const accountCheck = async () => {
      console.log(initialized, !state.accountId);
      if (initialized && !state.accountId && !onProcess) {
        setOnProcess(true);
        await account.createAccount();
        setOnProcess(false);
        console.log("account created!!!!", state);
      }
      if (state.status <= AccountStatusEnum.DisabledTrading && !onProcess) {
        setOnProcess(true);
        const key = await account.createOrderlyKey(30);
        setOnProcess(false);
        console.log("key created!!!!", key, state);
      }
    };
    accountCheck();
  }, [account, state]);

  return (
    <div className="market-section">
      <div className="tradingview-container">
        <TradingView symbol={marketSymbol} />
      </div>
      <div className="orderbook-container">
        <OrderBook symbol={marketSymbol} />
      </div>
      <div
        className={`tradepanel-container ${
          showTradePanel ? "visible" : "hidden"
        }`}
        onClick={() => setShowTradePanel(false)}
      >
        <div
          className="tradepanel-content"
          onClick={(e) => e.stopPropagation()}
        >
          <TradePanel
            setAmountPrice={setAmountPrice}
            setOrderSide={setOrderSide}
            setOrderType={setOrderType}
            symbolConfig={symbolConfig}
            markPrice={markPrice}
            orderType={orderType}
            orderSide={orderSide}
            amountPrice={amountPrice}
            symbol={marketSymbol}
          />
        </div>
      </div>
      <button
        className="trade-toggle-button"
        onClick={() => setShowTradePanel(!showTradePanel)}
      >
        Trade
      </button>
    </div>
  );
};

export default MarketSection;
