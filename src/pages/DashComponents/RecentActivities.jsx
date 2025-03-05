import React,{useState} from "react";
import { Box, Button, Typography, useMediaQuery, Avatar, Stack } from "@mui/material";
import { display, useTheme } from "@mui/system";
import hrimages1 from "../../assets/Interductionimages/Vector-1.png"
import hrimages2 from "../../assets/Interductionimages/Vector-2.png"
import hrimages3 from "../../assets/Interductionimages/Vector-3.png"
import hrimages4 from "../../assets/Interductionimages/Vector.png"
import { Link } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";
import graph from "../../assets/Interductionimages/graph.png"
import minimizeicon from "../../assets/Interductionimages/expand.png"
import maximizeicon from "../../assets/Interductionimages/maximize.png"


// Sample data for recent activities
const activities = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Daniel Thompson",
    activity: "Add list permission on the member list issue",
    type: "Issue",
    time: "38 minutes ago",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Daniel Thompson",
    activity: "Add list permission on the member list issue",
    type: "Issue",
    time: "40 minutes ago",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Daniel Thompson",
    activity: "New Add list permission on the member list issue",
    type: "Issue",
    time: "45 minutes ago",
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Daniel Thompson",
    activity: "Work progress % calculation issue has been added",
    type: "Issue",
    time: "45 minutes ago",
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Daniel Thompson",
    activity: "Work progress % calculation issue has moved",
    type: "Issue",
    time: "50 minutes ago",
  },
  {
    id: 6,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Daniel Thompson",
    activity: "Work progress % calculation issue has moved",
    type: "Issue",
    time: "50 minutes ago",
  },
  {
    id: 7,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Daniel Thompson",
    activity: "Work progress % calculation issue has moved",
    type: "Issue",
    time: "50 minutes ago",
  },
  {
    id: 8,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Daniel Thompson",
    activity: "Work progress % calculation issue has moved",
    type: "Issue",
    time: "50 minutes ago",
  },
  {
    id: 10,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Daniel Thompson",
    activity: "Work progress % calculation issue has moved",
    type: "Issue",
    time: "50 minutes ago",
  },
  {
    id: 11,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Daniel Thompson",
    activity: "Work progress % calculation issue has moved",
    type: "Issue",
    time: "50 minutes ago",
  },
  {
    id: 13,
    avatar: "https://i.pravatar.cc/40?img=1",
    name: "Daniel Thompson",
    activity: "Work progress % calculation issue has moved",
    type: "Issue",
    time: "50 minutes ago",
  },
];


// Single activity row component
const ActivityRow = ({ activity, isMobile }) => (


  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    spacing={2}
    py={1.5}
    px={1}

    sx={{
      flexDirection: isMobile ? "row" : "row",
      textAlign: isMobile ? "left" : "left",

    }}
  >
    <Stack direction="row" alignItems="center" spacing={2} flexGrow={1}>
      <Avatar src={activity.avatar} alt={activity.name} sx={{ width: 25, height: 25 }} />
      <Box sx={{ textAlign: isMobile ? "left" : "left", flexGrow: 1 }}>
        <Typography sx={{ fontFamily: "sans-serif", fontSize: "10px" }}>
          {activity.activity}
        </Typography>
        <Typography variant="caption" color="textSecondary" fontSize= "10px" >
          {activity.name}
        </Typography>
      </Box>
    </Stack>

    <Box
      sx={{
        px: 2,
        py: 0.5,
        border: "1px solid #06D17C",
        borderRadius: "8px",
        color: "#06D17C",
        backgroundColor: "#00361F80",
        fontFamily: "sans-serif",
        fontSize: "10px",
        textAlign: "center",
        minWidth: isMobile ? "80px" : "auto",
        mt: isMobile ? 1 : 0,

      }}
    >
      {activity.type}
    </Box>

    <Typography variant="caption" color="textSecondary" fontSize="10px" sx={{ mt: isMobile ? 1 : 0 }}>
      {isMobile ? `${activity.time.split(" ")[0]}m` : activity.time}
    </Typography>
  </Stack>
);

// Main Recent Activities component
const RecentActivities = () => {

  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // For first icon
  const [isMaximized, setIsMaximized] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const handleToggle = () => setIsMinimized(!isMinimized);


const handleToggleMaximize = () => setIsMaximized(!isMaximized);

  return (
    <Box

      p={2}
      boxShadow={3}
      borderRadius="12px"
      bgcolor="background.default"
      Height="auto"
      width="100%"
      overflow="auto"
      mt={isMobile ? "5px" : ""}
      className="expandable-div"

    >
      {/* Header Section */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" className="collapsible-main" >
        <Typography variant="h6" sx={{ fontSize: isMobile ? "13px" : "13px", mr: "10px", whiteSpace: "nowrap" }}>
          Recent Activities
        </Typography>

        <div style={{ display: "flex", gap: '10px', }}>
        <div style={{ display: "flex", gap:isMobile? "20px":"10px", color: "white", marginTop: "9px" }}>
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
          <Link to="//projects.clikkle.com/walk-through">
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

      {/* Activity List */}
      <div className="collapsible-div" style={{ maxHeight: "77.1vh" }}>
        
      {activities.length === 0 ? (
 <Box
 sx={{
   padding: { xs: 2, sm: 4 },
   textAlign: 'center',
   borderRadius: '12px',
   backgroundColor: "Background.view",
   color: 'text.primary',
   height:"77.1vh"
 }}
>
 {/* Icon/Image Section */}
 <Box sx={{ my: { xs: 2, sm: 4 } }}>
   <Box
     component="img"
     src={graph}
     alt="No job applications"
     sx={{
       width: { xs: 150, sm: 200 },
       height: { xs: 100, sm: 150 },
       mx: 'auto',
     }}
   />
 </Box>

 {/* Main Text */}
 <Typography
   variant="h6"
   sx={{
     marginBottom: 1,
     fontFamily: 'sans-serif',
     fontSize: { xs: '13px', sm: '23px' },
   }}
 >
   No Employee Project Records!
 </Typography>
 <Typography
   variant="body2"
   sx={{
     color: grey[500],
     marginBottom: { xs: 3, sm: 4 },
     fontSize: { xs: '10px', sm: '10px' },
   }}
 >
 You have no current employee projects activities.
To view employee project activities, you have to create a Clikkle Projects account.
Click on the button below to create your projects account now and start viewing
employees activities.
 </Typography>

 {/* Button */}
 <Button
          variant="contained"
          sx={{
            backgroundColor: blue[700],
            color: '#fff',
            textTransform: 'none',
            borderRadius: '8px',
            height:"30px",
            width:"auto",
            fontSize: '10px',
            paddingX: { xs: 2, sm: 3 },
            paddingY: { xs: 1, sm: 1.5 },
            '&:hover': { backgroundColor: blue[800] },
          }}
        >
            Create Clikkle Projects Account
        </Button>
</Box>
) : (
  activities.map((activity) => (
    <ActivityRow key={activity.id} activity={activity} isMobile={isMobile} />
  ))
)}
</div>
    </Box>
  );
};

export default RecentActivities;