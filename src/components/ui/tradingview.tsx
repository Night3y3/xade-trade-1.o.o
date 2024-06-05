import React from "react";
import styled from "styled-components";
import Portfolio from "./portfolio";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-self: flex-start;
  margin-right: 0;
  @media (max-width: 768px) {
    width: 100%;
    height: 50vh;
  }
`;

const TradingView = ({ symbol }: { symbol: string }) => {
  return (
    <Container>
      <Portfolio symbol={symbol} />
    </Container>
  );
};

export default TradingView;
