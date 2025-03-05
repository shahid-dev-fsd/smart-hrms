import {
    Box,
    Container,
    Stack,
    Typography,
    Grid,
    List,
    ListItem,
    TextField,
    IconButton,
    Button,
    Tooltip,
    Card,
    Modal,
    CircularProgress,
    Divider,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useMessage } from '../components/Header';
import useModal from '../hooks/useModal';
import { Form, Submit, useForm } from '../hooks/useForm/useForm';
import useErrorHandler from '../hooks/useErrorHandler';
import { CdnImage, Images } from '../components/Images';
import { Input } from '../hooks/useForm/inputs';


const OfferLetter = () => {
    const id = useParams().id;
    const { showSuccess, showError } = useMessage();
    const [offerLetter, setOfferLetter] = useState(null);
    const [loading, setLoading] = useState(false);
    const { modalState, openModal, closeModal } = useModal();
    const errorHandler = useErrorHandler();
    const navigate = useNavigate();

    const handlers = useForm(
        useMemo(
            () => ({
                jobTitle: { required: true },
                nameOfEmployee: { required: true },
                jobDescription: { required: true },
                team: { required: true },
                managerName: { required: true },
                managerJobTitle: { required: true },
                salaryAmount: { required: true },
                salaryCurrency: { required: true },
                signOnBonus: { required: true },
                hrSign: { value: 'Areeb Ahmad', required: true },
                userId: { required: true },
            }),
            []
        ),
        { Input: TextField }
    );

    const sendOfferLetter = async () => {
        const values = {
            ...handlers.values,
            userId: id,
            manager: {
                name: handlers.values.managerName,
                jobTitle: handlers.values.managerJobTitle,
            },
            salary: {
                amount: handlers.values.salaryAmount,
                currency: handlers.values.salaryCurrency,
            },
            hrSign: handlers.values.hrSign,
        };
        setLoading(true);

        try {
            const response = await axios.post('/hr/offer-letter', {
                ...values,
            });

            const { success, message } = response.data;

            if (!success) showError(message);
            showSuccess(`Offer letter successfully send to ${handlers.values.nameOfEmployee}`);
            navigate(`/jobApplicationDetail/${offerLetter.jobApplicationId}`);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    };

    const setValues = handlers.setValues;

    const fetchLetter = useCallback(async () => {
        try {
            const response = await axios.get('/hr/offer-letter/generate-info/' + id);
            const offerLetterCredentials = response.data.offerLetter;
            const {
                userId,
                jobTitle,
                jobDescription,
                nameOfEmployee,
                team,
                manager,
                salary,
                signOnBonus,
            } = offerLetterCredentials;

            setValues({
                userId,
                jobTitle,
                jobDescription,
                nameOfEmployee,
                team,
                managerName: manager.name,
                managerJobTitle: manager.jobTitle,
                salaryAmount: salary.amount,
                salaryCurrency: salary.currency,
                signOnBonus,
            });
            setOfferLetter(offerLetterCredentials);
        } catch (e) {
            errorHandler(e);
        }
    }, [errorHandler, id, setValues]);

    useEffect(() => {
        fetchLetter();
    }, [fetchLetter]);

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Grid container spacing={4} display='flex' alignItems='center'>
                    <Grid item xs>
                        <Typography variant='h4'>Job Application Details</Typography>
                    </Grid>
                    <Grid item display='flex' alignItems='center'>
                        <Box mx={2}>
                            <Button variant='contained' onClick={openModal}>
                                Edit
                            </Button>
                        </Box>

                        <Button
                            variant='contained'
                            onClick={sendOfferLetter}
                            disabled={loading}
                            endIcon={
                                loading && (
                                    <CircularProgress size='18px' sx={{ color: 'inherit' }} />
                                )
                            }>
                            Send Offer Letter
                        </Button>

                        <Box mx={3}>
                            <Tooltip title='info' placement='top'>
                                <IconButton disableRipple variant='navIcon' sx={{ mr: 0 }}>
                                    <InfoOutlinedIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Divider sx={{ mt: 3 }} />
            {offerLetter ? (
                <Container sx={{ maxWidth: '1216px', mx: 'auto', p: 2 }}>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        py={8}
                        alignItems='flex-start'>
                        <CdnImage src='https://cdn.clikkle.com/images/clikkle/logo/2023/clikkle.png' width='100' height='40' />
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
                        <Grid item xs={4}>
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
                                    {handlers.values.jobTitle.split(' ').shift()}
                                </Typography>
                                {handlers.values.jobTitle
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
                        <Grid item xs>
                            <Images src='letter2.png' height='340' />
                        </Grid>
                        <Grid item xs={4}>
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
                                    {handlers.values.jobDescription}
                                    ...{' '}
                                    <Typography
                                        color='primary.main'
                                        component={NavLink}
                                        to={`https://careers.catch.com/${offerLetter.jobId}`}>
                                        Read More
                                    </Typography>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1) ' }}
                        display='flex'
                        alignItems='center'
                        flexDirection='column'
                        py={3}
                        px={10}>
                        <Typography variant='h5' fontWeight='800' color='primary.main' mb={2}>
                            Greetings {handlers.values.nameOfEmployee},
                        </Typography>
                        <Typography variant='h5' fontWeight='bold' textAlign='center' mb={2}>
                            After a thorough assessment of your credentials and thoughtful
                            deliberation, we are delighted to extend an offer for the position of{' '}
                            <Typography
                                variant='h5'
                                display='inline'
                                fontWeight='bold'
                                color='primary.main'>
                                {handlers.values.jobTitle}
                            </Typography>
                            . We kindly request your meticulous review of the attached job offer
                            letter, and we encourage you to affix your signature at your earliest
                            convenience. This step marks the initiation of your onboarding journey.
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
                        <Typography
                            variant='h2'
                            fontWeight='600'
                            textTransform='uppercase'
                            letterSpacing='2px'
                            gutterBottom>
                            Join Our
                        </Typography>
                        <Typography
                            variant='h2'
                            fontWeight='600'
                            color='primary.main'
                            lineHeight='0.7'
                            letterSpacing='2px'
                            gutterBottom
                            textTransform='uppercase'>
                            Growing
                        </Typography>
                        <Typography variant='h2' fontWeight='600' textTransform='uppercase'>
                            team
                        </Typography>
                    </Box>
                    <Grid container justifyContent='space-around' alignItems='center' pt={8}>
                        <Grid item xs={5}>
                            <Typography variant='h3' fontWeight='600' mb={1} display='inline-block'>
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
                                Catch Technologies disrupts the SaaS sector with practical A1
                                solutions, empowering businesses to unleash their data&apos;s
                                potential. Our innovative A1 platforms drive impactful results for
                                global companies, revolutionizing how they operate. We seek
                                ambitious problem solvers to join our rewarding journey. Embrace the
                                impossible with us and unlock your potential at Catch.
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={5}
                            textAlign='right
                        '>
                            <Images src='letter1.png' height='340' />
                        </Grid>
                    </Grid>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        spacing={3}
                        pt={8}>
                        <Box>
                            <Typography variant='h1' fontWeight='600' display='inline-block'>
                                MORE
                            </Typography>
                            <Typography
                                variant='subtitle1'
                                fontSize='40px'
                                pl={1}
                                letterSpacing='2px'
                                display='inline-block'>
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
                        <Grid item xs={4}>
                            <Typography variant='h4' fontWeight='600'>
                                Reporting
                            </Typography>
                            <Typography variant='h4' fontWeight='600' mb={2} color='primary.main'>
                                Relationship.
                            </Typography>
                            <Typography variant='subtitle1'>
                                The {handlers.values.jobTitle} will report directly to{' '}
                                <Typography
                                    variant='subtitle1'
                                    display='inline'
                                    color='primary.main'>
                                    {handlers.values.managerName}, {handlers.values.managerJobTitle}
                                </Typography>
                                . They will collaborate closely with {handlers.values.team}.
                            </Typography>
                        </Grid>
                        <Grid item xs={4} textAlign='right'>
                            <Typography variant='h4' fontWeight='600'>
                                Probationary
                            </Typography>
                            <Typography variant='h4' fontWeight='600' mb={2} color='primary.main'>
                                Period.
                            </Typography>
                            <Typography variant='subtitle1'>
                                The initial probationary period for this position will be{' '}
                                <Typography
                                    variant='subtitle1'
                                    display='inline'
                                    color='primary.main'>
                                    {`${offerLetter.probationaryPeriod} months`}
                                </Typography>
                                , during which performance and suitability for the role will be
                                evaluated. Employment confirmation will be subject to a satisfactory
                                review at the end of the probationary period.
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
                        <Typography variant='subtitle1' maxWidth='40ch' mx='auto' fontWeight={500}>
                            The{' '}
                            <Typography
                                variant='subtitle1'
                                display='inline'
                                color='primary.main'
                                fontWeight={500}>
                                {handlers.values.jobTitle}
                            </Typography>{' '}
                            will receive a competitive base salary of{' '}
                            <Typography
                                variant='subtitle1'
                                display='inline'
                                color='primary.main'
                                fontWeight={500}>
                                {handlers.values.salaryAmount} {handlers.values.salaryCurrency}
                            </Typography>{' '}
                            per year, payable in Bi-Weekly installments.
                        </Typography>
                    </Box>
                    <Grid container justifyContent='space-between' py={8} columnSpacing={6}>
                        <Grid item xs={5}>
                            <Typography variant='h4' fontWeight='600' mb={2}>
                                Benefits.
                            </Typography>
                            <Typography variant='subtitle1'>
                                We offer a comprehensive benefits package, including but not limited
                                to:
                            </Typography>
                            <List>
                                {offerLetter.benefits.map(benefit => (
                                    <ListItem sx={{ pl: 0 }}>- {benefit}</ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={5} textAlign='right'>
                            <Typography variant='h4' fontWeight='600' mb={2}>
                                Allowances.
                            </Typography>
                            <Typography variant='subtitle1'>
                                As part of the compensation package, the {handlers.values.jobTitle}{' '}
                                will receive the following allowances:
                            </Typography>
                            <List
                                sx={{
                                    '& .MuiListItem-root': {
                                        ml: 1,
                                    },
                                }}>
                                {offerLetter.allowance.map(k => (
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
                        <Typography variant='subtitle1' maxWidth='40ch' mx='auto' fontWeight={500}>
                            This job title receive a competitive sign-on bonus of{' '}
                            <Typography
                                variant='subtitle1'
                                display='inline'
                                color='primary.main'
                                fontWeight={500}>
                                {handlers.values.signOnBonus}
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
                        <Grid item xs={4}>
                            <Typography variant='h4' fontWeight='600'>
                                Vocation & Personal
                            </Typography>
                            <Typography variant='h4' fontWeight='600' mb={2} color='primary.main'>
                                Emergency Time Off.
                            </Typography>
                            <Typography variant='subtitle1'>
                                The{' '}
                                <Typography
                                    variant='subtitle1'
                                    display='inline'
                                    color='primary.main'>
                                    {handlers.values.jobTitle}
                                </Typography>{' '}
                                will be entitled to{' '}
                                <Typography
                                    variant='subtitle1'
                                    display='inline'
                                    color='primary.main'>
                                    {offerLetter.daysOff.vacation} days
                                </Typography>{' '}
                                Of paid vacation leave per year. Additionally,{' '}
                                <Typography
                                    variant='subtitle1'
                                    display='inline'
                                    color='primary.main'>
                                    {offerLetter.daysOff.emergency} days
                                </Typography>{' '}
                                of personal emergency time off will be provided for unforeseen
                                circumstances
                            </Typography>
                        </Grid>
                        <Grid item xs={4} textAlign='right'>
                            <Typography variant='h4' fontWeight='600'>
                                Currency &
                            </Typography>
                            <Typography variant='h4' fontWeight='600' mb={2} color='primary.main'>
                                Deductions.
                            </Typography>
                            <Typography variant='subtitle1'>
                                All salaries and allowances will be paid in the local currency{' '}
                                {/* <Typography
                                    variant='subtitle1'
                                    display='inline'
                                    color='primary.main'>
                                    {offerLetter.salary.currency}
                                </Typography> */}
                                . Applicable taxes and deductions as per government regulations will
                                be withheld from the salary.
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
                        <Typography variant='subtitle1' maxWidth='75ch' mx='auto' fontWeight={500}>
                            The company will reimburse reasonable and pre-approved expenses incurred
                            by the{' '}
                            <Typography
                                variant='subtitle1'
                                display='inline'
                                color='primary.main'
                                fontWeight={500}>
                                {handlers.values.jobTitle}
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
                        <Grid item xs={4}>
                            <Typography variant='h4' fontWeight='600'>
                                Termination
                            </Typography>
                            <Typography variant='h4' fontWeight='600' mb={2} color='primary.main'>
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
                                        {handlers.values.jobTitle}
                                    </Typography>{' '}
                                    may resign from their position by providing{' '}
                                    <Typography
                                        display='inherit'
                                        fontSize='inherit'
                                        color='primary.main'>
                                        {offerLetter.noticePeriod} days notice
                                    </Typography>{' '}
                                    in writing.
                                </ListItem>
                                <ListItem sx={{ display: 'inline-block' }}>
                                    - Termination for cause: The company reserves the right to
                                    terminate employment immediately if the{' '}
                                    {handlers.values.jobTitle} breaches company policies or engages
                                    in any misconduct.
                                </ListItem>
                                <ListItem sx={{ display: 'inline-block' }}>
                                    - Termination without cause: The company may terminate
                                    employment without cause by providing{' '}
                                    <Typography
                                        display='inherit'
                                        fontSize='inherit'
                                        color='primary.main'>
                                        {offerLetter.noticePeriod} days notice
                                    </Typography>{' '}
                                    or salary in lieu of notice.
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={4} textAlign='right'>
                            <Typography variant='h4' fontWeight='600'>
                                Confidentiality of Information and Ownership of
                            </Typography>
                            <Typography variant='h4' fontWeight='600' mb={2} color='primary.main'>
                                Proprietary Property.
                            </Typography>
                            <Typography variant='subtitle1'>
                                During the course Of employment, the {handlers.values.jobTitle} may
                                have access to confidential and proprietary information Of the
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
                        mx={15}
                        my={2}
                        border='1px solid'
                        borderColor='common'
                        py={5}
                        px={3}
                        textAlign='center'>
                        <Typography variant='subtitle1' mb={2}>
                            your employment with Catch is at-will and either party can terminate the
                            relationship at any time with or without cause and with or without
                            notice. you acknowledge that this Offer letter represents the entire
                            agreement between you and Catch.
                        </Typography>
                        <Typography variant='subtitle1'>
                            If you agree in agreement with the above outline, please sign below.
                            This Offer is in effect for{' '}
                            <Typography
                                variant='subtitle1'
                                display='inline'
                                fontSize='inherit'
                                color='primary.main'>
                                {offerLetter.effectiveDays} business days.
                            </Typography>
                        </Typography>
                    </Box>
                    <Grid container justifyContent='space-between' mt={8}>
                        <Grid item xs={4}>
                            <Grid container alignItems='center' sx={{ mb: 4 }}>
                                <Grid item xs>
                                    <TextField
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
                                sx={{
                                    paddingTop: '10px',
                                    borderTop: '1px solid',
                                }}>
                                Candidate&apos;s signature
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                borderColor: 'common',
                            }}>
                            <Grid container alignItems='center' sx={{ mb: 4 }}>
                                <Grid item xs>
                                    <TextField
                                        value={handlers.values.hrSign}
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
                </Container>
            ) : offerLetter === null ? (
                <Typography variant='subtitle1'>Loading...</Typography>
            ) : (
                <Typography variant='subtitle1'>No Job Letter Found</Typography>
            )}

            <Modal
                open={modalState}
                onClose={closeModal}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Card
                    sx={{
                        boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                        borderRadius: '8px',
                        maxWidth: '656px',
                        width: '100%',
                        px: 4,
                        py: 3,
                        mx: 2,
                        height: '85vh',
                        overflowY: 'auto',
                    }}>
                    <Typography variant='h6' component='h2' align='center'>
                        Edit Offer letter
                    </Typography>
                    <br />
                    <div id='modal-modal-description' sx={{ mt: 2 }}>
                        {handlers.values.userId && (
                            <Form handlers={handlers} onError={errorHandler}>
                                <Box>
                                    <Typography gutterBottom>Name Of Employee</Typography>

                                    <Input
                                        placeholder='Name Of Employee'
                                        name='nameOfEmployee'
                                        fullWidth
                                        size='small'
                                    />

                                    <Typography gutterBottom>Job Title</Typography>

                                    <Input
                                        placeholder='Job Title'
                                        name='jobTitle'
                                        fullWidth
                                        size='small'
                                    />

                                    <Typography gutterBottom>Job Description</Typography>

                                    <Input
                                        placeholder='Job Description'
                                        name='jobDescription'
                                        multiline
                                        rows={6}
                                        fullWidth
                                        size='small'
                                    />

                                    <Typography gutterBottom>Team</Typography>

                                    <Input placeholder='Team' name='team' fullWidth size='small' />

                                    <Typography gutterBottom>Manager Name</Typography>

                                    <Input
                                        placeholder='Manager'
                                        name='managerName'
                                        fullWidth
                                        size='small'
                                    />

                                    <Typography gutterBottom>Manager Job Title</Typography>

                                    <Input
                                        placeholder='Manager Job Title'
                                        name='managerJobTitle'
                                        fullWidth
                                        size='small'
                                    />

                                    <Typography gutterBottom>Salary</Typography>
                                    <Input
                                        placeholder='Salary'
                                        name='salaryAmount'
                                        type='number'
                                        fullWidth
                                        size='small'
                                    />
                                    <Typography gutterBottom>Currency</Typography>
                                    <Input
                                        placeholder='Currency'
                                        name='salaryCurrency'
                                        fullWidth
                                        size='small'
                                    />

                                    <Typography gutterBottom>Sign On Bonus</Typography>

                                    <Input
                                        placeholder='Sign On Bonus'
                                        name='signOnBonus'
                                        type='number'
                                        fullWidth
                                        size='small'
                                    />
                                    <Typography gutterBottom>HR Signature</Typography>

                                    <Input
                                        placeholder='Sign On Bonus'
                                        name='hrSign'
                                        fullWidth
                                        size='small'
                                    />
                                </Box>
                                <Box textAlign='right'>
                                    <Submit>
                                        {loader => (
                                            <Button
                                                variant='contained'
                                                onClick={closeModal}
                                                disabled={Boolean(loader)}
                                                endIcon={loader}
                                                sx={{
                                                    mt: 1,
                                                }}>
                                                Done
                                            </Button>
                                        )}
                                    </Submit>
                                </Box>
                            </Form>
                        )}
                    </div>
                </Card>
            </Modal>
        </Container>
    );
};

export default OfferLetter;
