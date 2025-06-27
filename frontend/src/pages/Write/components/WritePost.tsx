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
import { useNavigate } from 'react-router-dom';
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

const InputTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.elevated,
    backdropFilter: 'blur(20px)',
    borderRadius: 16,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: `0 8px 32px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(0, 0, 0, 0.2)'}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 12px 40px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.3)'}`,
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: `0 16px 48px ${theme.palette.primary.main}30`,
      borderColor: theme.palette.primary.main,
    },
    '& fieldset': {
      border: 'none',
    },
  },
      '& .MuiInputBase-input': {
      fontSize: theme.typography.body1.fontSize,
      fontWeight: 500,
      color: theme.palette.text.primary,
      '&::placeholder': {
        color: theme.palette.text.secondary,
        opacity: 0.7,
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
  const navigate = useNavigate();
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
        color: emotion.color || 'text.muted', 
        name: emotion.name,
        value: emotion.value,
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
      

      navigate('/my-posts');
      
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
          backgroundColor: 'background.elevated',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: (theme) => `0 20px 60px ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.3)'}`,
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
            mb: { xs: 2, sm: 2.5, md: 3 }, 
            fontWeight: 700,
            color: 'text.primary',
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
                color: 'text.primary'
              }}
            >
              Title
            </Typography>
            <InputTextField
              name="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Enter your post title"
              required
              fullWidth
              variant="outlined"
              disabled={hasBeenAnalyzed}
            />
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 2, 
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              Content
            </Typography>
            <InputTextField
              name="content"
              value={content}
              onChange={(e) => handleContentChange(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Share your thoughts and emotions..."
              required
              multiline
              fullWidth
              variant="outlined"
              disabled={hasBeenAnalyzed}
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
                  fontSize: (theme) => theme.typography.body1.fontSize,
                  lineHeight: 1.6,
                  padding: '40px !important',
                  paddingRight: '60px !important',
                  scrollbarWidth: 'none', // Firefox
                  '&::-webkit-scrollbar': {
                    display: 'none', // Chrome, Safari, Edge
                  },
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
                fontSize: (theme) => theme.typography.body1.fontSize,
                minWidth: '200px',
                backgroundColor: (theme) => hasBeenAnalyzed ? theme.palette.primary.main : theme.palette.text.primary,
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: (theme) => hasBeenAnalyzed ? theme.palette.primary.dark : theme.palette.text.secondary,
                  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-1px)',
                },
                '&:active': {
                  transform: 'translateY(0px)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                },
                '&:disabled': {
                  backgroundColor: 'action.disabled',
                  color: 'text.disabled',
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
                fontSize: (theme) => theme.typography.body1.fontSize,
                minWidth: '140px',
                backgroundColor: 'background.paper',
                color: 'text.primary',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'background.default',
                  boxShadow: '0 6px 25px rgba(0, 0, 0, 0.12)',
                  transform: 'translateY(-1px)',
                  borderColor: 'divider',
                },
                '&:active': {
                  transform: 'translateY(0px)',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                },
                '&:disabled': {
                  backgroundColor: 'action.hover',
                  color: 'text.disabled',
                  borderColor: 'action.disabled',
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