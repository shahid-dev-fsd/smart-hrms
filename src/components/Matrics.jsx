import { Card, CardContent, Grid, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import GroupIcon from '@mui/icons-material/Group';

import axios from 'axios';

const Matrics = ({ filters, selectFilters }) => {
    const [applicationMetrics, setApplicationMetrics] = useState(null);
    const {
        interviewSent,
        interviewed,
        offerSigned,
        offerSent,
        agreementSent,
        agreementSigned,
        employed,
        terminated,
    } = filters;

    console.log({ filters });

    const fetchMatrics = useCallback(
        async function () {
            try {
                const res = await axios.get('/hr/job-application/metrics');
                setApplicationMetrics(res.data.metrics);
            } catch (e) {
                console.log(e);
            }
        },
        [setApplicationMetrics]
    );
    useEffect(() => {
        fetchMatrics();
    }, [fetchMatrics]);

    return (
        <>
            <Stack direction='row' justifyContent='space-between' alignItems='center' mb={2}>
                <Typography variant='h6'>Job Application Overview</Typography>
                <Stack direction='row' alignItems='center' columnGap={2} mr={0.2}>
                    <GroupIcon />

                    <Typography variant='body'>
                        {applicationMetrics && applicationMetrics[0].applied}
                    </Typography>
                    <Typography display='inline-flex'>Applied</Typography>
                </Stack>
            </Stack>
            <Grid container spacing={2} sx={{ '& .MuiCard-root': { cursor: 'pointer' } }}>
                {applicationMetrics ? (
                    applicationMetrics.map((matrics, i) => (
                        <>
                            <Grid item md={3} xs={12}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        backgroundColor: interviewSent
                                            ? 'custom.selectedHover'
                                            : '',
                                    }}
                                    onClick={() => selectFilters('interviewSent')}>
                                    <CardContent
                                        sx={{
                                            textAlign: 'center',
                                        }}>
                                        <IconButton
                                            sx={{
                                                p: 1.5,
                                                mt: 1,
                                                mb: 2,
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                backgroundColor: 'custom.buttonColor.light.blue',
                                                borderRadius: '10px',
                                                color: 'custom.buttonColor.dark.blue',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'custom.buttonColor.light.blue',
                                                },
                                            }}>
                                            {matrics.interviewSent}
                                        </IconButton>
                                        <Typography
                                            fontWeight='550'
                                            sx={{
                                                '&:hover': {
                                                    color: '#3052CC',
                                                },
                                            }}>
                                            Interview sent
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <Card
                                    elevation={1}
                                    sx={{
                                        height: '100%',
                                        backgroundColor: interviewed ? 'custom.selectedHover' : '',
                                    }}
                                    onClick={() => selectFilters('interviewed')}>
                                    <CardContent
                                        sx={{
                                            textAlign: 'center',
                                        }}>
                                        <IconButton
                                            sx={{
                                                p: 1.5,
                                                mt: 1,
                                                mb: 2,
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                backgroundColor: 'custom.buttonColor.light.orange',
                                                borderRadius: '10px',
                                                color: 'custom.buttonColor.dark.orange',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'custom.buttonColor.light.orange',
                                                },
                                            }}>
                                            {matrics.interviewed}
                                        </IconButton>
                                        <Typography
                                            fontWeight='550'
                                            sx={{
                                                '&:hover': {
                                                    color: '#3052CC',
                                                },
                                            }}>
                                            Interviewed
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item md={3} xs={12}>
                                <Card
                                    elevation={1}
                                    sx={{
                                        height: '100%',
                                        backgroundColor: offerSent ? 'custom.selectedHover' : '',
                                    }}
                                    onClick={() => selectFilters('offerSent')}>
                                    <CardContent
                                        sx={{
                                            textAlign: 'center',
                                        }}>
                                        <IconButton
                                            sx={{
                                                p: 1.5,
                                                mt: 1,
                                                mb: 2,
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                backgroundColor: 'custom.buttonColor.light.yellow',
                                                borderRadius: '10px',
                                                color: 'custom.buttonColor.dark.yellow',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'custom.buttonColor.light.yellow',
                                                },
                                            }}>
                                            {matrics.offerSent}
                                        </IconButton>
                                        <Typography
                                            fontWeight='550'
                                            sx={{
                                                '&:hover': {
                                                    color: '#3052CC',
                                                },
                                            }}>
                                            Offer sent
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <Card
                                    elevation={1}
                                    sx={{
                                        height: '100%',
                                        backgroundColor: offerSigned ? 'custom.selectedHover' : '',
                                    }}
                                    onClick={() => selectFilters('offerSigned')}>
                                    <CardContent
                                        sx={{
                                            textAlign: 'center',
                                        }}>
                                        <IconButton
                                            sx={{
                                                p: 1.5,
                                                mt: 1,
                                                mb: 2,
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                backgroundColor: 'custom.buttonColor.light.skyBlue',
                                                borderRadius: '10px',
                                                color: 'custom.buttonColor.dark.skyBlue',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'custom.buttonColor.light.skyBlue',
                                                },
                                            }}>
                                            {matrics.offerSigned}
                                        </IconButton>
                                        <Typography
                                            fontWeight='550'
                                            sx={{
                                                '&:hover': {
                                                    color: '#3052CC',
                                                },
                                            }}>
                                            Offer signed
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <Card
                                    elevation={1}
                                    sx={{
                                        height: '100%',
                                        backgroundColor: agreementSent
                                            ? 'custom.selectedHover'
                                            : '',
                                    }}
                                    onClick={() => selectFilters('agreementSent')}>
                                    <CardContent
                                        sx={{
                                            textAlign: 'center',
                                        }}>
                                        <IconButton
                                            sx={{
                                                p: 1.5,
                                                mt: 1,
                                                mb: 2,
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                backgroundColor:
                                                    'custom.buttonColor.light.lightGreen',
                                                borderRadius: '10px',
                                                color: 'custom.buttonColor.dark.lightGreen',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'custom.buttonColor.light.lightGreen',
                                                },
                                            }}>
                                            {matrics.agreementSent}
                                        </IconButton>
                                        <Typography
                                            fontWeight='550'
                                            sx={{
                                                '&:hover': {
                                                    color: '#3052CC',
                                                },
                                            }}>
                                            Agreements sent
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <Card
                                    elevation={1}
                                    sx={{
                                        height: '100%',
                                        backgroundColor: agreementSigned
                                            ? 'custom.selectedHover'
                                            : '',
                                    }}
                                    onClick={() => selectFilters('agreementSigned')}>
                                    <CardContent
                                        sx={{
                                            textAlign: 'center',
                                        }}>
                                        <IconButton
                                            sx={{
                                                p: 1.5,
                                                mt: 1,
                                                mb: 2,
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                backgroundColor: 'custom.buttonColor.light.purpul',
                                                borderRadius: '10px',
                                                color: 'custom.buttonColor.dark.purpul',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'custom.buttonColor.light.purpul',
                                                },
                                            }}>
                                            {matrics.agreementSigned}
                                        </IconButton>
                                        <Typography
                                            fontWeight='550'
                                            sx={{
                                                '&:hover': {
                                                    color: '#3052CC',
                                                },
                                            }}>
                                            Agreements signed
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <Card
                                    elevation={1}
                                    sx={{
                                        height: '100%',
                                        backgroundColor: employed ? 'custom.selectedHover' : '',
                                    }}
                                    onClick={() => selectFilters('employed')}>
                                    <CardContent
                                        sx={{
                                            textAlign: 'center',
                                        }}>
                                        <IconButton
                                            sx={{
                                                p: 1.5,
                                                mt: 1,
                                                mb: 2,
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                backgroundColor:
                                                    'custom.buttonColor.light.lightGreen',
                                                borderRadius: '10px',
                                                color: 'custom.buttonColor.dark.lightGreen',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'custom.buttonColor.light.lightGreen',
                                                },
                                            }}>
                                            {matrics.employed}
                                        </IconButton>
                                        <Typography
                                            fontWeight='550'
                                            sx={{
                                                '&:hover': {
                                                    color: '#3052CC',
                                                },
                                            }}>
                                            Employed
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item md={3} xs={12}>
                                <Card
                                    elevation={1}
                                    sx={{
                                        height: '100%',
                                        backgroundColor: terminated ? 'custom.selectedHover' : '',
                                    }}
                                    onClick={() => selectFilters('terminated')}>
                                    <CardContent
                                        sx={{
                                            textAlign: 'center',
                                        }}>
                                        <IconButton
                                            sx={{
                                                p: 1.5,
                                                mt: 1,
                                                mb: 2,
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                backgroundColor: 'custom.buttonColor.light.red',
                                                borderRadius: '10px',
                                                color: 'custom.buttonColor.dark.red',
                                                '&:hover': {
                                                    backgroundColor: 'custom.buttonColor.light.red',
                                                },
                                            }}>
                                            {matrics.terminated}
                                        </IconButton>
                                        <Typography
                                            sx={{
                                                '&:hover': {
                                                    color: '#3052CC',
                                                },
                                            }}
                                            fontWeight='550'>
                                            Terminated
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </>
                    ))
                ) : (
                    <>
                        {Array(8)
                            .fill(0)
                            .map((el, i) => (
                                <Grid item md={3} xs={12} key={i}>
                                    <Skeleton
                                        variant='rectangular'
                                        animation='wave'
                                        height='120px'
                                        sx={{ borderRadius: '4px' }}
                                    />
                                </Grid>
                            ))}
                    </>
                )}
            </Grid>
        </>
    );
};

export default Matrics;
