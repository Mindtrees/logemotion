import React, { useState } from 'react';
import { Container, Grid, Box, Stack } from '@mui/material';
import WritePostHeading from './components/WritePostHeading';
import WritePost from './components/WritePost';
import PostAnalysis from './components/PostAnalysis';
import AnalysisTips from './components/AnalysisTips';
import { useEmotionAnalysis } from '../../hooks/useEmotionAnalysis';

const Write: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const emotionMutation = useEmotionAnalysis();

  const {
    analyze, emotions, rawData, isLoading, error, reset
  } = emotionMutation;
  
  const combinedText = `${title}. ${content}`;

  console.log(rawData);
  


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
                <PostAnalysis analysisResult={rawData} />
                <AnalysisTips analysisResult={rawData} />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Write;
