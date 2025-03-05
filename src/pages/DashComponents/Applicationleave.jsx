import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Typography, Avatar, LinearProgress } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useMessage } from "../../components/Header";
import axios from "axios";
import hrimages1 from "../../assets/Interductionimages/Vector-1.png";
import hrimages2 from "../../assets/Interductionimages/Vector-2.png";
import hrimages3 from "../../assets/Interductionimages/Vector-3.png";
import hrimages4 from "../../assets/Interductionimages/Vector.png";
import Nonoticeboard from "../../pages/DashComponents/Nonoticeboard";
import Noleaveapplication from "./Noleaveapplication";
import minimizeicon from "../../assets/Interductionimages/expand.png";
import maximizeicon from "../../assets/Interductionimages/maximize.png";

const Applicationleave = (props) => {
  //console.log("eventData",eventData);
  //eventData=eventData.eventData
  const { eventData, fetchOverview } = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let initialLeaveData = {};
  if (eventData) {
    const dates = eventData.dates;
    const from =
      dates && dates[0]
        ? dayjs(`${dates[0].year}-${dates[0].month}-${dates[0].day}`).format(
            "DD/MM/YYYY"
          )
        : "";
    // const to = dayjs(`${dates[1].year}-${dates[1].month}-${dates[1].day}`).format('DD/MM/YYYY');

    // Calculate the difference in days
    const daysDifference =
      dates && dates[1]
        ? dayjs(`${dates[1].year}-${dates[1].month}-${dates[1].day}`).diff(
            dayjs(`${dates[0].year}-${dates[0].month}-${dates[0].day}`),
            "day"
          )
        : 1;
    // Initial leave data
    initialLeaveData = {
      _id: eventData._id,
      name: eventData.fullName,
      role: eventData.department,
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
      leaveDate: from,
      days: daysDifference,
      appliedOn: dayjs(eventData.createdAt).format("DD-MM-YYYY"),
      remainingLeaves: 12,
      totalLeaves: 12, // Assuming the user has a total of 12 leaves
      reason: eventData.reason,
    };
  }

  // State to manage leave data
  const [leaveData, setLeaveData] = useState(initialLeaveData);
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // For first icon
  const [isMaximized, setIsMaximized] = useState(true);

  const handleToggle = () => setIsMinimized(!isMinimized);

  const handleToggleMaximize = () => setIsMaximized(!isMaximized);

  useEffect(() => {
    setLeaveData(initialLeaveData);
  }, [initialLeaveData]);
  const { showError, showSuccess } = useMessage();
  const [acceptLoading, setAcceptLoading] = useState(false);
  const acceptLeave = useCallback(
    async function (id) {
      setAcceptLoading(true);
      try {
        const res = await axios.post(`/hr/attendance/leaves/approve/${id}`);
        fetchOverview();
        const { success, message } = res.data;
        if (success) return showSuccess(message);
        showError(message);
      } catch (e) {
        console.log(e);
      } finally {
        setAcceptLoading(false);
      }
    },
    [fetchOverview, showSuccess, showError]
  );

  const rejectLeave = useCallback(
    async function (id) {
      try {
        const res = await axios.post(`/hr/attendance/leaves/deny/${id}`);
        fetchOverview();
        const { success, message } = res.data;
        if (success) return showSuccess(message);
        showError(message);
      } catch (e) {
        showError(e);
      }
    },
    [fetchOverview, showSuccess, showError]
  );

  // Calculate the progress based on remaining leaves
  const progress =
    ((leaveData.totalLeaves - leaveData.remainingLeaves) /
      leaveData.totalLeaves) *
    100;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        borderRadius: "10px",
        padding: "17px",

        height: "100%",
        // maxHeight: "220px",
        width: "100%",

        margin: " auto",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        //marginTop: "-1px"
      }}
      
      className="border border-gray-800"

    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: "-10px",
          gap: "9px",
        }}
        className="collapsible-main "
      >
        <p style={{ fontSize: "13px" }} className=" marginTop- 20px ">
          Recent Leave Application
        </p>

        <div className="flex flex-row gap-3">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              color: "white",
              marginLeft: isMobile ? "100px" : "",
              marginTop: "10px ",
            }}
          >
            {/* Hover effect for Minimize icon (hrimages4) */}
            <div
              style={{ position: "relative", cursor: "pointer" }}
              onMouseEnter={() =>
                setIsHovered(isMinimized ? "expand" : "minimize")
              }
              onMouseLeave={() => setIsHovered(null)}
              onClick={handleToggle} // Unique class for the toggle button
            >
              {isMinimized ? (
                <img
                  src={hrimages4}
                  alt="expand"
                  className="h-3 w-3 collapse-div"
                />
              ) : (
                <img
                  src={minimizeicon}
                  alt="minimize"
                  className="h-3 w-3 collapse-div "
                />
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
                onMouseEnter={() =>
                  setIsHovered(isMaximized ? "maximize" : "singlecolumn")
                }
                onMouseLeave={() => setIsHovered(null)}
                onClick={handleToggleMaximize}
              >
                {isMaximized ? (
                  <img
                    src={hrimages1}
                    alt="maximize"
                    className="h-3 w-3 expand-button "
                  />
                ) : (
                  <img
                    src={maximizeicon}
                    alt="singlecolumn"
                    className="h-3 w-3  expand-button "
                  />
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
          <Link to="/leaveapplication/view">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3767B1",
                fontSize: "10px",
                color: "white",
                textTransform: "none",
                height: "25px",
                width: "80px",
                marginTop: isMobile ? "-10px" : "",
                display: isMobile ? "none" : "inline-flex",
                // Hide on mobile
              }}
            >
              View All
            </Button>
          </Link>
        </div>
      </Box>
      <div className="h-full w-full flex justify-center items-center collapsible-div">
        {eventData ? (
          <div className=" mt-4">
            <div
              style={{ marginTop: "8px" }}
              className="flex items-center gap-4 mb-4"
            >
              <Avatar
                src={`https://ui-avatars.com/api/?name=${leaveData.name}`}
                alt={leaveData.name}
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "25px",
                  marginTop: "-14px",
                }}
              />
              <div>
                <Typography
                  sx={{ fontSize: "13px", marginTop: "-8px" }}
                  variant="h6"
                >
                  {leaveData.name}
                </Typography>
                <Typography
                  sx={{ fontSize: "11px" }}
                  className="text-gray-400 text-sm"
                >
                  {leaveData.role}
                </Typography>
              </div>
            </div>

            <div
              style={{ marginTop: "-12px" }}
              className="flex items-center gap-4 mb-4"
            >
              <CalendarMonthIcon
                sx={{ color: "#9ca3af", height: "16px", marginTop: "-5px" }}
              />
              <div style={{ display: "flex" }}>
                <Typography sx={{ fontSize: "11px", fontWeight: "bold" }}>
                  {leaveData.leaveDate}
                </Typography>
                <Button
                  size="small"
                  sx={{
                    textTransform: "none",
                    height: "18px",
                    width: "14px",
                    minWidth: "43px",
                    marginLeft: "17px",
                    fontSize: "7px",
                    color: "white",
                    backgroundColor: "#3DA6DC4D",
                    "&:hover": { backgroundColor: "#3b82f6", color: "#fff" },
                  }}
                >
                  {leaveData.days} Day
                </Button>
              </div>
            </div>

            <Typography
              className="text-gray-400 text-xs mb-2"
              sx={{ marginBottom: "8px", fontSize: "10px", marginTop: "-16px" }}
            >
              Applied On: {leaveData.appliedOn}
            </Typography>

            {/* Indicator for Leave Status */}
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: "4px",
                borderRadius: "4px",
                marginY: "8px",
                backgroundColor: "#4b5563",
                "& .MuiLinearProgress-bar": { backgroundColor: "#3b82f6" },
              }}
            />

            <div
              style={{ fontSize: "10px" }}
              className="flex justify-between items-center mb-4"
            >
              <Typography
                sx={{ fontSize: "10px", marginTop: "-8px" }}
                variant="body2"
                className="text-gray-400"
              >
                Remaining Leaves
              </Typography>
              <Typography sx={{ fontSize: "10px" }} className="text-white">
                {leaveData.remainingLeaves}
              </Typography>
            </div>

            <Typography
              sx={{ marginTop: "-22px", fontSize: "12px", fontWeight: "bold" }}
              variant="subtitle1"
              className="mb-2"
            >
              Reason
            </Typography>
            <Typography
              sx={{ fontSize: "9px" }}
              className="text-gray-400 text-sm mb-4"
            >
              {leaveData.reason}
            </Typography>

            <div className="flex justify-between gap-2">
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#3b82f6",
                  color: "#3b82f6",
                  textTransform: "none",
                  borderRadius: "8px",
                  fontSize: "12px",
                  width: "140px",
                  height: "24px",
                  fontWeight: "none",
                  "&:hover": {
                    backgroundColor: "#3b82f6",
                    color: "#fff",
                    borderColor: "#3b82f6",
                  },
                }}
                disabled={acceptLoading}
                onClick={() => acceptLeave(leaveData?._id)}
              >
                Accept
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#ef4444",
                  color: "#ef4444",
                  textTransform: "none",
                  borderRadius: "8px",
                  fontSize: "12px",
                  height: "24px",
                  width: "140px",
                  "&:hover": {
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    borderColor: "#ef4444",
                  },
                }}
                onClick={() => rejectLeave(leaveData?._id)}
              >
                Reject
              </Button>
            </div>
          </div>
        ) : (
          <Noleaveapplication />
        )}
      </div>
    </Box>
  );
};

export default Applicationleave;
