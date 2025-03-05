import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {Avatar, Box, Button, Card, CardContent, Divider, FormControl, FormControlLabel, Grid, IconButton, ListItemAvatar, MenuItem, Radio, RadioGroup, TextField, Tooltip, Typography} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useNavigate } from 'react-router-dom';
import useErrorHandler from '../../hooks/useErrorHandler';
import { Form, Submit, useForm } from '../../hooks/useForm/useForm';
import axios from 'axios';
import { useMessage } from '../../components/Header';
import { SelectWithSearch } from '../../components/Select';
import { Input } from '../../hooks/useForm/inputs';


const AddPayrollPage = () => {
    const [employees, setEmployees] = useState({});
    const errorHandler = useErrorHandler();
    const navigate = useNavigate();

    const handlers = useForm(
        useMemo(
            () => ({
                employeeId: { required: true },
                from: { required: true },
                to: { required: true },
                salary: { required: true },
                status: { required: true, value: 'unPaid' },
                hraAllowance: { required: true },
                conveyance: { required: true },
                medicalAllowance: { required: true },
                bonusAllowance: { required: true },
                pf: { required: true },
                professionalTax: { required: true },
                tds: { required: true },
                loanAndOthers: { required: true },
            }),
            []
        ),
        { Input: TextField }
    );

    const values = handlers.values;
    const setValues = handlers.setValues;

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
                console.log(e);
            }
        },
        [setEmployees]
    );

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const handleChangeQuery = e => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({ [name]: value });
    };

    const { showSuccess, showError } = useMessage();
    const submit = res => {
        const { success } = res.data;
        if (!success) return showError('payroll not added');
        navigate('/employee-salary');
        showSuccess('Add payroll successfully');
    };

    const calculatedSalary = useMemo(() => {
        const {
            hraAllowance,
            medicalAllowance,
            conveyance,
            bonusAllowance,
            pf,
            professionalTax,
            tds,
            loanAndOthers,
            salary,
        } = values;
        const totalAllowance =
            parseFloat(hraAllowance) +
                parseFloat(medicalAllowance) +
                parseFloat(conveyance) +
                parseFloat(bonusAllowance) || 0;
        const totalDeduction =
            parseFloat(pf) +
                parseFloat(professionalTax) +
                parseFloat(tds) +
                parseFloat(loanAndOthers) || 0;
        const netSalary = parseInt(salary) + totalAllowance - totalDeduction || 0;

        return { totalAllowance, totalDeduction, netSalary };
    }, [values]);

    return (
        <>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={4} display='flex' alignItems='center'>
                    <Grid item xs>
                        <Typography variant='h5'>Add Payroll</Typography>
                    </Grid>
                    <Grid item display='flex' alignItems='center'>
                        <Box sx={{ ml: 2 }}>
                            <Tooltip title='info' placement='top'>
                                <IconButton disableRipple variant='navIcon' sx={{ mr: 0 }}>
                                    <InfoOutlinedIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box mb={4}>
                <Card elevation={0}>
                    <CardContent>
                        <Typography variant='body2'>Salary Information</Typography>
                        <Form
                            handlers={handlers}
                            onSubmit={submit}
                            action='/hr/payslip'
                            method='post'
                            onError={errorHandler}>
                            {/* salary */}
                            <Grid container spacing={2} mt={3} display='flex' alignItems='center'>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>Employee Name</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <FormControl fullWidth size='small'>
                                        <SelectWithSearch
                                            name='employeeId'
                                            fullWidth
                                            displayEmpty
                                            value={values.employeeId}
                                            onChange={handleChangeQuery}
                                            renderValue={v => {
                                                if (!values.employeeId) return 'Employee';
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
                                                    <ListItemAvatar
                                                        sx={{
                                                            minWidth: '45px',
                                                        }}>
                                                        <Avatar
                                                            alt='Remy Sharp'
                                                            src='data:image/jpeg;base64,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'
                                                            sx={{
                                                                width: 30,
                                                                height: 30,
                                                            }}
                                                        />
                                                    </ListItemAvatar>{' '}
                                                    {employees[employee]}
                                                </MenuItem>
                                            ))}
                                        </SelectWithSearch>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>Salary</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Input
                                        size='small'
                                        placeholder='0'
                                        name='salary'
                                        type='number'
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>From</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Input
                                        size='small'
                                        name='from'
                                        type='date'
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>To</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Input size='small' name='to' type='date' fullWidth required />
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>Status :</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <FormControl sx={{ display: 'flex' }}>
                                        <RadioGroup
                                            row
                                            defaultValue={values.status}
                                            name='status'
                                            onChange={handleChangeQuery}>
                                            <FormControlLabel
                                                value='paid'
                                                control={<Radio />}
                                                label='Paid'
                                            />
                                            <FormControlLabel
                                                value='unPaid'
                                                control={<Radio />}
                                                label='UnPaid'
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />
                            {/* allowances */}
                            <Typography variant='body2'>Allowances</Typography>
                            <Grid container spacing={2} mt={3} display='flex' alignItems='center'>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>HRA Allowance</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Input
                                        size='small'
                                        placeholder='0'
                                        name='hraAllowance'
                                        type='number'
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>Conveyance</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Input
                                        size='small'
                                        placeholder='0'
                                        name='conveyance'
                                        fullWidth
                                        type='number'
                                        // required
                                    />
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>Medical Allowance</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Input
                                        size='small'
                                        placeholder='0'
                                        name='medicalAllowance'
                                        fullWidth
                                        type='number'
                                        // required
                                    />
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>Bonus Allowance</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Input
                                        size='small'
                                        placeholder='0'
                                        name='bonusAllowance'
                                        fullWidth
                                        type='number'
                                        // required
                                    />
                                </Grid>
                            </Grid>
                            {/* Deucation */}
                            <Divider sx={{ my: 3 }} />
                            <Typography variant='body2'>Deduction</Typography>
                            <Grid container spacing={2} mt={3} display='flex' alignItems='center'>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>PF</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Input size='small' placeholder='0' name='pf' fullWidth />
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>Professional Tax</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Input
                                        size='small'
                                        placeholder='0'
                                        name='professionalTax'
                                        fullWidth
                                        type='number'
                                    />
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>TDS</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Input
                                        size='small'
                                        placeholder='0'
                                        name='tds'
                                        type='number'
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>Loans & Others</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Input
                                        size='small'
                                        placeholder='0'
                                        name='loanAndOthers'
                                        type='number'
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            {/* Gross salary */}
                            <Divider sx={{ my: 3 }} />
                            <Typography variant='body2'>Gross Salary</Typography>
                            <Grid container spacing={2} mt={3} display='flex' alignItems='center'>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>Total Allowances</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Typography variant='subtitle01'>
                                        {calculatedSalary.totalAllowance}
                                    </Typography>
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>Total Deduction</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Typography variant='subtitle01'>
                                        {calculatedSalary.totalDeduction}
                                    </Typography>
                                </Grid>
                                <Grid item lg={3} xs={12}>
                                    <Typography variant='body2'>Net Salary</Typography>
                                </Grid>
                                <Grid item lg={9} xs={12}>
                                    <Typography variant='subtitle01'>
                                        {calculatedSalary.netSalary}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ my: 3 }} />
                            <Box>
                                <Submit>
                                    {loader => (
                                        <Button
                                            type='submit'
                                            disabled={Boolean(loader)}
                                            endIcon={loader}
                                            variant='contained'
                                            sx={{
                                                mx: 2,

                                                background: '#4674FF',
                                                '$:hover': {
                                                    background: '#4674FF',
                                                },
                                            }}>
                                            Save
                                        </Button>
                                    )}
                                </Submit>
                            </Box>
                        </Form>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default AddPayrollPage;
