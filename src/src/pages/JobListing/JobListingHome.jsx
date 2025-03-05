import React from 'react';
import { Grid } from '@mui/material';
import JobListing from './jobListing';
import {Box} from '@mui/material';

const Home = () => {
    return (
        <Box className="h-full overflow-hidden" sx={{ backgroundColor: 'background.main', }} >
            <div className="h-full" style={{ overflowY: 'auto', paddingRight: '1px' }}>
                <Grid container alignItems='center' justifyContent='center' height='100%'>
                    <Grid item xs={12}>
                        <JobListing />
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

export default Home;
