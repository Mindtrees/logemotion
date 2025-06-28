import React from 'react';
import { Container, Typography, Box } from '@mui/material';

interface WritePostHeadingProps {
  isEditMode?: boolean;
}

const WritePostHeading: React.FC<WritePostHeadingProps> = ({ isEditMode = false }) => {
  return (
    <Container 
      maxWidth="lg" 
      sx={{
        px: { xs: 3, sm: 4, md: 6, lg: 8 },
        py: { xs: 6, sm: 8, md: 10 }
      }}
    >
      <Box 
        sx={{ 
          textAlign: 'center',
          maxWidth: '800px',
          mx: 'auto'
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontWeight: 600,
            color: 'text.primary',
            lineHeight: { xs: 1.1, md: 1.05 },
            mb: { xs: 2, md: 3 },
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }
          }}
        >
          <Box 
            component="span" 
            sx={{ 
              letterSpacing: '-0.02em',
              marginBottom: { xs: '0.1em', md: '0.05em' },
              display: 'block'
            }}
          >
            {isEditMode ? 'Edit with' : 'Write with'}
          </Box>
          <Box 
            component="span" 
            sx={{ 
              display: 'block',
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.03em'
            }}
          >
            Emotion
          </Box>
        </Typography>

        <Typography 
          variant="h4" 
          sx={{ 
            color: 'text.secondary',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            lineHeight: 1.4,
            mt: { xs: 1, md: 2 },
            mb: { xs: 2, md: 3 },
            fontSize: { xs: '1.375rem', sm: '1.625rem', md: '1.875rem' }
          }}
        >
{isEditMode ? 'Refine and re-analyze your thoughts' : 'Discover the feelings behind your words'}
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            fontWeight: 400,
            letterSpacing: '0.01em',
            lineHeight: 1.6,
            maxWidth: '500px',
            mx: 'auto',
            opacity: 0.8,
            fontSize: { xs: '0.9rem', md: '1rem' }
          }}
        >
          Share your thoughts and let our emotion analysis reveal the deeper meaning in your writing
        </Typography>

        <Box 
          sx={{
            width: 60,
            height: 1,
            background: (theme) => `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
            mx: 'auto',
            mt: { xs: 4, md: 5 },
            opacity: 0.3
          }}
        />
      </Box>
    </Container>
  );
};

export default WritePostHeading;