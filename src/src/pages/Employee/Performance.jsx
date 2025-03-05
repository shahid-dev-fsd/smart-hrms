import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import profile from '../ReceivedApp/profile.png';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ProgressCircle = ({ percentage, color }) => {
    const circleStyle = {
        width: '60px',
        height: '60px',
        backgroundColor: 'transparent',
        borderRadius: '50%',
        border: `4px solid ${color} `,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        color: color,
        
    };


    return (
        <div style={circleStyle}>
            {percentage}%
        </div>
    );
};

const ProgressBar = ({ percentage, color }) => {
    const barStyle = {
        width: '100%',
        height: '8px',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
    };

    const progressStyle = {
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: color,
        borderRadius: '8px',
    };

    return (
        <div style={barStyle}>
            <div style={progressStyle}></div>
        </div>
    );
};

const PerformancePage = () => {

    const id = useParams().id;
    console.log("id" , id)
    const [value, setValue] = useState(0);
    const [employeeDetail, setEmployeeDetail] = useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const fetchEmployeeDetails = useCallback(
        async function () {

            try {
                const response = await axios.get(`/employee/profile/${id}`);
                console.log(response);
                setEmployeeDetail(response.data.employee);
            } catch (e) {
                console.log(e);
            }
        },
        [setEmployeeDetail, id]
    );
    useEffect(() => {
        fetchEmployeeDetails();
    }, [fetchEmployeeDetails]);

    console.log(employeeDetail);
    return (
        <Box sx={{ backgroundColor: 'background.main' }}>
            <div className='flex flex-col'>
                <div className="flex items-center justify-between md:w-full p-4">
                    <div className="p-2">
                        <h1 className="text-2xl text-neutral-500">Employee</h1>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <Link to={`/viewemployee/${id}`}>
                            <button className='flex items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                                Edit Employee
                            </button>
                        </Link>
                        <InfoOutlinedIcon />
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center gap-1 items-center'>
                <img src={profile} alt="Profile" className="w-[20%] md:w-full max-w-[100px] h-auto" />
                <h1 className='text-[18px] text-center font-bold'>{employeeDetail?.firstName} {employeeDetail?.lastName}{' '}</h1>
                <p className='text-[12px] text-zinc-400 text-center'>{employeeDetail?.designation}</p>
                <div className='flex flex-row gap-1 justify-center'>
                    <StarIcon style={{ fontSize: '12px' }} className='text-yellow-400' /><StarIcon style={{ fontSize: '12px' }} className='text-yellow-400' /><StarIcon style={{ fontSize: '12px' }} className='text-yellow-400' /> <StarBorderOutlinedIcon style={{ fontSize: '12px' }} /> <StarBorderOutlinedIcon style={{ fontSize: '12px' }} />
                </div>
            </div>
            <div className='flex flex-row justify-center gap-10 items-center mt-8'>
                <div className='flex flex-col justify-center'>
                    <p className='text-zinc-400 text-[12px] text-center'>January</p>
                    <p className='text-[16px] text-center'><span className='text-blue-500 text-[16px]'>15</span>/31</p>
                    <p className='text-[12px] text-zinc-400 text-center'>Attendance</p>
                </div>
                <div className='flex flex-col justify-center'>
                    <p className='text-zinc-400 text-[12px] text-center'>Year-2020</p>
                    <p className='text-[16px] text-center'><span className='text-green-500 text-[16px]'>0</span>/61</p>
                    <p className='text-[12px] text-zinc-400 text-center'>Awards</p>
                </div>
                <div className='flex flex-col justify-center'>
                    <p className='text-zinc-400 text-[12px] text-center'>Year-2020</p>
                    <p className='text-[16px] text-center text-amber-500'>0</p>
                    <p className='text-[12px] text-zinc-400 text-center'>Leaves</p>
                </div>
            </div>
            <Box className="w-full ml-2 md:ml-0 pt-4 rounded-lg mb-4 mt-10 mb-30" sx={{ backgroundColor: 'background.view' }}>
                <div className='flex items-center justify-between md:w-full'>
                    <div>
                        <p className="mb-4 border-l-4 border-blue-500 pl-3 text-xl" gutterBottom>
                            2021 Statistics
                        </p>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row gap-10 justify-center'>
                        <div className='flex flex-col justify-center'>
                            <ProgressCircle percentage={65} color="green" />
                            <p className='text-center text-[16px]'>Attendance</p>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <ProgressCircle percentage={60} color="orange" />
                            <p className='text-center text-[16px]'>Performance</p>
                        </div>
                        <div className='flex flex-col justify-center'>
                            <ProgressCircle percentage={90} color="blue" />
                            <p className='text-center text-[16px]'>Projects</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 w-full p-4'>
                        <div className='flex flex-col'>
                            <p className='text-[16px]'>This Week</p>
                            <ProgressBar percentage={52} color="green" />
                        </div>
                        <div className='flex flex-col justify-center'>
                            <p className='text-[16px]'>This Month</p>
                            <ProgressBar percentage={70} color="orange" />
                        </div>
                        <div className='flex flex-col justify-center'>
                            <p className='text-[16px]'>This Year</p>
                            <ProgressBar percentage={90} color="blue" />
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    );
};

export default PerformancePage;
