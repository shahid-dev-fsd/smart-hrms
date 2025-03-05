import { Accordion, AccordionDetails } from '@mui/material';
import React from 'react';
import { escapeDanger } from '../utilities/function';

function RuleDetails(props) {
    const { content } = props;

    return (
        <Accordion
            elevation={0}
            sx={{
                my: 4,
                border: 'none',
                maxWidth: '100%',
                background: 'transparent',
                transition: '0.2s',
            }}>
            <AccordionDetails sx={{ transition: '1s', overflowX: 'auto' }}>
                <div dangerouslySetInnerHTML={{ __html: escapeDanger(content) }}></div>

                {/* <Box sx={{ p: 2 }}>
                    <Typography variant='h5' sx={{ pb: 3 }}>
                        Contract: {jobType}
                    </Typography>
                    <Typography variant='h5'>Salary:{salary}</Typography>
                </Box> */}
            </AccordionDetails>
        </Accordion>
    );
}

export default RuleDetails;
