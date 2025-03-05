import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import Noticeboard from "../../assets/Interductionimages/Board.png";
import { blue, grey } from '@mui/material/colors';

const NoticeBoard = ({ eventData }) => {
  const demoEvent = [
    {
      date: "5 Mar",
      title: "Board Meeting",
      description: "Attend board meeting with company manager.",
      backgroundColor: "#fbbf24"
    },
    {
      date: "9 Mar",
      title: "Design Team Meeting",
      description: "Attend design team meeting with team mates and HOD.",
      backgroundColor: "#dc2626"
    },
    {
      date: "7 Feb",
      title: "Tech Conference",
      description: "Attend conference with teammates and other departments.",
      backgroundColor: "#f97316"
    },
    {
      date: "4 Mar",
      title: "Development Team Pitch",
      description: "Pitch idea on new development to the company board.",
      backgroundColor: "#3b82f6"
    }
  ];

  return (
    <Box className="rounded-lg" sx={{ padding: 2, backgroundColor: "Background.view", borderRadius: '12px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          color: 'white',
        }}
      >
        {/* Icon/Image Section */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box
            component="img"
            src={Noticeboard}
            alt="No job applications"
            sx={{ width: 80, height: 40 }}
          />
        </Box>

        {/* Main Text */}
        <Typography variant="h6" sx={{ marginBottom: 1, fontFamily: "sans-serif", fontSize: "13px" }}>
          No current notices!
        </Typography>
        <Typography variant="body2" sx={{ color: grey[400], marginBottom: 1, fontSize: "10px" }}>
          You do not have any current notice available.<br/> Click the button below to add new notice.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: blue[700],
            color: '#fff',
            textTransform: 'none',
            borderRadius: '8px',
            height: '30px',
            width: 'auto',
            fontSize: '10px',
            paddingX: { xs: 2, sm: 3 },
            paddingY: { xs: 1, sm: 1.5 },
            '&:hover': { backgroundColor: blue[800] },
          }}
        >
          Add Job
        </Button>
      </Box>
    </Box>
  );
};

export default NoticeBoard;
