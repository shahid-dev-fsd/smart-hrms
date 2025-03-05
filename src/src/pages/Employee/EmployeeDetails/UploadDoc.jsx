import { Box } from '@mui/material';
import React from 'react';

const UploadDetails = () => {
    return(
        <Box className="w-full ml-2 md:ml-0 pt-4 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
            <div className='w-[99%]  p-2 flex flex-col gap-6'>
             <div className='flex flex-col md:flex-row  w-full gap-2'>
                    <div className='flex flex-row w-full md:w-[85%] gap-2 '>
                        <div className='w-[8%] flex items-center'>
                            <p className='text-[16px]'>Resume</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="file" className="w-full rounded-lg bg-transparent focus:outline-none p-2"/>
                        </div>
                    </div>
                    <div className='flex flex-row w-full md:w-[14%] justify-end'>
                        <button className='flex items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-10 rounded bg-sky-500 hover:bg-sky-700'>
                                Choose File
                            </button>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row  w-full gap-2'>
                    <div className='flex flex-row w-full md:w-[85%] gap-2 '>
                        <div className='w-[8%] flex items-center'>
                            <p className='text-[16px]'>ID Proof</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="file" className="w-full rounded-lg bg-transparent focus:outline-none p-2"/>
                        </div>
                    </div>
                    <div className='flex flex-row w-full md:w-[14%] justify-end'>
                        <button className='flex items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-10 rounded bg-sky-500 hover:bg-sky-700'>
                                Choose File
                            </button>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row  w-full gap-2'>
                    <div className='flex flex-row w-full md:w-[85%] gap-2 '>
                        <div className='w-[8%] flex items-center'>
                            <p className='text-[16px]'>Offer Letter</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="file" className="w-full rounded-lg bg-transparent focus:outline-none p-2"/>
                        </div>
                    </div>
                    <div className='flex flex-row w-full md:w-[14%] justify-end'>
                        <button className='flex items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-10 rounded bg-sky-500 hover:bg-sky-700'>
                                Choose File
                            </button>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row  w-full gap-2'>
                    <div className='flex flex-row w-full md:w-[85%] gap-2 '>
                        <div className='w-[8%] flex items-center'>
                            <p className='text-[16px]'>Joining</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="file" className="w-full rounded-lg bg-transparent focus:outline-none p-2"/>
                        </div>
                    </div>
                    <div className='flex flex-row w-full md:w-[14%] justify-end'>
                        <button className='flex items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-10 rounded bg-sky-500 hover:bg-sky-700'>
                                Choose File
                            </button>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row  w-full gap-2'>
                    <div className='flex flex-row w-full md:w-[85%] gap-2 '>
                        <div className='w-[8%] flex items-center'>
                            <p className='text-[16px]'>Agreement Letter</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="file" className="w-full rounded-lg bg-transparent focus:outline-none p-2"/>
                        </div>
                    </div>
                    <div className='flex flex-row w-full md:w-[14%] justify-end'>
                        <button className='flex items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-10 rounded bg-sky-500 hover:bg-sky-700'>
                                Choose File
                            </button>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row  w-full gap-2'>
                    <div className='flex flex-row w-full md:w-[85%] gap-2 '>
                        <div className='w-[8%] flex items-center'>
                            <p className='text-[16px]'>Experience Letter</p>
                        </div>
                        <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                            <input type="file" className="w-full rounded-lg bg-transparent focus:outline-none p-2"/>
                        </div>
                    </div>
                    <div className='flex flex-row w-full md:w-[14%] justify-end'>
                        <button className='flex items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-10 rounded bg-sky-500 hover:bg-sky-700'>
                                Choose File
                            </button>
                    </div>
                </div>
                    <div className="flex justify-end gap-5  md:mr-10 mr-4 mb-5 items-end">
                        <button className="flex items-center text-white  text-[10px] md:text-[12px] h-[30px] py-1 md:py-1 px-2 md:px-6 rounded bg-sky-500 hover:bg-sky-700">Save</button>
                        <button className="flex items-center text-red-500  text-[10px] md:text-[12px]  h-[30px] py-1 md:py-1 px-2 md:px-6  border border-red-500 rounded bg-transparent hover:bg-red-700">Cancel</button>
                    </div>
            </div>
        </Box>
    );

};
export default UploadDetails;