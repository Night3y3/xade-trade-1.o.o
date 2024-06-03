import { useOrderEntry } from "@orderly.network/hooks";
import { API, OrderSide, OrderType } from "@orderly.network/types";
import React, { useState } from "react";

interface MarketSectionProps {
  // Define prop types here
  symbol: string;
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
        background: "#1E1E1E",
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
          height: "24px",
          marginLeft: "8px",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "#FF9900",
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
        marginTop: 24,
        marginBottom: 24,
      }}
    >
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
          You’re buying:
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
            ? parseInt(amountPrice) / markPrice
            : markPrice * parseInt(amountPrice)}
        </div>
      </div>
    </div>
  );
};
const TradePanel: React.FC<MarketSectionProps> = ({ symbol }) => {
  // Component logic using props
  // console.log(state, accountInfo);
  const [orderSide, setOrderSide] = useState<OrderSide>(OrderSide.BUY);
  const [amountPrice, setAmountPrice] = useState<string>("1000");
  const { symbolConfig, markPrice } = useOrderEntry(
    {
      symbol: symbol,
      side: orderSide,
      order_type: OrderType.MARKET,
    },
    { watchOrderbook: true }
  );

  console.log(symbolConfig);
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
              ? parseInt(amountPrice) / markPrice
              : markPrice * parseInt(amountPrice)
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
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          padding: "0px 24px",
        }}
      >
        <div
          onClick={() => setOrderSide(OrderSide.BUY)}
          style={{
            border:
              orderSide === OrderSide.BUY
                ? "1px solid #C7F052"
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
              color: orderSide === OrderSide.BUY ? "#C7F052" : "#4B4B4B",
            }}
          >
            You’re buying
          </div>
        </div>
        <div
          onClick={() => setOrderSide(OrderSide.SELL)}
          style={{
            border:
              orderSide === OrderSide.SELL
                ? "1px solid #C7F052"
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
              color: orderSide === OrderSide.SELL ? "#C7F052" : "#4B4B4B",
            }}
          >
            You’re selling
          </div>
        </div>
      </div>
      <div
        style={{
          background: "#C7F052",
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          height: "55px",
          marginTop: 20,
        }}
        // onClick={async () => await onSubmit()}
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "black",
          }}
        >
          {orderSide} {symbolConfig?.base}
        </div>
      </div>
    </div>
  );
};

export default TradePanel;
