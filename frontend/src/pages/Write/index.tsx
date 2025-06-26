import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Stack } from '@mui/material';
import WritePostHeading from './components/WritePostHeading';
import WritePost from './components/WritePost';
import PostAnalysis from './components/PostAnalysis';
import AnalysisTips from './components/AnalysisTips';
import { useEmotionAnalysis } from '../../hooks/UseEmotionAnalysis';
import { useMutation } from "@tanstack/react-query";
import { SavePost } from '../../api/postApi';
import { useAuthState } from '../../hooks/UseLogin';
import { CreatePostData } from '../../models';

const Write: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const emotionMutation = useEmotionAnalysis();
  const { user } = useAuthState();

  // Direct save post mutation
  const savePostMutation = useMutation({
    mutationFn: (data: { title: string; content: string; emotionAnalysis?: any }) => {
      if (!user) {
        throw new Error("Please login first");
      }

      const postData: CreatePostData = {
        title: data.title,
        content: data.content,
        userId: user.uid,
        userEmail: user.email || '',
        emotionAnalysis: data.emotionAnalysis,
      };

      return SavePost(postData);
    },
    onSuccess: (postId) => {
      console.log("Post saved successfully with ID:", postId);
    },
    onError: (error) => {
      console.error("Failed to save post:", error);
    },
  });

  const {
    analyze, emotions, rawData, isLoading, error, reset
  } = emotionMutation;
  
  const combinedText = `${title}. ${content}`;

  // Reset form after successful save
  useEffect(() => {
    if (savePostMutation.isSuccess) {
      setTitle('');
      setContent('');
      reset();
      setTimeout(() => {
        savePostMutation.reset();
      }, 3000); // Clear success message after 3 seconds
    }
  }, [savePostMutation.isSuccess, reset, savePostMutation]);

  return (
    <Box 
      sx={{
        backgroundColor: "background.section",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <WritePostHeading />
      <Container 
        maxWidth="xl" 
        sx={{ 
          pb: { xs: 2, md: 3 },
          px: { xs: 2, sm: 3 },
          position: 'relative',
          zIndex: 1
        }}
      >
        <Grid 
          container 
          spacing={{ xs: 3, md: 4 }}
          sx={{ alignItems: 'stretch' }}
        >
          <WritePost
            title={title}
            content={content}
            setTitle={setTitle}
            setContent={setContent}
            combinedText={combinedText}
            loading={isLoading}
            error={error}
            analyzeText={analyze}
            reset={reset}
            rawData={rawData}
            emotions={emotions}
            savePost={savePostMutation.mutate}
            isSaving={savePostMutation.isPending}
            saveError={savePostMutation.error}
            saveSuccess={savePostMutation.isSuccess}
          />
          
          <Grid 
            item 
            xs={12} 
            lg={4} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              mt: { xs: 2, lg: 0 }
            }}
          >
            <Box 
              sx={{ 
                position: { xs: 'relative', lg: 'sticky' },
                top: { lg: 24 }, 
                height: 'fit-content', 
                display: 'flex', 
                flexDirection: 'column', 
                flex: 1 
              }}
            >
              <Stack 
                spacing={{ xs: 2, sm: 2.5, md: 3 }}
                sx={{ height: '100%' }}
              >
                <PostAnalysis emotions={emotions} />
                <AnalysisTips emotions={emotions} analysisResult={null} />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Write;