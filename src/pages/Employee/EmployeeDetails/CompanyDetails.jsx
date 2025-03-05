import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import moment from 'moment';
import axios from 'axios';
import { useForm } from '../../../hooks/useForm/useForm';

const CompanyDetails = ({ id, department, designation, jobType, amount, dateOfJoining, employeeDetail }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [Department , setDepartment] = useState('');
    const [designationval , setDesignationVal]= useState('');
    console.log("employeeDetail", employeeDetail)

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const dateJoining = moment(dateOfJoining).utc().format('YYYY-MM-DD');

    const handlers = useForm(
        useMemo(
            () => ({
                userId: { value: id },
                dateOfJoining: { value: dateJoining },
                resignationDate: '',
                terminationDate: '',
                creditLeaves: '',
                department: { value: department },
                designation: { value: designation },
                salary: { value: amount },
            }),
            [id, department, designation, amount, dateJoining]
        ),
        { Input: TextField }
    );

    const [employee, setEmployee] = useState({
        jobType: jobType,
        department: department,
    });

    const [departments, setDepartments] = useState([]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEmployee({ ...employee, [name]: value });
    };

    const fetchDesignation = useCallback(async () => {
        try {
            const response = await axios.get(`/hr/job-listing`);
            const departmentsData = response.data.jobs;
            console.log("departmentsData" , departmentsData.jobs)


            const matchedDesignation = departmentsData && departmentsData.find((item) => item._id === designation);
            console.log("matchedDesignation", matchedDesignation);
            // setDepartment(matchedDepartment);
            setDesignationVal(matchedDesignation.
                
title);
    
        } catch (e) {
            console.log(e);
        }
    }, []);
    

    const fetchDepartment = useCallback(async () => {
        try {
            const response = await axios.get(`/hr/department?sortBy=order`);
            const departmentsData = response.data.departments;
            setDepartments(departmentsData);
    
            const matchedDepartment = departmentsData && departmentsData.find((item) => item._id === department);
            console.log("matchedDepartment", matchedDepartment);
            setDepartment(matchedDepartment);
    
        } catch (e) {
            console.log(e);
        }
    }, [department]);

    useEffect(() => {
        fetchDepartment();
        fetchDesignation();
    }, [fetchDepartment]);

    return (
        <Box className="w-full ml-2 md:ml-0 rounded-lg mb-4" sx={{ backgroundColor: 'background.view' }}>
            {currentPage === 1 && (
                <div className='w-[99%] p-2 flex flex-col gap-6'>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-col md:flex-row w-full gap-[6px]'>
                            <div className='w-full md:w-1/6 flex items-center'>
                                <p className='text-[16px]'>Employee ID</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input
                                    type="text"
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                                    placeholder='ID'
                                    value={id}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-col md:flex-row w-full gap-[6px]'>
                            <div className='w-full md:w-1/6 flex items-center'>
                                <p className='text-[16px]'>Department</p>
                            </div>
                            <div className='w-full   flex items-center'>
                            <FormControl sx={{ width: '100%', height: '40px' }} size="small">
            <Select
                value={employee.department}
                onChange={handleChange}
                name="department"
                
                inputProps={{ 'aria-label': 'Department' }}
                className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                sx={{ height: '40px', display: 'flex', alignItems: 'center' }}
            >
                <MenuItem value={Department.name} >{Department.name}</MenuItem>
                {departments.map((dept) => (
                    <MenuItem key={dept._id} value={dept._id}>
                        {dept.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-col md:flex-row w-full gap-[6px]'>
                            <div className='w-full md:w-1/6 flex items-center'>
                                <p className='text-[16px]'>Designation</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input
                                    type="text"
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                                    placeholder='Designation'
                                    value={designationval}
                                    onChange={(e)=>setDesignationVal(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-col md:flex-row w-full gap-[6px]'>
                            <div className='w-full md:w-1/6 flex items-center'>
                                <p className='text-[16px]' style={{ textWrap: 'nowrap' }}>Date Of Joining</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input
                                    type="date"
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                                    placeholder='DD-MM-YYYY'
                                    value={dateJoining}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-col md:flex-row w-full gap-[6px]'>
                            <div className='w-full md:w-1/6 flex items-center'>
                                <p className='text-[16px]'>Resignation Date</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input
                                    type="date"
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                                    placeholder='DD-MM-YYYY'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-col md:flex-row w-full gap-[6px]'>
                            <div className='w-full md:w-1/6 flex items-center'>
                                <p className='text-[16px]' style={{ textWrap: 'nowrap' }}>Termination Date</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input
                                    type="date"
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                                    placeholder='DD-MM-YYYY'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-col md:flex-row w-full gap-[6px]'>
                            <div className='w-full md:w-1/6 flex items-center'>
                                <p className='text-[16px]' style={{ textWrap: 'nowrap' }}>Credit Leaves <HelpOutlinedIcon style={{ fontSize: "16px" }} /></p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input
                                    type="text"
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                                    placeholder='0'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {currentPage === 2 && (
                <div className='w-[99%] p-2 flex flex-col gap-4'>
                    <h1 className='text-xl font-bold md:ml-5'>Salary</h1>
                    <div className='flex flex-col md:flex-row w-full gap-3'>
                        <div className='flex flex-row w-full md:w-full gap-4'>
                            <div className='w-[4%] flex items-center'>
                                <p className='text-[16px]'>Type</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-3'>
                        <div className='flex flex-row w-full md:w-full gap-4'>
                            <div className='w-[4%] flex items-center'>
                                <p className='text-[16px]'>Salary</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-4 items-center'>
                        <p className='text-[18px]'>Status</p><ToggleOffOutlinedIcon fontSize='large' /> <p className='text-[14px] text-gray-500'>Active/Inactive</p>
                    </div>
                    <div className="flex justify-end gap-5 md:mr-10 mr-4 h-[300px] items-end">
                        <button className="flex items-center text-white text-[10px] md:text-[12px] h-[30px] py-1 md:py-1 px-2 md:px-6 rounded bg-sky-500 hover:bg-sky-700">Save</button>
                        <button className="flex items-center text-red-500 text-[10px] md:text-[12px] h-[30px] py-1 md:py-1 px-2 md:px-6 border border-red-500 rounded bg-transparent hover:bg-red-700">Cancel</button>
                    </div>
                </div>
            )}
            <div className="flex justify-between p-4">
                <button onClick={prevPage} disabled={currentPage === 1} className="btn">
                    <KeyboardArrowLeftIcon />
                </button>
                <button onClick={nextPage} disabled={currentPage === 2} className="btn">
                    <KeyboardArrowRightIcon />
                </button>
            </div>
        </Box>
    );
};

export default CompanyDetails;
