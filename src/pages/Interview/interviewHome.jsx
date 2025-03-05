import React from 'react';
import { Grid } from '@mui/material';
import Interview from './interview';
import {Box} from '@mui/material';

const InterviewHome = () => {
    return (
        <Box className="h-full overflow-hidden" sx={{ height
            :'88vh', }}>
            <div className="h-full" style={{ overflowY: 'auto', paddingRight: '1px' }}>
                <Grid container  justifyContent='center' height='100%'>
                    <Grid item  xs={12}>
                        <Interview/>
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

export default InterviewHome;
