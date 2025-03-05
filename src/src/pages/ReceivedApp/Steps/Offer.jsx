import React, {useState} from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Button} from '@mui/material';
import img1 from './image1.png'
import img2 from './image2.png';
import { useNavigate } from 'react-router-dom';


const OfferPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [scheduleButtonText, setScheduleButtonText] = useState('Send Offer Letter');
    const [scheduleDisabled, setScheduleDisabled] = useState(false);
    const navigate = useNavigate();

    const toggleButtonText = () => {
        setScheduleDisabled(true);
        setShowPopup(true);
        if (scheduleButtonText === 'Send Offer Letter') {
            setScheduleButtonText('Send Agreement');
        }
    };

    const handleSendOfferLetter = () => {
        if (scheduleButtonText === 'Send Agreement') {
            navigate(`/showmore:id/sendagreement`);
        }
    };
    
    return (
        <div className="container mx-auto overscroll-auto overflow-hidden">
            <div className="flex items-center justify-between p-4">
                <div>
                    <h1 className="text-sm md:text-3xl text-zinc-400">Job Application Details</h1>
                </div>
                <div className="flex items-center gap-4">
                <button
                        disabled={scheduleDisabled}
                        onClick={toggleButtonText}
                        className="text-white font-bold text-[8px] md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded bg-sky-500 hover:bg-sky-700"
                    >
                        {scheduleButtonText}
                    </button>
                   <InfoOutlinedIcon />
                </div>
            </div>
            <div className='flex justify-between items-center w-full mt-5'>
                <div className='flex items-center pl-6'>
                    <img src='https://cdn.clikkle.com/images/clikkle/logo/2023/clikkle-text.png' alt='clikkle' className='w-auto h-auto'/>
                </div>
                <div className='flex flex-col gap-0 border border-zinc-50 p-2 md:p-4 w-[20%] md:w-[10%] border border-r-black'>
                        <p className='text-[8px] md:text-[12px]  text-start pl-3 md:pl-0'>Offer</p>
                        <h1 className='text-[10px] md:text-[16px]  text-start pl-3 md:pl-0'>LETTER</h1>
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 w-full mt-28 h-auto md:h-[350px] md:justify-center items-center'>
                <div className='w-full md:w-1/3 ml-8 flex flex-col md:mb-0'>
                    <div>
                        <h1 className='text-2xl  text-start font-bold'>SENIOR</h1>
                        <h1 className='text-2xl text-sky-500 text-start font-bold'>UX/UI DESIGNER</h1>
                    </div>
                    <div className='flex flex-row gap-2 w-full md:gap-8'>
                        <div className='w-[25px] mt-20'>
                            <p className='text-zinc-500 font-bold fa-rotate-270 text-nowrap text-xl'>JOB TITLE</p>
                        </div>
                        <div className='w-4/5 mt-10'>
                            <h1 className='text-center text-[10px] md:text-lg  pt-14'><FontAwesomeIcon icon={faSquare} className='text-[10px] mr-2' />JOIN OUR TEAM OF PROFESSIONAL</h1>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-2/3 flex flex justify-center'>
                    <img src={img1} alt='image1'/>
                </div>
                <div className='w-full md:w-1/3 ml-5 md:ml-0 md:mb-0'>
                    <h1 className='text-2xl  text-start font-bold'>Job</h1>
                    <h1 className="text-2xl text-sky-500 text-start font-bold">Description.</h1>
                    <p className='text-[12px] text-left pr-12 pt-5'>
                        We are seeking a highly skilled freelance
                        UI/UX Designer to design a user-based
                        dashboard experience that is intuitive,
                        user-friendly and visually appealing. In 
                        this role, you will work closely with our 
                        strategy lead, and developers and other 
                        stakeholders to create..<span className='text-blue-500 text-sm'>ReadMore</span>
                    </p>
                </div>
            </div>
            <div className='w-full flex justify-center items-center h-[300px] md:mt-10'>
            <div className='w-full  md:w-[75%] mt-10 flex flex-col'>
                <h1 className='text-blue-500 text-sm text-center'>Greetings [Name],</h1>
                <h1 className='text-[10px] p-5 md:p-0 md:text-sm text-left md:text-center'>
                    After a through assessment of your credentials and thoughtful deliberation, we are delighted to extend an offer for the position offer
                    [position title]. We kindly request your meticulous review of the attached job offer letter, and we encourage you to affix your signature at 
                    your earliest convenience. This step marks the initiation of your onboarding journey.
                </h1>
                <h1 className='text-sm text-center text-blue-500'>We look forward to your positive response.</h1>
            </div>
            </div>
            <div className='w-full flex justify-center items-center h-[150%] md:h-[300px]'>
            <div className='w-[75%] mt-10 flex flex-col'>
                <h1 className=' text-3xl md:text-5xl text-center font-bold'>JOIN OUR</h1>
                <h1 className='text-blue-500 text-3xl md:text-5xl text-center font-bold'>GROWING</h1>
                <h1 className='text-3xl md:text-5xl text-center  font-bold'>TEAM</h1>
            </div>
            </div>
            <div className='w-full flex flex-col gap-4 h-[450px] md:h-[600px] mt-32'>
                <div className='w-full h-[420px] md:h-[400px] mx-4 md:mx-8 flex flex-col md:flex-row gap-4'>
                    <div className='w-[90%] md:w-1/2 flex flex-col'>
                        <h1 className='text-3xl'>About <span className='text-3xl text-blue-500'>Company</span></h1>
                        <p className='text-sm text-left pt-10'>
                            Clikkle Technologies disrupts the SaaS sector with practical A1
                            solutions, empowering businesses to unleash their data's
                            potentials. Our innovative A1 platforms drive impactful results for 
                            global companies, revolutionizing how they operate. We seek 
                            ambitious problem solver to join our rewarding journey. Embrace 
                            the impossible with us and unlock your potential at Clikkle.
                        </p>
                    </div>
                    <div className='w-full md:w-1/2'>
                            <img src={img2} alt="image2"/>
                    </div>
                </div>
                <div className='w-full flex justify-between p-4 mt-32 md:mt-2'>
                    <div className='w-1/2 mx-4'>
                        <h1 className='text-[14px] md:text-5xl  text-start'>MORE <span className='text-[14px] md:text-2xl text-start '>INFORMATION</span></h1>
                    </div>
                    <div className='w-[25%] md:w-[10%]'>
                        <h1 className='text-[10px] md:text-xl text-start '><FontAwesomeIcon icon={faSquare} className='text-[10px] mr-2' />Offer</h1>
                        <h1 className='text-[10px] md:text-xl text-center '>LETTER</h1>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between w-full gap-4 md:gap-0 mt-48 md:mt-4'>
                <div className='flex flex-col  justify-start w-full md:w-1/3 mx-8'>
                    <h1 className='text-[24px] '>Reporting</h1>
                    <h1 className='text-[24px] text-blue-500'>Relationship</h1>
                    <p className='pt-10 text-[16px] pr-12'>
                        The Senior UX/UI Designer will report directly 
                        to <span className='text-blue-500'>Stephan Graham, Head of Development.</span><br/>
                        They will collaborate closely with the Development Team.
                    </p>
                </div>
                <div className='flex flex-col w-[90%] md:w-1/2 mx-2 md:mx-8'>
                    <h1 className='text-[24px] text-right'>Probationary</h1>
                    <h1 className='text-[24px] text-blue-500 text-right'>Period</h1>
                    <p className='pt-10 text-[16px] pl-5 md:pl-40 text-right'>
                        The initial Probationary period for this position will be  <span className='text-blue-500'>3 <br/>months</span>
                        , during which performance and suitability for the role will be evaluated. Employment confirmation will be 
                        subject to a satisfactory review at the end of the Probationary period.
                    </p>

                </div>
            </div>
            <div className='w-full flex justify-center items-center h-[300px]'>
                <div className='w-[75%] mt-10 flex flex-col items-center justify-center gap-4'>
                     <button className="text-center  font-semibold text-[14px] md:text-xl  border border-white py-2 px-6">
                       Base <span className='text-blue-500 text-[14px] md:text-xl'>Salary</span>    
                    </button> 
                    <p className='text-[12px] md:text-xl text-center'>
                        The<span className='text-[12px] md:text-xl text-blue-500 pl-2 pr-2'>Senior UX/UI Designer</span>
                        Will receive a competitive base salary of <span className='text-[12px] md:text-xl text-blue-500 pl-2 pr-2'>29800 CAD</span>
                        per year, payable in Bi-Weekly installments.
                    </p>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between w-full gap-4 md:gap-0'>
                <div className='flex flex-col  justify-start w-[87%] md:w-1/3 ml-5 mx-2 md:mx-8'>
                    <h1 className='text-[18px] md:text-[24px] '>Benefits</h1>
                    <p className='text-[12px] md:text-[18px]  pt-5'>We offer a comprehensive benefit package, including, but not limited to:</p>
                    <p className='text-[12px] md:text-[18px] pr-10 md:pr-2'><FontAwesomeIcon icon={faCircle} className='pr-2 text-[8px] pt-8'/>
                        Part of Clikkle's Success Story Stock options to make you an owner in the company.
                    </p>
                    <p className='text-[12px] md:text-[18px] pr-10 md:pr-2'> <FontAwesomeIcon icon={faCircle} className='pr-2 text-[8px]'/>
                        Learning and Development: Free Coursera account to advance your skills and interests.
                    </p>
                    <p className='text-[12px] md:text-[18px] pr-10 md:pr2'><FontAwesomeIcon icon={faCircle} className='pr-2 text-[8px]'/>
                        Fostering Innovation: Hackathons to showcase your ideas and skills.
                    </p>
                </div>
                <div className='flex flex-col w-[90%] md:w-1/3 mx-2 md:mx-8'>
                    <h1 className='text-[18px] md:text-[24px] text-right'>Allowances</h1>
                    <p className='text-[12px] md:text-[18px]  text-right pl-12 pt-5 text-right'>As part of the compensation package, the <span className='text-blue-500 text-[12px] md:text-[18px] pl-2 pr-2'>Senior Ux/UI Designer</span> will receive the following allowances:</p>
                    <p className='text-right text-[12px] md:text-[18px]'><FontAwesomeIcon icon={faCircle} className='pr-2 text-[8px]'/>Gym Allowances</p>
                    <p className='text-right text-[12px] md:text-[18px]'><FontAwesomeIcon icon={faCircle} className='pr-2 text-[8px]'/>Phone Allowances</p>
                    <p className='text-right text-[12px] md:text-[18px]'><FontAwesomeIcon icon={faCircle} className='pr-2 text-[8px]'/>Travel Allowances</p>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between w-full gap-4 md:gap-0 mt-10 md:mt-32'>
                <div className='flex flex-col  justify-start w-[87%] md:w-1/3 mx-2 md:mx-8 ml-5'>
                    <h1 className='text-[18px] md:text-[24px] '>Vocation & Personal</h1>
                    <h1 className='text-[18px] md:text-[24px] text-blue-500'>Emergency Time Off</h1>
                    <p className='pt-10 text-[12px] md:text-[16px]  pr-12'>
                        The<span className='text-[12px] md:text-[16px] text-blue-500 pl-2 pr-2'>Senior UX/UI Designer</span>
                        will be entitled to <span className='text-[12px] md:text-[16px] text-blue-500 pl-0 pr-2'>5-30 days</span>
                        of paid vocation leave per year. Additionally, <span className='text-[12px] md:text-[16px] text-blue-500 pl-2 pr-2'>7 days</span>
                        of personal emergency time off will be provided for unforeseen circumstances.
                    </p>
                </div>
                <div className='flex flex-col w-[90%] md:w-1/2 mx-2  md:mx-8'>
                    <h1 className='text-[18px] md:text-[24px]  text-right'>Currency</h1>
                    <h1 className='text-[18px] md:text-[24px] text-blue-500 text-right'>Deductions</h1>
                    <p className='pt-10 text-[12px] md:text-[16px]  pl-32 text-right'>
                        All salaries and allowances will be paid in the local currency.
                        Applicable taxes and deductions as per government 
                        regulations will be withheld from the salary.
                    </p>
                </div>
            </div>
            <div className='w-full flex justify-center items-center h-[150px] md:h-[300px]'>
                <div className='w-[80%] mt-10 flex flex-col items-center justify-center gap-4'>
                     <button className="text-center  font-semibold text-[14px] md:text-xl  border border-white py-2 px-6">
                       Sign-On <span className='text-blue-500 text-[14px] md:text-xl'>Bonus</span>    
                    </button> 
                    <p className='text-[12px] md:text-xl text-center'>
                        This job title receive a competitive sign-on bonus of<span className='text-[12px] md:text-xl text-blue-500 pl-2 pr-2'>150 CAD</span>
                        payable within <span className='text-[12px] md:text-xl text-blue-500 pl-2 pr-2'>30 days</span>
                        of employment.
                    </p>
                </div>
            </div>
            <div className='w-full flex justify-center items-center h-[150px] md:h-[300px]'>
                <div className='w-[90%] mt-10 flex flex-col items-center justify-center gap-4'>
                     <button className="text-center  font-semibold text-[14px] md:text-xl  border border-white py-2 px-6">
                       Expenses   
                    </button> 
                    <p className='text-[12px] md:text-xl text-center text-white'>
                        The company will reimburse and pre-approved expenses incurred by the<span className='text-[12px] md:text-xl text-blue-500 pl-2 pr-2'>Senior UX/UI Designer</span>
                        in the course of their duty & proper documentations and approval are required for reimbursement. 
                    </p>
                </div>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between w-full mt-20 gap-5 md:gap-0'>
                <div className='flex flex-col justify-start w-[87%] md:w-1/3 ml-5 mx-2 md:mx-8'>
                    <h1 className='text-[18px] md:text-[24px] '>Termination</h1>
                    <h1 className='text-[18px] md:text-[24px] text-blue-500'>Conditions</h1>
                    <p className='text-[12px] md:text-[18px]  pt-5 pr-10 md:pr-2'>Termination of employment may occur under the following circumstances:</p>
                    <p className='text-[12px] md:text-[18px] pr-10 md:pr-2'><FontAwesomeIcon icon={faCircle} className='pr-2 text-[8px] pt-8'/>
                        Resignation: The <span className='text-[12px] md:text-[18px] text-blue-500 pl-2 pr-2'>Senior UX/UI Designer</span>
                        from their position by providing a <span className='text-[12px] md:text-[18px] text-blue-500 pl-2 pr-2'>14 days notice </span>
                        in writing.
                    </p>
                    <p className='text-[12px] md:text-[18px] pr-10 md:pr-2'><FontAwesomeIcon icon={faCircle} className='pr-2 text-[8px]'/>
                        Termination for cause: The company reserves the
                        right to terminate employment immediately if the 
                        Senior Ux/UI Designer breaches company policies 
                        or engages in any misconduct.
                    </p>
                    <p className='text-[12px] md:text-[18px] pr-10 md:pr-2'><FontAwesomeIcon icon={faCircle} className='pr-2 text-[8px]'/>
                        Termination without cause: The company may 
                        terminate employment without cause by providing 
                        a <span className='text-[12px] md:text-[18px] text-blue-500 pl-2 pr-2'>48 hours notice</span>
                        or salary in lieu of notice.
                    </p>
                </div>
                <div className='flex flex-col w-[90%] md:w-1/3 mx-2 md:mx-8'>
                    <h1 className='text-[18px] md:text-[24px]  text-right'>Confidentially of Information</h1>
                    <h1 className='text-[18px] md:text-[24px]  text-right'>and Ownership of</h1>
                    <h1 className='text-[18px] md:text-[24px] text-blue-500 text-right'>Proprietary Property</h1>
                    <p className='text-[12px] md:text-[18px]  text-right  pt-5 text-right pl-10 md:pl-0'>
                        During the course of employment, the Senior UX/UI Designer may have access to confidential and 
                        proprietary information of the company. They will be required to sign a separate
                        <span className='text-blue-500 text-[12px] md:text-[18px] pl-2 pr-2'>Non-Disclosure Agreement (NDA)</span> to protect the company's sensitive information.
                    </p>
                </div>
            </div>
            <div className='w-full flex justify-center items-center h-[167px]  md:h-[300px] mt-28 md:mt-10'>
                <div className='w-[80%] mt-10 flex flex-col items-center justify-center gap-4 border border-white p-4'>
                    <p className='text-[10px] md:text-lg text-center  pt-2'>
                        Your employment with Clikkle is at-will and either party can terminate the relationship at any time with or 
                        without cause, and with or without notice. You acknowledge that this offer letter represents, but is not the entire 
                        agreements between you and Clikkle technologies.
                    </p>
                    <p className='text-[10px] md:text-lg text-center pt-4'>
                        If you are in agreement with the above outline please sign below. This offer is in effect for
                        <span className='text-[10px] md:text-lg text-blue-500 pl-2 '>5 business days.</span>
                    </p>
                </div>
            </div>
            <div className='w-full mt-20 flex justify-center items-center'>
            <div className='flex justify-between w-[85%] mx-2 md:mx-8'>
                <div className='flex flex-col gap-2 w-1/3 md:w-1/4'>
                    <input type="text" className="w-full  bg-neutral-950 border border-neutral-700 focus:outline-none p-2 md:p-4" />
                    <span className='w-full border-b border-zinc-300 mt-2'></span>
                </div>
                <div className='flex flex-col gap-2 w-1/3 md:w-1/4'>
                    <input type="text" className="w-full bg-neutral-950 border border-neutral-700 focus:outline-none p-2 md:p-4" />
                    <span className='w-full border-b border-zinc-300 mt-2'></span>
                </div>
            </div>
            </div>
            <div className='w-full  flex justify-center items-center mb-20 mt-2'>
            <div className='flex justify-between w-[85%] mx-8'>
                <div className='w-1/2'>
                    <h1 className='text-[12px] md:text-[22px]'>CANDIDATE'S SIGNATURE</h1>
                </div>
                <div className='w-1/2'>
                    <h1 className='text-[12px] md:text-[22px] text-right '>HR SIGNATURE</h1>
                </div>
            </div>
            </div>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 ">
                    <div className="bg-neutral-900 bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-black p-4 md:p-8 w-[85%] md:w-1/2  h-auto relative z-10 border border-zinc-100 rounded-lg">
                    <div className="w-full flex flex-col gap-4 md:gap-10">
                        <div className="w-full">
                        <h1 className="text-zinc-50 text-sm md:text-lg">Edit Offer Letter</h1>
                        </div>
                        <div className="flex flex-col w-full gap-4 md:gap-2">
                            <div className='flex flex-row gap-2 w-full'>
                                <div className='w-1/3 md:w-1/4 bg-neutral-900 rounded-lg p-0 md:p-3 flex items-center justify-center'>
                                    <p className='text-[10px] md:text-[14px] text-zinc-400 text-center'>Position Title</p>
                                </div>
                                <div className='w-2/3 md:w-3/4'>
                                <input type="text" className="w-full rounded-lg bg-neutral-900 focus:outline-none p-0 md:p-3" />
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 w-full'>
                                <div className='w-1/3 md:w-1/4 bg-neutral-900 rounded-lg p-0 md:p-3'>
                                    <p className='text-[14px] text-zinc-400 text-center'>Applicant Name</p>
                                </div>
                                <div className='w-2/3 md:w-3/4'>
                                <input type="text" className="w-full rounded-lg bg-neutral-900 focus:outline-none p-3 md:p-3" />
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 w-full'>
                                <div className='w-1/3 md:w-1/4 bg-neutral-900 rounded-lg p-0 md:p-3'>
                                    <p className='text-[14px] text-zinc-400 text-center'>Salary</p>
                                </div>
                                <div className='w-2/3 md:w-3/4'>
                                <input type="text" className="w-full rounded-lg bg-neutral-900 focus:outline-none p-0 md:p-3" />
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 w-full'>
                                <div className='w-1/3 md:w-1/4 bg-neutral-900 rounded-lg p-0 md:p-2'>
                                    <p className='text-[14px] text-zinc-400 text-center'>Reporting Relationship</p>
                                </div>
                                <div className='w-2/3 md:w-3/4'>
                                <input type="text" className="w-full rounded-lg bg-neutral-900 focus:outline-none p-3 md:p-2" />
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 w-full'>
                                <div className='w-1/3 md:w-1/4 bg-neutral-900 rounded-lg p-0 md:p-3'>
                                    <p className='text-[14px] text-zinc-400 text-center'>Job Title</p>
                                </div>
                                <div className='w-2/3 md:w-3/4'>
                                <input type="text" className="w-full rounded-lg bg-neutral-900 focus:outline-none p-0 md:p-3" />
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 w-full'>
                                <div className='w-1/3 md:w-1/4 bg-neutral-900 rounded-lg p-0 md:p-3'>
                                    <p className='text-[14px] text-zinc-400 text-center'>Probation Period</p>
                                </div>
                                <div className='w-2/3 md:w-3/4'>
                                <input type="text" className="w-full rounded-lg bg-neutral-900 focus:outline-none p-3 md:p-3" />
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 w-full'>
                                <div className='w-1/3 md:w-1/4 bg-neutral-900 rounded-lg p-0 md:p-3'>
                                    <p className='text-[14px] text-zinc-400 text-center'>Signature</p>
                                </div>
                                <div className='w-2/3 md:w-3/4'>
                                <input type="text" className="w-full rounded-lg bg-neutral-900 focus:outline-none p-0 md:p-3" />
                                </div>
                            </div>
                        
                        </div>
                    </div>
                    <div className="flex justify-end pt-3 md:pt-5">
                        <Button variant="contained" size="small" onClick={() => {toggleButtonText(); setShowPopup(false); handleSendOfferLetter(); }}>Send Offer Letter</Button>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OfferPage;
