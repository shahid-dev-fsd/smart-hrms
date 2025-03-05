
import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton , Button , Typography ,Avatar ,     useTheme as useMuiTheme,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import view from "../ReceivedApp/viewicon.png";
import AttendViewPage from "../Attendance/AttendView/AttendViewPage";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import ReactQuill from 'react-quill';
import { useTheme } from '../../style/theme';


const ProjectNote = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const { toggleTheme, mode } = useTheme();
  const theme = useMuiTheme();

 console.log(mode)

  const handlePrevScreen = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1);
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
    className="md:w-[96%] md:mr-[20px] md:ml-0 rounded-lg w-full"
    sx={{
      backgroundColor: "background.view",
      marginLeft: { xs: 0, md: "22px" },
      marginRight: { xs: 0, md: "20px" },
    }}
  >
    <Box
      sx={{
        backgroundColor: "background.view",
        marginLeft: { xs: 0, md: "22px" },
        marginRight: { xs: 0, md: "20px" },
      }}
    >
      <div style={{ marginTop: "30px", marginBottom: "14px" }}>
        <Typography variant="subtitle1" component="p" marginLeft={2} mb={2} mt={5} padding={1}>
          Select Departments
        </Typography>
        <input
         className={`border border-gray-500 h-[70px] p-[20px] w-full md:w-[96%] md:mr-[20px] md:ml-[20px] rounded-lg ${mode === 'dark' ? 'bg-[#141414]' : ''}`}
          placeholder="Enter Title"
          
        />
      </div>
      <Typography variant="subtitle1" component="p" marginLeft={2} padding={1}>
        Note
      </Typography>
      <div>
        <ReactQuill
          value={text}
          modules={modules}
          formats={formats}
          onChange={handleChange}
          className="richtextWrap h-[200px] p-[20px] w-full rounded-lg"
          placeholder="Enter Title"
        />
      </div>
      <div className="flex flex-row items-center justify-end gap-4 md:mr-[20px] mt-[50px] mb-[20px]">
        <button className="flex items-center text-white font-bold text-[8px] mb-[20px] md:text-[17px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700">
          Submit
        </button>
      </div>
    </Box>
  </Box>
  )
}

export default ProjectNote