import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const WritePostHeading: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 5 }, px: { xs: 2, sm: 3 } }}>
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
                  backgroundColor: 'rgba(80, 70, 228, 0.1)',
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(80, 70, 228, 0.2)',
                  boxShadow: '0 8px 32px rgba(80, 70, 228, 0.15)',
                }}
              >
                <EditIcon 
                  sx={{ 
                    color: '#5046e4', 
                    fontSize: '1.75rem'
                  }}
                />
              </Box>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  color: 'text.primary',
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1
                }}
              >
                Write
              </Typography>
            </Box>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'text.primary',
                fontWeight: 600,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                mb: 2
              }}
            >
              Beyond the Words
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 400,
                maxWidth: '600px',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
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