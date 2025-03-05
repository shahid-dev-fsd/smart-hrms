import { createTheme } from '@mui/material';
import React, { useMemo, useContext, useState, createContext, useLayoutEffect, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getCookie, setCookie } from '../utilities/cookies';

const ThemeContext = createContext({ toggleTheme: () => {} });

const ThemeContextProvider = props => {
    const preferTheme = systemPreferTheme();
    const [mode, setMode] = useState(preferTheme || 'dark');



    function toggleTheme() {
        setMode(prevMode => {
            const theme = prevMode === 'light' ? 'dark' : 'light';
            setCookie('P13N', theme);
            return theme;
        });
    }

    function systemPreferTheme() {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        else if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
        else return 'dark';
    }

    useLayoutEffect(() => {

        const theme = getCookie('P13N');

        console.log('theme' , theme);
        if (theme) setMode(theme || preferTheme);
    }, [mode, preferTheme]);

    const light = useMemo(
        () => ({
            background: {
                main: '#FFFFFF',
                paper: '#FFFFFF',
                default: '#F7F9FC',
                box: '#F7F9FC',
                view: '#f4f4f5',
                rec:'#fff',
                bond:'#f8fafc',
                card: "#fff",
                active  : "#1976d2",
                input : "#EEEEEE",

                cardView: "#e3f2fd",
                activeTab: "#bbdefb",
            },
            text: {
               two:'#3f3f46',
                one: '#1d1d1e',
                four:"#000000"
            },
            divider: '#e7e3e3',
            custom: {
                search: {
                    main: '#edf2fc',
                    focus: 'white',
                },
                border: '#e7e3e3',
                common: 'white',
                paper: '#F7F9FC',
                menu: '#FFFFFF',
            },
        }),
        []
    );

    const dark = useMemo(
        () => ({
            background: {
                main: '#000000',
                paper: '#141414',
                default: '#141414',
                box: '#000000',
                view: '#171717',
                rec:'#000',
                bond:'#262626',
                card: "#1976d2",
                input : "#1E1E1E",
                active  : "#1976d2",

                cardView: "#171717",
                activeTab: "#171717",
            },
            text: {
                secondary: '#818991',
                one: '#57534e',
                two:'#d1d5db',
                three : "#a8a29e",
                four:"#A5A5A5"
            },
            divider: '#424242',
            custom: {
                search: {
                    main: '#1A1A1A',
                    focus: '#2F2F2F',
                },
                border: '#616161',
                common: 'black',
                paper: '#141414',
                menu: '#000000',
            },
        }),
        []
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#3B84D9',
                    },

                    ...(mode === 'light' ? light : dark),
                },
                breakpoints: {
                    keys: ['xs', 'sm', 'md', 'xm', 'lg', 'xl', 'xxl'],
                    values: {
                        xs: 0,
                        sm: 576,
                        md: 768,
                        xm: 1024,
                        lg: 1280,
                        xl: 1516,
                        xxl: 1756,
                    },
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: theme => ({
                            body: {
                                '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                                    backgroundColor: 'transparent',
                                    width: '6px',
                                },
                                '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                                    borderRadius: 8,
                                    backgroundColor: theme.palette.divider,
                                    // backgroundColor: 'red',
                                },
                                '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
                                    {
                                        backgroundColor: '#747775',
                                    },
                                '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
                                    {
                                        backgroundColor: '#747775',
                                    },
                                '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
                                    {
                                        backgroundColor: '#747775',
                                    },
                            },
                        }),
                    },
                    MuiIconButton: {
                        variants: [
                            {
                                props: {
                                    disableRipple: true,
                                    variant: 'navIcon',
                                },
                                style: ({ theme }) => ({
                                    marginRight: theme.spacing(2),
                                    padding: '10px',
                                    borderRadius: '8px',
                                }),
                            },
                        ],
                        styleOverrides: {
                            root: ({ theme }) => ({
                                backgroundColor: theme.palette.background.paper,
                                '&:hover': {
                                    backgroundColor: theme.palette.custom.background,
                                },
                            }),
                        },
                    },
                    MuiDivider: {
                        styleOverrides: {
                            light: {
                                borderColor: '#424242',
                                width: '100%',
                            },
                        },
                    },
                    MuiListItemButton: {
                        variants: [
                            {
                                props: { variant: 'sidebarButton' },
                                style: ({ theme }) => ({
                                    padding: '2px 12px',
                                    cursor: 'pointer',
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                    '&.Mui-selected': {
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.main,
                                        },
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: '8px',
                                        '.MuiListItemIcon-root': {
                                            color: 'white',
                                        },
                                        '.MuiListItemText-root': {
                                            color: 'white',
                                        },
                                        '.MuiSvgIcon-root': {
                                            color: 'white',
                                        },
                                    },
                                }),
                            },
                            {
                                props: { variant: 'sidebarDropDown' },
                                style: ({ theme }) => ({
                                    padding: '2px 0px 2px 12px',
                                    cursor: 'pointer',
                                    color: theme.palette.text.secondary,

                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },

                                    '&.Mui-selected': {
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                        },
                                        '.MuiListItemIcon-root': {
                                            color: theme.palette.primary.main,
                                        },
                                        '.MuiListItemText-root': {
                                            color: theme.palette.primary.main,
                                        },
                                        '.MuiSvgIcon-root': {
                                            color: theme.palette.primary.main,
                                        },
                                    },
                                }),
                            },
                        ],
                    },
                    MuiButton: {
                        variants: [
                            {
                                props: { variant: 'contained' },
                                style: ({ theme }) => ({
                                    color: theme.palette.common.white,
                                }),
                            },
                        ],
                        styleOverrides: {
                            root: {
                                textTransform: 'none',
                            },
                        },
                    },
                    MuiTextField: {
                        styleOverrides: {
                            root: {
                                marginBottom: '16px',
                            },
                        },
                    },
                    MuiMenu: {
                        styleOverrides: {
                            root: {
                                // '.MuiPaper-root.MuiMenu-paper.MuiPopover-paper': {
                                //     minWidth: '180px',
                                // },
                                '.MuiMenu-list': {
                                    padding: '5px',
                                },
                                '.MuiButtonBase-root.MuiMenuItem-root': {
                                    fontSize: '14px',
                                },
                            },
                        },
                    },
                    MuiSelect: {
                        styleOverrides: {
                            root: {
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                            },
                        },
                    },
                    MuiTab: {
                        styleOverrides: {
                            root: {
                                textTransform: 'capitalize',
                            },
                        },
                    },
                    MuiModal: {
                        styleOverrides: {
                          root: {
                            overflowY: 'scroll',
                          },
                        },
                    },
                },
            }),
        [mode, dark, light]
    );
    useEffect(()=>{
        const queryParameters = new URLSearchParams(window.location.search)
        const  queryTheme = queryParameters.get("theme");
        console.log('queryTheme' , queryTheme);
        if (queryTheme) {
            let theme =(queryTheme =="dark"?"dark":"light")
            setCookie('P13N', theme);
            setMode(theme)       
        }
    },[])

    return (
        <ThemeContext.Provider value={{ toggleTheme, mode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
export default ThemeContextProvider;

const useTheme = () => {
    const toggleTheme = useContext(ThemeContext).toggleTheme;
    const mode = useContext(ThemeContext).mode;
    return { toggleTheme, mode };
};

const isLightColor = (color) => {
    // Convert hex to RGB
    const hexToRgb = (hex) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    };
  
    // Get RGB values
    const rgb = hexToRgb(color);
    if (!rgb) return true; // Default to light if invalid color
  
    // Calculate relative luminance
    const luminance =
      (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  
    // Return true if luminance is greater than 0.5 (light color)
    return luminance > 0.5;
  };

export { useTheme, isLightColor };
