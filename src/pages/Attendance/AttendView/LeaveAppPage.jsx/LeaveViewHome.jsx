import React from 'react';
import { Box, Grid } from '@mui/material';
import LeaveViewPage from './LeaveViewPage';


const LeaveViewHome = () => {
    return (
        <Box sx={{ backgroundColor: 'background.main', }} className="h-full overflow-hidden ">
            <div className="h-full" style={{ overflowY: 'auto', paddingRight: '1px' }}>
                <Grid container justifyContent='center' height='100%'>
                    <Grid item xs={11}>
                    <LeaveViewPage/>
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

export default LeaveViewHome;
