import React from 'react';
import { Link } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
//import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

const InterviewCards = ({ currentScreen }) => {

    const jobs = [
        { title: 'Full Stack Developer', no:"10 Questions",  moreDetails: 'https://careers.clikkle.com/portalPage' },
        { title: 'Front End Developer',no:"10 Questions",  moreDetails: 'https://careers.clikkle.com/frontEndDeveloper' },
        { title: 'AWS Platform Engineer',no:"10 Questions",  moreDetails: 'https://careers.clikkle.com/awsPlatformEngineer' },
        { title: 'Data Architect/Engineer',no:"10 Questions",moreDetails: 'https://careers.clikkle.com/dataArchitectEngineer' },
        { title: 'Marketing Manager',no:"10 Questions",  moreDetails: 'https://careers.clikkle.com/marketingManager' },
        { title: 'Graphics Designer',no:"10 Questions", moreDetails: 'https://careers.clikkle.com/graphicsDesigner' },
        { title: 'Social Media Manager',no:"10 Questions",  moreDetails: 'https://careers.clikkle.com/socialMediaManager' },
        { title: 'Digital Analytics Implementation Specialist',no:"10 Questions",  moreDetails: 'https://careers.clikkle.com/digitalAnalytics' },
        { title: 'Senior Content Marketing Manager',no:"10 Questions", moreDetails: 'https://careers.clikkle.com/seniorContentManager' },
        { title: 'Business Systems Analyst',no:"10 Questions",  moreDetails: 'https://careers.clikkle.com/businessSystemAnalyst' },
       // { title: 'PHP Developer', salary: '27,000 CAD', location: 'Remote',experience:'2 Years', category: 'Engineering', moreDetails: 'https://careers.clikkle.com' },
       // { title: 'Product Manager', salary: '27,000 CAD', location: 'Remote',experience:'2 Years', category: 'Product', moreDetails: 'https://careers.clikkle.com' },
       // { title: 'Support Engineer', salary: '27,000 CAD', location: 'Remote',experience:'2 Years', category: 'Backend', moreDetails: 'https://careers.clikkle.com' },
       // { title: 'Senior IOS Developer', salary: '27,000 CAD', location: 'Remote',experience:'2 Years', category: 'Engineering', moreDetails: 'https://careers.clikkle.com' },
       // { title: 'The Hiring Hive', salary: '27,000 CAD', location: 'Remote', experience:'2 Years',category: 'General', moreDetails: 'https://careers.clikkle.com' },
       // { title: 'Senior Reporting analytics Developer', salary: '27,000 CAD ', location: 'Remote',experience:'2 Years', category: 'Business Intelligence', moreDetails: 'https://careers.clikkle.com' },
       // { title: 'Senior Data Scientist', salary: '27,000 CAD', location: 'Remote',experience:'2 Years', category: 'Business Intelligence', moreDetails: 'https://careers.clikkle.com' },
        //{ title: 'Product Manager', salary: '27,000 CAD', location: 'Remote', experience:'2 Years',category: 'Engineering', moreDetails: 'https://careers.clikkle.com' },
       // { title: 'Revenue Product Manager', salary: '27,000 CAD', location: 'Remote',experience:'2 Years', category: 'Product', moreDetails: 'https://careers.clikkle.com' },
        //{ title: 'Senior Android Developer', salary: '27,000 CAD', location: 'Remote',experience:'2 Years', category: 'Engineering', moreDetails: 'https://careers.clikkle.com' },
    ];

    const jobsPerPage = 6;
    const startIndex = (currentScreen - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const jobsForCurrentScreen = jobs.slice(startIndex, endIndex);

    const handleEdit = (jobId) => {
        
        console.log(`Editing job with ID: ${jobId}`);
    };

    const handleDelete = (jobId) => {
        
        console.log(`Deleting job with ID: ${jobId}`);
    };

    

    return (
        <div className="flex flex-col gap-4 w-full pl-4 overscroll-y-auto">
            {jobsForCurrentScreen.map((job) => (
                <div className='flex flex-col md:flex-row items-center w-full gap-4 md:gap-0' key={job.id}>
                    <Box className=" w-[90%] md:w-[88%] flex  md:justify-between md:gap-0 gap-2 rounded-lg p-4" sx={{ backgroundColor: 'background.view', }}>
                        <div className=' w-full md:w-1/5 flex flex-col'>

                            <h2 className="text-sm font-semibold">{job.title}</h2>
                            <h2 className="text-xs text-zinc-400">{job.no}</h2>
                        </div>
                        <div className='w-full md:w-1/6 flex justify-end items-center gap-2'>
                            <Link to={job.moreDetails} className="text-blue-500">Show Details</Link>
                            <KeyboardArrowDownOutlinedIcon fontSize='medium' className="text-blue-500" />
                        </div>
                       
                    </Box>
                    <div className='w-5/6 md:w-[12%] flex flex-row gap-2 items-center justify-end md:justify-center'>
                        <IconButton onClick={() => handleEdit(job.id)}><EditOutlinedIcon className='text-blue-700' /></IconButton>
                        <IconButton onClick={() => handleDelete(job.id)}><DeleteOutlineOutlinedIcon className='text-red-700' /></IconButton>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InterviewCards;
