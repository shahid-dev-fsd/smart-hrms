import React, { useState, useCallback, useEffect } from "react";
import { Box, Grid, IconButton, Button } from "@mui/material";
import axios from "axios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import view from "../ReceivedApp/viewicon.png";
import AttendViewPage from "../Attendance/AttendView/AttendViewPage";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import EditImg from "../../../src/assets/Icons/ic_baseline-edit.png";
import Delete from "../../../src/assets/Icons/memory_trash.png";
import Projectlistt from "./Projectlistt";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useTheme } from "../../style/theme";
import { useNavigate } from 'react-router-dom';
const ProjectList = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const { mode } = useTheme();
  const navigate = useNavigate();


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

  const [overview, setOverview] = useState([]);
  const fetchOverview = useCallback(async () => {
    try {
      const response = await axios.get(`hr/projects/dashbaord`);
      console.log(response.data.overview.projects);
      setOverview(response.data.overview.projects);
    } catch (e) {
      console.log(e);
    }
  }, [setOverview]);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);
  console.log(overview);

  const countProjectsByStatus = (status) => {
    return (
      overview &&
      overview.length > 1 &&
      overview?.filter((project) => project.status === status).length
    );
  };

  const totalProjects = overview ? overview.length : 0;
  const completedProjects = countProjectsByStatus("Completed");
  const ongoingProjects = countProjectsByStatus("Ongoing");
  const pendingProjects = countProjectsByStatus("Pending");

  console.log(
    "totalProjects0",
    totalProjects,
    completedProjects,
    ongoingProjects,
    pendingProjects
  );

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

    const sendData = (user) => {
    console.log("userData to view", user);
    navigate('/viewproject', { state: { user } });    };


  return (
    <Box
      sx={{
        backgroundColor: "background.main",
        borderTopRightRadius: "15px",
        borderTopLeftRadius: "15px",
        marginX: "10px",
        padding: "0",
        paddingBottom: "8px",
      }}
    >
      <div className="flex flex-col rounded-t-[15px]">
        <div className="p-2 md:py-2 md:px-6">
          <div className="flex items-center justify-between md:w-full py-8 md:p-4">
            <div className="">
              <h1 className=" text-neutral-500 text-[18px] leading-[26.04px] md:text-[25px] font-[500] md:leading-[39.06px]">
                Project List
              </h1>
            </div>
            <div className="flex flex-row items-center justify-center gap-3">
              <Button variant="contained"> Create New Project</Button>

              <div className=" p-[8px] rounded-[5px]">
                {" "}
                <InfoOutlinedIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Box
        className="w-full hidden md:block  md:w-[96%] pt-4 pb-6 rounded-lg mb-4"
        sx={{
          backgroundColor: "background.view",
          marginLeft: { xs: "0", md: "22px" },
          marginRight: { xs: "0", md: "20px" },
        }}
      >
        <Box className=" flex flex-col md:flex-row justify-between gap-4 mt-4  mx-0 md:mx-4">
          <div className="h-full pr-[1px] w-full">
            <Grid item xs={11}>
              <div className="flex flex-col md:flex-row items-center justify-between   w-full ">
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="w-[50px] h-[45px] flex justify-center items-center rounded-[5px] bg-[#3767B133] text-[#3767B1] md:text-[18px] md:font-[700] md:leading-[26px] ">
                    {totalProjects ? totalProjects : "0"}
                  </div>
                  <p className="text-[16px] text-gray-400 text-center">
                    Total Projects
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="w-[50px] h-[45px] flex justify-center items-center rounded-[5px] bg-[#42B82433] text-[#42B824]  md:text-[18px] md:font-[700] md:leading-[26px] ">
                    {completedProjects ? completedProjects : "0"}
                  </div>
                  <p className="text-[16px] text-gray-400 text-center">
                    Completed Projects
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="w-[50px] h-[45px] flex justify-center items-center rounded-[5px] bg-[#FF9B0533] text-[#FF9B05]  md:text-[18px] md:font-[700] md:leading-[26px] ">
                    {pendingProjects ? pendingProjects : "0"}
                  </div>
                  <p className="text-[16px] text-gray-400 text-center">
                    Pending Projects
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="w-[50px] h-[45px] flex justify-center items-center rounded-[5px] bg-[#50E3C233] text-[#50E3C2]  md:text-[18px] md:font-[700] md:leading-[26px] ">
                    {ongoingProjects ? ongoingProjects : "0"}
                  </div>
                  <p className="text-[16px] text-gray-400 text-center">
                    Ongoing Projects
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="w-[50px] h-[45px] flex justify-center items-center rounded-[5px] bg-[#D4060633] text-[#D40606]  md:text-[18px] md:font-[700] md:leading-[26px] ">
                    0
                  </div>
                  <p className="text-[16px] text-gray-400 text-center">
                    Canceled Projects
                  </p>
                </div>
              </div>
            </Grid>
          </div>
        </Box>
      </Box>
      <Projectlistt />
      <div className="mx-2 md:mx-0">
        <Box
          className="w-full md:w-[96%]  pt-4 rounded-lg mb-4"
          sx={{
            backgroundColor: "background.view",
            marginLeft: { xs: "0", md: "22px" },
            marginRight: { xs: "0", md: "20px" },
          }}
        >
          <div className=" border-l-4 border-[#3767B1] pl-3 md:pl-4 w-full text-[18px] md:text-[18px] md:font-[500] md:leading-[32.55px]">
            Recent Project Summary
          </div>
          <Box
            className="flex  md:flex-row justify-end gap-1 md:gap-4 mt-4 mr-2 ml-auto md:mr-4"
            sx={{
              width: { xs: "95%", md: "70%" },
            }}
          >
            {" "}
            <div className="w-full h-[40px]  md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center">
              <select className="appearance-none bg-transparent w-[90%] text-gray-700  px-4 md:pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                <option>From</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <CalendarTodayOutlinedIcon
                style={{ fontSize: "24px" }}
                className="text-zinc-500 pr-2"
              />
            </div>
            <div className="w-full h-[40px] md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center">
              <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 md:pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                <option>To</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
              </select>
              <CalendarTodayOutlinedIcon
                style={{ fontSize: "24px" }}
                className="text-zinc-500 pr-2"
              />
            </div>
            <div className="w-full h-[40px] md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center">
              <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 md:pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                <option>Select Priority</option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
              </select>
              <ArrowDropDownIcon
                style={{ fontSize: "28px" }}
                className="text-zinc-500"
              />
            </div>
            <div className=" md:w-[11%] flex justify-end md:justify-center items-center ">
              <button
                style={{ fontSize: "10px" }}
                className="bg-[#3767B1] hover:bg-blue-700 text-white md:text-[10px]  md:leading-[15.32px] font-bold  py-3 md:py-3 px-5 md:px-7 rounded-[8px] "
              >
                Search
              </button>
            </div>
          </Box>
          <Box className="flex  h-[40px] md:flex-row justify-between gap-4 mt-4 w-[97%] ml-2 md:ml-4 mt-[35px]">
            <div className="w-full md:w-[21%] flex justify-start items-center">
              <p className="text-[11px] ml-3">Rows per page:</p>
              <select className="appearance-none bg-transparent pl-3 rounded leading-tight focus:outline-none focus:border-gray-500 text-[12px]">
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
              </select>
              <ArrowDropDownIcon fontSize="medium" className="text-zinc-500" />
            </div>

            <div className="w-full md:w-[22%] border border-gray-500 rounded-lg flex flex-row items-center">
              <input
                placeholder="Search"
                className="appearance-none bg-transparent w-[75%] text-white-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[10px] focus:border-gray-500"
              />

              <SearchIcon
                style={{ fontSize: "18px", marginLeft: "18px" }}
                className="text-zinc-500"
              />
            </div>
          </Box>

          <Box
            className="h-[45vh] w-[96%] ml-2 md:mx-7 border border-zinc-500 rounded-sm mt-10 h-[380px]"
            sx={{
              borderRadius: "6px",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            <Grid className="flex flex-row border-b border-zinc-500">
              <div className="w-auto min-w-[50px] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-[15px] font-bold md:leading-[26.04px]">
                No
              </div>
              <div className="w-auto min-w-[150px] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[15px] font-bold md:leading-[26.04px]">
                Project Title
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[15px] font-bold md:leading-[26.04px]">
                Client
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] text-nowrap p-2 border-r border-zinc-500 text-sm md:text-[15px] font-bold md:leading-[26.04px]">
                Team
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] p-2 border-r border-b md:border-b-0 border-zinc-500 text-sm md:text-[15px] font-bold md:leading-[26.04px]">
                Priority
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] text-nowrap p-2 border-r border-b md:border-b-0 border-zinc-500 text-left text-sm md:text-[15px] font-bold md:leading-[26.04px]">
                Start Date
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] p-2 border-r border-b md:border-b-0 border-zinc-500 text-sm md:text-[15px] font-bold md:leading-[26.04px]">
                Deadline
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] p-2 border-r border-b md:border-b-0 border-zinc-500 text-sm md:text-[15px] font-bold md:leading-[26.04px]">
                Status
              </div>
              <div className="w-auto min-w-[100px] md:w-[14.6%] border-b  md:border-b-0 border-zinc-500 p-2 text-left text-sm md:text-[15px] font-bold md:leading-[26.04px]">
                Action
              </div>
            </Grid>
            {overview.map((user, index) => (
              <Grid
                key={index}
                className="flex flex-row border-b border-zinc-500"
                currentScreen={currentScreen}
              >
                <div className="w-auto min-w-[50px] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs flex items-center md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {index}
                </div>
                <div className="w-auto min-w-[150px] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {user.title}
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {user.client}
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {user.assignedTo.map((item) => (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s"
                            alt="Assigned To"
                            style={{ height: "20px", borderRadius: "50%" }}
                          />
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] p-2 border-r border-b md:border-b-0 border-zinc-500 text-sm md:text-xs flex items-center  md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {user.priority == "Low" && (
                    <div
                      style={{
                        backgroundColor: "#8ad88a",
                        color: "green",
                        margin: "auto",
                        padding: "4px",
                        fontSize: "10px",
                        width: "50%",
                        textAlign: "center",
                      }}
                    >
                      Low
                    </div>
                  )}

                  {user.priority == "Medium" && (
                    <div
                      style={{
                        backgroundColor: "rgb(246 230 184)",
                        color: "orange",
                        margin: "auto",
                        padding: "4px",
                        fontSize: "10px",
                        width: "50%",
                        textAlign: "center",
                      }}
                    >
                      Medium
                    </div>
                  )}
                  {user.priority == "High" && (
                    <div
                      style={{
                        backgroundColor: "rgb(238 194 191)",
                        color: "#ee3a17",
                        margin: "auto",
                        padding: "4px",
                        fontSize: "10px",
                        width: "50%",
                        textAlign: "center",
                      }}
                    >
                      High
                    </div>
                  )}
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] p-2 border-r border-b md:border-b-0 border-zinc-500 text-left text-sm md:text-xs flex items-center  md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {user?.startDate?.substring(0, 10)}
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] p-2 border-r border-b md:border-b-0 border-zinc-500 text-sm md:text-xs flex items-center  md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {user?.endDate?.substring(0, 10)}
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] p-2 border-r border-b md:border-b-0 border-zinc-500 text-sm md:text-xs flex items-center  md:text-[13px] md:font-[500] md:leading-[19.53px]">
                  {user.status == "Ongoing" && (
                    <div
                      style={{
                        backgroundColor: "rgb(18 190 183)",
                        color: "white",
                        margin: "auto",
                        padding: "4px",
                        fontSize: "10px",
                        width: "60%",
                        textAlign: "center",
                      }}
                    >
                      Ongoing
                    </div>
                  )}

                  {user.status == "Pending" && (
                    <div
                      style={{
                        backgroundColor: "rgb(225 194 7)",
                        color: "orange",
                        margin: "auto",
                        padding: "4px",
                        fontSize: "10px",
                        width: "60%",
                        textAlign: "center",
                      }}
                    >
                      Pending
                    </div>
                  )}
                  {user.status == "Active" && (
                    <div
                      style={{
                        backgroundColor: "rgb(55 103 177)",
                        color: "white",
                        margin: "auto",
                        padding: "4px",
                        fontSize: "10px",
                        width: "60%",
                        textAlign: "center",
                      }}
                    >
                      Active
                    </div>
                  )}
                </div>
                <div className="w-auto min-w-[100px] md:w-[14.6%] p-2   flex  text-sm md:text-xs">
                  <RemoveRedEyeIcon 
                 onClick={()=>sendData(user)}
                  className={`${
                    mode === "dark" ? "bg-[#1E1E1E]" : "border-2 bg-[#EEEEEE]"
                  } `}
                  style={{     
    color: "#c2b1b1",
    marginTop: '3px' ,
    padding: '2px' ,
    marginRight: "8px" ,
    height: "20px"
} }

/>

                  <EditIcon
                  className={`${
                    mode === "dark" ? "bg-[#1E1E1E]" : "border-2 bg-[#EEEEEE]"
                  } `}
                    style={{
                      color: "#c2b1b1",
                      marginTop: '3px' ,
                      padding: '2px' ,
                      marginRight: "8px" ,
                      height: "20px"
                    }}
                  />

                  <DeleteIcon
                  className={`${
                    mode === "dark" ? "bg-[#1E1E1E]" : "border-2 bg-[#EEEEEE]"
                  } `}
                
                    style={{
                      color: "blue",
                      marginTop: '3px' ,
                      padding: '2px' ,
                     
                      marginRight: "8px" ,
                      height: "20px"
                     }}
                  />
                </div>
              </Grid>
            ))}
          </Box>

          <div className="flex items-center justify-between  md:mx-4 pl-5 md:pl-0 pt-4 md:pt-10 pb-5">
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
      </div>
    </Box>
  );
};

export default ProjectList;
