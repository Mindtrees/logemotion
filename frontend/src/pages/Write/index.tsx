import React, { useState, useEffect } from 'react'; 
import { Container, Grid, Box, Stack } from '@mui/material';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const emotionMutation = useEmotionAnalysis();
  const { user } = useAuthState();

  // Fetch existing post data when in edit mode
  const { data: existingPost, isLoading: isPostLoading } = useGetPost(postId);

  const isLoggedIn = !!user;

  const {
    analyze, emotions, isLoading, error, reset
  } = emotionMutation;
  
  const combinedText = `${title}. ${content}`;
  
  const isEditMode = location.state?.editMode && location.state?.postData;

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
        backgroundColor: "transparent",
        minHeight: "80vh",
        width: "100vw",
        pt: 8,
        pb: 30,
        px: { xs: 0, sm: 2, md: 4, lg: 8 }
      }}
    >
      <WritePostHeading isEditMode={isEditMode} />
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
          sx={{ 
            alignItems: 'stretch',
            maxWidth: '100%',
            mx: 'auto',
            justifyContent: 'center'
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
            isEditMode={isEditMode}
            postId={postId}
            existingPost={existingPost || undefined}
          />
          
  
          <Grid 
            item 
            xs={12} 
            lg={3} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              mt: { xs: 2, lg: 0 },
      
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
                spacing={{xs: 2, sm: 2, md: 3 }}
                sx={{ height: '100%' }}
              >
                <PostAnalysis emotions={emotions} />
                <AnalysisTips emotions={emotions} />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Write;