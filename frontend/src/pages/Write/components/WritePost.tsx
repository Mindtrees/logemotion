import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  Paper,
  Stack
} from '@mui/material';
import { 
  Analytics as AnalyticsIcon, 
  Save as SaveIcon 
} from '@mui/icons-material';
import { PostAnalysisRequest } from '../../../models';

interface WritePostProps {
  onAnalyzeEmotions: (title: string, content: string) => void;
  onSave: (title: string, content: string) => void;
}

const WritePost: React.FC<WritePostProps> = ({ onAnalyzeEmotions, onSave }) => {
  const [formData, setFormData] = useState<PostAnalysisRequest>({
    title: '',
    content: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAnalyzeEmotions = () => {
    if (formData.title.trim() && formData.content.trim()) {
      onAnalyzeEmotions(formData.title, formData.content);
    }
  };

  const handleSave = () => {
    if (formData.title.trim() && formData.content.trim()) {
      onSave(formData.title, formData.content);
    }
  };

  const isFormValid = formData.title.trim() && formData.content.trim();

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        backgroundColor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        sx={{ 
          mb: 3, 
          fontWeight: 700,
          color: 'text.primary'
        }}
      >
        Write New Post
      </Typography>
      
      <Stack spacing={3}>
        <Box>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 1, 
              fontWeight: 500,
              color: 'text.secondary'
            }}
          >
            Title
          </Typography>
          <TextField
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your post title"
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 1, 
              fontWeight: 500,
              color: 'text.secondary'
            }}
          >
            Content
          </Typography>
          <TextField
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Share your thoughts and emotions..."
            multiline
            rows={12}
            fullWidth
            variant="outlined"
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                height: '100%',
              },
              '& .MuiOutlinedInput-input': {
                height: '100% !important',
                overflow: 'auto !important'
              }
            }}
          />
        </Box>

        <Stack 
          direction="row" 
          spacing={2} 
          sx={{ 
            justifyContent: 'flex-end',
            pt: 2 
          }}
        >
          <Button
            variant="contained"
            startIcon={<AnalyticsIcon />}
            onClick={handleAnalyzeEmotions}
            disabled={!isFormValid}
            sx={{
              textTransform: 'none',
              px: 3,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Analyze Emotions
          </Button>
          
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={!isFormValid}
            sx={{
              textTransform: 'none',
              px: 3,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default WritePost;