import React, { useCallback, useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Charts from "../DashComponents/charts";
import NoticeBoard from "../DashComponents/noticeboard";
import UpcomingEvents from "../DashComponents/upcomingevents";
import Bars from "../DashComponents/bars";
import RecentActivity from "../DashComponents/recent";
import GenderChart from "../DashComponents/GenderChart";
import RecentJobs from "../DashComponents/recentJobs";
import Attendance from "../DashComponents/attend";
import { Box } from "@mui/material";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pending from "@mui/icons-material/Pending";
import TimerImage from "../../assets/Icons/f7_timer.png";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ProjectMilesTone from "./ProjectMilstone";
import ProjectActivity from "./ProjectActivity";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { DashboardOutlined, Settings } from "@mui/icons-material";
import ProjectChart from "../DashComponents/ProjectChart";
import totalprojicon from "../../assets/Icons/totalprojicon.png";
import completedprojicon from "../../assets/Icons/completedprojicon.png";
import ongoingprojicon from "../../assets/Icons/ongoingprojicon.png";
import pendingprojicon from "../../assets/Icons/pendingprojicon.png";
import htmlicon from "../../assets/Icons/htmlicon.png";
import figmaicon from "../../assets/Icons/figmaicon.png";
import fluttericon from "../../assets/Icons/fluttericon.png";
import adobeicon from "../../assets/Icons/adobeicon.png";

function Dashboard() {
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
    return overview && overview.length >1  && overview?.filter((project) => project.status === status).length;
  };

  const totalProjects =  overview ? overview.length : 0 ;
  const completedProjects = countProjectsByStatus('Completed');
  const ongoingProjects = countProjectsByStatus('Ongoing');
  const pendingProjects = countProjectsByStatus('Pending');

  console.log(
    "totalProjects0",
    totalProjects,
    completedProjects,
    ongoingProjects,
    pendingProjects
  );

  const barsData = [
    { name: "Thu", inProgress: 50, pending: 20, completed: 30 },
    { name: "Sun", inProgress: 30, pending: 20, completed: 20 },
    { name: "Tue", inProgress: 20, pending: 50, completed: 5 },
    { name: "Fri", inProgress: 30, pending: 20, completed: 41 },
    { name: "Sat", inProgress: 20, pending: 0, completed: 40 },
    { name: "Mon", inProgress: 30, pending: 20, completed: 50 },
    { name: "Wed", inProgress: 50, pending: 10, completed: 40 },
  ];

  const btn = [
    { btn: "Low" },
    { btn: "Medium" },
    { btn: "Medium" },
    { btn: "High" },
  ];
  const boxesData = [
    {
      icon: <img alt="" src={totalprojicon} />,
      title: "Total Projects",
      value: (
        <div className="text-[#3767B1] text-[25px] font-[700] leading-[32.55px] md:text-[28px] md:font-[700] md:leading-[47.57px]">
          {totalProjects ? totalProjects : "0"}
        </div>
      ),
      description: "124 for last month",
      trendIcon: <TrendingUp className="text-green-500" />,
    },
    {
      icon: <img alt="" src={completedprojicon} />,
      title: "Completed Projects",
      value: (
        <div className="text-[#42B824] text-[25px] font-[700] leading-[32.55px] md:text-[28px] md:font-[700] md:leading-[47.57px]">
          {completedProjects ? completedProjects : "0"}
        </div>
      ),
      description: "124 for last month,",
      trendIcon: <TrendingDown className="text-red-500" />,
    },
    {
      icon: <img alt="" src={ongoingprojicon} />,
      title: "Ongoing Projects",
      value: (
        <div className="text-[#50E3C2] text-[25px] font-[700] leading-[32.55px] md:text-[28px] md:font-[700] md:leading-[47.57px]">
          {ongoingProjects ? ongoingProjects : "0"}
        </div>
      ),
      description: "124 for last month,",
      trendIcon: <TrendingDown className="text-red-500" />,
    },

    {
      icon: (
        <img alt="" src={pendingprojicon} />
        // <img
        //   src={TimerImage}
        //   alt="GroupIcon"
        //   className="text-white  p-2 rounded-lg"
        //   style={{
        //     fontSize: "large",
        //     color: "white",
        //     backgroundColor: "rgb(234 122 105)",
        //   }}
        // />
      ),
      title: "Pending Projects",
      value: (
        <div className="text-[#FF9B05] text-[25px] font-[700] leading-[32.55px] md:text-[28px] md:font-[700] md:leading-[47.57px]">
          {pendingProjects ? pendingProjects : "0"}
        </div>
      ),
      description: "124 for last month",
    },
  ];
  const boxesData1 = [
    {
      icon: <img alt="" className="w-[50px] " src={figmaicon} />,
      title: "Figma",
      value: (
        <div className="md:text-[13px] md:font-[400] md:leading-[23.44px] text-[#A5A5A5]">
          Designing Departments
        </div>
      ),
      description: "124 for last month",
      trendIcon: <TrendingUp className="text-green-500" />,
      standard: (
        <p className="font-[400]  leading-[15.6px] rounded-[5px] border border-[#42B824] py-[4px] px-[] text-center h-[25px] w-[51px] text-[10px] text-[#32FC00]">
          Low
        </p>
      ),
    },
    {
      icon: <img alt="" className="w-[50px] " src={htmlicon} />,
      title: "HTML",
      value: (
        <div className="md:text-[13px] md:font-[400] md:leading-[23.44px] text-[#A5A5A5]">
          Frontend Departments
        </div>
      ),
      description: "124 for last month,",
      trendIcon: <TrendingDown className="text-red-500" />,
      standard: (
        <p className="font-[400]  leading-[15.6px] rounded-[5px] border border-[#FF9B05] py-[4px] px-[] text-center h-[25px] w-[51px] text-[10px] text-[#FF9B05]">
          Medium
        </p>
      ),
    },
    {
      icon: <img alt="" className="w-[50px] " src={adobeicon} />,
      title: "Abode XD",
      value: (
        <div className="md:text-[13px] md:font-[400] md:leading-[23.44px] text-[#A5A5A5]">
          Designing Departments
        </div>
      ),
      description: "124 for last month,",
      trendIcon: <TrendingDown className="text-red-500" />,
      standard: (
        <p className="font-[400]  leading-[15.6px] rounded-[5px] border border-[#FF9B05] py-[4px] px-[] text-center h-[25px] w-[51px] text-[10px] text-[#FF9B05]">
          Medium
        </p>
      ),
    },
    {
      icon: <img alt="" className="w-[50px] " src={fluttericon} />,
      title: "Flutter",
      value: (
        <div className="md:text-[13px] md:font-[400] md:leading-[23.44px] text-[#A5A5A5]">
          Engineering Departments
        </div>
      ),
      description: "124 for last month",
      trendIcon: <TrendingDown className="text-red-500" />,
      standard: (
        <p className="font-[400]  leading-[15.6px] rounded-[5px] border border-[#FF0000] py-[4px] px-[] text-center h-[25px] w-[51px] text-[10px] text-[#FF0000]">
          High
        </p>
      ),
    },
  ];
  // const eventData = [
  //     { date: '5 Mar', title: 'Board Meeting', description: 'Attend board meeting with company manager.', backgroundColor: '#fbbf24' },
  //     { date: '9 Mar', title: 'Design Team Meeting', description: 'Attend design team meeting with team mates and HOD.', backgroundColor: '#dc2626' },
  //     { date: '7 Feb', title: 'Tech Conference', description: 'Attend conference with teammates and other departments.', backgroundColor: '#f97316' },
  //     { date: '4 Mar', title: 'Development Team Pitch', description: 'Pitch idea on new development to the company board,', backgroundColor: '#3b82f6' },
  // ];

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

  return (
    <Box
      sx={{
        backgroundColor: "background.main",
        borderTopRightRadius: "15px",
        borderTopLeftRadius: "15px",
        marginX: "10px",
        padding: "0",
      }}
    >
      <div className="flex flex-col  rounded-t-[15px]">
        <div className="p-2 md:py-2 md:px-6">
          <div className="flex items-center justify-between md:w-full py-8 md:p-4">
            <div className="">
              <h1 className=" text-neutral-500 text-[18px] leading-[26.04px] md:text-[25px] font-[500] md:leading-[39.06px]">
                Project Dashboard
              </h1>
            </div>
            <div className="flex flex-row items-center justify-center gap-3">
              {/* <button className="text-[13px] font-[500] leading-[32.5px]  rounded-[5px] py-[5px] px-[15px]">
               
              </button> */}

              <Button variant="contained" > Create New</Button>

              <div className=" p-[8px] rounded-[5px]">
                {" "}
                <InfoOutlinedIcon  />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-4/4">
              <div className="flex flex-col gap-4 mb-4 md:flex-row">
                {boxesData.map((box, index) => (
                  <Grid
                    sx={{
                      backgroundColor: "background.view",
                      borderRadius: "8px",
                    }}
                    key={index}
                    className="rounded-lg p-4 shadow-md md:w-1/2"
                  >
                    <div className="flex items-center justify-between">
                      {" "}
                      <div className="">
                        {" "}
                        <p className="text-[15px] text-nowrap font-[500] leading-[19.53px] md:text-[16px] md:font-[500] md:leading-[23.44px]">
                          {box.title}
                        </p>
                        <p className="w-5/6 text-[23px] leading-[32.55px] md:text-[35px] md:font-[700] md:leading-[47.57px]">
                          {box.value}
                        </p>
                      </div>
                      <div className="flex justify-end w-1/6">{box.icon}</div>
                    </div>
                  </Grid>
                ))}
              </div>
            </div>
          </div>
          <div className="pb-[15px]">
            <div className="text-[18px] mt-3 md:mt-0 font-[500] leading-[26.04px] md:text-[20px] md:leading-[32.55px] md:text-neutral-500">
              Recent Project Update
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-4/4">
              <div className="flex flex-col gap-4 mb-4 md:flex-row md:flex-row">
                {overview && overview.length > 0 &&   overview.slice(0,4).map((box, index) => (
                  <Grid
                    sx={{
                      backgroundColor: "background.view",
                      borderRadius: "8px",
                    }}
                    key={index}
                    className="relative rounded-lg p-4 shadow-md md:w-1/2"
                  >
                    <p className="text-[15px] font-[500] leading-[19.53px] md:text-[18px]">
                      {" "}
                      {box.title.length > 10
                        ? `${box.title.substring(0, 15)}...`
                        : box.title}
                    </p>

                    <div className="flex items-center mb-[16px] mt-[-9px]">
                      <p className="text-[11px] leading-[13.02px] font-[400] w-5/6 ">
                        {" "}
                        {/* {(() => {
                  
                   const stripHtmlAndTruncate = (html, maxLength) => {
                     const strippedText = html.replace(/<[^>]+>/g, "");
                     return strippedText.length > maxLength
                       ? `${strippedText.substring(0, 15)}...`
                       : strippedText;
                   };

                 
                   return stripHtmlAndTruncate(box.description, 50); 
                 })()} */}
                        {box.value}
                      </p>
                      <div
                        className="flex justify-end w-1/6"
                        style={{ padding: "0" }}
                      >
                        {box.icon}
                      </div>
                    </div>
                    <div className="mb-[10px] mt-[2px]">
                      <p className="text-[10px] font-[400] leading-[13.02px] md:text-[9px] text-[#A5A5A5]">
                        Mobile App Ui Design
                        {box.description && box.description.toString().replace(/<[^>]*>/g, '').substring(0, 12)}
                        </p>
                    </div>

                    <div
                      className="absolute left-0 top-[113px] md:top-[105px] border-1 w-full"
                      style={{ border: "0.5px solid #262626" }}
                    ></div>

                    <div className="flex items-center justify-between gap-2 pt-3">
                    <div className="flex ">
                {box.assignedTo &&
                  box.assignedTo.map((item, index) => (
                    <div
                      key={index}
                      className="MuiAvatar-root border-2 border-[#171717] MuiAvatar-circular css-1m7vhif-MuiAvatar-root"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "-5px",
                      }}
                    >
                      <img alt={item.firstName} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s' />
                    </div>
                  ))}
              </div>
             
                      <div
                        className="text-cnter row"
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        {" "}
                        {box.standard}
                        <span>
                          <MoreVertIcon sx={{ fontSize: "20px" }} />
                        </span>
                      </div>
                    </div>
                  </Grid>
                ))}
              </div>
              {/* <Charts data={data} /> */}
            </div>
            {/* <div className="w-full md:w-1/4">
                    <NoticeBoard eventData={overview?.notices} />
                    <UpcomingEvents />
                </div> */}
          </div>
        </div>
        <div className="w-full gap-3  flex flex-col md:flex-row px-2 md:px-5">
          <div className="w-full md:w-8/12 mx-1 mb-2 md:mb-0">
            <ProjectChart barsData={barsData} />
          </div>
          <div className="w-full md:w-4/12 mx-1 mb-2 md:mb-0">
            <ProjectMilesTone />
          </div>
        </div>
        <div className="w-full gap-3 flex flex-col md:flex-row px-2 md:px-5">
          <div className="w-full md:w-8/12 mx-1 mb-2 md:mb-0 ">
            <ProjectActivity  overview={overview} />
          </div>
          <div className="w-full md:w-4/12 mx-1 mb-2 md:mb-0 ">
            <GenderChart overview={overview} />
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Dashboard;
