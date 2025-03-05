import React, { useCallback, useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaEye } from "react-icons/fa";
import dayjs from "dayjs";
import { BorderColor, BorderStyle } from "@mui/icons-material";
import axios from "axios";
import { Modal, Box, Typography, Avatar, IconButton, Grid, useMediaQuery, useTheme, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { text } from "@fortawesome/fontawesome-svg-core";
import hrimages1 from "../../assets/Interductionimages/Vector-1.png"
import hrimages2 from "../../assets/Interductionimages/Vector-2.png"
import hrimages3 from "../../assets/Interductionimages/Vector-3.png"
import hrimages4 from "../../assets/Interductionimages/Vector.png"
import { Link } from 'react-router-dom';
import useExpandCollapse from "../../hooks/useExpandCollapse";
import Norecentattendence from "./Norecentattendence";
import minimizeicon from "../../assets/Interductionimages/expand.png"
import maximizeicon from "../../assets/Interductionimages/maximize.png"

const attendanceData = [
  {
    id: "#193845039283",
    name: "Richard Webber",
    role: "UI/UX Designer",
    date: "22/10/2024",
    status: "Present",
    clockIn: "09:00:17 AM",
    clockOut: "Not yet clocked out",
    shift: "AM",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: "#995830128543",
    name: "Desmond Jakes",
    role: "Frontend Developer",
    date: "22/10/2024",
    status: "Late",
    clockIn: "09:40:17 AM",
    clockOut: "Not yet clocked out",
    shift: "AM",
    avatar: "https://i.pravatar.cc/40?img=8",
  },
  {
    id: "#995839202395",
    name: "Jaxson Schleifer",
    role: "Frontend Developer",
    date: "22/10/2024",
    status: "Present",
    clockIn: "09:00:03 AM",
    clockOut: "Not yet clocked out",
    shift: "AM",
    avatar: "https://i.pravatar.cc/40?img=10",
  },
  {
    id: "#294857104856",
    name: "Cynthia Eze",
    role: "Software Engineer",
    date: "22/10/2024",
    status: "Present",
    clockIn: "09:00:05 AM",
    clockOut: "Not yet clocked out",
    shift: "AM",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: "#775839203848",
    name: "Erin Herwitz",
    role: "Digital Marketer",
    date: "22/10/2024",
    status: "Present",
    clockIn: "09:00:07 AM",
    clockOut: "Not yet clocked out",
    shift: "AM",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: "#775839205548",
    name: "Erin Herwitz",
    role: "Digital Marketer",
    date: "22/10/2024",
    status: "Present",
    clockIn: "09:00:07 AM",
    clockOut: "Not yet clocked out",
    shift: "AM",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
];


const StatusBadge = ({ status }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const statusStyles =
    status === "Present"
      ? "bg-[#42B8240F] text-[#6FE053] border-[#6FE053]"
      : status === "Late"
        ? "bg-[#F13B3B0F] text-[#F13B3B] border-[#F13B3B]"
        : "bg-gray-200 text-gray-600 border-gray-600"; // Fallback for other statuses

  return (
    <span
      className={`flex items-center justify-center rounded-full  font-semibold border ${statusStyles} ${isMobile ? "w-10 h-6 text-[6px]" : "w-24 h-8 text-xs"
        }`} // Adjust width, height, and text size for mobile
    >
      {status}
    </span>
  );
};

const RecentAttendance = ({ attendanceData = [], isDashboardCall }) => {
  useExpandCollapse();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [selectedEmp, setSelectedEmp] = React.useState();
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // For first icon
  const [isMaximized, setIsMaximized] = useState(true);


  const handleToggle = () => setIsMinimized(!isMinimized);


  const handleToggleMaximize = () => setIsMaximized(!isMaximized);

  const handleClose = () => {
    setOpen(false);
  };
  function previewEmployee(emp) {
    console.log("empid", emp);
    setSelectedEmp(emp);
    setOpen(true);
  }
  const [attendance, setAttendance] = useState(attendanceData);
  const fetchAttendanceData = useCallback(async () => {
    try {
      const response = await axios.get(`/hr/attendance/recent`);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setAttendance(response.data.attendance)
    } catch (e) {
      console.log(e);
    }
  }, []);
  
    useEffect(() => {
      if (!isDashboardCall)
        fetchAttendanceData();
      else
        setAttendance(attendanceData)
  
    }, [])

  // useEffect(() => {
  //     fetchAttendanceData();
  // }, [])
  //useEffect(() => {setAttendance(attendanceData)},[attendanceData])

  return (<>
    {selectedEmp && selectedEmp.employeeData && <Modal open={open} onClose={handleClose} aria-labelledby="user-shift-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          borderRadius: 2
        }}

      >
        {/* Modal Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt="User Name" src={`https://ui-avatars.com/api/?name=${selectedEmp.employeeData.firstName} ${selectedEmp.employeeData.lastName}`} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" component="h2">
                {selectedEmp.employeeData.firstName + " " + selectedEmp.employeeData.lastName}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {selectedEmp.employeeData.role || ""}
              </Typography>
            </Box>
          </Box>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Modal Body */}
        <Grid container spacing={2} className="modal-body-attendance">
          {/* First Column */}
          <Grid item xs={6}>
            <Typography variant="body2"><strong>Shift:</strong><br />{dayjs(selectedEmp.clockInTime).format("A")}</Typography>
            <Typography variant="body2"><strong>Date:</strong><br />{dayjs(selectedEmp.clockInTime).format("DD/MM/YYYY")}</Typography>
            <Typography variant="body2"><strong>Work Status:</strong> <br />In Progress</Typography>
            <Typography variant="body2"><strong>Clock-In Time:</strong><br />{dayjs(selectedEmp.clockInTime).format("hh:mm:ss A")}</Typography>
          </Grid>

          {/* Second Column */}
          <Grid item xs={6}>
            <Typography variant="body2"><strong>Shift Time:</strong><br /> 9AM - 5PM</Typography>
            <Typography variant="body2"><strong>Shift Duration:</strong><br /> 8 hrs</Typography>
            <Typography variant="body2"><strong>Shift Status:</strong><br /> {selectedEmp.status}</Typography>
            <Typography variant="body2"><strong>Clock-Out Time:</strong><br />{selectedEmp.clockOutTime ? dayjs(selectedEmp.clockOutTime).format("hh:mm:ss A") : "Not yet clocked out"}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>}
    <div className={`w-full h-full rounded-lg expandable-div ${isMobile ? "mt-[5px]" : "mt-1"} border border-gray-800`}>
      {/* Header */}
      <Box
        p={2}
        sx={{
          backgroundColor: "background.default",
          //padding: "10px",
          borderRadius: "12px",
          width: "auto",
          height: { xs: "auto" },
        }}
      >
        <div className="flex items-center justify-between collapsible-main ">
          <Typography variant="h6" sx={{ fontSize: isMobile ? "13px" : "13px", mr: "10px", whiteSpace: "nowrap" }}>
            Recent Attendance
          </Typography>
          <div style={{ display: "flex", gap: '10px', }}>
            <div style={{ display: "flex", gap: isMobile ? "20px" : "10px", color: "white", marginTop: "9px" }}>
              {/* Hover effect for Minimize icon (hrimages4) */}
              <div
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => setIsHovered(isMinimized ? "expand" : "minimize")}
                onMouseLeave={() => setIsHovered(null)}
                onClick={handleToggle} // Unique class for the toggle button
              >
                {isMinimized ? (
                  <img src={hrimages4} alt="expand" className="h-3 w-3 collapse-div" />
                ) : (
                  <img src={minimizeicon} alt="minimize" className="h-3 w-3 collapse-div " />
                )}

                {(isHovered === "minimize" || isHovered === "expand") && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-28px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#2f456c",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "3px",
                      fontSize: "10px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isMinimized ? "expand" : "Minimize"}
                  </div>
                )}
              </div>



              {/* Hover effect for Maximize icon (hrimages1) */}
              {!isMobile && (
                <div
                  style={{ position: "relative", display: "inline-block" }}
                  onMouseEnter={() => setIsHovered(isMaximized ? "maximize" : "singlecolumn")}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={handleToggleMaximize}
                >
                  {isMaximized ? (
                    <img src={hrimages1} alt="maximize" className="h-3 w-3 expand-button " />
                  ) : (
                    <img src={maximizeicon} alt="singlecolumn" className="h-3 w-3  expand-button " />
                  )}

                  {(isHovered === "maximize" || isHovered === "singlecolumn") && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-28px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#2f456c",
                        color: "#fff",
                        padding: "5px 10px",
                        borderRadius: "3px",
                        fontSize: "10px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isMaximized ? "maximize" : "singlecolumn"}
                    </div>
                  )}
                </div>
              )}

              {/* Hover effect for Refresh icon (hrimages2) */}
              <div
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => setIsHovered("refresh")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <img src={hrimages2} alt="Refresh" className="h-3 w-3" />
                {isHovered === "refresh" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-28px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#2f456c",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "3px",
                      fontSize: "10px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Refresh
                  </div>
                )}
              </div>

              {/* Hover effect for Settings icon (hrimages3) */}
              <div
                style={{ position: "relative", display: "inline-block" }}
                onMouseEnter={() => setIsHovered("settings")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <img src={hrimages3} alt="Settings" className="h-3 w-3" />
                {isHovered === "settings" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-28px",
                      left: "-10px",
                      transform: "translateX(-50%)",
                      backgroundColor: "#2f456c",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "3px",
                      fontSize: "10px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    copy link
                  </div>
                )}
              </div>
            </div>
            {isDashboardCall && <Link to="/RecentAttendence">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#3767B1",
                  fontSize: "10px",
                  color: "white",
                  textTransform: "none",
                  height: "25px",
                  width: "80px",
                  display: isMobile ? "none" : "inline-flex", // Hide on mobile
                }}
              >
                View All
              </Button>
            </Link>
            }
          </div>
        </div>

        <div
          style={{
            overflow: "auto",
            scrollbarWidth: "none", // Hides scrollbar in Firefox
            msOverflowStyle: "none", // Hides scrollbar in older Internet Explorer versions
          }}
          className="collapsible-div"
        >
          {attendance.length === 0 ? <Norecentattendence /> : <>
            <table className="w-full text-left border-collapse border-spacing-0 ">
              <thead>
                <tr>
                  <th className={`text-gray-400 text-sm py-3 ${isMobile ? "pr-[10px] text-[10px]" : ""}`}>EmployeeID</th>
                  <th className={`text-gray-400 text-sm py-3 ${isMobile ? "pl-[50px] text-[10px]" : ""}`}>Employee</th>
                  <th className={`text-gray-400 text-sm py-3 ${isMobile ? "pl-[50px] text-[10px]" : ""}`}>Date</th>
                  <th className={`text-gray-400 text-sm py-3 ${isMobile ? "pl-[50px] text-[10px]" : ""}`}>Status</th>
                  <th className={`text-gray-400 text-sm py-3 ${isMobile ? "pl-[50px] text-[10px]" : ""}`}>ClockIn</th>
                  <th className={`text-gray-400 text-sm py-3 ${isMobile ? "pl-[50px] text-[10px]" : ""}`}>ClockOut</th>
                  <th className={`text-gray-400 text-sm py-3 ${isMobile ? "pl-[50px] text-[10px]" : ""}`}>Shift</th>
                  <th className={`text-gray-400 text-sm py-3 ${isMobile ? "pl-[50px] text-[10px]" : ""}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendance ? attendance?.map((entry) => (
                  <tr key={entry._id}>
                    <td className={`py-5 truncate ${isMobile ? "pl-[10px] text-[10px]" : ""}`}>{entry.employeeId}</td>
                    <td className={`flex items-center space-x-4 py-5 ${isMobile ? "pl-[10px] text-[10px]" : ""}`}>
                      <img
                        src={`https://ui-avatars.com/api/?name=${entry.employeeData.firstName} ${entry.employeeData.lastName}`}
                        alt={entry.employeeData.firstName + " " + entry.employeeData.lastName}
                        className={`${isMobile
                          ? "pl-[10px] ml-[10px] w-5 h-5 rounded-full"
                          : "w-10 h-10 rounded-full"
                          }`}
                      />
                      <div>
                        <p
                          style={{
                            fontFamily: "sans-serif",
                            fontSize: isMobile ? "10px" : "14px",
                          }}
                          className="truncate"
                        >
                          {entry.employeeData.firstName + " " + entry.employeeData.lastName}
                        </p>
                        <p className={`text-gray-400 truncate ${isMobile ? "text-[6px]" : "text-xs"}`}>{entry.employeeData.role || ""}</p>
                      </div>
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif", fontSize: "13px" }}
                      className={`py-5 ${isMobile ? "pl-[40px] text-[10px]" : ""}`}
                    >{dayjs(entry.clockInTime).format("DD/MM/YYYY")}</td>
                    <td className={`py-5 ${isMobile ? "pl-[40px] text-[10px]" : ""}`}>
                      <StatusBadge sx={{ fontWeight: "100", }} status={entry.status} />
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif", fontSize: "13px" }}
                      className={`py-5 ${isMobile ? "pl-[40px] text-[10px]" : ""}`}
                    >{dayjs(entry.clockInTime).format("hh:mm:ss A")}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif", fontSize: "13px" }}
                      className={`py-5 truncate ${isMobile ? "pl-[40px] text-[10px]" : ""}`}
                    >
                      {entry.clockOutTime ? dayjs(entry.clockOutTime).format("hh:mm:ss A") : "Not yet clocked out"}
                    </td>
                    <td
                      style={{ fontFamily: "sans-serif", fontSize: "13px" }}
                      className={`py-5 ${isMobile ? "pl-[50px] text-[10px]" : ""}`}
                    >
                      {dayjs(entry.clockInTime).format("A")}
                    </td>
                    <td className={`flex items-center space-x-4 py-5 ${isMobile ? "pl-[40px] text-[10px]" : ""}`}>
                      <button className="text-green-400">
                        <FaPhoneAlt />
                      </button>
                      <button className="text-blue-400">
                        <FaEnvelope />
                      </button>
                      <button className="text-gray-400">
                        <FaEye onClick={() => { previewEmployee(entry) }} />
                      </button>
                    </td>
                  </tr>
                ))
                  : "loading..."
                }
              </tbody>
            </table></>}

          {isMobile && <Link to="/RecentAttendance"><div className=" mt-4">
            <button
              style={{ color: "blue" }}
              className={`px-4 py-2 rounded-md text-sm font-medium`}
            >
              View All
            </button>
          </div>
          </Link>
          }
        </div>


      </Box>
    </div>
  </>
  );
};

export default RecentAttendance;