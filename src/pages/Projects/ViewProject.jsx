import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import view from "../ReceivedApp/viewicon.png";
import AttendViewPage from "../Attendance/AttendView/AttendViewPage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "../../../src/style/theme";
import ProjectNote from "./ProjectNote";
import ReactQuill from "react-quill";
import eyeicon from "../../assets/Icons/eye1.png";
import dowicon from "../../assets/Icons/dow.png";
import delicon from "../../assets/Icons/del.png";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Progressbar from "./Progressbar";
import comm from "../../assets/Icons/comm.png";
import { useLocation } from "react-router-dom";
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';

const ViewProject = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [text, setText] = useState("");
  const [messageTab, setMessageTab] = useState(false);
  const [messageTab1, setMessageTab1] = useState(false);
  const { toggleTheme, mode } = useTheme();
  console.log(mode);

  const showMessageTab = () => {
    setMessageTab(!messageTab);
  };
  const showMessageTab1 = () => {
    setMessageTab1(!messageTab1);
  };
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleChange = (value) => {
    setText(value);
  };

  const userData = [
    {
      Id: "1",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
      downloadicon: <SaveAltRoundedIcon />,
      deleteicon: <DeleteOutlineIcon />,
      uploadedby: "Joshua Kent",
      invoiceId: "INV-2910",
      amount: "$910",
      paymentstatus: "Unpaid",
      completeincompletestatus: "Complete",
      milestonetitle: "Update Ui Design",
      progressValue: 70,
      task: "App Update",
      client: "Jackson Drey",
    },
    {
      Id: "2",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
      downloadicon: <SaveAltRoundedIcon />,
      deleteicon: <DeleteOutlineIcon />,
      uploadedby: "Roberto Alex",
      invoiceId: "INV-2910",
      amount: "$910",
      paymentstatus: "Paid",
      completeincompletestatus: "Incomplete",
      milestonetitle: "Fix Bugs",
      progressValue: 80,
      task: "Website Load",
      client: "Andrew Dash",
    },
    {
      Id: "3",
      date: "2024-04-18",
      Project: "Monday",
      status: "Holiday",
      clockIn: "-- -- --",
      clockOut: "-- -- --",
      progress: "Present & Late",
      action: <img src={view} alt="view" className="w-4 h-4" />,
      downloadicon: <SaveAltRoundedIcon />,
      deleteicon: <DeleteOutlineIcon />,
      uploadedby: "Raymond Dane",
      invoiceId: "INV-2910",
      amount: "$910",
      paymentstatus: "Paid",
      completeincompletestatus: "Complete",
      milestonetitle: "Add Rating Plugins",
      progressValue: 60,
      task: "Cargo Services ",
      client: "Raymon Dane",
    },
    {
      Id: "4",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
      downloadicon: <SaveAltRoundedIcon />,
      deleteicon: <DeleteOutlineIcon />,
      uploadedby: "Joshua Kent",
      invoiceId: "INV-2910",
      amount: "$910",
      paymentstatus: "Paid",
      completeincompletestatus: "Complete",
      milestonetitle: "Add Responsive Layouts",
      progressValue: 55,
      task: "Cables",
      client: "Peter Rush",
    },
    {
      Id: "5",
      date: "2024-04-18",
      Project: "Monday",
      status: "Late",
      clockIn: "09:50 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
      downloadicon: <SaveAltRoundedIcon />,
      deleteicon: <DeleteOutlineIcon />,
      uploadedby: "Roberto Alex",
      invoiceId: "INV-2910",
      amount: "$910",
      paymentstatus: "Unpaid",
      completeincompletestatus: "Incomplete",
      milestonetitle: "Import Icon Pack",
      progressValue: 64,
      task: "SSD Drive",
      client: "Able Drew",
    },
    {
      Id: "6",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
      downloadicon: <SaveAltRoundedIcon />,
      deleteicon: <DeleteOutlineIcon />,
      uploadedby: "Joshua Kent",
      invoiceId: "INV-2910",
      amount: "$910",
      paymentstatus: "Paid",
      completeincompletestatus: "Complete",
      milestonetitle: "Upload Web Ui",
      progressValue: 90,
      task: "Mouse Pads",
      client: "Solomon Dust",
    },
    {
      Id: "7",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
      downloadicon: <SaveAltRoundedIcon />,
      deleteicon: <DeleteOutlineIcon />,
      uploadedby: "Joshua Kent",
      invoiceId: "INV-2910",
      amount: "$910",
      paymentstatus: "Paid",
      completeincompletestatus: "Complete",
      milestonetitle: "Update Ui Design",
      progressValue: 100,
      task: "App Update",
      client: "Jackson Drey",
    },
    {
      Id: "8",
      date: "2024-04-18",
      Project: "Monday",
      status: "Holiday",
      clockIn: "-- -- --",
      clockOut: "-- -- --",
      progress: "Present & Late",
      action: <img src={view} alt="view" className="w-4 h-4" />,
      downloadicon: <SaveAltRoundedIcon />,
      deleteicon: <DeleteOutlineIcon />,
      uploadedby: "Joshua Kent",
      invoiceId: "INV-2910",
      amount: "$910",
      paymentstatus: "Paid",
      completeincompletestatus: "Complete",
      milestonetitle: "Update Ui Design",
      progressValue: 70,
      task: "App Update",
      client: "Jackson Drey",
    },
    {
      Id: "9",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
      downloadicon: <SaveAltRoundedIcon />,
      deleteicon: <DeleteOutlineIcon />,
      uploadedby: "Joshua Kent",
      invoiceId: "INV-2910",
      amount: "$910",
      paymentstatus: "Paid",
      completeincompletestatus: "Complete",
      milestonetitle: "Update Ui Design",
      progressValue: 64,
      task: "Mouse Pads",
      client: "Solomon Dust",
    },
    {
      Id: "10",
      date: "2024-04-18",
      Project: "Monday",
      status: "Late",
      clockIn: "09:50 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
      downloadicon: <SaveAltRoundedIcon />,
      deleteicon: <DeleteOutlineIcon />,
      uploadedby: "Joshua Kent",
      invoiceId: "INV-2910",
      amount: "$910",
      paymentstatus: "Unpaid",
      completeincompletestatus: "Complete",
      progressValue: 84,
      task: "Mouse Pads",
      client: "Solomon Dust",
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
      uploadedby: "Joshua Kent",
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
  const getpaymentColor = (paymentstatus) => {
    switch (paymentstatus) {
      case "Paid":
        return { bgColor: "bg-green-950", textColor: "text-green-500" };
      case "Unpaid":
        return { bgColor: "bg-[#B8242433]", textColor: "text-[#FF0000]" };

      default:
        return { bgColor: "bg-gray-900", textColor: "#34D399" };
    }
  };
  const getcompleteincompleteColor = (completeincompletestatus) => {
    switch (completeincompletestatus) {
      case "Complete":
        return { bgColor: "bg-green-950", textColor: "text-green-500" };
      case "Incomplete":
        return { bgColor: "bg-[#B8242433]", textColor: "text-[#FF0000]" };

      default:
        return { bgColor: "bg-gray-900", textColor: "#34D399" };
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

  const [tab, setTab] = useState("overview");
  const [paddingBottomContainer, setPaddingBottomContainer] = useState(132);


  const location = useLocation();
  const userDataVal = location.state?.user; // accessing user data passed via navigate

  console.log("userData", userDataVal?.description
  );

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (newTab === "note") {
      setPaddingBottomContainer(20);
    } else if (newTab === "task") {
      setPaddingBottomContainer(132);
    } else if (newTab === "Comments") {
      setPaddingBottomContainer(18);
    } else {
      setPaddingBottomContainer(110);
    }
  };

  console.log(tab);
  return (
    <Box
      sx={{
        backgroundColor: "background.main",
        borderRadius: "15px",
        marginX: "10px",
        padding: "0",
        paddingBottom: `${paddingBottomContainer}px !important`,
      }}
    >
      <div className="flex flex-col rounded-t-[15px]">
        <div className="p-2 md:py-2 md:px-6">
          <div className="flex items-center justify-between md:w-full py-8 md:p-4">
            <div className="">
              <h1 className=" text-neutral-500 text-[18px] leading-[26.04px] md:text-[25px] font-[500] md:leading-[39.06px]">
                Project#18 <p className="md:inline hidden ">App Developement</p>
              </h1>
            </div>
            <div className="flex flex-row items-center justify-center gap-3">
              <button className="text-[13px] font-[500] leading-[32.5px] bg-[#3767B1] rounded-[5px] py-[5px] px-[15px]">
                Create New <p className="md:inline hidden ">Project</p>
              </button>
              <div className="bg-[#0D0D0D] p-[8px] rounded-[5px]">
                {" "}
                <InfoOutlinedIcon sx={{ color: "#ffffff" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex  flex-col mb-[-31px] ml-[-5px] md:ml-8">
        <div
          className="flex md:gap-[20px] items-center flex-nowrap  p-4"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
        >
          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
           {tab === "overview" ? (
            <div
              className="p-2  md:px-6 md:ml-2 bg-[#3767B1] text-white rounded-t-[10px]"
              onClick={() => handleTabChange("overview")}
            >
              <h1 className="text-[10px]  font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px]  text-center">
                Overview
              </h1>
            </div>
          ) : (
            <div className="p-2 " onClick={() => handleTabChange("overview")}>
              <h1 className="text-[10px] font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px]  text-center">
              Overview
              </h1>
            </div>
          )}
         
          {tab === "task" ? (
            <div
              className="p-2  md:px-6 md:ml-2 bg-[#3767B1] text-white rounded-t-[10px]"
              onClick={() => handleTabChange("task")}
            >
              <h1 className="text-[10px]  font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px]  text-center">
                Tasks
              </h1>
            </div>
          ) : (
            <div className="p-2 " onClick={() => handleTabChange("task")}>
              <h1 className="text-[10px] font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px]  text-center">
                Task
              </h1>
            </div>
          )}
          {tab === "files" ? (
            <div
              className="p-2  md:px-6 md:ml-2 bg-[#3767B1] text-white rounded-t-[10px]"
              onClick={() => handleTabChange("files")}
            >
              <h1 className="text-[10px] font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px] text-center">
                Files
              </h1>
            </div>
          ) : (
            <div className="p-2 " onClick={() => handleTabChange("files")}>
              <h1 className="text-[10px] font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px] text-center text-neutral-500">
                Files
              </h1>
            </div>
          )}
          {tab === "milestone" ? (
            <div
              className="p-2  md:px-6 md:ml-2  bg-[#3767B1] text-white rounded-t-[10px]"
              onClick={() => handleTabChange("milestone")}
            >
              <h1 className="text-[10px] font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px] text-center">
                Milestone
              </h1>
            </div>
          ) : (
            <div className="p-2 " onClick={() => handleTabChange("milestone")}>
              <h1 className="text-[10px] font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px] text-center text-neutral-500">
                Milestone
              </h1>
            </div>
          )}
          {tab === "Comments" ? (
            <div
              className="p-2  md:px-6 md:ml-2  bg-[#3767B1] text-white rounded-t-[10px]"
              onClick={() => handleTabChange("Comments")}
            >
              <h1 className="text-[10px] font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px] text-center">
                Comments
              </h1>
            </div>
          ) : (
            <div className="p-2 " onClick={() => handleTabChange("Comments")}>
              <h1 className="text-[10px] font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px] text-center text-neutral-500">
                Comments
              </h1>
            </div>
          )}
          {tab === "note" ? (
            <div
              className="p-2  md:px-6 md:ml-2  bg-[#3767B1] text-white rounded-t-[10px]"
              onClick={() => handleTabChange("note")}
            >
              <h1 className="text-[10px] font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px] text-center">
                Note
              </h1>
            </div>
          ) : (
            <div className="p-2 " onClick={() => handleTabChange("note")}>
              <h1 className="text-[10px] font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px] text-center text-neutral-500">
                Note
              </h1>
            </div>
          )}
          {tab === "Invoice" ? (
            <div
              className="p-2  md:px-6 md:ml-2  bg-[#3767B1] text-white rounded-t-[10px]"
              onClick={() => handleTabChange("Invoice")}
            >
              <h1 className="text-[10px] font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px] text-center">
                Invoice
              </h1>
            </div>
          ) : (
            <div className="p-2 " onClick={() => handleTabChange("Invoice")}>
              <h1 className="text-[10px] font-[500] leading-[13.02px] md:leading-[26.04px] md:text-[15px] text-center text-neutral-500">
                Invoice
              </h1>
            </div>
          )}
        </div>
      </div>

      {tab == "overview" && (
        <Box
          className="mx-2  md:h-[50vh]  md:w-[96%]  md:ml-[20px]  md:mr-[20px]   rounded-lg "
          sx={{ backgroundColor: "background.view" }}
        >
          <Box className=" gap-4 mt-4 w-[97%] ml-2 md:ml-4 ">
            <div className="w-full md:w-[21%] flex justify-start items-center">
              <h1    style={{
                  fontSize: "20px",
                  lineHeight: "13.02px",
                  fontWeight: "500",
                  marginTop:'20px'
                }}
                className="text-zinc-500"
              >Description</h1>

 

            </div>
            {
              userDataVal &&
              <div className="mt-5">
              
              <div className="mt-5" dangerouslySetInnerHTML={{ __html: userDataVal.description }} />
              </div>
            }
         
            
          </Box>

          
        </Box>
      )}

      {tab == "task" && (
        <Box
          className="mx-2 h-[48vh] md:h-[50vh]  md:w-[96%]  md:ml-[20px]  md:mr-[20px]   rounded-lg "
          sx={{ backgroundColor: "background.view" }}
        >
          <Box className="flex flex-col md:flex-row justify-between gap-4 mt-4 w-[97%] ml-2 md:ml-4 ">
            <div className="w-full md:w-[21%] flex justify-start items-center"></div>
          </Box>

          <Box className="flex  md:flex-row justify-between gap-4  w-[97%] ml-2 md:ml-4 mt-[25px]">
            <div className="w-full md:w-[21%] flex justify-start items-center">
              <p className="text-[10px] leading-[13.02px] font-[500] ml-3 mr-3">
                Rows per page:
              </p>
              <select className="appearance-none bg-transparent pl-1 rounded leading-tight focus:outline-none focus:border-gray-500 text-[12px]">
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
              </select>
              <ArrowDropDownIcon fontSize="medium" className="text-zinc-500" />
              <p className="text-[12px]"></p>
            </div>

            <div className="w-2/2 md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center">
              <input
                placeholder="Search"
                className="appearance-none bg-transparent w-[75%] text-white-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[15px] focus:border-gray-500"
              />
              <SearchIcon
                style={{
                  fontSize: "20px",
                  lineHeight: "13.02px",
                  fontWeight: "500",
                }}
                className="text-zinc-500"
              />
            </div>
          </Box>

          <Box
            className="h-[31vh] w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-[5px] mt-10 "
            sx={{
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            <Grid className="flex  flex-row border-b border-zinc-500">
              <div className="w-auto min-w-[30px] max-w-[40px] md:w-[14.6%] px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[15px] font-bold md:leading-[26.04px]">
                No
              </div>
              <div className="w-auto min-w-[150px] md:w-[14.6%] px-2 border-r border-zinc-500 text-[15px] leading-[19.53px] md:text-[15px] font-bold md:leading-[26.04px]">
                Task
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] px-2 border-r border-zinc-500 text-[15px] leading-[19.53px] md:text-[15px] font-bold md:leading-[26.04px]">
                Client
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] text-nowrap px-2 border-r border-zinc-500 text-[15px] leading-[19.53px] md:text-[15px] font-bold md:leading-[26.04px]">
                Assigned To
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] px-2 border-r border-b md:border-b-0 border-zinc-500 text-[15px] leading-[19.53px] md:text-[15px] font-bold md:leading-[26.04px]">
                Priority
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] text-nowrap px-2 border-r border-b md:border-b-0 border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Start Date
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] px-2 border-r border-b md:border-b-0 border-zinc-500 text-[15px] leading-[19.53px] md:text-[15px] font-bold md:leading-[26.04px]">
                Deadline
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] px-2 border-r border-b md:border-b-0 border-zinc-500 text-[15px] leading-[19.53px] md:text-[15px] font-bold md:leading-[26.04px]">
                Status
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] border-b  md:border-b-0 border-zinc-500 px-2 text-left text-[15px] leading-[19.53px] md:text-[15px] font-bold md:leading-[26.04px]">
                Action
              </div>
            </Grid>
            {userData.map((user, index) => (
              <Grid
                key={index}
                className="flex flex-row border-b border-zinc-500"
                currentScreen={currentScreen}
              >
                <div className="w-auto min-w-[30px] max-w-[40px] md:w-[14.6%] px-2 border-r border-zinc-500 text-left text-[10px] font-[500] leading-[13.02px] md:text-xs flex items-center md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {user.Id}
                </div>
                <div className="w-auto min-w-[150px] md:w-[14.6%] px-2 border-r border-zinc-500 text-[10px] font-[500] leading-[13.02px] md:text-xs flex items-center md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {user.task}
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] px-2 border-r border-zinc-500 text-[10px] font-[500] leading-[13.02px] md:text-xs flex items-center md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {user.client}
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] px-2 border-r border-zinc-500 text-[10px] font-[500] leading-[13.02px] md:text-xs flex items-center md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <div>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s"
                        alt="Assigned To"
                        style={{
                          height: "18px",

                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div style={{ marginLeft: "7px", marginTop: "1px" }}>
                      <p className="text-nowrap md:text-[10px] md:font-[500] md:leading-[19.53px]">
                        Emma Stone
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] px-2 border-r border-b md:border-b-0 border-zinc-500 text-[10px] font-[500] leading-[13.02px] md:text-xs flex items-center md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  <div
                    className={` rounded-[3px] w-3/5 flex justify-center py-[1px] text-[8px] items-center ${
                      getColor(user.status).bgColor
                    } ${getColor(user.status).textColor}`}
                  >
                    {user.status}
                  </div>
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] px-2 border-r border-b md:border-b-0 border-zinc-500 text-left text-[10px] font-[500] leading-[13.02px] md:text-xs flex items-center md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {user.clockIn}
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] px-2 border-r border-b md:border-b-0 border-zinc-500 text-[10px] font-[500] leading-[13.02px] md:text-xs flex items-center md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {user.clockOut}
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] px-2 border-r border-b md:border-b-0 border-zinc-500 text-[10px] font-[500] leading-[13.02px] md:text-xs flex items-center md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {/* <div className="h-2 flex justify-between w-full">
                    <div
                      className="h-full rounded-lg"
                      style={{
                        width: getProgressBarStyle(user.status).width,
                        backgroundColor: getProgressBarStyle(user.status)
                          .backgroundColor,
                      }}
                    ></div>

                    {user.status === "Late" && (
                      <div
                        className="h-full rounded-lg"
                        style={{ width: "25%", backgroundColor: "#EF4444" }}
                      ></div>
                    )}
                  </div> */}
                  <Progressbar value={user.progressValue} />
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] px-2 py-1 border-r border-b md:border-b-0 border-zinc-500 flex justify-start gap-2 text-sm md:text-xs">
                  <div
                    className={`${
                      mode === "dark" ? "bg-[#242424]" : "bg-[#cccccc]"
                    } rounded-[5px] p-1`}
                  >
                    {user.action}
                  </div>
                  <div
                    className={`${
                      mode === "dark" ? "bg-[#242424]" : "bg-[#cccccc]"
                    }  text-[#FF9B05] rounded-[5px] `}
                  >
                    {user.downloadicon}
                  </div>
                  <div
                    className={`${
                      mode === "dark" ? "bg-[#242424]" : "bg-[#cccccc]"
                    } text-[#3767B1] rounded-[5px]`}
                  >
                    {user.deleteicon}
                  </div>
                </div>
                {/* <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-b md:border-b-0 border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-xs flex items-center gap-2">
                  <div className="bg-[#242424] rounded-[5px] p-1">
                    {user.action}
                  </div>
                  <div className="bg-[#242424] text-[#FF9B05] rounded-[5px] ">
                    {user.downloadicon}
                  </div>
                  <div className="bg-[#242424] text-[#3767B1] rounded-[5px] ">
                    {user.deleteicon}
                  </div>
                </div> */}
              </Grid>
            ))}
          </Box>

          <div className="flex items-center justify-between   pl-5 md:pl-0  pt-2 pb-5">
            <div className="p-2 rounded-lg ">
              <div className="flex items-center gap-0 md:gap-6">
                <p className="text-[11px] ml-3 text-gray-400">
                  Show Rows: 1-10 of 20
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 pr-4">
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
                <div className="bg-blue-500 text-[11px] w-[20px] h-[20px] flex items-center justify-center p-1 rounded-full">
                  2
                </div>
              )}
            </div>
          </div>
        </Box>
      )}

      {tab == "files" && (
        <Box
          className="mx-2 h-[48vh] md:h-[52vh]  md:w-[96%]  md:ml-[20px]  md:mr-[20px]   rounded-lg "
          sx={{ backgroundColor: "background.view" }}
        >
          <Box className="flex flex-col md:flex-row justify-between gap-4 mt-4 w-[97%] ml-2 md:ml-4 ">
            <div className="w-full md:w-[21%] flex justify-start items-center"></div>
          </Box>

          <Box className="flex flex-col md:flex-row justify-between gap-4 mt-4 w-[97%] ml-2 md:ml-4 ">
            <div className="w-full md:w-[21%] flex justify-start items-center">
              <p className="text-[10px] leading-[13.02px] font-[500] ml-3 mr-3">
                Rows per page:
              </p>
              <select className="appearance-none bg-transparent pl-1 rounded leading-tight focus:outline-none focus:border-gray-500 text-[12px]">
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
              </select>
              <ArrowDropDownIcon fontSize="medium" className="text-zinc-500" />
              <p className="text-[12px]"></p>
            </div>

            <div className="flex justify-end">
              {" "}
              <div className="w-2/3 md:w-full flex   row">
                <div className="  md:justify-center ">
                  <button className="bg-[#3767B1] text-nowrap py-[5px] px-[20px] text-[10px] font-[500] leading-[25px] hover:bg-blue-700 text-white  rounded">
                    Upload Files
                  </button>
                </div>
                <div className=" border border-gray-500 rounded-lg flex flex-row items-center ml-[15px]  md:ml-[30px]">
                  <input
                    placeholder="Search"
                    className="appearance-none bg-transparent w-[75%] text-white-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[15px] focus:border-gray-500"
                  />
                  <SearchIcon
                    style={{ fontSize: "20px" }}
                    className="text-zinc-500"
                  />
                </div>
              </div>
            </div>
          </Box>

          <Box
            className="w-[97%] h-[32vh] ml-2 md:ml-4 border border-zinc-500 rounded-[5px] mt-10 "
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
              <div className="w-auto min-w-[50px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                No
              </div>
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                File Name
              </div>
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Uploaded By
              </div>
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-b md:border-b-0 border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Action
              </div>
            </Grid>
            {userData.map((user, index) => (
              <Grid
                key={index}
                className="flex flex-row border-b border-zinc-500"
                currentScreen={currentScreen}
              >
                <div className="w-auto min-w-[50px] md:w-1/4 p-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-xs flex items-center">
                  {user.Id}
                </div>
                <div className="w-auto min-w-[150px] md:w-1/4 py-1 px-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px]  ">
                  {user.Project}{" "}
                  <span className="ml-2 text-neutral-600">(1.5GB)</span>
                  <div className="text-[7px] text-neutral-600">2 hours</div>
                </div>
                <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px] flex items-center ">
                  {user.uploadedby}
                  <span className="ml-2 text-neutral-600">(Client)</span>
                </div>
                <div
                  className={`w-auto min-w-[150px] md:w-1/4 px-2 border-r border-b md:border-b-0 border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-xs flex items-center gap-2`}
                >
                  <div
                    className={`${
                      mode === "dark" ? "bg-[#242424]" : "bg-[#cccccc]"
                    } rounded-[5px] p-1`}
                  >
                    {user.action}
                  </div>
                  <div
                    className={`${
                      mode === "dark" ? "bg-[#242424]" : "bg-[#cccccc]"
                    }  text-[#FF9B05] rounded-[5px] `}
                  >
                    {user.downloadicon}
                  </div>
                  <div
                    className={`${
                      mode === "dark" ? "bg-[#242424]" : "bg-[#cccccc]"
                    } text-[#3767B1] rounded-[5px]`}
                  >
                    {user.deleteicon}
                  </div>
                </div>
              </Grid>
            ))}
          </Box>
          <div className="flex items-center justify-between  md:mx-4    py-5  ">
            <div className=" rounded-lg ">
              <div className="flex items-center gap-0 md:gap-6">
                <p className="text-[10px] font-[500] leading-[13.02px] text-gray-400">
                  Show Rows: <span className="ml-3">1-10 of 20</span>
                </p>
              </div>
            </div>
            <div className="flex items-center flex-row gap-4">
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
      )}

      {tab == "note" && (
        <Box
          className="mx-2 h-[52vh] overflow-hidden overflow-y-scroll md:h-[65vh] md:w-[96%] md:mr-[20px] md:ml-0 rounded-lg  mt-4"
          sx={{
            backgroundColor: "background.view",
            marginLeft: { xs: "8px", md: "22px" },
            marginRight: { xs: "8px", md: "20px" },
          }}
        >
          <Box
            sx={{
              backgroundColor: "background.view",

              marginLeft: { xs: "15px", md: "22px" },
              marginRight: { xs: "15px", md: "22px" },
            }}
          >
            <div className="pt-3">
              <div className="text-[#BDBDBD] pb-2  text-[14px] font-[500] leading-[26.04px]">
                Title
              </div>
              <input
                className={`border border-gray-500 h-[50px]  p-[10px] w-full  rounded-lg ${
                  mode === "dark" ? "bg-[#141414]" : ""
                }`}
                placeholder="Enter Title"
              />
            </div>
            <div className="text-[#BDBDBD] mt-4 pb-2  text-[14px] font-[500] leading-[26.04px]">
              Note
            </div>
            <div>
              <ReactQuill
                value={text}
                modules={modules}
                formats={formats}
                onChange={handleChange}
                className="richtextWrap h-[230px] w-full rounded-[50px] border-0"
                placeholder="Enter Title"
                sx={{ borderRadius: "100px" }}
              />
            </div>
            <div className="flex justify-end mt-5 md:mt-0">
              <button className=" text-[14px] mt-14 mb-3 font-[500] leading-[26.04px] py-1 px-10 rounded-[4px] bg-[#3767B1]">
                Submit
              </button>
            </div>
          </Box>
        </Box>
      )}

      {tab == "milestone" && (
        <Box
          className="mx-2 h-[50vh] md:h-[52vh]   md:w-[96%]  md:ml-[20px]  md:mr-[20px]   rounded-lg "
          sx={{ backgroundColor: "background.view" }}
        >
          <Box className="flex flex-col md:flex-row justify-between gap-4 mt-4 w-[97%] ml-2 md:ml-4 ">
            <div className="w-full md:w-[21%] flex justify-start items-center"></div>
          </Box>

          <Box className="flex flex-col md:flex-row justify-between gap-4 mt-4 w-[97%] ml-2 md:ml-4 ">
            <div className="w-full md:w-[21%] flex justify-start items-center">
              <p className="text-[10px] leading-[13.02px] font-[500] ml-3 mr-3">
                Rows per page:
              </p>
              <select className="appearance-none bg-transparent pl-1 rounded leading-tight focus:outline-none focus:border-gray-500 text-[12px]">
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
              </select>
              <ArrowDropDownIcon fontSize="medium" className="text-zinc-500" />
              <p className="text-[12px]"></p>
            </div>

            <div className="flex justify-end">
              {" "}
              <div className="w-2/3  md:w-full flex   row">
                <div className="  md:justify-center ">
                  <button className="bg-[#3767B1] text-nowrap py-[5px] px-[20px] text-[10px] font-[500] leading-[25px] hover:bg-blue-700 text-white  rounded">
                    Add Milestones
                  </button>
                </div>
                <div className=" border border-gray-500 rounded-lg flex flex-row items-center ml-[15px]  md:ml-[30px]">
                  <input
                    placeholder="Search"
                    className="appearance-none bg-transparent w-[75%] text-white-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[15px] focus:border-gray-500"
                  />
                  <SearchIcon
                    style={{ fontSize: "20px" }}
                    className="text-zinc-500"
                  />
                </div>
              </div>
            </div>
          </Box>

          <Box
            className="w-[97%] h-[28vh] ml-2 md:ml-4 border border-zinc-500 rounded-[5px] mt-10 "
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
              <div className="w-auto text-center max-w-[20px] min-w-[50px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                No
              </div>
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Milestone Title
              </div>
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Milestone Cost
              </div>
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Deadline
              </div>

              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Status
              </div>
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-b md:border-b-0 border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Action
              </div>
            </Grid>
            {userData.map((user, index) => (
              <Grid
                key={index}
                className="flex flex-row border-b border-zinc-500"
                currentScreen={currentScreen}
              >
                <div className="w-auto max-w-[20px] min-w-[50px] md:w-1/4 p-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px] flex items-center justify-center">
                  {user.Id}
                </div>
                <div className="w-auto min-w-[150px] md:w-1/4 py-1 px-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px]  ">
                  {user.milestonetitle}{" "}
                </div>
                <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px] flex items-center ">
                  {user.amount}
                </div>
                <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px] flex items-center ">
                  {user.date}
                </div>

                <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px] flex items-center ">
                  <div
                    className={` rounded-[3px] w-2/6 flex justify-center   py-[1px] text-[8px] items-center ${
                      getcompleteincompleteColor(user.completeincompletestatus)
                        .bgColor
                    } ${
                      getcompleteincompleteColor(user.completeincompletestatus)
                        .textColor
                    }`}
                  >
                    {user.completeincompletestatus}
                  </div>
                </div>
                <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-b md:border-b-0 border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-xs flex items-center gap-2">
                  <div
                    className={`${
                      mode === "dark" ? "bg-[#242424]" : "bg-[#cccccc]"
                    } rounded-[5px] p-1`}
                  >
                    {user.action}
                  </div>
                  <div
                    className={`${
                      mode === "dark" ? "bg-[#242424]" : "bg-[#cccccc]"
                    }  text-[#FF9B05] rounded-[5px] `}
                  >
                    {user.downloadicon}
                  </div>
                  <div
                    className={`${
                      mode === "dark" ? "bg-[#242424]" : "bg-[#cccccc]"
                    } text-[#3767B1] rounded-[5px]`}
                  >
                    {user.deleteicon}
                  </div>
                </div>
              </Grid>
            ))}
          </Box>
          <div className="flex items-center justify-between  md:mx-4    py-5  ">
            <div className=" rounded-lg ">
              <div className="flex items-center gap-0 md:gap-6">
                <p className="text-[10px] font-[500] leading-[13.02px] text-gray-400">
                  Show Rows: <span className="ml-3">1-10 of 20</span>
                </p>
              </div>
            </div>
            <div className="flex items-center flex-row gap-4">
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
      )}

      {tab == "Invoice" && (
        <Box
          className="mx-2 h-[48vh] md:h-[52vh]  md:w-[96%]  md:ml-[20px] ml-[0px] md:mr-[20px] mr-[0px]  rounded-lg "
          sx={{
            backgroundColor: "background.view",
            marginLeft: { xs: "8px", md: "22px" },
            marginRight: { xs: "8px", md: "20px" },
          }}
        >
          <Box className="flex flex-col md:flex-row justify-between gap-4 mt-4 w-[97%] ml-2 md:ml-4 ">
            <div className="w-full md:w-[21%] flex justify-start items-center"></div>
          </Box>

          <Box className="flex flex-col md:flex-row justify-between gap-4 mt-4 w-[97%] ml-2 md:ml-4 ">
            <div className="w-full md:w-[21%] flex justify-start items-center">
              <p className="text-[10px] leading-[13.02px] font-[500] ml-3 mr-3">
                Rows per page:
              </p>
              <select className="appearance-none bg-transparent pl-1 rounded leading-tight focus:outline-none focus:border-gray-500 text-[12px]">
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
              </select>
              <ArrowDropDownIcon fontSize="medium" className="text-zinc-500" />
              <p className="text-[12px]"></p>
            </div>

            <div className="flex justify-end">
              {" "}
              <div className="w-2/3 md:w-full flex   row">
                <div className="  md:justify-center ">
                  <button className="bg-[#3767B1] text-nowrap py-[5px] px-[20px] text-[10px] font-[500] leading-[25px] hover:bg-blue-700 text-white  rounded">
                    Add Invoice
                  </button>
                </div>
                <div className=" border border-gray-500 rounded-lg flex flex-row items-center ml-[15px]  md:ml-[30px]">
                  <input
                    placeholder="Search"
                    className="appearance-none bg-transparent w-[75%] text-white-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[15px] focus:border-gray-500"
                  />
                  <SearchIcon
                    style={{ fontSize: "20px" }}
                    className="text-zinc-500"
                  />
                </div>
              </div>
            </div>
          </Box>

          <Box
            className="w-[97%] h-[32vh] ml-2 md:ml-4 border border-zinc-500 rounded-[5px] mt-10 "
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
              <div className="w-auto min-w-[50px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Invoice ID
              </div>
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Amount
              </div>
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Due Date
              </div>
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Invoice Date
              </div>
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Payment
              </div>{" "}
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Status
              </div>
              <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-b md:border-b-0 border-zinc-500 text-left text-[15px] leading-[19.53px] md:text-[16px] font-bold md:leading-[26.04px]">
                Action
              </div>
            </Grid>
            {userData.map((user, index) => (
              <Grid
                key={index}
                className="flex flex-row border-b border-zinc-500"
                currentScreen={currentScreen}
              >
                <div className="w-auto min-w-[50px] md:w-1/4 p-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px] flex items-center">
                  {user.invoiceId}
                </div>
                <div className="w-auto min-w-[150px] md:w-1/4 py-1 px-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px]  ">
                  {user.amount}{" "}
                </div>
                <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px] flex items-center ">
                  {user.date}
                </div>
                <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px] flex items-center ">
                  {user.date}
                </div>
                <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px] flex items-center ">
                  <div
                    className={` rounded-[3px] w-2/5 flex justify-center  py-[1px] text-[8px] items-center 
                     
                     ${getpaymentColor(user.paymentstatus).textColor}`}
                  >
                    {user.amount}
                  </div>
                </div>{" "}
                <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-[10px] flex items-center ">
                  <div
                    className={` rounded-[3px] w-2/5 flex justify-center  py-[1px] text-[8px] items-center ${
                      getpaymentColor(user.paymentstatus).bgColor
                    } ${getpaymentColor(user.paymentstatus).textColor}`}
                  >
                    {user.paymentstatus}
                  </div>
                </div>
                <div className="w-auto min-w-[150px] md:w-1/4 px-2 border-r border-b md:border-b-0 border-zinc-500 text-left text-[10px] leading-[13.02px] font-[500] md:text-xs flex items-center gap-2">
                  <div
                    className={`${
                      mode === "dark" ? "bg-[#242424]" : "bg-[#cccccc]"
                    } rounded-[5px] p-1`}
                  >
                    {user.action}
                  </div>
                  <div
                    className={`${
                      mode === "dark" ? "bg-[#242424]" : "bg-[#cccccc]"
                    }  text-[#FF9B05] rounded-[5px] `}
                  >
                    {user.downloadicon}
                  </div>
                  <div
                    className={`${
                      mode === "dark" ? "bg-[#242424]" : "bg-[#cccccc]"
                    } text-[#3767B1] rounded-[5px]`}
                  >
                    {user.deleteicon}
                  </div>
                </div>
              </Grid>
            ))}
          </Box>
          <div className="flex items-center justify-between  md:mx-4    py-5  ">
            <div className=" rounded-lg ">
              <div className="flex items-center gap-0 md:gap-6">
                <p className="text-[10px] font-[500] leading-[13.02px] text-gray-400">
                  Show Rows: <span className="ml-3">1-10 of 20</span>
                </p>
              </div>
            </div>
            <div className="flex items-center flex-row gap-4">
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
      )}

      {tab == "Comments" && (
        <Box
          className="mx-2 h-[48vh] md:h-[65vh]  no-scrollbar overflow-hidden overflow-y-scroll mt-[16px]  md:w-[96%]  md:ml-[20px]  md:mr-[20px]  md:ml-0  rounded-lg "
          sx={{ backgroundColor: "background.view" }}
        >
          <Box
            sx={{
              marginX: "18px",
              border: "1px solid gray",
              borderRadius: "8px",
              marginY: "25px",
              padding: "13px",
            }}
          >
            <div className=" md:flex gap-2">
              <div className="md:w-[5%]">
                <img
                  className="h-[45px] w-[45px] rounded-[50%]"
                  src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                  alt=""
                />
              </div>
              <div className="" style={{}}>
                <h2 className="text-[16px] font-[500] leading-[32.5px]">
                  Mobile App Developement
                </h2>
                <p className="mt-[-12px]">
                  <span className="text-[10px] font-[500] leading-[19.5px] text-gray-400 mr-2">
                    <CalendarTodayIcon sx={{ fontSize: "12px" }} /> Mar 11, 2024
                  </span>
                  <span className="text-[10px] font-[500] leading-[19.5px] text-gray-400 mr-2">
                    <AvTimerIcon sx={{ fontSize: "14px" }} /> 10:00AM
                  </span>
                </p>
                <p className="my-2 text-[12px] font-[400] leading-[14.5px] md:w-[75%]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores eos qui eius molestiae architecto, ullam autem
                  laborum labore earum id iure ad impedit voluptate deserunt
                  facilis quidem.
                </p>
                <div className={"mt" - 5}>
                  <Button
                    onClick={showMessageTab}
                    sx={{
                      backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0",
                      color: "gray",
                      fontSize: "12px",
                      marginRight: "25px",
                      borderRadius: "8px",
                      padding: "7px 10px",
                      border: "1px",
                    }}
                  >
                    <img src={comm} className="mr-2 w-4 h-4" alt="" />
                    Comment
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0",
                      color: "gray",
                      fontSize: "12px",
                      marginRight: "25px",
                      borderRadius: "8px",
                      padding: "7px 10px",
                      border: "1px",
                    }}
                  >
                    <ReplyIcon
                      sx={{ marginRight: "8px", width: "16px", height: "16px" }}
                    />{" "}
                    Reply
                  </Button>
                </div>
                {messageTab && (
                  <div
                    style={{
                      backgroundColor: mode === "dark" ? "#202021" : "",
                    }}
                    className={`  ${
                      mode === "dark" ? "bg-[red]" : "e2e0e0"
                    }, p-2  mt-[15px] rounded-[15px]  md:w-[87%] rounded-lg border border-zinc-500`}
                  >
                    {" "}
                    <div className="md:flex ">
                      <div className="md:w-[8%]">
                        <img
                          className="h-[40px] w-[40px] rounded-[50%]"
                          src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h2 className=" text-[14px] font-[500] leading-[32.5px]">
                          Mobile App Developement
                        </h2>
                        <p className="mt-[-12px]">
                          <span className="text-[9px] font-[500] leading-[19.5px] text-gray-400 mr-2">
                            <CalendarTodayIcon sx={{ fontSize: "12px" }} /> Mar
                            11, 2024
                          </span>
                          <span className="text-[9px] font-[500] leading-[19.5px] text-gray-400 ">
                            <AvTimerIcon sx={{ fontSize: "12px" }} /> 10:00AM
                          </span>
                        </p>
                        <p className="my-2 text-[12px] font-[400] leading-[14.5px]  ">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Asperiores eos qui eius molestiae architecto,
                          ullam autem laborum labore earum id iure ad impedit
                          voluptate deserunt facilis quidem.
                        </p>
                        <div className="mt-2 ">
                          <Button
                            sx={{
                              backgroundColor:
                                mode === "dark" ? "black" : "#e2e0e0",
                              color: "gray",
                              fontSize: "10px",
                              marginRight: "25px",
                              borderRadius: "8px",
                              padding: "5px 8px",
                            }}
                          >
                            <img src={comm} className="mr-2 w-4 h-4" alt="" />{" "}
                            Comment
                          </Button>
                          <Button
                            sx={{
                              padding: "5px 8px",

                              backgroundColor:
                                mode === "dark" ? "black" : "#e2e0e0",
                              color: "gray",
                              fontSize: "10px",
                              borderRadius: "8px",
                            }}
                          >
                            <ReplyIcon
                              sx={{
                                marginRight: "8px",
                                width: "16px",
                                height: "16px",
                              }}
                            />{" "}
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Box>
          <Box
            sx={{
              marginX: "18px",
              border: "1px solid gray",
              borderRadius: "8px",
              marginY: "25px",
              padding: "13px",
            }}
          >
            <div className=" md:flex gap-2">
              <div className="md:w-[5%]">
                <img
                  className="h-[45px] w-[45px] rounded-[50%]"
                  src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                  alt=""
                />
              </div>
              <div className="" style={{}}>
                <h2 className="text-[16px] font-[500] leading-[32.5px]">
                  Mobile App Developement
                </h2>
                <p className="mt-[-12px]">
                  <span className="text-[10px] font-[500] leading-[19.5px] text-gray-400 mr-2">
                    <CalendarTodayIcon sx={{ fontSize: "12px" }} /> Mar 11, 2024
                  </span>
                  <span className="text-[10px] font-[500] leading-[19.5px] text-gray-400 mr-2">
                    <AvTimerIcon sx={{ fontSize: "14px" }} /> 10:00AM
                  </span>
                </p>
                <p className="my-2 text-[12px] font-[400] leading-[14.5px] md:w-[75%]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Asperiores eos qui eius molestiae architecto, ullam autem
                  laborum labore earum id iure ad impedit voluptate deserunt
                  facilis quidem.
                </p>
                <div className={"mt" - 5}>
                  <Button
                    onClick={showMessageTab}
                    sx={{
                      backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0",
                      color: "gray",
                      fontSize: "12px",
                      marginRight: "25px",
                      borderRadius: "8px",
                      padding: "7px 10px",
                      border: "1px",
                    }}
                  >
                    <img src={comm} className="mr-2 w-4 h-4" alt="" />
                    Comment
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0",
                      color: "gray",
                      fontSize: "12px",
                      marginRight: "25px",
                      borderRadius: "8px",
                      padding: "7px 10px",
                      border: "1px",
                    }}
                  >
                    <ReplyIcon
                      sx={{ marginRight: "8px", width: "16px", height: "16px" }}
                    />{" "}
                    Reply
                  </Button>
                </div>
                {messageTab1 && (
                  <div
                    style={{
                      backgroundColor: mode === "dark" ? "#202021" : "",
                    }}
                    className={`  ${
                      mode === "dark" ? "bg-[red]" : "e2e0e0"
                    }, p-2  mt-[15px] rounded-[15px]  md:w-[87%] rounded-lg border border-zinc-500`}
                  >
                    {" "}
                    <div className="md:flex ">
                      <div className="md:w-[8%]">
                        <img
                          className="h-[40px] w-[40px] rounded-[50%]"
                          src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <h2 className=" text-[14px] font-[500] leading-[32.5px]">
                          Mobile App Developement
                        </h2>
                        <p className="mt-[-12px]">
                          <span className="text-[9px] font-[500] leading-[19.5px] text-gray-400 mr-2">
                            <CalendarTodayIcon sx={{ fontSize: "12px" }} /> Mar
                            11, 2024
                          </span>
                          <span className="text-[9px] font-[500] leading-[19.5px] text-gray-400 ">
                            <AvTimerIcon sx={{ fontSize: "12px" }} /> 10:00AM
                          </span>
                        </p>
                        <p className="my-2 text-[12px] font-[400] leading-[14.5px]  ">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Asperiores eos qui eius molestiae architecto,
                          ullam autem laborum labore earum id iure ad impedit
                          voluptate deserunt facilis quidem.
                        </p>
                        <div className="mt-2 ">
                          <Button
                            sx={{
                              backgroundColor:
                                mode === "dark" ? "black" : "#e2e0e0",
                              color: "gray",
                              fontSize: "10px",
                              marginRight: "25px",
                              borderRadius: "8px",
                              padding: "5px 8px",
                            }}
                          >
                            <img src={comm} className="mr-2 w-4 h-4" alt="" />{" "}
                            Comment
                          </Button>
                          <Button
                            sx={{
                              padding: "5px 8px",

                              backgroundColor:
                                mode === "dark" ? "black" : "#e2e0e0",
                              color: "gray",
                              fontSize: "10px",
                              borderRadius: "8px",
                            }}
                          >
                            <ReplyIcon
                              sx={{
                                marginRight: "8px",
                                width: "16px",
                                height: "16px",
                              }}
                            />{" "}
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Box>

          <div className="mx-4">
            <div className="">
              <input
                placeholder="Enter Title"
                className="appearance-none bg-transparent w-full p-2   text-white-700    h-[45px] rounded leading-tight focus:outline-none text-[15px] border border-zinc-500"
              />
            </div>
            <div className="mt-[20px]">
              <textarea
                placeholder="Enter Comments"
                className="appearance-none bg-transparent w-[100%] text-white-700 p-2  h-[200px]   rounded leading-tight focus:outline-none text-[15px] border border-zinc-500"
              />
            </div>
            <div className="flex justify-end">
              <button className=" text-[14px] mt-3 mb-3 font-[500] leading-[26.04px] py-1 px-4 rounded-[4px] bg-[#3767B1]">
                Send Comments
              </button>
            </div>
          </div>
        </Box>
      )}
    </Box>
  );
};

export default ViewProject;
