import { Box, Button, Card, CircularProgress, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Download } from '@mui/icons-material';
import { env } from '../utilities/function';

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Modal from '@mui/material/Modal';
import { useMessage } from '../components/Header';
import useModal from '../hooks/useModal';
import { FetchImage } from '../components/Images';
import useLoader from '../hooks/useLoader';
import AddEmployee from '../components/AddEmployee';
import SendInterview from '../components/SendInterview';
import ViewOfferLetter from '../components/ViewOfferLetter';
import Agreements from './Agreements';
import ViewAgreements from '../components/ViewAgreements';

const JobApplicationDetail = () => {
    const id = useParams().id;
    const [jobApplication, setJobApplication] = useState({});
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const { showError, showSuccess } = useMessage();
    const { loaderState, start, end, circular } = useLoader();
    const { modalState: resetState, closeModal: closeReset, openModal: openReset } = useModal();
    const {
        modalState: viewOfferLetter,
        closeModal: closeOfferLetter,
        openModal: openOfferLetter,
    } = useModal();

    const {
        modalState: addEmployeeState,
        closeModal: closeAddEmployee,
        openModal: openAddEmployee,
    } = useModal();

    const {
        modalState: sendAgreement,
        closeModal: closeAgreement,
        openModal: openAgreement,
    } = useModal();

    const {
        modalState: viewAgreement,
        closeModal: closeViewAgreement,
        openModal: openViewAgreement,
    } = useModal();
    const {
        modalState: sendInterviewState,
        closeModal: closeSendInterview,
        openModal: openSendInterview,
    } = useModal();

    const fetchJobApplication = useCallback(
        async function () {
            setLoading(true);
            try {
                const response = await axios.get(`/hr/job-application/${id}`);
                const jobDetail = response.data.application;

                jobDetail.isOfferLetterSend = response.data.isOfferLetterSend;
                jobDetail.isInterviewCompleted = response.data.isInterviewCompleted;
                jobDetail.interviewScore = response.data.interviewScore;
                jobDetail.interviewTimeTaken = response.data.interviewTimeTaken;
                jobDetail.isAgreementSigned = response.data.isAgreementSigned;
                jobDetail.isOfferLetterSigned = response.data.isOfferLetterSigned;
                jobDetail.candidateSign = response.data.candidateSign;
                jobDetail.isEmployee = response.data.isEmployee;
                setJobApplication(jobDetail);
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false);
            }
        },
        [id]
    );

    const resetApplication = useCallback(
        async function () {
            setResetLoading(true);
            try {
                const response = await axios.patch(`/hr/job-application/reset/${id}`);

                const { success, errors } = response.data;
                if (!success) return showError(errors);
                showSuccess('Application reset!');
                fetchJobApplication();
            } catch (e) {
                console.log(e);
            } finally {
                closeReset();
                setResetLoading(false);
            }
        },
        [fetchJobApplication, id, showError, showSuccess, closeReset]
    );

    async function downloadResume() {
        try {
            showSuccess('File is being downloaded');
            const res = await axios.get(`${env('SERVER')}/download/${jobApplication.resume}`, {
                responseType: 'blob', // important
            });

            const blob = new Blob([res.data]);

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', jobApplication.resume); //or any other extension
            document.body.appendChild(link);
            link.click();
            showSuccess('File is downloaded successfully');
        } catch (e) {
            if (e.response && e.response.status === 404) return showError('File not found');
            console.log(e)
        } finally {
        }
    }

    useEffect(() => {
        fetchJobApplication();
    }, [fetchJobApplication]);

    const linkedinAccount = jobApplication.linkedinAccount;
    return (
        <>
            <Container maxWidth>
                <Box sx={{ mt: 3 }}>
                    <Grid container display='flex' alignItems='center' spacing={{ sm: 0, xs: 2 }}>
                        <Grid item xs={12} sm>
                            <Typography variant='h5'>Job Application Details</Typography>
                        </Grid>
                        {!loading ? (
                            <>
                                {jobApplication.step === 0 &&
                                jobApplication.status === 'Pending' ? (
                                    <Grid item>
                                        <Button
                                            LinkComponent={Link}
                                            onClick={openSendInterview}
                                            variant='contained'>
                                            Schedule Interview
                                        </Button>
                                    </Grid>
                                ) : null}
                                {jobApplication.step === 1 && (
                                    <Grid item>
                                        <Button
                                            LinkComponent={Link}
                                            to={`/jobApplicationDetail/offer-letter/${jobApplication.userId}`}
                                            disabled={!jobApplication.isInterviewCompleted}
                                            variant='contained'>
                                            Send Offer Letter
                                        </Button>
                                    </Grid>
                                )}
                                {jobApplication.step === 2 && (
                                    <Grid item>
                                        <Button
                                            variant='contained'
                                            disabled={!jobApplication.isOfferLetterSigned}
                                            onClick={openAgreement}>
                                            Send Agreements
                                        </Button>
                                    </Grid>
                                )}
                               
                                  
                                
                                {jobApplication.isEmployee && (
                                    <Grid item>
                                        <Button
                                            variant='contained'
                                            LinkComponent={Link}
                                            to={`/performance/${jobApplication.userId}`}>
                                            View Employee
                                        </Button>{' '}
                                    </Grid>
                                )}
                            </>
                        ) : null}
                    </Grid>
                </Box>
                <Grid container spacing={2} mt={5}>
                    <Grid item lg={4} xs={12}>
                        {jobApplication.photo ? (
                            <Box maxWidth='130px'>
                                <FetchImage name={jobApplication.photo} />
                            </Box>
                        ) : (
                            <CircularProgress />
                        )}
                        <Typography
                            variant='body1'
                            sx={{
                                my: '3px',
                                fontSize: '26px',
                                fontWeight: '700',
                                color: '#2c384e',
                                textTransform: 'capitalize',
                            }}>
                            {jobApplication.fullName}
                        </Typography>
                        <Typography variant='body' sx={{ textTransform: 'capitalize' }}>
                            {jobApplication.jobTitle}
                        </Typography>
                        <br />
                        <Button variant='contained' sx={{ mt: 2 }} onClick={openReset}>
                            Reset Applicationsssssssssssssss
                        </Button>{' '}
                        <Grid item>
                                        <Button
                                            variant='contained'
                                            onClick={openAddEmployee}>
                                            Add Employee
                                        </Button>{' '}
                                    </Grid>
                    </Grid>
                    <Grid item lg={8} xs={12}>
                        <Grid container spacing={2.5}>
                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' color='text.secondary' fontWeight={500}>
                                    Full Name
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Typography
                                    variant='body1'
                                    fontWeight={500}
                                    sx={{ textTransform: 'capitalize' }}>
                                    {jobApplication.fullName}
                                </Typography>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                    Resume
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Button
                                    onClick={downloadResume}
                                    startIcon={<Download />}
                                    endIcon={circular}
                                    disabled={loaderState}
                                    variant='outlined'
                                    size='small'>
                                    Download
                                </Button>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                    Job Title
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Typography
                                    variant='body1'
                                    fontWeight={500}
                                    sx={{ textTransform: 'capitalize' }}>
                                    {jobApplication.jobTitle}
                                </Typography>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                    Year of Experience
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Typography variant='body1' fontWeight={500}>
                                    {jobApplication.experience}
                                </Typography>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                    Email
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Typography variant='body1' fontWeight={500}>
                                    {jobApplication.email}
                                </Typography>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                    Phone
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Typography variant='body1' fontWeight={500}>
                                    {jobApplication.countryCode} {jobApplication.phone}
                                </Typography>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                    Linkedin Account
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Link to={linkedinAccount} target='_blank'>
                                    <Button
                                        size='small'
                                        disabled={!jobApplication.linkedinAccount}
                                        variant='contained'
                                        startIcon={<LinkedInIcon />}>
                                        Linkedin Profile
                                    </Button>
                                </Link>
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                    Offer Letter
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Button
                                    disabled={!jobApplication.isOfferLetterSigned}
                                    startIcon={<VisibilityIcon fontSize='small' />}
                                    size='small'
                                    variant='outlined'
                                    onClick={openOfferLetter}>
                                    View
                                </Button>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                    Agreements
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Button
                                    onClick={openViewAgreement}
                                    disabled={!jobApplication.isAgreementSigned}
                                    startIcon={<VisibilityIcon fontSize='small' />}
                                    size='small'
                                    variant='outlined'>
                                    View
                                </Button>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                    Applied at
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Typography variant='body1' fontWeight={500}>
                                    {new Date(jobApplication.createdAt).toLocaleString()}
                                </Typography>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                    Candidate Sign
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Typography variant='body1' fontWeight={500}>
                                    {jobApplication.candidateSign
                                        ? jobApplication.candidateSign.sign
                                        : 'Not Done'}{' '}
                                    {jobApplication.candidateSign &&
                                        new Date(jobApplication.candidateSign.time).toLocaleString(
                                            'en-IN'
                                        )}
                                </Typography>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                    Interview Score
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='primary'>
                                    {jobApplication.interviewScore}%
                                </Typography>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='text.secondary'>
                                    Interview Time
                                </Typography>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                <Typography variant='body1' fontWeight={500} color='primary'>
                                    {jobApplication.interviewTimeTaken}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Modal
                open={addEmployeeState}
                onClose={closeAddEmployee}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <>
                    <AddEmployee
                        closeModal={closeAddEmployee}
                        userId={jobApplication.userId}
                        refetch={fetchJobApplication}
                    />
                </>
            </Modal>
            <Modal
                open={sendInterviewState}
                onClose={closeSendInterview}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <>
                    <SendInterview
                        closeModal={closeSendInterview}
                        userId={jobApplication.userId}
                        refresh={fetchJobApplication}
                    />
                </>
            </Modal>

            <Modal
                open={resetState}
                onClose={closeReset}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Card sx={{ p: 3 }}>
                    <Typography variant='h6' mb={4}>
                        Do you really want to reset this application ?
                    </Typography>
                    <Box sx={{ float: 'right' }}>
                        <Button variant='outlined' onClick={closeReset} sx={{ mr: 2 }}>
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            onClick={resetApplication}
                            disabled={resetLoading}
                            endIcon={
                                resetLoading && (
                                    <CircularProgress
                                        color='inherit'
                                        sx={{
                                            width: '20px !important',
                                            height: '20px !important',
                                        }}
                                    />
                                )
                            }>
                            Reset
                        </Button>
                    </Box>
                </Card>
            </Modal>
            {/* offer letter */}
            <Modal
                open={viewOfferLetter}
                onClose={closeOfferLetter}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Card
                    sx={{
                        boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                        borderRadius: '8px',
                        maxWidth: '1200px',
                        width: '100%',
                        px: 4,
                        py: 3,
                        mx: 2,
                        maxHeight: '85vh',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    }}>
                    <ViewOfferLetter applicationId={jobApplication._id} />
                </Card>
            </Modal>

            {/* Agreement */}
            <Modal open={sendAgreement} onClose={closeAgreement}>
                <Agreements
                    closeModal={closeAgreement}
                    jobApplicationId={jobApplication._id}
                    jobId={jobApplication.jobId}
                    refetch={fetchJobApplication}
                />
            </Modal>

            {/* View Agreement */}
            <Modal
                open={viewAgreement}
                onClose={closeViewAgreement}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ViewAgreements
                    closeModal={closeViewAgreement}
                    agreements={jobApplication.agreements}
                />
            </Modal>
        </>
    );
};

export default JobApplicationDetail;
