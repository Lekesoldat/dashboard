import React, { Suspense } from 'react';
import Loading from './Loading';
import Entur from '../api/Entur';

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Entur />
    </Suspense>
  );
};

export default App;
