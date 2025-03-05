import React from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Grid, IconButton, Modal, Radio, RadioGroup, TextField, Typography} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import view from '../ReceivedApp/viewicon.png';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import useErrorHandler from '../../hooks/useErrorHandler';
import { useMessage } from '../../components/Header';
import axios from 'axios';
import useLoader from '../../hooks/useLoader';
import { isEmpty } from '../../utilities/function';
import moment from 'moment';
import { Form, Submit, useForm } from '../../hooks/useForm/useForm';
import { Input } from '../../hooks/useForm/inputs';
import CircularProgress from '../../hooks/useForm/components/CircularProgress';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const SalaryPage = () => {

    const getColor = (profile) => {
        switch (profile) {
            case 'Paid':
                return { bgColor: 'bg-green-950', textColor: 'text-green-500' };
            case 'Unpaid':
                return { bgColor: 'bg-red-950', textColor: 'text-red-500' };
            
            default:
                return { bgColor: 'bg-gray-900', textColor: 'text-gray-500' };
        }
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [pageNo, setPageNo] = React.useState(1);
    const [pageLimit, setPageLimit] = React.useState(0);
    const [payrollUpdateData, setPayrollUpdateData] = React.useState({});
    const [payroll, setPayroll] = React.useState(null);
    const [selectedPayroll, setSelectedPayroll] = React.useState({});
    const { modalState, openModal, closeModal } = useModal();
    const { modalState: deleteState, openModal: openDelete, closeModal: closeDelete } = useModal();
    const { loaderState, start, end } = useLoader();
    const errorHandler = useErrorHandler();
    const { showSuccess, showError } = useMessage();
    const componentRef = React.useRef();
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    // });

    const [open, setOpen] = React.useState(false);
    const handleOpen = data => {
        setOpen(true);
        setPayrollUpdateData(data);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fetchEmployeeSalary = React.useCallback(
        async function () {
            try {
                const response = await axios.get(
                    `/hr/payslip/?sortBy=createdAt&direction=-1&page=${pageNo}`
                );
                const body = response.data;
                const { payslips } = body;
                setPayroll(payslips);
                setPageLimit(response.data.pageData.totalPages);
            } catch (e) {
                console.log(e);
            }
        },
        [setPayroll, pageNo]
    );

    const totalAllowance = React.useMemo(
        () =>
            isEmpty(selectedPayroll)
                ? 0
                : [
                      selectedPayroll.hraAllowance,
                      selectedPayroll.conveyance,
                      selectedPayroll.medicalAllowance,
                      selectedPayroll.bonusAllowance,
                  ].reduce((total, el) => {
                      return total + parseInt(el);
                  }, 0),
        [selectedPayroll]
    );

    const totalDeduction = React.useMemo(
        () =>
            isEmpty(selectedPayroll)
                ? 0
                : [
                      selectedPayroll.tds,
                      selectedPayroll.pf,
                      selectedPayroll.professionalTax,
                      selectedPayroll.loanAndOthers,
                  ].reduce((total, el) => {
                      return total + parseInt(el);
                  }, 0),
        [selectedPayroll]
    );

    async function deletePayroll(id) {
        start();
        try {
            const res = await axios.delete(`/hr/payslip/${id}`);
            const { success, message } = res.data;
            if (success) {
                showSuccess('Payroll deleted');
            } else {
                showError(message);
            }
        } catch (e) {
            errorHandler(e);
        } finally {
            closeDelete();
            end();
            fetchEmployeeSalary();
        }
    }

    React.useEffect(() => {
        fetchEmployeeSalary();
    }, [fetchEmployeeSalary]);
    //console.log(payroll)
    
    const getUtcdate = (datestr) => {
        const datetemp = new Date(datestr);
      
        // Adjust for a specific timezone (e.g., UTC+5:30)
        const timezoneOffset = 5.5 * 60; // Offset in minutes
        return new Date(datetemp.getTime() + timezoneOffset * 60 * 1000);
      
      }

    return (
        <Box sx={{backgroundColor: 'background.main',}}>
        <div className='flex flex-col'>
                <div className="flex flex-col md:flex-row  justify-between md:w-full py-4 md:px-4">
                        <div className="py-2">
                            <h1 className="text-2xl text-neutral-500">Employee Salary</h1>
                        </div>
                        <div className="flex flex-row  items-center justify-between gap-4">
                        <button className='flex items-center text-amber-500  text-xs md:text-sm py-1 md:py-1 px-2 md:px-3 rounded border border-amber-500 hover:bg-orange-700'>
                            Download Monthly Report
                        </button>
                        
                        <Link to={'/addpayroll'} className='flex gap-2 items-center'>
                        <button className='flex items-center text-white text-xs md:text-sm py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                            Add New Payroll
                            
                        </button>
                        <InfoOutlinedIcon />
                        </Link>
                            
                           
                        </div>
                    </div>
               
            <Box className="w-full  pt-4 rounded-lg mb-4  overflow-x-auto" sx={{ backgroundColor: 'background.view',  width :{ xs :'calc(100vw - 30px)'  , sm:'100%' } }}  >
            <Box className="flex  min-w-[48rem] flex-col md:flex-row justify-center gap-4 w-[97%] ml-2 md:ml-4 mb-5 ">
                <div className='flex flex-row w-full items-center'>
                <div className='w-1/2'>
                <p className='text-sm md:text-[12px] pr-2 md:pr-5'>Rows per page: 7 <FontAwesomeIcon icon={faCaretDown} className='text-zinc-500 text-lg md:text-[12px] text-center ml-2'/></p>
                    
                </div>
                <div className='w-1/2 flex flex-row  justify-center gap-5'>
                   <div className='w-full md:w-[38%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Employee Name</option>
                            <option>name1</option>
                            <option>name2</option>
                            <option>name3</option>
                        </select>
                        <ArrowDropDownIcon style={{fontSize:'28px'}} className="text-zinc-500"/>
                   </div>
                   </div>
                   </div>
                </Box>
                <div className='w-[97%]  min-w-[48rem] ml-2 md:ml-4 border border-zinc-500 rounded-sm '>
                    <div className='flex flex-row border-b border-zinc-500'>
                        <div className='w-[25%] md:w-[8%] p-3 border-r border-zinc-500 text-left text-sm md:text-sm  flex items-center font-bold'>
                            SR. No
                        </div>
                        <div className='w-[50%] md:w-[15%] p-3 border-r border-zinc-500 text-sm md:text-xsm  flex items-center font-bold'>
                            Emp Name
                        </div>
                        <div className='w-[25%] md:w-[11%] p-3 border-r border-zinc-500 text-sm md:text-sm  flex items-center font-bold'>
                            From
                        </div>
                        <div className='w-[25%] md:w-[13%] p-3 border-r border-zinc-500 text-left text-sm md:text-sm  flex items-center font-bold'>
                           To
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-sm  flex items-center font-bold'>
                            Salary Type
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-sm  flex items-center font-bold'>
                           ($) Salary
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-sm flex items-center font-bold'>
                            Status
                        </div>
                        <div className='w-[25%] md:w-[24%] p-3  text-left text-sm md:text-sm flex items-center font-bold'>
                            Action
                        </div>
                        
                    </div>
                    {payroll?.map((user,index) => (
                        <div key={index} className='flex flex-row border-b border-zinc-500'>
                        <div className='w-[25%] md:w-[8%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                            #{index+1}
                        </div>
                        <div className='w-[50%] md:w-[15%] p-1 border-r border-zinc-500 text-sm md:text-[10px] flex flex-row gap-2 flex items-center'>
                            <div className='flex justify-center items-center pl-2'>
                                <PersonIcon style={{ fontSize: '16px' }} className="text-zinc-300"/>
                            </div>
                            <div className=''>
                            {user.employee.firstName +
                                                ' ' +
                                                user.employee.lastName}
                                
                            </div>
                        </div>
                        <div className='w-[25%] md:w-[11%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                        {/* {new Date(user.from).toDateString()} */}
                        {dayjs(getUtcdate(user.from)).format("ddd MMM DD YYYY")}
                        </div>
                        <div className='w-[25%] md:w-[13%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                        {/* {new Date(user.to).toDateString()} */}
                        {dayjs(getUtcdate(user.to)).format("ddd MMM DD YYYY")}
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                             {user.salaryType}
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                             ${user.salary}
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                        {user.status}
                        </div>
                        
                            <div className='w-[25%] md:w-[24%] flex flex-row gap-1 justify-center items-center'>
                                <IconButton onClick={() => {
                                                setSelectedPayroll(user);
                                                openModal();
                                            }}><img src={view} alt="view" className="w-4 h-4"/></IconButton>
                                <IconButton onClick={() => handleOpen(user)}><EditOutlinedIcon style={{ fontSize: '12px' }}  className=' rounded-sm'/></IconButton>
                                <IconButton><SaveAltOutlinedIcon style={{ fontSize: '14px' }}  className=' rounded-sm text-blue-500'/></IconButton>
                                <IconButton><ShareOutlinedIcon style={{ fontSize: '14px' }}  className=' rounded-sm text-amber-500'/></IconButton>
                                <IconButton><PrintOutlinedIcon style={{ fontSize: '14px' }}  className=' rounded-sm text-green-500'/></IconButton>
                                <IconButton onClick={() => {
                                                setSelectedPayroll(user);
                                                openDelete();
                                            }}><CloseOutlinedIcon style={{ fontSize: '14px' }}  className=' rounded-sm text-red-500'/></IconButton>
                             </div>
                        </div>
                    ))}
                </div>
                <div className='w-[95%]  min-w-[48rem] ml-2 md:ml-5 mt-5 flex justify-between items-center pb-2 md:mb-0'>
                    <p className='text-sm md:text-[12px]  '>Showing Rows: 1-7 of 20</p>
                    <div className='flex flex-row gap-4'>
                    <KeyboardArrowLeftOutlinedIcon className='text-zinc-400'/>
                    <p className='text-zinc-400'>1</p>
                    <p className='text-zinc-400 bg-blue-500 w-[20px] h-[20px] flex items-center justify-center p-1 rounded-full'>2</p>
                </div>
                </div>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <UpdatePaySlip
                    payrollUpdateData={payrollUpdateData}
                    handleClose={handleClose}
                    fetchEmployeeSalary={fetchEmployeeSalary}
                />
            </Modal>
            <Dialog open={deleteState} onClose={closeDelete}>
                <DialogTitle id='alert-dialog-title'>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        Are you sure you want to delete the Payroll of{' '}
                        {selectedPayroll.employee?.firstName +
                            ' ' +
                            selectedPayroll.employee?.lastName || 'this Employee'}
                        ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDelete} color='primary' style={{ color: 'white' }}>
                        Cancel
                    </Button>

                    <Button
                        variant='contained'
                        onClick={() => deletePayroll(selectedPayroll._id)}
                        disabled={loaderState}
                        endIcon={
                            loaderState && (
                                <CircularProgress size='20px' sx={{ color: 'inherit' }} />
                            )
                        }
                        style={{ backgroundColor: '#ff2121' }}
                        autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        </Box>
    );
};

const UpdatePaySlip = ({ payrollUpdateData, handleClose, fetchEmployeeSalary }) => {
    const from = moment(payrollUpdateData.from).utc().format('YYYY-MM-DD');
    const to = moment(payrollUpdateData.to).utc().format('YYYY-MM-DD');
    const handlers = useForm(
        React.useMemo(
            () => ({
                from: { value: from },
                to: { value: to },
                salary: { value: payrollUpdateData.salary },
            }),
            [from, to, payrollUpdateData.salary]
        ),
        { Input: TextField }
    );
    const [selectEmployee, setSelectEmployee] = React.useState({
        status: payrollUpdateData.status,
        salaryType:payrollUpdateData.salaryType,
    });
    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setSelectEmployee({ ...selectEmployee, [name]: value });
    };
    const { showSuccess, showError } = useMessage();
    const submit = res => {
        const { success, message } = res.data;
        if (!success) return showError('payroll not added');
        showSuccess(message);
        fetchEmployeeSalary();
        handleClose();
    };
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const salaryType = [
        'Salary',
        'Training',
        'Internship',
        'Hourly'

    ];
    return (
        <Box sx={style}>
            <Form
                handlers={handlers}
                onSubmit={submit}
                action={`/hr/payslip/${payrollUpdateData._id}`}
                method='patch'
                final={values => ({
                    ...values,
                    ...selectEmployee,
                })}
                onError={console.log}>
                {/* salary */}
                <Typography variant='h6'>Update Payslip</Typography>
                <Grid container spacing={1} mt={3} display='flex' alignItems='center'>
                    <Grid item xs={12}>
                        <Typography variant='body2'>Salary Type</Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl sx={{ display: 'flex' }}>
                                        <Select
                                            name="salaryType"
                                            displayEmpty
                                            value={selectEmployee.salaryType}
                                            onChange={handleChange}
                                            input={<OutlinedInput />}
                                            // renderValue={(selected) => {
                                            //     if (selected.length === 0) {
                                            //         return "--";
                                            //     }

                                            //     return selected;
                                            // }}
                                            MenuProps={MenuProps}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            {/* <MenuItem disabled value="">
                                                <em>Placeholder</em>
                                            </MenuItem> */}
                                            {salaryType.map((stype) => (
                                                <MenuItem
                                                    key={stype}
                                                    value={stype}
                                                    // style={getStyles(stype, personstype, theme)}
                                                >
                                                    {stype}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='body2'>Salary</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Input size='small' placeholder='0' name='salary' fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='body2'>From</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Input size='small' name='from' type='date' fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='body2'>To</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Input size='small' name='to' type='date' fullWidth required />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='body2'>Status :</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ display: 'flex' }}>
                            <RadioGroup
                                row
                                aria-labelledby='demo-radio-buttons-group-label'
                                defaultValue='female'
                                name='status'
                                onChange={handleChange}
                                value={selectEmployee.status}>
                                <FormControlLabel value='paid' control={<Radio />} label='Paid' />
                                <FormControlLabel
                                    value='unPaid'
                                    control={<Radio />}
                                    label='UnPaid'
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box mt={2} textAlign='right'>
                    <Button
                        onClick={handleClose}
                        variant='contained'
                        sx={{
                            background: '#F91A3F',
                            '$:hover': {
                                background: '#F91A3F',
                            },
                        }}>
                        Cancel
                    </Button>
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
        </Box>
    );
};

export default SalaryPage;
