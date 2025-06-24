export const colors = {
  // Brand Colors
  primary: {
    main: '#5046e4',
    light: '#7c6ee8',
    dark: '#3832a0',
  },
  secondary: {
    main: '#f50057',
    light: '#ff5983',
    dark: '#c51162',
  },
  
  // Light Theme
  light: {
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
      navbar: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    border: '#e0e0e0',
    hover: '#f5f5f5',
  },
  
  // Dark Theme
  dark: {
    background: {
      default: '#181c24',
      paper: '#1e1e1e',
      navbar: '#181c24',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0aec0',
    },
    border: '#4a5568',
    hover: 'rgba(255,255,255,0.1)',
  },
  
  // Status Colors
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
} as const;