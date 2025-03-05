import { Box, Typography, Accordion, AccordionDetails } from '@mui/material';
import React from 'react';
import { getDropDownElementWithCss, getElementWithCss } from '../../utilities/htmlCssBuilder';

function Details(props) {
    const { details, jobType, salary } = props;
    return (
        <Accordion
            elevation={0}
            sx={{
                my: 4,
                border: 'none',
                maxWidth: '100%',
                transition: '0.2s',
            }}
        >
            <AccordionDetails sx={{ transition: '1s' }} className='dark:text-zinc-500'>
                {details?.map((detail , index) => (
                    <div key={index}>
                      { getDropDownElementWithCss(detail)}
                    </div>
                    
                    // <Box>
                    //     {React.createElement(detail.tag, {
                    //         children: detail.content,
                    //     })}
                    // </Box>
                ))}
                <Box sx={{ p: 2 }}>
                    <Typography variant='h5' sx={{ pb: 3 }}>
                        Contract: {jobType}
                    </Typography>
                    <Typography variant='h5'>
                        Salary:{salary.amount} {salary.currency}
                    </Typography>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}

export default Details;
