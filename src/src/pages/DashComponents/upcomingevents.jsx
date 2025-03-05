import React from 'react';
import {Box, Grid} from '@mui/material'

const UpcomingEvents = () => {
    return (
        <Box >
        <div className="rounded-lg mb-4 shadow-md h-39">
            <p  className="text-gray-500 mb-4 text-[22px] " gutterBottom>
                Upcoming Events
            </p>
            <Grid className='w-full p-3 rounded-lg' sx={{
            backgroundColor: 'background.view', 
           
           }}>
                    <div className="mb-4">
                        <div className="flex gap-4 justify-center items-center">
                            <div className="w-1/4 h-[60px] flex items-center justify-center text-white rounded-lg bg-green-500">
                                <div className="w-[97%]  h-[57px]   flex items-center justify-center border-2 border-gray-900 rounded-lg p-0">
                                    <p className='p-1 text-gray-900 font-semi-bold text-center gap-0'>22 Mar</p>
                                </div>
                            </div>
                            <div className="w-4/5">
                                <h1 className="text-sm">Anniversary</h1>
                                <p className="text-xs text-gray-500">Company anniversary on the 22nd of March 2024</p>
                            </div>
                        </div>
                    </div>
            </Grid>
        </div>
        </Box>
    );
};

export default UpcomingEvents;
