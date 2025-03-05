import React, { useState } from 'react';
import { Button} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IntellectualProperty from './IP';
import NonDisclosure from './ND';
import EmployeeContract from './EC';

const AgreementPage = () => {
    const [scheduleDisabled, setScheduleDisabled] = useState(false); 
    const [scheduleButtonText, setScheduleButtonText] = useState('Send Agreement');
    const [activeContent, setActiveContent] = useState('content1');
    const [showPopup, setShowPopup] = useState(false);

    const toggleButtonText = () => {
        setScheduleDisabled(true); 
        setShowPopup(true); 
        setScheduleButtonText('Add Employee');
        handleSendOfferLetter(true);
    };
    
    const handleSendOfferLetter = () => {
        if (scheduleButtonText === 'Add Employee') {
            window.location.href = `/showmore:id/addemployee`;
        }
    };
    const handleButtonClick = (content) => {
        setActiveContent(content); 
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
                    onClick1={handleSendOfferLetter}
                    className="text-white font-bold text-[8px] md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded bg-sky-500 hover:bg-sky-700"
                >
                    {scheduleButtonText}
                </button>
                    <InfoOutlinedIcon />
                </div>
            </div>
            <div className="flex justify-start gap-4">
                <button
                    onClick={() => handleButtonClick('content1')}
                    className={`${
                        activeContent === 'content1'
                            ? 'text-blue-500 border-b border-blue-500'
                            : 'text-zinc-500'
                    } font-bold text-[8px] md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded`}
                >
                    Intellectual Property
                </button>
                <button
                    onClick={() => handleButtonClick('content2')}
                    className={`${
                        activeContent === 'content2'
                            ? 'text-blue-500 border-b border-blue-500'
                            : ' text-zinc-500'
                    } font-bold text-[8px] md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded`}
                >
                    Non-Disclosure
                </button>
                <button
                    onClick={() => handleButtonClick('content3')}
                    className={`${
                        activeContent === 'content3'
                            ? 'text-blue-500 border-b border-blue-500'
                            : 'text-zinc-500'
                    } font-bold text-[8px] md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded`}
                >
                    Employment Contract
                </button>
            </div>
            <div className="p-4">
                {activeContent === 'content1' && <div><IntellectualProperty/></div>}
                {activeContent === 'content2' && <div><NonDisclosure/></div>}
                {activeContent === 'content3' && <div><EmployeeContract/></div>}
            </div>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 ">
                    <div className="bg-neutral-900 bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-black p-4 md:p-8 w-[85%] md:w-1/2  h-auto relative z-10 border border-zinc-100 rounded-lg">
                    <div className="w-full flex flex-col gap-4 md:gap-10">
                        <div className="w-full">
                        <h1 className="text-zinc-50 text-sm md:text-lg">Edit Agreement</h1>
                        </div>
                        <div className="flex flex-col w-full gap-4 md:gap-2">
                            <div className='flex flex-row gap-2 w-full'>
                                <div className='w-1/3 md:w-1/4 bg-neutral-900 rounded-lg p-2'>
                                    <p className='text-[10px] md:text-[14px] text-zinc-400 text-center'>Employer Signature</p>
                                </div>
                                <div className='w-2/3 md:w-3/4'>
                                <input type="text" className="w-full rounded-lg bg-neutral-900 focus:outline-none p-3" />
                                </div>
                            </div>
                            <div className='flex flex-row gap-2 w-full'>
                                <div className='w-1/3 md:w-1/4 bg-neutral-900 rounded-lg p-2'>
                                    <p className='text-[10px] md:text-[14px] text-zinc-400 text-center'>Pay and Compensation</p>
                                </div>
                                <div className='w-2/3 md:w-3/4'>
                                <input type="text" className="w-full rounded-lg bg-neutral-900 focus:outline-none p-3" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-3 md:pt-5">
                        <Button variant="contained" size="small" onClick={() => { toggleButtonText(); setShowPopup(false); }}>Send Agreement</Button>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgreementPage;
