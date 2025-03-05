import React from 'react';
import {Box} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';


const EditPayrollPage = () => {
    return (
        <Box sx={{backgroundColor: 'background.main',}}>
        <div className='flex flex-col justify-start'>
                <div className="flex items-center justify-between md:w-full p-4">
                        <div className="p-2">
                            <h1 className="text-2xl text-neutral-500">Edit Payroll</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <InfoOutlinedIcon />
                        </div>
                    </div>
                </div>
                <Box className="w-full md:ml-0 pt-4 md:mt-5 rounded-lg mb-4 p-4" sx={{ backgroundColor: 'background.view', }}>
                <Box className="flex flex-col md:flex-row justify-center gap-4 w-[97%] ml-2 md:ml-4 ">
                <div className='flex flex-row w-full items-center'>
                <div className='w-1/4'></div>
                <div className='w-3/4 flex flex-row gap-5'>
                   <div className='w-full md:w-[38%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Employee Name</option>
                            <option>name1</option>
                            <option>name2</option>
                            <option>name3</option>
                        </select>
                        <ArrowDropDownIcon style={{fontSize:'28px'}} className="text-zinc-500"/>
                   </div>
                   <div className='w-full md:w-[38%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                        </select>
                        <ArrowDropDownIcon style={{fontSize:'28px'}} className="text-zinc-500"/>
                   </div>
                   <div className='w-full md:w-[38%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Year</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                        </select>
                        <ArrowDropDownIcon style={{fontSize:'28px'}} className="text-zinc-500"/>
                   </div>
                   <div className='w-full md:w-[24%] flex justify-end md:justify-end items-center '>
                        <button className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
                   </div>
                   </div>
                   </div>
                </Box>
                </Box>
                <Box className="w-full ml-2 md:ml-0 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
            <div className='w-[99%] p-4 flex flex-col gap-4'>
                <h1 className='text-xl font-bold'>Salary Information</h1>
                
                <div className='flex flex-col md:flex-row w-full gap-8'>
                    <div className='flex flex-row w-full md:w-full  gap-2 '>
                        <div className='w-[13%] flex items-center'>
                            <p className='text-[16px]'>Base Salary</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='O'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-8'>
                    <div className='flex flex-row w-full md:w-full  gap-2 '>
                        <div className='w-[13%] flex items-center'>
                            <p className='text-[16px]'>Expense Claim</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='O'/>
                        </div>
                    </div>
                </div>
               
                <div className='flex flex-col md:flex-row w-full gap-2'>
                    <div className='flex flex-row w-full md:w-2/5  gap-10 '>
                        <div className='w-1/3 flex items-center'>
                            <p className='text-[16px]'>Status</p>
                        </div>
                        <div className="w-4/5  rounded-lg flex items-center flex flex-row gap-2">
                            <input type="radio" id="male" name="gender" className="hidden" defaultChecked />
                            <label htmlFor="male" className="flex items-center cursor-pointer mr-6">
                                <span className="w-4 h-4 border-4 border-blue-500 rounded-full mr-2"></span>
                                Paid
                            </label>

                            <input type="radio" id="female" name="gender" className="hidden" />
                            <label htmlFor="female" className="flex items-center cursor-pointer">
                                <span className="w-4 h-4 border-4 border-gray-500 rounded-full mr-2"></span>
                                Unpaid
                            </label>
                        </div>
                    </div>
                    
                </div>
                <h1 className='text-xl font-bold'>Allowances</h1>
                <div className='flex flex-col md:flex-row w-full gap-8'>
                    <div className='flex flex-row w-full md:w-full  gap-2 '>
                        <div className='w-[13%] flex items-center'>
                            <p className='text-[16px]'>HRA Allowance</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='O'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-8'>
                    <div className='flex flex-row w-full md:w-full  gap-2 '>
                        <div className='w-[13%] flex items-center'>
                            <p className='text-[16px]'>Conveyance</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='O'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-8'>
                    <div className='flex flex-row w-full md:w-full  gap-2 '>
                        <div className='w-[13%] flex items-center'>
                            <p className='text-[16px]'>Bonus Allowance</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='O'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row  w-full gap-2'>
                    <div className='flex flex-row w-full md:w-[85%] gap-2 '>
                        <div className='w-1/6 flex items-center'>
                            <p className='text-[16px]'>Medical Allowance</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2"/>
                        </div>
                    </div>
                    <div className='flex flex-row w-full md:w-[18%] justify-end'>
                            <button className='flex items-center text-white font-bold text-[10px] md:text-[14px] py-1 md:py-1 px-2 md:px-10 rounded bg-sky-500 hover:bg-sky-700'>
                        <Link to="/editpayrolls">
                                <span className='text-[18px] pr-4'>+</span>Add
                        </Link>
                            </button>
                    </div>
                </div>
            </div>
           
          
            
        </Box>
           
        </Box>
    );
};

export default EditPayrollPage;
