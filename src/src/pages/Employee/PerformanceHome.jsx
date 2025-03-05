import React from 'react';
import { Box, Grid } from '@mui/material';
import PerformancePage from './Performance';
import { useParams } from 'react-router-dom';

const PerformanceHome = () => {

    const id = useParams().id;
    console.log("id" , id)

    return (
        <Box sx={{ backgroundColor: 'background.main', }} className="h-full overflow-hidden ">
            <div className="h-full" style={{ overflowY: 'auto', paddingRight: '1px' }}>
                <Grid container alignItems='center' justifyContent='center' height='100%'>
                    <Grid item xs={11}>
                       <PerformancePage/>
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

export default PerformanceHome;
