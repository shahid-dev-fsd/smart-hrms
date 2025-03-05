import { Box, Button, Card, TextField, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useMessage } from './Header';
import useErrorHandler from '../hooks/useErrorHandler';
import { Form, Submit, useForm } from '../hooks/useForm/useForm';
import { Input } from '../hooks/useForm/inputs';

const SendInterview = props => {
    const { closeModal, userId, refresh } = props;
    const { showError, showSuccess } = useMessage();
    const errorHandler = useErrorHandler();

    const handlers = useForm(
        useMemo(
            () => ({
                userId: { final: v => userId },
                interviewTime: { required: true },
                interviewDate: { required: true },
                interviewPlatform: { required: true },
            }),
            [userId]
        ),
        { Input: TextField }
    );

    const onSubmit = res => {
        const { success, errors } = res.data;

        if (!success) return showError(errors);

        refresh();
        closeModal();
        showSuccess('Interview Scheduled successfully');
    };

    return (
        <Card
            sx={{
                boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                borderRadius: '8px',
                maxWidth: '500px',
                width: '100%',
                px: 4,
                py: 3,
                mx: 2,
                maxHeight: '85vh',
                overflowY: 'auto',
                overflowX: 'hidden',
            }}>
            <Typography variant='h6' mb={3}>
                Schedule interview
            </Typography>
            <Form
                handlers={handlers}
                onSubmit={onSubmit}
                action='/hr/interview'
                method='post'
                onError={errorHandler}>
                <Box>
                    <Typography gutterBottom>Date</Typography>
                    <Input name='interviewDate' size='small' type='date' required fullWidth />

                    <Typography gutterBottom>Time</Typography>
                    <Input name='interviewTime' type='time' fullWidth size='small' required />

                    <Typography gutterBottom>Platform</Typography>
                    <Input name='interviewPlatform' fullWidth size='small' required />
                </Box>
                <Box my={2} textAlign='right'>
                    <Submit>
                        {loader => (
                            <Button
                                type='submit'
                                variant='contained'
                                disabled={Boolean(loader)}
                                endIcon={loader}
                                sx={{
                                    mt: 1,
                                }}>
                                Send Interview
                            </Button>
                        )}
                    </Submit>
                </Box>
            </Form>
        </Card>
    );
};

export default SendInterview;
