import React from "react";

interface MarketSectionProps {
  // Define prop types here
}

const TradePanel: React.FC<MarketSectionProps> = () => {
  // Component logic using props
  // console.log(state, accountInfo);
  const AmountInput = () => {
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
          //   width: "100%",
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
            USDC
          </div>
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
            USDC
          </div>
        </div>
      </div>
    );
  };
  const OrderOverview = () => {
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
            PONKE
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
            PONKE
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
            PONKE
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
            PONKE
          </div>
        </div>
      </div>
    );
  };
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
      <AmountInput />
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
        This will cost
        <div
          style={{
            fontSize: "12px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "#fff",
            textAlign: "start",
          }}
        >
          ≈31,793.1 USDC
        </div>
      </div>
      <OrderOverview />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          padding: "0px 24px",
        }}
      >
        <div
          style={{
            border: "1px solid #C7F052",
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            height: "46px",
            // marginLeft: "8px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 400,
              font: "Sk-Modernist",
              color: "#C7F052",
            }}
          >
            You’re buying
          </div>
        </div>
        <div
          style={{
            border: "1px solid #C7F052",
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            height: "46px",
            // marginLeft: "8px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: 400,
              font: "Sk-Modernist",
              color: "#C7F052",
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
      >
        <div
          style={{
            fontSize: "12px",
            fontWeight: 400,
            font: "Sk-Modernist",
            color: "black",
          }}
        >
          Buy BTC
        </div>
      </div>
    </div>
  );
};

export default TradePanel;
