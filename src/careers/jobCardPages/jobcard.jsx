import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faWallet, faBriefcase, faLocationDot, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import './jobCard.css';
import JobRole from '../jobRolepages/jobRole';
import { Link, useParams } from 'react-router-dom';

const JobCard = ({jobs,index}) => {
  const [show, setShow] = useState(false);
  const { organization } = useParams();
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };
  // const [jobs, setJobs] = useState<[]>([]);;

  //   async function fetchJobs() {
  //       try {
  //           const response = await axios.get(`/open/job-listing/?sortBy=order`);

  //           const jobs = response.data.jobs;
  //           console.log(jobs)

  //           setJobs(jobs);
  //       } catch (e) {}
  //   }

  //   useEffect(() => {
  //       fetchJobs();
  //   }, []);
  //   console.log(jobs)
  // console.log(jobs)
  return (
    <div>
      
        <div className="main rounded-md border border-zinc-300 shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 mt-2 lg:p-0 p-4">

          <div className="row2 col-span-1 md:col-span-1 lg:col-span-1 text-left items-start lg:w-5/6">
          <Link to={`/career/${organization}/job/${jobs._id}` } onClick={handleLinkClick}>
            <h1 className="text-md font-semibold text-black px-2 py-4 dark:text-zinc-200">
              {jobs.title}
            </h1>
            </Link>
            
          </div>

          <div className="row3 col-span-1 pt-5 lg:w-2/3">
            <h1 className='text-sm font-semibold text-zinc-500 px-2'><FontAwesomeIcon icon={faWallet} /> {`${jobs.salary.amount} ${jobs.salary.currency}`}</h1>

          </div>
          <div className="row4 col-span-1 pt-5 lg:w-2/3">
            <h1 className="text-zinc-500 px-2"><FontAwesomeIcon icon={faBriefcase} /> {jobs.experience} Years</h1>

          </div>
          <div className="row5 col-span-1 pt-5 lg:w-2/3">
            <p className="text-zinc-500 px-2"><FontAwesomeIcon icon={faLocationDot} /> {jobs && jobs.
remote == true ? 'Remote' : 'On-Site'}</p>

          </div>
          <div className="row6 col-span-1 pt-5 lg:w-2/3 pl-2 lg:pl-0">
            <p className="text-zinc-500 text-sm font-semibold"><FontAwesomeIcon icon={faLayerGroup} /> {jobs.department
            }</p>



          </div>


          <div className="row7 col-span-1 text-xs flex items-center justify-between sm:justify-center md:justify-center gap-2 lg:w-full">
            <p className="text-xs dark:text-zinc-300 text-black" onClick={() => setShow(!show)}>
              Show Details <FontAwesomeIcon icon={faChevronDown} />
            </p>
            <Link to={`/career/${organization}/job/${jobs._id}`} onClick={handleLinkClick}>
              <button className="text-white dark:text-white border border-black-500 px-6 py-2 rounded-md bg-blue-500">
                Apply Now
              </button>
            </Link>
          </div>
          {show && <div className="row8 col-span-2 md:col-span-2 lg:col-span-7 px-5 py-5 pt-4 text-sm">
              <JobRole job={jobs} _id={jobs._id} organization={organization}/>
            </div>}
        </div>
    </div>
  );
};

export default JobCard;
