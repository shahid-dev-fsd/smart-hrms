import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useMessage } from '../../../../components/Header';

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

const LeaveModel = ({ handleClose, fetchLeaveType, leaveTypeId }) => {
    const [values, setValues] = React.useState({
        name: '',
        noOfLeaves: ''
    });

    const updateLeaveType = useCallback(async () => {
        if (!leaveTypeId) return;
        try {
            const response = await axios.get(`/hr/attendance/leaves-types`);
            const data = response.data.leaveTypes;
            const leave = data.find(item => item._id === leaveTypeId);
            if (leave) {
                setValues({ name: leave.name, noOfLeaves: leave.noOfLeaves });
            }
        } catch (e) {
            console.log(e);
        }
    }, [leaveTypeId]);

    useEffect(() => {
        updateLeaveType();
    }, [updateLeaveType]);

    const title = leaveTypeId ? 'Edit Leave Type' : 'Add New Leave';
    const buttonText = leaveTypeId ? 'Update' : 'Add';
    const method = leaveTypeId ? 'PATCH' : 'POST';
    const action = leaveTypeId
        ? `/hr/attendance/leaves-types/${leaveTypeId}`
        : '/hr/attendance/leaves-type';
    const successMessage = leaveTypeId
        ? 'Leave Type updated successfully'
        : 'Leave Type added successfully';

    const { showError, showSuccess } = useMessage();

    const customHandleChange = (event) => {
        const { name, value } = event.target;
        // Custom validation or transformation logic can go here
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const submit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios({
                method,
                url: action,
                data: values,
            });
            if (response.data.success) {
                showSuccess(successMessage);
                fetchLeaveType();
                handleClose();
            } else {
                showError(response.data.message);
            }
        } catch (e) {
            console.log(e);
            showError('An error occurred');
        }
    };

    return (
        <Box component="form" onSubmit={submit} sx={style}>
            <Typography id='modal-modal-title' variant='h5' component='h2'>
                {title}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography id='modal-modal-description' sx={{ my: 2 }}>
                Type of Leaves
            </Typography>
            <TextField
                name='name'
                placeholder='Leave'
                type='text'
                fullWidth
                required
                value={values.name}
                onChange={customHandleChange}
            />
            <Typography id='modal-modal-description' sx={{ my: 2 }}>
                Number of Days
            </Typography>
            <TextField
                type='number'
                name='noOfLeaves'
                placeholder='Number'
                fullWidth
                required
                value={values.noOfLeaves}
                onChange={customHandleChange}
            />
            <Box mt={5} textAlign='right'>
                <Button onClick={handleClose} variant='outlined' sx={{ mx: 2 }}>
                    Close
                </Button>
                <Button variant='contained' type='submit'>
                    {buttonText}
                </Button>
            </Box>
        </Box>
    );
};

export default LeaveModel;
