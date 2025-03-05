import { Box, Button, Card, Radio, RadioGroup, FormControlLabel, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useMessage } from './Header';
import useErrorHandler from '../hooks/useErrorHandler';
import { Form, Submit, useForm } from '../hooks/useForm/useForm';
import { Input } from '../hooks/useForm/inputs';
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css'; // Importing Calendar CSS

// const SendInterview = props => {
//     const { closeModal, userId, refresh } = props;
//     const { showError, showSuccess } = useMessage();
//     const errorHandler = useErrorHandler();
//     const [date, setDate] = useState(new Date());
//     const [time, setTime] = useState('');
//     const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

//     const handlers = useForm(
//         useMemo(
//             () => ({
//                 userId: { final: v => userId },
//                 interviewDate: { final: v => date.toISOString().split('T')[0] },
//                 interviewTime: { final: v => time },
//                 interviewPlatform: { required: true },
//             }),
//             [userId, date, time]
//         ),
//         { Input: TextField }
//     );

//     const onSubmit = res => {
//         const { success, errors } = res.data;

//         if (!success) return showError(errors);

//         refresh();
//         closeModal();
//         showSuccess('Interview Scheduled successfully');
//     };

//     return (
//         <Card
//             sx={{
//                 boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
//                 borderRadius: '8px',
//                 maxWidth: '600px',
//                 width: '100%',
//                 px: 4,
//                 py: 3,
//                 mx: 2,
//                 maxHeight: '85vh',
//                 overflowY: 'auto',
//                 overflowX: 'hidden',
//             }}>
//             <Typography variant='h6' sx={{ textAlign: 'center' }}>
//                 Select Your Preferred Time and Date
//             </Typography>
//             <Typography mb={3} sx={{ textAlign: 'center' }}>
//                 When do you want your interview to be conduct? Select a Date
//             </Typography>
//             <Form
//                 handlers={handlers}
//                 onSubmit={onSubmit}
//                 action='/hr/interview'
//                 method='post'
//                 onError={errorHandler}>
//                 <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between' }}>
//                     <Box sx={{ flex: 1, marginRight: isMobile ? 0 : 2, marginBottom: isMobile ? 2 : 0 }}>
//                         <Calendar
//                             value={date}
//                             onChange={setDate}
//                             defaultView="month"
//                         />
//                     </Box>
//                     <Box sx={{ flex: 1, marginLeft: isMobile ? 0 : 2, mt: 1 }}>
//                         <Typography gutterBottom>Schedule at</Typography>
//                         <RadioGroup
//                             name="interviewTime"
//                             value={time}
//                             onChange={(e) => setTime(e.target.value)}
//                         >
//                             {['9:00AM', '11:00AM', '1:00PM', '3:00PM', '5:00PM', '7:00PM', '9:00PM'].map(t => (
//                                 <FormControlLabel key={t} value={t} control={<Radio />} label={t} />
//                             ))}
//                         </RadioGroup>
//                     </Box>
//                 </Box>
//                 <Box mt={3}>
//                     <Typography gutterBottom>Platform</Typography>
//                     <Input name='interviewPlatform' fullWidth size='small' required />
//                 </Box>
//                 <Box my={2} textAlign='right'>
//                     <Submit>
//                         {loader => (
//                             <Button
//                                 type='submit'
//                                 variant='contained'
//                                 disabled={Boolean(loader)}
//                                 endIcon={loader}
//                                 sx={{
//                                     mt: 1,
//                                 }}>
//                                 Schedule
//                             </Button>
//                         )}
//                     </Submit>
//                 </Box>
//             </Form>
//         </Card>
//     );
// };

const SendInterview = props => {
    const { oid, closeModal, userId, jobId, refresh } = props;
    const { showError, showSuccess } = useMessage();
    const errorHandler = useErrorHandler();

    const handlers = useForm(
        useMemo(
            () => ({
                oid: { final: v => oid },
                userId: { final: v => userId },
                jobId: { final: v => jobId },
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
