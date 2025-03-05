import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {Box, Button, Card, Divider, IconButton, Modal, TextField, Typography} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Form, Submit, useForm } from '../../hooks/useForm/useForm';
import useLoader from '../../hooks/useLoader';
import useErrorHandler from '../../hooks/useErrorHandler';
import axios from 'axios';
import { useMessage } from '../../components/Header';
import Loading from '../../components/Loading';
import { Input } from '../../hooks/useForm/inputs';

const HolidayPage = () => {
    const userData = [
        {no:1, day:'Tuesday', date:'25-12-2024', holiday:'Christmas'},
        {no:2, day:'Tuesday', date:'25-12-2024', holiday:'Christmas'},
        {no:3, day:'Tuesday', date:'25-12-2024', holiday:'Christmas'},
        
        
    ];

    const getDate = (isoDate) => {
        const date = isoDate?.split('T')[0];
        const normalDate = `${date?.split('-')[2]}-${date?.split('-')[1]}-${
            date.split('-')[0]
        }`;
        return normalDate;
    };

    const [holidays, setHolidays] = useState(null);
    const [holidayDate, setHolidayDate] = useState();
    const handlers = useForm(
        useMemo(
            () => ({
                title: '',
            }),
            []
        ),
        { Input: TextField }
    );
    const [holiday, setHoliday] = useState(null);
    const setValues = handlers.setValues;
    const { start, end, loaderState } = useLoader();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const errorHandler = useErrorHandler();

    console.log(holidayDate);

    const fetchHolidays = useCallback(
        async (search = '') => {
            try {
                const response = await axios.get(
                    `/hr/holidays?searchBy=title&search=${search}&sortBy=order`
                );

                setHolidays(response.data.holidays);
            } catch (e) {
                errorHandler(e);
            }
        },
        [errorHandler]
    );

    const editHoliday = id => {
        setHoliday(id);
        handleOpen();
    };

    const fetchHoliday = useCallback(
        async id => {
            start();
            try {
                const response = await axios.get(`/hr/holidays/${id}`);
                const { title, date } = response.data.holiday;

                const d = date.split('T')[0];
                setValues({ title });
                setHolidayDate(d);
            } catch (e) {
                errorHandler(e);
            } finally {
                end();
            }
        },
        [errorHandler, setValues, start, end]
    );

    useEffect(() => {
        if (holiday) {
            fetchHoliday(holiday);
        }
    }, [holiday, fetchHoliday]);

    useEffect(() => {
        fetchHolidays();
    }, [fetchHolidays]);

    const { showSuccess, showError } = useMessage();

    const submit = res => {
        const { success, message } = res.data;

        if (!success) return showError(message);

        showSuccess('Holiday saved successfully');
        fetchHolidays();
        handleClose();
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const deleteHoliday = React.useCallback(
        async function (id) {
            try {
                const res = await axios.delete(`/hr/holidays/${id}`);

                const { success, message } = res.data;

                if (!success) return showError(message);

                showSuccess('Holiday Delete successfully');
                fetchHolidays();
            } catch (e) {
                console.log(e);
            }
        },
        [showSuccess, showError, fetchHolidays]
    );
    console.log(holidays)
    return (
        <Box sx={{backgroundColor: 'background.main',}}>
        <div className='flex flex-col justify-start'>
                <div className="flex items-center justify-between md:w-full p-4">
                        <div className="p-2">
                            <h1 className="text-2xl text-neutral-500">Holidays</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <button onClick={() => {
                                    setHoliday(null);
                                    handleOpen();
                                }} className='flex items-center text-white font-bold text-xs md:text-base py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                                Add Holiday
                            </button>
                            <InfoOutlinedIcon />
                        </div>
                    </div>
                <Box className="w-full md:ml-0 pt-4 md:mt-5 rounded-lg mb-4 p-4" sx={{ backgroundColor: 'background.view', }}>
                <Box className="flex flex-col md:flex-row justify-center gap-4 w-[97%] ml-2 md:ml-4 ">
                   <div className='w-full md:w-[38%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>DD-MM-YYY</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <CalendarTodayOutlinedIcon style={{fontSize:'24px'}} className="text-zinc-500 pr-2"/>
                   </div>
                   <div className='w-full md:w-[38%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Select Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                        </select>
                        <ArrowDropDownIcon style={{fontSize:'28px'}} className="text-zinc-500"/>
                   </div>
                   <div className='w-full md:w-[24%] flex justify-end md:justify-end items-center '>
                        <button className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
                   </div>
                </Box>
                </Box>
            <Box className="w-full md:ml-0 md:mt-5 pt-4 rounded-lg" sx={{ backgroundColor: 'background.view', }}>
                <div className='flex items-center mb-5 md:w-full'>
                        <p className='text-[14px] md:text-[16px]  pl-2 md:pl-5'>Holidays Lists</p>
                </div>
                <div className='w-[97%] ml-2 md:ml-4  rounded-sm '>
                    <Box className='flex flex-row' sx={{ backgroundColor: 'background.main',}}>
                        <div className='w-[20%] md:w-[20%] p-3 text-[12px] md:text-xs font-bold md:text-center'>
                           No
                        </div>
                        <div className='w-[20%] md:w-[20%] p-3  text-left text-[12px] md:text-xs font-bold md:text-center'>
                            Day
                        </div>
                        <div className='w-[20%] md:w-[20%] p-3  text-[12px] md:text-xs font-bold md:text-center'>
                            Date
                        </div>
                        <div className='w-[20%] md:w-[20%] p-3 b text-[12px] md:text-xs font-bold md:text-center'>
                            Holidays
                        </div>
                        <div className='w-[20%] md:w-[20%] p-3 text-[12px] md:text-xs font-bold md:text-center'>
                           Action
                        </div>                        
                    </Box>
                    {holidays?.map((user,index) =>{
                        const weekday = [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ];

                        const d = new Date(user.date);
                        let day = weekday[d.getDay()];
                        return (
                        <Box key={index} className='flex flex-row'>
                        <div className='w-[20%] md:w-[20%] p-3 text-[8px] md:text-[10px] md:text-center'>
                            {index+1}
                        </div>
                       <div className='w-[20%] md:w-[20%] p-3 text-[8px] md:text-[10px] md:text-center'>
                            {day}
                        </div>
                        <div className='w-[20%] md:w-[20%] p-3 text-[8px] md:text-[10px] md:text-center'>
                            {getDate(user.date)}
                        </div>
                        <div className='w-[20%] md:w-[20%] p-3 text-[8px] md:text-[10px] md:text-center'>
                            {user.title}
                        </div>
                        <div className='w-[20%] md:w-[20%] p-3  text-[10px] md:text-[10px] flex justify-center items-center'>
                                <IconButton onClick={() => editHoliday(user._id)}><EditOutlinedIcon style={{ fontSize: '12px' }}  className=' text-blue-500 rounded-sm'/></IconButton>
                                <IconButton onClick={() => deleteHoliday(user._id)}><DeleteOutlineOutlinedIcon style={{ fontSize: '12px' }} className='text-red-500 rounded-sm'/></IconButton>
                        </div>
                        </Box>
)})}
                </div>
                <div className='w-[95%] ml-2  md:ml-5 mt-5 flex justify-end items-center pb-2 md:mb-0'>
                    <p className='text-[8px] md:text-[12px]  '>Rows per page <span className='md:pl-5 md:pr-5 pl-2 pr-2 text-[8px] md:text-[12px]'>10</span> 1-1 of 1</p>
                </div>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card
                    sx={{
                        boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                        borderRadius: '8px',
                        maxWidth: '600px',
                        width: '100%',
                        p: 4,
                        mx: 2,
                        overflowX: 'hidden',
                        maxHeight: '85vh',
                        overflowY: 'auto',
                    }}>
                    <Typography id='modal-modal-title' variant='h5' component='h2'>
                        {holiday ? 'Edit ' : 'Add '} Holiday
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    {loaderState ? (
                        <Loading
                            message='Please wait, while your Holiday are loading...'
                            minHeight='200px'
                        />
                    ) : (
                        <Form
                            handlers={handlers}
                            onSubmit={submit}
                            action={holiday ? `/hr/holidays/${holiday}` : '/hr/holidays'}
                            method={holiday ? 'patch' : 'post'}
                            final={values => ({
                                ...values,
                                date: {
                                    year: parseInt(holidayDate.split('-')[0]),
                                    month: parseInt(holidayDate.split('-')[1]),
                                    day: parseInt(holidayDate.split('-')[2]),
                                },
                            })}
                            onError={console.log}>
                            <Typography id='modal-modal-description' sx={{ my: 2 }}>
                                Select Date
                            </Typography>
                            <TextField
                                size='small'
                                name='date'
                                placeholder='Date'
                                type='date'
                                value={holidayDate}
                                onChange={e => setHolidayDate(e.target.value)}
                                fullWidth
                            />
                            <Typography id='modal-modal-description' sx={{ my: 1 }}>
                                Enter Occasion
                            </Typography>
                            <Input name='title' size='small' placeholder='Occasion' fullWidth />
                            <Box mt={3} textAlign='right'>
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
                                            disabled={Boolean(loader)}
                                            endIcon={loader}>
                                            Add
                                        </Button>
                                    )}
                                </Submit>
                            </Box>
                        </Form>
                    )}
                </Card>
            </Modal>
        </div>
        </Box>
    );
};

export default HolidayPage;
