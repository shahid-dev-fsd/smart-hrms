import { Box, Container, Grid, List, ListItem, Stack, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { CdnImage, Images, ServerImage } from './Images';
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSquare } from '@fortawesome/free-solid-svg-icons';
import letter1 from '../assets/offerLatter/letter1.png'
import letter2 from '../assets/offerLatter/letter2.png';


const ViewOfferLetter = ({ applicationId }) => {
    const [letter, setLetter] = useState(null);
    const [organization, setOrganization] = useState(null);

    const fetchLetter = useCallback(async () => {
        try {
            const response = await axios.get(`/hr/offer-letter/${applicationId}`);
            setLetter(response.data.letter);
            setOrganization(response.data.organization)
        } catch (e) {
            console.log(e);
        }
    }, [applicationId]);

    useEffect(() => {
        fetchLetter();
    }, [fetchLetter]);

    return (
        <>
             <Container sx={{ maxWidth: '1216px', mx: 'auto', p: 2 }}>
                {letter ? (
                    <>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            py={8}
                            alignItems='flex-start'>
                           <ServerImage src={organization?.logo ?? ""} width='100' height='40' />
                            <Box
                                sx={{
                                    borderStyle: 'solid',
                                    borderRight: 'inherit',
                                    borderColor: 'common',
                                    borderWidth: 'thin',
                                    p: 2,
                                }}>
                                <Typography variant='body1'>offer</Typography>
                                <Typography
                                    variant='subtitle1'
                                    fontWeight={500}
                                    textTransform='uppercase'
                                    letterSpacing='1.2px'>
                                    LETTER
                                </Typography>
                            </Box>
                        </Stack>
                        <Grid container spacing={3} mb={5}>
                            <Grid item xs={12} lg={4}>
                                <Box position='relative'>
                                    <Typography
                                        variant='subtitle1'
                                        sx={{
                                            transform: 'rotate(270deg)',
                                            display: 'inline-block',
                                            position: 'absolute',
                                            bottom: '-53%',
                                            left: '-22px',
                                        }}>
                                        JOB TITLE
                                    </Typography>
                                    <Typography
                                        variant='h3'
                                        fontWeight='bold'
                                        lineHeight='0.7'
                                        textTransform='uppercase'>
                                        {letter.jobTitle.split(' ').shift()}
                                    </Typography>
                                    {letter.jobTitle
                                        .split(' ')
                                        .slice(1)
                                        .map(title => (
                                            <Typography
                                                variant='h3'
                                                color='primary.main'
                                                fontWeight='bold'
                                                textTransform='uppercase'>
                                                {title}
                                            </Typography>
                                        ))}
                                </Box>
                            </Grid>
                            <Grid item xs sx={{ textAlign: 'center' }}>
                            <img src={letter2}  style={{ height : '340px'}} />
                            </Grid>
                            <Grid item lg={4} xs={12}>
                                <Box>
                                    <Typography variant='h3' fontWeight='bold' lineHeight='0.7'>
                                        Job
                                    </Typography>
                                    <Typography
                                        variant='h3'
                                        color='primary.main'
                                        fontWeight='bold'
                                        mb={1}>
                                        Description.
                                    </Typography>
                                    <Typography variant='subtitle1' fontWeight={500}>
                                        {letter.jobDescription}
                                        ...{' '}
                                        <Typography
                                            color='primary.main'
                                            component={NavLink}
                                            to={`/career/${organization.name}/job/${letter.jobId}`}>
                                            Read More
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1) ',
                                px: { lg: 10, xs: 5 },
                            }}
                            display='flex'
                            alignItems='center'
                            flexDirection='column'
                            py={3}>
                            <Typography variant='h5' fontWeight='800' color='primary.main' mb={2}>
                                Greetings {letter.nameOfEmployee},
                            </Typography>
                            <Typography variant='h5' fontWeight='bold' textAlign='center' mb={2}>
                                After a thorough assessment of your credentials and thoughtful
                                deliberation, we are delighted to extend an offer for the position
                                of{' '}
                                <Typography
                                    variant='h5'
                                    display='inline'
                                    fontWeight='bold'
                                    color='primary.main'>
                                    {letter.jobTitle}
                                </Typography>
                                . We kindly request your meticulous review of the attached job offer
                                letter, and we encourage you to affix your signature at your
                                earliest convenience. This step marks the initiation of your
                                onboarding journey.
                            </Typography>
                            <Typography variant='h5' fontWeight='800' color='primary.main' mb={2}>
                                We look forword to your positive response.
                            </Typography>
                        </Box>
                        <Box position='relative' textAlign='center' py={8} mt={5}>
                            <Typography
                                variant='subtitle1'
                                fontWeight={600}
                                sx={{
                                    transform: 'rotate(270deg)',
                                    display: 'inline-block',
                                    position: 'absolute',
                                    top: '159px',

                                    left: '-60px',
                                }}>
                                Discover Your Skills
                            </Typography>
                            <Typography
                                variant='subtitle1'
                                fontWeight={600}
                                sx={{
                                    transform: 'rotate(90deg)',

                                    display: 'inline-block',
                                    position: 'absolute',
                                    top: '159px',

                                    right: '-60px',
                                }}>
                                Discover Your Skills
                            </Typography>
                            <Box sx={{ mt: { xs: 3, lg: 0 } }}>
                                <Typography
                                    variant='h2'
                                    fontWeight='600'
                                    textTransform='uppercase'
                                    letterSpacing='2px'
                                    gutterBottom
                                    sx={{ fontSize: 'clamp(30px, 5vw, 60px)' }}>
                                    Join Our
                                </Typography>
                                <Typography
                                    variant='h2'
                                    fontWeight='600'
                                    color='primary.main'
                                    lineHeight='0.7'
                                    letterSpacing='2px'
                                    gutterBottom
                                    textTransform='uppercase'
                                    sx={{ fontSize: 'clamp(30px, 5vw, 60px)' }}>
                                    Growing
                                </Typography>
                                <Typography
                                    variant='h2'
                                    fontWeight='600'
                                    textTransform='uppercase'
                                    sx={{ fontSize: 'clamp(40px, 5vw, 60px)' }}>
                                    team
                                </Typography>
                            </Box>
                        </Box>
                        <Grid container justifyContent='space-around' alignItems='center' pt={8}>
                            <Grid item lg={5} xs={12}>
                                <Typography
                                    variant='h3'
                                    fontWeight='600'
                                    mb={1}
                                    display='inline-block'>
                                    About
                                </Typography>
                                <Typography
                                    variant='h3'
                                    pl={1}
                                    fontWeight='600'
                                    color='primary.main'
                                    display='inline-block'>
                                    Company.
                                </Typography>
                                <Typography variant='subtitle1' fontWeight={500}>
                                   {organization.name} Technologies disrupts the SaaS sector with practical A1
                                    solutions, empowering businesses to unleash their data&apos;s
                                    potential. Our innovative A1 platforms drive impactful results
                                    for global companies, revolutionizing how they operate. We seek
                                    ambitious problem solvers to join our rewarding journey. Embrace
                                    the impossible with us and unlock your potential at {organization.name}.
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                lg={5}
                                xs={12}
                                sx={{
                                    textAlign:  'right',
                                    mt: { lg: 0, xs: 2 },
                                }}>
                                 <img src={letter1}  style={{ height : '340px' ,margin : 0}} />
                            </Grid>
                        </Grid>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                            spacing={3}
                            pt={8}>
                            <Box>
                                <Typography
                                    variant='h1'
                                    fontWeight='600'
                                    display='inline-block'
                                    sx={{ fontSize: 'clamp(40px, 5vw, 60px)' }}>
                                    MORE
                                </Typography>
                                <Typography
                                    variant='subtitle1'
                                    fontSize='40px'
                                    pl={1}
                                    letterSpacing='2px'
                                    display='inline-block'
                                    sx={{ fontSize: 'clamp(20px, 5vw, 50px)' }}>
                                    information.
                                </Typography>
                            </Box>
                            <Box p={2}>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        position: 'relative',
                                        '&:before': {
                                            content: "''",
                                            width: '10px',
                                            height: '10px',
                                            backgroundColor: 'custom.common',
                                            display: 'inline-block',
                                            position: 'absolute',
                                            left: '-22px',
                                            top: '7px',
                                        },
                                    }}>
                                    offer
                                </Typography>
                                <Typography
                                    variant='subtitle1'
                                    fontWeight={500}
                                    textTransform='uppercase'
                                    letterSpacing='1.2px'>
                                    LETTER
                                </Typography>
                            </Box>
                        </Stack>
                        <Grid container justifyContent='space-between' py={8} columnSpacing={6}>
                            <Grid item lg={4} xs={12}>
                                <Typography variant='h4' fontWeight='600'>
                                    Reporting
                                </Typography>
                                <Typography
                                    variant='h4'
                                    fontWeight='600'
                                    mb={2}
                                    color='primary.main'>
                                    Relationship.
                                </Typography>
                                <Typography variant='subtitle1'>
                                    The {letter.jobTitle} will report directly to{' '}
                                    <Typography
                                        variant='subtitle1'
                                        display='inline'
                                        color='primary.main'>
                                        {letter.manager.name}, {letter.manager.jobTitle}
                                    </Typography>
                                    . They will collaborate closely with {letter.team}.
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                xs={12}
                                textAlign='right'
                                sx={{ mt: { lg: 0, xs: 4 } }}>
                                <Typography variant='h4' fontWeight='600'>
                                    Probationary
                                </Typography>
                                <Typography
                                    variant='h4'
                                    fontWeight='600'
                                    mb={2}
                                    color='primary.main'>
                                    Period.
                                </Typography>
                                <Typography variant='subtitle1'>
                                    The initial probationary period for this position will be{' '}
                                    <Typography
                                        variant='subtitle1'
                                        display='inline'
                                        color='primary.main'>
                                        {`${letter.probationaryPeriod} months`}
                                    </Typography>
                                    , during which performance and suitability for the role will be
                                    evaluated. Employment confirmation will be subject to a
                                    satisfactory review at the end of the probationary period.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box py={8} textAlign='center'>
                            <Box
                                sx={{
                                    borderStyle: 'solid',
                                    borderColor: 'common',
                                    borderWidth: 'thin',
                                }}
                                py={1}
                                px={5}
                                display='inline-flex'
                                mb={1}>
                                <Typography variant='h5' fontWeight='600' mr={1}>
                                    Base{' '}
                                </Typography>
                                <Typography variant='h5' fontWeight='600' color='primary.main'>
                                    Salary
                                </Typography>
                            </Box>
                            <Typography
                                variant='subtitle1'
                                maxWidth='40ch'
                                mx='auto'
                                fontWeight={500}>
                                The{' '}
                                <Typography
                                    variant='subtitle1'
                                    display='inline'
                                    color='primary.main'
                                    fontWeight={500}>
                                    {letter.jobTitle}
                                </Typography>{' '}
                                will receive a competitive base salary of{' '}
                                <Typography
                                    variant='subtitle1'
                                    display='inline'
                                    color='primary.main'
                                    fontWeight={500}>
                                    {letter.salary.amount} {letter.salary.currency}
                                </Typography>{' '}
                                per year, payable in Bi-Weekly installments.
                            </Typography>
                        </Box>
                        <Grid container justifyContent='space-between' py={8} columnSpacing={6}>
                            <Grid item lg={5} xs={12}>
                                <Typography variant='h4' fontWeight='600' mb={2}>
                                    Benefits.
                                </Typography>
                                <Typography variant='subtitle1'>
                                    We offer a comprehensive benefits package, including but not
                                    limited to:
                                </Typography>
                                <List>
                                    {letter.benefits.map(benefit => (
                                        <ListItem sx={{ pl: 0 }}>- {benefit}</ListItem>
                                    ))}
                                </List>
                            </Grid>
                            <Grid
                                item
                                lg={5}
                                xs={12}
                                textAlign='right'
                                sx={{ mt: { lg: 0, xs: 4 } }}>
                                <Typography variant='h4' fontWeight='600' mb={2}>
                                    Allowances.
                                </Typography>
                                <Typography variant='subtitle1'>
                                    As part of the compensation package, the {letter.jobTitle} will
                                    receive the following allowances:
                                </Typography>
                                <List
                                    sx={{
                                        '& .MuiListItem-root': {
                                            ml: 1,
                                        },
                                    }}>
                                    {letter.allowance.map(k => (
                                        <ListItem
                                            sx={{
                                                justifyContent: 'end',
                                            }}>
                                            - {k}
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Grid>
                        <Box py={8} textAlign='center'>
                            <Box
                                sx={{
                                    borderStyle: 'solid',
                                    borderColor: 'common',
                                    borderWidth: 'thin',
                                }}
                                py={1}
                                px={5}
                                display='inline-flex'
                                mb={1}>
                                <Typography variant='h5' fontWeight='600' mr={1}>
                                    Sign-On{' '}
                                </Typography>
                                <Typography variant='h5' fontWeight='600' color='primary.main'>
                                    Bonus
                                </Typography>
                            </Box>
                            <Typography
                                variant='subtitle1'
                                maxWidth='40ch'
                                mx='auto'
                                fontWeight={500}>
                                This job title receive a competitive sign-on bonus of{' '}
                                <Typography
                                    variant='subtitle1'
                                    display='inline'
                                    color='primary.main'
                                    fontWeight={500}>
                                    {letter.signOnBonus} CAD
                                </Typography>{' '}
                                payable within{' '}
                                <Typography
                                    variant='subtitle1'
                                    display='inline'
                                    color='primary.main'
                                    fontWeight={500}>
                                    30 days
                                </Typography>{' '}
                                of employment.
                            </Typography>
                        </Box>
                        <Grid
                            container
                            justifyContent='space-between'
                            alignItems='center'
                            py={8}
                            columnSpacing={6}>
                            <Grid item lg={4} xs={12}>
                                <Typography variant='h4' fontWeight='600'>
                                    Vocation & Personal
                                </Typography>
                                <Typography
                                    variant='h4'
                                    fontWeight='600'
                                    mb={2}
                                    color='primary.main'>
                                    Emergency Time Off.
                                </Typography>
                                <Typography variant='subtitle1'>
                                    The{' '}
                                    <Typography
                                        variant='subtitle1'
                                        display='inline'
                                        color='primary.main'>
                                        {letter.jobTitle}
                                    </Typography>{' '}
                                    will be entitled to{' '}
                                    <Typography
                                        variant='subtitle1'
                                        display='inline'
                                        color='primary.main'>
                                        {letter.daysOff.vacation} days
                                    </Typography>{' '}
                                    Of paid vacation leave per year. Additionally,{' '}
                                    <Typography
                                        variant='subtitle1'
                                        display='inline'
                                        color='primary.main'>
                                        {letter.daysOff.emergency} days
                                    </Typography>{' '}
                                    of personal emergency time off will be provided for unforeseen
                                    circumstances
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                xs={12}
                                textAlign='right'
                                sx={{ mt: { lg: 0, xs: 4 } }}>
                                <Typography variant='h4' fontWeight='600'>
                                    Currency &
                                </Typography>
                                <Typography
                                    variant='h4'
                                    fontWeight='600'
                                    mb={2}
                                    color='primary.main'>
                                    Deductions.
                                </Typography>
                                <Typography variant='subtitle1'>
                                    All salaries and allowances will be paid in the local currency{' '}
                                    <Typography
                                        variant='subtitle1'
                                        display='inline'
                                        color='primary.main'>
                                        {letter.salary.currency}
                                    </Typography>
                                    . Applicable taxes and deductions as per government regulations
                                    will be withheld from the salary.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box py={8} textAlign='center'>
                            <Box
                                py={1}
                                px={5}
                                display='inline-flex'
                                mb={1}
                                sx={{
                                    borderStyle: 'solid',
                                    borderColor: 'common',
                                    borderWidth: 'thin',
                                }}>
                                <Typography variant='h5' fontWeight='600' mr={1}>
                                    Expenses
                                </Typography>
                            </Box>
                            <Typography
                                variant='subtitle1'
                                maxWidth='75ch'
                                mx='auto'
                                fontWeight={500}>
                                The company will reimburse reasonable and pre-approved expenses
                                incurred by the{' '}
                                <Typography
                                    variant='subtitle1'
                                    display='inline'
                                    color='primary.main'
                                    fontWeight={500}>
                                    {letter.jobTitle}
                                </Typography>{' '}
                                in the course Of their duty & Proper documentation and approval are
                                required for reimbursement.
                            </Typography>
                        </Box>
                        <Grid
                            container
                            justifyContent='space-between'
                            alignItems='center'
                            py={8}
                            columnSpacing={6}>
                            <Grid item lg={4} xs={12}>
                                <Typography variant='h4' fontWeight='600'>
                                    Termination
                                </Typography>
                                <Typography
                                    variant='h4'
                                    fontWeight='600'
                                    mb={2}
                                    color='primary.main'>
                                    Conditions.
                                </Typography>
                                <Typography variant='body2'>
                                    Termination of employment may occur under the following
                                    circumstances:
                                </Typography>
                                <List
                                    sx={{
                                        '& .MuiListItem-root': {
                                            p: 0,
                                            fontSize: '0.875rem',
                                        },
                                    }}>
                                    <ListItem sx={{ display: 'inline-block' }}>
                                        - Resignation: The{' '}
                                        <Typography
                                            display='inherit'
                                            fontSize='inherit'
                                            color='primary.main'>
                                            {letter.jobTitle}
                                        </Typography>{' '}
                                        may resign from their position by providing{' '}
                                        <Typography
                                            display='inherit'
                                            fontSize='inherit'
                                            color='primary.main'>
                                            {letter.noticePeriod} days notice
                                        </Typography>{' '}
                                        in writing.
                                    </ListItem>
                                    <ListItem sx={{ display: 'inline-block' }}>
                                        - Termination for cause: The company reserves the right to
                                        terminate employment immediately if the {letter.jobTitle}{' '}
                                        breaches company policies or engages in any misconduct.
                                    </ListItem>
                                    <ListItem sx={{ display: 'inline-block' }}>
                                        - Termination without cause: The company may terminate
                                        employment without cause by providing{' '}
                                        <Typography
                                            display='inherit'
                                            fontSize='inherit'
                                            color='primary.main'>
                                            {letter.noticePeriod} days notice
                                        </Typography>{' '}
                                        or salary in lieu of notice.
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                xs={12}
                                textAlign='right'
                                sx={{ mt: { lg: 0, xs: 4 } }}>
                                <Typography variant='h4' fontWeight='600'>
                                    Confidentiality of Information and Ownership of
                                </Typography>
                                <Typography
                                    variant='h4'
                                    fontWeight='600'
                                    mb={2}
                                    color='primary.main'>
                                    Proprietary Property.
                                </Typography>
                                <Typography variant='subtitle1'>
                                    During the course Of employment, the {letter.jobTitle} may have
                                    access to confidential and proprietary information Of the
                                    company. They will be required to sign a separate{' '}
                                    <Typography
                                        variant='subtitle1'
                                        display='inline'
                                        fontSize='inherit'
                                        color='primary.main'>
                                        Non-Disclosure Agreement (NDA){' '}
                                    </Typography>{' '}
                                    to protect the company's sensitive information.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box
                            sx={{ mx: { lg: 8, xs: 0 } }}
                            my={2}
                            border='1px solid'
                            borderColor='common'
                            py={5}
                            px={3}
                            textAlign='center'>
                            <Typography variant='subtitle1' mb={2}>
                                your employment with {organization.name} is at-will and either party can terminate
                                the relationship at any time with or without cause and with or
                                without notice. you acknowledge that this Offer letter represents
                                the entire agreement between you and {organization.name}.
                            </Typography>
                            <Typography variant='subtitle1'>
                                If you agree in agreement with the above outline, please sign below.
                                This Offer is in effect for{' '}
                                <Typography
                                    variant='subtitle1'
                                    display='inline'
                                    fontSize='inherit'
                                    color='primary.main'>
                                    {letter.effectiveDays} business days.
                                </Typography>
                            </Typography>
                        </Box>
                        <Grid container justifyContent='space-between' mt={8}>
                            <Grid
                                item
                                lg={4}
                                xs={12}
                                sx={{
                                    borderColor: 'common',
                                }}>
                                <Grid container alignItems='center' sx={{ mb: 4 }}>
                                    <Grid item xs>
                                        <TextField
                                            sx={{
                                                '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                    fontFamily: "'Mrs Saint Delafield', cursive",
                                                    fontSize: 40,
                                                },
                                                mb: 0,
                                                pr: 1,
                                                '& input::placeholder': {
                                                    fontFamily: 'Arial, Helvetica, sans-serif',
                                                    fontSize: 25,
                                                },
                                            }}
                                            value={letter.candidateSign?.sign}
                                            placeholder='Your Signature Here'
                                            disabled={letter.candidateSign}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Typography
                                    variant='h5'
                                    textTransform='uppercase'
                                    mt={1}
                                    sx={{
                                        paddingTop: '10px',
                                        borderTop: '1px solid',
                                    }}>
                                    Candidate&apos;s signature
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                xs={12}
                                sx={{
                                    mt: { lg: 0, xs: 5 },
                                    borderColor: 'common',
                                }}>
                                <Grid container alignItems='center' sx={{ mb: 4 }}>
                                    <Grid item xs>
                                        <TextField
                                            value={letter.hrSign}
                                            disabled={true}
                                            sx={{
                                                '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                    fontFamily: "'Mrs Saint Delafield', cursive",
                                                    fontSize: 40,
                                                },
                                                mb: 0,
                                            }}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Typography
                                    variant='h5'
                                    textTransform='uppercase'
                                    mt={1}
                                    textAlign='left'
                                    sx={{
                                        paddingTop: '10px',
                                        borderTop: '1px solid',
                                    }}>
                                    hr signature
                                </Typography>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <Typography variant='subtitle1'>
                        {' '}
                        <Loading />
                    </Typography>
                )}
            </Container>
        </>
    );
};

export default ViewOfferLetter;
