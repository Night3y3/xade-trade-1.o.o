import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 40%;
  height: 80vh;
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
      {/* Your content goes here */}
    </Container>
  );
};

export default TradingView;
