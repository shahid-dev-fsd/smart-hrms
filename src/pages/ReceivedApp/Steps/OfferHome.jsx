import React from 'react';
import { Box, Grid } from '@mui/material';
import OfferPage from './Offer';

const OfferHome = () => {
    return (
        <Box className="h-full overflow-hidden" sx={{ backgroundColor: 'background.main', }}>
            <div className="h-full" style={{ overflowY: 'auto',  }}>
                <Grid container alignItems='center' justifyContent='center' height='100%'>
                    <Grid item xs={12}>
                       <OfferPage/>
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

export default OfferHome;
