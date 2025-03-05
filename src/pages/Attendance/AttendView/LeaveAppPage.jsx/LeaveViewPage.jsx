import React , {useState , useEffect , useCallback} from 'react';

import {Box, IconButton} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseIcon from '@mui/icons-material/Close';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { useMessage } from '../../../../components/Header';


const LeaveViewPage = () => {
    
    const [leavedata, setLeaveData] = useState([]);
    const [leavetype, setLeavetype] = useState([]);
    const { showError, showSuccess } = useMessage();
    const [acceptLoading, setAcceptLoading] = useState(false);


    const getColor = (profile) => {
        console.log("profile",profile);
        let colorConfig={};
        switch (profile) {
            case 'Approved':
                colorConfig= { bgColor: 'bg-green-950', textColor: 'text-green-500' };
                break;
            case 'New':
                colorConfig= { bgColor: 'bg-sky-950', textColor: 'text-sky-500' };
                break;
            case 'Rejected':
                colorConfig= { bgColor: 'bg-red-950', textColor: 'text-red-500' };
                break;
            case 'Pending':
                 colorConfig= { bgColor: 'bg-orange-950', textColor: 'text-orange-400' };
                break;
            default:
                colorConfig= { bgColor: 'bg-gray-900', textColor: 'text-gray-500' };
                break;
        }
        return colorConfig;
    };

    const LeaveDetails = useCallback(async () => {
        try {
            const response = await axios.get(`/hr/attendance/leaves`);
            setLeaveData(response.data.leaves);
        } catch (e) {
            console.log(e);
        }
    }, []);

    const LeaveType = useCallback(async () => {
        try {
            const response = await axios.get('/hr/attendance/leaves-types');
            setLeavetype(response.data.leaveTypes);
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        LeaveDetails();
        LeaveType();
    }, [LeaveDetails, LeaveType]);

    const getLeaveTypeName = (leaveTypeId) => {
        const leaveType = leavetype.find(type => type._id === leaveTypeId);
        return leaveType ? leaveType.name : 'Unknown';
    };

    const calculateLeaveDays = (dates) => {
        if (dates.length < 2) {
            return 1;
        }
        const startDate = new Date(dates[0].year, dates[0].month - 1, dates[0].day);
        const endDate = new Date(dates[dates.length - 1].year, dates[dates.length - 1].month - 1, dates[dates.length - 1].day);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Add 1 to include both start and end days
        return diffDays;
    };


    const acceptLeave = useCallback(
        async function (id) {
            setAcceptLoading(true);
            try {
                const res = await axios.post(`/hr/attendance/leaves/approve/${id}`);
                LeaveDetails();
                const { success, message } = res.data;
                if (success) return showSuccess(message);
                showError(message);
            } catch (e) {
                console.log(e);
            } finally {
                setAcceptLoading(false);
            }
        },
        [LeaveDetails, showSuccess, showError]
    );

    const rejectLeave = useCallback(
        async function (id) {
            try {
                const res = await axios.post(`/hr/attendance/leaves/deny/${id}`);
                LeaveDetails();
                const { success, message } = res.data;
                if (success) return showSuccess(message);
                showError(message);
            } catch (e) {
                showError(e);
            }
        },
        [LeaveDetails, showSuccess, showError]
    );

    
   
    
    return (
        <Box sx={{backgroundColor: 'background.main'}}>
        <div className='flex flex-col'>
                <div className="flex items-center justify-between md:w-full p-4">
                        <div className="p-2">
                            <h1 className="text-2xl text-neutral-500">Leave Application</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                            <InfoOutlinedIcon />
                        </div>
                    </div>
               
            <Box className="w-full  min-w-[48rem] ml-2 md:ml-0 pt-4 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
                <div className='flex items-center mb-5 md:w-full'>
                        <p className='text-[8px] md:text-[12px]  pl-2 md:pl-5'>Show 10 <FontAwesomeIcon icon={faCaretDown} className='text-zinc-500 text-sm md:text-[12px] text-center ml-2 mr-2 text-center'/> entries</p>
                </div>
                <div className='w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-sm '>
                    <div className='flex flex-row border-b border-zinc-500'>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                            Emp ID
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Emp Name
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Leave Type
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                           From
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                           To
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Days
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                            Reason
                        </div>
                        <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Applied On
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            Status
                        </div>
                        <div className='w-[25%] md:w-[10%] p-3  text-left text-sm md:text-xs font-bold'>
                            Action
                        </div>
                        
                    </div>
                    {leavedata && leavedata.map((leave) => (
                            <div key={leave.id} className='flex flex-row border-b border-zinc-500'>
                                <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                                    #{leave?.employeeId?.slice(0, 10)}
                                </div>
                                <div className='w-[50%] md:w-[10%] p-1 border-r border-zinc-500 text-sm md:text-[10px] flex flex-row gap-2 flex items-center'>
                                    <div className='flex justify-center items-center pl-2'>
                                        <PersonIcon style={{ fontSize: '16px' }} className="text-zinc-300" />
                                    </div>
                                    <div className=''>
                                        {leave?.fullName}
                                    </div>
                                </div>
                                <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                                    {getLeaveTypeName(leave?.leaveType)}
                                </div>
                                <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                                    {leave?.dates[0]?.year}-{leave?.dates[0]?.month}-{leave?.dates[0]?.day}
                                </div>
                                <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                                    {leave?.dates.length > 1 ? `${leave?.dates[leave.dates.length - 1].year}-${leave?.dates[leave.dates.length - 1].month}-${leave?.dates[leave.dates.length - 1].day}` : '-'}
                                </div>
                                <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                                    {calculateLeaveDays(leave?.dates)}
                                </div>
                                <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]'>
                                    {leave?.reason}
                                </div>
                                <div className='w-[50%] md:w-[10%] p-3 border-r border-zinc-500 text-sm md:text-[10px]'>
                                    {new Date(leave?.createdAt).toLocaleDateString()}
                                </div>
                                <div className='w-[25%] md:w-[10%] p-3 border-r border-zinc-500'>
                                    <div className={`px-0 py-0 rounded-lg text-sm md:text-[8px] flex justify-center items-center ${getColor(leave?.status).bgColor} ${getColor(leave?.status).textColor}`}>
                                        {leave?.status}
                                    </div>
                                </div>
                                <div className='w-[25%] md:w-[10%] flex flex-row  justify-center items-center'>
                                    {leave?.status!=="Approved" && <IconButton color="success" style={{borderRadius:"5px",padding:"4px",margin:"2px"}}  onClick={() => acceptLeave(leave?._id)}><CheckOutlinedIcon style={{ fontSize: '15px' }}  /></IconButton>}
                                    {leave?.status==="Pending" && <IconButton  color="error" style={{borderRadius:"5px",padding:"4px",margin:"2px"}}   onClick={() => rejectLeave(leave?._id)}><CloseOutlinedIcon style={{ fontSize: '15px' }} /></IconButton>}
                                    <IconButton style={{borderRadius:"5px",padding:"4px",margin:"2px"}} ><EditOutlinedIcon style={{ fontSize: '15px' }}  /></IconButton>
                                       <IconButton color="primary" style={{borderRadius:"5px",padding:"4px",margin:"2px"}} ><DeleteOutlineOutlinedIcon style={{ fontSize: '15px' }}  /></IconButton>

                                </div>
                            </div>
                        ))}


        

                </div>














                
                <div className='w-[95%] ml-2  md:ml-5 mt-5 flex justify-between items-center pb-2 mb-20 md:mb-0'>
                    <p className='text-sm md:text-[12px]  '>Showing Rows: 1-10 of 20</p>
                    <div className='flex flex-row gap-4'>
                    <KeyboardArrowLeftOutlinedIcon className='text-zinc-400'/>
                    <p className='text-zinc-400'>1</p>
                    <p className='text-zinc-400 bg-blue-500 w-[20px] h-[20px] flex items-center justify-center p-1 rounded-full'>2</p>
                </div>
                </div>
            </Box>
        </div>
        </Box>
    );
};

export default LeaveViewPage;
