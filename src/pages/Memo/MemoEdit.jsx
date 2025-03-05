import React , {useState , useCallback , useEffect , useMemo} from 'react'
import {  Grid } from '@mui/material';
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
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function MemoEdit() {
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
    <Box sx={{ backgroundColor: 'background.main', }} className="h-full overflow-hidden ">
    <div className="h-full" style={{ overflowY: 'auto', paddingRight: '1px' }}>
        <Grid container justifyContent='center' height='100%'>
            <Grid item xs={11}>
            <Box sx={{backgroundColor: 'background.main',}}>
        <div className='flex flex-col justify-start'>
                <div className="flex items-center justify-between md:w-full p-4">
                        <div className="p-2">
                            <h1 className="text-2xl text-neutral-500">Edit Create/Memo</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <button onClick={() => {
                                    setHoliday(null);
                                    handleOpen();
                                }} className='flex items-center text-white font-bold text-xs md:text-base py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                                Add Details
                            </button>
                            <InfoOutlinedIcon />
                        </div>
                    </div>
                
                <Box className="w-full md:ml-0 md:mt-5 pt-4 rounded-lg flex justify-between " >
                <Box className='flex justify-between md:w-[100%] align-center ' >
                <Box className='flex items-center mb-5 md:w-[80%] mt-[15px]   h-[60px]  border border-zinc-800 rounded-sm' sx={{ backgroundColor: 'background.view', borderRadius:'10px' }} >
                        <p className='text-[14px] md:text-[16px]  pl-2 md:pl-5'>Human Resources (Hr) rules and regulations </p>
                </Box>
                <Box className='flex items-center mb-5 md:w-[20%] mt-[15px]  h-[60px]  border border-zinc-800 rounded-sm mx-2' sx={{ backgroundColor: 'background.view', borderRadius:'10px' }}>
                        <p className='text-[14px] md:text-[14px] color-blue pl-2 md:pl-5'>Show Details <span><ExpandMoreIcon/></span></p>
                </Box>
                </Box>
                <div>
                <div className='ml-[8px] mt-[25px] flex flex-row gap-2 justify-center items-center'>
                                <IconButton><EditOutlinedIcon style={{ fontSize: '12px' , color:"blue" }}  className=' rounded-sm'/></IconButton>
                                <IconButton><ContentCopyIcon style={{ fontSize: '12px' , color:"blue" }}  className=' rounded-sm'/></IconButton>

                                <IconButton><DeleteOutlineOutlinedIcon style={{ fontSize: '12px' , color:'red' }} className='text-blue-500 rounded-sm'/></IconButton>
                            </div>
                </div>
             
             
               
            </Box>
            <Box className="w-full md:ml-0  pt-4 rounded-lg flex justify-between " >
                <Box className='flex justify-between md:w-[100%] align-center ' >
                <Box className='flex items-center mb-5 md:w-[80%] mt-[15px]   h-[60px]  border border-zinc-800 rounded-sm' sx={{ backgroundColor: 'background.view', borderRadius:'10px' }} >
                        <p className='text-[14px] md:text-[16px]  pl-2 md:pl-5'>Human Resources (Hr) rules and regulations </p>
                </Box>
                <Box className='flex items-center mb-5 md:w-[20%] mt-[15px]  h-[60px]  border border-zinc-800 rounded-sm mx-2' sx={{ backgroundColor: 'background.view', borderRadius:'10px' }}>
                        <p className='text-[14px] md:text-[14px] color-blue pl-2 md:pl-5'>Show Details <span><ExpandMoreIcon/></span></p>
                </Box>
                </Box>
                <div>
                <div className='ml-[8px] mt-[25px] flex flex-row gap-2 justify-center items-center'>
                                <IconButton><EditOutlinedIcon style={{ fontSize: '12px' , color:"blue" }}  className=' rounded-sm'/></IconButton>
                                <IconButton><ContentCopyIcon style={{ fontSize: '12px' , color:"blue" }}  className=' rounded-sm'/></IconButton>

                                <IconButton><DeleteOutlineOutlinedIcon style={{ fontSize: '12px' , color:'red' }} className='text-blue-500 rounded-sm'/></IconButton>
                            </div>
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
  )
}

export default MemoEdit