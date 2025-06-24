import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CustomThemeProvider } from './contexts/ThemeContext';
import Loading from './components/Loading';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));

function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <AppLayout />
        </Suspense>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;