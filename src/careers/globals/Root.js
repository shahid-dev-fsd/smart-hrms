import React, { useEffect, useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

import { useTheme } from "../atoms/theme";
import Header from "../components/header";
import { RecoilRoot } from "recoil";
import axios from "axios";

const defaultTheme = createTheme({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1280,
      xl: 1516,
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: theme.palette.divider,
            // backgroundColor: 'red',
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#747775",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "#747775",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#747775",
            },
        },
      }),
    },

    MuiDivider: {
      styleOverrides: {
        light: {
          borderColor: "#424242",
          width: "100%",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: ({ theme }) => ({ color: theme.palette.common.white }),
        },
      ],
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          ".MuiMenu-list": {
            padding: "5px",
          },
          ".MuiButtonBase-root.MuiMenuItem-root": {
            fontSize: "14px",
          },
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});

const lightThemeConfig = {
  background: {
    paper: "#FFFFFF",
    default: "#F7F9FC",
  },
  divider: "#e7e3e3",
  custom: {
    search: {
      main: "#edf2fc",
      focus: "white",
    },
    border: "#e7e3e3",
    hoverColor: "#45B5E8",
    common: "white",
    color: "rgba(0, 0, 0, 0.87)",
    appsHover: "rgb(232, 240, 254)",
    menu: "#FFFFFF",
    cardHover: "#E1E5EA",
    trashCaption: "#E3E3E3",
    selectedCard: "#c2e7ff",
    selectedMove: "#c2e7ff",
    selectedPanel: "#f2f6fc",
    response: "#2f2e2e",
    selectedHover: "#B3D7EF",
    shareHover: "rgb(140 140 140 / 15%)",
    uploadButton: "#FFF",
    uploadButtonHover: "#EDF2FA",
  },
};

const darkThemeConfig = {
  background: {
    paper: "#000000",
    default: "#141414",
  },
  text: {
    secondary: "#818991",
  },
  divider: "#424242",
  custom: {
    search: {
      main: "#1A1A1A",
      focus: "#2F2F2F",
    },
    border: "#616161",
    hoverColor: "#fff",
    common: "black",
    appsHover: "rgb(39, 46, 58)",
    menu: "#424242",
    cardHover: "#2F2F2F",
    trashCaption: "#2f2e2e",
    selectedCard: "#2f2e2e",
    selectedPanel: "#2f2e2e",
    selectedMove: "#44b5e899",
    response: "white",
    selectedHover: "rgba(255, 255, 255, 0.08)",
    shareHover: "rgba(255, 255, 255, 0.08)",
    uploadButton: "#2F2F2F",
    uploadButtonHover: "#141414",
  },
};

const RootContainer = ({ children, careerUser, setCareerUser }) => {
  const { theme } = useTheme();
  const [orgName, setOrgName] = useState("");
  const [orgLogo, setOrgLogo] = useState("");
  const muiTheme = useMemo(() => {
    return createTheme({
      ...defaultTheme,
      palette: {
        mode: theme,
        primary: { main: "#3B84D9" },
        ...(theme === "light" ? lightThemeConfig : darkThemeConfig),
      },
    });
  }, [theme]);
  const location = useLocation();
  const pathname = location.pathname;

  async function fetchOrganization(name) {
    try {
      const response = await axios.get(`/open/org-info?name=${name}`);
      const organization = response.data.organization;
      setOrgLogo(organization.logo);
      localStorage.setItem("Organization", organization.name);
      localStorage.setItem("OrganizationLogo", organization.logo);
      localStorage.setItem("OrganizationLogoURL", organization.name);
      localStorage.setItem("JobApply", true);
    } catch (error) {}
  }

  useEffect(() => {
    const name = pathname.split("/")[2]; // Get the part after the first slash
    const decodedName = decodeURIComponent(name);

    if (decodedName) {
      setOrgName(decodedName);
      fetchOrganization(decodedName);
    } else {
      const orgNameTemp = localStorage.getItem("Organization");
      const orgLogoTemp = localStorage.getItem("OrganizationLogo");
      setOrgName(orgNameTemp);
      setOrgLogo(orgLogoTemp);
    }

    (async () => {
      try {
        const queryParameters = new URLSearchParams(window.location.search);
        const userId = queryParameters.get("userId");
        const refreshToken = queryParameters.get("refreshToken");
        console.log(userId);

        if (userId) {
          var formData = new FormData();
          formData.append("id", userId);
          const response = await fetch(
            "https://accounts.clikkle.com:5000/api/auth/get_user_profile",
            // "https://api.campaigns.clikkle.com/get_user_profile",
            // "http://localhost:5000/api/auth/get_user_profile",
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            console.log("user found ...");
            const responseData = await response.json();
            let { user } = responseData;
            user.refreshToken = refreshToken;
            console.log(user);
            localStorage.setItem("careerUser", JSON.stringify(user));
            setCareerUser(user);
          }
        } else if (localStorage.getItem("careerUser")) {
          let user = JSON.parse(localStorage.getItem("careerUser"));
          setCareerUser(user);
        }
      } catch (err) {
        console.log(err);
        // handleAxiosError(err, showError);
      }
    })();
  }, []);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="sticky top-0 z-50">
        <Header careerUser={careerUser} orgName={orgName} orgLogo={orgLogo} />
      </div>
      <div>{children}</div>
    </ThemeProvider>
  );
};

export default RootContainer;
