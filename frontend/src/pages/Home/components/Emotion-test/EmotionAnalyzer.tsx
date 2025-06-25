import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  LinearProgress,
  Stack,
  Alert,
  CircularProgress,
  Fade,
  Divider,
} from '@mui/material';
import {
  Psychology,
  TextSnippet,
  InsertEmoticon,
  Analytics
} from '@mui/icons-material';
import { useEmotionAnalysis } from '../../../../hooks/UseEmotionAnalysis';
import Button from '../../../../components/common/Button';

const EmotionAnalyzer = () => {
  const { emotions, isLoading, error, analyze, reset } = useEmotionAnalysis();
  const [inputText, setInputText] = React.useState('');
  const [animatedValues, setAnimatedValues] = React.useState<number[]>([]);

  console.log(emotions)

  React.useEffect(() => {
    if (emotions.length > 0) {
      setAnimatedValues(new Array(emotions.length).fill(0));
      
      emotions.forEach((emotion, index) => {
        setTimeout(() => {
          animateBar(index, emotion.value);
        }, index * 200);
      });
    }
  }, [emotions]);

  const animateBar = (index: number, targetValue: number) => {
    let currentValue = 0;
    const increment = targetValue / 40;
    
    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      
      setAnimatedValues(prev => {
        const newValues = [...prev];
        newValues[index] = Math.round(currentValue);
        return newValues;
      });
    }, 30);
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      return;
    }
    await analyze(inputText);
  };

  const handleReset = () => {
    reset();
    setInputText('');
    setAnimatedValues([]);
  };

  const getEmotionAdvice = (emotions: any[]) => {
    if (emotions.length === 0) return '';
    
    const topEmotion = emotions[0];
    const adviceMap: { [key: string]: string } = {
      'Joy': 'Great to see positive emotions! Keep nurturing this wonderful feeling.',
      'Anger': 'It seems you\'re feeling frustrated. Take a deep breath and try to approach the situation calmly.',
      'Fear': 'I sense some anxiety in your words. Consider talking to someone you trust about your concerns.',
      'Sadness': 'Your heart seems heavy right now. Remember that it\'s natural to feel sad, and it\'s okay to seek comfort.',
      'Analytical': 'You\'re approaching things logically and systematically. This thoughtful approach will serve you well.',
      'Confident': 'Your confidence is shining through! This positive mindset will help you achieve your goals.',
      'Tentative': 'You seem a bit uncertain. Take your time to think things through - there\'s no rush to decide.'
    };
    
    return adviceMap[topEmotion.name] || 'Thank you for sharing your thoughts. Take care of yourself today.';
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Stack spacing={4}>
        <Box sx={{ textAlign: 'center' }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
            <Psychology sx={{ fontSize: '2rem', color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Emotion Analyzer
            </Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            Analyze your emotions through text and receive personalized insights.
          </Typography>
        </Box>

        <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <CardContent sx={{ p: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <TextSnippet sx={{ color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Text Input
              </Typography>
            </Stack>
            
            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder="Share your thoughts or describe how you're feeling today...

Example: Today was really challenging. The project deadline is approaching and I had to work late. Unexpected problems kept coming up, but I felt accomplished working with my team to solve each issue."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  fontSize: '1rem',
                  lineHeight: 1.6
                }
              }}
            />
            
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              {emotions.length > 0 && (
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  Reset
                </Button>
              )}
              <Button
                variant="primary"
                onClick={handleAnalyze}
                disabled={!inputText.trim() || isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <Analytics />}
              >
                {isLoading ? 'Analyzing...' : 'Analyze Emotions'}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {error && (
          <Fade in={!!error}>
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {error}
            </Alert>
          </Fade>
        )}

        {emotions.length > 0 && (
          <Fade in={emotions.length > 0} timeout={500}>
            <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                  <InsertEmoticon sx={{ color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Emotion Analysis Results
                  </Typography>
                </Stack>

                <Box sx={{ mb: 4, p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Analyzed Text:
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    "{inputText}"
                  </Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Stack spacing={3} sx={{ mb: 4 }}>
                  {emotions.map((emotion, index) => (
                    <Box key={index}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {emotion.name}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          {animatedValues[index] || 0}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={animatedValues[index] || 0}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: emotion.color,
                            borderRadius: 4,
                            transition: 'transform 0.3s ease'
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ mb: 4 }} />

                <Box sx={{ 
                  p: 3, 
                  backgroundColor: 'primary.light', 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'primary.main'
                }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Psychology sx={{ color: 'primary.main', mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Personalized Advice
                      </Typography>
                      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                        {getEmotionAdvice(emotions)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        )}
      </Stack>
    </Box>
  );
};

export default EmotionAnalyzer;