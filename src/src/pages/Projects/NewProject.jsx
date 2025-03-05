import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {Avatar, Box, Button, Card, CardContent, Divider, FormControl, FormControlLabel, Grid, IconButton, ListItemAvatar, MenuItem, Radio, RadioGroup, TextField, Tooltip, Typography , Select } from '@mui/material';
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
        <Box sx={{ backgroundColor: 'background.main', }} className="h-full overflow-hidden ">
            <div className="h-full" style={{ overflowY: 'auto', paddingRight: '1px' }}>
                <Grid container justifyContent='center' height='100%'>
                    <Grid item xs={11}>
                    <Box sx={{ mt: 3 }}>
                <Grid container spacing={4} display='flex' alignItems='center'>
                    <Grid item xs>
                        <Typography variant='h5'>New Project</Typography>
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
                    <Box pb={8}>
                    <Form
    handlers={handlers}
    onSubmit={submit}
    onError={errorHandler}
    action='/hr/rules'
    method='post'>
    <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <Typography variant='subtitle1'  component='p' mb={1} mx={1}>
                Project ID
            </Typography>
            <Input name='name' fullWidth size='small' placeholder='enter project id' />
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' component='p' mb={1} mx={1}>
                Project Title
            </Typography>
            <Input name='email' fullWidth size='small'  placeholder='enter project title' />
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' component='p' mb={1} mx={1}>
                Project Priority
            </Typography>
            <Select name='priority' fullWidth variant='outlined' size='small'>
          <MenuItem value='High'>High</MenuItem>
          <MenuItem value='Medium'>Medium</MenuItem>
          <MenuItem value='Low'>Low</MenuItem>
        </Select>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' component='p' mb={1} mx={1}>
                 Department
            </Typography>
            <Input name='field2' fullWidth size='small'   placeholder='enter Department'/>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' component='p' mb={1} mx={1}>
            Price
            </Typography>
            <Input name='field2' fullWidth size='small'  placeholder='enter price'/>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' component='p' mb={1} mx={1}>
                 Client
            </Typography>
            <Select name='priority' fullWidth variant='outlined' size='small'>
          <MenuItem value='High'>High</MenuItem>
          <MenuItem value='Medium'>Medium</MenuItem>
          <MenuItem value='Low'>Low</MenuItem>
        </Select>
        </Grid>
        <Grid item xs={12} md={12}>
            <Typography variant='subtitle1' component='p' mb={1} mx={1}>
Assigned Team            </Typography>
            <Input name='field2' fullWidth size='small'   placeholder='enter Assigned team'/>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' component='p' mb={1} mx={1}>
                Form 
            </Typography>
            <Input name='field3' fullWidth size='small' type='date' />
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant='subtitle1' component='p' mb={1} mx={1}>
                to 
            </Typography>
            <Input name='field4' fullWidth size='small' type='date' />
        </Grid>
    </Grid>
 
</Form>

                </Box>
                    </CardContent>
                </Card>
            </Box>
                    </Grid>
                </Grid>
            </div>
            <style jsx>{`
                
                .h-full::-webkit-scrollbar {
                    display: none;
                }
                .h-full {
                    scrollbar-width: none;
                }
            `}</style>

        </Box>
          
        </>
    );
};

export default AddPayrollPage;
