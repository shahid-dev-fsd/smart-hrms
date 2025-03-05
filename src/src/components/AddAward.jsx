import {
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    ListItemAvatar,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useErrorHandler from '../hooks/useErrorHandler';
import { Form, Submit, useForm } from '../hooks/useForm/useForm';
import { useMessage } from './Header';
import useLoader from '../hooks/useLoader';
import axios from 'axios';
import Loading from './Loading';
import { SelectWithSearch } from './Select';
import { Input } from '../hooks/useForm/inputs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    overflow: 'auto',
    maxHeight: '80vh',

    '::-webkit-scrollbar': { display: 'none' },
};

const AddAward = ({ handleClose, refetch, award }) => {
    const [employees, setEmployees] = useState({});
    const [jobListing, setJobListing] = useState({});
    const [departments, setDepartments] = useState({});
    const errorHandler = useErrorHandler();
    const { showError, showSuccess } = useMessage();
    const { loaderState, start, end } = useLoader();
    const handlers = useForm(
        useMemo(
            () => ({
                employee: { required: true },
                designation: { required: true },
                department: { required: true },
                name: { required: true },
                gift: { required: true },
                description: { required: true },
            }),
            []
        ),
        { Input: TextField }
    );

    const setValues = handlers.setValues;
    const values = handlers.values;
    const errors = handlers.errors;

    const onChangeHandler = e => {
        const { name, value } = e.target;
        setValues({ [name]: value });
    };

    const onSubmit = res => {
        const { success, message } = res.data;

        if (!success) return showError(message);

        handleClose();
        refetch();
        showSuccess('Award saved successfully');
    };

    const fetchAward = useCallback(
        async id => {
            start();
            try {
                const response = await axios.get(`/hr/awards/${id}`);
                const award = response.data.award;
                const { name, employeeId, employee, description, gift } = award;
                setValues({
                    name,
                    employee: employeeId,
                    department: employee.department,
                    designation: employee.designation,
                    description,
                    gift,
                });
            } catch (e) {
                errorHandler(e);
            } finally {
                end();
            }
        },
        [errorHandler, setValues, start, end]
    );

    const fetchEmployees = useCallback(
        async (employeeSearch = '') => {
            try {
                const response = await axios.get(
                    `/hr/employee?pageSize=10${
                        employeeSearch ? `&searchBy=firstName&search=${employeeSearch}` : ''
                    }`
                );

                setEmployees([]);
                const employees = response.data.employees;

                const formattedEmployees = {};

                employees.forEach(
                    employee =>
                        (formattedEmployees[
                            employee._id
                        ] = `${employee.firstName} ${employee.lastName}`)
                );

                setEmployees(formattedEmployees);
            } catch (e) {
                errorHandler(e);
            }
        },
        [errorHandler]
    );

    const getJobListings = useCallback(
        async (search = '', department) => {
            try {
                const params = {
                    searchBy: 'title',
                    sortBy: 'order',
                    direction: -1,
                    pageSize: 10,
                    department,
                };
                if (search) params.search = search;

                const response = await axios.get(`/hr/job-listing`, { params });
                const body = response.data;
                const { jobs } = body;

                setJobListing({});
                const format = {};

                jobs.forEach(job => (format[job._id] = job.title));

                setJobListing(format);
            } catch (e) {
                errorHandler(e);
            }
        },
        [errorHandler]
    );

    const getDepartments = useCallback(
        async search => {
            try {
                const params = {
                    pageSize: 10,
                };
                if (search) {
                    params.searchBy = 'title';
                    params.search = search;
                }

                const response = await axios.get(`/hr/department`, { params });
                const departments = response.data.departments;

                setDepartments({});
                const format = {};

                departments.forEach(department => (format[department._id] = department.name));

                setDepartments(format);
            } catch (e) {
                errorHandler(e);
            }
        },
        [errorHandler]
    );

    useEffect(() => {
        getDepartments();
    }, [getDepartments]);

    useEffect(() => {
        if (values.department) {
            getJobListings('', values.department);
        }
    }, [values.department, getJobListings]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    useEffect(() => {
        if (award) fetchAward(award);
    }, [award, fetchAward]);

    return (
        <>
            <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6'>
                    {award ? 'Update ' : ''} Award Details
                </Typography>
                <Divider sx={{ my: 2 }} />
                {loaderState ? (
                    <Loading message='Please wait, while your Award are loading...' />
                ) : (
                    <Form
                        handlers={handlers}
                        onSubmit={onSubmit}
                        action={award ? `/hr/awards/${award}` : '/hr/awards'}
                        method={award ? 'patch' : 'post'}
                        onError={errorHandler}>
                        <Box>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant='body2'
                                        id='modal-modal-description'
                                        sx={{ mb: 1 }}>
                                        Select Employee
                                    </Typography>
                                    <SelectWithSearch
                                        size='small'
                                        name='employee'
                                        displayEmpty
                                        fullWidth
                                        onChange={onChangeHandler}
                                        value={values.employee}
                                        isError={Boolean(errors.employee)}
                                        error={errors.employee}
                                        renderValue={v => {
                                            if (!values.employee) return 'Choose an employee';
                                            return employees[v];
                                        }}
                                        SearchProps={{
                                            onChange: e => fetchEmployees(e.target.value),
                                        }}>
                                        {Object.keys(employees).map((employee, i) => (
                                            <MenuItem
                                                value={employee}
                                                key={i}
                                                selected={false}
                                                sx={{ px: 1.2 }}>
                                                <ListItemAvatar sx={{ minWidth: '45px' }}>
                                                    <Avatar
                                                        alt='Remy Sharp'
                                                        src='data:image/jpeg;base64,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'
                                                        sx={{ width: 30, height: 30 }}
                                                    />
                                                </ListItemAvatar>{' '}
                                                {employees[employee]}
                                            </MenuItem>
                                        ))}
                                    </SelectWithSearch>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant='body2' sx={{ mb: 1 }}>
                                        Department
                                    </Typography>
                                    <SelectWithSearch
                                        displayEmpty
                                        name='department'
                                        onChange={onChangeHandler}
                                        value={values.department}
                                        isError={Boolean(errors.department)}
                                        error={errors.department}
                                        renderValue={v => {
                                            if (!values.department) return 'Choose a department';
                                            return departments[v];
                                        }}
                                        fullWidth
                                        SearchProps={{
                                            onChange: e => getDepartments(e.target.value),
                                        }}>
                                        {Object.keys(departments).map((dept, i) => (
                                            <MenuItem value={dept} key={i} sx={{ px: 1.2 }}>
                                                {departments[dept]}
                                            </MenuItem>
                                        ))}
                                    </SelectWithSearch>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='body2' sx={{ mb: 1 }}>
                                        Designation
                                    </Typography>
                                    <SelectWithSearch
                                        displayEmpty
                                        name='designation'
                                        onChange={onChangeHandler}
                                        value={values.designation}
                                        isError={Boolean(errors.designation)}
                                        error={errors.designation}
                                        renderValue={v => {
                                            if (!values.designation) return 'Choose a designation';
                                            return jobListing[v];
                                        }}
                                        fullWidth
                                        SearchProps={{
                                            onChange: e => getJobListings(e.target.value),
                                        }}>
                                        {Object.keys(jobListing).map((job, i) => (
                                            <MenuItem value={job} key={i} sx={{ px: 1.2 }}>
                                                {jobListing[job]}
                                            </MenuItem>
                                        ))}
                                    </SelectWithSearch>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Typography variant='body2' sx={{ mb: 1 }}>
                                        Award name
                                    </Typography>
                                    <Input name='name' placeholder='Award' fullWidth size='small' />
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                    <Typography
                                        variant='body2'
                                        id='modal-modal-description'
                                        sx={{ mb: 1, pt: 0 }}>
                                        Gifts
                                    </Typography>
                                    <Input name='gift' placeholder='Gifts' fullWidth size='small' />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant='body2' sx={{ mb: 1, pt: 0 }}>
                                        Award Description:
                                    </Typography>
                                    <Input name='description' multiline minRows={4} fullWidth />
                                </Grid>
                            </Grid>
                            <Box mt={5} textAlign='right'>
                                <Button
                                    onClick={handleClose}
                                    variant='outlined'
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
                                            disabled={loader}
                                            endIcon={loader}>
                                            Save
                                        </Button>
                                    )}
                                </Submit>
                            </Box>
                        </Box>
                    </Form>
                )}
            </Box>
        </>
    );
};

export default AddAward;
