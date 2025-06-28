import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Stack,
  Chip,
} from '@mui/material';
import {
  CalendarToday,
  Psychology
} from '@mui/icons-material';

const ExamplePosts = () => {
  const posts = [
    {
      title: 'New Beginning',
      date: 'Jun 23, 2025',
      preview: 'Today I started a new project. I\'m excited and worried...',
      emotions: [
        { name: 'Joy', percentage: 80, color: '#FFF3B8' },
        { name: 'Worry', percentage: 40, color: '#FFB68A' },
        { name: 'Hope', percentage: 70, color: '#A8E6CF' }
      ],
      likes: 24
    },
    {
      title: 'Rainy Day Thoughts',
      date: 'Jun 18, 2025',
      preview: 'The rain reminds me of old memories. Feeling nostalgic but peaceful...',
      emotions: [
        { name: 'Nostalgia', percentage: 85, color: '#D8B7FF' },
        { name: 'Peace', percentage: 75, color: '#B3D9FF' },
        { name: 'Sadness', percentage: 30, color: '#D1D5DB' }
      ],
      likes: 18
    },
    {
      title: 'Achievement Unlocked',
      date: 'Jun 15, 2025',
      preview: 'Finally completed the marathon! Every step was worth it...',
      emotions: [
        { name: 'Pride', percentage: 95, color: '#FFF3B8' },
        { name: 'Relief', percentage: 80, color: '#A8E6CF' },
        { name: 'Exhaustion', percentage: 60, color: '#FFB3BA' }
      ],
      likes: 42
    }
  ];

  return (
    <Box sx={{ 
      py: 10, 
      backgroundColor: 'background.section'
    }}>
      <Box sx={{ maxWidth: 800, mx: 'auto', px: 3 }}>
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: '2.25rem',
              textAlign: 'center',
              mb: 2
            }}
          >
           From the Community
          </Typography>
          
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              mb: 5,
              fontWeight: 400
            }}
          >
           Explore shared experiences and connect with others. Entries are anonymous.
          </Typography>

          <Grid container spacing={4}>
            {posts.map((post, index) => (
              <Grid item xs={12} key={index}>
                <Card 
                  sx={{ 
                    width: '100%'
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                      <Typography
                        variant="h5"
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '1.4rem',
                          flex: 1
                        }}
                      >
                        {post.title}
                      </Typography>
                      
                      {/* <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Favorite sx={{ fontSize: '1.1rem', color: '#primary' }} />
                        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {post.likes}
                        </Typography>
                      </Stack> */}
                    </Stack>
                    
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <CalendarToday sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {post.date}
                      </Typography>
                    </Stack>
                    
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ 
                        mb: 2.5,
                        lineHeight: 1.5,
                        fontSize: '0.95rem'
                      }}
                    >
                      {post.preview}
                    </Typography>
                    
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                        <Psychology sx={{ fontSize: '1.1rem', color: '#ef4444' }} />
                        <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 600 }}>
                          Emotion Analysis
                        </Typography>
                      </Stack>
                      
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {post.emotions.map((emotion, emotionIndex) => (
                          <Chip
                            key={emotionIndex}
                            label={`${emotion.name} ${emotion.percentage}%`}
                            sx={{
                              backgroundColor: emotion.color,
                              color: '#000',
                              fontWeight: 600,
                              fontSize: '0.8rem',
                              py: 0.5,
                              px: 1,
                              height: 'auto'
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ExamplePosts;