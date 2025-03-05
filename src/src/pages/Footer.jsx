import React, { useState } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import VideoChatOutlinedIcon from '@mui/icons-material/VideoChatOutlined';
import { Link } from 'react-router-dom';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import { Box } from '@mui/material';

const Footer = () => {
    const [activeIcon, setActiveIcon] = useState(null);

    const handleIconClick = (iconName) => {
        setActiveIcon(iconName === activeIcon ? null : iconName);
    };

    return (
        <Box className='fixed bottom-0 w-full  p-2 flex flex-row gap-4 items-center justify-center md:hidden' sx={{ backgroundColor: 'background.view' }}>
            <Link to="/">
                <div className="flex flex-col items-center justify-center  w-[50px]" onClick={() => handleIconClick('home')}>
                    <div className={`${activeIcon === 'home' && 'text-white rounded-lg bg-blue-700 w-[90%] flex justify-center px-2 py-1'}`}>
                        <HomeOutlinedIcon />
                    </div>
                    <p className={`${activeIcon === 'home' && 'text-sky-500 text-[10px]'}`}>Home</p>
                </div>
            </Link>
            <Link to="/receivedapplications">
                <div className="flex flex-col items-center justify-center  w-[50px]" onClick={() => handleIconClick('ats')}>
                    <div className={`${activeIcon === 'ats' && 'text-white rounded-lg bg-blue-700 w-full flex justify-center px-2 py-1'}`}>
                        <ContactMailOutlinedIcon/>
                    </div>
                    <p className={`${activeIcon === 'ats' && 'text-sky-500 text-[10px]'}`}>ATS</p>
                </div>
            </Link>
            <Link to="/apps">
                <div className="flex flex-col items-center justify-center  w-[70px]" onClick={() => handleIconClick('app')}>
                     <div className={`${activeIcon === 'app' && 'text-white rounded-lg bg-blue-700 w-full flex justify-center px-2 py-1'}`}>
                        <AppsOutlinedIcon fontSize='large'/>
                    </div>
                   
                </div>
                </Link>
            <Link to="/attendance">
                <div className="flex flex-col items-center justify-center w-[50px]" onClick={() => handleIconClick('attendance')}>
                     <div className={`${activeIcon === 'attendance' && 'text-white rounded-lg bg-blue-700 w-full flex justify-center px-2 py-1'}`}>
                        <TaskOutlinedIcon/>
                    </div>
                    <p className={`${activeIcon === 'attendance' && 'text-sky-500 text-[10px]'}`}>Projects</p>
                </div>
            </Link>
            <Link to="/chat">
                <div className="flex flex-col justify-center items-center w-[50px]" onClick={() => handleIconClick('chat')}>
                    <div className={`${activeIcon === 'chat' && 'text-white rounded-lg bg-blue-700 w-full flex justify-center px-2 py-1'}`}>
                        <VideoChatOutlinedIcon  />
                    </div>
                    <p className={`${activeIcon === 'chat' && 'text-sky-500 text-[10px]'}`}>Chat</p>
                </div>
            </Link>
        </Box>
    );
};

export default Footer;
