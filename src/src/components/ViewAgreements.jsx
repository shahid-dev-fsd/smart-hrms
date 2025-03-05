import { Box, Stack, Tab, Tabs, TextField, Typography, IconButton } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { escapeDanger } from '../utilities/function';

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div role='tabpanel' hidden={value !== index}>
            {value === index && (
                <Box p={1}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

const ViewAgreements = ({ agreements = [], closeModal }) => {
    const [tabSelected, setTabSelected] = useState(0);

    const tabHandleChange = (event, newValue) => {
        setTabSelected(newValue);
    };

    return (
        <Box
            sx={{
                py: 3,
                bgcolor: 'background.default',
                maxWidth: '1200px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3} px={3}>
                <Typography variant='h6' fontWeight={500}>
                    Agreements
                </Typography>

                <IconButton onClick={closeModal}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    maxWidth: { xs: '100%' },
                }}>
                <Tabs
                    value={tabSelected}
                    onChange={tabHandleChange}
                    variant='scrollable'
                    scrollButtons
                    allowScrollButtonsMobile>
                    {agreements.map(agreement => (
                        <Tab label={agreement.title} />
                    ))}
                </Tabs>
            </Box>

            {agreements.map((agreement, index) => (
                <TabPanel value={tabSelected} index={index}>
                    <Box
                        p={2}
                        dangerouslySetInnerHTML={{
                            __html: escapeDanger(agreement.content),
                        }}
                    />
                    <Box
                        sx={{
                            display: { md: 'flex', xs: 'block' },
                            mt: { md: 5, xs: 0 },
                        }}
                        alignItems='center'>
                        <Box flexBasis='50%'>
                            <Box display='flex' alignItems='center' mt={1} flexBasis='30%'>
                                Signature{' '}
                                <TextField
                                    size='small'
                                    sx={{
                                        '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                            fontFamily: "'Mrs Saint Delafield', cursive",
                                            fontSize: 30,
                                        },
                                        width: '50%',

                                        pr: 1,
                                        ml: 2,
                                        '& input::placeholder': {
                                            fontFamily: 'Arial, Helvetica, sans-serif',
                                            fontSize: 20,
                                        },
                                    }}
                                    name={agreement.title}
                                    value={agreement.sign}
                                    disabled
                                    fullWidth
                                />
                            </Box>
                            Date : {agreement.signTime}
                            <br />
                        </Box>
                    </Box>
                </TabPanel>
            ))}
        </Box>
    );
};
export default ViewAgreements;
