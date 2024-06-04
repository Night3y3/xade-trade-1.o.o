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
        width: "95%",
        borderRadius: 12,
        background: "#000",
        border: "1px solid #4B4B4B",
        height: "64px",
        padding: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "10px",
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
          fontFamily: "Sk-Modernist-Bold",
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
            fontSize: 16,
            font: "Sk-Modernist",
            color: "#FF9900",
            marginTop: "10%",
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
          Order Size
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
          Estimated entry price:
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
          Liquidation Price
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
          Fees:
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
  const [isBuy, setIsBuy] = useState(orderSide === OrderSide.BUY);

  const handleOrderSideChange = (side: OrderSide) => {
    setOrderSide(side);
    setIsBuy(side === OrderSide.BUY);
  };
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
        height: "100%", // Reduced height
        width: "100%", // Reduced width
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
          width: "95%",
          justifyContent: "center",
          padding: "10px 24px",
          border: "1px solid #4B4B4B",
          borderRadius: 8,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: isBuy ? 0 : "50%",
            width: "50%",
            height: "100%",
            backgroundColor: isBuy ? "#06170D" : "#170606",
            transition: "left 0.3s, background-color 0.3s",
            borderRadius: 8,
            border: isBuy ? "1px solid #40F388" : "1px solid #F35540",
            alignItems: "center",
          }}
        />
        <div
          onClick={() => handleOrderSideChange(OrderSide.BUY)}
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "20px",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 400,
              font: "Sk-Modernist",
              color: isBuy ? "#40F388" : "#4B4B4B",
              transition: "color 0.3s",
            }}
          >
            BUY/LONG
          </div>
        </div>
        <div
          onClick={() => handleOrderSideChange(OrderSide.SELL)}
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "20px",
            cursor: "pointer",
            zIndex: 1,
            transition: "border 0.3s",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 400,
              font: "Sk-Modernist",
              color: !isBuy ? "#F35540" : "#4B4B4B",
              transition: "color 0.3s",
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
          border: !isBuy ? "1px solid #FF0A0A" : "none",
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
