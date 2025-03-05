
import React, {useState} from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import view from '../../../ReceivedApp/viewicon.png'
 import HomeIcon from '@mui/icons-material/Home';
 import { useTheme } from "../../../../style/theme";


const ActiveList = () => {
  const { toggleTheme, mode } = useTheme();
    const [currentScreen, setCurrentScreen] = useState(1);
    const [TitckPage , setTicketePage] = useState('activeticket');

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
        {Id:"#29" , date: '2024-04-18', Project: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action:  <img src={view} alt="view" className="w-4 h-4"/>},
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Holiday', action: <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Holiday', clockIn: '-- -- --', clockOut: '-- -- --', progress: 'Present & Late', action: <img src={view} alt="view" className="w-4 h-4"/>},
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action: <img src={view} alt="view" className="w-4 h-4"/>},
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Late', clockIn: '09:50 AM', clockOut: '05:00 PM', progress: 'Holiday', action: <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action: <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Holiday', action: <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Holiday', clockIn: '-- -- --', clockOut: '-- -- --', progress: 'Present & Late', action: <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action: <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Late', clockIn: '09:50 AM', clockOut: '05:00 PM', progress: 'Holiday', action: <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action: <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Holiday', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Holiday', clockIn: '-- -- --', clockOut: '-- -- --', progress: 'Present & Late', action:  <img src={view} alt="view" className="w-4 h-4"/>},
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Late', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Holiday', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Holiday', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Holiday', clockIn: '-- -- --', clockOut: '-- -- --', progress: 'Present & Late', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Present', clockIn: '09:00 AM', clockOut: '05:00 PM', progress: 'Present', action:  <img src={view} alt="view" className="w-4 h-4"/> },
        {Id:"#29" ,  date: '2024-04-18', Project: 'Monday', status: 'Late', clockIn: '09:09 AM', clockOut: '05:00 PM', progress: 'Holiday', action:  <img src={view} alt="view" className="w-4 h-4"/> },
   
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
    
    const avatarData = [
        {
        alt: "Remy Sharp",
        src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s"
        } ,
        {
            alt: "Remy Sharp",
            src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s"
            } ,
            {
                alt: "Remy Sharp",
                src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s"
                } ,
                {
                    alt: "Remy Sharp",
                    src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s"
                    } ,
                    {
                        alt: "Remy Sharp",
                        src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s"
                        } ,
                        {
                            alt: "Remy Sharp",
                            src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s"
                            }
     ]
  
     const ChnagePage=(tic)=>{
        setTicketePage(tic)
     }

    
     return (
        <Box sx={{ backgroundColor: 'background.main' }}>
          <div className='flex flex-col'>
            <div className="flex items-center justify-between md:w-full p-4">
              <div className="p-2">
                <h1 className="text-xs md:text-2xl text-neutral-500">
                  User Pages <span className=' text-neutral-500'>Ticket List</span>
                </h1>
              </div>
              <div className="flex flex-row items-center justify-center gap-4">
                <InfoOutlinedIcon />
              </div>
            </div>
          </div>
    {
     
        <Box className="w-[96%] mr-[20px] md:ml-0 pb-4 rounded-lg  ml-[20px] mb-[40px]">
            <div className="flex flex-col md:flex-row gap-8 mt-5">
              <Box className="w-full md:w-1/3 p-5 rounded-lg border border-zinc-500" sx={{ backgroundColor: 'background.view' , marginLeft:'20px' }}>
                <div className="text-center mb-4">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuaNLChfhGJgcaJ9outna1kfQ-oHbANj3wg&s" alt="User Avatar" className="w-20 h-20 rounded-full mx-auto" />
                  <h1 className="text-blue-500 mt-2 font-weight-500">Stephan Grant</h1>
                  <p className="text-gray-400">QA Tester</p>
                </div>
                <nav className="text-gray-400">
                  <ul>
                    <li className="py-2 cursor-pointer p-2"><HomeIcon style={{ marginRight: "4px" }} /> Dashboard</li>
                    <li className="py-3 cursor-pointer p-2"><HomeIcon style={{ marginRight: "4px" }} />Edit Profile</li>
                    {
                      TitckPage == 'ticetList' ?
                      <li onClick={()=>ChnagePage("ticetList")} className="py-3 cursor-pointer bg-blue-500 border-[1px] rounded-md text-white p-2"><HomeIcon style={{ marginRight: "4px" ,  }} />Ticket Lists</li>
                        :
                        <li onClick={()=>ChnagePage("ticetList")} className="py-3 cursor-pointer  rounded-md p-2"><HomeIcon style={{ marginRight: "4px" ,  }} />Ticket Lists</li>

                    }
                    {
                      TitckPage == 'activeticket' ?
                      <li onClick={()=>ChnagePage("activeticket")} className="py-3 cursor-pointer bg-blue-500 border-[1px] rounded-md text-white p-2"><HomeIcon style={{ marginRight: "4px" ,  }} />Active Tickets </li>
                        :
                        <li onClick={()=>ChnagePage("activeticket")} className="py-3 cursor-pointer  rounded-md  p-2"><HomeIcon style={{ marginRight: "4px" ,  }} />Active Tickets</li>

                    }
                    {
                      TitckPage == 'ClosedTickets' ?
                      <li onClick={()=>ChnagePage("ClosedTickets")} className="py-3 cursor-pointer bg-blue-500 border-[1px] rounded-md text-white p-2"><HomeIcon style={{ marginRight: "4px" ,  }} />Closed Tickets</li>
                        :
                        <li onClick={()=>ChnagePage("ClosedTickets")} className="py-3 cursor-pointer  rounded-md  p-2"><HomeIcon style={{ marginRight: "4px" ,  }} />Closed Tickets</li>

                    }
                    <li className="py-3 cursor-pointer p-2"><HomeIcon style={{ marginRight: "4px" }} />Create Tickets</li>
                    <li className="py-3 cursor-pointer p-2"><HomeIcon style={{ marginRight: "4px" }} />View Tickets</li>
                  </ul>
                </nav>
              </Box>

    <Box className="w-full md:w-3/4 p-5 rounded-lg border border-zinc-500" sx={{ backgroundColor: 'background.view' }}>
    <div className="flex flex-wrap md:flex-nowrap space-between gap-4 mb-5" style={{ justifyContent: 'space-between' }}>
      <div className={`  flex flex-wrap md:flex-nowrap`}>
        <Box className={` flex flex-col mx-2  ml-[20px]`} sx={{ backgroundColor: 'background.view' }} >
        <label >
  Select priority
</label>

          <select  className={`${mode === "dark" ? "bg-[#202021]" : ""} , "p-2 rounded" ,  border border-zinc-500 rounded-sm`} style={{ fontSize:"12px" , height:'36px' }}>
            <option className={`${`${mode === "dark" ? "text-[red]" : "blue"},`} `}>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </Box>
        <Box className="flex flex-col mx-2  ml-[20px] " sx={{ backgroundColor: 'background.view' }}>
          <label className="">From</label>
          <input
  className={`${mode === "dark" ? "bg-[#202021]" : ""} p-2 rounded-sm border border-zinc-500`}
  type="date"
  style={{ fontSize: "12px", height: "36px" }}
/>        </Box>
<Box className="flex flex-col mx-2  ml-[20px] " sx={{ backgroundColor: 'background.view' }}>
          <label className="">To</label>
          <input
  className={`${mode === "dark" ? "bg-[#202021]" : ""} p-2 rounded-sm border border-zinc-500`}
  type="date"
  style={{ fontSize: "12px", height: "36px" }}
/>        </Box>
      </div>
      <div className='mt-2 md:mt-[15px]'>
        <button className="p-2 bg-blue-600 text-white rounded">Search</button>
      </div>
    </div>
    {
    TitckPage == 'ticetList' &&
    <Box
      className='w-full md:w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-sm mt-10 h-[380px]'
      sx={{
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none'
      }}
    >
      <Grid className='flex flex-row border-b border-zinc-500'>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold'>
          ID
        </div>
        <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Project Title
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Client
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Status
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold'>
          Start Date
        </div>
        <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Deadline
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Progress
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 text-left text-sm md:text-[16px] font-bold'>
          Action
        </div>
      </Grid>
      {userData.map((user, index) => (
        <Grid key={index} className='flex flex-row border-b border-zinc-500'>
          <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs flex items-center'>
            {user.Id}
          </div>
          <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
            {user.Project}
          </div>
          <div className='w-[20%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
            {user.Project}
          </div>
          <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
            <div className={`px-1 py-1 rounded-lg w-3/5 flex justify-center items-center ${getColor(user.status).bgColor} ${getColor(user.status).textColor}`}>
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
              <div className='h-full rounded-lg' style={{ width: getProgressBarStyle(user.status).width, backgroundColor: getProgressBarStyle(user.status).backgroundColor }}></div>
              {user.status === 'Late' && (
                <div className='h-full rounded-lg' style={{ width: '25%', backgroundColor: '#EF4444' }}></div>
              )}
            </div>
          </div>
          <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 flex justify-center items-center text-sm md:text-xs'>
            <IconButton>{user.action}</IconButton>
          </div>
        </Grid>
      ))}
    </Box>
}
{
    TitckPage == 'activeticket' &&
    <Box
      className='w-full md:w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-sm mt-10 h-[380px]'
      sx={{
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none'
      }}
    >
      <Grid className='flex flex-row border-b border-zinc-500'>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold'>
          ID
        </div>
        <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Project Title
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Client
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Status
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold'>
          Start Date
        </div>
        <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Deadline
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Progress
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 text-left text-sm md:text-[16px] font-bold'>
          Action
        </div>
      </Grid>
      {userData.map((user, index) => (
        <Grid key={index} className='flex flex-row border-b border-zinc-500'>
          <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs flex items-center'>
            {user.Id}
          </div>
          <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
            {user.Project}
          </div>
          <div className='w-[20%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
            {user.Project}
          </div>
          <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
            <div className={`px-1 py-1 rounded-lg w-3/5 flex justify-center items-center ${getColor(user.status).bgColor} ${getColor(user.status).textColor}`}>
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
              <div className='h-full rounded-lg' style={{ width: getProgressBarStyle(user.status).width, backgroundColor: getProgressBarStyle(user.status).backgroundColor }}></div>
              {user.status === 'Late' && (
                <div className='h-full rounded-lg' style={{ width: '25%', backgroundColor: '#EF4444' }}></div>
              )}
            </div>
          </div>
          <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 flex justify-center items-center text-sm md:text-xs'>
            <IconButton>{user.action}</IconButton>
          </div>
        </Grid>
      ))}
    </Box>
}
{
    TitckPage == 'ClosedTickets' &&
    <Box
      className='w-full md:w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-sm mt-10 h-[380px]'
      sx={{
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none'
      }}
    >
      <Grid className='flex flex-row border-b border-zinc-500'>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold'>
          ID
        </div>
        <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Project Title
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Client
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Status
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold'>
          Start Date
        </div>
        <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Deadline
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold'>
          Progress
        </div>
        <div className='w-[25%] md:w-[14.6%] p-2 text-left text-sm md:text-[16px] font-bold'>
          Action
        </div>
      </Grid>
      {userData.map((user, index) => (
        <Grid key={index} className='flex flex-row border-b border-zinc-500'>
          <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs flex items-center'>
            {user.Id}
          </div>
          <div className='w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
            {user.Project}
          </div>
          <div className='w-[20%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
            {user.Project}
          </div>
          <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center'>
            <div className={`px-1 py-1 rounded-lg w-3/5 flex justify-center items-center ${getColor(user.status).bgColor} ${getColor(user.status).textColor}`}>
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
              <div className='h-full rounded-lg' style={{ width: getProgressBarStyle(user.status).width, backgroundColor: getProgressBarStyle(user.status).backgroundColor }}></div>
              {user.status === 'Late' && (
                <div className='h-full rounded-lg' style={{ width: '25%', backgroundColor: '#EF4444' }}></div>
              )}
            </div>
          </div>
          <div className='w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 flex justify-center items-center text-sm md:text-xs'>
            <IconButton>{user.action}</IconButton>
          </div>
        </Grid>
      ))}
    </Box>
}
  </Box>
  
             
            </div>
          </Box>
    }
          
        </Box>
    );
};

export default ActiveList;
