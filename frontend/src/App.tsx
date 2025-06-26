import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CustomThemeProvider } from './contexts/ThemeContext';
import Loading from './components/Loading';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Suspense fallback={<Loading />}>
            <AppLayout />
          </Suspense>
        </Router>
      </CustomThemeProvider>
    </QueryClientProvider>
  );
}

export default App;