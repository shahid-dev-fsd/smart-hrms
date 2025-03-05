import { Box, Typography, Accordion, AccordionDetails, Grid } from '@mui/material';
import React from 'react';

function Details(props) {
    const { questions } = props;
    console.log(questions);
    return (
        <Accordion
            elevation={0}
            sx={{
                my: 4,
                border: 'none',
                maxWidth: '100%',
                transition: '0.2s',
            }}>
            <AccordionDetails sx={{ transition: '1s' }}>
                {questions.map((item, i) => (
                    <Box mb={1} key={i}>
                        <Typography variant='h6' gutterBottom>
                            Q {i + 1}: {item.question}
                        </Typography>
                        <Grid container ml={3}>
                            {Object.keys(item.options).map((key, i) => (
                                <Grid item xs={12} md={6} key={i}>
                                    <Typography variant='body2' gutterBottom>
                                        {key}: {item.options[key]}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>
    );
}

export default Details;
