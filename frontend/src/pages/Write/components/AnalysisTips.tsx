import React, { useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Paper
} from '@mui/material';
import { Lightbulb as LightbulbIcon } from "@mui/icons-material";
import { EmotionAnalysisRes } from '../../../models/api';
import { getRandomTipForEmotion } from '../../../utils/emotionTips';
import { colors } from "../../../styles/colors";

interface AnalysisTipsProps {
  analysisResult: EmotionAnalysisRes | null;
}

const AnalysisTips: React.FC<AnalysisTipsProps> = ({ analysisResult }) => {
  
  const tip = useMemo(() => {
    if (!analysisResult) return "Write about your emotions today";
    
    const emotionData = analysisResult.emotions_normalized || analysisResult.emotion_scores || {};
    const emotionEntries = Object.entries(emotionData);
    
    if (emotionEntries.length === 0) return "Write about your emotions today";
    
    const [primaryEmotionName] = emotionEntries
      .reduce((prev, current) => prev[1] > current[1] ? prev : current);
    
    return getRandomTipForEmotion(primaryEmotionName);
  }, [analysisResult]);

  const hasAnalysis = !!analysisResult;
  const isDefaultTip = tip === "Write about your emotions today";

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
        height: '100%',
        minHeight: '250px',
        maxHeight: '300px',
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
          {hasAnalysis && !isDefaultTip ? "Personalized Tip" : "Today's Tip"}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {hasAnalysis && !isDefaultTip ? (
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.primary',
              lineHeight: 1.7,
              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
              flex: 1,
              fontWeight: 400,
              opacity: 0.8
            }}
          >
            {tip}
          </Typography>
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
              {tip === "Write about your emotions today" 
                ? "Analyze your emotions to receive personalized wellness tips"
                : tip
              }
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default AnalysisTips;
