import React, { useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Paper
} from '@mui/material';
import { Lightbulb as LightbulbIcon } from "@mui/icons-material";
import { EmotionResult } from '../../../models';
import { getRandomTipForEmotion } from '../../../utils/emotionTips';
import { colors } from "../../../styles/colors";

interface AnalysisTipsProps {
  emotions: EmotionResult[];
}

const AnalysisTips: React.FC<AnalysisTipsProps> = ({ emotions }) => {

  const hasAnalysis = emotions && emotions.length > 0;
  const primaryEmotionName = emotions[0]?.name;

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: { xs: 3, sm: 4 }, 
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: { xs: 2, sm: 2.5, md: 3 },
          gap: { xs: 1.5, sm: 2 }
        }}
      >
        <LightbulbIcon 
          sx={{ 
            color: colors.status.warning,
            fontSize: '1.5rem'
          }} 
        />
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
            fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.75rem' },
            letterSpacing: '-0.01em'
          }}
        >
          Today's Tip
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {hasAnalysis ? (
                  <Box
          sx={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: 1,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(86, 86, 86, 0.06)',
            padding: 1.5,
            overflow: 'auto',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': {
              display: 'none', // Chrome, Safari, Edge
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
              borderColor: 'rgba(80, 70, 228, 0.3)',
            },
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.primary',
              lineHeight: 1.7,
              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
              fontWeight: 400,
              opacity: 0.9
            }}
          >
            {primaryEmotionName ? getRandomTipForEmotion(primaryEmotionName) : 'Loading tip...'}
          </Typography>
        </Box>
        ) : (
          <Box 
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              color: 'text.secondary'
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                fontStyle: 'italic', 
                textAlign: 'center',
                fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                color: 'text.primary',
                opacity: 0.6
              }}
            >
              Analyze your post to receive personalized wellness tips
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default AnalysisTips;
