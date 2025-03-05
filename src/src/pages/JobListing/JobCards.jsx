import React from 'react';
import { Link } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import FilterOutlinedIcon from '@mui/icons-material/FilterOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box } from '@mui/material';

const JobCards = ({ currentScreen,jobs }) => {



    const handleDelete = (jobId) => {
        
        console.log(`Deleting job with ID: ${jobId}`);
    };

    const handleCopy = (jobId) => {
        
        console.log(`Copying details of job with ID: ${jobId}`);
    };

    return (
        <div className="flex flex-col gap-4 w-full pl-4 overscroll-y-auto">
            {jobs?.map((job,index) => (
                <div className='flex flex-col md:flex-row items-center w-full gap-4 md:gap-0' key={index}>
                    <Box className=" w-[90%] md:w-[98%] flex flex-col md:flex-row  md:gap-0 gap-2 mr-4 md:mr-0 rounded-lg p-4" sx={{ backgroundColor: 'background.view', }}>
                        <div className=' w-full md:w-1/5'>

                            <h2 className="text-sm font-semibold">{job.title}</h2>
                        </div>
                        <div className='w-full md:w-1/5 flex justify-start md:justify-center items-center gap-2'>
                            <AccountBalanceWalletOutlinedIcon fontSize='small' className='text-zinc-400' />
                            <p className="text-zinc-400 md:text-sm">{job.salary.amount}</p>
                        </div>
                        <div className='w-full md:w-1/5 flex justify-start md:justify-center items-center gap-2'>
                            <WorkOutlineIcon fontSize='small' className='text-zinc-400' />
                            <p className="text-zinc-400 md:text-sm">{job.experience}</p>
                        </div>
                        <div className='w-full md:w-1/4 flex justify-start md:justify-center items-center gap-2'>
                            <LocationOnOutlinedIcon fontSize='small' className='text-zinc-400' />
                            <p className="text-zinc-400 md:text-sm">{job.location}</p>
                        </div>
                        <div className='w-full md:w-1/6 flex justify-start items-center'>
                            <FontAwesomeIcon icon={faLayerGroup} className="text-zinc-500 mr-2" />
                            <p className="text-zinc-400 md:text-sm">{job.category}</p>
                        </div>
                        <div className='w-full md:w-1/6 flex justify-end items-center gap-2'>
                            <Link to={job.moreDetails} className="text-blue-500">Show Details</Link>
                            <KeyboardArrowDownOutlinedIcon fontSize='medium' className="text-blue-500" />
                        </div>
                        <div className='flex flex-row gap-1 items-center justify-end md:justify-center md:ml-5'>
                            <Link to="/joblisting/edit"   state={job}>
                                <EditOutlinedIcon />
                            </Link>
                            <FilterOutlinedIcon onClick={() => handleCopy(job.id)}/>
                            <DeleteOutlineOutlinedIcon onClick={() => handleDelete(job._id)} />
                        </div>
                    </Box>
                </div>
            ))}
        </div>
    );
};

export default JobCards;
