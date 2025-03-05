import {
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Facebook,
  QuestionMarkRounded,
  Twitter,
  YouTube,
} from '@mui/icons-material';
import { Instagram } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './searchBar';
import JobCard from '../jobCardPages/jobcard';
import Banner from './banner';
import { useLocation } from 'react-router-dom';


const Home = () => {
  const [jobs, setJobs] = useState([]);
  const { organization } = useParams();
  const navigate = useNavigate();
  const [orgName, setOrgName] = useState('');
  const [orgId, setOrgId] = useState('');

  useEffect(() => {
    const urlParams = new URL(window.location.href);
    const pathname = urlParams.pathname;

    const name = pathname.split('/')[2]; // Get the part after the first slash
    const decodedName = decodeURIComponent(name);
    if (decodedName) {
      setOrgName(decodedName);
      fetchOrganization(decodedName);
    }
  }, []);

  async function fetchOrganization(name) {
    try {
      const response = await axios.get(`/open/org-info?name=${name}`);
      const organization = response.data.organization;
        setOrgId(organization._id);
        localStorage.setItem('Organization', organization.name);
        localStorage.setItem('JobApply', true);
   

    } catch (error) {
      console.error('Error fetching organization:', error);
     navigate('/career/404');
    }
  }

  async function fetchJobs() {
    if (!orgId) return; // Ensure orgId is set before making the request

    try {
      const response = await axios.get(`/open/job-listing?adminId=${orgId}&sortBy=order&direction=1`);
      console.log(response);
      const jobs = response.data.jobs;
      console.log(jobs);
      setJobs(jobs);
    } catch (e) {
      console.error('Error fetching jobs:', e);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, [orgId]);

  const location = useLocation();
  const pathName = location.pathname;

  
  const shouldRenderMenuIcon = !pathName.includes(`/career/${orgName}`) && orgName === 'Clikkle Technologies' ;

  return (
    <>
    <div className='px-2 py-8 sm:px-6 sm:py-6'>
      <Banner />
      <SearchBar />
      {jobs?.map((item, index) => (
        <JobCard jobs={item} index={index} key={index} />
      ))}
{
   shouldRenderMenuIcon && 
   <div className='flex items-center gap-4 p-4'>
   <Typography className='text-gray-700 dark:text-gray-200'>
     Follow our blog
   </Typography>
   <IconButton>
     <Link to="https://www.youtube.com/clikkle">
       <YouTube />
     </Link>
   </IconButton>

   <IconButton>
     <Link to="https://twitter.com/clikkle">
       <Twitter />
     </Link>
   </IconButton>

   <IconButton>
     <Link to="https://facebook.com/clikkle">
       <Facebook />
     </Link>
   </IconButton>
   <IconButton>
     <Link to="https://www.instagram.com/myclikkle">
       <Instagram />
     </Link>
   </IconButton>
 </div>
}
     

      <Divider />

      <div className={`py-4 sm:py-8 flex flex-col sm:flex-row items-center ${shouldRenderMenuIcon ? 'justify-between' : 'justify-end'} gap-4 sm:gap-8 p-4`}>
      { shouldRenderMenuIcon &&
         <div className='flex items-center gap-2 sm:gap-4'>
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
          <Link to={"https://policies.clikkle.com/privacy"}>
            <Typography className='text-gray-600 dark:text-gray-300'>
              Privacy
            </Typography>
          </Link>
          <Link to={"https://policies.clikkle.com/terms"}>
            <Typography className='text-gray-600 dark:text-gray-300'>
              Terms
            </Typography>
          </Link>
        </div> }

        <div className='flex items-center gap-2 sm:gap-4'>
          <IconButton>
            <Link to="https://support.clikkle.com">
              <QuestionMarkRounded className='text-gray-600 dark:text-gray-300' />
            </Link>
          </IconButton>

          <Typography className='text-gray-600 dark:text-gray-300'>
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
   
    </>
    
  );
};

export default Home;
