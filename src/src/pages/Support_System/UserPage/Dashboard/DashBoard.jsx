import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Button,
  TextField,
  InputLabel,
  InputAdornment,
  Typography,
} from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import view from "../../../ReceivedApp/viewicon.png";
import HomeIcon from "@mui/icons-material/Home";
import { alignProperty } from "@mui/material/styles/cssUtils";
// import { Visibility, VisibilityOff } from '@material-ui/icons';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Charts from "../../../DashComponents/charts";

function DashBoard() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [TitckPage, setTicketePage] = useState("ticetList");

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

  const data = [
    { name: "Jan", employees: 100, budget: 200, year: 2024 },
    { name: "Feb", employees: 150, budget: 220, year: 2024 },
    { name: "Mar", employees: 200, budget: 250, year: 2024 },
    { name: "Apr", employees: 180, budget: 230, year: 2024 },
    { name: "May", employees: 210, budget: 240, year: 2024 },
    { name: "Jun", employees: 220, budget: 260, year: 2024 },
    { name: "Jan", employees: 100, budget: 200, year: 2024 },
    { name: "Feb", employees: 150, budget: 220, year: 2024 },
    { name: "Mar", employees: 200, budget: 250, year: 2024 },
    { name: "Apr", employees: 180, budget: 230, year: 2024 },
    { name: "May", employees: 210, budget: 240, year: 2024 },
    { name: "Jun", employees: 220, budget: 260, year: 2024 },
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

  const [overview, setOverview] = useState({});
  const fetchOverview = useCallback(async () => {
    try {
      const response = await axios.get(`/hr/dashboard`);
      setOverview(response.data.overview);
    } catch (e) {
      console.log(e);
    }
  }, [setOverview]);

  // useEffect(() => {
  //     fetchOverview();
  // }, [fetchOverview]);
  // console.log(overview),

  const boxesData = [
    {
      icon: (
        <GroupIcon
          fontSize="large"
          className="text-white  bg-sky-400 p-2 rounded-lg"
        />
      ),
      title: "Total Employees",
      value: (
        <Typography
          variant="body1"
          style={{ color: "#00FF00", fontSize: "1.2em" }}
        >
          {overview?.employees?.total ? overview?.employees?.total : "1500"}
        </Typography>
      ),
      description: "124 for last month",
      trendIcon: <TrendingUp className="text-green-500" />,
    },
    {
      icon: (
        <ApartmentIcon
          fontSize="large"
          className="text-white bg-rose-500 p-2 rounded-lg"
        />
      ),
      title: "Department",
      value: (
        <Typography
          variant="body1"
          style={{ color: "#FF0000", fontSize: "1.2em" }}
        >
          {overview?.departments ? overview?.departments : "900"}
        </Typography>
      ),
      description: "124 for last month,",
      trendIcon: <TrendingDown className="text-red-500" />,
    },
    {
      icon: (
        <ApartmentIcon
          fontSize="large"
          className="text-white bg-rose-500 p-2 rounded-lg"
        />
      ),
      title: "Department",
      value: (
        <Typography
          variant="body1"
          style={{ color: "#FF0000", fontSize: "1.2em" }}
        >
          {overview?.departments ? overview?.departments : "1300"}
        </Typography>
      ),
      description: "124 for last month,",
      trendIcon: <TrendingDown className="text-red-500" />,
    },
  ];

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

  const ChnagePage = (tic) => {
    setTicketePage(tic);
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
        overflowY: "scroll",
        backgroundColor: "background.main",
        height: "88vh",
      }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between md:w-full p-4">
          <div className="p-2">
            <h1 className="text-xs md:text-2xl text-neutral-500">
              User Pages <span className=" text-neutral-500">Ticket List</span>
            </h1>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <InfoOutlinedIcon />
          </div>
        </div>
      </div>
      <Box className=" md:w-[96%] w-[88%] mr-[20px] md:ml-0 pb-4 rounded-lg ml-[20px] ">
        <div className="flex flex-col md:flex-row gap-8 mt-5">
          <Box
            className="w-full   md:sticky   md:h-[72vh] md:w-1/3 p-5 rounded-lg border ml-0 md:ml-[20px] border-zinc-500"
            sx={{
              backgroundColor: "background.view",

              // overflowY: "scroll",
              // position: "sticky",
              top: "20px",
            }}
          >
            <div className="text-center mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuaNLChfhGJgcaJ9outna1kfQ-oHbANj3wg&s"
                alt="User Avatar"
                className="w-20 h-20 rounded-full mx-auto"
              />
              <h1 className="text-blue-500 mt-2 font-weight-500">
                Stephan Grant
              </h1>
              <p className="text-gray-400">QA Tester</p>
            </div>
            <nav className="text-gray-400">
              <ul>
                <li
                  onClick={() => ChnagePage("ticetList")}
                  className="py-3 cursor-pointer bg-blue-500 border-[1px] rounded-md text-white p-2"
                >
                  <HomeIcon style={{ marginRight: "4px" }} />
                  Dashboard
                </li>
                <li className="py-3 cursor-pointer p-2">
                  <HomeIcon style={{ marginRight: "4px" }} />
                  Edit Profile
                </li>
                <li
                  onClick={() => ChnagePage("ticetList")}
                  className="py-3 cursor-pointer text-white p-2"
                >
                  <HomeIcon style={{ marginRight: "4px" }} />
                  Ticket Lists
                </li>
                <li
                  onClick={() => ChnagePage("activeticket")}
                  className="py-3 cursor-pointer rounded-md p-2"
                >
                  <HomeIcon style={{ marginRight: "4px" }} />
                  Active Tickets
                </li>
                <li
                  onClick={() => ChnagePage("ClosedTickets")}
                  className="py-3 cursor-pointer text-white p-2"
                >
                  <HomeIcon style={{ marginRight: "4px" }} />
                  Closed Tickets
                </li>
                <li className="py-3 cursor-pointer p-2">
                  <HomeIcon style={{ marginRight: "4px" }} />
                  Create Tickets
                </li>
                <li className="py-3 cursor-pointer p-2">
                  <HomeIcon style={{ marginRight: "4px" }} />
                  View Tickets
                </li>
              </ul>
            </nav>
          </Box>
          <Box
            className="w-full md:w-3/4"
            sx={{
              overflowY: "scroll",
              // overflow: "hidden",
              height: "72vh",
              // height: "calc(100vh - 60px)",
            }}
          >
            <Box className="w-full ml-2 md:ml-0 pt-4 rounded-lg mt-[-15px]">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-4/4">
                  <div className="flex flex-col gap-4 mb-4  md:flex-row">
                    {boxesData.map((box, index) => (
                      <Grid
                        sx={{ backgroundColor: "background.view" }}
                        key={index}
                        className="rounded-lg p-4 shadow-md md:w-1/2"
                      >
                        <p className="text-xl">{box.title}</p>
                        <div className="flex items-center mb-2">
                          <p className="w-5/6 text-xl">{box.value}</p>
                          <div className="w-1/6">{box.icon}</div>
                        </div>
                      </Grid>
                    ))}
                  </div>
                </div>
              </div>
            </Box>
            <Charts data={data} />
            <Box
              className="w-full md:w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-sm mt-10 h-[380px]"
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
                <div className="w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold">
                  ID
                </div>
                <div className="w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold">
                  Project Title
                </div>
                <div className="w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold">
                  Client
                </div>
                <div className="w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold">
                  Status
                </div>
                <div className="w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-[16px] font-bold">
                  Start Date
                </div>
                <div className="w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold">
                  Deadline
                </div>
                <div className="w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-[16px] font-bold">
                  Progress
                </div>
                <div className="w-[25%] md:w-[14.6%] p-2 text-left text-sm md:text-[16px] font-bold">
                  Action
                </div>
              </Grid>
              {userData.map((user, index) => (
                <Grid
                  key={index}
                  className="flex flex-row border-b border-zinc-500"
                >
                  <div className="w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs flex items-center">
                    {user.Id}
                  </div>
                  <div className="w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center">
                    {user.Project}
                  </div>
                  <div className="w-[20%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center">
                    {user.Project}
                  </div>
                  <div className="w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center">
                    <div
                      className={`px-1 py-1 rounded-lg w-3/5 flex justify-center items-center ${
                        getColor(user.status).bgColor
                      } ${getColor(user.status).textColor}`}
                    >
                      {user.status}
                    </div>
                  </div>
                  <div className="w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs flex items-center">
                    {user.clockIn}
                  </div>
                  <div className="w-[50%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center">
                    {user.clockOut}
                  </div>
                  <div className="w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 text-sm md:text-xs flex items-center">
                    <div className="h-2 flex justify-between w-full">
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
                    </div>
                  </div>
                  <div className="w-[25%] md:w-[14.6%] p-2 border-r border-zinc-500 flex justify-center items-center text-sm md:text-xs">
                    <IconButton>{user.action}</IconButton>
                  </div>
                </Grid>
              ))}
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
}

export default DashBoard;
