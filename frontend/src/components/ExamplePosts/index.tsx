import * as React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Rating,
  Stack
} from '@mui/material';

const ExamplePosts = () => {
  const testimonials = [
    {
      name: 'Minji Kim',
      role: 'Office Worker',
      content: 'By recording my emotions every day, I\'ve come to understand my heart better. I was also surprised that the AI analysis results were so accurate!',
      avatar: '👩‍💼'
    },
    {
      name: 'Junho Lee',
      role: 'College Student',
      content: 'It\'s really helping me manage stress. The tips for each emotion are practical and easy to follow, which is great.',
      avatar: '👨‍🎓'
    },
    {
      name: 'Seoyeon Park',
      role: 'Freelancer',
      content: 'I\'ve developed a habit of organizing my day through writing. It\'s amazing to see emotional changes visually!',
      avatar: '👩‍💻'
    }
  ];

  return (
    <Box sx={{ 
      py: 10, 
      backgroundColor: 'background.section'
    }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: '2.25rem',
              textAlign: 'center',
              mb: 2
            }}
          >
            User Testimonials
          </Typography>
          
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              mb: 8,
              fontWeight: 400
            }}
          >
            See what changes real users have experienced through EmotionBlog
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                        mb: 3
                      }}
                      color="text.secondary"
                    >
                      "{testimonial.content}"
                    </Typography>
                    
                    <Rating
                      value={5}
                      readOnly
                      sx={{
                        mb: 2,
                        '& .MuiRating-iconFilled': {
                          color: '#fbbf24'
                        }
                      }}
                    />
                    
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography sx={{ fontSize: '2rem' }}>
                        {testimonial.avatar}
                      </Typography>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Stack>
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