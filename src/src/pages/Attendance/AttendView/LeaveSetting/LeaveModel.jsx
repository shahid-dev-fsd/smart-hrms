import React, { useCallback, useEffect, useMemo } from 'react'
import { useForm } from '../../../../hooks/useForm/useForm';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { Input } from 'postcss';
import axios from 'axios';
import { useMessage } from '../../../../components/Header';
import { Form } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: { sm: 500, xs: 300 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};
const LeaveModel = ({ leavesTypes, handleClose, fetchLeaveType, leaveTypeId }) => {
    const handlers = useForm(
        useMemo(
            () => ({
                name: {
                    required: true,
                    validator: value =>
                        /^[A-Za-z ]+$/.test(value) ? '' : 'Please Enter on alphabets only.',
                },
                noOfLeaves: {
                    required: true,
                },
            }),
            []
        ),
        { Input: TextField }
    );

    const setValues = handlers.setValues;
    const upadateLeaveType = useCallback(
        async function () {
            try {
                const response = await axios.get(`hr/attendance/leaves-types`);

                const data = response.data.leaveTypes;
                const Leave = data.find(data => data._id === leaveTypeId);
                console.log(Leave);
                const data1 = Leave.name;
                const data2 = Leave.noOfLeaves;
                const name = data1;
                const noOfLeaves = data2;
                setValues({ name, noOfLeaves });
            } catch (e) {
                console.log(e);
            }
        },
        [setValues, leaveTypeId]
    );

    useEffect(() => {
        upadateLeaveType();
    }, [upadateLeaveType]);

    const title = leaveTypeId ? 'Edit Leaves Type' : 'Add New Leaves';
    const buttonText = leaveTypeId ? 'Update' : 'Add';
    const method = leaveTypeId ? 'PATCH' : 'POST';
    const action = leaveTypeId
        ? `hr/attendance/leaves-types/${leaveTypeId}`
        : '/hr/attendance/leaves-type/';
    const successMessage = leaveTypeId
        ? 'Leave Type updated successfully'
        : 'Leave Type added successfully';

    const { showError, showSuccess } = useMessage();
    const submit = res => {
        fetchLeaveType();
        handleClose();
        const { success, message } = res.data;
        if (success) return showSuccess(successMessage);
        showError(message);
    };
  return (
    <>
      <Form
                handlers={handlers}
                onSubmit={submit}
                action={action}
                method={method}
                onError={console.log}>
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h5' component='h2'>
                        {title}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography id='modal-modal-description' sx={{ my: 2 }}>
                        Type Of Leaves
                    </Typography>
                    <Input
                        pattern='[a-zA-Z]'
                        name='name'
                        placeholder='Leave'
                        type='text'
                        fullWidth
                    />
                    <Typography id='modal-modal-description' sx={{ my: 2 }}>
                        Number Of Days
                    </Typography>
                    <Input type='number' name='noOfLeaves' placeholder='Number' fullWidth />
                    <Box mt={5} textAlign='right'>
                        <Button
                            onClick={handleClose}
                            variant='outlined'
                            sx={{
                                mx: 2,
                            }}>
                            Close
                        </Button>
                        <Button variant='contained' type='submit'>
                            {buttonText}
                        </Button>
                    </Box>
                </Box>
            </Form>
    </>
  )
}

export default LeaveModel
