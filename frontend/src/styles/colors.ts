export const colors = {
  primary: {
    main: '#5046e4',
    light: '#7c6ee8',
    dark: '#3832a0',
  },
  secondary: {
    main: '#06b6d4',
    light: '#0891b2',
    dark: '#0e7490',
  },

  semantic: {
    bg: {
      primary: { light: '#ffffff', dark: '#0f172a' },
      secondary: { light: '#f8fafc', dark: '#1e293b' },
      elevated: { light: '#ffffff', dark: '#334155' },
      hero: { 
        light: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', 
        dark: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' 
      },
      stats: { 
        light: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        dark: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' 
      },
    },
    
    text: {
      primary: { light: '#1f2937', dark: '#f8fafc' },
      secondary: { light: '#6b7280', dark: '#cbd5e1' },
      muted: { light: '#9ca3af', dark: '#94a3b8' },
    },
    
    border: {
      main: { light: '#e5e7eb', dark: '#334155' },
      light: { light: '#f3f4f6', dark: '#1e293b' },
    },

      emotions: {
        joy: '#FFD700',
        surprise: '#00FFFF',
        sadness: '#5B9BD5',
        anger: '#DC143C',
        fear: '#2F2F4F',
        disgust: '#6B8E23',
    },
    hover: 'rgba(255,255,255,0.1)',
  },
  
  status:{ 
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',
  }

} as const;