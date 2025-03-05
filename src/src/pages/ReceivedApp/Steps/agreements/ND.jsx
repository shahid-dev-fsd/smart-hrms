import React from 'react';

const NonDisclosure = () => {
    return(
        <div className='w-full mt-10'>
        <div className='w-full flex flex-col gap-10'>
            <div className='w-full flex justify-center items-center'>
                <h1 className='text-center text-xs md:text-3xl font-bold text-white'>NON-DISCLOSURE AGREEMENT</h1>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>PARTIES</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    This Non-Disclosure Agreement (hereinafter referred to as the "Agreement") is entered into on 08/04/2024 (the "Effective Date"), by and between 
                    <span className='pr-2 pl-2 text-[8px] md:text-[14px] font-bold'>Clikkle Technologies</span> , with an address of 470 King St W #6, Oshawa, ON (hereinafter referred to as the "Receiving Party"), and Name, with an 
                    address of ____________________ (hereinafter referred to as the "Disclosing Party") (collectively referred to as the "Parties")
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>CONFIDENTIAL INFORMATION</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    The Receiving Party agrees not to disclose, copy, clone, or modify any confidential information related to the Disclosing Party and agrees not to the use 
                    any such information without obtaining consent
                </p>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    "confidential information" refers to any data and/or information that is related to the Disclosing Party, in  any form, including, but not limited to, oral or 
                    written. such confidential information includes, but is not limited to, any information related to the business or industry of the Disclosing Party, such as 
                    discoveries, processes, techniques, programs, knowledge bases, customer lists, potential customers, business partners, affiliated partners, leads, know-how, or any other services related to the Disclosing Party.
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>RETURN OF CONFIDENTIAL INFORMATION</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    The Receiving Party agrees to return all the confidential information to the Disclosing Party upon the termination of this Agreement.
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>OWNERSHIP</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    This Agreement is not transferable and may only be transferred by written consent provided by both Parties
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>GOVERNING LAW</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    This Agreement shall be governed by and constructed in accordance with the laws of Ontario, Canada.
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>SIGNATURE AND DATE</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    The Parties hereby agree to the terms and conditions set forth in this Agreement and such is demonstrated by their signatures below
                </p>
            </div>
        </div>
        <div className='w-full mt-20 flex justify-center items-center'>
        <div className='flex justify-between w-[85%] mx-2 md:mx-8 gap-10 md:gap-0'>
            <div className='flex flex-col gap-4 w-1/2 md:w-1/4'>
                <p className='text-[10px] md:text-[16px] text-white underline'>Employee</p>
                <p className='text-[8px] md:text-[16px] text-white'>Name:</p>
                <div className='flex flex-row gap-2 items-center'>
                <p className='text-[8px] md:text-[14px] text-white'>Signature</p>
                <input type="text" className="w-full bg-neutral-950 border border-neutral-700 focus:outline-none p-0 md:p-4" />
                </div>
                <p className='text-[8px] md:text-[16px] text-white'>Date: 08/04/2024</p>
            </div>
            <div className='flex flex-col gap-4 w-1/2 md:w-1/4 mb-20'>
                <p className='text-[10px] md:text-[16px] text-white underline'>Employer</p>
                <p className='text-[8px] md:text-[16px] text-white'>Name:</p>
                <div className='flex flex-row gap-2 items-center'>
                <p className='text-[8px] md:text-[14px] text-white'>Signature</p>
                <input type="text" className="w-full bg-neutral-950 border border-neutral-700 focus:outline-none p-0 md:p-4" />
                </div>
                <p className='text-[8px] md:text-[16px] text-white'>Date: 08/04/2024</p>
            </div>
        </div>
        </div>
        
    </div>
    );

};
export default NonDisclosure;