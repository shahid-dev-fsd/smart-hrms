import {
    DashboardOutlined,
} from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsIcon from '@mui/icons-material/Groups';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import InterviewIcon from './icons/interview.png';
import JobListIcon from './icons/joblisting.png'
import OfficeIcon from './icons/office.png'
import ReceivedIcon from './icons/recieved.png';
import AttendIcon from './icons/attend.png';
import LeaveIcon from './icons/leave.png';
import PersonIcon from './icons/person.png';
import DownloadIcon from './icons/download.png';



const InterviewQuestionIcon = () => <img src={InterviewIcon} alt="Interview Icon" style={{ width: '24px', height: '24px' }} />;
const JobList = () => <img src={JobListIcon} alt="Interview Icon" style={{ width: '20px', height: '20px' }} />;
const Office = () => <img src={OfficeIcon} alt="Interview Icon" style={{ width: '20px', height: '20px' }} />;
const Received = () => <img src={ReceivedIcon} alt="Interview Icon" style={{ width: '20px', height: '20px' }} />;
const Leave = () => <img src={LeaveIcon} alt="Interview Icon" style={{ width: '20px', height: '20px' }} />;
const Attend= () => <img src={AttendIcon} alt="Interview Icon" style={{ width: '20px', height: '20px' }} />;
const Person = () => <img src={PersonIcon} alt="Interview Icon" style={{ width: '20px', height: '20px' }} />;
const Download= () => <img src={DownloadIcon} alt="Interview Icon" style={{ width: '20px', height: '20px' }} />;


const menuItems = [
    {
        icon: <HomeIcon fontSize='small' />,
        label: 'Dashboard',
        to: [
            {
                label: 'Dashboard',
                icon: <HomeOutlinedIcon fontSize='small' className='text-zinc-500' />,
                to: '/',
            },
            {
                label: 'Job Listing',
                icon:<JobList/>,
                to: '/joblisting',
            },
            {
                label: 'Interview Question',
                icon:  <InterviewQuestionIcon />,
                to: '/interviewquestions',
            },
            {
                label: 'Department',
                icon: <Office/>,
                to: '/department',
            },
            {
                label: 'Received Applications',
                icon: <Received/>,
                to: '/receivedapplications',
            },
        ],
    },
    {
        icon: <GroupsIcon fontSize='small' />,
        label: 'Employees',
        to: [
            {
                label: 'Employee List',
                icon: <Person/>,
                to: '/employees',
            },
            {
                label: 'Employee View',
                icon: <Person/>,
                to: '/performance',
            },
        ],
    },
    {
        label: 'Attendance',
        icon: <DashboardOutlined fontSize='small' />,
        to: [
            {
                label: 'Attendance View',
                icon: <Attend />,
                to: '/attendanceview',
            },
            {
                label: 'Leave Setting',
                icon: <Leave/>,
                to: '/leavesettings',
            },
            {
                label: 'Leave Application',
                icon: <Download/>,
                to: '/leaveapplication',
            },
            {
                label: 'Attendance By User',
                icon: <Person/>,
                to: '/attendance',
            },
           
        ],
    },
    {
        label: 'Projects',
        icon: <DashboardOutlined fontSize='small' />,
        to: [
            {
                label: 'Dashboard',
                icon: <Attend />,
                to: '/dashboardproject',
            },
            {
                label: 'Project List',
                icon: <Leave/>,
                to: '/OverViewCalender',
            },
            {
                label: 'View Project',
                icon: <Download/>,
                to: '/ViewProject',
            },
            {
                label: 'Overview Calendar',
                icon: <Person/>,
                to: '/OverTime',
            },
            {
                label: 'New Project',
                icon: <Person/>,
                to: '/newProject',
            },
           
        ],
    },
    {
        icon: <GroupsIcon fontSize='small' />,
        label: 'Notice Board',
        to: '/noticeboard',
    },
    {
        icon: <GroupsIcon fontSize='small' />,
        label: 'Expenses',
        to: '/expenses',
    },
    {
        label: 'Payroll',
        icon: <DashboardOutlined fontSize='small' />,
        to: [
            {
                label: 'Employee Salary',
                icon: <Attend />,
                to: '/employeesalary',
            },
            {
                label: 'Add Payroll',
                icon: <Leave/>,
                to: '/addpayroll',
            },
            {
                label: 'Edit Payroll',
                icon: <Download/>,
                to: '/editpayroll',
            },
           
        ],
    },
    {
        label: 'Award',
        icon: <EmojiEventsIcon fontSize='small' />,
        to: '/award',
    },
    {
        label: 'Holiday',
        icon: <HolidayVillageIcon fontSize='small' />,
        to: '/holidays',
    },
    {
        icon: <GroupsIcon fontSize='small' />,
        label: 'Memos',
        to: '/memos',
    },
    {
        icon: <GroupsIcon fontSize='small' />,
        label: 'Rules & Regulations',
        to: '/rulesandregulations',
    },
    {
        icon: <GroupsIcon fontSize='small' />,
        label: 'Support System',
        to: [
            {
                label: 'Landing Pages',
                icon: <Attend />,
                to: [
                    {
                        label: 'Landing Pages',
                        icon: <Attend />,
                        to: '',
                    },
                    {
                        label: 'Knowledge Pages',
                        icon: <Leave />,
                        to: '',
                    },
                    {
                        label: 'Knowledge View',
                        icon: <Leave />,
                        to: '',
                    },
                ],
            },
         
        ],
    },
    
    {
        icon: <GroupsIcon fontSize='small' />,
        label: 'Chat',
        to: 'chat',
    },
    {
        label: 'Admin',
        icon: <DashboardOutlined fontSize='small' />,
        to: [
            {
                label: 'General Settings',
                icon: <Attend />,
                to: '/employees/award',
            },
            {
                label: 'API Settings',
                icon: <Leave/>,
                to: '/employees/award',
            },
            {
                label: 'Role Access',
                icon: <Download/>,
                to: '/employees/award',
            },
           
        ],
    },
];

export { menuItems };
