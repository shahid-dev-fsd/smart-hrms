import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import GroupIcon from '@mui/icons-material/Group';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Charts from '../DashComponents/charts'; 
import NoticeBoard from '../DashComponents/noticeboard';
import UpcomingEvents from '../DashComponents/upcomingevents';
import Bars from '../DashComponents/bars';
import RecentActivity from '../DashComponents/recent';
import GenderChart from '../DashComponents/GenderChart';
import RecentJobs from '../DashComponents/recentJobs';
import Attendance from '../DashComponents/attend';
import {Box} from '@mui/material'
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ProjectMilesTone from './ProjectMilstone';
import ProjectActivity from './ProjectActivity';

function Dashboard() {

    const [overview, setOverview] = useState({});
    const fetchOverview = useCallback(async () => {
        try {
            const response = await axios.get(`/hr/dashboard`);
            setOverview(response.data.overview);
        } catch (e) {
            console.log(e);
        }
    }, [setOverview]);

    useEffect(() => {
        fetchOverview();
    }, [fetchOverview]);
    console.log(overview)

    const data = [
        { name: 'Jan', employees: 100, budget: 200, year: 2024 },
        { name: 'Feb', employees: 150, budget: 220, year: 2024 },
        { name: 'Mar', employees: 200, budget: 250, year: 2024 },
        { name: 'Apr', employees: 180, budget: 230, year: 2024 },
        { name: 'May', employees: 210, budget: 240, year: 2024 },
        { name: 'Jun', employees: 220, budget: 260, year: 2024 },
        { name: 'Jan', employees: 100, budget: 200, year: 2024 },
        { name: 'Feb', employees: 150, budget: 220, year: 2024 },
        { name: 'Mar', employees: 200, budget: 250, year: 2024 },
        { name: 'Apr', employees: 180, budget: 230, year: 2024 },
        { name: 'May', employees: 210, budget: 240, year: 2024 },
        { name: 'Jun', employees: 220, budget: 260, year: 2024 },
    ];
    const barsData = [
        { name: 'Thu', inProgress: 50, pending: 20, completed: 30 },
        { name: 'Sun', inProgress: 30, pending: 20, completed: 20 },
        { name: 'Tue', inProgress: 20, pending: 50, completed: 5 },
        { name: 'Fri', inProgress: 30, pending: 20, completed: 41 },
        { name: 'Sat', inProgress: 20, pending: 0, completed: 40 },
        { name: 'Mon', inProgress: 30, pending: 20, completed: 50 },
        { name: 'Wed', inProgress: 50, pending: 10, completed: 40 },
    ];
    

    const boxesData = [
        { icon: <GroupIcon fontSize='large' className="text-white  bg-sky-400 p-2 rounded-lg" />, title: 'Total Employees',  value: <Typography variant="body1" style={{ color: '#00FF00', fontSize: '1.2em' }}>{overview?.employees?.total}</Typography>, description: '124 for last month', trendIcon: <TrendingUp className="text-green-500" /> },
        { icon: <ApartmentIcon fontSize='large' className="text-white bg-rose-500 p-2 rounded-lg" />, title: 'Department', value: <Typography variant="body1" style={{ color: '#FF0000', fontSize: '1.2em' }}>{overview?.departments}</Typography>, description: '124 for last month,', trendIcon: <TrendingDown className="text-red-500" /> },
        { icon: <ApartmentIcon fontSize='large' className="text-white bg-rose-500 p-2 rounded-lg" />, title: 'Department', value: <Typography variant="body1" style={{ color: '#FF0000', fontSize: '1.2em' }}>{overview?.departments}</Typography>, description: '124 for last month,', trendIcon: <TrendingDown className="text-red-500" /> },

        { icon: <AttachMoneyIcon fontSize='large' className="text-white bg-blue-500 p-2 rounded-lg" />, title: 'Expenses', value: <Typography variant="body1" style={{ color: '#FF0000', fontSize: '1.2em' }}>$ {
            overview.expenses
                ? overview.expenses.reduce(
                      (total, el) => total + el.price,
                      0
                  )
                : 0
        }</Typography>, description: '124 for last month', trendIcon: <TrendingDown className="text-red-500" /> }
    ];
    const boxesData1 = [
        { icon: <GroupIcon fontSize='large' className="text-white  bg-sky-400 p-2 rounded-lg" />, title: 'Figma',  value: <Typography variant="body1" style={{ color: '#00FF00' }}>Designing Departments</Typography>, description: '124 for last month', trendIcon: <TrendingUp className="text-green-500" /> },
        { icon: <ApartmentIcon fontSize='large' className="text-white bg-rose-500 p-2 rounded-lg" />, title: 'Department', value: <Typography variant="body1" style={{ color: '#FF0000', fontSize: '1.2em' }}>{overview?.departments}</Typography>, description: '124 for last month,', trendIcon: <TrendingDown className="text-red-500" /> },
        { icon: <ApartmentIcon fontSize='large' className="text-white bg-rose-500 p-2 rounded-lg" />, title: 'Department', value: <Typography variant="body1" style={{ color: '#FF0000', fontSize: '1.2em' }}>{overview?.departments}</Typography>, description: '124 for last month,', trendIcon: <TrendingDown className="text-red-500" /> },

        { icon: <AttachMoneyIcon fontSize='large' className="text-white bg-blue-500 p-2 rounded-lg" />, title: 'Expenses', value: <Typography variant="body1" style={{ color: '#FF0000', fontSize: '1.2em' }}>$ {
            overview.expenses
                ? overview.expenses.reduce(
                      (total, el) => total + el.price,
                      0
                  )
                : 0
        }</Typography>, description: '124 for last month', trendIcon: <TrendingDown className="text-red-500" /> }
    ];
    // const eventData = [
    //     { date: '5 Mar', title: 'Board Meeting', description: 'Attend board meeting with company manager.', backgroundColor: '#fbbf24' },
    //     { date: '9 Mar', title: 'Design Team Meeting', description: 'Attend design team meeting with team mates and HOD.', backgroundColor: '#dc2626' },
    //     { date: '7 Feb', title: 'Tech Conference', description: 'Attend conference with teammates and other departments.', backgroundColor: '#f97316' },
    //     { date: '4 Mar', title: 'Development Team Pitch', description: 'Pitch idea on new development to the company board,', backgroundColor: '#3b82f6' },
    // ];
    
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


  return (
    <Box sx={{backgroundColor: 'background.main',}}>
    <div className='flex flex-col'>
        <div className="p-2">
        <div className="flex items-center justify-between md:w-full p-4">
                        <div className="p-2">
                            <h1 className="text-2xl text-neutral-500">Project Dashboard</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <button className='flex  items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                                Create New Projet
                            </button>
                            <InfoOutlinedIcon />
                        </div>
                    </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-4/4">
                    <div  className="flex flex-col gap-4 mb-4 md:flex-row md:flex-row">
                        {boxesData.map((box, index) => (
                            <Grid sx={{backgroundColor: 'background.view',}}  key={index} className="rounded-lg p-4 shadow-md md:w-1/2">
                                <p className='text-xl'>{box.title}</p>
                                <div className="flex items-center mb-2">
                                    <p className="w-5/6 text-xl">{box.value}</p>
                                    <div className="w-1/6">{box.icon}</div>
                                </div>
                                {/* <div className="flex items-center gap-2">
                                    {box.trendIcon}
                                    <p variant="body2" className="ml-2">{box.description}</p>
                                </div> */}
                            </Grid>
                        ))}
                    </div>
                    {/* <Charts data={data} /> */}
                </div>
                {/* <div className="w-full md:w-1/4">
                    <NoticeBoard eventData={overview?.notices} />
                    <UpcomingEvents />
                </div> */}
            </div>
            <div className="p-2">
                            <Typography className="text-2xl text-neutral-500">Recent Project Dashboard</Typography>
                        </div>
            <div className="flex flex-col md:flex-row gap-4">
           
                <div className="w-full md:w-4/4">
                    <div  className="flex flex-col gap-4 mb-4 md:flex-row md:flex-row">
                        {boxesData1.map((box, index) => (
                            <Grid sx={{backgroundColor: 'background.view',}}  key={index} className="rounded-lg p-4 shadow-md md:w-1/2">
                                <p className='text-xl'>{box.title}</p>
                                <div className="flex items-center mb-[16px]">
                                    <p className="w-5/6 ">{box.value}</p>
                                    <div className="w-1/6">{box.icon}</div>
                                </div >
                                <div className='mb-[10px] mt-[2px]'>
                                    <p className='text-sm ' style={{fontSize:"12px"}}>Mobile App Ui Design</p>
                                </div>
                                <div>
                                <div className='border-1 w-full' style={{border:'0.5px solid white'}}></div>

                                </div>
                                <div className="flex items-center justify-between gap-2 mt-2">
                                    <div style={{display:'flex' , flexDirection:'row'}}>
                                        {
                                            avatarData.map((item)=>(
                                                <>
                                                                                <div class="MuiAvatar-root MuiAvatar-circular css-1m7vhif-MuiAvatar-root" style={{width: "21px" ,  height:"22px"}}><img alt="Remy Sharp" src={item.src} /></div>   
    
                                                </>
                                            ))
                                        }
                                                                    

                                        </div> 
                                    <div  className='text-cnter row'  style={{display:'flex' , flexDirection:'row'}}> <p variant="body2"
                                    style={{    borderRadius: "5px" ,
                                        border: "1px solid green" ,
                                        padding: "5px" ,                         
                                       textAlign: "center" ,
                                        height: "25px" ,
                                        width: "51px" ,
                                        fontSize: "10px"}}
                                    
                                    className="p-2">Low</p> <span><MoreVertIcon/></span>
</div>
                                </div>
                            </Grid>
                        ))}
                    </div>
                    {/* <Charts data={data} /> */}
                </div>
                {/* <div className="w-full md:w-1/4">
                    <NoticeBoard eventData={overview?.notices} />
                    <UpcomingEvents />
                </div> */}
            </div>
        </div>
        <div className='w-full  flex flex-col md:flex-row p-2'>
            <div className='w-full md:w-1/1 mx-1 mb-2 md:mb-0'>
                <Bars barsData={barsData}/>
            </div>
            <div className='w-full md:w-1/3 mx-1 mb-2 md:mb-0'>
                <ProjectMilesTone/>
            </div>
         
        </div>
        <div className="w-full flex flex-col md:flex-row p-2 h-full">
    <div className="w-full md:w-3/4 mx-1 mb-2 md:mb-0 flex-grow">
        <ProjectActivity />
    </div>
    <div className="w-full md:w-1/4 mx-1 mb-2 md:mb-0 flex-grow">
        <GenderChart />
    </div>
</div>

        
    </div>
    </Box>
  )
}

export default Dashboard