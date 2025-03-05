import React from "react";
import {
    Divider,
    IconButton,
    Typography,
  } from '@mui/material';
  import { Link, useLocation } from 'react-router-dom';
  import {
    Facebook,
    QuestionMarkRounded,
    Twitter,
    YouTube,
    
  } from '@mui/icons-material';



const FooterBlock = ( ) => {

  const location = useLocation();
  const pathName = location.pathname;
  const name = pathName.split('/')[2]; 
  const decodedName = decodeURIComponent(name);
  const shouldRenderMenuIcon = !pathName.includes(`/career/${decodedName}`) && decodedName === 'Clikkle Technologies' ;
    return (
       <div>
        { shouldRenderMenuIcon && 
         <div className='flex items-center gap-4 p-4'>
          <Typography className='text-gray-700 dark:text-gray-200'>
              Follow our blog
          </Typography>
          <IconButton>
            <YouTube />
          </IconButton>

          <IconButton>
            <Twitter />
          </IconButton>

          <IconButton>
            <Facebook />
          </IconButton>
        </div>
}
      

      <Divider />
      <div className='py-4 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 p-4'>
      { shouldRenderMenuIcon ? <div className='flex items-center gap-2 sm:gap-4'>
          <Link to={"https://clikkle.com"}>
          <Typography className='text-gray-600 dark:text-gray-300'>
            Clikkle
          </Typography>
          </Link>
          <Link to={"https://clikkle.com/about"}>
          <Typography className='text-gray-600 dark:text-gray-300'>
            About
          </Typography>
          </Link>
          <Link to={"https://clikkle.com/products"}>
          <Typography className='text-gray-600 dark:text-gray-300'>
            Products
          </Typography>
          </Link>
          <Link to={"https://careers.clikkle.com"}>
          <Typography className='text-gray-600 dark:text-gray-300'>
            Careers
          </Typography>
          </Link>
          <Link to={"https://clikkle.com/privacy"}>
          <Typography className='text-gray-600 dark:text-gray-300'>
            Privacy
          </Typography>
          </Link>
          <Link to={"https://clikkle.com/terms"}>
          <Typography className='text-gray-600 dark:text-gray-300'>
            Terms
          </Typography>
          </Link>
        </div> : <div className='flex items-center gap-2 sm:gap-4'> </div>}

        <div className='flex items-center gap-2 sm:gap-4'>
          <IconButton>
          <Link to="https://support.clikkle.com">
              <QuestionMarkRounded className='text-gray-600 dark:text-gray-300' />
            </Link>          </IconButton>

          <Typography className='text-gray-600 dark:text-gray-300' >
            <Link to="https://support.clikkle.com">
              Help
            </Link>
          </Typography>
          <div className='border-gray-300 dark:border-gray-600 border-[1px] rounded-md px-6 py-[6px]'>
            <Typography className='text-gray-600 dark:text-gray-300'>
              English
            </Typography>
          </div>
        </div>
        </div>
       </div>
    );
};

export default FooterBlock;
