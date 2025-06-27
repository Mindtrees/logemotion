import React, { useState, useEffect } from 'react'; 
import { Container, Grid, Box, Stack } from '@mui/material';
import { useParams } from 'react-router-dom'; 
import WritePostHeading from './components/WritePostHeading';
import WritePost from './components/WritePost';
import PostAnalysis from './components/PostAnalysis';
import AnalysisTips from './components/AnalysisTips';
import { useEmotionAnalysis } from '../../hooks/UseEmotionAnalysis';
import { useAuthState } from '../../hooks/UseLogin';
import { useGetPost } from '../../hooks/UsePost'; 
import Loading from "../../components/Loading"; 

const Write: React.FC = () => {
  const { postId } = useParams<{ postId: string }>(); // Extract postId parameter from URL
  const isEditMode = Boolean(postId); // Determine edit mode if postId exists
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const emotionMutation = useEmotionAnalysis();
  const { user } = useAuthState();

  // Fetch existing post data when in edit mode
  const { data: existingPost, isLoading: isPostLoading } = useGetPost(postId);

  const isLoggedIn = !!user;

  const {
    analyze, emotions, rawData, isLoading, error, reset
  } = emotionMutation;
  
  const combinedText = `${title}. ${content}`;

  // Initialize form with existing data in edit mode
  useEffect(() => {
    if (isEditMode && existingPost) {
      setTitle(existingPost.title || '');
      setContent(existingPost.content || '');
    }
  }, [isEditMode, existingPost]);

  if (isEditMode && isPostLoading) {
    return <Loading />;
  }

  return (
    <Box 
      sx={{
        backgroundColor: "background.section",
        minHeight: "100vh",
        width: "100vw",
        pt: 8,
        pb: 14,
        px: { xs: 2, sm: 5, md: 6, lg: 8 }
      }}
    >
      <WritePostHeading />
      <Container 
        maxWidth="lg"
        sx={{ 
          pb: { xs: 2, md: 3 },
          px: { xs: 2, sm: 5, md: 6, lg: 8 },
          position: 'relative',
          zIndex: 1
        }}
      >
        <Grid 
          container 
          spacing={{ xs: 3, sm: 4, md: 5 }}
          sx={{ 
            alignItems: 'stretch',
            maxWidth: '100%',
            mx: 'auto'
          }}
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
            emotions={emotions}
            isLoggedIn={isLoggedIn}
            // Add edit mode related props
            isEditMode={isEditMode}
            postId={postId}
            existingPost={existingPost || undefined}
          />
          
          <Grid 
            item 
            xs={12} 
            lg={4} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              mt: { xs: 2, lg: 0 },
              px: { xs: 1, sm: 2.5, md: 3 }
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