import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import useExpandCollapse from "../../hooks/useExpandCollapse";
import NoMemoboard from "./NoMemoboard";
import hrimages1 from "../../assets/Interductionimages/Vector-1.png";
import hrimages2 from "../../assets/Interductionimages/Vector-2.png";
import hrimages3 from "../../assets/Interductionimages/Vector-3.png";
import hrimages4 from "../../assets/Interductionimages/Vector.png";
import useFullscreenExpand from "../../hooks/useFullscreenExpand";
import minimizeicon from "../../assets/Interductionimages/expand.png";
import maximizeicon from "../../assets/Interductionimages/maximize.png";

const HolidayBoard = ({ isSidebarOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [datastore, setStore] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false); // For first icon
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  const handleToggle = () => setIsMinimized(!isMinimized);

  const handleToggleMaximize = () => setIsMaximized(!isMaximized);

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
      className="rounded-lg expandable-div border border-gray-800 "
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        className="collapsible-main "
      >
        <p style={{ fontSize: "13px" }} className="text-2xl  border-blue-500">
          Memo Board
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            color: "white",
            marginTop: "9px",
            marginRight: "20px",
          }}
        >
          {/* Hover effect for Minimize icon (hrimages4) */}
          <div
            style={{ position: "relative", display: "inline-block" }}
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
                  className="h-3 w-3  expand-button"
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
      </Box>
      <div
        //style={{ marginTop: "-22px" }}
        className="space-y-6 overflow-y-auto h-[340px] px-2 pb-4 collapsible-div"
      >
        {datastore && datastore.length === 0 ? <NoMemoboard /> : <></>}
      </div>
    </Box>
  );
};

export default HolidayBoard;
