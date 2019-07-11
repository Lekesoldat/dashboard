import React, { Suspense } from 'react';
import { DotLoader } from 'react-spinners';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import Entur from '../api/Entur';
import Bysykkel from '../api/Bysykkel';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #f00;
`;
const Mid = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #0f0;
`;
const Bot = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #00f;
`;

const App = () => {
  return (
    <>
      <GlobalStyles />

      <Suspense fallback={<DotLoader color='#36D7B7' />}>
        <Entur />
      </Suspense>

      <Suspense fallback={<DotLoader color='#36D7B7' />}>
        <Bysykkel city='Trondheim' station='Lerkendal' />
      </Suspense>
    </>
  );
};

export default App;
