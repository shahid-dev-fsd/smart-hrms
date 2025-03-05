import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import AttendViewPage from './AttendViewPage';


const AttendViewHome = () => {
    const Months = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    };
    const [date, setDate] = useState({
        employeeId: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });
    
    const Years = Array(41)
        .fill(1)
        .map((el, i) => i + 2009);

        
    return (
        <Box sx={{ backgroundColor: 'background.main', }} className="h-full overflow-hidden ">
            <div className="h-full" style={{ overflowY: 'auto', paddingRight: '1px' }}>
                <Grid container alignItems='center' justifyContent='center' height='100%'>
                    <Grid item xs={11}>
                       <AttendViewPage month={date.month} year={date.year}/>
                    </Grid>
                </Grid>
            </div>
            <style jsx>{`
                
                .h-full::-webkit-scrollbar {
                    display: none;
                }
                .h-full {
                    scrollbar-width: none;
                }
            `}</style>

        </Box>
    );
};

export default AttendViewHome;
