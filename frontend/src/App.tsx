import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './styles/theme';
import Loading from './components/Loading';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<Loading />}>
          <AppLayout />
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;