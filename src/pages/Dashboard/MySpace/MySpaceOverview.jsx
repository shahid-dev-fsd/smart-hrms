import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ProfilePreview,
  EmployeesShift,
  GreetingBackground,
  Greeting,
  LogTime,
  WorkSchedule,
  ClockInReminder,
  // Attendance,
} from "../../../components";
import { Button, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { TrendingUp, TrendingDown, Height } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NoticeBoard from "../../DashComponents/noticeboard";
import MemoBoard from "../../DashComponents/memoboard";
import HolidayBoard from "../../DashComponents/holidayboard";
import RulesAndRegulations from "../../DashComponents/RulesAndRegulations";
import Calander from "../../Schedule/EmployeeShift";
import Applicationleave from "../../DashComponents/Applicationleave";
import Recentjobapplication from "../../DashComponents/recentJobs";
import Recentactivity from "../../DashComponents/RecentActivities";
import Attendance from "../../DashComponents/attend";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRefresh } from "../../../components/Header";
import Interduction from "../../Interduction";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PlusIcon from "../../../assets/CloclIcons/Add Button (1).png";
import { Link } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";

export default function MySpaceOverview() {
  const navigate = useNavigate(); // Get the navigate function

  const [overview, setOverview] = useState({});
  const { refreshPage } = useRefresh();

  const fetchOverview = useCallback(async () => {
    try {
      const response = await axios.get(`/hr/dashboard`);
      setOverview(response.data.overview);
    } catch (e) {
      console.log(e);
    }
  }, [setOverview]);

  useEffect(() => {
    fetchOverview();
    console.log("page refresh", refreshPage);
  }, [fetchOverview, refreshPage]);
  // console.log(overview);

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
  const barsData = [
    { name: "Thu", inProgress: 50, pending: 20, completed: 30 },
    { name: "Sun", inProgress: 30, pending: 20, completed: 20 },
    { name: "Tue", inProgress: 20, pending: 50, completed: 5 },
    { name: "Fri", inProgress: 30, pending: 20, completed: 41 },
    { name: "Sat", inProgress: 20, pending: 0, completed: 40 },
    { name: "Mon", inProgress: 30, pending: 20, completed: 50 },
    { name: "Wed", inProgress: 50, pending: 10, completed: 40 },
  ];

  const boxesData = [
    {
      icon: (
        <GroupIcon
          fontSize="medium"
          className="text-white  bg-sky-500 p-1 rounded-lg"
        />
      ),
      title: "Total Employees",
      value: (
        <Typography
          variant="body1"
          style={{ color: "#00FF00", fontSize: "1.2em" }}
        >
          {overview?.employees?.total || 0}
        </Typography>
      ),
      description: "124 for last month",
      trendIcon: <TrendingUp className="text-green-300" />,
      plusicon: (
        <Link
          to={{
            pathname: "/EmployeeHome",
          }}
          state={{ openModal: true }}
        >
          <img src={PlusIcon} alt="addicon" className="h-4 w-4 ml-[10px]" />
        </Link>
      ),
    },
    {
      icon: (
        <ApartmentIcon
          fontSize="medium"
          className="text-white bg-rose-500 p-1 rounded-lg items-center"
        />
      ),
      title: "Department",
      value: (
        <Typography
          variant="body1"
          style={{ color: "#FF0000", fontSize: "1.2em" }}
        >
          {overview?.departments || 0}
        </Typography>
      ),
      description: "124 for last month,",
      trendIcon: <TrendingDown className="text-red-300" />,
      plusicon: (
        <Link
          to={{
            pathname: "/DeptHome",
          }}
          state={{ openModal: true }}
        >
          <img src={PlusIcon} alt="addicon" className="h-4 w-4 ml-[10px]" />
        </Link>
      ),
    },
    {
      icon: (
        <AttachMoneyIcon
          fontSize="medium"
          className="text-white bg-blue-300 p-1 rounded-lg"
        />
      ),
      title: "Expenses",
      value: (
        <Typography
          variant="body1"
          style={{ color: "#FF0000", fontSize: "1.2em" }}
        >
          ${" "}
          {overview && overview?.expenses
            ? overview.expenses.reduce((total, el) => total + el.price, 0)
            : 0}
        </Typography>
      ),
      description: "124 for last month",
      trendIcon: <TrendingDown className="text-red-300" />,
    },
  ];
  // const eventData = [
  //     { date: '5 Mar', title: 'Board Meeting', description: 'Attend board meeting with company manager.', backgroundColor: '#fbbf24' },
  //     { date: '9 Mar', title: 'Design Team Meeting', description: 'Attend design team meeting with team mates and HOD.', backgroundColor: '#dc2626' },
  //     { date: '7 Feb', title: 'Tech Conference', description: 'Attend conference with teammates and other departments.', backgroundColor: '#f97316' },
  //     { date: '4 Mar', title: 'Development Team Pitch', description: 'Pitch idea on new development to the company board,', backgroundColor: '#3b82f6' },
  // ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [switchScreen, setSwitchScreen] = useState({
    first: "activities",
  });

  const handleSwitchScreen = (screen) => {
    setSwitchScreen(screen);
  };

  const [tabs, setTabs] = useState([
    { label: "Activities", value: "activities" },
    { label: "Announcements", value: "announcements" },
    { label: "Profile", value: "profile" },
    { label: "Attendance", value: "attendance" },
    { label: "Leave", value: "leave" },
    { label: "Timesheets", value: "timesheets" },
    { label: "Feeds", value: "feeds" },
    { label: "Time Logs", value: "timeLogs" },
  ]);

  // Determine the current tab index from the state
  const currentTabIndex = tabs.findIndex(
    (tab) => tab.value === switchScreen.first
  );

  const handleTabChange = (event, newValue) => {
    const selectedTab = tabs[newValue];
    handleSwitchScreen({
      first: selectedTab.value,
    });
  };

  const [moreTabs, setMoreTabs] = useState([
    { label: "Jobs", value: "jobs" },
    { label: "Files", value: "files" },
    { label: "Career History", value: "careerHistory" },
    { label: "Cases", value: "cases" },
    { label: "Goals", value: "goals" },
    { label: "Feedback", value: "feedback" },
    { label: "Related Data", value: "relatedData" },
  ]);
  const [moreTabsAnchor, setMoreTabsAnchor] = useState(null);
  const moreTabsOpen = Boolean(moreTabsAnchor);
  const handleMoreTabsOpne = (event) => {
    setMoreTabsAnchor(event.currentTarget);
  };
  const handleMoreTabsClose = () => {
    setMoreTabsAnchor(null);
  };
  const handleMenuItemClick = (item) => {
    const lastTab = tabs[tabs.length - 1];

    setTabs([...tabs.slice(0, tabs.length - 1), item]);

    setMoreTabs([
      ...moreTabs.filter((tab) => tab.value !== item.value),
      lastTab,
    ]);
    handleSwitchScreen({
      first: item.value,
    });
    handleMoreTabsClose();
  };
  return (
    <>
      <div className="w-full h-fit flex flex-col gap-2">
        <div>
          <GreetingBackground />
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-2 items-center">
          <Grid
            sx={{
              backgroundColor: "background.default",
              height: "",
              // width: "20%",
              // display: "flex",
              flexFlow: "column",
              justifyContent: "center",
              justifyItems: "center",
            }}
            className="h-fit min-w-fit w-full md:w-fit flex flex-col justify-center items-center rounded-lg shadow-md border border-gray-800"
          >
            <ProfilePreview />
            <Divider
              sx={{
                width: "92%",
                borderColor: "gray",
                pt: "0.8rem",
                mb: "0.4rem",
              }}
            />
            <EmployeesShift />
          </Grid>
          <div className="min-h-full w-full flex gap-3 flex-col justify-start items-start rounded-lg ">
            {/* <GreetingBackground /> */}
            <Grid
              sx={{
                backgroundColor: "background.default",
              }}
              className="w-full flex flex-row justify-between items-center rounded-lg"
            >
              <Tabs
                value={currentTabIndex}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="Navigation Tabs"
              >
                {tabs.map((tab, index) => (
                  <Tab key={index} label={tab.label} />
                ))}
              </Tabs>
              <Button
                id="moreTabsMenuButton"
                aria-controls={moreTabsOpen ? "moreTabsMenu" : undefined}
                aria-haspopup="true"
                aria-expanded={moreTabsOpen ? "true" : undefined}
                onClick={handleMoreTabsOpne}
              >
                <TuneIcon className="text-2xl" />
              </Button>
              <Menu
                id="moreTabsMenu"
                anchorEl={moreTabsAnchor}
                open={moreTabsOpen}
                onClose={handleMoreTabsClose}
                MenuListProps={{
                  "aria-labelledby": "moreTabsMenuButton",
                }}
              >
                {moreTabs.map((item, index) => (
                  <MenuItem
                    key={item.value}
                    onClick={() => {
                      handleMenuItemClick(item);
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>

            {switchScreen.first === "activities" ? (
              <>
                <Greeting />
                {/* <div className="w-full flex gap-3 justify-evenly items-center rounded-lg border border-gray-800">
              {boxesData &&
                boxesData.map((box, index) => (
                  <Grid
                    sx={{ backgroundColor: "background.default" }}
                    key={index}
                    className="h-full w-full rounded-lg shadow-md"
                  >
                    <div className="h-full w-full flex gap-3 flex-row justify-center items-center p-2 mb-2">
                      <div className="w-full flex flex-col justify-center items-start">
                        <div className="flex flex-row justify-center items-center">
                          <h1>{box.title}</h1>
                          <span className="flex flex-row justify-center items-center">
                            {box.plusicon}
                          </span>
                        </div>
                        <h1 className="text-sm">{box.value}</h1>
                      </div>
                      <div className="w-fit flex flex-col justify-center items-center">
                        {box.icon}
                      </div>
                    </div>
                  </Grid>
                ))}
            </div> */}
                <ClockInReminder />
                <LogTime />
                <WorkSchedule />
              </>
            ) : (
              <></>
            )}
            {switchScreen.first === "announcements" ? (
              <div className="h-full w-full grid grid-cols-2 gap-3">
                <NoticeBoard eventData={overview && overview?.notices} />
                <MemoBoard />
                <HolidayBoard />
                <RulesAndRegulations />
              </div>
            ) : (
              <></>
            )}
            {switchScreen.first === "profile" ? (
              <div className="w-full flex flex-col gap-3">
                <Grid
                  sx={{ backgroundColor: "background.default" }}
                  className="w-full grid grid-flow-row gap-5 rounded-lg p-3 border border-gray-800"
                >
                  <div>
                    <h1 className="text-2xl">Work Information</h1>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <h1 className="text-lg">Department</h1>
                      <h2 className="text-sm text-gray-500">Management</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Location</h1>
                      <h2 className="text-sm text-gray-500">London</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Designation</h1>
                      <h2 className="text-sm text-gray-500">CEO</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Role</h1>
                      <h2 className="text-sm text-gray-500">Admin</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Employment Type</h1>
                      <h2 className="text-sm text-gray-500">Full Time</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Employment Status</h1>
                      <h2 className="text-sm text-gray-500">Active</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Date OF Joining</h1>
                      <h2 className="text-sm text-gray-500">12 - 10 - 2024</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Year of Experience</h1>
                      <h2 className="text-sm text-gray-500">
                        3 year(s) 9 month(s)
                      </h2>
                    </div>
                  </div>
                </Grid>
                <Grid
                  sx={{ backgroundColor: "background.default" }}
                  className="w-full grid grid-flow-row gap-5 rounded-lg border border-gray-800 p-3"
                >
                  <div>
                    <h1 className="text-2xl">About</h1>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-4">
                    <h1>Click on "add" button to add an about statement</h1>
                    <Button
                      sx={{ width: "", px: "1.6rem", py: "0.2rem" }}
                      variant="contained"
                    >
                      Add
                    </Button>
                  </div>
                </Grid>
                <Grid
                  sx={{ backgroundColor: "background.default" }}
                  className="w-full grid grid-flow-row gap-5 rounded-lg border border-gray-800 p-3"
                >
                  <div>
                    <h1 className="text-2xl">Basic Information</h1>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <h1 className="text-lg">Staff ID</h1>
                      <h2 className="text-sm text-gray-500">#9999999999</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">First Name</h1>
                      <h2 className="text-sm text-gray-500">Jonathan</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Last Name</h1>
                      <h2 className="text-sm text-gray-500">Snow</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Email</h1>
                      <h2 className="text-sm text-gray-500">
                        jonathansnow@clikkle.com
                      </h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Username</h1>
                      <h2 className="text-sm text-gray-500">j.snow</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Date Of Birth</h1>
                      <h2 className="text-sm text-gray-500">19 - 04 - 1990</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Designation</h1>
                      <h2 className="text-sm text-gray-500">CEO</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Role</h1>
                      <h2 className="text-sm text-gray-500">Admin</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Emergency Contact</h1>
                      <h2 className="text-sm text-gray-500">
                        +44 954 184 4427
                      </h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Blood Group</h1>
                      <h2 className="text-sm text-gray-500">O+</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Address</h1>
                      <h2 className="text-sm text-gray-500">
                        5 Cherry Tree Avenue, Balerno, EH14,5AN,GBR
                      </h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Employment Type</h1>
                      <h2 className="text-sm text-gray-500">Full Time</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Employment Status</h1>
                      <h2 className="text-sm text-gray-500">Active</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Date OF Joining</h1>
                      <h2 className="text-sm text-gray-500">12 - 10 - 2024</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Year of Experience</h1>
                      <h2 className="text-sm text-gray-500">
                        3 year(s) 9 month(s)
                      </h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Material Status</h1>
                      <h2 className="text-sm text-gray-500">Married</h2>
                    </div>
                    <div>
                      <h1 className="text-lg">Gender</h1>
                      <h2 className="text-sm text-gray-500">Male</h2>
                    </div>
                  </div>
                </Grid>
              </div>
            ) : (
              <></>
            )}
            {switchScreen.first === "attendance" ? (
              <>
                {/* <Attendance /> */}
                <Attendance attendanceData={overview && overview?.attendance} isDashboardCall />
              </>
            ) : (
              <></>
            )}
            {switchScreen.first === "leave" ? (
              <>
                <Applicationleave />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
