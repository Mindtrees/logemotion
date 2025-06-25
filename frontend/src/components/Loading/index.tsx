import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        gap: 2
      }}
    >
      <CircularProgress 
        size={60}
        sx={{
          color: 'primary.main'
        }}
      />
      <Typography 
        variant="h6" 
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        Loading EmotionBlog...
      </Typography>
    </Box>
  );
};

export default Loading;