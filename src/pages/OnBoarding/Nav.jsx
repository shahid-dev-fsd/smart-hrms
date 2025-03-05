import * as React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Stack,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import AppsIcon from "@mui/icons-material/Apps";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import { useMenu } from "../../hooks/useMenu";
import { useTheme } from "../../style/theme";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import { clearCookie } from "../../utilities/cookies";
import { env } from "../../utilities/function";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
function Nav(props) {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }
  const {
    anchorEl: anchorElProfile,
    openMenu: openProfileMenu,
    closeMenu: closeProfileMenu,
  } = useMenu();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  React.useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      setUserName(user.firstName + " " + user.lastName);
    }
  }, []);

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

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        className="px-0 sm:px-12"
        component="nav"
        sx={{ backgroundColor: "background.default" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <div className="flex items-center">
              <img
                className={`w-10 sm:w-14 `}
                src="https://cdn.clikkle.com/images/hr/logo/2023/hr.png"
                alt="clikkle"
              />
              <h1
                className={`text-gray-400 mx-2 dark:text-white text-center align-middle sm:text-xl md:text-xl lg:text-xl font-normal text-sm`}
              >
                <span className="text-gray-500 font-medium"> Clikkle </span> Hr
              </h1>
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* {navItems.map((item) => (
              <Button key={item} sx={{ color: '#000' }}>
                {item}
              </Button>
            ))} */}

            <AppsIcon
              sx={{ display: { xs: "block", sm: "none" } }}
              className="mx-1"
              fontSize="large"
              color="action"
            />

            {/* <Tooltip title={userName}> */}
            <IconButton sx={{ p: 0 }} onClick={openProfileMenu}>
              <Avatar
                alt={userName}
                src="../../components/images/hr-text.png"
              />
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
              <Grid container spacing={2} alignItems="center" flexWrap="nowrap">
                <Grid item>
                  <Avatar
                    alt={userName}
                    src="../../components/images/hr-text.png"
                    sx={{ width: 95, height: 95 }}
                  >
                    <Typography sx={{ fontSize: "3rem" }}>
                      {userName[0]}
                    </Typography>
                  </Avatar>
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
                    {userName}
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
                    {user?.email || "N/A"}
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
            {/* </Tooltip> */}

            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                marginLeft: 1,
                color: "#f2f2f2",
              }}
              textAlign="center"
            >
              {userName}
            </Typography>
            {/* <ArrowForwardIosIcon
              sx={{ display: { xs: "none", sm: "block" } }}
              className="mx-4"
              fontSize="small"
              color="action"
            />

            <HelpCenterOutlinedIcon
              sx={{ display: { xs: "none", sm: "block" } }}
              color="action"
            /> */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Nav.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Nav;
