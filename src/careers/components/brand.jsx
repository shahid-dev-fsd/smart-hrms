import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ServerImage } from '../../components/Images';


const Brand = ({ shouldRenderMenuIcon=false ,  orgName="" , orgLogo =""}) => {
  // const location = useLocation();

  // const orgName = localStorage.getItem('Organization');
  // const pathName = location.pathname;

  // const shouldRenderMenuIcon =
  //   !pathName.includes(`/career/${orgName}`) && orgName ==='Clikkle Technologies';
  const orgLogoLink = orgLogo && process.env.REACT_APP_PRODUCTION_SERVER + '/static/' + orgLogo;
  return (
    <div className='flex items-center flex-grow gap-2 lg:pl-4'>
   
        <Link to={`/career/${orgName}`}>
        { shouldRenderMenuIcon ? (
           <img alt="logo"
          className='w-[35px] h-[35px] sm:w-[35px] sm:h-[35px]'
          src='https://cdn.clikkle.com/images/clikkle/logo/2023/clikkle.png'
          />
          ) :
           <>{orgLogo != "" && <img alt="logo" className='w-[35px] h-[35px] sm:w-[35px] sm:h-[35px]'  src={orgLogoLink} /> }</> 
         }
        </Link>
     {
      shouldRenderMenuIcon ?
    <>
      <Link to={`/career/${orgName}`}>
        <h1 className='text-black dark:text-white text-base sm:text-lg md:text-2xl sm:text-sm font-bold'>
          Clikkle
        </h1>
        </Link>
        <Link to={`/career/${orgName}`}>
        <h2 className='text-black dark:text-white text-base sm:text-lg md:text-2xl sm:text-xs' >
          Careers
        </h2>
      </Link>
    </> : 
    <Link to={`/career/${orgName}`}>
     <h1 className='text-black dark:text-white text-base sm:text-lg md:text-2xl sm:text-sm font-bold'>
      {orgName}
    </h1>
    </Link>}  
    </div>
  );
};

export default Brand;
