import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack
} from '@mui/material';
import { EmotionResult } from '../../../models';

interface PostAnalysisProps {
  emotions: EmotionResult[];
}

const PostAnalysis: React.FC<PostAnalysisProps> = ({ emotions }) => {
  
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
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-2px)',
        }
      }}
    >
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          mb: { xs: 2, sm: 2.5, md: 3 }, 
          fontWeight: 700,
          color: 'text.primary',
          fontSize: { xs: '1.25rem', sm: '1.4rem', md: '1.75rem' },
          letterSpacing: '-0.01em'
        }}
      >
        Emotion Analysis Results
      </Typography>
      
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {emotions.length > 0 ? (
          <Stack spacing={{ xs: 1, sm: 1.2, md: 1.5 }}>
            {emotions.map((emotion, index) => (
              <Box key={index}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: { xs: 0.8, sm: 0.9, md: 1 }
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'rgba(0, 0, 0, 0.85)',
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px)',
                      px: { xs: 1.5, sm: 2, md: 2.5 },
                      py: { xs: 0.6, sm: 0.7, md: 0.8 },
                      borderRadius: 3,
                      display: 'inline-block',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                      }
                    }}
                  >
                    {emotion.name.charAt(0).toUpperCase() + emotion.name.slice(1)}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(0, 0, 0, 0.6)',
                      fontWeight: 600,
                      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.95rem' },
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      px: { xs: 1, sm: 1.2, md: 1.5 },
                      py: { xs: 0.4, sm: 0.45, md: 0.5 },
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    {emotion.value}%
                  </Typography>
                </Box>
                
                <Box
                  sx={{
                    height: { xs: 8, sm: 10, md: 12 },
                    borderRadius: 6,
                    backgroundColor: 'rgba(0, 0, 0, 0.06)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    overflow: 'hidden',
                    mb: { xs: 0.8, sm: 0.9, md: 1 },
                    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
                    position: 'relative'
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${emotion.value}%`,
                      background: `linear-gradient(135deg, ${emotion.color}F0, ${emotion.color}E0)`,
                      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      borderRadius: 6,
                      position: 'relative',
                      backdropFilter: 'blur(5px)',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.25), transparent)',
                        borderRadius: '6px 6px 0 0'
                      }
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
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
            <Typography variant="body2" sx={{ 
              fontStyle: 'italic', 
              textAlign: 'center',
              color: 'text.primary',
              opacity: 0.7
            }}>
              Click "Analyze Emotions" to see your emotion breakdown
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default PostAnalysis;