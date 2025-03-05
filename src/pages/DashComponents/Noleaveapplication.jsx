import React from 'react';
import { Box, Card, Typography, Button, Divider } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import Norecentjob from "../../assets/offerLatter/rafiki.png";
import SearchIcon from '@mui/icons-material/Search'; // Replace with your custom icon if needed
import calander from "../../assets/Interductionimages/cuate.png"

const Noleaveapplication = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      
      }}
    >
      <Box
        sx={{
          
          
          padding: '10px',
          textAlign: 'center',
          display:"flex",
          flexDirection:"column",
          alignContent:"center",
          justifyContent:"center",
         
          borderRadius: '12px',
          color: 'white',
        }}
      >
       

        {/* Icon/Image Section */}
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center" }}>
          <Box
            component="img"
            src={calander} // Replace with your actual image path
            alt="No job applications"
            sx={{ width: 100, height: 50}}
          />
        </Box>

        {/* Main Text */}
        <Typography variant="h6" sx={{  marginBottom: 1 ,fontFamily:"sans-serif",fontSize:"13px"}}>
        No Recent Leave Application!
        </Typography>
        <Typography variant="body2" sx={{ color: grey[400], marginBottom: 4,fontSize:"10px" }}>
        You do not have any recent leave applications.<br/>
When you add employees and they apply for<br/>
leaves, it will show here.
        </Typography>

        
      </Box>
    </Box>
  );
};

export default Noleaveapplication;
