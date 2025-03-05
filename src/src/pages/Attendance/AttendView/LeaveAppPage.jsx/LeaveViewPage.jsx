import React from 'react';

import {Box, IconButton} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';


const LeaveViewPage = () => {
    
    const userData = [
        {id:29431, name:'Emma Stone', empid:'Casual Leave', dept:'12/01/2024', desig:'26/01/2024', phone:'2 Days', joind:'Rest', work:'05/12/2023', profile:'Approved' },
        {id:48592, name:'Daniell Waish',  empid:'Sick Leave', dept:'12/01/2024', desig:'13/01/2024', phone:'7 Days', joind:'Hospital', work:'10/01/2024', profile:'New' },
        {id:39104, name:'Jason Hack',  empid:'Medical Leave', dept:'06/01/2024', desig:'12/01/2024', phone:'3 Days', joind:'Personal', work:'29/01/2024', profile:'New' },
        {id:11945, name:'Ted Bobby',  empid:'Casual Leave', dept:'03/02/2024', desig:'06/02/2024', phone:'3 Days', joind:'Personal', work:'14/01/2024', profile:'Rejected' },
        {id:11943, name:'Amina Hira',  empid:'Causal Leave', dept:'16/01/2024', desig:'19/01/2024', phone:'2 Days', joind:'Hospital', work:'16/01/2024', profile:'Approved' },
        {id:99032, name:'Nathan Percy',  empid:'Sick Leave', dept:'17/01/2024', desig:'17/01/2024', phone:'5 Days', joind:'Hospital', work:'18/03/2024', profile:'New' },
        {id:28149, name:'Ashley Dan',  empid:'Sick Leave', dept:'20/03/2024', desig:'25/03/2024', phone:'2 Days', joind:'Hospital', work:'17/03/2024', profile:'Approved' },
        {id:38149, name:'Dustin Zack',  empid:'Medical Leave', dept:'18/03/2024', desig:'20/03/2024', phone:'5 Days', joind:'Personal', work:'19/03/2024', profile:'Pending' },
        {id:88563, name:'Nathalie Soa',  empid:'Casul Leave', dept:'19/03/2024', desig:'21/03/2024', phone:'2 Days', joind:'Family Trip', work:'20/12/2023', profile:'Approved' },
        {id:99034, name:'Vanessa Gad',  empid:'Casual Leave', dept:'10/01/2024', desig:'15/01/2024', phone:'7 Days', joind:'Family Trip', work:'20/12/2023', profile:'Approved' },
        
        
    ];
    const getColor = (profile) => {
        switch (profile) {
            case 'Approved':
                return { bgColor: 'bg-green-950', textColor: 'text-green-500' };
            case 'New':
                return { bgColor: 'bg-sky-950', textColor: 'text-sky-500' };
            case 'Rejected':
                return { bgColor: 'bg-red-950', textColor: 'text-red-500' };
            case 'Pending':
                return { bgColor: 'bg-orange-950', textColor: 'text-orange-400' };
            default:
                return { bgColor: 'bg-gray-900', textColor: 'text-gray-500' };
        }
    };
    

    
   
    
    return (
        <Box sx={{backgroundColor: 'background.main',}}>
        <div className='flex flex-col'>
                <div className="flex items-center justify-between md:w-full p-4">
                        <div className="p-2">
                            <h1 className="text-2xl text-neutral-500">Leave Application</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <InfoOutlinedIcon />
                        </div>
                    </div>
               
            <Box className="w-full ml-2 md:ml-0 pt-4 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
                <div className='flex items-center mb-5 md:w-full'>
                        <p className='text-[8px] md:text-[12px]  pl-2 md:pl-5'>Show 10 <FontAwesomeIcon icon={faCaretDown} className='text-zinc-500 text-sm md:text-[12px] text-center ml-2 mr-2 text-center'/> entries</p>
                </div>
                <div className='w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-sm '>
                    <div className='flex flex-row border-b border-zinc-500'>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                            Emp ID
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Emp Name
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Leave Type
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                           From
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                           To
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Days
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                            Reason
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Applied On
                        </div>
                        <div className='w-[25%] md:w-[8%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Status
                        </div>
                        <div className='w-[25%] md:w-[12%] p-3  text-left text-sm md:text-xs font-bold'>
                            Action
                        </div>
                        
                    </div>
                    {userData.map((user) => (
                        <div key={user.id} className='flex flex-row border-b border-zinc-500'>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                            #{user.id}
                        </div>
                        <div className='w-[50%] md:w-[10%] p-1 border-r border-zinc-500 text-sm md:text-[10px] flex flex-row gap-2 flex items-center'>
                            <div className='flex justify-center items-center pl-2'>
                                <PersonIcon style={{ fontSize: '16px' }} className="text-zinc-300"/>
                            </div>
                            <div className=''>
                                {user.name}
                                
                            </div>
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                            {user.empid}
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                             {user.dept}
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                             {user.desig}
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                             {user.phone}
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                            {user.joind}
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                            {user.work}
                        </div>
                        <div className='w-[25%] md:w-[8%] p-3 border-r border-zinc-500'>
                        <div
                                    className={`px-0 py-0 rounded-lg text-sm md:text-[8px] flex justify-center items-center ${
                                        getColor(user.profile).bgColor
                                    } ${getColor(user.profile).textColor}`}
                                >
                                    {user.profile}
                                </div>
                        </div>
                        
                            <div className='w-[25%] md:w-[12%] flex flex-row gap-2 justify-center items-center'>
                                <IconButton><EditOutlinedIcon style={{ fontSize: '12px' }}  className=' rounded-sm'/></IconButton>
                                <IconButton><DeleteOutlineOutlinedIcon style={{ fontSize: '12px' }} className='text-blue-500 rounded-sm'/></IconButton>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-[95%] ml-2  md:ml-5 mt-5 flex justify-between items-center pb-2 mb-20 md:mb-0'>
                    <p className='text-sm md:text-[12px]  '>Showing Rows: 1-10 of 20</p>
                    <div className='flex flex-row gap-4'>
                    <KeyboardArrowLeftOutlinedIcon className='text-zinc-400'/>
                    <p className='text-zinc-400'>1</p>
                    <p className='text-zinc-400 bg-blue-500 w-[20px] h-[20px] flex items-center justify-center p-1 rounded-full'>2</p>
                </div>
                </div>
            </Box>
        </div>
        </Box>
    );
};

export default LeaveViewPage;
