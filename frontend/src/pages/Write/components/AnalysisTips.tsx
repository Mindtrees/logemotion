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
        backgroundColor: 'background.elevated',
        backdropFilter: 'blur(20px)',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: (theme) => `0 20px 60px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.3)'}`,
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: (theme) => `0 24px 80px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(0, 0, 0, 0.4)'}`,
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
            fontSize: (theme) => theme.typography.h4.fontSize
          }} 
        />
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
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
            backgroundColor: 'background.paper',
            backdropFilter: 'blur(20px)',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: (theme) => `0 8px 32px ${theme.palette.mode === 'light' ? 'rgba(86, 86, 86, 0.06)' : 'rgba(0, 0, 0, 0.3)'}`,
            padding: 1.5,
            overflow: 'auto',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': {
              display: 'none', // Chrome, Safari, Edge
            },
            '&:hover': {
              backgroundColor: 'background.default',
              boxShadow: (theme) => `0 12px 40px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.4)'}`,
              borderColor: 'primary.light',
            },
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.primary',
              lineHeight: 1.7,
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
