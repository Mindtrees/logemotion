import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  LinearProgress, 
  Stack,
} from '@mui/material';
import {
  Notes,
  Lightbulb,
  CalendarToday,
  Psychology
} from '@mui/icons-material';
import Button from '../../../../components/common/Button';

const Demo = () => {
  const navigate = useNavigate();
  const [isAnalyzed, setIsAnalyzed] = React.useState(false);
  const [displayedText, setDisplayedText] = React.useState('');
  const [displayedTitle, setDisplayedTitle] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [isTitleTyping, setIsTitleTyping] = React.useState(false);
  const [emotionValues, setEmotionValues] = React.useState([0, 0, 0, 0]);

  const titleText = "Dear my diary,";
  const fullText = "Today was a really tough day. The project deadline was approaching, so I had to work late into the night, and unexpected problems kept popping up. I felt a lot of stress, but I also felt a sense of accomplishment as I worked with my team to solve each problem. It was hard, but I feel a great sense of achievement for having made it through.";

  const emotions = [
    { name: 'Achievement', value: 79, color: '#FFF3B8' },
    { name: 'Fatigue', value: 71, color: '#FFB3BA' },
    { name: 'Stress', value: 65, color: '#FFB68A' },
    { name: 'Pride', value: 58, color: '#D8B7FF' }
  ];

  React.useEffect(() => {
    if (isTitleTyping && displayedTitle.length < titleText.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle(titleText.slice(0, displayedTitle.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else if (displayedTitle.length === titleText.length && isTitleTyping) {
      setTimeout(() => {
        setIsTyping(true);
      }, 500);
    }
  }, [displayedTitle, isTitleTyping, titleText]);

  React.useEffect(() => {
    if (isTyping && displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [displayedText, isTyping, fullText]);

  const textRef = React.useRef(null);
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isTitleTyping && displayedTitle === '') {
            setIsTitleTyping(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [isTitleTyping, displayedTitle]);

  const handleAnalyzeClick = () => {
    setIsAnalyzed(true);
    
    setTimeout(() => {
      emotions.forEach((emotion, index) => {
        setTimeout(() => {
          animateEmotionBar(index, emotion.value);
        }, index * 300);
      });
    }, 500);
  };

  const animateEmotionBar = (index: number, targetValue: number) => {
    let currentValue = 0;
    const increment = targetValue / 30;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      
      setEmotionValues(prev => {
        const newValues = [...prev];
        newValues[index] = Math.round(currentValue);
        return newValues;
      });
    }, 50);
  };

  return (
    <Box sx={{ 
      py: 10, 
      backgroundColor: 'background.section'
    }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '2.25rem',
            textAlign: 'center',
            mb: 2
          }}
        >
          How It Works
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
          A gentle space to explore your thoughts and understand your emotions.<br/> What's on your mind today?
        </Typography>

        {!isAnalyzed ? (
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Card
              ref={textRef}
              sx={{
                border: '2px solid',
                borderColor: 'primary.main',
                borderRadius: 3,
                p: 4,
                mb: 4
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 600, 
                  fontFamily: 'monospace' 
                }}>
                  {displayedTitle}
                  {isTitleTyping && displayedTitle.length < titleText.length && (
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        width: '2px',
                        height: '1.2em',
                        backgroundColor: 'primary.main',
                        animation: 'blink 1s infinite',
                        '@keyframes blink': {
                          '0%, 50%': { opacity: 1 },
                          '51%, 100%': { opacity: 0 }
                        }
                      }}
                    />
                  )}
                </Typography>
              </Stack>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                  minHeight: '120px',
                  fontFamily: 'monospace'
                }}
              >
                {displayedText}
                {isTyping && displayedText.length < fullText.length && (
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      width: '2px',
                      height: '1.2em',
                      backgroundColor: 'primary.main',
                      animation: 'blink 1s infinite',
                      '@keyframes blink': {
                        '0%, 50%': { opacity: 1 },
                        '51%, 100%': { opacity: 0 }
                      }
                    }}
                  />
                )}
              </Typography>
            </Card>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="primary"
                size="large"
                onClick={handleAnalyzeClick}
                disabled={displayedText.length < fullText.length}
              >
                Analyze
              </Button>
            </Box>
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  border: '2px solid',
                  borderColor: 'primary.main',
                  mb: 2,
                  borderRadius: 2
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Notes sx={{ fontSize: '1.5rem', color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Dear my diary,
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <CalendarToday sx={{ fontSize: '0.875rem', mr: 0.5 }} />
                        June 26, 2025
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
              
              <Button
                fullWidth
                variant="secondary"
                disabled={true}
                sx={{
                  backgroundColor: 'text.muted',
                  color: 'background.default',
                  '&:disabled': {
                    backgroundColor: 'text.muted',
                    color: 'background.default'
                  }
                }}
              >Analysis Complete!
              </Button>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card sx={{ borderRadius: 2 }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 4 }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Notes sx={{ fontSize: '1.5rem', color: 'primary.main' }} />
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Dear my diary,
                      </Typography>
                    </Stack>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {fullText}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                      <Psychology sx={{ fontSize: '1.5rem', color: 'primary' }} />
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        AI Emotion Analysis Results
                      </Typography>
                    </Stack>
                    
                    <Stack spacing={3}>
                      {emotions.map((emotion, index) => (
                        <Box key={index}>
                          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {emotion.name}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {emotionValues[index]}%
                            </Typography>
                          </Stack>
                          <LinearProgress
                            variant="determinate"
                            value={emotionValues[index]}
                            sx={{
                              transition: 'all 0.3s ease',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: emotion.color,
                                borderRadius: 6,
                                transition: 'transform 0.1s ease'
                              }
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  <Card sx={{ 
                    backgroundColor: 'background.default',
                    p: 3, 
                    borderRadius: 2
                  }}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                      <Lightbulb sx={{ fontSize: '1.5rem', color: 'primary.main' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Personalized Advice
                      </Typography>
                    </Stack>
                    <Typography variant="body1" color="text.secondary" sx={{ 
                      mb: 3, 
                      lineHeight: 1.6
                    }}>
                      Your stress and fatigue are high, but you also feel a sense of accomplishment. Make sure to get enough rest and acknowledge your efforts.
                    </Typography>
                    <Button
                      variant="primary"
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 6
                      }}
                      onClick={() => navigate('/login')}
                    >
                      Get Started
                    </Button>
                  </Card>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Demo;