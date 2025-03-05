import React from 'react';
import { Box, Grid } from '@mui/material';
import SalaryPage from './SalaryPage';



const SalaryHome = () => {
    return (
        <Box sx={{ backgroundColor: 'background.main', }} className="h-full overflow-hidden ">
            <div className="h-full" style={{ overflowY: 'auto', paddingRight: '1px' }}>
                <Grid container  justifyContent='center' height='100%'>
                    <Grid item xs={11}>
                    <SalaryPage/>
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

export default SalaryHome;
