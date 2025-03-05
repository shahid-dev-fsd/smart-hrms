import React from 'react';
import {Box} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const MorePayrollPage = () => {
    
    
    
    return (
        <Box sx={{backgroundColor: 'background.main',}}>
        <div className='flex flex-col justify-start'>
                <div className="flex items-center justify-between md:w-full p-4">
                        <div className="p-2">
                            <h1 className="text-2xl text-neutral-500">Add Payroll</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <InfoOutlinedIcon />
                        </div>
                    </div>
                </div>
                <Box className="w-full ml-2 md:ml-0 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
            <div className='w-[99%] p-4 flex flex-col gap-4'>
                <h1 className='text-xl font-bold'>Deductions</h1>
                
                <div className='flex flex-col md:flex-row w-full gap-8'>
                    <div className='flex flex-row w-full md:w-full  gap-2 '>
                        <div className='w-[13%] flex items-center'>
                            <p className='text-[16px]'>PF</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='O'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-8'>
                    <div className='flex flex-row w-full md:w-full  gap-2 '>
                        <div className='w-[13%] flex items-center'>
                            <p className='text-[16px]'>Professional Tax</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='O'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-8'>
                    <div className='flex flex-row w-full md:w-full  gap-2 '>
                        <div className='w-[13%] flex items-center'>
                            <p className='text-[16px]'>TDS</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='O'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row  w-full gap-2'>
                    <div className='flex flex-row w-full md:w-[85%] gap-2 '>
                        <div className='w-1/6 flex items-center'>
                            <p className='text-[16px]'>Loans & Others</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2"/>
                        </div>
                    </div>
                    <div className='flex flex-row w-full md:w-[18%] justify-end'>
                        <button className='flex items-center text-white font-bold text-[10px] md:text-[14px] py-1 md:py-1 px-2 md:px-10 rounded bg-sky-500 hover:bg-sky-700'>
                                <span className='text-[18px] pr-4'>+</span>Add
                            </button>
                    </div>
                </div>
                <h1 className='text-xl font-bold'>Gross Salary</h1>
                <div className='flex flex-col md:flex-row w-full gap-8'>
                    <div className='flex flex-row w-full md:w-full  gap-2 '>
                        <div className='w-[13%] flex items-center'>
                            <p className='text-[16px]'>Total Allowance</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='O'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-8'>
                    <div className='flex flex-row w-full md:w-full  gap-2 '>
                        <div className='w-[13%] flex items-center'>
                            <p className='text-[16px]'>Total Deductions</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='O'/>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row w-full gap-8'>
                    <div className='flex flex-row w-full md:w-full  gap-2 '>
                        <div className='w-[13%] flex items-center'>
                            <p className='text-[16px]'>Net Salary</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="text" className="w-full rounded-lg bg-transparent focus:outline-none p-2" placeholder='O'/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-5   md:mt-4 md:mr-10 mr-4 mb-5 items-end">
                        <button className="flex items-center text-white  text-[10px] md:text-[12px] h-[30px] py-1 md:py-2 px-2 md:px-8 rounded bg-sky-500 hover:bg-sky-700">Save</button>
                        <button className="flex items-center text-red-500  text-[10px] md:text-[12px]  h-[30px] py-1 md:py-2 px-2 md:px-8  border border-red-500 rounded bg-transparent hover:bg-red-700">Cancel</button>
                </div>
            </div>
        </Box>
        </Box>
    );
};

export default MorePayrollPage;
