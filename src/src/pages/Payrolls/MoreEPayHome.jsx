import React from 'react';
import { Box, Grid } from '@mui/material';
import MoreEditPayrollPage from './MoreEPayPage';



const MoreEditPayrollHome = () => {
    return (
        <Box sx={{ backgroundColor: 'background.main', }} className="h-full overflow-hidden ">
            <div className="h-full" style={{ overflowY: 'auto', paddingRight: '1px' }}>
                <Grid container justifyContent='center' height='100%'>
                    <Grid item xs={11}>
                         <MoreEditPayrollPage/>
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

export default MoreEditPayrollHome;
