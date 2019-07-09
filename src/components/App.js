import React, { Suspense } from 'react';
import GlobalStyles from './GlobalStyles';
import Entur from '../api/Entur';
import Bysykkel from '../api/Bysykkel';
import { DotLoader } from 'react-spinners';

const App = () => {
  return (
    <>
      <GlobalStyles />

      <Suspense fallback={<DotLoader color='#36D7B7' />}>
        <Entur />
      </Suspense>

      <Suspense fallback={<DotLoader color='#36D7B7' />}>
        <Bysykkel city='Trondheim' station='Lerkendal' />
        <Bysykkel city='Oslo' station='Paléhaven' />
      </Suspense>
    </>
  );
};

export default App;
