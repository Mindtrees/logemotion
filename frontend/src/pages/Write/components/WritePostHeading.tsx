import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const WritePostHeading: React.FC = () => {
  return (
    <Container 
      maxWidth="lg" 
      sx={{
        px: { xs: 2, sm: 5, md: 6, lg: 8 } 
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: { xs: 'left', md: 'left' } }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3,
                gap: 2.5
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  backgroundColor: (theme) => `${theme.palette.primary.main}1A`,
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid',
                  borderColor: (theme) => `${theme.palette.primary.main}33`,
                  boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}26`,
                }}
              >
                <EditIcon 
                  sx={{ 
                    color: 'primary.main', 
                    fontSize: (theme) => theme.typography.h3.fontSize
                  }}
                />
              </Box>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  color: 'text.primary',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}
              >
                Write
              </Typography>
            </Box>
            <Typography 
              variant="h3" 
              sx={{ 
                color: 'text.primary',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                mb: 2
              }}
            >
              Beyond the Words
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 400,
                maxWidth: '600px',
                lineHeight: 1.5,
                opacity: 0.8
              }}
            >
              Unlock the emotions hiding in your text with Emotion Analysis
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WritePostHeading;