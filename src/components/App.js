import React, { Suspense } from 'react';
import GlobalStyle from './GlobalStyle';
import Loading from './Loading';
import Entur from '../api/Entur';
import Bysykkel from '../api/Bysykkel';
import { DotLoader } from 'react-spinners';

const App = () => {
  return (
    <>
      <GlobalStyle />

      <Suspense fallback={<DotLoader color='#36D7B7' />}>
        <Entur />
      </Suspense>

      <Suspense fallback={<DotLoader color='#36D7B7' />}>
        <Bysykkel city='Trondheim' station_id='293' />
      </Suspense>
    </>
  );
};

export default App;
