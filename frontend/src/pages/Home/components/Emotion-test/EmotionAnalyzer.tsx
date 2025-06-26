import { useState, useEffect } from 'react';
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
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Psychology,
  TextSnippet,
  InsertEmoticon,
  Analytics,
  Save as SaveIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { useAuthContext } from '../../../../contexts/AuthContext';
import { EmotionResult } from '../../../../models';
import Button from '../../../../components/common/Button';

const EmotionAnalyzer = () => {
  const { user } = useAuthContext();
  const { 
    emotions, 
    isLoading, 
    error, 
    analyze, 
    reset,
    isSaving,
    saveError,
    saveText
  } = useEmotionAnalysis();
  
  const [inputText, setInputText] = useState('');
  const [animatedValues, setAnimatedValues] = useState<number[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [textTitle, setTextTitle] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (emotions.length > 0) {
      setAnimatedValues(new Array(emotions.length).fill(0));
      
      emotions.forEach((emotion: EmotionResult, index: number) => {
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
    setTextTitle('');
  };

  const handleSaveClick = () => {
    if (!user) {
      alert('Please login to save your analysis.');
      return;
    }
    setSaveDialogOpen(true);
  };

  const handleSaveConfirm = async () => {
    const savedId = await saveText(inputText, textTitle || undefined);
    
    if (savedId) {
      setSaveSuccess(true);
      setSaveDialogOpen(false);
      setTextTitle('');
    }
  };

  const handleSaveCancel = () => {
    setSaveDialogOpen(false);
    setTextTitle('');
  };

  const getEmotionAdvice = (emotions: EmotionResult[]) => {
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

        {saveError && (
          <Fade in={!!saveError}>
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {saveError}
            </Alert>
          </Fade>
        )}

        {emotions.length > 0 && (
          <Fade in={emotions.length > 0} timeout={500}>
            <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <CardContent sx={{ p: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <InsertEmoticon sx={{ color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Emotion Analysis Results
                    </Typography>
                  </Stack>
                  
                  {user && (
                    <Button
                      variant="outlined"
                      onClick={handleSaveClick}
                      disabled={isSaving}
                      startIcon={isSaving ? <CircularProgress size={20} /> : <SaveIcon />}
                      size="small"
                    >
                      {isSaving ? 'Saving...' : 'Save Analysis'}
                    </Button>
                  )}
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
                  {emotions.map((emotion: EmotionResult, index: number) => (
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

      <Dialog open={saveDialogOpen} onClose={handleSaveCancel} maxWidth="sm" fullWidth>
        <DialogTitle>Save Emotion Analysis</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Give your analysis a title (optional)
          </Typography>
          <TextField
            fullWidth
            label="Title"
            placeholder="e.g., Today's reflection, Work stress analysis..."
            value={textTitle}
            onChange={(e) => setTextTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Text: "{inputText.slice(0, 100)}{inputText.length > 100 ? '...' : ''}"
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleSaveCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveConfirm} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={saveSuccess}
        autoHideDuration={3000}
        onClose={() => setSaveSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSaveSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
          icon={<CheckIcon />}
        >
          Analysis saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmotionAnalyzer;

function useEmotionAnalysis(): { emotions: any; isLoading: any; error: any; analyze: any; reset: any; isSaving: any; saveError: any; saveText: any; } {
  throw new Error('Function not implemented.');
}
