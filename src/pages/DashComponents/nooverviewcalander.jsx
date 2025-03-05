import React from 'react'
import { Box, Typography, Button } from '@mui/material';
import Image from "../../components/Image";
import Boardimg from "../../assets/offerLatter/pana.png";
import { height, styled, textAlign } from '@mui/system';
import NoticeIcon from '@mui/icons-material/StickyNote2'; // Placeholder for the notice image
import { blue, grey } from '@mui/material/colors';
import offerleterr from "../../assets/Interductionimages/rafiki.png"

const nooverviewcalander = () => {
  return (
    <div>
     
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height:"auto",
      padding: 2,
    }}
    className="collapsible-main"
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
          src={offerleterr}
          alt="No job applications"
          sx={{
            width: { xs: 50, sm: 150 },
            height: { xs: 50, sm: 150 },
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
          fontSize: { xs: '13px', sm: '18px' },
        }}
      >
    No Existing Record!
      </Typography>
      <Typography
          variant="body2"
          sx={{
            color: grey[500],
            marginBottom: { xs: 3, sm: 4 },
            fontSize: { xs: '10px', sm: '15px' },
          }}
        >
     You do not currently have any employees to view their record here.<br/>
Click the button below to add employees now, or click on the plus<br/>
button beside “Total Employees”.<br/>
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
  
      
    </div>
  )
}

export default nooverviewcalander
