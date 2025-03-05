import React, { useMemo } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { Form, Submit, useForm } from '../../hooks/useForm/useForm';
import { Input } from '../../hooks/useForm/inputs';

import { handleAxiosError } from '../../utilities/function';
import { useMessage } from '../../components/Header';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { sm: 600, xs: 300 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

const TerminationModal = ({ handleClose, fetchEmploees,fetchEmployeesOverview, suspenId }) => {
    const { showError, showSuccess } = useMessage();

    const handlers = useForm(
        useMemo(
            () => ({
                reason: '',
            }),
            []
        ),
        { Input: TextField }
    );

    function onSubmit(res) {
        const { success, message } = res.data;
        if (success) {
            showSuccess(message);
            fetchEmploees();
            fetchEmployeesOverview();
            handleClose();
            return;
        }

        showError(message || 'Something went wrong');
    }

    function onError(e) {
        handleAxiosError(e, showError);
    }

    return (
        <>
            <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6'>
                    Terminate Employee
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography id='modal-modal-description' sx={{ my: 4 }} variant='body1'>
                    Please provide reason why you are terminating
                </Typography>
                <Form
                    handlers={handlers}
                    onSubmit={onSubmit}
                    onError={onError}
                    action={`/hr/employee/terminate/${suspenId}`}
                    method='patch'>
                    <Input
                        fullWidth
                        name='reason'
                        multiline
                        rows={5}
                        placeholder='Reason .................'
                    />

                    <Box mt={5} textAlign='right'>
                        <Button
                            onClick={handleClose}
                            variant='contained'
                            sx={{
                                mx: 2,
                            }}>
                            Close
                        </Button>

                        <Submit>
                            {loader => (
                                <Button
                                    type='submit'
                                    variant='contained'
                                    disabled={Boolean(loader)}
                                    endIcon={loader}>
                                    Terminate
                                </Button>
                            )}
                        </Submit>
                    </Box>
                </Form>
            </Box>
        </>
    );
};

export default TerminationModal;
