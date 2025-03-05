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
import attendanceImg from '../../../assets/initalScreen/attendanceView.svg'



const AttendViewPage = ({ month, year }) => {

    const [currentScreen, setCurrentScreen] = useState(1);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [attendance, setAttendance] = useState([]);
    const [ overview , setOverView ] = useState({ 
        working :0,
        leaves :0,
        absent :0 ,
        halfDays :0 ,
        lateDays :0,
        holidays :0,
     })
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

    const fetchOverView = useCallback(async () => {
        try {
            const response = await axios.get(`/hr/attendance/overview?year=${year}&month=${month}`);

            const result = response.data;

            const getCount =( name  , arrayData =[]) =>{
                let res = arrayData.find((type) => type._id == name)
                 return   res?.count || 0;
            }

            setOverView({
                working :result.working,
                leaves : result?.Leave ?? 0  ,
                absent : 0,
                halfDays :result?.["Half-Day"] ?? 0  ,
                lateDays :result?.Late ?? 0   ,
                holidays :result.holidays,
            })

        } catch (e) {
            console.log(e);
        }
    }, []);



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


    const handleChangeQuery = e => {
        const name = e.target.name;
        const value = e.target.value;
        // setDate({ ...date, [name]: value });
    };




    const { anchorEl: detailAnchorEl, openMenu: openDetail, closeMenu: closeDetail } = useMenu();



    const fetchAttendance = useCallback(
        async function () {
            try {
                if (year && month) {
                    const response = await axios.get(
                        '/hr/attendance?year=' + year + '&month=' + month
                    );
                    let attendanceData = response.data.attendance ;
                    setAttendance(attendanceData)
                }
            } catch (e) {
                console.log(e);
            }
        },
        [year, month]
    );

    useEffect(() => {
        fetchAttendance();
        fetchOverView();
    }, [fetchAttendance ,fetchOverView]);

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
            <div className='flex flex-col'>
                <div className="flex items-center justify-between md:w-full p-4">
                        <div className="p-2">
                            <h1 className="text-xs md:text-2xl text-neutral-500"> Attendance View</h1>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4">
                        <h1 className="text-xs md:text-2xl text-neutral-500"> {Months[month]} - {year}</h1>
                            {/* <button className='flex  items-center text-white font-bold text-[8px] md:text-[12px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                           
                            </button> */}
                            <InfoOutlinedIcon />
                        </div>
                    </div>
            </div>
     
            <Box className="w-full md:ml-0 pt-4 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
            <p className=" mb-4 border-l-4 border-blue-500 pl-4 text-xl" gutterBottom>
                            Days Overview This Month
            </p>
                        
                <div className='flex flex-col md:flex-row  justify-around gap-3  md:pt-4 md:w-full pb-10'>
                    <div className='flex flex-row md:flex-col justify-around md:justify-center md:items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-neutral-800 text-[16px] text-blue-700'>{overview.working}</div>
                        <p className='text-[16px] text-gray-400'> Working Days</p>
                    </div>
                    <div className='flex flex-row md:flex-col justify-around md:justify-center md:items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-green-950 text-[16px] text-green-500'>{overview.leaves}</div>
                        <p className='text-[16px] text-gray-400'> leaves </p>
                    </div>
                    {/* <div className='flex flex-row md:flex-col justify-around md:justify-center md:items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-amber-950 text-[16px] text-amber-500'>{overview.absent}</div>
                        <p className='text-[16px] text-gray-400'> Absent </p>
                    </div> */}
                    <div className='flex flex-row md:flex-col justify-around md:justify-center md:items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-teal-950 text-[16px] text-teal-500'>{overview.halfDays}</div>
                        <p className='text-[16px] text-gray-400'> Half </p>
                    </div>
                    <div className='flex flex-row md:flex-col justify-around md:justify-center md:items-center gap-2'>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-red-950 text-[16px] text-red-500'>{overview.lateDays}</div>
                        <p className='text-[16px] text-gray-400'> Late Days</p>
                    </div>
                    <div className='flex flex-row md:flex-col justify-around md:justify-center items-center gap-2 '>
                        <div className='w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-orange-950 text-[16px] text-orange-500'>{overview.holidays}</div>
                        <p className='text-[16px] text-gray-400'>Holidays</p>
                    </div>
                </div>
                
            </Box>
           {  attendance && attendance.length > 0 ?
            <Box className="w-full md:ml-0 pt-4 rounded-lg mb-4" sx={{ backgroundColor: 'background.view'}}>
            <Box>
                {/* <Box className="flex flex-col md:flex-row justify-center gap-4 mt-4 w-[97%] md:ml-4 ">
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
                </Box> */}
                <Box
                  sx={{ width :{ xs :'calc(100vw - 35px)'  , sm:'97%' }}} 
                    className=' md:ml-4 border border-zinc-500 overflow-x-auto md:overflow-x-hidden rounded-sm mt-10 h-[310px]'
                  >
                    <Grid className='flex flex-row border-b border-zinc-500  min-w-[68rem]' >
                        <div className='w-[50%] md:w-[18%] p-2 flex items-center border-r border-zinc-500 text-left text-sm md:text-[12px] font-bold'>
                            Emp ID
                        </div>
                        <div className='w-[50%] md:w-[20%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[12px] font-bold'>
                            Emp Name
                        </div>
                        <div className='w-[25%] md:w-[6.2%] flex items-center p-2 border-r border-zinc-500 text-sm md:text-[12px] font-bold'>
                        Present
                        </div>
                        <div className='w-[25%] md:w-[6.2%] flex items-center p-2 border-r border-zinc-500 text-sm md:text-[12px] font-bold'>
                        Late
                        </div>
                        <div className='w-[25%] md:w-[6.2%] flex items-center p-2 border-r border-zinc-500 text-sm md:text-[12px] font-bold'>
                        Half-Day
                        </div>
                        <div className='w-[25%] md:w-[6.2%] flex items-center p-2 border-r border-zinc-500 text-sm md:text-[12px] font-bold'>
                        Leave
                        </div>
                    {/* 
                        <div className='w-[25%] md:w-[6.2%] p-2 flex items-center border-r border-zinc-500 text-sm md:text-[12px] font-bold'>
                            Status
                        </div> */}
                        <div className='w-[25%] md:w-[6.2%] p-2 flex items-center text-left text-sm md:text-[12px] font-bold'>
                            Action
                        </div>
                    </Grid>
                    {attendance?.map((item,index) => (
                    <Grid  key={index} className='flex flex-row border-b border-zinc-500  min-w-[68rem]' >
                        <div className='w-[50%] md:w-[18%] p-2 border-r border-zinc-500 truncate flex items-center text-sm md:text-[12px] '>
                                #{item.employeeData._id}
                            </div>
                            <div className='w-[50%] md:w-[20%] p-2 border-r border-zinc-500 flex flex-row gap-4 truncate items-center text-sm md:text-[8px] '>
                                <AccountCircleOutlinedIcon style={{ fontSize: '14px'}} />
                                <p className='text-[12px]'>{item.employeeData.firstName} {item.employeeData.lastName}</p>
                            </div>
                            {/* <div className='w-[25%] md:w-[6.2%] p-2 border-r border-zinc-500 flex items-center text-sm md:text-[8px] font-bold'>
                                <div className={`px-1 py-0 w-[90%] rounded-lg  flex justify-center items-center text-[8px] ${
                                        getColor(item.lastAbsent).bgColor
                                    } ${getColor(item.lastAbsent).textColor}`}>
                                    {item.lastAbsent}
                                </div>
                            </div> */}
                            <div className='w-[25%] md:w-[6.2%] p-2 flex items-center justify-center  border-r border-zinc-500 text-left text-sm md:text-[12px]'>
                                {item.presentCount}
                            </div>
                            <div className='w-[25%] md:w-[6.2%] p-2  flex items-center justify-center border-r border-zinc-500 text-sm md:text-[12px]'>
                                {item.lateCount}
                            </div>
                            <div className='w-[25%] md:w-[6.2%] p-2 flex items-center justify-center border-r border-zinc-500 text-sm md:text-[12px]'>
                                {item.halfDayCount}
                            </div>
                            <div className='w-[25%] md:w-[6.2%] p-2 flex items-center justify-center border-r border-zinc-500  text-left text-sm md:text-[12px]'>
                                {item.leaveCount}
                            </div>
                           
                            {/* <div className='w-[25%] md:w-[6.2%] p-2 flex items-center justify-center border-r border-zinc-500 text-sm md:text-[12px]'>
                                <button className='flex  items-center text-white text-[8px] md:text-[8px] py-1 md:py-0 px-2 md:px-2 rounded bg-sky-500 hover:bg-sky-900'>
                                    {item.status}
                                </button>
                            </div> */}
                            <div className='w-[25%] md:w-[6.2%] p-2  flex items-center justify-center text-left text-sm md:text-[10px]'>
                                <IconButton><img src={view} alt="view" className="w-4 h-4"/></IconButton>
                            </div>
                        
                    </Grid>
                    ))}
                </Box>
                {/* <div className='flex items-center justify-between w-[80%] md:w-[92%] md:mx-4 pl-5 md:pl-0 pt-4 md:pt-5'>
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
                </div> */}
                </Box> 
        </Box>
        :
        <div className="flex flex-col items-center justify-center  text-center">
        <div><img src={attendanceImg} alt="No Record" className="mb-1"
        style={{maxWidth:'70%' , margin:'auto'}}
        /></div>
        <div><h1 className="text-2xl font-bold mb-2" style={{fontSize:'36px'}}> No Current attendance</h1></div>
        <div><p className='mb-[50px]'>Your compnany attendance will be seen and edited here</p></div>
     </div>
}
    </Box>
    );
};

export default AttendViewPage;
