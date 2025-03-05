import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import { IoIosNotificationsOutline } from "react-icons/io";
import { keyframes } from '@emotion/react';
import Themeentire from '../style/theme';

// Swing animation using keyframes
const swing = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(15deg); }
  50% { transform: rotate(-10deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
`;

const AnimatedBell = () => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 1000); // Reset animation after 1 second
  };

  return (
    
    <Box
    
      sx={{
        
        transform: 'rotate(17deg)',
        // marginLeft: '35px',
        // marginRight: '23px',
      }}
    >
      <IconButton
      title='Notifications'
        onClick={handleClick}
        sx={{
          animation: animate ? `${swing} 1s ease-in-out` : 'none',
         
          fontSize: '25px',
        }}
      >
        <IoIosNotificationsOutline sx={{ fontSize: 'inherit' }} />
      </IconButton>
    </Box>

   
  );
};

export default AnimatedBell;
