import React from 'react';
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  display: inline-block;

  padding: 1rem;
  border-radius: 0.75rem;
`;

const Card = ({ children }) => <Body>{children}</Body>;
export default Card;
