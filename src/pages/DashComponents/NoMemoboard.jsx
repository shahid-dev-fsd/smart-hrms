import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import Memoboard from "../../assets/Interductionimages/Board.png";
import { blue, grey } from '@mui/material/colors';

const Nomemoborad = ({ eventData }) => {

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
            src={Memoboard}
            alt="No job applications"
            sx={{ width: 80, height: 40 }}
          />
        </Box>

        {/* Main Text */}
        <Typography variant="h6" sx={{ marginBottom: 1, fontFamily: "sans-serif", fontSize: "13px" }}>
          No current memo!
        </Typography>
        <Typography variant="body2" sx={{ color: grey[400], marginBottom: 1, fontSize: "10px" }}>
          You do not have any current memo available.<br/> Click the button below to add new memo.
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
          Add Memo
        </Button>
      </Box>
    </Box>
  );
};

export default Nomemoborad;
