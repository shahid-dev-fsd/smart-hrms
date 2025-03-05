import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import Norecentjob from "../../assets/offerLatter/rafiki.png";

const NoRecentJobApplication = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height:"auto",
        padding: 2,
      }}
    >
      <Box
        sx={{
          padding: { xs: 2, sm: 4 },
          textAlign: 'center',
          borderRadius: '12px',
          backgroundColor: "Background.view",
          color: 'text.primary',
        }}
      >
        {/* Icon/Image Section */}
        <Box sx={{ my: { xs: 2, sm: 4 } }}>
          <Box
            component="img"
            src={Norecentjob}
            alt="No job applications"
            sx={{
              width: { xs: 150, sm: 200 },
              height: { xs: 100, sm: 150 },
              mx: 'auto',
            }}
          />
        </Box>

        {/* Main Text */}
        <Typography
          variant="h6"
          sx={{
            marginBottom: 1,
            fontFamily: 'sans-serif',
            fontSize: { xs: '13px', sm: '13px' },
          }}
        >
          No Recent Job Application!
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: grey[500],
            marginBottom: { xs: 3, sm: 4 },
            fontSize: { xs: '10px', sm: '10px' },
          }}
        >
          You have no recent job applications yet.<br/>
          Click on the button below to create jobs for people to apply.
        </Typography>

        {/* Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: blue[700],
            color: '#fff',
            textTransform: 'none',
            borderRadius: '8px',
            height:"30px",
            width:"auto",
            fontSize: '10px',
            paddingX: { xs: 2, sm: 3 },
            paddingY: { xs: 1, sm: 1.5 },
            '&:hover': { backgroundColor: blue[800] },
          }}
        >
          Create Job
        </Button>
      </Box>
    </Box>
  );
};

export default NoRecentJobApplication;
