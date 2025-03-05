import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, IconButton, Tooltip } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import dateIcon from "../assets/CloclIcons/ion_time-outline.png"
import timeIcon from "../assets/CloclIcons/oui_token-date.png"



export default function Clock() {
    const [time, setTime] = useState();
    const [Dates, setDate] = useState();
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        const Date1 = setInterval(() => {
            setDate(new Date().toLocaleDateString());
        }, 1000);
    
        return () => {
            clearInterval(timer);
            clearInterval(Date1);
        };
    }, []);
    
   

    return (
       

        <Grid 
          item 
          sx={{ 
            display: 'flex',  // Flex on all devices
            alignItems: 'center',
            my: 2  // Add margin on the y-axis if needed
          }}
        >
          <Box sx={{ mr: 2  }}>
            <Button>
              <img src={timeIcon} alt="time" className="h-4 w-4 mr-2"  /> {Dates}
            </Button>
          </Box>
          
          <Button sx={{ display: { lg: 'flex', xs: 'none' } }}> 
            <img src={dateIcon} alt="date" className="h-4 w-4 mr-2" /> {time}
          </Button>
          
          {/* Uncomment this section if you need a Clock In button */}
          {/* <Box sx={{ mx: 2 }}>
            <Button variant="contained">Clock In</Button>
          </Box> */}
        </Grid>
        
    );
}
