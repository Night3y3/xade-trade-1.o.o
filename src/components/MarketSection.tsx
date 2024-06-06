import React, { useEffect, useState } from "react";
import { useAccount } from "@orderly.network/hooks";
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
import { useConnectWallet } from "@web3-onboard/react";

interface MarketSectionProps {}

const MarketSection: React.FC<MarketSectionProps> = () => {
  const [initialized, setInitialized] = useState(false);
  const [onProcess, setOnProcess] = useState(false);
  const { account, state } = useAccount();
  const [{ wallet }] = useConnectWallet();
  const [orderSide, setOrderSide] = useState<OrderSide>(OrderSide.BUY);
  const [orderType, setOrderType] = useState<OrderType>(OrderType.MARKET);
  const [amountPrice, setAmountPrice] = useState<string>("1000");
  const marketSymbol = useAppSelector((x) => x.market.symbol);

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
      console.log("started!!!!!!", !onProcess, wallet?.accounts[0]?.address);
      if (wallet?.accounts[0]?.address) {
        setOnProcess(true);
        await account.setAddress(wallet?.accounts[0]?.address, {
          provider: wallet.provider,
          chain: {
            id: CHAIN_ID_Hex1,
          },
        });
        setOnProcess(false);
        setInitialized(true);
        console.log("account info!!!!", wallet.provider, account);
      }
    };
    initialUserAccountSetup();
  }, [wallet]);

  useEffect(() => {
    const accountCheck = async () => {
      if (initialized && !state?.accountId && !onProcess) {
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
  }, [initialized, account, state]);

  return (
    <div className="market-section">
      <div className="tradingview-container">
        <TradingView symbol={marketSymbol} />
      </div>
      <div className="orderbook-container">
        <OrderBook symbol={marketSymbol} />
      </div>
      {showTradePanel && (
        <div
          className="trade-overlay"
          onClick={() => setShowTradePanel(false)}
        ></div>
      )}
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
