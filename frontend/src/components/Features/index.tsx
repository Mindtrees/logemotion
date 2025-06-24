import * as React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const Features = () => {
  const features = [
    {
      icon: '✍️',
      title: 'Write Posts',
      description: 'Freely record your daily life and emotions, edit anytime'
    },
    {
      icon: '💗',
      title: 'Emotion Analysis',
      description: 'AI analyzes your writing to understand your emotional state'
    },
    {
      icon: '📊',
      title: 'Visualization',
      description: 'View emotion changes at a glance with charts and graphs'
    },
    {
      icon: '🔍',
      title: 'Search & Tips',
      description: 'Easily find your posts and get personalized tips by emotion'
    }
  ];

  return (
    <Box 
      sx={{ 
        py: 10, 
        backgroundColor: 'background.section'
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '2.25rem',
            textAlign: 'center',
            mb: 8
          }}
        >
          Key Features
        </Typography>
        
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography sx={{ fontSize: '3rem', mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1.5 }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Features;