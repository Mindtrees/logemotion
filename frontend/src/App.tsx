import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CustomThemeProvider } from './contexts/ThemeContext';
import Loading from './components/Loading';
import { AuthProvider } from './contexts/AuthContext';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));

function App() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Suspense fallback={<Loading />}>
            <AppLayout />
          </Suspense>
        </Router>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default App;