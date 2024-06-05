import React from "react";
import styled from "styled-components";
import Portfolio from "./portfolio";

// const Container = styled.div`
//   height: 80vh;
//   width:100%;
//   background-color: red;
//   align-self: flex-start;
//   margin-right: 0;
//   @media (max-width: 768px) {
//     width: 100%;
//     height:20vh;
//   }
// `;

// const Container = styled.div``;

const TradingView = () => {
  return (
    <div className=" h-1/2">
      <TVChartContainer />
    </div>
  );
};

export default TradingView;
