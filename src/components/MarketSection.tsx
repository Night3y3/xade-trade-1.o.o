import React, { useEffect, useState } from "react";
import { useAccount } from "@orderly.network/hooks";
import { UseAccountReturnType } from "wagmi";
import { CHAIN_ID } from "@/utils/constantValues";
import { useOrderEntry } from "@orderly.network/hooks";
import {
  AccountStatusEnum,
  OrderSide,
  OrderType,
} from "@orderly.network/types";
import TradePanel from "./ui/TradePanel";
import OrderBook from "./ui/orderbook";
import TradingView from "./ui/tradingview";

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
  const { symbolConfig, markPrice } = useOrderEntry(
    {
      symbol: "PERP_ETH_USDC",
      side: orderSide,
      order_type: orderType,
    },
    { watchOrderbook: true }
  );

  useEffect(() => {
    const initialUserAccountSetup = async () => {
      if (accountInfo.address && accountInfo.isConnected && !onProcess) {
        setOnProcess(true);
        account.setAddress(accountInfo.address, {
          provider: window?.ethereum,
          chain: {
            id: CHAIN_ID,
          },
        });
        setOnProcess(false);
        setInitialized(true);
        console.log("account info!!!!", state);
      }
    };
    initialUserAccountSetup();
  }, [accountInfo]);

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
        <TradingView />
      </div>
      <div className="orderbook-container">
        <OrderBook symbolConfig={symbolConfig} symbol="PERP_ETH_USDC" />
      </div>
      <div className="tradepanel-container">
        <TradePanel
          setAmountPrice={setAmountPrice}
          setOrderSide={setOrderSide}
          setOrderType={setOrderType}
          symbolConfig={symbolConfig}
          markPrice={markPrice}
          orderType={orderType}
          orderSide={orderSide}
          amountPrice={amountPrice}
        />
      </div>
    </div>
  );
};

export default MarketSection;
