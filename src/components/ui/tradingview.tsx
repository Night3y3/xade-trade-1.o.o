import React from 'react';
import styled from 'styled-components';
import { TVChartContainer } from '../TVChartContainer';

const Container = styled.div`
  height: 80vh;
  width:100%;
  background-color: red;
  align-self: flex-start;
  margin-right: 0;
  @media (max-width: 768px) {
    width: 100%;
    height:20vh;
  }
`;

const TradingView = () => {
    return (
        <Container>
            <TVChartContainer />
        </Container>
    );
};

export default TradingView;