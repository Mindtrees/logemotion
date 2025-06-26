import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
} from '@mui/material';
import { colors } from '../../../styles/colors';
import { Lightbulb as LightbulbIcon } from '@mui/icons-material';
import { EmotionAnalysisResult } from '../../../models/write';

interface AnalysisTipsProps {
  tip: string;
  isVisible: boolean;
  emotions?: EmotionAnalysisResult[];
}

const AnalysisTips: React.FC<AnalysisTipsProps> = ({ tip, isVisible, emotions }) => {
  if (!isVisible) return null;

  const primaryEmotion = emotions && emotions.length > 0 
    ? emotions.reduce((prev, current) => prev.percentage > current.percentage ? prev : current)
    : null;

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
       <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            gap: 1.5
          }}
        >
          <LightbulbIcon 
            sx={{ 
              color: colors.status.warning,
              fontSize: '1.5rem'
            }} 
          />
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            {primaryEmotion ? `Personalized Tip` : 'Today\'s Tip'}
          </Typography>
        </Box>
      
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.6,
            fontSize: '0.95rem'
          }}
        >
          {tip}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AnalysisTips;