import React from 'react';
import { Box } from '@mui/material';

const FloatingBox = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        color: 'red', 
        position: 'fixed', // Make it fixed to float
        top: '20px', // Adjust the vertical position as needed
        right: '20px', // Adjust the horizontal position as needed
        zIndex: 1000, // Ensure it stays above other content
        backgroundColor: 'white', // Optional background for visibility
        padding: '10px', // Optional padding for better appearance
      }}
    >
      <h1>hello</h1>
    </Box>
  );
};

export default FloatingBox;
