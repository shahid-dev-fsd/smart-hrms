import React, {useState} from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import view from '../ReceivedApp/viewicon.png';

const AttendPage = () => {

    const [currentScreen, setCurrentScreen] = useState(1);

    const handlePrevScreen = () => {
        if (currentScreen > 1) {
            setCurrentScreen(currentScreen - 1);
        }
    };

    const handleNextScreen = () => {
        
        if (currentScreen < 2) {
            setCurrentScreen(currentScreen + 1);
        }
    };

    const userData = [
        { date: '2024-04-18', day: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action:  <img src={view} alt="view" className="w-4 h-4"/>},
        { date: '2024-04-18', day: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Holiday', action: <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Holiday', clockIn: '-- -- --', clockOut: '-- -- --', progress: 'Present & Late', action: <img src={view} alt="view" className="w-4 h-4"/>},
        { date: '2024-04-18', day: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action: <img src={view} alt="view" className="w-4 h-4"/>},
        { date: '2024-04-18', day: 'Monday', status: 'Late', clockIn: '09:50 AM', clockOut: '05:00 PM', progress: 'Holiday', action: <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action: <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Holiday', action: <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Holiday', clockIn: '-- -- --', clockOut: '-- -- --', progress: 'Present & Late', action: <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action: <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Late', clockIn: '09:50 AM', clockOut: '05:00 PM', progress: 'Holiday', action: <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action: <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Holiday', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Holiday', clockIn: '-- -- --', clockOut: '-- -- --', progress: 'Present & Late', action:  <img src={view} alt="view" className="w-4 h-4"/>},
        { date: '2024-04-18', day: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Late', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Holiday', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Holiday', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Holiday', clockIn: '-- -- --', clockOut: '-- -- --', progress: 'Present & Late', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        { date: '2024-04-18', day: 'Monday', status: 'Late', clockIn: '09:09 AM', clockOut: '05:00 PM', progress: 'Holiday', action:  <img src={view} alt="view" className="w-4 h-4"/> },
   
    ];    

    const getColor = (status) => {
        switch (status) {
            case 'Present':
                return { bgColor: 'bg-green-950', textColor: 'text-green-500' };
            case 'Holiday':
                return { bgColor: 'bg-sky-950', textColor: 'text-sky-500' };
            case 'Late':
                return { bgColor: 'bg-red-950', textColor: 'text-red-500' };
            default:
                return { bgColor: 'bg-gray-900', textColor: 'text-gray-500' };
        }
    };

    const getProgressBarStyle = (status) => {
        switch (status) {
            case 'Present':
                return { width: '100%', backgroundColor: '#34D399' }; 
            case 'Holiday':
                return { width: '100%', backgroundColor: '#6B7280' }; 
            case 'Late':
                return { width: '75%', backgroundColor: '#34D399' }; 
            case 'Present & Late':
                return { width: '75%', backgroundColor: '#34D399' }; 
            default:
                return { width: '100%', backgroundColor: '#6B7280' }; 
        }
    };
    
    
    return (
        <Box sx={{backgroundColor: 'background.main',}}>
        <div className='flex flex-col'>
                <div className="flex items-center justify-between md:w-full p-4">
                        <div className="p-2">
                            <h1 className="text-xs md:text-2xl text-neutral-500">Attendance By User</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <button className='flex  items-center text-white font-bold text-[8px] md:text-[12px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                                Mark Attendance
                            </button>
                            <InfoOutlinedIcon />
                        </div>
                    </div>
            </div>
            <Box className="w-full ml-2 md:ml-0 pt-4 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
                <div className='flex flex-col md:flex-row items-center justify-center gap-14 md:w-full'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-neutral-800 text-[16px] text-blue-700'>31</div>
                        <p className='text-[16px] text-gray-400'>Total Working Days</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-green-950 text-[16px] text-green-500'>20</div>
                        <p className='text-[16px] text-gray-400'>Present Days</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-amber-950 text-[16px] text-amber-500'>3</div>
                        <p className='text-[16px] text-gray-400'>Absent Days</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-teal-950 text-[16px] text-teal-500'>0</div>
                        <p className='text-[16px] text-gray-400'>Half Days</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-red-950 text-[16px] text-red-500'>5</div>
                        <p className='text-[16px] text-gray-400'>Late Days</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-orange-950 text-[16px] text-orange-500'>6</div>
                        <p className='text-[16px] text-gray-400'>Holidays</p>
                    </div>
                </div>
                <Box className="flex flex-col md:flex-row justify-center gap-4 mt-4 w-[97%] ml-2 md:ml-4 ">
                   <div className='w-full md:w-[21%] flex justify-start items-center'>
                    <p className='text-[12px] ml-3'>Show</p>
                        <select className="appearance-none bg-transparent pl-1 rounded leading-tight focus:outline-none focus:border-gray-500 text-[12px]">
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            <option>40</option>
                        </select>
                        <ArrowDropDownIcon fontSize='medium' className="text-zinc-500"/>
                        <p className='text-[12px]'>entries</p>
                   </div>
                   <div className='w-full md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[95%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Employee Name</option>
                            <option>John Doe</option>
                            <option>Jane Smith</option>
                            <option>Michael Johnson</option>
                        </select>
                        <ArrowDropDownIcon style={{fontSize:'28px'}} className="text-zinc-500"/>
                   </div>
                   <div className='w-full md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Select Date</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <CalendarTodayOutlinedIcon style={{fontSize:'24px'}} className="text-zinc-500 pr-2"/>
                   </div>
                   <div className='w-full md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                        </select>
                        <ArrowDropDownIcon style={{fontSize:'28px'}} className="text-zinc-500"/>
                   </div>
                   <div className='w-full md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Year</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                        </select>
                        <ArrowDropDownIcon style={{fontSize:'28px'}} className="text-zinc-500"/>
                   </div>
                   
                   <div className='w-full md:w-[11%] flex justify-end md:justify-center items-center '>
                   <button className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>

                   </div>
                </Box>

                <Box
                    className='w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-sm mt-10 h-[380px]'
                    sx={{
                        overflowY: 'scroll',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none'
                    }}
                >
                    <Grid
                        className='flex flex-row border-b border-zinc-500'
                        
                    >
                        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold'>
                            Date
                        </div>
                        <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
                            Day
                        </div>
                        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
                            Status
                        </div>
                        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold'>
                            Clock In
                        </div>
                        <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
                            Clock Out
                        </div>
                        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
                            Progress
                        </div>
                        <div className='w-[25%] md:w-[14.6%] p-2  text-left text-sm md:text-[16px] font-bold'>
                            Action
                        </div>
                    </Grid>
                    {userData.map((user, index) => (
                        <Grid key={index} className='flex flex-row border-b border-zinc-500' currentScreen={currentScreen}>
                            <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs flex items-center'>
                                {user.date}
                            </div>
                            <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
                                {user.day}
                            </div>
                            <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
                                <div
                                    className={`px-1 py-1 rounded-lg w-3/5 flex justify-center items-center ${
                                        getColor(user.status).bgColor
                                    } ${getColor(user.status).textColor}`}
                                >
                                    {user.status}
                                </div>
                            </div>
                            <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs flex items-center'>
                                {user.clockIn}
                            </div>
                            <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
                                {user.clockOut}
                            </div>
                            <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
                                <div className='h-2 flex justify-between w-full'>
                                    <div
                                        className='h-full rounded-lg'
                                        style={{
                                            width: getProgressBarStyle(user.status).width,
                                            backgroundColor: getProgressBarStyle(user.status).backgroundColor
                                        }}
                                    ></div>
                                    {user.status === 'Late' && (
                                        <div
                                            className='h-full rounded-lg'
                                            style={{ width: '25%', backgroundColor: '#EF4444' }}
                                        ></div>
                                    )}
                                </div>
                            </div>
                            <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 flex justify-center items-center text-sm md:text-xs'>
                               <IconButton> {user.action}</IconButton>
                            </div>
                        </Grid>
                    ))}
                </Box>


           
            <div className='flex items-center justify-between w-[80%] md:w-[92%] md:mx-4 pl-5 md:pl-0 pt-4 md:pt-10'>
                <div className="p-2 rounded-lg ">
                    <div className="flex items-center gap-0 md:gap-6">
                        <p className='text-[12px] text-gray-400'>Show Rows: 1-10 of 20</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <KeyboardArrowLeftOutlinedIcon
                        className="text-zinc-400 cursor-pointer"
                        onClick={handlePrevScreen}
                    />
                    <p className="text-zinc-400">1</p>
                    {currentScreen === 1 ? (
                        <KeyboardArrowRightOutlinedIcon
                            className="text-zinc-300 cursor-pointer"
                            onClick={handleNextScreen}
                        />
                    ) : (
                        <div className="bg-blue-500 w-[20px] h-[20px] flex items-center justify-center p-1 rounded-full">
                            2
                        </div>
                    )}
                </div>
            </div>
            </Box>
        </Box>
    );
};

export default AttendPage;
