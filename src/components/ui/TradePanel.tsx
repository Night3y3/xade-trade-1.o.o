/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { API, OrderSide, OrderType } from "@orderly.network/types";
import React, { useState } from "react";
import ".././../App.css";
import Account from "./account"; // Import the Account component
import { useOrderEntry } from "@orderly.network/hooks";

interface MarketSectionProps {
  orderSide: OrderSide;
  amountPrice: string;
  symbolConfig: API.SymbolExt;
  orderType: OrderType;
  markPrice: number;
  symbol: string;
  setAmountPrice: (x: string) => void;
  setOrderSide: (x: OrderSide) => void;
  setOrderType: (x: OrderType) => void;
}

const AmountInput = ({
  orderSide,
  symbolConfig,
  amountPrice,
  setAmountPrice,
}: {
  orderSide: OrderSide;
  amountPrice: string;
  symbolConfig: API.SymbolExt;
  setAmountPrice: (x: string) => void;
}) => {
  return (
    <div
      style={{
        width: "90%",
        borderRadius: 12,
        background: "#000",
        border: "1px solid #4B4B4B",
        height: "64px",
        padding: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "#4B4B4B",
            textAlign: "left",
          }}
        >
          Order value
        </div>
        <input
          style={{
            fontSize: "18px",
            fontWeight: 700,
            font: "Sk-Modernist",
            background: "transparent",
            outline: "none",
            lineHeight: "21.6px",
            color: "#D4D4D4",
            width: "60%",
            height: "21.6px",
          }}
          value={amountPrice}
          onChange={(e) => setAmountPrice(e.target.value?.toString())}
        />
      </div>
      <div
        style={{
          border: "1px solid #FF9900",
          width: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          height: "28px",
          marginLeft: "8px",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "#FF9900",
            padding: "5%",
          }}
        >
          {orderSide === OrderSide.BUY
            ? symbolConfig?.quote
            : symbolConfig?.base}
        </div>
      </div>
    </div>
  );
};

const OrderOverview = ({
  orderSide,
  symbolConfig,
  markPrice,
  amountPrice,
}: {
  orderSide: string;
  markPrice: number;
  symbolConfig: API.SymbolExt;
  amountPrice: string;
}) => {
  return (
    <div
      style={{
        border: "1px dotted #292929",
        padding: 8,
        borderRadius: "12px",
        width: "90%",
        marginTop: "24px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          margin: "6px 0px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "14px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "#4B4B4B",
          }}
        >
          BUY/LONG
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "14px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "white",
          }}
        >
          {symbolConfig?.base}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          margin: "6px 0px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "14px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "#4B4B4B",
          }}
        >
          Order price:
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "14px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "white",
          }}
        >
          {markPrice}
          {` ${symbolConfig?.base}`}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          margin: "6px 0px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "14px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "#4B4B4B",
          }}
        >
          Order value:
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "14px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "white",
          }}
        >
          {amountPrice}
          {` ${
            orderSide === OrderSide.BUY
              ? symbolConfig?.quote
              : symbolConfig?.base
          }`}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          margin: "6px 0px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "14px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "#4B4B4B",
          }}
        >
          Order qty:
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "14px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "white",
          }}
        >
          {orderSide === OrderSide.BUY
            ? parseFloat(amountPrice) / markPrice
            : markPrice * parseFloat(amountPrice)}
        </div>
      </div>
    </div>
  );
};

const TradePanel: React.FC<MarketSectionProps> = ({
  orderType,
  orderSide,
  amountPrice,
  setOrderType,
  setAmountPrice,
  setOrderSide,
  symbolConfig,
  markPrice,
  symbol,
}) => {
  const {
    helper: { calculate, validator },
    onSubmit,
  } = useOrderEntry(
    {
      symbol: symbol,
      side: orderSide,
      order_type: orderType,
    },
    { watchOrderbook: true }
  );
  const [processing, setIsProcessing] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        padding: "24px 0px",
      }}
    >
      <Account />
      <div
        style={{
          width: "100%",
          padding: "0px 0px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            padding: "10px 0px", // Added horizontal padding
          }}
        >
          {[OrderType.MARKET, OrderType.LIMIT, OrderType.STOP_MARKET].map(
            (type) => (
              <div
                key={type}
                onClick={() => setOrderType(type as OrderType)}
                style={{
                  border:
                    orderType === type
                      ? "1px solid #D4D4D4"
                      : "1px solid #4B4B4B",
                  width: "33.33%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "46px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    font: "Sk-Modernist",
                    color: orderType === type ? "#D4D4D4" : "#4B4B4B",
                  }}
                >
                  {type === OrderType.STOP_MARKET ? "STOP" : type}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          padding: "10px 24px",
        }}
      >
        <div
          onClick={() => setOrderSide(OrderSide.BUY)}
          style={{
            border:
              orderSide === OrderSide.BUY
                ? "1px solid #40F388"
                : "1px solid #4B4B4B",
            width: "48%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            height: "46px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 400,
              font: "Sk-Modernist",
              color: orderSide === OrderSide.BUY ? "#40F388" : "#4B4B4B",
            }}
          >
            BUY/LONG
          </div>
        </div>
        <div
          onClick={() => setOrderSide(OrderSide.SELL)}
          style={{
            border:
              orderSide === OrderSide.SELL
                ? "1px solid #FF0A0A"
                : "1px solid #4B4B4B",
            width: "48%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            height: "46px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 400,
              font: "Sk-Modernist",
              color: orderSide === OrderSide.SELL ? "#FF0A0A" : "#4B4B4B",
            }}
          >
            SELL/SHORT
          </div>
        </div>
      </div>
      <AmountInput
        symbolConfig={symbolConfig}
        setAmountPrice={setAmountPrice}
        amountPrice={amountPrice}
        orderSide={orderSide}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          fontSize: "12px",
          fontWeight: 400,
          font: "Sk-Modernist",
          color: "#4B4B4B",
          marginTop: 6,
          textAlign: "left",
        }}
      >
        {orderSide === OrderSide.BUY ? "You will get" : "This will cost"}
        <div
          style={{
            fontSize: "12px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "#fff",
            textAlign: "start",
          }}
        >
          {`  ≈ ${
            orderSide === OrderSide.BUY
              ? parseFloat(amountPrice) / markPrice
              : markPrice * parseFloat(amountPrice)
          } ${
            orderSide === OrderSide.SELL
              ? symbolConfig?.quote
              : symbolConfig?.base
          }`}
        </div>
      </div>
      <OrderOverview
        amountPrice={amountPrice}
        markPrice={markPrice}
        symbolConfig={symbolConfig}
        orderSide={orderSide}
      />
      <div
        onClick={async () => {
          if (!processing) {
            setIsProcessing(true);
            const newValue = calculate(
              {
                order_price:
                  orderSide === OrderSide.BUY
                    ? amountPrice
                    : amountPrice * markPrice,
                order_type: orderType,
                side: orderSide,
                symbol,
              },
              "order_quantity",
              orderSide === OrderSide.BUY
                ? parseFloat(amountPrice) / markPrice
                : amountPrice
            );
            const errors = await validator(newValue);
            try {
              console.log("order placing", errors, newValue);
              await onSubmit(newValue);
              setIsProcessing(false);
            } catch (error) {
              setIsProcessing(false);
            }
          }
        }}
        style={{
          background: orderSide === OrderSide.SELL ? "#F07852" : "#40F388",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          height: "55px",
          marginTop: 20,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "black",
          }}
        >
          {processing ? "Executing..." : `${orderSide} ${symbolConfig?.base}`}
        </div>
      </div>
    </div>
  );
};

export default TradePanel;
