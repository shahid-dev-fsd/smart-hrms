import React, { useState } from 'react';
import { Box, Stack, Typography, Button, Paper, Grid, Avatar, useMediaQuery,IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Sectionwisereport from '../Schedule/reports/WeekReport';
import 'react-calendar/dist/Calendar.css';

import hrimage2 from '../../assets/Interductionimages/Vector-2.png';
import hrimage3 from '../../assets/Interductionimages/Vector-3.png';
import hrimage4 from '../../assets/Interductionimages/Vector.png';
import hrimage1 from '../../assets/Interductionimages/Vector-1.png';
import useExpandCollapse from '../../hooks/useExpandCollapse';
import useFullscreenExpand from '../../hooks/useFullscreenExpand';
import minimizeicon from "../../assets/Interductionimages/expand.png"
import maximizeicon from "../../assets/Interductionimages/maximize.png"
import ShiftManagement from "../Schedule/ShiftManagement"
import Mycalander from './Mycalander';
import CircleIcon from '@mui/icons-material/Circle'; 
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Nooverviewcalander from "../DashComponents/nooverviewcalander"
const roleCounts = {
  'Software-Engineer': 1,
  'QA-Tester': 2,
  // 'Frontend-Developer': 2,
  // 'Backend-Developer': 2,
  // 'UI/UX-Designer': 1,
};



// Sample shift data
const shifts = [
  { name: 'Amanda Throne', role: 'Software-Engineer', type: 'Present', shift: { start: 1, end: 8 }, color: '#3767B1', },
  { name: 'Amina Kumar', role: 'QA Tester', type: 'Present', shift: { start: 2, end: 10 }, color: '#3767B1' },
  { name: 'Daniel Thompson', role: 'Frontend Developer', type: 'Daniel Absent', shift: { start: 0, end: 24 }, color: 'orange' },
  { name: 'Dave Maxwell', role: 'Frontend Developer', type: 'Present', shift: { start: 1, end: 9 }, color: '#3767B1' },
  { name: 'Dwayne Graham', role: 'Backend Developer', type: 'Present', shift: { start: 4, end: 11 }, color: '#3767B1' },
  { name: 'Rashid Ahmed', role: 'Backend Developer', type: 'Present', shift: { start: 8, end: 17 }, color: '#3767B1' },
  { name: 'Yogesh Singh', role: 'UI/UX Designer', type: 'Holiday', shift: { start: 0, end: 24 }, color: '#8A2BE2' },
];

const shiftStatusColors = {
  Present: '#3767B1',
  Absent: 'orange',
  Leave: 'green',
  Holiday: '#8A2BE2',
};

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

const EmployeeShift = () => {
  //useExpandCollapse();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('Daily');
  const [shift, setShift] = useState('AM Shift');
  const [isHovered, setIsHovered] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(true);
 
  const [selectedShift, setSelectedShift] = useState('AM Shift');

const handleShiftChange = (shift) => setSelectedShift(shift);

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleToggle = () => setIsMinimized(!isMinimized);


const handleToggleMaximize = () => setIsMaximized(!isMaximized);
  

  const handlePrevious = () => {
    if (view === 'Daily') setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)));
    if (view === 'Weekly') setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)));
    if (view === 'Monthly') setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)));
  };

  const handleNext = () => {
    if (view === 'Daily') setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
    if (view === 'Weekly') setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)));
    if (view === 'Monthly') setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)));
  };

  const timeSlots = Array.from({ length: 12 }, (_, i) => `${i % 12 || 12}${i < 12 ? 'AM' : 'PM'}`);

  const renderShifts = () => {
    if (view === 'Daily') {
      return shifts.map((shift) => (
        <Grid container spacing={1} key={shift.name} alignItems="center" mb={2}>
          {Array.from({ length: shift.shift.start }).map((_, i) => (
            <Grid item xs={1} key={i} />
          ))}
          <Grid item xs={shift.shift.end - shift.shift.start}>
          <Box
  bgcolor={shift.color}
  color="white"
  borderRadius="5px"
  textAlign="start"
  marginTop={isMobile ? "10px" : isMaximized?"-8px":""}
  marginBottom={isMobile ? "-12px" : ""}

  padding={isMobile ? "2px" : "5px"}
  height={
    isMobile
      ? "15px" // Height for mobile
      : isMaximized
      ? "26px" // Height for desktop maximized
      : "35px" // Height for desktop not maximized
  }
  width={
    isMobile
      ? "100px" // Width for mobile
      : isMaximized
      ? "auto" // Width for desktop maximized
      : "100%" // Width for desktop not maximized
  }
  sx={{
    fontSize: isMobile
      ? "10px" // Font size for mobile
      : isMaximized
      ? "10px" // Font size for desktop maximized
      : "14px", // Font size for desktop not maximized
  }}
>



              {shift.type === 'Present' ? `${shift.shift.start}AM - ${shift.shift.end}AM` : shift.type}
            </Box>
          </Grid>
          {Array.from({ length: 12 - shift.shift.end }).map((_, i) => (
            <Grid item xs={1} key={i} />
          ))}
        </Grid>
      ));
    }

    if (view === 'Weekly') {
      return (
        <Grid container>
          <Grid item xs={12}>

          </Grid>
        </Grid>
      );
    }

    if (view === 'Monthly') {
      return (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" align="center" mt={5}>
              Monthly Report Coming Soon...
            </Typography>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Box sx={{ borderRadius: '9px', height: 'auto', backgroundColor: 'background.default', marginTop: "-10px" }} p={isMobile ? 1.5 : 0.5} className="expandable-div">
      {isMobile ? (<div> <div className="flex flex-row  justify-between w-full p-3 mt-[-10px] mb-1 mt-2 collapsible-main">
        <h6 className=" text-[13px] md:text-left md:mb-0 ml-[-10px]">Overview Calendar</h6>
        <div className={`flex  gap-[20px] md:gap-4 items-center ml-10px `}>
        <div
  style={{ position: "relative", display: "inline-block" }}
  onMouseEnter={() => setIsHovered(isMinimized ? "expand" : "minimize")}
  onMouseLeave={() => setIsHovered(null)}
  onClick={handleToggle} // Unique class for the toggle button
>
  {isMinimized ? (
    <img src={hrimage4} alt="expand" className="h-3 w-3 collapse-div" />
  ) : (
    <img src={minimizeicon} alt="minimize" className="h-3 w-3 collapse-div " />
  )}

  {(isHovered === "minimize" || isHovered === "expand") && (
    <div
      style={{
        position: "absolute",
        top: "-28px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#2f456c",
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "3px",
        fontSize: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        whiteSpace: "nowrap",
      }}
    >
      {isMinimized ? "expand" : "Minimize"}
    </div>
  )}
</div>
          <img src={hrimage2} alt="Vector 2" className="w-3 h-3 text-gray-500" />
        
          {isMobile && (<img src={hrimage3} alt="Vector 4" className="w-3 h-3 text-gray-500" />)}

        </div>
      </div>
      <div className='collapsible-div'>
        <div className='flex flex-row justify-between items-center w-full mb-2'>
          <Stack direction="row" alignItems="center" spacing={1} mb="20px">
            <Box
              sx={{
                bgcolor: 'transparent', // Background color
                color: 'white',
                border: "1px solid grey", // Border with 1px solid grey
                borderRadius: '4px', // Adjusted to add rounded corners if needed
                width: 30,
                height: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
                mr: 1,
              }}
            >
              {selectedDate.getDate()} {/* Displays the day of the month */}
            </Box>
            <Typography variant="h6" sx={{ fontSize: isMobile ? '10px' : '12px', fontWeight: 'bold' }}>
              {view === 'Daily'
                ? selectedDate.toLocaleDateString('en-US', { month: 'long' })
                : view === 'Weekly'
                  ? `Week of ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                  : selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </Typography>

            {/* <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '4px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              height: '25px',
              marginTop:'-20px' 
            }}
          >
            {/* <Typography variant="button" sx={{ fontSize: '10px', fontWeight: '100' ,}}>
              Today
            </Typography> */}
            {/*</Box> */}

            {/* <ArrowBackIosNewIcon onClick={handlePrevious} sx={{ cursor: 'pointer', color: 'gray', fontSize: '13px',marginTop:'-20px'  }} />
          <ArrowForwardIosIcon onClick={handleNext} sx={{ cursor: 'pointer', color: 'gray', fontSize: '13px',marginTop:'-20px'  }} /> */}
          </Stack>
          {isMobile && (
            <Stack direction="row" alignItems="flex-end" justifyContent="between" spacing={1} sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <Button
                sx={{ fontSize: '10px', height: "30px", width: "auto" }}
                variant={shift === 'AM Shift' ? 'contained' : 'outlined'}
                onClick={() => setShift('AM Shift')}
              >
                AM Shift
              </Button>
              <Button
                sx={{ fontSize: '10px', height: "30px", width: "auto" }}
                variant={shift === 'PM Shift' ? 'contained' : 'outlined'}
                onClick={() => setShift('PM Shift')}
              >
                PM Shift
              </Button>
            </Stack>
          )}
        </div>
        <div className="flex" >
          <Box display="flex" alignItems="center" marginBottom="10px">
            {/* Date in blue box */}
            <Typography
              sx={{
                color: 'gray',
                fontSize: '12px',
                fontWeight: 'bold',
                marginRight: "20px",
              }}
            >
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3)}
            </Typography>
            <Box
              sx={{
                bgcolor: '#3767B1', // Blue background
                color: 'white',
                borderRadius: "10px",
                width: 30,
                height: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
                mr: 1,
              }}
            >
              {selectedDate.getDate()} {/* Displays the day of the month */}
            </Box>

            {/* Day in gray */}

          </Box>
          <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
            {Object.entries(roleCounts).map(([role, count]) => (
              <Box key={role} sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Circle displaying the count */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#3767B1',
                    color: 'white',
                    borderRadius: '50%',
                    width: 10,
                    height: 10,
                    fontSize: '8px',
                    mr: 1,

                  }}
                >

                  {count}
                </Box>
                {/* Role label */}
                <Typography sx={{ fontSize: '10px', whiteSpace: 'wrap' }}>
                  {role}
                </Typography>
              </Box>
            ))}
          </Box>

      </div>

      <div className='collapsible-div'>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-start"
          mb={1.5}
         // mt={-5}
          sx={{ display: { xs: 'none', sm: 'flex' } }} // Hide on mobile

        >
          <Button sx={{ fontSize: '10px' }} variant={shift === 'AM Shift' ? 'contained' : 'outlined'} onClick={() => setShift('AM Shift')}>
            AM Shift
          </Button>
          <Button sx={{ fontSize: '10px' }} variant={shift === 'PM Shift' ? 'contained' : 'outlined'} onClick={() => setShift('PM Shift')}>
            PM Shift
          </Button>

          {/* Role Indicators */}
          <Box sx={{ display: 'flex', gap: 2, ml: 5 }}>
            {Object.entries(roleCounts).map(([role, count]) => (
              <Box key={role} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#3767B1',
                    color: 'white',
                    borderRadius: '50%',
                    width: 16,
                    height: 16,
                    fontSize: '10px',
                    mr: 1,
                    flexWrap: "nowrap"
                  }}
                >
                  {count}
                </Box>
                <Typography sx={{ fontSize: '10px' }}>{role}</Typography>
              </Box>
            ))}
          </Box>
        </Stack>




        <Box >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'row' },
              width: '100%',
            }}
          >
            {/* Employee List Section */}
            <Box sx={{ flex: { xs: '1', sm: '0 0 25%' }, p: { xs: 2, sm: 2 } }}>
              <Typography
                sx={{
                  fontSize: { xs: '13px', sm: '13px' },
                  mt: { xs: 0, sm: '-20px' },
                  ml: { xs: '-10px', sm: 0 }
                }}
                variant="h6"
                mb={1}
              >
                Employees
              </Typography>
              {shifts.map((shift) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  key={shift.name}
                  mb={-0.5}
                  sx={{ ml: { xs: '-10px', sm: 0 } }}
                >
                  <Avatar
                    alt={shift.name}
                    src={`https://i.pravatar.cc/150?u=${shift.name}`}
                    sx={{
                      height: { xs: '18px', sm: '20px' },
                      width: { xs: '18px', sm: '20px' }
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '10px', sm: '10px' },
                        mb: { xs: '-10px', sm: '-5px' },
                        mt: '2px',
                        flexWrap: 'nowrap'
                      }}
                    >
                      {shift.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: '10px', sm: '10px' },
                        flexWrap: 'nowrap'
                      }}
                    >
                      {shift.role}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Box>

            {/* Shift Timing Section */}
            <Box sx={{ flex: { xs: '1', sm: '0 0 75%' }, p: { xs: 1, sm: 2 } }}>
              {view === 'Daily' && (
                <Box sx={{ display: 'flex', flexWrap: 'nowrap', mb: { xs: 1, sm: 2 }, mt: { xs: -1, sm: -3.5 } }}>
                  {timeSlots.map((time) => (
                    <Box
                      key={time}
                      sx={{ flex: '1 1 8.33%', textAlign: 'center' }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ fontSize: { xs: '10px', sm: '10px' }, ml: { xs: "-20px" } }}
                      >
                        {isMobile ? time.replace(/\D/g, '') : time} {/* Only shows the number in mobile mode */}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
              {renderShifts()}
            </Box>

          </Box>




          <Box sx={{ display: 'flex', alignItems: 'center', fontSize:"10px", marginTop: isMobile ? "10px" : '-5px', }}>
            {Object.entries(shiftStatusColors).map(([status, color]) => (
              <Box key={status} sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <Box
                  sx={{
                    backgroundColor: color,
                    borderRadius: '50%',
                    width: 10,
                    height: 10,
                    mr: 1,
                  }}
                />
                <Typography variant="caption">{status}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </div>
        </div>

      </div>

      ) :
      <div className="collapsible-main custom-mb-[-50] p-10px">
        <Stack
          direction={isMobile ? 'row' : 'row'}
          justifyContent="space-between"
          alignItems="center"
          pt={7}
        
          
        >
          <Typography sx={{ fontSize: isMobile ? '15px' : '13px', marginTop: '-60px' }}>Overview Calendar</Typography>

          {/* Date Display */}
          <Stack direction="row" alignItems="center" spacing={1} marginTop="-60px" >
            {/* Date and Day */}
            <Box display="none" alignItems="center" >
              {/* Date in blue box */}
              <Box
                sx={{
                  bgcolor: '#3767B1', // Blue background
                  color: 'white',
                  borderRadius: "10px",
                  width: 30,
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '12px',
                  mr: 1,
                }}
              >
                {selectedDate.getDate()} {/* Displays the day of the month */}
              </Box>

              {/* Day in gray */}
              <Typography
                sx={{
                  color: 'gray',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
              </Typography>
            </Box>

            {/* Date range or view type */}
           <Typography variant="h6" sx={{ fontSize: isMobile ? '10px' : '12px', fontWeight: 'bold' }}>
  {view === 'Daily'
    ? `${selectedDate.toLocaleDateString('en-US', { weekday: 'short' })} ${selectedDate.getDate()} ${selectedDate.toLocaleDateString('en-US', { month: 'long' })}, ${selectedDate.getFullYear()}`
    : view === 'Weekly'
      ? `Week of ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
      : selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
</Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '4px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                height: '25px',
                marginTop: '-30px',
              }}
            >
              <Typography variant="button" sx={{ fontSize: '10px', fontWeight: '100' }}>
                Today
              </Typography>
            </Box>

            <ArrowBackIosNewIcon onClick={handlePrevious} sx={{ cursor: 'pointer', color: 'gray', fontSize: '13px', marginTop: '-20px' }} />
            <ArrowForwardIosIcon onClick={handleNext} sx={{ cursor: 'pointer', color: 'gray', fontSize: '13px', marginTop: '-20px' }} />
          </Stack>

          {/* View Selection Buttons */}
          <Stack direction="row" spacing={1} mt={isMobile ? 2 : "-60px"}>
            <Button sx={{ fontSize: '10px' }} variant={view === 'Daily' ? 'contained' : ''} onClick={() => setView('Daily')}>
              Daily
            </Button>
            <Button sx={{ fontSize: '10px' }} variant={view === 'Weekly' ? 'contained' : ''} onClick={() => setView('Weekly')}>
              Weekly
            </Button>
            <Button sx={{ fontSize: '10px' }} variant={view === 'Monthly' ? 'contained' : ''} onClick={() => setView('Monthly')}>
              Monthly
            </Button>

            <Stack
  direction="row"
  alignItems="flex-end"
  spacing={1}
  sx={{
    display: isMaximized ? "none" : { xs: 'flex' },
    pl: '400px', // Maximum left margin of 20%
  }}
>
  <Button
    sx={{ fontSize: '10px', height: "30px", width: "auto" }}
    variant={shift === 'AM Shift' ? 'contained' : 'outlined'}
    onClick={() => setShift('AM Shift')}
  >
    AM Shift
  </Button>
  <Button
    sx={{ fontSize: '10px', height: "30px", width: "auto" }}
    variant={shift === 'PM Shift' ? 'contained' : 'outlined'}
    onClick={() => setShift('PM Shift')}
  >
    PM Shift
  </Button>
</Stack>



          </Stack>
         
          <Stack direction="row" spacing={1} mt="-60px" mr="10px">
          
          
          <div
  style={{ position: "relative", display: "inline-block" }}
  onMouseEnter={() => setIsHovered(isMinimized ? "expand" : "minimize")}
  onMouseLeave={() => setIsHovered(null)}
  onClick={handleToggle} // Unique class for the toggle button
>
  {isMinimized ? (
    <img src={hrimage4} alt="expand" className="h-3 w-3 collapse-div" />
  ) : (
    <img src={minimizeicon} alt="minimize" className="h-3 w-3 collapse-div " />
  )}

  {(isHovered === "minimize" || isHovered === "expand") && (
    <div
      style={{
        position: "absolute",
        top: "-28px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#2f456c",
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "3px",
        fontSize: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        whiteSpace: "nowrap",
      }}
    >
      {isMinimized ? "expand" : "Minimize"}
    </div>
  )}
</div>



  {/* Hover effect for Maximize icon (hrimages1) */}
  {!isMobile && (
  <div
    style={{ position: "relative", display: "inline-block" }}
    onMouseEnter={() => setIsHovered(isMaximized ? "maximize" : "singlecolumn")}
    onMouseLeave={() => setIsHovered(null)}
    onClick={handleToggleMaximize}
  >
    {isMaximized? (
      <img src={hrimage1} alt="maximize" className="h-3 w-3 expand-button " />
    ) : (
      <img src={maximizeicon} alt="singlecolumn" className="h-3 w-3  expand-button" />
    )}

    {(isHovered === "maximize" || isHovered === "singlecolumn") && (
      <div
        style={{
          position: "absolute",
          top: "-28px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#2f456c",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "3px",
          fontSize: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          whiteSpace: "nowrap",
        }}
      >
        {isMaximized ? "maximize" : "singlecolumn"}
      </div>
    )}
  </div>
)}

  {/* Hover effect for Refresh icon (hrimages2) */}
  <div
    style={{ position: "relative", display: "inline-block" }}
    onMouseEnter={() => setIsHovered("refresh")}
    onMouseLeave={() => setIsHovered(null)}
  >
    <img src={hrimage2} alt="Refresh" className="h-3 w-3" />
    {isHovered === "refresh" && (
      <div
        style={{
          position: "absolute",
          top: "-28px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#2f456c",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "3px",
          fontSize: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          whiteSpace: "nowrap",
        }}
      >
        Refresh
      </div>
    )}
  </div>

  {/* Hover effect for Settings icon (hrimages3) */}
  <div
    style={{ position: "relative", display: "inline-block" }}
    onMouseEnter={() => setIsHovered("settings")}
    onMouseLeave={() => setIsHovered(null)}
  >
    <img src={hrimage3} alt="Settings" className="h-3 w-3" />
    {isHovered === "settings" && (
      <div
        style={{
          position: "absolute",
          top: "-28px",
          left: "-10px",
          transform: "translateX(-50%)",
          backgroundColor: "#2f456c",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "3px",
          fontSize: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          whiteSpace: "nowrap",
        }}
      >
       copy link
      </div>
    )}
  </div>
          </Stack>
        </Stack>
        </div>
      }

      {/*above code is  written in bith mobile and desktop mode*/}
      {isMaximized?(
      <div className={`collapsible-div  ${isMobile?"display-none":""}`}
       style={{ display: isMobile ? "none" : "block" }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-start"
          mb={1.5}
         // mt={-5}
          sx={{ display: { xs: 'none', sm: 'flex' } }} // Hide on mobile

        >
          <Button sx={{ fontSize: '10px' }} variant={shift === 'AM Shift' ? 'contained' : 'outlined'} onClick={() => setShift('AM Shift')}>
            AM Shift
          </Button>
          <Button sx={{ fontSize: '10px' }} variant={shift === 'PM Shift' ? 'contained' : 'outlined'} onClick={() => setShift('PM Shift')}>
            PM Shift
          </Button>

          {/* Role Indicators */}
          <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
            {Object.entries(roleCounts).map(([role, count]) => (
              <Box key={role} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#3767B1',
                    color: 'white',
                    borderRadius: '50%',
                    width: 16,
                    height: 16,
                    fontSize: '10px',
                    mr: 1,
                    flexWrap: "nowrap"
                  }}
                >
                  {count}
                </Box>
                <Typography sx={{ fontSize: '10px' }}>{role}</Typography>
              </Box>
            ))}
          </Box>
        </Stack>




        <Box >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'row' },
              width: '100%',
            }}
          >
            {/* Employee List Section */}
            <Box sx={{ flex: { xs: '1', sm: '0 0 25%' }, p: { xs: 0.5, sm: 2 } }}>
              <Typography
                sx={{
                  fontSize: { xs: '13px', sm: '13px' },
                  mt: { xs: 0, sm: '-20px' },
                  ml: { xs: '-10px', sm: 0 }
                }}
                variant="h6"
                mb={1}
              >
                Employees
              </Typography>
              {shifts.map((shift) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  key={shift.name}
                  mb={-0.5}
                  sx={{ ml: { xs: '-10px', sm: 0 } }}
                >
                  <Avatar
                    alt={shift.name}
                    src={`https://i.pravatar.cc/150?u=${shift.name}`}
                    sx={{
                      height: { xs: '18px', sm: '20px' },
                      width: { xs: '18px', sm: '20px' }
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '10px', sm: '10px' },
                        mb: { xs: '-10px', sm: '-5px' },
                        mt: '2px',
                        flexWrap: 'nowrap'
                      }}
                    >
                      {shift.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{
                        fontSize: { xs: '10px', sm: '10px' },
                        flexWrap: 'nowrap'
                      }}
                    >
                      {shift.role}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Box>

            {/* Shift Timing Section */}
            <Box sx={{ flex: { xs: '1', sm: '0 0 75%' }, p: { xs: 1, sm: 2 } }}>
              {view === 'Daily' && (
                <Box sx={{ display: 'flex', flexWrap: 'nowrap', mb: { xs: 1, sm: 2 }, mt: { xs: -1, sm: -3.5 } }}>
                  {timeSlots.map((time) => (
                    <Box
                      key={time}
                      sx={{ flex: '1 1 8.33%', textAlign: 'center' }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ fontSize: { xs: '10px', sm: '10px' }, ml: { xs: "-20px" } }}
                      >
                        {isMobile ? time.replace(/\D/g, '') : time} {/* Only shows the number in mobile mode */}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
              {renderShifts()}
            </Box>

          </Box>




          <Box sx={{ display: 'flex', alignItems: 'center', fontSize:"10px", marginTop: isMobile ? "10px" : '-5px', }}>
            {Object.entries(shiftStatusColors).map(([status, color]) => (
              <Box key={status} sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <Box
                  sx={{
                    backgroundColor: color,
                    borderRadius: '50%',
                    width: 10,
                    height: 10,
                    mr: 1,
                  }}
                />
                <Typography variant="caption">{status}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </div>
      ):(
        <Box >
            <Box display="flex"  margin="12px" borderRadius="8px" overflow="scroll">
              {/* Left Sidebar */}
              <Box width="300px" p={2} borderRight="1px solid rgba(255, 255, 255, 0.1)" marginLeft="-15px">
        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center' }}>
        
        </Box>
        <Stack  direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <IconButton onClick={handlePrevious} color="inherit">
            <ArrowBackIosIcon sx={{height:'13px',marginRight:'-53px'}} />
          </IconButton>
          <Typography sx={{fontSize:'15px'}} variant="h6">{selectedDate.toLocaleString('default', { month: 'long' })}, {selectedDate.getFullYear()}</Typography>
          <IconButton  onClick={handleNext} color="inherit">
            
            <ArrowForwardIosIcon sx={{height:'13px',marginLeft:'-33px'}} />
          </IconButton>
        </Stack>
<Box container bgcolor={"black"} color="black">
        <Mycalander  bgcolor={"black"} value={selectedDate} onChange={setSelectedDate} />
      
        </Box>
      
       <Box sx={{display:'flex', justifyContent:'space-around', mt:"-20px"}}>
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
  <Typography sx={{ fontSize: "15px" }} variant="h6" gutterBottom>
    Team
  </Typography>
  {teams.map((team) => (
    <Stack
      sx={{ textAlign: "right" }}
      direction="row"
      justifyContent="space-between"
      key={team.role}
      mb={1}
     
    >
     
     <Typography sx={{ fontSize: "11px", textAlign: "right" }}>
  <span style={{ marginRight: "10px" }}>{team.count}</span>
  {team.role}
</Typography>
    </Stack>
  ))}
</Box>



        </Box>
      
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize:"10px", marginTop: isMobile ? "10px" : '50px', }}>
            {Object.entries(shiftStatusColors).map(([status, color]) => (
              <Box key={status} sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <Box
                  sx={{
                    backgroundColor: color,
                    borderRadius: '50%',
                    width: 10,
                    height: 10,
                    mr: 1,
                  }}
                />
                <Typography variant="caption">{status}</Typography>
              </Box>
            ))}
          </Box>
              </Box>
        
              
        {/* Right Content */}
<Box
  sx={{
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'column' },
    width: '100%',
  }}
>
  {/* Date and Navigation Section */}
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="center"
    sx={{
    
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
     
    }}
  >
     <Box
        display="flex"
        flexDirection="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          marginBottom: "20px",  // Add spacing below date and day
        }}
      >
        <Typography
          sx={{
            color: "gray",
            fontSize: "15px",
            fontWeight: "bold",
            margin: 0,
            marginRight:'10px'
          }}
        >
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
          }).slice(0, 3)}
        </Typography>
        <Box
          sx={{
            bgcolor: "#3767B1", // Blue background
            color: "white",
            borderRadius: "8px",
            width: 30,
            height: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
           
          }}
        >
          {selectedDate.getDate()} {/* Displays the day of the month */}
        </Box>
        </Box>
  </Stack>

  {/* Main Content */}
  {shifts.length===0?<Nooverviewcalander/>:
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'row', sm: 'row' },
      width: '100%',
      marginTop: "20px", // Adjust spacing as needed
    }}
  >
    {/* Employee List Section */}
    <Box sx={{ flex: { xs: '1', sm: '0 0 25%' }, p: { xs: 0.5, sm: 2 } }}>
      <Typography
        sx={{
          fontSize: { xs: '13px', sm: '14px' },
          mt: { xs: 0, sm: '-20px' },
          ml: { xs: '-10px', sm: 0 },
        }}
        variant="h6"
        mb={2}
      >
        Employees
      </Typography>
      {shifts.map((shift) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          key={shift.name}
          mb={2}
          sx={{ ml: { xs: '-10px', sm: 0 } }}
        >
          <Avatar
            alt={shift.name}
            src={`https://i.pravatar.cc/150?u=${shift.name}`}
            sx={{
              height: { xs: '18px', sm: '30px' },
              width: { xs: '18px', sm: '30px' },
            }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: { xs: '10px', sm: '10px' },
                mb: { xs: '-10px', sm: '-5px' },
                mt: '2px',
                flexWrap: 'nowrap',
              }}
            >
              {shift.name}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{
                fontSize: { xs: '10px', sm: '10px' },
                flexWrap: 'nowrap',
              }}
            >
              {shift.role}
            </Typography>
          </Box>
        </Stack>
      ))}
    </Box>

    {/* Shift Timing Section */}
    <Box sx={{ flex: { xs: '1', sm: '0 0 75%' }, p: { xs: 1, sm: 2 } }}>
      {view === 'Daily' && (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', mb: { xs: 1, sm: 2 }, mt: { xs: -1, sm: -3.5 } }}>
          {timeSlots.map((time) => (
            <Box
              key={time}
              sx={{ flex: '1 1 8.33%', textAlign: 'center' }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: { xs: '10px', sm: '12px' }, ml: "-100px"}}
              >
                {isMobile ? time.replace(/\D/g, '') : time} {/* Only shows the number in mobile mode */}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      {renderShifts()}
    </Box>
  </Box>
}
</Box>

            </Box>
            </Box>
     
      )}
    </Box>
  );
};

export default EmployeeShift;
