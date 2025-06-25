import React from 'react';
import { Box, Typography } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const WritePostHeading: React.FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 4,
        gap: 2 
      }}
    >
      <EditIcon 
        sx={{ 
          color: 'primary.main', 
          fontSize: '2rem' 
        }} 
      />
      <Typography 
        variant="h4" 
        component="h1"
        sx={{ 
          fontWeight: 600,
          color: 'text.primary' 
        }}
      >
        Write Post
      </Typography>
    </Box>
  );
};

export default WritePostHeading;