import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import {Box, IconButton} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import axios from 'axios';
import { useEmployees } from '../../hooks/Authorize';
import moment from 'moment';
import { data } from 'autoprefixer';
import { Link } from 'react-router-dom';

const EmployeePage = () => {

    const [employLists, setEmployLists] = useState(null);
    const [department, setDepartment] = useState(null);
    const [maleEmployee,setMaleEmployee] = useState(0);
    const [newEmployee,setNewEmployee] = useState(0);
    const [pageLimit, setPageLimit] = useState(0);
    const [totalEmployee, setTotalEmployee] = useState(0);

    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('Active');
    const employees = useEmployees();

    console.log(employees);

    const fetchEmploees = useCallback(
        async (search = '') => {
            try {
                const response = await axios.get(
                    `/hr/employee?searchBy=firstName&search=${search}&sortBy=order&status=${status}&page=${page}`
                );
                setEmployLists(response.data.employees);
                setPageLimit(response.data.pageData.totalPages);
                setTotalEmployee(response.data.pageData.totalData);
                const filteredFruits = response.data.employees.filter(male => male.gender==='male');
                setMaleEmployee(filteredFruits.length)
                // const newEmployeeFilter =  response.data.employees.filter(jod => jod.dateOfJoining === Date.now());
                // setNewEmployee(newEmployeeFilter)
                // console.log(Date.now())
            } catch (e) {
                console.log(e);
            }
        },
        [setEmployLists, page, status]
    );

    const fetchDepartment = useCallback(
        async function () {
            try {
                const response = await axios.get(`/hr/department`);
                setDepartment(response.data.departments);
            } catch (e) {
                console.log(e);
            }
        },
        [setDepartment]
    );
    // const { modalState, closeModal, openModal } = useModal();

    // const handleChangeTermination = id => {
    //     setSuspendId(id);
    //     openModal();
    // };
    const convertToTwoDigits = number => number.toString().padStart(2, '0');

    useEffect(() => {
        fetchEmploees();
        fetchDepartment();
    }, [fetchEmploees, fetchDepartment]);
    
    

    const boxesData = [
        { icon: <GroupOutlinedIcon fontSize='large' className="text-white  bg-green-600 p-2 rounded-lg" />, title: 'Total Employees',  value: <Typography variant="body1" style={{ color: '#00FF00', fontSize: '1.2em' }}>{employLists?.length}</Typography>, description: '124 for last month', trendIcon: <TrendingUp className="text-green-500" /> },
        { icon: <MaleOutlinedIcon fontSize='large' className="text-white bg-teal-700 p-2 rounded-lg" />, title: 'Total Male Employees', value: <Typography variant="body1" style={{ color: '#5eead4', fontSize: '1.2em' }}>{maleEmployee}</Typography>, description: '124 for last month,', trendIcon: <TrendingDown className="text-red-500" /> },
        { icon: <FemaleOutlinedIcon fontSize='large' className="text-white bg-teal-950 p-2 rounded-lg" />, title: 'Total Female Employees', value: <Typography variant="body1" style={{ color: '#f472b6', fontSize: '1.2em' }}>{employLists?.length - maleEmployee}</Typography>, description: '124 for last month', trendIcon: <TrendingDown className="text-red-500" /> },
        { icon: <GroupsOutlinedIcon  fontSize='large' className="text-white bg-red-800 p-2 rounded-lg" />, title: 'Total New Employees', value: <Typography variant="body1" style={{ color: '#FF0000', fontSize: '1.2em' }}>{newEmployee}</Typography>, description: '124 for last month', trendIcon: <TrendingDown className="text-red-500" /> }
    ];
   console.log(employLists)
   console.log(department)
    
    return (
        <Box sx={{backgroundColor: 'background.main',}}>
        <div className='flex flex-col'>
                <div className="flex items-center justify-between md:w-full p-4">
                        <div className="p-2">
                            <h1 className="text-2xl text-neutral-500">Employees</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <button className='flex  items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                                Add New Employee
                            </button>
                            <InfoOutlinedIcon />
                        </div>
                    </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-full">
                        <div  className="flex flex-col gap-4 mb-4 md:flex-row md:flex-row">
                            {boxesData.map((box, index) => (
                                <Grid sx={{backgroundColor: 'background.view',}}  key={index} className="rounded-lg p-4 shadow-md md:w-1/4">
                                    <p className='text-lg'>{box.title}</p>
                                    <div className="flex items-center mb-2">
                                        <p className="w-5/6 text-xl">{box.value}</p>
                                        <div className="w-1/6">{box.icon}</div>
                                    </div>
                                </Grid>
                            ))}
                        </div>
                    </div>  
                </div>
            <Box className="w-full ml-2 md:ml-0 pt-4 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
                <div className='flex items-center justify-between md:w-full'>
                    <div>
                    <p className=" mb-4 border-l-4 border-blue-500 pl-3 text-xl" gutterBottom>
                        Employees List
                    </p>
                    </div>
                    <div className='flex flex-row items-center justify-center gap-4 mr-8'>
                        <p className='text-sm md:text-base text-zinc-400 pl-2 md:pl-5'>Rows per page: 10 <FontAwesomeIcon icon={faCaretDown} className='text-zinc-500 text-lg md:text-2xl text-center ml-2'/></p>
                    </div>
                </div>
                <div className='w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-sm '>
                    <div className='flex flex-row border-b border-zinc-500'>
                        <div className='w-[25%] md:w-[5%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                            No
                        </div>
                        <div className='w-[50%] md:w-[15%] p-2 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Emp Name
                        </div>
                        <div className='w-[25%] md:w-[10%] p-2 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Emp ID
                        </div>
                        <div className='w-[25%] md:w-[8%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                            Department
                        </div>
                        <div className='w-[50%] md:w-[12%] p-2 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Designation
                        </div>
                        <div className='w-[25%] md:w-[10%] p-2 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Phone No
                        </div>
                        <div className='w-[25%] md:w-[10%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                            Join Date
                        </div>
                        <div className='w-[50%] md:w-[10%] p-2 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            At Work
                        </div>
                        <div className='w-[25%] md:w-[10%] p-2 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Status
                        </div>
                        <div className='w-[25%] md:w-[10%] p-2  text-left text-sm md:text-xs font-bold'>
                            Action
                        </div>
                        
                    </div>
                    {employLists?.map((employee,index) => (
                        <div key={index} className='flex flex-row border-b border-zinc-500'>
                        <div className='w-[25%] md:w-[5%] p-2 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                            {index+1}
                        </div>
                        <div className='w-[50%] md:w-[15%] p-0 border-r border-zinc-500 text-sm md:text-[10px] flex flex-row gap-2 flex items-center'>
                            <div className='flex justify-center items-center pl-4'>
                                <PersonIcon style={{ fontSize: '16px' }} className="text-zinc-300"/>
                            </div>
                            <div className='flex flex-col gap-0'>
                                {employee.firstName} {employee.lastName}{' '}
                                <p className='text-[6px]'>{employee.mail}</p>
                            </div>
                        </div>
                        <div className='w-[25%] md:w-[10%] p-2 border-r border-zinc-500 text-sm md:text-[10px]'>
                            {employee._id}
                        </div>
                        <div className='w-[25%] md:w-[8%] p-2 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                             {employee?.dept}
                        </div>
                        <div className='w-[50%] md:w-[12%] p-2 border-r border-zinc-500 text-sm md:text-[10px]'>
                             {employee.designation}
                        </div>
                        <div className='w-[25%] md:w-[10%] p-2 border-r border-zinc-500 text-sm md:text-[10px]'>
                        {employee.phone.countryCode} {employee.phone.phone}
                        </div>
                        <div className='w-[25%] md:w-[10%] p-2 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                        {moment(employee.dateOfJoining)
                                                    .utc()
                                                    .format('MM-DD-YYYY')}
                        </div>
                        <div className='w-[50%] md:w-[10%] p-2 border-r border-zinc-500 text-sm md:text-[10px]'>
                            {employee?.work}
                        </div>
                        <div className='w-[25%] md:w-[10%] p-2 border-r border-zinc-500 text-sm md:text-xs'>
                        <button className='flex  items-center text-white font-bold text-[6px] md:text-[8px] py-0 md:py-0 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                        {employee.status}
                            </button>
                        </div>
                        
                            <div className='w-[25%] md:w-[10%] flex flex-row gap-2 justify-center items-center'>
                                <Link to={`/performance/${employee._id}`}>
                                <IconButton><EditOutlinedIcon style={{ fontSize: '12px' }}  className=' rounded-sm'/></IconButton>
                                </Link>
                                
                                <IconButton><DeleteOutlineOutlinedIcon style={{ fontSize: '12px' }} className='text-blue-500 rounded-sm'/></IconButton>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-[95%] ml-2  md:ml-9 mt-2 flex justify-between items-center pb-2 mb-20 md:mb-0'>
                    <p className='text-sm md:text-base text-zinc-400 '>Showing Rows: 1-10 of 20</p>
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

export default EmployeePage;
