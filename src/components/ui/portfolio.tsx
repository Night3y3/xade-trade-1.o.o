import React, { useState } from "react";
import Position from "./Position";
import Orders from "./Orders";
import NoDataPortfolio from "./NoDataPortfolio";

const tabs = ["Positions", "Orders", "History"];

export function Portfolio({ symbol }: { symbol: string }) {
  const [tabType, setTabType] = React.useState<string>("Positions");

  // Dummy data for the new fields
  const portfolioValue = "$10,000";
  const pnl = "$500";
  const leverage = "2x";
  const unrealisedPnl = "$200";

  return (
    <div className="block flex-col bg-black h-[200px]">
      <div
        className="w-full border-t border-b border-solid border-[#4B4B4B]"
        style={{ height: "40%" }}
      >
        {/* New section for portfolio details */}
        <div className="flex justify-start text-[#767676] text-[16px] font-[Sk-Modernist-Regular] h-full items-center space-x-16 pl-4">
          <div className="flex flex-col items-start">
            <span>Portfolio Value</span>
            <span className="text-white text-[18px] font-[Sk-Modernist-Bold]">{portfolioValue}</span>
          </div>
          <div className="flex flex-col items-start">
            <span>PnL</span>
            <span className="text-white text-[18px] font-[Sk-Modernist-Bold]">{pnl}</span>
          </div>
          <div className="flex flex-col items-start">
            <span>Leverage</span>
            <span className="text-white text-[18px] font-[Sk-Modernist-Bold]">{leverage}</span>
          </div>
          <div className="flex flex-col items-start">
            <span>Unrealised PnL</span>
            <span className="text-white text-[18px] font-[Sk-Modernist-Bold]">{unrealisedPnl}</span>
          </div>
        </div>
      </div>
      <div className="border-b border-solid border-[#4B4B4B]">
        <div className="flex w-1/3 border-r border-solid border-[#4B4B4B] flex-3 ">
          {tabs.map((tab: string) => (
            <div
              key={tab}
              onClick={() => setTabType(tab)}
              style={{
                borderRight: tab === "Orders" ? "1px solid #4B4B4B" : "none",
                borderLeft: tab === "Orders" ? "1px solid #4B4B4B" : "none",
                backgroundColor: tabType === tab ? "#1E1E1E" : "#0D0D0D",
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
                  fontFamily: "Sk-Modernist",
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
      {tabType === "History" && <NoDataPortfolio />}
    </div>
  );
}

export default Portfolio;
