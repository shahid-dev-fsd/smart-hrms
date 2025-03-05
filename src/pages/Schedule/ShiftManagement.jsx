import React, { useState } from 'react';
import { Box, Button, Typography, IconButton, Paper, Grid, Avatar, Stack } from '@mui/material';
import Calendar from 'react-calendar'; // Calendar library
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Shiftmanagement from "../../pages/Schedule/EmployeeShift";
import CircleIcon from '@mui/icons-material/Circle'; 
import InfoIcon from '@mui/icons-material/InfoOutlined';
import Mycalander from '../Schedule/Mycalander';



const shifts = [
  { name: 'Amanda Throne', role: 'Software Developer', shift: '12AM - 8AM', type: 'Present' },
  { name: 'Amina Kumar', role: 'QA Tester', shift: '2AM - 10AM', type: 'Present' },
  { name: 'Daniel Thompson', role: 'Frontend Developer', shift: 'All day', type: 'Absent' },
  { name: 'Dave Maxwell', role: 'Frontend Developer', shift: '1AM - 9AM', type: 'Present' },
  { name: 'Yogesh Singh', role: 'QA Tester', shift: 'All day', type: 'Leave' },
];

const categories = [
  { label: 'Present', color: 'blue' },
  { label: 'Absent', color: 'orange' },
  { label: 'Leave', color: 'green' },
  { label: 'Holiday', color: 'red' },
];

const teams = [
  { role: 'Software Engineer', count: 1 },
  { role: 'QA Tester', count: 2 },
  { role: 'Frontend Developer', count: 2 },
  { role: 'Backend Developer', count: 2 },
  
];

export default function ShiftManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedShift, setSelectedShift] = useState('AM Shift');

  const handleShiftChange = (shift) => setSelectedShift(shift);

  return (

    <Box sx={{backgroundColor:'background.main',height:'88vh'}}>

<Grid sx={{marginTop:'3px'}} container alignItems='center'  >
                <Grid item xs>
                    <Typography variant='h5' color='gray' marginLeft="12px">
                        Overview
                    </Typography>
                </Grid>
                <Grid item>
                  
                </Grid>
                <Grid item>
                    <IconButton sx={{ display: { sm: 'block' } }}>
                        <InfoIcon />
                    </IconButton>
                </Grid>
                <div className='diveder'></div>
            </Grid>
    <Box display="flex" height="77vh" backgroundColor='background.default' margin="12px" borderRadius="8px" overflow="scroll">
      {/* Left Sidebar */}
      <Box width="300px" p={2} borderRight="1px solid rgba(255, 255, 255, 0.1)" marginTop="13px">
        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <Stack  direction="row" spacing={1} mb={3}>
          <Button
            variant={selectedShift === 'AM Shift' ? 'contained' : 'outlined'}
            onClick={() => handleShiftChange('AM Shift')}
          >
            AM Shift
          </Button>
          <Button
            variant={selectedShift === 'PM Shift' ? 'contained' : 'outlined'}
            onClick={() => handleShiftChange('PM Shift')}
          >
            PM Shift
          </Button>
        </Stack>
        </Box>
        <Stack  direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <IconButton color="inherit">
            <ArrowBackIosIcon sx={{height:'13px',marginRight:'-53px'}} />
          </IconButton>
          <Typography sx={{fontSize:'15px'}} variant="h6">{selectedDate.toLocaleString('default', { month: 'long' })}, {selectedDate.getFullYear()}</Typography>
          <IconButton color="inherit">
            
            <ArrowForwardIosIcon sx={{height:'13px',marginLeft:'-33px'}} />
          </IconButton>
        </Stack>
<Box container bgcolor={"black"} color="black">
        <Mycalander  bgcolor={"black"} value={selectedDate} onChange={setSelectedDate} />
      
        </Box>
      
       <Box sx={{display:'flex', justifyContent:'space-around'}}>
        <Box mt={4}>
          <Typography sx={{fontSize:"15px"}} variant="h6" gutterBottom>Categories</Typography>
          {categories.map((category) => (
            <Stack direction="row" alignItems="center" spacing={1} key={category.label} mb={1}>
              <CircleIcon style={{ color: category.color, fontSize: '12px' }} />
              <Typography sx={{fontSize:'11px'}}>{category.label}</Typography>
            </Stack>
          ))}
        </Box>

        <Box mt={4}>
          <Typography sx={{fontSize:"15px"}} variant="h6" gutterBottom>Team</Typography>
          {teams.map((team) => (
            <Stack sx={{textAlign:'right'}} direction="row" justifyContent="space-between" key={team.role} mb={1}>
              <Typography sx={{fontSize:'11px',textAlign:'right'}}>{team.role}</Typography>
              <Typography sx={{fontSize:'11px',marginLeft:'12px'}}>{team.count}</Typography>
            </Stack>
          ))}
        </Box>
        </Box>
      </Box>

      {/* Right Content */}
      <Box sx={{backgroundColor:'background.default'}} flex={1} p={3}>
        <Shiftmanagement/>
      </Box>
    </Box>
    </Box>
  );
}
