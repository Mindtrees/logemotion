import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Stack,
  Grid,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Emotions } from '../../../models';
import { useAuthState } from '../../../hooks/UseLogin'; 
import { useAddDocument } from '../../../hooks/UseAddDocument';

interface WritePostProps {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  combinedText: string;
  loading: boolean;
  error: Error | null;
  analyzeText: (text: string) => void;
  reset: () => void;
  emotions: Emotions[];
  isLoggedIn: boolean;
}

const AppleTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: 16,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)',
      borderColor: 'rgba(80, 70, 228, 0.3)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 16px 48px rgba(80, 70, 228, 0.15)',
      borderColor: '#5046e4',
    },
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputBase-input': {
    fontSize: '1rem',
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.87)',
    '&::placeholder': {
      color: 'rgba(0, 0, 0, 0.4)',
      opacity: 1,
    },
  },
}));

const WritePost: React.FC<WritePostProps> = ({ 
  title, 
  content, 
  setTitle, 
  setContent, 
  combinedText,
  loading,
  error,
  analyzeText,
  reset,
  emotions,
  isLoggedIn,
}) => {
  const { user } = useAuthState();
  const [hasBeenAnalyzed, setHasBeenAnalyzed] = useState(false);
  const [showLoginWarning, setShowLoginWarning] = useState(false);
  const addPostMutation = useAddDocument();

  const handleSave = async () => {
    if (!user || !emotions) {
      console.error('User not authenticated or no emotion analysis data');
      return;
    }

    try {
  
      const emotionAnalysis = emotions.map(emotion => ({
        color: emotion.color || '#CCCCCC', 
        name: emotion.name,
        value: emotion.value || 0 
      })) || [];

      const postData = {
        content: content.trim(),
        title: title.trim() || 'Untitled Post', 
        userEmail: user.email || '',
        userId: user.uid || '',
        emotionAnalysis
      };

      await addPostMutation.addDocument(postData);
      

      console.log('Post saved successfully!');
      
      handleReset();
      
    } catch (error) {
      console.error('Failed to save post:', error);

    }
  };

  const handleAnalyze = () => {
    if (!isLoggedIn) {
      setShowLoginWarning(true);
      return;
    }
    if (!combinedText.trim()) return;
    setHasBeenAnalyzed(true);
    analyzeText(combinedText);
  };

  const handleReset = () => {
    setHasBeenAnalyzed(false);
    setShowLoginWarning(false);
    reset();
    setTitle('');
    setContent('');
  };

  const handleInputFocus = () => {
    if (!isLoggedIn) {
      setShowLoginWarning(true);
    }
  };

  const handleTitleChange = (value: string) => {
    if (!isLoggedIn) {
      setShowLoginWarning(true);
      return;
    }
    setTitle(value);
  };

  const handleContentChange = (value: string) => {
    if (!isLoggedIn) {
      setShowLoginWarning(true);
      return;
    }
    setContent(value);
  };

  const isFormValid = content.trim() && title.trim();
  const hasAnalysisData = emotions && emotions.length > 0;
  const canSave = isFormValid && hasAnalysisData && user;
  const isSaving = addPostMutation.isLoading;

  return (
    <Grid 
      item 
      xs={12} 
      lg={8}
      sx={{ 
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 3, sm: 4, md: 5 }, 
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
          height: '100%',
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 4, 
            fontWeight: 700,
            color: 'text.primary',
            fontSize: { xs: '1.5rem', md: '1.75rem' },
            letterSpacing: '-0.01em'
          }}
        >
          Write New Post
        </Typography>
        
        <Stack spacing={4} sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {error && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {error.message}
            </Alert>
          )}

          {showLoginWarning && (
            <Alert severity="warning" sx={{ borderRadius: 2 }}>
              Please login to analyze your emotions.
            </Alert>
          )}
          
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 2, 
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '1rem'
              }}
            >
              Title
            </Typography>
            <AppleTextField
              name="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Enter your post title"
              required
              fullWidth
              variant="outlined"
            />
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 2, 
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '1rem'
              }}
            >
              Content
            </Typography>
            <AppleTextField
              name="content"
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Share your thoughts and emotions..."
              required
              multiline
              fullWidth
              variant="outlined"
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                '& .MuiOutlinedInput-root': {
                  height: '100%',
                  alignItems: 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  paddingRight: '90px !important', 
                },
                '& .MuiInputBase-inputMultiline': {
                  flex: 1,
                  height: '100% !important',
                  overflow: 'auto !important',
                  resize: 'none',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  padding: '40px !important',
                  paddingRight: '60px !important', 
                }
              }}
              InputProps={{
                sx: {
                  height: '100%',
                  alignItems: 'flex-start',
                  padding: 0
                }
              }}
            />
          </Box>

          <Stack 
            direction="row" 
            spacing={3} 
            sx={{ 
              justifyContent: 'flex-end',
              pt: 2,
              flexShrink: 0
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={hasBeenAnalyzed ? <RefreshIcon /> : <AnalyticsIcon />}
              onClick={hasBeenAnalyzed ? handleReset : handleAnalyze}
              disabled={(!isFormValid && !hasBeenAnalyzed) || loading}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                py: 1.75,
                px: 5,
                borderRadius: 1,
                fontSize: '1rem',
                minWidth: '200px',
                backgroundColor: hasBeenAnalyzed ? '#5046e4' : '#1c1c1e',
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: hasBeenAnalyzed ? '#3832a0' : '#2c2c2e',
                  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-1px)',
                },
                '&:active': {
                  transform: 'translateY(0px)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                },
                '&:disabled': {
                  backgroundColor: 'rgba(28, 28, 30, 0.3)',
                  color: 'rgba(255, 255, 255, 0.3)',
                  boxShadow: 'none',
                  transform: 'none',
                }
              }}
            >
              {loading ? 'Analyzing...' : hasBeenAnalyzed ? 'Reset' : 'Analyze Emotions'}
            </Button>
            
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={!isFormValid}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                py: 1.75,
                px: 5,
                borderRadius: 1,
                fontSize: '1rem',
                minWidth: '140px',
                backgroundColor: 'white',
                color: '#1c1c1e',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: '#f8f8f8',
                  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.12)',
                  transform: 'translateY(-1px)',
                  borderColor: 'rgba(0, 0, 0, 0.15)',
                },
                '&:active': {
                  transform: 'translateY(0px)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                },
                '&:disabled': {
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  color: 'rgba(28, 28, 30, 0.3)',
                  borderColor: 'rgba(0, 0, 0, 0.05)',
                  boxShadow: 'none',
                  transform: 'none',
                }
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default WritePost;