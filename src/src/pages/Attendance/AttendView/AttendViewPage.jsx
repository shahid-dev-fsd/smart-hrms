import React, {useCallback, useEffect, useState} from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import view from '../../ReceivedApp/viewicon.png';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useMenu } from '../../../hooks/useMenu';
import axios from 'axios';



const AttendViewPage = ({ month, year }) => {

    const [currentScreen, setCurrentScreen] = useState(1);

    const handlePrevScreen = () => {
        if (currentScreen > 1) {
            setCurrentScreen(currentScreen - 1);
        }
    };

    const handleNextScreen = () => {
        
        if (currentScreen < 2) {
            setCurrentScreen(currentScreen + 1);
        }
    };
    const [date, setDate] = useState({
        employeeId: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });

    const handleChangeQuery = e => {
        const name = e.target.name;
        const value = e.target.value;
        setDate({ ...date, [name]: value });
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [attendance, setAttendance] = useState(null);


    const { anchorEl: detailAnchorEl, openMenu: openDetail, closeMenu: closeDetail } = useMenu();



    const fetchAttendance = useCallback(
        async function () {
            try {
                if (year && month) {
                    const response = await axios.get(
                        '/hr/attendance?year=' + year + '&month=' + month
                    );
                    setAttendance(response.data.attendance);
                }
            } catch (e) {
                console.log(e);
            }
        },
        [year, month]
    );

    useEffect(() => {
        fetchAttendance();
    }, [fetchAttendance]);
    console.log(attendance)

    const getColor = (lastAbsent) => {
        switch (lastAbsent) {
            case 'Never':
                return { bgColor: 'bg-blue-950', textColor: 'text-blue-500' };
           default:
                return { bgColor: 'bg-red-950', textColor: 'text-red-500' };
        }
    };
   
    return (
        <Box sx={{backgroundColor: 'background.main',}}>
     
            <Box className="w-full ml-2 md:ml-0 pt-4 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
                        
                <div className='flex flex-col md:flex-row items-center justify-start ml-10 gap-14 md:pt-4 md:w-full pb-10'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-neutral-800 text-[16px] text-blue-700'>31</div>
                        <p className='text-[16px] text-gray-400'>Total Working Days</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-green-950 text-[16px] text-green-500'>20</div>
                        <p className='text-[16px] text-gray-400'>Present Days</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-amber-950 text-[16px] text-amber-500'>3</div>
                        <p className='text-[16px] text-gray-400'>Absent Days</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-teal-950 text-[16px] text-teal-500'>0</div>
                        <p className='text-[16px] text-gray-400'>Half Days</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-red-950 text-[16px] text-red-500'>5</div>
                        <p className='text-[16px] text-gray-400'>Late Days</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 '>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-orange-950 text-[16px] text-orange-500'>6</div>
                        <p className='text-[16px] text-gray-400'>Holidays</p>
                    </div>
                </div>
                
            </Box>
            <Box className="w-full ml-2 md:ml-0 pt-4 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
                <Box className="flex flex-col md:flex-row justify-center gap-4 mt-4 w-[97%] ml-2 md:ml-4 ">
                   <div className='w-full md:w-[21%] flex justify-start items-center'>
                    <p className='text-[12px] ml-3'>Show</p>
                        <select className="appearance-none bg-transparent pl-1 rounded leading-tight focus:outline-none focus:border-gray-500 text-[12px]">
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            <option>40</option>
                        </select>
                        <ArrowDropDownIcon fontSize='medium' className="text-zinc-500"/>
                        <p className='text-[12px]'>entries</p>
                   </div>
                   <div className='w-full md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[95%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Employee Name</option>
                            <option>John Doe</option>
                            <option>Jane Smith</option>
                            <option>Michael Johnson</option>
                        </select>
                        <ArrowDropDownIcon style={{fontSize:'28px'}} className="text-zinc-500"/>
                   </div>
                   <div className='w-full md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Select Date</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                        <CalendarTodayOutlinedIcon style={{fontSize:'24px'}} className="text-zinc-500 pr-2"/>
                   </div>
                   <div className='w-full md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                        </select>
                        <ArrowDropDownIcon style={{fontSize:'28px'}} className="text-zinc-500"/>
                   </div>
                   <div className='w-full md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center'>
                     <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                            <option>Year</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                        </select>
                        <ArrowDropDownIcon style={{fontSize:'28px'}} className="text-zinc-500"/>
                   </div>
                   
                   <div className='w-full md:w-[11%] flex justify-end md:justify-center items-center '>
                        <button className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
                   </div>
                </Box>
                <Box
                    className='w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-sm mt-10 h-[310px]'
                    sx={{
                        overflowY: 'scroll',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        '-ms-overflow-style': 'none',
                        'scrollbar-width': 'none'
                    }}
                >
                    <Grid
                        className='flex flex-row border-b border-zinc-500'
                        
                    >
                        <div className='w-[25%] md:w-[6.2%] p-2 flex items-center border-r border-zinc-500 text-left text-sm md:text-[12px] font-bold'>
                            Emp ID
                        </div>
                        <div className='w-[50%] md:w-[18.6%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[12px] font-bold'>
                            Emp Name
                        </div>
                        <div className='w-[25%] md:w-[6.2%] flex items-center p-2 border-r border-zinc-500 text-sm md:text-[12px] font-bold'>
                            Last Absent
                        </div>
                        <div className='w-[25%] md:w-[49.6%] border-r border-zinc-500 text-left text-sm md:text-[10px] font-bold flex flex-col'>
                           <div className='flex justify-center items-center w-full text-sm md:text-[10px] font-bold  border-b border-zinc-500 '>
                                <p className='text-sm md:text-[12px] text-center p-4'>Leaves</p>
                           </div>
                           <div className='flex flex-row w-full'>
                            <div className='w-[25%] md:w-[12.5%] p-2 flex items-center border-r border-zinc-500 text-left text-sm md:text-[10px] font-bold'>
                                Half Day
                                </div>
                            <div className='w-[50%] md:w-[12.5%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[10px] font-bold'>
                                Sick
                            </div>
                            <div className='w-[25%] md:w-[12.5%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[10px] font-bold'>
                                Casual
                            </div>
                            <div className='w-[25%] md:w-[12.5%] p-2 flex items-center border-r border-zinc-500 text-left text-sm md:text-[10px] font-bold'>
                                Maternity
                            </div>
                            <div className='w-[50%] md:w-[12.5%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[10px] font-bold'>
                                Paternity
                            </div>
                            <div className='w-[25%] md:w-[12.5%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[10px] font-bold'>
                                Annual
                            </div>
                            <div className='w-[25%] md:w-[12.5%] p-2 flex items-center border-r border-zinc-500  text-left text-sm md:text-[10px] font-bold'>
                                Unpaid
                            </div>
                            <div className='w-[25%] md:w-[12.5%] p-2 flex items-center  text-left text-sm md:text-[10px] font-bold'>
                                Other
                            </div>
                           </div>
                        </div>
                        <div className='w-[50%] md:w-[6.2%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[12px] font-bold'>
                            Credit Leaves
                        </div>
                        <div className='w-[25%] md:w-[6.2%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[12px] font-bold'>
                            Status
                        </div>
                        <div className='w-[25%] md:w-[6.2%] p-2 flex items-center text-left text-sm md:text-[12px] font-bold'>
                            Action
                        </div>
                    </Grid>
                    {attendance?.map((item,index) => (
                    <Grid
                    key={index}
                        className='flex flex-row border-b border-zinc-500'
                    >
                        <div className='w-[25%] md:w-[6.2%] p-2 border-r border-zinc-500 flex items-center text-sm md:text-[12px] '>
                                #{item._id}
                            </div>
                            <div className='w-[50%] md:w-[18.6%] p-2 border-r border-zinc-500 flex flex-row gap-4 items-center text-sm md:text-[8px] '>
                                <AccountCircleOutlinedIcon style={{ fontSize: '14px'}} />
                                <p className='text-[12px]'>{item.empName}</p>
                            </div>
                            <div className='w-[25%] md:w-[6.2%] p-2 border-r border-zinc-500 flex items-center text-sm md:text-[8px] font-bold'>
                                <div className={`px-1 py-0 w-[90%] rounded-lg  flex justify-center items-center text-[8px] ${
                                        getColor(item.lastAbsent).bgColor
                                    } ${getColor(item.lastAbsent).textColor}`}>
                                    {item.lastAbsent}
                                </div>
                            </div>
                            <div className='w-[25%] md:w-[6.2%] p-2 flex items-center border-r border-zinc-500 text-left text-sm md:text-[12px]'>
                                {item.leaves[0]}
                            </div>
                            <div className='w-[50%] md:w-[6.2%] p-2  flex items-center border-r border-zinc-500 text-sm md:text-[12px]'>
                                {item.leaves[1]}
                            </div>
                            <div className='w-[25%] md:w-[6.2%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[12px]'>
                                {item.leaves[2]}
                            </div>
                            <div className='w-[25%] md:w-[6.2%] p-2 flex items-center border-r border-zinc-500  text-left text-sm md:text-[12px]'>
                                {item.leaves[3]}
                            </div>
                            <div className='w-[25%] md:w-[6.2%] p-2 flex items-center border-r border-zinc-500 text-left text-sm md:text-[12px]'>
                                {item.leaves[4]}
                            </div>
                            <div className='w-[50%] md:w-[6.2%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[12px]'>
                                {item.leaves[5]}
                            </div>
                            <div className='w-[25%] md:w-[6.2%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[12px]'>
                                {item.leaves[6]}
                            </div>
                            <div className='w-[25%] md:w-[6.2%] p-2 flex items-center border-r border-zinc-500 text-left text-sm md:text-[12px]'>
                                {item.leaves[7]}
                            </div>
                            <div className='w-[50%] md:w-[6.2%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[12px]'>
                                {item.leaves[8]}
                            </div>
                            <div className='w-[25%] md:w-[6.2%] p-2 flex items-center justify-center border-r border-zinc-500 text-sm md:text-[12px]'>
                                <button className='flex  items-center text-white text-[8px] md:text-[8px] py-1 md:py-0 px-2 md:px-2 rounded bg-sky-500 hover:bg-sky-900'>
                                    {item.status}
                                </button>
                            </div>
                            <div className='w-[25%] md:w-[6.2%] p-2  flex items-center justify-center text-left text-sm md:text-[10px]'>
                                <IconButton><img src={view} alt="view" className="w-4 h-4"/></IconButton>
                            </div>
                        
                    </Grid>
                    ))}
                </Box>
                <div className='flex items-center justify-between w-[80%] md:w-[92%] md:mx-4 pl-5 md:pl-0 pt-4 md:pt-5'>
                <div className="p-2 rounded-lg ">
                    <div className="flex items-center gap-0 md:gap-6">
                        <p className='text-[12px] text-gray-400'>Show Rows: 1-10 of 20</p>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <KeyboardArrowLeftOutlinedIcon
                        className="text-zinc-400 cursor-pointer"
                        onClick={handlePrevScreen}
                    />
                    <p className="text-zinc-400">1</p>
                    {currentScreen === 1 ? (
                        <KeyboardArrowRightOutlinedIcon
                            className="text-zinc-300 cursor-pointer"
                            onClick={handleNextScreen}
                        />
                    ) : (
                        <div className="bg-blue-500 w-[20px] h-[20px] flex items-center justify-center p-1 rounded-full">
                            2
                        </div>
                    )}
                </div>
            </div>
        </Box>
    </Box>
    );
};

export default AttendViewPage;
