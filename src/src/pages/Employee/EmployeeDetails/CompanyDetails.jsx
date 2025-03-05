import { Box, TextField } from '@mui/material';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import moment from 'moment';
import axios from 'axios';
import { useForm } from '../../../hooks/useForm/useForm';
import { Input } from 'postcss';

const CompanyDetails = ({ id, department, designation, jobType, amount, dateOfJoining }) => {
    const [currentPage, setCurrentPage] = useState(1);

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
    const [departments, setDepartments] = useState(null);
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setEmployee({ ...employee, [name]: value });
    };

    const fetchDepartment = useCallback(
        async function () {
            try {
                const response = await axios.get(`/hr/department?sortBy=order`);
                setDepartments(response.data.departments);
            } catch (e) {
                console.log(e);
            }
        },
        [setDepartments]
    );

    useEffect(() => {
        fetchDepartment();
    }, [fetchDepartment]);
    return(
        <Box className="w-full ml-2 md:ml-0 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
        {currentPage === 1 && (
           <div className='w-[99%]  p-2 flex flex-col gap-6'>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-full  gap-4 '>
                            <div className='w-1/6 flex items-center'>
                                <p className='text-[16px]'>Employee ID</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='ID' value={id}/>
                            </div>
                        </div> 
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-full  gap-4 '>
                            <div className='w-1/6 flex items-center'>
                                <p className='text-[16px]'>Department</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='Department' value={department}/>
                            </div>
                        </div> 
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-full  gap-4 '>
                            <div className='w-1/6 flex items-center'>
                                <p className='text-[16px]'>Designation</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='Designation' value={designation}/>
                            </div>
                        </div> 
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-full  gap-4 '>
                            <div className='w-1/6 flex items-center'>
                                <p className='text-[16px]'>Date Of Joining</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input type="date" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='DD-MM-YYYY' value={dateJoining}/>
                            </div>
                        </div> 
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-full  gap-4 '>
                            <div className='w-1/6 flex items-center'>
                                <p className='text-[16px]'>Resignation Date</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input type="date" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='DD-MM-YYYY'/>
                            </div>
                        </div> 
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-full  gap-4 '>
                            <div className='w-1/6 flex items-center'>
                                <p className='text-[16px]'>Termination Date</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='DD-MM-YYYY'/>
                            </div>
                        </div> 
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-full  gap-4 '>
                            <div className='w-1/6 flex items-center'>
                                <p className='text-[16px]'>Credit Leaves <HelpOutlinedIcon style={{fontSize:"16px"}}/></p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='O'/>
                            </div>
                        </div> 
                    </div>
            </div>
            )}
            {currentPage === 2 && (
            <div className='w-[99%]  p-2 flex flex-col gap-4'>
                <h1 className='text-xl font-bold md:ml-5'>Salary</h1>
                <div className='flex flex-col md:flex-row w-full gap-3'>
                    <div className='flex flex-row w-full md:w-full  gap-4 '>
                        <div className='w-[4%] flex items-center'>
                            <p className='text-[16px]'>Type</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2"/>
                        </div>
                    </div> 
                </div>
                    <div className='flex flex-col md:flex-row w-full gap-3'>
                        <div className='flex flex-row w-full md:w-full  gap-4 '>
                            <div className='w-[4%] flex items-center'>
                                <p className='text-[16px]'>Salary</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2"/>
                            </div>
                        </div> 
                    </div>
                     <div className='flex flex-row gap-4 items-center'>
                        <p className='text-[18px]'>Status</p><ToggleOffOutlinedIcon fontSize='large'/> <p className='text-[14px] text-gray-500'>Active/Inactive</p>
                     </div>
                     
                     <div className="flex justify-end gap-5  md:mr-10 mr-4 h-[300px] items-end">
                        <button className="flex items-center text-white  text-[10px] md:text-[12px] h-[30px] py-1 md:py-1 px-2 md:px-6 rounded bg-sky-500 hover:bg-sky-700">Save</button>
                        <button className="flex items-center text-red-500  text-[10px] md:text-[12px]  h-[30px] py-1 md:py-1 px-2 md:px-6  border border-red-500 rounded bg-transparent hover:bg-red-700">Cancel</button>
                    </div>
            </div>
            )}
                    
            <div className="flex justify-between p-4">
                    <button onClick={prevPage} disabled={currentPage === 1} className="btn">
                        <KeyboardArrowLeftIcon/>
                    </button>
                    <button onClick={nextPage} disabled={currentPage === 2} className="btn">
                        <KeyboardArrowRightIcon/>
                    </button>
            </div>
            
        </Box>
    );

};
export default CompanyDetails;