import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { colors } from '../styles/colors';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: colors.primary,
      secondary: colors.secondary,
      background: colors.light.background,
      text: colors.light.text,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '2rem', fontWeight: 600 },
      h2: { fontSize: '1.5rem', fontWeight: 600 },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
    },
    shape: { borderRadius: 8 },
    spacing: 8,
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: colors.primary.light,
        light: '#a99aec',
        dark: colors.primary.main,
      },
      secondary: colors.secondary,
      background: colors.dark.background,
      text: colors.dark.text,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '2rem', fontWeight: 600 },
      h2: { fontSize: '1.5rem', fontWeight: 600 },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
    },
    shape: { borderRadius: 8 },
    spacing: 8,
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};