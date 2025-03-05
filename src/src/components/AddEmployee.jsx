import { Box, Button, Card, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useErrorHandler from '../hooks/useErrorHandler';
import { useMessage } from './Header';
import { Form, Submit, useForm } from '../hooks/useForm/useForm';
import { Input } from '../hooks/useForm/inputs';


const AddEmployee = props => {
    const { closeModal, userId, refetch } = props;
    const [departments, setDepartments] = useState([]);
    const { showError, showSuccess } = useMessage();
    const errorHandler = useErrorHandler();

    const fetchDepartments = useCallback(
        async function () {
            try {
                const response = await axios.get(`/hr/department`);
                setDepartments(response.data.departments);
            } catch (e) {
                errorHandler(e);
            }
        },
        [errorHandler]
    );

    const handlers = useForm(
        useMemo(
            () => ({
                userId: { final: v => userId },
                department: { required: true },
                date: { required: true },
                jobType: { required: true },
                shiftStartTime: { required: true },
                shiftEndTime: { required: true },
                timezone: { required: true },
            }),
            [userId]
        ),
        { Input: TextField }
    );

    const onSubmit = res => {
        const { success, message } = res.data;

        console.log('success');
        if (!success) return showError(message);

        console.log('success');
        refetch();
        closeModal();
        showSuccess('Employee added successfully');
    };

    const onSelectHandler = e => {
        const { name, value } = e.target;
        handlers.setValues({ [name]: value });
    };

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

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
                Add Employee
            </Typography>
            <Form
                handlers={handlers}
                onSubmit={onSubmit}
                action='/hr/employee'
                method='post'
                final={values => ({
                    ...values,
                    shiftStart: {
                        hour: values.shiftStartTime.split(':')[0],
                        minute: values.shiftStartTime.split(':')[1],
                    },
                    shiftEnd: {
                        hour: values.shiftEndTime.split(':')[0],
                        minute: values.shiftEndTime.split(':')[1],
                    },
                    dateOfJoining: new Date(values.date),
                })}
                onError={errorHandler}>
                <Box>
                    <Typography gutterBottom>Department</Typography>

                    <Select
                        required
                        name='department'
                        fullWidth
                        displayEmpty
                        size='small'
                        sx={{ mb: 2 }}
                        value={handlers.values.department}
                        onChange={onSelectHandler}>
                        {departments.map(department => (
                            <MenuItem value={department._id}>{department.name}</MenuItem>
                        ))}
                    </Select>

                    <Typography gutterBottom>Job type</Typography>

                    <Select
                        required
                        name='jobType'
                        fullWidth
                        size='small'
                        displayEmpty
                        sx={{ mb: 2 }}
                        value={handlers.values.jobType}
                        onChange={onSelectHandler}>
                        <MenuItem value='Part Time'>Part Time</MenuItem>
                        <MenuItem value='Full Time'>Full Time</MenuItem>
                    </Select>

                    <Typography gutterBottom>Start Date</Typography>

                    <Input name='date' fullWidth type='date' size='small' required />

                    <Typography gutterBottom>Shift Start</Typography>

                    <Input name='shiftStartTime' size='small' type='time' required fullWidth />

                    <Typography gutterBottom>Shift End</Typography>

                    <Input name='shiftEndTime' type='time' fullWidth size='small' required />

                    <Typography gutterBottom>Time zone</Typography>

                    <Select
                        onChange={onSelectHandler}
                        value={handlers.values.timezone}
                        fullWidth
                        required
                        displayEmpty
                        name='timezone'
                        size='small'>
                        {Intl.supportedValuesOf('timeZone')?.map(timezone => (
                            <MenuItem value={timezone}>{timezone}</MenuItem>
                        ))}
                    </Select>
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
                                Add Employee
                            </Button>
                        )}
                    </Submit>
                </Box>
            </Form>
        </Card>
    );
};

export default AddEmployee;
