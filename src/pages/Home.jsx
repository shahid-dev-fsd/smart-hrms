import React from 'react';
import { Box, Grid } from '@mui/material';
import Dashboard from './Dashboard';

const Home = () => {
    return (
        <Box sx={{ backgroundColor: 'background.default', height:'88vh' ,borderBottomLeftRadius:'8px',borderBottomRightRadius:'8px',}} className="h-full overflow-hidden ">
            <div className="h-full" style={{ overflowY: 'auto', paddingRight: '1px' }}>
                <Grid container justifyContent='center' height='100%'>
                    <Grid item  >
                        <Dashboard />
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
