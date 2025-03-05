import React, { useState } from "react";
import { Box, Typography, Avatar, Button, Stack } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import NoRecentJobApplication from "./NoRecentJobApplication";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CropFreeIcon from '@mui/icons-material/CropFree';
import RefreshIcon from '@mui/icons-material/Refresh';
import LinkIcon from '@mui/icons-material/Link';
import countries from 'i18n-iso-countries';
import CountryFlag from 'react-country-flag';
import useExpandCollapse from "../../hooks/useExpandCollapse";
import hrimages1 from "../../assets/Interductionimages/Vector-1.png"
import hrimages2 from "../../assets/Interductionimages/Vector-2.png"
import hrimages3 from "../../assets/Interductionimages/Vector-3.png"
import hrimages4 from "../../assets/Interductionimages/Vector.png"
import minimizeicon from "../../assets/Interductionimages/expand.png"
import maximizeicon from "../../assets/Interductionimages/maximize.png"
import { Link } from 'react-router-dom';
import Newreceivedapplication from "../ReceivedApp/Newreceivedapplication";

// Initialize the country names (optional: specify language)
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

function CountryDisplay({ countryCode }) {
  const countryName = countries.getName(countryCode, "en");


  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <CountryFlag
        countryCode={countryCode}
        svg
        style={{ width: '20px', marginRight: '5px' }}
        title={countryName}
      />
      <span>{countryName || "Unknown Country"}</span>
    </div>
  );
}


const RecentJobs = ({ items }) => {
  useExpandCollapse();
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);
  const [setSelectedYear] = useState("2024");
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // For first icon
  const [isMaximized, setIsMaximized] = useState(true);

  const handleToggle = () => setIsMinimized(!isMinimized);


const handleToggleMaximize = () => setIsMaximized(!isMaximized); 


  const toggleDropdown1 = () => {
    setDropdown1Open(!dropdown1Open);
  };

  const toggleDropdown2 = () => {
    setDropdown2Open(!dropdown2Open);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setDropdown1Open(false);
    setDropdown2Open(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>

        <Box
          className={`  ${isMaximized ? "expandable-div" : "expandable-div"}`}

      p={2}
      boxShadow={3}
      borderRadius="12px"
      bgcolor="background.default"
      //minHeight="87vh"
      width="100%"
      overflow="auto"
      mt={isMobile ? "-10px" : ""}
     
      

    >
      {/* Header Section */}
      <Stack direction="row" alignItems="center" justifyContent="space-between"  className="collapsible-main" >
        <Typography variant="h6" sx={{ fontSize: isMobile ? "13px" : "13px", mr: "10px", whiteSpace: "nowrap" }}>
          Recent Job Application
        </Typography>

        <div style={{ display: "flex", gap: '10px', }}>
        <div style={{ display: "flex",gap:isMobile? "20px":"10px", color: "white", marginTop: "9px" }}>
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
          <Link to="/receivedapplications">
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
        </div>
      </Stack>
      
      {isMaximized ? (
      <div className="w-full overflow-x-auto md:overflow-x-hidden collapsible-div mt-4" style={{ minHeight:"74.9vh"}}>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex flex-row mb-1 min-w-[30rem]">
              <div className="w-[45%] flex flex-row">
                <div
                  className="flex items-center justify-center"
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  {/* <AccountCircleIcon fontSize="large" /> */}
                  <Avatar src={`https://ui-avatars.com/api/?name=${item.fullName}`} alt={item.fullName} sx={{ width: 30, height: 30, borderRadius: '25px', marginTop: '-14px' }} />
                </div>
                <div className="flex-1 truncate">
                  <h1
                    className="text-sm truncate "
                    style={{ fontSize: "15px", marginBottom: "-10px" }}
                  >
                    {item.fullName}
                  </h1>
                  <p className="truncate text-sm text-zinc-500" style={{ fontSize: "12px", marginTop: "8px", width: "140px" }}>
                    {item.jobTitle}
                  </p>
                </div>
              </div>
              <div className="w-[5%] flex items-center justify-start">
                <p style={{ fontFamily: "sans-serif", fontSize: "13px", marginLeft: "-38px" }} className="">{item.experience} years</p>
              </div>
              <div className="w-[30%] flex items-center justify-start">
                <p
                  className=""
                  style={{ fontSize: "14px" }}
                >
                  <CountryDisplay countryCode={item.countryCode} />
                </p>
              </div>
              <div className="w-[20%] gap-2 flex items-center justify-end whitespace-nowrap">
                <Box
                  sx={{
                    backgroundColor: '#0F1E0E', // Dark greenish background
                    width: 65,
                    height: 45,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CallIcon style={{ color: '#42B824', fontSize: 20 }} />
                </Box>

                {/* Email Icon */}
                <Box
                  sx={{
                    backgroundColor: '#0C0F18', // Dark blueish background
                    width: 65,
                    height: 45,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <EmailIcon style={{ color: '#2670E1', fontSize: 20 }} />
                </Box>

                {/* Delete Icon */}
                <Box
                  sx={{
                    backgroundColor: '#1C0B0B', // Dark reddish background
                    width: 65,
                    height: 45,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <DeleteIcon style={{ color: '#F13B3B', fontSize: 20 }} />
                </Box>
              </div>
            </div>
          ))
        ) : (
          <NoRecentJobApplication />
        )}

{isMobile && <Link to="/receivedapplications"><div className=" mt-4">
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
       ) : (
        <div
     
      style={{
        backgroundColor: "background.view",
        height: "auto",
        width: "auto",
      
       

      }}
    >
    <Newreceivedapplication />
    </div>
      )}
    
 
    
     
    </Box>
    
 

    </>
  );
};

// Dummy data for testing
const dummyItems = [
  {
    fullName: "John Doe",
    email: "johndoe@example.com",
    experience: "5 years",
    jobTitle: "south Africa",
  },
  {
    fullName: "Jane Smith",
    email: "janesmith@example.com",
    experience: "3 years",
    jobTitle: "Usa",
  },
  {
    fullName: "Michael Brown",
    email: "michaelbrown@example.com",
    experience: "2 years",
    jobTitle: "United kingdom",
  },
];

const App = (props) => {
  return <RecentJobs items={props.eventData} />;
};

export default App;
