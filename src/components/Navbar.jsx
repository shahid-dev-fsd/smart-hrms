import React, { useCallback, useEffect, useState } from "react";

import { Link, NavLink, useLocation } from "react-router-dom";
import StandardFeatures from "../components/StandardFeatures";

import { IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { PiChatTeardropText } from "react-icons/pi";
import { IoVideocamOutline } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import Badge from '@mui/material/Badge';
import { useSocket } from "../hooks/useSocket";

import upgradegrp from "../assets/Group 1014.png";
import upgradestack from "../assets/Group 1015.png";
import upgradeIssue from "../assets/Group 1019.png";

//mui component
import {
  AppBar,
  Box,
  Stack,
  Drawer as MuiDrawer,
  IconButton,
  DialogActions,
  List,
  AvatarGroup,
  Dialog,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  DialogContent,
  DialogTitle,
  Button,
  Card,
  Grid,
  Toolbar,
  Typography,
  ListItemButton,
  Menu,
  Link as MuiLink,
  MenuItem,
  Modal,
  useTheme as useMuiTheme,
  Skeleton,
  LinearProgress,
  styled,
  Collapse,
  useMediaQuery,
  Tabs,
  Tab,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

//mui icons
// import AppsIcon from "@mui/icons-material/Apps";
import { PiDotsNineBold } from "react-icons/pi";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import { menuItems } from "../services/sidebarLinks";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
import If from "./If";
//react component
import Image from "../components/Image";

//notificationbutton
import Notification from "../components/AnimatedBell";
import Clikklebrand from "../assets/Hrlogo.png";
import BotIcon from "../assets/boticon.png";

//services
import { useTheme } from "../style/theme";
import { useMenu } from "../hooks/useMenu";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useMessage } from "./Header";
import { useUser } from "../hooks/Authorize";
import useModal from "./../hooks/useModal";
import ActionIcon from "./ActionIcon";
import { clearCookie, getCookie, setCookie } from "../utilities/cookies";
import { env, handleAxiosError } from "../utilities/function";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Feedback from "./Feedback";
import MicrophoneIcon from "./MicrophoneIcon";
//logos
import hrlogo from "./images/hr-text.png";
import ClikkleAds from "../assets/ClikkleFavicons/Clikkle Ads favicon.png";
import ClikkleMail from "../assets/ClikkleFavicons/Clikkle Mail-01.png";
import ClikkleCampaigns from "../assets/ClikkleFavicons/Clikkle Campaigns favicon.png";
import ClikkleEsign from "../assets/ClikkleFavicons/Clikkle E-sign-favicon.png";
import ClikkleFiles from "../assets/ClikkleFavicons/Clikkle Files favicon.png";
import ClikkleHost from "../assets/ClikkleFavicons/Clikkle Host-favicon.png";
import ClikklePitch from "../assets/ClikkleFavicons/Clikkle Pitch-favicon.png";
import ClikkleProject from "../assets/ClikkleFavicons/Clikkle Projects-01.png";
import ClikkleCrew from "../assets/ClikkleFavicons/Clikkle Crew Logo.png";
import ClikkleLaunch from "../assets/ClikkleFavicons/Clikkle Launch favicon.png";
import OrganizationDropDown from "../pages/Organization/OrganizationDropDown";
import Footer from "../pages/Footer";

//Button
import Upgradebutton from "../components/Button/GradientButton";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const clikkleApps = [
  {
    name: "Ads",
    url: "https://ads.clikkle.com/",
    logo: ClikkleAds,
  },
  {
    name: "Campaigns",
    url: "https://campaigns.clikkle.com/",
    logo: ClikkleCampaigns,
  },
  {
    name: "E-Sign",
    url: "https://esign.clikkle.com/",
    logo: ClikkleEsign,
  },
  {
    name: "Files",
    url: "https://files.clikkle.com/",
    logo: ClikkleFiles,
  },
  {
    name: "Host",
    url: "https://host.clikkle.com/",
    logo: ClikkleHost,
  },
  {
    name: "Launch",
    url: "https://launch.clikkle.com/",
    logo: ClikkleLaunch,
  },
  {
    name: "C-Mail",
    url: "https://mail.clikkle.com/",
    logo: ClikkleMail,
  },
  {
    name: "Pitch",
    url: "https://pitch.clikkle.com/",
    logo: ClikklePitch,
  },
  {
    name: "Projects",
    url: "https://projects.clikkle.com/",
    logo: ClikkleProject,
  },
  {
    name: "Crew",
    url: "https://crew.clikkle.com/",
    logo: ClikkleCrew,
  },
];

const drawerWidth = 260;
const appsWidth = 54;
const miniDrawerWidth = 105;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.background.default,
  borderRight: "none",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.background.default,
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(12)} + 1px)`,
  },
  borderRight: "none",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,

  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar(props) {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage dropdown open/close

  const navigate = useNavigate();

  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarApps, setSidebarApps] = useState(clikkleApps);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState(null);
  const [collapseDrawer, setCollapseDrawer] = useState(false);
  const [drawerHover, setDrawerHover] = useState(false);

  const [collapsesState, setCollapsesState] = useState({});
  const modifyCollapsesState = (label) => {
    setCollapsesState((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const [switchScreen, setSwitchScreen] = useState({
    first: "mySpace",
    second: "overview",
  });

  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/dashboard/mySpace");
      return;
    }
    setPathname(window.location.pathname);
    console.log(window.location.pathname);

    setSwitchScreen({ first: window.location.pathname });
  }, [window.location.pathname]);

  const tabs = [
    { label: "My Space", value: "mySpace", second: "overview" },
    { label: "Team", value: "team", second: "teamSpace" },
    { label: "Organization", value: "organization", second: "overview" },
  ];

  const chatTabs = [
    { label: "Chat", value: "chat", second: "chat" },
    { label: "Contacts", value: "contacts", second: "contacts" },
    { label: "Groups", value: "groups", second: "groups" },
  ]

  const [isSearchOpen, setIsSearchOpne] = useState(false);

  const [open, setOpen] = useState(false); //

  const handleOpen = () => {
    fetchEmploees();
    setOpen(true);
  };
  const handleCloseUpgrate = () => setOpen(false);

  const [opensetting, setOpene] = useState(false);

  const handleOpenset = () => {
    setOpene(true);
  };

  const handleChatbox = () => {
    navigate("/chat");
  };

  const taketotheSubscriptionpage = () => {
    navigate("/paymet-gateway");
  };

  const handleClose = () => {
    window.location.href = "https://Store.clikkle.com/subscription/hr/purchase";
    //setAnchorEl(null); // This will close the menu
  };
  const closeAllCollapsesState = (label) => {
    let tempCollapsesState = { ...collapsesState };
    for (let key in tempCollapsesState) {
      tempCollapsesState[key] = false;
    }
    setCollapsesState(tempCollapsesState);
  };

  const handleCloseset = () => {
    setOpene(false);
  };

  const {
    modalState: feedbackState,
    openModal: openFeedback,
    closeModal: closeFeedback,
  } = useModal();
  const { showError, showResponse } = useMessage();
  const location = useLocation();
  const platformUser = useUser();
  const matches = useMediaQuery("(min-width:1024px)", { noSsr: true });

  const { toggleTheme, mode } = useTheme();
  const theme = useMuiTheme();

  // useMenu
  const {
    anchorEl: anchorElProfile,
    openMenu: openProfileMenu,
    closeMenu: closeProfileMenu,
  } = useMenu();

  const {
    anchorEl: anchorElApps,
    openMenu: openAppsMenu,
    closeMenu: closeAppsMenu,
  } = useMenu();

  const {
    anchorEl: anchorElSettings,
    openMenu: openSettingsMenu,
    closeMenu: closeSettingsMenu,
  } = useMenu();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerOpen = () => {
    setCollapseDrawer(!collapseDrawer);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    setIsOrderChanged(true);

    const draggingJob = sidebarApps[source.index];
    sidebarApps.splice(source.index, 1);

    sidebarApps.splice(destination.index, 0, draggingJob);
    setSidebarApps([...sidebarApps]);
  };

  const getProfile = useCallback(async () => {
    const role = getCookie("role");
    const accessToken = getCookie("accessToken");

    if (!(accessToken && role)) return;

    try {
      const response = await axios.get(`/${role}/profile`, {
        baseURL: env("AUTHENTICATION_SERVER"),
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const user = response.data.user;
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  }, [setUser]); // fetching user to get its personalize settings

  const getPlatforms = useCallback(async () => {
    try {
      const response = await axios.get("/platforms?sortBy=name&direction=1", {
        baseURL: env("AUTHENTICATION_SERVER"),
      });

      const { success, errors, platforms } = response.data;

      if (!success) return showError(errors);

      const SidebarApps = platforms?.filter(
        (platform) => platform.slug !== "e-sign"
      ); // Platform to exclude from list

      SidebarApps.forEach((app, i) => (app.order = i + 1));

      const arrangedOrder = [];
      user?.personalize?.appsOrder.forEach((order) => {
        SidebarApps.forEach((app, i) => {
          if (order === app.order) {
            arrangedOrder.push(app);
            SidebarApps.splice(i, 1);
          }
        });
      });

      if (arrangedOrder.length)
        setSidebarApps([...arrangedOrder, ...SidebarApps]);
      else setSidebarApps(SidebarApps);
    } catch (e) {
      console.log(e);
    }
  }, [user, showError]);

  const saveOrder = async () => {
    const accessToken = getCookie("accessToken");
    const appsOrder = sidebarApps.map((app) => app.order);

    try {
      const response = await axios.patch(
        "/user/personalize",
        { appsOrder },
        {
          baseURL: env("AUTHENTICATION_SERVER"),
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const { success, errors } = response.data;

      if (!success) return showError(errors);

      setCookie("side_apps_order", appsOrder);
      showResponse("Setting updated");
    } catch (e) {
      handleAxiosError(e, showError);
    } finally {
      setIsOrderChanged(false);
    }
  };

  const signOut = () => {
    clearCookie("accessToken");
    localStorage.removeItem("subscriptionId");
    localStorage.removeItem("org");
    localStorage.removeItem("user");
    // clearCookie('role');
    // clearCookie('setupCompleted');

    const redirectTo =
      env("AUTHENTICATION_CLIENT") +
      "/logout?redirectto=" +
      encodeURIComponent(env("DOMAIN")) +
      "&&referrer=" +
      encodeURIComponent(env("DOMAIN"));
    window.location.replace(redirectTo);
  };
  const [employLists, setEmployLists] = useState(null);
  const fetchEmploees = useCallback(async () => {
    try {
      const response = await axios.get(
        `/hr/employee?searchBy=&search=&sortBy=order&pageSize=all`
      );
      setEmployLists(response?.data?.employees);

      // console.log(Date.now())
    } catch (e) {
      console.log(e);
    }
  }, [setEmployLists]);
  useEffect(() => {
    fetchEmploees();
  }, [fetchEmploees]);

  const { totalNotification, visibleTab, setVisibleTab } = useSocket();

  useEffect(() => {
    setMobileOpen(false);
    if (mobileOpen) {
      closeAllCollapsesState();
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    user && getPlatforms();
  }, [user, getPlatforms]);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();

    // Listen to resize events
    window.addEventListener("resize", setVh);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  const SideBarLinkButton = ({ menus }) => {
    return (
      <>
        {menus.map((link) => (
          <NavLink
            to={link.to}
            key={link.label}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {({ isActive }) => (
              <>
                <ListItemButton
                  disableRipple
                  disableTouchRipple
                  variant="sidebarButton"
                  {...(Array.isArray(link.to)
                    ? {
                      selected: collapsesState[link.label],
                      variant: "sidebarDropDown",
                      onClick: () => modifyCollapsesState(link.label),
                      sx: { pr: 0 },
                    }
                    : {
                      to: link.to,
                      selected: isActive,
                    })}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "35px",
                      color: "text.secondary",
                    }}
                  >
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText primary={link.label} />
                  <If
                    condition={Array.isArray(link.to)}
                    so={
                      <If
                        condition={collapsesState[link.label]}
                        so={<ExpandMore fontSize="small" />}
                        otherwise={
                          <ChevronRightOutlinedIcon fontSize="small" />
                        }
                      />
                    }
                    otherwise
                  />
                </ListItemButton>
                {Array.isArray(link.to) && collapsesState[link.label] && (
                  <Collapse
                    in={collapsesState[link.label]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      sx={{
                        p: "10px",
                        ml: 1,
                        py: 0,
                      }}
                    >
                      <SideBarLinkButton key={link.label} menus={link.to} />
                    </List>
                  </Collapse>
                )}
              </>
            )}
          </NavLink>
        ))}
      </>
    );
  };

  const drawer = (
    <Box
      minHeight="100dvh"
      color="text.secondary"
      display="flex"
      flexDirection="column"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        component={Link}
        to="/"
        sx={{ textDecoration: "none", color: "text.primary", py: 1 }}
      >
        <Image src={hrlogo} sx={{ height: "42px", marginLeft: "-93px" }} />
        {/* <Typography
                    color='text.secondary'
                    variant='body2'
                    fontWeight='bold'
                    sx={{ position: 'absolute', bottom: 2, left: '43%' }}>
                    Beta
                </Typography> */}
      </Box>

      <Box
        sx={{ overflowY: "auto", height: "calc(100dvh - 90px)", flexGrow: 1 }}
      >
        {/* <Typography variant='body2' pl={3} mt={1.5} fontSize='16px' fontWeight={500}>
                    Hr Manager
                </Typography> */}
        <Box sx={{ px: 3 }}>
          <OrganizationDropDown />
        </Box>

        <List sx={{ py: 1, paddingRight: "5px", paddingLeft: "8px" }}>
          <SideBarLinkButton menus={menuItems} />
        </List>
      </Box>

      <Box>
        <Divider variant="middle" />
        <Typography
          variant="body2"
          pl={3}
          mt={1.5}
          fontSize="14px"
          fontWeight={500}
        >
          Storage
        </Typography>

        <Box px={3} pb={3}>
          <LinearProgress
            variant="determinate"
            value={20}
            color="primary"
            sx={{ borderRadius: "2px", mt: 1 }}
          />
          <Typography
            variant="caption"
            component="div"
            mt={1}
            color="primary.main"
          >
            1 GB used of 5 GB
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudOutlinedIcon fontSize="small" />}
            sx={{ mt: 1, color: "white" }}
            href={env("MY_ACCOUNT")}
            fullWidth
          >
            Upgrade storage
          </Button>
        </Box>
        <Divider
          variant="middle"
          sx={{ display: { xs: "block", sm: "none" } }}
        />
        <List sx={{ px: 1, display: { xs: "block", sm: "none" } }}>
          <ListItem
            disablePadding
            onClick={openSettingsMenu}
            sx={{
              "&:hover": {
                backgroundColor: "custom.cardHover",
                borderRadius: "8px",
              },
            }}
          >
            <ListItemButton
              disableRipple
              disableTouchRipple
              variant="sidebarButton"
            >
              <ListItemIcon
                sx={{
                  minWidth: "30px",
                  color: "text.secondary",
                }}
              >
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Settings"
                primaryTypographyProps={{ fontSize: 14 }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <Stack
          direction="row"
          justifyContent="center"
          my={1}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <MuiLink
            display="inline-flex"
            alignItems="center"
            color="text.secondary"
            sx={{ cursor: "pointer" }}
            onClick={openFeedback}
          >
            <MicrophoneIcon />
            <Typography variant="caption" fontWeight="bold">
              Give feedback
            </Typography>
          </MuiLink>
        </Stack>
      </Box>
    </Box>
  );
  const miniDrawer = (
    <Box
      minHeight="100dvh"
      color="text.secondary"
      display="flex"
      flexDirection="column"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        component={Link}
        mb={1.5}
        to="/"
        sx={{ textDecoration: "none", color: "text.primary", py: 1 }}
      >
        <Image cdn="hr/logo/2023/hr.png" sx={{ height: "50px" }} />
      </Box>

      <Box
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "calc(100dvh - 90px)",
          flexGrow: 1,
        }}
      >
        <List>
          {menuItems.map((link) => (
            <NavLink
              to={link.to}
              key={link.to}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {({ isActive }) => (
                <ListItem disablePadding>
                  <ListItemButton
                    disableRipple
                    disableTouchRipple
                    variant="sidebarButton"
                    {...(Array.isArray(link.to)
                      ? {
                        selected: collapsesState[link.name],
                        onClick: () => modifyCollapsesState(link.name),
                      }
                      : {
                        to: link.to,
                        // selected: isActive,
                      })}
                    sx={{ height: "auto", my: "3px" }}
                  >
                    <ListItemIcon
                      sx={{
                        // minWidth: '35px',
                        color: "text.secondary",
                      }}
                      className="w-[4.25rem]  flex flex-col gap-[0.15rem] justify-center items-center"
                    >
                      <div
                        className={` ${isActive ? "" : ""} ${mode === "dark" ? "bg-neutral-800" : "bg-neutral-200"
                          }  bg-opacity-50 p-2 rounded-lg`}
                      >
                        {link.icon}
                      </div>
                      <h1 className="text-[0.7rem]">{link.label}</h1>
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              )}
            </NavLink>
          ))}
        </List>
      </Box>
    </Box>
  );

  // console.log({ drawerHover });
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        px: { xs: 0.5, xm: 0 },
        height: "100dvh",
        position: "relative",
      }}
    >
      <AppBar
        elevation={0}
        component={Box}
        position="sticky"
        sx={{
          width: {
            xs: "100%",
            xm:
              collapseDrawer && !drawerHover
                ? `calc(100% - ${drawerWidth}px)`
                : `calc(100% - ${miniDrawerWidth}px )`,
          },
          ml: {
            xm:
              collapseDrawer && !drawerHover
                ? `${drawerWidth}px`
                : `${miniDrawerWidth}px`,
          },
          backgroundColor: "background.default",

          borderBottom: "1px solid custom.border",
          // borderBottomColor: 'custom.border',
          color: "text.primary",
          transition: "ease-in-out 225ms, background-color 0s",
        }}
      >
        <Toolbar
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            "&": {
              minHeight: "55px",
              px: 1,
            },
          }}
        >
          <Grid
            // container
            // alignItems="center"
            // columnSpacing={1}
            className="w-full flex justify-between items-center"
          >
            {/* <Grid item>
              <IconButton
                onClick={matches ? handleDrawerOpen : handleDrawerToggle}
                edge="start"
                sx={
                  {
                    // ml: 0.2,
                    // mr: 1,
                  }
                }
              >
                <MenuIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </Grid> */}
            <Grid>
              {pathname === "/dashboard/mySpace" ||
                pathname === "/dashboard/team" ||
                pathname === "/dashboard/organization" ? (
                <div className="flex flex-col pr-2">
                  <Box>
                    <Tabs
                      value={tabs.findIndex(
                        (tab) =>
                          tab.value ===
                          switchScreen.first.replace("/dashboard/", "")
                      )}
                      onChange={(event, newValue) => {
                        const selectedTab = tabs[newValue];
                        navigate("/dashboard/" + selectedTab.value);
                      }}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="Navigation Tabs"
                    >
                      {tabs.map((tab, index) => (
                        <Tab className="h-1" key={index} label={tab.label} />
                      ))}
                    </Tabs>
                  </Box>
                </div>
              ) : null}
              {pathname === "/chat" ? (
                <div className="flex flex-col pr-2">
                  <Box>
                    <Tabs
                      value={chatTabs.findIndex(
                        (tab) => tab.value === visibleTab
                      )}
                      onChange={(event, newValue) => {
                        const selectedTab = chatTabs[newValue];
                        setVisibleTab(selectedTab.value)
                      }}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="Chat Tabs"
                    >
                      {chatTabs.map((tab, index) => (
                        <Tab className="h-1" key={index} label={tab.label} />
                      ))}
                    </Tabs>
                  </Box>
                </div>
              ) : null}
            </Grid>
            <Grid item xs display={{ xs: "none", sm: "block" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0}
              >
                <Grid
                  className="flex flex-row justify-end items-center gap-1 px-1"
                  style={{ width: "100%" }}
                >
                  {isSearchOpen === true ? (
                    <>
                      <SearchBar />
                    </>
                  ) : (
                    <></>
                  )}
                </Grid>
                {/* <Grid
                  sx={{ height: "100%" }}
                  item
                  xs
                  md={5}
                  alignItems="start"
                  className="flex flex-row justify-start items-center gap-3"
                >
                  <SearchBar />
                </Grid> */}

                {/* Popup Dialog */}
                {/* <Grid className="flex flex-row justify-center items-center">
                  <IconButton title="Quick Actions">
                    <FaPlus />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setIsSearchOpne(!isSearchOpen);
                    }}
                  >
                    <IoSearchSharp />
                  </IconButton>
                </Grid> */}

                <div className="w-fit flex flex-row gap-2 justify-center items-center px-1 text-nowrap">
                  <Box onClick={handleOpen}>
                    {employLists && employLists.length < 5 && <Upgradebutton />}
                    {employLists &&
                      employLists.length >= 5 &&
                      employLists.length < 10 && (
                        <Button
                          variant="outlined"
                          startIcon={<WarningAmberIcon />}
                          color="warning"
                        >
                          Limited users left
                        </Button>
                      )}
                    {employLists && employLists.length >= 10 && (
                      <Button
                        variant="outlined"
                        startIcon={<WarningAmberIcon />}
                        color="warning"
                      >
                        No users left
                      </Button>
                    )}
                  </Box>

                  <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="lg"
                    PaperProps={{
                      sx: {
                        width: "1050px", // Custom width for popup box
                        height: "550px", // Custom height for popup box
                        borderRadius: "12px", // Rounded corners
                        backgroundColor: "background.default",
                      },
                    }}
                  >
                    <DialogContent
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        p: 0,
                        backgroundColor: "#1e1e1e",
                      }}
                    >
                      {/* Left section */}
                      <Box sx={{ width: "50%", padding: "24px", color: "#fff" }}>
                        <Image
                          src={Clikklebrand}
                          sx={{
                            height: "28px",
                            marginBottom: "40px",
                            //marginTop: "10px",
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "sans-serif",
                            mb: 1,
                            fontSize: "20px",
                            fontWeight: "bold"
                          }}
                        >
                          Upgrade for unlimited users{" "}
                        </Typography>
                        <Typography
                          sx={{
                            mb: 4,
                            fontFamily: "sans-serif",
                            fontSize: "12px",
                            color: "gray",
                            width: "400px",
                          }}
                        >
                          With the Clikkle+ plan, you get 1000GB of storage, all previous plans features, access to all clikkle products, AI powered candidate matching and project management tools.{" "}
                        </Typography>

                        {/* Users invited section */}
                        <Typography
                          sx={{
                            mb: 1,
                            fontFamily: "sans-serif",
                            fontSize: "18px",
                            fontWeight: "bold"
                          }}
                        >
                          {employLists ? employLists.length : 0} of 10 invited
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "sans-serif",
                            fontSize: "12px",
                            color: "gray",
                          }}
                        >
                          Upgrade for unlimited users
                        </Typography>
                        {employLists && (
                          <div style={{ display: "inline-block", position: "relative" }} >
                            <AvatarGroup
                              total={employLists.length}
                              max={11}
                              spacing={-1}
                              sx={{
                                mb: 4,
                                //marginRight: "115px",
                                marginTop: "12px",

                                "& .MuiAvatarGroup-avatar": {
                                  height: 30, // Adjust height
                                  width: 30,  // Adjust width
                                  fontSize: 12, // Adjust font size of surplus text
                                },
                              }}
                            >
                              {[...Array(10)].map((_, index) => (
                                <Avatar
                                  key={index}
                                  src={
                                    employLists[index]
                                      ? `https://ui-avatars.com/api/?name=${employLists[index].firstName} ${employLists[index].lastName}`
                                      : undefined
                                  }
                                  sx={
                                    !employLists[index]
                                      ? { backgroundColor: "#666" }
                                      : undefined
                                  }
                                />
                              ))}
                            </AvatarGroup>
                          </div>
                        )}

                        {/* Storage usage section */}
                        <Typography sx={{ mb: 1 }}>0 GB of 2 GB</Typography>
                        <Typography
                          sx={{
                            fontFamily: "sans-serif",
                            color: "gray",
                            fontSize: "15px",
                            marginBottom: "12px",
                          }}
                        >
                          Upgrade for 100 GB storage
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={0}
                          sx={{
                            mb: 3,
                            backgroundColor: "#444",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#fff",
                            },
                            height: "7px",
                            borderRadius: "22px",
                          }}
                        />

                        {/* Actions */}
                        <DialogActions sx={{ mt: 2, marginTop: "72px" }}>
                          <Button
                            onClick={handleCloseUpgrate}
                            sx={{
                              color: "#888",
                              backgroundColor: "#45413C",
                              textTransform: "none",
                              p: "8px 24px",
                            }}
                          >
                            Maybe later
                          </Button>
                          <Button
                            onClick={handleClose}
                            sx={{
                              backgroundColor: "#3767B1",
                              color: "black",
                              textTransform: "none",
                              p: "8px 24px",
                            }}
                          >
                            Upgrade
                          </Button>
                        </DialogActions>
                      </Box>

                      {/* Right section */}
                      <Box
                        sx={{
                          width: "50%",
                          backgroundColor: "background.default",
                          padding: "24px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <StandardFeatures />
                      </Box>
                    </DialogContent>
                  </Dialog>
                  <IconButton title="Quick Actions">
                    <BsPlusLg />
                  </IconButton>
                  <IconButton
                    title="Search"
                    onClick={() => {
                      setIsSearchOpne(!isSearchOpen);
                    }}
                  >
                    <IoIosSearch />
                  </IconButton>
                  <Notification />

                  <IconButton
                    onClick={() => {
                      // setTotalNewCount(0)
                      // setTotalUnread(0)
                      navigate("/chat");
                    }}
                    title="Chat"
                  ><Badge badgeContent={totalNotification.length} color="primary">
                      <PiChatTeardropText />
                    </Badge>
                  </IconButton>
                  <Link to={"http://Crew.clikkle.com"}>
                    <IconButton title="Video Call">
                      <IoVideocamOutline />
                    </IconButton>
                  </Link>
                  <IconButton
                    title="App"
                    target="_blank"
                    href={"https://apps.clikkle.com/"}
                  >
                    {/* <AppsIcon /> */}
                    <TbGridDots />
                  </IconButton>
                  <IconButton title="Setting" onClick={openSettingsMenu}>
                    <IoSettingsOutline />
                  </IconButton>
                </div>
                {/* <Notification />
                <IconButton onClick={openSettingsMenu}>
                  <SettingsIcon />
                </IconButton> */}
                <Menu
                  anchorEl={anchorElSettings}
                  open={Boolean(anchorElSettings)}
                  onClose={closeSettingsMenu}
                >
                  <MenuItem onClick={toggleTheme}>
                    <ListItemIcon>
                      {mode === "dark" ? (
                        <LightModeIcon fontSize="small" />
                      ) : (
                        <DarkModeIcon fontSize="small" />
                      )}
                    </ListItemIcon>
                    Appearance
                  </MenuItem>
                </Menu>
                {/* <IconButton target="_blank" href={"https://apps.clikkle.com/"}>
                  <AppsIcon />
                </IconButton> */}

                {/* <Menu
                    anchorEl={anchorElApps}
                    open={Boolean(anchorElApps)}
                    onClose={closeAppsMenu}
                    sx={{
                        '.MuiPaper-root.MuiMenu-paper.MuiPopover-paper': {
                            marginTop: '16px',
                            bgcolor: 'custom.menu',
                            width: '300px',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                            border: '1px solid rgba(0, 0, 0, 0.11)',
                        },
                    }}>
                    <Grid container alignItems='center' spacing={2}>
                        {sidebarApps
                            ? sidebarApps.map(app => (
                              <Grid item xs={4} key={app.name}>
                                  <MuiLink
                                      href={app.url}
                                      target='_blank'
                                      sx={{
                                          fontWeight: 500,
                                          textDecoration: 'none',
                                          color: '#5f6368',
                                      }}>
                                      <Box
                                          align='center'
                                          sx={{
                                              borderRadius: '8px',
                                              p: 1.2,
                                              textAlign: 'center',
                                              '&:hover': {
                                                  bgcolor: 'custom.appsHover',
                                              },
                                          }}>
                                          <Image
                                              src={app.logo}
                                              sx={{
                                                  height: '35px',
                                              }}
                                          />
                                          <Typography
                                              sx={{
                                                  fontSize: '12px',
                                                  overflowX: 'hidden',
                                                  textOverflow: 'ellipsis',
                                                  whiteSpace: 'nowrap',
                                                  fontWeight: 500,
                                              }}>
                                              {app.name}
                                          </Typography>
                                      </Box>
                                  </MuiLink>
                              </Grid>
                          ))
                        : Array(9)
                              .fill(0)
                              .map((_, i) => (
                                  <Grid item xs={4} key={i} align='center'>
                                      <Skeleton
                                          variant='circular'
                                          animation='wave'
                                          width={37}
                                          height={37}
                                          sx={{ mt: 1 }}
                                      />
                                      <Skeleton
                                          variant='text'
                                          animation='wave'
                                          width={38}
                                          sx={{ mt: 1 }}
                                      />
                                  </Grid>
                              ))}
                    </Grid>
                </Menu> */}
              </Stack>
            </Grid>

            <Grid item>
              <IconButton
                onClick={openProfileMenu}
                sx={{
                  borderWidth: "2px",
                  width: "44px",
                  height: "44px",
                  borderStyle: "solid",
                  borderColor: "primary.main",
                  // p: "3px",
                }}
                className="flex justify-center items-center place-content-center place-items-center place-self-center"
              >
                <Typography
                  variant="subtitle1" // Corrected 'substitle1' to 'subtitle1'
                  component="div"
                  fontWeight={400}
                  fontSize={18}
                  sx={{
                    paddingTop: "1.9px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {platformUser &&
                    platformUser.firstName &&
                    platformUser.lastName
                    ? platformUser.firstName.charAt(0).toUpperCase() +
                    platformUser.lastName.charAt(0).toUpperCase()
                    : "?"}
                </Typography>
              </IconButton>

              <Menu
                anchorEl={anchorElProfile}
                open={Boolean(anchorElProfile)}
                onClose={closeProfileMenu}
                sx={{
                  ".MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                    width: "min(100%, 320px)",
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
                    border: "1px solid #00000017",
                    bgcolor: "custom.menu",
                    px: 0.5,
                    pt: 1.5,
                  },
                }}
              >
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  flexWrap="nowrap"
                >
                  <Grid
                    sx={{
                      borderWidth: "2px",
                      width: "145px",
                      marginLeft: "22px",
                      height: "85px",
                      borderRadius: "60px",
                      textAlign: "center",
                      borderStyle: "solid",
                      borderColor: "primary.main",
                      p: "3px",
                    }}
                    item
                  >
                    <Typography
                      variant="subtitle1" // Corrected 'substitle1' to 'subtitle1'
                      component="div"
                      fontWeight={600}
                      sx={{
                        fontSize: "30px",
                        fontFamily: "sans-serif",
                        marginLeft: "-12px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {platformUser &&
                        platformUser.firstName &&
                        platformUser.lastName
                        ? platformUser.firstName.charAt(0).toUpperCase() +
                        platformUser.lastName.charAt(0).toUpperCase()
                        : "?"}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="substitle1"
                      component="div"
                      fontWeight={600}
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {platformUser?.firstName + " " + platformUser?.lastName}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {platformUser?.email}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="a"
                      href={env("MY_ACCOUNT")}
                      color="primary.main"
                      display="block"
                    >
                      My Clikkle account
                    </Typography>
                    <Typography
                      variant="caption"
                      component="a"
                      href="#"
                      color="primary.main"
                      display="block"
                    >
                      My Profile
                    </Typography>
                  </Grid>
                </Grid>
                <Stack direction="row" mt={2}>
                  <Button variant="text" fullWidth>
                    Add account
                  </Button>
                  <Button variant="text" onClick={signOut} fullWidth>
                    Sign out
                  </Button>
                </Stack>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>

        <Box
          sx={{
            width: appsWidth,
            display: { xs: "none", xm: "block" },
            backgroundColor: "background.default",
            zIndex: "1200",
            position: "absolute",
            right: 0,
            top: 65,
          }}
        >
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            overflow="hidden"
            px={0.8}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="apps" isDropDisabled={!editable}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {sidebarApps ? (
                      sidebarApps.map((app, i) => (
                        <Draggable
                          key={app.order}
                          draggableId={app.name}
                          index={i}
                          isDragDisabled={!editable}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ActionIcon
                                title={editable ? "" : app.name}
                                href={app.url}
                                src={app.logo}
                                key={app.order}
                                sx={{
                                  mt: 0.8,
                                  width: "auto",
                                }}
                                imageSx={{
                                  filter:
                                    editable &&
                                    `drop-shadow(0px 2px 2px ${theme.palette.primary.main})`,
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <Box mt={2}>
                        {Array(8)
                          .fill(0)
                          .map((_, i) => (
                            <Skeleton
                              variant="circular"
                              animation="wave"
                              key={i}
                              width={35}
                              height={35}
                              sx={{ mb: 2 }}
                            />
                          ))}
                      </Box>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <Divider variant="middle" sx={{ my: 2, width: "80%" }} />
            {editable ? (
              <ActionIcon
                title="Save"
                icon={<DoneIcon fontSize="small" />}
                onClick={() => {
                  setEditable(false);
                  if (isOrderChanged) saveOrder();
                }}
              />
            ) : (
              <ActionIcon
                title="Edit"
                icon={<EditIcon fontSize="small" />}
                onClick={() => setEditable(true)}
              />
            )}
          </Stack>

          {/* <Box 
      sx={{ 
        marginRight:'-37px',
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
         
        position: 'fixed', // Fixed position to float in the viewport
        bottom: '20px', // Distance from the bottom of the viewport
        right: '20px', // Distance from the right of the viewport
        zIndex: 1000, // Ensure it stays above other content
       // Optional background for visibility
        padding: '10px', // Optional padding for better appearance
      }}
    >
      <Button onClick={handleChatbox}>
<Box sx={{ display:'flex',flexDirection:"column",textAlign:'center'}}>
      <Image src={BotIcon}  alt="Bot Icon"
        sx={{ width: '42px', height: '42px'}} />

        <Typography sx={{color:'white',fontSize:'13px',fontFamily:'sans-serif'}} >Chat</Typography>
        </Box>
        </Button>
    </Box> */}
        </Box>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { xm: drawerWidth },
          flexShrink: { sm: 0 },
          bgcolor: "custom.menu",
        }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <MuiDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", xm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "custom.menu",
            },
          }}
        >
          {drawer}
        </MuiDrawer>
        <Drawer
          variant="permanent"
          open={collapseDrawer}
          hover={drawerHover}
          onMouseOver={() => {
            if (!collapseDrawer) {
              setCollapseDrawer(true);
              setDrawerHover(true);
            }
          }}
          onMouseLeave={() => {
            if (drawerHover) {
              setCollapseDrawer(false);
              setDrawerHover(false);
            }
          }}
          sx={{
            display: { xs: "none", xm: "block" },
            p: 0,
            "& .MuiDrawer-paper": {
              boxShadow: drawerHover
                ? "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                : "none",
            },
          }}
        >
          {collapseDrawer ? drawer : miniDrawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          width: {
            xs: "100%",
            xm:
              collapseDrawer && !drawerHover
                ? `calc(100% - ${drawerWidth + appsWidth}px)`
                : `calc(100% - ${appsWidth + miniDrawerWidth}px )`,
          },
          ml: {
            xm:
              collapseDrawer && !drawerHover
                ? `${drawerWidth}px`
                : `${miniDrawerWidth}px`,
          },
          mt: 1,
          mb: { xs: 7, sm: 0 },
          height: {
            xs: "calc(var(--vh, 1vh) * 100 - 125px)",
            sm: "calc(var(--vh, 1vh) * 100 - 75px)",
          },
          backgroundColor: "background.paper",
          overflowY: "auto",
          borderRadius: "12px",
        }}
      >
        {children}
      </Box>

      <Modal
        open={feedbackState}
        onClose={closeFeedback}
        sx={{
          overflowY: "scroll",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <>
          <Feedback closeModal={closeFeedback} />
        </>
      </Modal>
      <Footer />
    </Box>
  );
}
