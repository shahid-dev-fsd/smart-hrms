import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Apps from '@mui/icons-material/Apps';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import logo from './hivrrlogo.png';
import { useLocation } from 'react-router-dom';
import { Avatar, Grid, Menu, Stack, Tooltip } from '@mui/material';
import { env } from '../../utilities/function';
import { useMenu } from '../../hooks/useMenu';
import { clearCookie } from '../../utilities/cookies';
export const appList= [
  
  {
    logo: 'https://cdn.clikkle.com/images/campaigns/logo/2023/campaigns.png',
    name: 'Campaigns',
    link: 'https://clikkle.com/campaigns',
  },
  {
    logo: 'https://cdn.clikkle.com/images/host/logo/2023/host.png',
    name: 'Host',
    link: 'https://clikkle.com/host',
  },
  {
    logo: 'https://cdn.clikkle.com/images/files/logo/2023/files.png',
    name: 'Files',
    link: 'https://clikkle.com/files',
  },
  {
    logo: 'https://cdn.clikkle.com/images/e-sign/logo/2023/e-sign.png',
    name: 'E-Sign',
    link: 'https://clikkle.com/esign',
  },
  { logo: 'https://cdn.clikkle.com/images/ads/logo/2023/ads.png', 
    name: 'Ads',
    link: 'https://clikkle.com/ads',
  
  },
  {
    logo: 'https://cdn.clikkle.com/images/pitch/logo/2023/pitch.png',
    name: 'Pitch',
    link: 'https://clikkle.com/pitch',
  },
  { logo: 'https://cdn.clikkle.com/images/cmail/logo/2023/cmail.png', 
    name: 'Mail',
    link: 'https://clikkle.com/mail',
  
  },
  {
    logo: 'https://cdn.clikkle.com/images/projects/logo/2023/projects.png',
    name: 'Projects',
    link: 'https://clikkle.com/projects',
  },
  {
    logo: 'https://cdn.clikkle.com/images/launch/logo/2023/launch.png',
    name: 'Launch',
    link: 'https://clikkle.com/launch',
  },
  { logo: 'https://cdn.clikkle.com/images/hr/logo/2023/hr.png',
    name: 'HR',
    link: 'https://clikkle.com/hr',
   },
  { logo: 'https://cdn.clikkle.com/images/tax/logo/2023/tax.png', 
    name: 'Tax',
    link: 'https://clikkle.com/tax',
  },
  {
    logo: 'https://cdn.clikkle.com/images/chat/logo/2023/chat.png',
    name: 'Chat',
    link: 'https://clikkle.com/chat',
  },
  {
    logo: 'https://cdn.clikkle.com/images/social/logo/2023/social.png',
    name: 'Social',
    link: 'https://clikkle.com/social',
  },
  { logo: 'https://cdn.clikkle.com/images/sms/logo/2023/sms.png', 
    name: 'SMS',
    link: 'https://clikkle.com/sms',
  },
  {
    logo: 'https://cdn.clikkle.com/images/crew/logo/2023/crew.png',
    name: 'Crew',
    link: 'https://clikkle.com/crew',

  },
  {
    logo: 'https://cdn.clikkle.com/images/swiprr/logo/2023/swiprr.png',
    name: 'Swiprr',
    link: 'https://swiprr.clikkle.com',
  },
  {
    logo: 'https://cdn.clikkle.com/images/kept-up/logo/2023/kept-up.png',
    name: 'KeptUp',
    link: 'https://keptup.app',
  },
  {
    logo: 'https://cdn.clikkle.com/images/news/logo/2023/news.png',
    name: 'News',
    link: 'https://news.clikkle.com',
  },
  {
    logo: logo,
    name: 'Hivrr',
    link: 'https://hivrr.clikkle.com',
  },
];

const AppListToggler = ( {shouldRenderMenuIcon , careerUser =null}) => {
  const {
    anchorEl: anchorElProfile,
    openMenu: openProfileMenu,
    closeMenu: closeProfileMenu,
} = useMenu();
  const userName = (careerUser==null ) ? "U" : (careerUser?.firstName+ " "+careerUser?.lastName);

  const [anchorEl, setAnchorEl] = useState(null);
  let url =  encodeURIComponent(window.location.href)
  const redirectTo =
    env("AUTHENTICATION_CLIENT") +
    "/login?referrer="+url+"&&redirectto=" + url;

    const signOut = () => {
      clearCookie('accessToken');
      localStorage.removeItem("careerUser");
      const redirectTo =
          env('AUTHENTICATION_CLIENT') + '/logout?redirectto=' + url +'&&referrer='+url;
      window.location.replace(redirectTo);
  };


  
  return (
    <div className='hidden sm:flex items-center gap-2'>
      {shouldRenderMenuIcon && <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Apps />
      </IconButton> }
      {careerUser == null ?
      <Button variant='contained'>
          <Link to={redirectTo}>
           Sign In
          </Link>
        </Button>:
        <>
                                <Grid item>
                            <IconButton
                                onClick={openProfileMenu}
                                sx={{
                                    borderWidth: '2px',
                                    borderStyle: 'solid',
                                    borderColor: 'primary.main',
                                    p: '3px',
                                }}>
                                <Avatar
                                    alt={userName}
                                    src='data:image/jpeg;base64,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'
                                    sx={{ width: 30, height: 30 }}
                                />
                            </IconButton>

                            <Menu
                                anchorEl={anchorElProfile}
                                open={Boolean(anchorElProfile)}
                                onClose={closeProfileMenu}
                                sx={{
                                    '.MuiPaper-root.MuiMenu-paper.MuiPopover-paper': {
                                        width: 'min(100%, 320px)',
                                        boxShadow:
                                            'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                                        border: '1px solid #00000017',
                                        bgcolor: 'custom.menu',
                                        px: 0.5,
                                        pt: 1.5,
                                    },
                                }}>
                                <Grid container spacing={2} alignItems='center' flexWrap='nowrap'>
                                    <Grid item>
                                        <Avatar
                                            alt={userName}
                                            src='https://shorturl.at/fjqz9'
                                            sx={{ width: 100, height: 100 }}
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography
                                            variant='substitle1'
                                            component='div'
                                            fontWeight={600}
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}>
                                            {userName}
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            component='div'
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}>
                                            {careerUser?.email || "N/A"}
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            component='a'
                                            href={env('MY_ACCOUNT')}
                                            color='primary.main'
                                            display='block'>
                                            My Clikkle account
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            component='a'
                                            href='#'
                                            color='primary.main'
                                            display='block'>
                                            My Profile
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Stack direction='row' mt={2}>
                                    <Button variant='text' fullWidth>
                                        Add account
                                    </Button>
                                    <Button variant='text' onClick={signOut} fullWidth>
                                        Sign out
                                    </Button>
                                </Stack>
                            </Menu>
                        </Grid>

{/*         
        <Tooltip title={userName}>
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt={userName}
                />
              </IconButton>
            </Tooltip>

            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                color: "text.secondary",
                marginLeft: 1,
                color: "#424242",
              }}
              textAlign="center"
            >
             {userName}
            </Typography> */}
        </>


         }
{
  shouldRenderMenuIcon && 
  <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className='w-[350px] p-4 flex items-center justify-center flex-wrap gap-4'>
          {appList.map((app) => (
            <div
              key={app.logo}
              className='flex flex-col items-center w-[80px] cursor-pointer'
            >
              <Link to={app.link}>
              <img
                src={app.logo}
                alt={app.name}
                className='h-[35px] w-[35px]'
              />
              </Link>
              <Link to={app.link}>
              <Typography sx={{ p: 1 }}>{app.name}</Typography>
              </Link>
              
            </div>
          ))}
        </div>
      </Popover>
}
      
    </div>
  );
};

export default AppListToggler;
