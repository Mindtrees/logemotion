import { Box, Typography, Stack } from '@mui/material';
import Button from '../common/Button';

const Hero = () => {
  return (
    <Box
      sx={{
        background: 'background.hero',
        py: 10,
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '3rem' },
            mb: 2,
            lineHeight: 1.2
          }}
        >
          Record and Analyze Your Emotions
        </Typography>
        
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            fontSize: '1.125rem',
            mb: 4,
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          Understand your mind with AI-powered emotion analysis and receive personalized tips
        </Typography>
        
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="primary" size="large">
            Get Started
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Hero;