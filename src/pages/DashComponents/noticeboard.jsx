import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import useExpandCollapse from "../../hooks/useExpandCollapse";
import Nonoticeboard from "../../pages/DashComponents/Nonoticeboard";
import useLoader from "../../hooks/useLoader";
import useErrorHandler from "../../hooks/useErrorHandler";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import hrimages1 from "../../assets/Interductionimages/Vector-1.png"
import hrimages2 from "../../assets/Interductionimages/Vector-2.png"
import hrimages3 from "../../assets/Interductionimages/Vector-3.png"
import hrimages4 from "../../assets/Interductionimages/Vector.png"
import useFullscreenExpand from "../../hooks/useFullscreenExpand";
import minimizeicon from "../../assets/Interductionimages/expand.png"
import maximizeicon from "../../assets/Interductionimages/maximize.png"
import NoticeBoardMAx from "../NoticeBoard/NoticeHome"



const NoticeBoard = ({ eventData }) => {
  // useExpandCollapse();
  // useFullscreenExpand()
  const [datastore, setStore] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); 
const [isMaximized, setIsMaximized] = useState(false);


const handleToggle = () => setIsMinimized(!isMinimized);


const handleToggleMaximize = () => setIsMaximized(!isMaximized);

  useEffect(() => {
    setStore(eventData)
  }, [eventData])


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const removePTags = (caption) => {
    return caption.replace(/<p>|<\/p>/g, '');
  };

  const getBackgroundColor = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();

    if (day >= 1 && day <= 10) {
      return '#fbbf24'; // yellow
    } else if (day > 10 && day <= 20) {
      return '#10b981'; // green
    } else {
      return '#f97316'; // orange
    }
  };
  const getClassName = (dateString) => {
    const date = new Date(dateString);
    const shortMonth = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);

    return `notice-${shortMonth.toLowerCase()}`
  };

  return (
    <Box
    sx={{
      width: isMaximized ? "100%" : "calc(100%)",
      height: isMaximized ? "100vh" : "auto",
      maxHeight: isMaximized ? "auto" : "241px",
      position: isMaximized ? "fixed" : "relative",
      top: isMaximized ? "0" : "auto",
      left: isMaximized ? "0" : "auto",
      zIndex: isMaximized ? "2000" : "",
      backgroundColor: "background.default",
      padding: "10px",
      margin: "5px auto",
      marginBottom: "11px",
    }}
      className="shadow-lg expandable-div rounded-lg border border-gray-800"
    >

      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} className="collapsible-main ">
        <p style={{ fontSize: "13px" }} className="text-2xl ml-[10px]  border-blue-500">
          Notice Board
        </p>

        <div style={{ display: "flex", gap:isMobile? "20px":"10px", color: "white", marginTop: "9px",marginRight:"15px"  }}>
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
    {isMaximized? (
      <img src={hrimages1} alt="maximize" className="h-3 w-3 expand-button " />
    ) : (
      <img src={maximizeicon} alt="singlecolumn" className="h-3 w-3  expand-button" />
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

      </Box>
     
      <div
        //style={{ marginTop: "-22px" }}
        className="space-y-6 overflow-y-auto h-[340px] px-2 pb-4 collapsible-div"
      >
        {datastore && datastore.length === 0 ? <Nonoticeboard />
          : <>
            {datastore && datastore?.map((event) => (
              <div style={{ marginTop: "11px" }} key={event._id} className="flex gap-4 items-center">
                {/* Date Box */}
                <div
                  className={`w-[45px] h-[45px] rounded-lg flex items-center justify-center ${getClassName(event.updatedAt)}`}
                // Default color; can be dynamic
                >
                  <div
                    className="w-[42px] h-[42px] border-2 border-black rounded-lg flex items-center justify-center"
                  >
                    <p style={{ fontSize: "11px" }} className="text-black text-sm text-center">
                      {event.updatedAt ? formatDate(event.updatedAt) : event.date}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <h1 style={{ fontSize: "12px" }} className="text-white text-sm font-small">{event.title}</h1>
                  <p style={{ fontSize: "9.8px" }} className="text-gray-400 text-sm">{event.caption ? removePTags(event.caption) : event.description}</p>
                </div>
              </div>

            ))
        }
          </>
        }
      </div>
      {/* ):( ""
      //   <div
     
      //   style={{
      //     backgroundColor: "background.view",
      //     height: "81.3vh",
      //     width: "90.5vw",
      //     zIndex:"1000",
      //   position:"relative",
      //   left:'-5px'
       
  
      //   }}
      // >
      // <NoticeBoardMAx />
      // </div>
      )} */}

      {/* Hide Scrollbar */}
      <style jsx>{`
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
            .overflow-y-auto {
              scrollbar-width: none;
            }
          `}</style>
    </Box>
  );
};

export default NoticeBoard;
