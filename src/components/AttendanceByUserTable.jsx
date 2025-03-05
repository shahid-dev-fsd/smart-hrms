import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Divider, Grid, IconButton, LinearProgress, Modal, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loading from './Loading';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};
const columns = [
    { id: 'Date', label: 'Date', minWidth: 130 },
    { id: 'Status', label: 'Status', minWidth: 100, align: 'center' },
    {
        id: 'Clock_In',
        label: 'Clock In',
        minWidth: 115,
        align: 'center',
    },
    {
        id: 'Clock_Out',
        label: 'Clock Out',
        minWidth: 115,
        align: 'center',
    },
    {
        id: 'Progress',
        label: 'Progress',
        minWidth: 120,
        align: 'center',
    },
    {
        id: 'Action',
        label: 'Action',
        minWidth: 110,
        align: 'center',
    },
];

const AttendanceByUserTable = ({ attendanceDetail }) => {
    const [id, setId] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const sortedAsc = attendanceDetail?.sort(
        (objA, objB) =>
            Number(objB.clockInDate.day - objB.clockInDate.month - objB.clockInDate.year) -
            Number(objA.clockInDate.day - objA.clockInDate.month - objA.clockInDate.year)
    );
    console.log(sortedAsc);

    const employee = attendanceDetail?.find(data => data._id === id);
    const time = new Date(employee?.clockInTime);
    let ClockInTime = time.toLocaleTimeString();
    const time2 = new Date(employee?.clockOutTime);
    let ClockOutTime = time2.toLocaleTimeString();

    return (
        <>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendanceDetail ? (
                            sortedAsc?.map((detail, i) => {
                                const time = new Date(detail.clockInTime);
                                let ClockInTime = time.toLocaleTimeString();
                                const time2 = detail.clockOutTime
                                    ? new Date(detail.clockOutTime)
                                    : 'You are not clock out';
                                let ClockOutTime = detail.clockOutTime
                                    ? time2.toLocaleTimeString()
                                    : 'You are not clock out';
                                const timeDifference = time2 - time;

                                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                                // progress bar
                                const value = 100 - (seconds * 100) / 28800;
                                console.log(value);
                                return (
                                    <TableRow
                                        key={i}
                                        sx={{
                                            '&:last-child td, &:last-child th': {
                                                border: 0,
                                            },
                                        }}>
                                        <TableCell component='th' scope='row'>
                                            {detail.clockInDate.day}-{detail.clockInDate.month}-
                                            {detail.clockInDate.year}
                                        </TableCell>

                                        <TableCell component='th' scope='row' align='center'>
                                            <Typography variant='caption'>
                                                {detail.status}
                                            </Typography>
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center'>
                                            <Typography variant='caption'>{ClockInTime}</Typography>
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center'>
                                            <Typography variant='caption'>
                                                {ClockOutTime
                                                    ? ClockOutTime
                                                    : 'You are not clockOut'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center'>
                                            <LinearProgress
                                                variant='determinate'
                                                value={value}
                                                color='success'
                                                sx={{ textAlign: 'center' }}
                                            />
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center'>
                                            <IconButton
                                                sx={{
                                                    borderRadius: '4px',
                                                    background: '#3366FF',
                                                    '&:hover': {
                                                        background: '#3366FF',
                                                    },
                                                }}>
                                                <VisibilityIcon
                                                    fontSize='small'
                                                    onClick={() => handleOpen(setId(detail._id))}
                                                />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <>
                                <TableCell component='th' scope='row' align='center'>
                                    <Loading />
                                </TableCell>
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
              sx={{ 
                overflowY: 'scroll' }}
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='body2'>
                        Attendance Detail
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                        <Grid item lg={4} xs={12}>
                            <Typography variant='body1'>Employee Id</Typography>
                        </Grid>
                        <Grid item lg={8} xs={12}>
                            <Typography variant='body2'>{employee?.employeeId}</Typography>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <Typography variant='body1'>Clock In Time</Typography>
                        </Grid>
                        <Grid item lg={8} xs={12}>
                            <Typography variant='body2'>{ClockInTime}</Typography>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <Typography variant='body1'>Clock Out Time</Typography>
                        </Grid>
                        <Grid item lg={8} xs={12}>
                            <Typography variant='body2'>{ClockOutTime}</Typography>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <Typography variant='body1'>Clock In Date</Typography>
                        </Grid>
                        <Grid item lg={8} xs={12}>
                            <Typography variant='body2'>
                                {employee?.clockInDate.day}-{employee?.clockInDate.month}-
                                {employee?.clockInDate.year}
                            </Typography>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <Typography variant='body1'>Status</Typography>
                        </Grid>
                        <Grid item lg={8} xs={12}>
                            <Typography variant='body2'>{employee?.status}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default AttendanceByUserTable;
