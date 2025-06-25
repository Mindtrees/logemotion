import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

declare module '@mui/material/styles' {
  interface TypeBackground {
    hero: string;
    section: string;
    elevated: string;
    stats: string;
  }
  
  interface TypeText {
    muted: string;
  }

  interface Palette {
    emotion: typeof colors.semantic.emotion;
  }

  interface PaletteOptions {
    emotion?: typeof colors.semantic.emotion;
  }
}

const getSemanticColor = (colorPath: any, mode: 'light' | 'dark') => {
  if (typeof colorPath === 'object' && colorPath.light && colorPath.dark) {
    return colorPath[mode];
  }
  return colorPath;
};

export const createAppTheme = (mode: 'light' | 'dark') => {
  const { semantic } = colors;
  
  return createTheme({
    palette: {
      mode,
      primary: colors.primary,
      secondary: colors.secondary,
      
      background: {
        default: getSemanticColor(semantic.bg.primary, mode),
        paper: getSemanticColor(semantic.bg.elevated, mode),
        hero: getSemanticColor(semantic.bg.hero, mode),
        section: getSemanticColor(semantic.bg.secondary, mode),
        elevated: getSemanticColor(semantic.bg.elevated, mode),
        stats: getSemanticColor(semantic.bg.stats, mode),
      },
      
      text: {
        primary: getSemanticColor(semantic.text.primary, mode),
        secondary: getSemanticColor(semantic.text.secondary, mode),
        muted: getSemanticColor(semantic.text.muted, mode),
      },
      
      emotion: semantic.emotion,
      
      success: { main: colors.status.success },
      warning: { main: colors.status.warning },
      error: { main: colors.status.error },  
      info: { main: colors.status.info },
    },
    
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '2.5rem', fontWeight: 700 },
      h2: { fontSize: '2.25rem', fontWeight: 700 },
      h3: { fontSize: '1.875rem', fontWeight: 600 },
      h4: { fontSize: '1.5rem', fontWeight: 600 },
      h5: { fontSize: '1.25rem', fontWeight: 600 },
      h6: { fontSize: '1.125rem', fontWeight: 600 },
      body1: { fontSize: '1rem', lineHeight: 1.6 },
      body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    },
    
    shape: { borderRadius: 8 },
    spacing: 8,
    
    components: {
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.elevated,
            border: `1px solid ${getSemanticColor(semantic.border.main, mode)}`,
            borderRadius: 16,
            transition: 'all 0.3s ease',
            // '&:hover': {
            //   transform: 'translateY(-4px)',
            //   boxShadow: mode === 'dark' 
            //     ? '0 10px 25px -3px rgba(0, 0, 0, 0.3)'
            //     : '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
            // },
          }),
        },
      },
      
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: getSemanticColor(semantic.border.main, mode),
            borderRadius: 6,
            height: 12,
          },
          bar: { borderRadius: 6 },
        },
      },
      
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
          },
        },
      },
    },
  });
};

export const theme = createAppTheme('light');