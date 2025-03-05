import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';



const Attendance = ({items}) => {
    const [dropdown1Open, setDropdown1Open] = useState(false);
    const [ setSelectedYear] = useState('2024');

    const toggleDropdown1 = () => {
        setDropdown1Open(!dropdown1Open);
    };


    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setDropdown1Open(false);
    };
    

    // const items = [
    //     { id: 1, name: 'John Doe', status: 'Present', clockin: '09:07:00AM', clockout: '05:00:17PM' },
    //     { id: 2, name: 'Smith', status: 'Absent', clockin: '09:07:00AM', clockout: '05:00:17PM' },
    //     { id: 3, name: 'Steve', status: 'Present', clockin: '09:07:00AM', clockout: '05:00:17PM' },
    //     { id: 4, name: 'John Doe', status: 'Present', clockin: '09:07:00AM', clockout: '05:00:17PM' },
    //     { id: 5, name: 'Smith', status: 'Absent', clockin: '09:07:00AM', clockout: '05:00:17PM' },

        
        
       
    
    // ];

    return (
        <Box className='rounded-lg mb-4 shadow-md pt-4 pr-4 pb-4 h-[350px]' sx={{backgroundColor: 'background.view',}}>
            <div className="flex flex-row gap-4 mb-4 items-center justify-between">
                <div className=' w-full md:w-1/2 flex justify-left'>
                    <Typography className="w-full md:w-1/3 border-l-4 border-blue-500 pl-2 whitespace-nowrap text-xl">
                        Attendance
                    </Typography>
                </div>
                
                        <div className="border border-gray-600 rounded-lg p-1 w-1/3 md:w-1/4 justify-end">
                            <div className='w-full flex justify-between items-center'>
                                <Typography className="text-xl">Monthly</Typography>
                                <KeyboardArrowDownIcon className="cursor-pointer text-9333ea" onClick={toggleDropdown1} />
                        
                            {dropdown1Open && (
                                <div className="absolute top-10 right-0 mt-1 w-20 md:w-40 bg-neutral-900 rounded-lg border border-gray-600 z-10">
                                    <div className="p-2 flex flex-col gap-2 justify-center items-center">
                                        <Typography variant="h7" className="cursor-pointer" onClick={() => handleYearSelect('2024')}>
                                            Option 1
                                        </Typography>
                                        <Typography variant="h7" className="cursor-pointer" onClick={() => handleYearSelect('2023')}>
                                            Option 2
                                        </Typography>
                                        <Typography variant="h7" className="cursor-pointer" onClick={() => handleYearSelect('2023')}>
                                            Option 3
                                        </Typography>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                
            </div>
            <div className='w-full '>
        
                <div  className="flex flex-row mb-4 gap-1 md:gap-0">

                    <div className='w-1/6 md:w-1/6 flex items-center justify-center'>
                        <p1 className='text-xs md:text-sm'>S/N</p1>
                    </div>
                    <div className='w-1/4 md:w-1/4 flex items-center justify-start'>
                        <h1 className='text-xs md:text-sm '>Employee</h1>
                    </div>
                    <div className='w-1/5 md:w-1/5 flex items-center justify-start'>
                        <p1 className='text-xs md:text-sm '>Status</p1>
                    </div>
                    <div className='w-1/3 md:w-1/3 flex items-center justify-start md:justify-center'>
                        <p1 className='text-xs md:text-sm'>ClockIn</p1> 
                    </div>
                    <div className='w-1/3 md:w-1/3 flex items-center justify-start md:justify-center'>
                        <p1 className='text-xs md:text-sm'>ClockOut</p1>
                    </div>
                    <div className='w-1/4 md:w-1/3 flex items-center justify-start md:justify-center'>
                        <p1 className='text-xs md:text-sm'>Actions</p1>
                    </div>
                    
                </div>
                {items?.map((item,index )=> (
                    <div key={index} className="flex flex-row mb-4 gap-1 md:gap-0">
                        <div className='w-1/6 md:w-1/6 flex items-center justify-center' >
                            <p1 className='text-xs md:text-sm text-gray-500'>{item._id}</p1> 
                        </div>
                        <div className='w-1/4 md:w-1/4 flex items-center justify-start'>
                            <h1 className='text-xs md:text-sm text-gray-500'>{item.employeeData?.firstName +
                                                      ' ' +
                                                      item.employeeData?.lastName}</h1>
                        </div>
                        <div className='w-1/5 md:w-1/5 flex items-center justify-start'>
                            <p1 className='text-xs md:text-sm text-gray-500'>{item.status}</p1>
                        </div>
                        <div className='w-1/3 md:w-1/3 flex items-center justify-start'>
                            <p1 className='text-xs md:text-sm text-gray-500'>{item.clockin}</p1> 
                        </div>
                        <div className='w-1/3 md:w-1/3 flex items-center justify-start'>
                            <p1 className='text-xs md:text-sm text-gray-500'>{item.clockout}</p1>
                        </div>
                        <div className='w-1/4 md:w-1/4 flex items-center justify-start gap-2'>
                            {new Date(item.clockInTime).toLocaleTimeString()}
                            {/* <CallIcon className='text-green-700'/>
                            <EmailIcon className='text-blue-700'/> */}
                        </div>
                    </div>
                ))}
            </div>

        </Box>
    );
};

export default Attendance;
