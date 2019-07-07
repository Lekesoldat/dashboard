import React, { FC, Suspense } from 'react';
import Loading from './Loading';
import Entur from '../api/Entur';

const App: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Entur />
    </Suspense>
  );
};

export default App;
