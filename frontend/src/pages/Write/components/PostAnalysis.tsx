import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  LinearProgress,
  Stack
} from '@mui/material';
import { EmotionAnalysisResult } from '../../../models/write';

interface PostAnalysisProps {
  emotions: EmotionAnalysisResult[];
  isVisible: boolean;
}

const PostAnalysis: React.FC<PostAnalysisProps> = ({ emotions, isVisible}) => {
  if (!isVisible) return null;

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        backgroundColor: 'background.paper',
        mt: 3
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ 
          mb: 3, 
          fontWeight: 500,
          color: 'text.primary'
        }}
      >
        Emotion Analysis Results
      </Typography>
      
      <Stack spacing={2.5}>
        {emotions.map((emotion, index) => (
          <Box key={index}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 1
              }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 500,
                  color: 'text.primary'
                }}
              >
                {emotion.label}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 500
                }}
              >
                {emotion.percentage}%
              </Typography>
            </Box>
            
            <LinearProgress
              variant="determinate"
              value={emotion.percentage}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: emotion.color,
                  borderRadius: 4,
                }
              }}
            />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default PostAnalysis;