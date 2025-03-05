

import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton , Button , Typography ,Avatar } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import view from "../ReceivedApp/viewicon.png";

import SearchIcon from '@mui/icons-material/Search';



const ProjectMilestone = () => {
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

  const userData = [
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Holiday",
      clockIn: "-- -- --",
      clockOut: "-- -- --",
      progress: "Present & Late",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Late",
      clockIn: "09:50 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Holiday",
      clockIn: "-- -- --",
      clockOut: "-- -- --",
      progress: "Present & Late",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Late",
      clockIn: "09:50 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Holiday",
      clockIn: "-- -- --",
      clockOut: "-- -- --",
      progress: "Present & Late",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Late",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Holiday",
      clockIn: "-- -- --",
      clockOut: "-- -- --",
      progress: "Present & Late",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Late",
      clockIn: "09:09 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
  ];

  const getColor = (status) => {
    switch (status) {
      case "Present":
        return { bgColor: "bg-green-950", textColor: "text-green-500" };
      case "Holiday":
        return { bgColor: "bg-sky-950", textColor: "text-sky-500" };
      case "Late":
        return { bgColor: "bg-red-950", textColor: "text-red-500" };
      default:
        return { bgColor: "bg-gray-900", textColor: "text-gray-500" };
    }
  };

  const getProgressBarStyle = (status) => {
    switch (status) {
      case "Present":
        return { width: "100%", backgroundColor: "#34D399" };
      case "Holiday":
        return { width: "100%", backgroundColor: "#6B7280" };
      case "Late":
        return { width: "75%", backgroundColor: "#34D399" };
      case "Present & Late":
        return { width: "75%", backgroundColor: "#34D399" };
      default:
        return { width: "100%", backgroundColor: "#6B7280" };
    }
  };

  const avatarData = [
    {
      alt: "Remy Sharp",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
    },
    {
      alt: "Remy Sharp",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
    },
    {
      alt: "Remy Sharp",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
    },
    {
      alt: "Remy Sharp",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
    },
    {
      alt: "Remy Sharp",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
    },
    {
      alt: "Remy Sharp",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
    },
  ];

  const Months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  const [date, setDate] = useState({
    employeeId: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const Years = Array(41)
    .fill(1)
    .map((el, i) => i + 2009);

  const [tab, setTab] = useState("task");
  const [text, setText] = useState('');


  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
];

const handleChange = value => {
    setText(value);
};


  console.log(tab);

  return (
 


    <Box
    className="w-[96%]  mr-[20px] md:ml-0  rounded-lg "
    sx={{ backgroundColor: "background.view", marginLeft: "22px" }}
  >
    <Box className="flex flex-col md:flex-row justify-between gap-4 mt-4 w-[97%] ml-2 md:ml-4 ">
      <div className="w-full md:w-[21%] flex justify-start items-center"></div>
    </Box>

    <Box className="flex flex-col md:flex-row justify-between gap-4 mt-4 w-[97%] ml-2 md:ml-4 ">
      <div className="w-full md:w-[21%] flex justify-start items-center">
        <p className="text-[12px] ml-3">Shows</p>
        <select className="appearance-none bg-transparent pl-1 rounded leading-tight focus:outline-none focus:border-gray-500 text-[12px]">
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
        </select>
        <ArrowDropDownIcon fontSize="medium" className="text-zinc-500" />
        <p className="text-[12px]">entries</p>
      </div>

      <div className="flex row">
      <div className="  md:justify-center ">
        <button className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add MileStones
          </button>
        </div>
        <div className=" border border-gray-500 rounded-lg flex flex-row items-center  ml-[30px]">
          <input
            placeholder="Search"
            className="appearance-none bg-transparent w-[75%] text-white-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[15px] focus:border-gray-500"
          />
          <SearchIcon
            style={{ fontSize: "18px" , margin:"9px" }}
            className="text-zinc-500"
          />
        </div>

        
      </div>

      {/* <div className="w-full md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center">
     
        <input
          placeholder="Search"
          className="appearance-none bg-transparent w-[75%] text-white-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[15px] focus:border-gray-500"
        />

        <ArrowDropDownIcon
          style={{ fontSize: "28px" }}
          className="text-zinc-500"
        />
      </div> */}
    </Box>

    <Box
      className="w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-sm mt-10 h-[380px]"
      sx={{
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      }}
    >
      <Grid className="flex flex-row border-b border-zinc-500">
        <div className="w-25 md:w-1/4 p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold">
          ID
        </div>
        <div className="w-25 md:w-1/4 p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold">
          Project Title
        </div>
        <div className="w-25 md:w-1/4 p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold">
          Client
        </div>
        <div className="w-25 md:w-1/4 p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold">
          Team
        </div>
      </Grid>
      {userData.map((user, index) => (
        <Grid
          key={index}
          className="flex flex-row border-b border-zinc-500"
          currentScreen={currentScreen}
        >
          <div className="w-25 md:w-1/4 p-2 border-r border-zinc-500 text-left text-sm md:text-xs flex items-center">
            {user.Id}
          </div>
          <div className="w-25 md:w-1/4 p-2 border-r border-zinc-500 text-left text-sm md:text-xs flex items-center">
            {user.Project}
          </div>
          <div className="w-25 md:w-1/4 p-2 border-r border-zinc-500 text-left text-sm md:text-xs flex items-center">
            {user.Client}
          </div>
          <div className="w-25 md:w-1/4 p-2 border-r border-zinc-500 text-left text-sm md:text-xs flex items-center">
            {user.Team}
          </div>
        </Grid>
      ))}
    </Box>

    <div className="flex items-center justify-between w-[80%] md:w-[92%] md:mx-4 pl-5 md:pl-0 pt-4 md:pt-10">
      <div className="p-2 rounded-lg ">
        <div className="flex items-center gap-0 md:gap-6">
          <p className="text-[12px] text-gray-400">
            Show Rows: 1-10 of 20
          </p>
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
    

    



  );
};

export default ProjectMilestone;
