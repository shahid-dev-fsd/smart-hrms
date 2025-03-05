import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Divider, FormControl, Grid, IconButton, ListItemAvatar, MenuItem, Select, Skeleton, Stack, Typography } from '@mui/material';
import AttendPage from './AttendPage';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SelectWithSearch } from '../../components/SelectSearch';
import AttendanceByUserTable from '../../components/AttendanceByUserTable';

const Months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
};

const Years = Array(41)
    .fill(1)
    .map((el, i) => i + 2009);


const AttendHome = () => {
    const [employees, setEmployees] = useState({});
    const employeeId = useParams().id;

    const [query, setQuery] = useState({
        employeeId: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });
    const [attendanceDetail, setAttendanceDetail] = useState(null);
    const [metrics, setMetrics] = useState(null);

    const fetchEmployees = useCallback(async (employeeSearch = '') => {
        try {
            const response = await axios.get(
                `/hr/employee?pageSize=10${
                    employeeSearch ? `&searchBy=firstName&search=${employeeSearch}` : ''
                }`
            );

            setEmployees({});
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
    }, []);

    const fetchEmployee = useCallback(async id => {
        try {
            const response = await axios.get(`/hr/employee/${id}`);

            const employee = response.data.employee;

            setEmployees(prev => ({
                [employee._id]: `${employee.firstName} ${employee.lastName}`,
                ...prev,
            }));
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handleChangeQuery = e => {
        const name = e.target.name;
        const value = e.target.value;
        setQuery({ ...query, [name]: value });
    };

    const fetchAttendence = useCallback(
        async function () {
            try {
                const response = await axios.get(
                    `/hr/attendance/metrics-by-user/${query.employeeId}?year=${query.year}&month=${query.month}`
                );
                const { attendance, monthData } = response.data;
                setAttendanceDetail(attendance);
                setMetrics(monthData);
            } catch (e) {
                console.log(e);
            }
        },
        [query.month, query.year, query.employeeId]
    );

    // const attendenceMetrics = useCallback(
    //     async function () {
    //         try {
    //             const response = await axios.get(
    //                 `/hr/attendance/metrics-by-user/${query.employeeId}?month=${query.month}&year=${query.year}`
    //             );
    //             setMetrics(response.data.monthData);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     },
    //     [query.month, query.year, query.employeeId]
    // );

    console.log({ query });

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    useEffect(() => {
        if (employeeId) {
            fetchEmployee(employeeId);
            setQuery(prev => ({
                ...prev,
                employeeId: employeeId,
            }));
        }
    }, [employeeId, fetchEmployee]);

    useEffect(() => {
        if (query.employeeId) {
            fetchAttendence();
        }
    }, [query.employeeId, fetchAttendence]);

    return (
        <>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={2} display='flex' alignItems='center'>
                    <Grid item xs>
                        <Typography variant='h5'>User's attendance</Typography>
                    </Grid>

                    <Grid item>
                        <FormControl size='small' sx={{ width: 233 }}>
                            <Select
                                fullWidth
                                value={query.month}
                                name='month'
                                displayEmpty
                                onChange={handleChangeQuery}
                                filter={query.month && Months[query.month]}
                                clear={() =>
                                    setQuery({
                                        ...query,
                                        month: '',
                                    })
                                }
                                renderValue={v => {
                                    if (!query.month) return 'Month';
                                    return Months[v];
                                }}>
                                {Object.keys(Months).map(month => (
                                    <MenuItem key={month} value={month}>
                                        {Months[month]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl size='small' sx={{ width: 233 }}>
                            <Select
                                name='year'
                                fullWidth
                                displayEmpty
                                value={query.year}
                                filter={query.year}
                                onChange={handleChangeQuery}
                                clear={() => setQuery({ ...query, year: '' })}
                                renderValue={v => {
                                    if (!query.year) return 'Year';
                                    return v;
                                }}>
                                {Years.map(year => (
                                    <MenuItem value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            {attendanceDetail ? (
                <Stack direction='row' justifyContent='space-between' alignItems='center' mt={2}>
                    <Typography variant='body1' color='text.secondary' mb={2}>
                        Choose an employee to access their attendance records.
                    </Typography>
                    <FormControl size='small' sx={{ width: { xs: '100%', xm: 482 } }}>
                        <SelectWithSearch
                            name='employeeId'
                            fullWidth
                            displayEmpty
                            value={query.employeeId}
                            filter={query.employeeId && employees[query.employeeId]}
                            onChange={handleChangeQuery}
                            clear={() =>
                                setQuery({
                                    ...query,
                                    employeeId: '',
                                })
                            }
                            renderValue={v => {
                                if (!query.employeeId) return 'Employee';
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
                                            // src={`https://api.files.catch.com/open/file/preview/${employeesInfo[employee]?.photo}`}
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
                </Stack>
            ) : null}

            {attendanceDetail && metrics ? (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card sx={{ minHeight: 200 }} elevation={0}>
                                <CardContent>
                                    <Typography variant='body1' sx={{ mb: 4 }}>
                                        Days insights of this month.
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item lg={2} md={6} xs={12} textAlign='center'>
                                            <MetricIcon
                                                metrics={metrics}
                                                background='#D6E0FF'
                                                color='#4271FF'
                                                name='total'
                                            />

                                            <Typography variant='body2'>Total Days</Typography>
                                        </Grid>
                                        <Grid item lg={2} md={6} xs={12} textAlign='center'>
                                            <MetricIcon
                                                metrics={metrics}
                                                color='#0DCD94'
                                                background='#E6FAF4'
                                                name='Present'
                                            />
                                            <Typography variant='body2'>Present Days</Typography>
                                        </Grid>
                                        <Grid item lg={2} md={6} xs={12} textAlign='center'>
                                            <MetricIcon
                                                metrics={metrics}
                                                color='#F7284A'
                                                background='#FFE9EC'
                                                name='Absent'
                                            />
                                            <Typography variant='body2'>Absent Days</Typography>
                                        </Grid>
                                        <Grid item lg={2} md={6} xs={12} textAlign='center'>
                                            <MetricIcon
                                                metrics={metrics}
                                                color='#E3B113'
                                                background='#FFF9E7'
                                                name='HalfDay'
                                            />
                                            <Typography variant='body2'>Half Days</Typography>
                                        </Grid>
                                        <Grid item lg={2} md={6} xs={12} textAlign='center'>
                                            <MetricIcon
                                                metrics={metrics}
                                                color='#F34932'
                                                background='#FEECEA'
                                                name='Late'
                                            />
                                            <Typography variant='body2'>Late Days</Typography>
                                        </Grid>
                                        <Grid item lg={2} md={6} xs={12} textAlign='center'>
                                            <MetricIcon
                                                metrics={metrics}
                                                color='#EF5CB8'
                                                background='#FEEDF8'
                                                name='Holiday'
                                            />
                                            <Typography variant='body2'>Holidays</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Divider sx={{ mb: 4 }} />

                    <AttendanceByUserTable attendanceDetail={attendanceDetail} />
                </>
            ) : (
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    height='calc(100dvh - 220px)'>
                    <Typography variant='h5' color='text.secondary' mb={2}>
                        Choose an employee to access their attendance records.
                    </Typography>
                    <FormControl size='small' sx={{ width: 433 }}>
                        <SelectWithSearch
                            name='employeeId'
                            fullWidth
                            displayEmpty
                            value={query.employeeId}
                            filter={query.employeeId && employees[query.employeeId]}
                            onChange={handleChangeQuery}
                            clear={() =>
                                setQuery({
                                    ...query,
                                    employeeId: '',
                                })
                            }
                            renderValue={v => {
                                if (!query.employeeId) return 'Employee';
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
                                            // src={`https://api.files.catch.com/open/file/preview/${employeesInfo[employee]?.photo}`}
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
                </Box>
            )}
        </>
    );
};

function MetricIcon(props) {
    const { metrics, background, name, color } = props;
    return (
        <IconButton
            size='medium'
            sx={{
                borderRadius: '4px',
                color,
                ...(metrics ? { background } : {}),
                mb: 1,
                '&:hover': {
                    ...(metrics ? { background } : {}),
                },
            }}>
            {metrics ? (
                metrics[name] ? (
                    metrics[name].toString().padStart(2, '0')
                ) : (
                    '00'
                )
            ) : (
                <Skeleton animation='wave' height={30} width={30} />
            )}
        </IconButton>
    );
};

export default AttendHome;
