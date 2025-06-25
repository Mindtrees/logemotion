import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import {
  Edit,
  Psychology,
  Analytics,
  SearchOff as Search
} from '@mui/icons-material';

const Features = () => {
  const features = [
    {
      icon: <Edit />,
      title: 'Write Posts',
      description: 'Freely record your daily life and emotions, edit anytime'
    },
    {
      icon: <Psychology />,
      title: 'Emotion Analysis',
      description: 'AI analyzes your writing to understand your emotional state'
    },
    {
      icon: <Analytics />,
      title: 'Visualization',
      description: 'View emotion changes at a glance with charts and graphs'
    },
    {
      icon: <Search />,
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
            mb:2
          }}
        >
          Key Features
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{textAlign: 'center', mb: 5, lineHeight: 1.6}}>
            Discover the core features designed to nurture your emotional well-being and foster self-understanding.
        </Typography>
        
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                      '& .MuiSvgIcon-root': {
                        fontSize: '3rem',
                        color: 'primary.main'
                      }
                    }}
                  >
                    {feature.icon}
                  </Box>
                  
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