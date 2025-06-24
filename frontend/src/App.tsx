import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Loading from './components/Loading';

const AppLayout = React.lazy(() => import('./layot/Applayout.tsx'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <AppLayout />
      </Suspense>
    </Router>
  );
}

export default App;