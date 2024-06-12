import React from "react";
import Position from "./Position";
import Orders from "./Orders";
import { useCollateral, useMarginRatio } from "@orderly.network/hooks";

const tabs = ["Positions", "Orders"];

export function Portfolio({ symbol }: { symbol: string }) {
  const [tabType, setTabType] = React.useState<string>("Positions");
  const colateral = useCollateral({ dp: 2 });
  // Dummy data for the new fields

  const portfolioValue = colateral.availableBalance;
  const formattedPortfolioValue = `$ ${portfolioValue?.toPrecision(4)}`;
  const pnl = colateral.unsettledPnL;
  const pnlp = ((pnl / (portfolioValue || 1)) * 100).toFixed(4) || "0";
  const { currentLeverage } = useMarginRatio();
  const leverage = currentLeverage.toFixed(2);
  // const unrealisedPnl = "$200";

  return (
    <div className="block flex-col bg-black h-full border-b border-solid border-[#4B4B4B]">
      <div
        className="w-full border-t border-b border-solid border-[#4B4B4B] overflow-x-auto"
        style={{ height: "10%" }}
      >
        {/* New section for portfolio details */}
        <div className="flex justify-start text-[#767676] text-[16px] font-[Sk-Modernist-Regular] h-full items-center space-x-16 pl-4 min-w-[600px]">
          <div className="flex flex-col items-start">
            <span>Portfolio Value</span>
            <span className="text-white text-[18px] font-[Sk-Modernist-Bold]">
              {formattedPortfolioValue}
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span>PnL</span>
            <span
              className={`text-[18px] font-[Sk-Modernist-Bold] ${
                pnl < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {pnl}({pnlp}%)
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span>Leverage</span>
            <span className="text-white text-[18px] font-[Sk-Modernist-Bold]">
              {leverage}x
            </span>
          </div>
        </div>
      </div>
      <div className="border-b border-solid border-[#4B4B4B] overflow-x-auto">
        <div className="flex w-full min-w-[300px]">
          {tabs.map((tab: string) => (
            <div
              key={tab}
              onClick={() => setTabType(tab)}
              style={{
                borderRight: tab === "Orders" ? "1px solid #4B4B4B" : "none",
                borderLeft: tab === "Orders" ? "1px solid #4B4B4B" : "none",
                backgroundColor: tabType === tab ? "#1E1E1E" : "#0D0D0D",
                width: "50%",
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
                  fontFamily: "Sk-Modernist-Regular",
                  color: tabType === tab ? "#D4D4D4" : "#4B4B4B",
                }}
              >
                {tab}
              </div>
            </div>
          ))}
        </div>
      </div>
      {tabType === "Positions" && <Position symbol={symbol} />}
      {tabType === "Orders" && <Orders symbol={symbol} />}
    </div>
  );
}

export default Portfolio;
