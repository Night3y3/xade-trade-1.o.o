import React, { useState } from "react";
import Position from "./Position";
import Orders from "./Orders";
import NoDataPortfolio from "./NoDataPortfolio";

const tabs = ["Positions", "Orders", "History"];

export function Portfolio({ symbol }: { symbol: string }) {
  const [tabType, setTabType] = React.useState<string>("Positions");
  return (
    <div className=" block flex-col bg-black h-[200px]">
      <div className=" flex w-1/3  border border-solid border-[#4B4B4B] flex-3 ">
        {tabs.map((tab: string) => (
          <div
            key={tab}
            onClick={() => setTabType(tab)}
            style={{
              borderRight: tab === "Orders" ? "1px solid #4B4B4B" : "none",
              borderLeft: tab === "Orders" ? "1px solid #4B4B4B" : "none",
              // border: tabType === tab ? "1px solid #D4D4D4" : "1px solid #4B4B4B",
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
                fontFamily: "Sk-Modernist", // Changed 'font' to 'fontFamily'
                color: tabType === tab ? "#D4D4D4" : "#4B4B4B",
              }}
            >
              {tab}
            </div>
          </div>
        ))}
      </div>
      {tabType === "Positions" && <Position symbol={symbol} />}
      {tabType === "Orders" && <Orders symbol={symbol} />}
      {tabType === "History" && <NoDataPortfolio />}
    </div>
  );
}

export default Portfolio;
