import React from 'react';

const EmployeeContract = () => {
    return(
        <div className='w-full mt-10'>
        <div className='w-full flex flex-col gap-10'>
            <div className='w-full flex justify-center items-center'>
                <h1 className='text-center text-xs md:text-3xl font-bold text-white'>EMPLOYMENT CONTRACT AGREEMENT</h1>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>PARTIES</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    This Employment Contract Agreement (hereinafter referred to as the "Agreement") is entered into on 08/04/2024 (the "Effective Date"), by and between 
                    <span className='pr-2 pl-2 text-[8px] md:text-[14px] font-bold'>Clikkle Technologies</span> , with an address of 470 King St W #6, Oshawa, ON (hereinafter referred to as the "Employer"), and Name, with an 
                    address of ____________________ (hereinafter referred to as the "Employee") (collectively referred to as the "Parties")
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>DUTIES AND RESPONSIBILITIES</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    During the employment period, the Employee shall have the responsibility to perform the following duties:
                </p>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>1.Building user interface using ReactJS, from design given by the UX team.</p>
                <p className='text-[8px] md:text-[14px] text-white pl-4 md:pl-6'>2.Ensuring user interface works across a variety of devices and browsers</p>
                <p className='text-[8px] md:text-[14px] text-white pl-4 md:pl-6'>3.Creating REST APIs using Open API specification on NodeJS.</p>
                <p className='text-[8px] md:text-[14px] text-white pl-4 md:pl-6'>4.Robust test-driven development with unit tests and integration tests.</p>
                <p className='text-[8px] md:text-[14px] text-white pl-4 md:pl-6'>5.Creating highly scalable backend, load tested and ready to deploy on the cloud.</p>
                <p className='text-[8px] md:text-[14px] text-white pl-4 md:pl-6'>6.Creating resilient code using MongoDB, Elasticsearch, Redis.</p>
                <p className='text-[8px] md:text-[14px] text-white pl-4 md:pl-6'>7.Integrating user interface with various iManage products.</p>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    The Parties agree that any responsibilities provided in this Agreement may not be assigned to any other party unless both parties agree to the 
                    assignment in writing.
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>PAY AND COMPENSATION</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    The Parties hereby agree that the Employer will pay the Employee an annual salary of <span className='pl-2 pr-2 text-[8px] md:text-[14px] font-semi-bold text-white'>36000 CAD</span> payable semi-monthly and subject to regular 
                    deductions and withholdings as required by law
                </p>
                <p className='text-[8px] md:text-[14px] text-white pt-3 pl-4 md:pl-6'>
                    The Parties hereby agree that banked hours begin on effective date the employer will begin Regular payments disbursements after 3 month 
                    probation
                </p>
                <p className='text-[8px] md:text-[14px] text-white pt-3 pl-4 md:pl-6'>
                    Whereas the Parties also agree that annual salary may be increased annual by an amount as may be approved by the Employer and, upon such increase, the increased amount shall thereafter shall be deemed to the annual salary for purpose of this Agreement.
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[16px] underline'>BENEFITS</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    The Parties hereby agree that the Employee shall receive the benefits (Insurance, Holiday and Vacation) provided by the Employer as indicated below
                </p>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>1.Awesome team and culture (every day)</p>
                <p className='text-[8px] md:text-[14px] text-white pl-4 md:pl-6'>2.Generous time off, including vacation and personal days to help rejuvenate</p>
                <p className='text-[8px] md:text-[14px] text-white pl-4 md:pl-6'>3.Extended health benefits, including drug coverage, dental coverage, and a Health Spending Account</p>
                <p className='text-[8px] md:text-[14px] text-white pl-4 md:pl-6'>4.Flexible Work policy, with options to work remotely</p>
                <p className='text-[8px] md:text-[14px] text-white pl-4 md:pl-6'>5.Attend Conferences to extend your knowledge and skills</p>
                <p className='text-[8px] md:text-[14px] text-white pl-4 md:pl-6'>6.Top technology and tools to excel at your role</p>
                <p className='text-[8px] md:text-[14px] text-white pl-4 md:pl-6'>7.annual performance-based bonus.</p>

            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>WORKING HOURS AND LOCATION</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    The Employee agrees that he/she will be working from (Monday to Friday), with a 1 hour lunch break
                </p>
                <p className='text-[8px] md:text-[14px] text-white pt-3 pl-4 md:pl-6'>
                    In particular, the Employee agrees that he/she will work on average 40 hours per week
                </p>
                <p className='text-[8px] md:text-[14px] text-white pt-3 pl-4 md:pl-6'>
                    The Employee's place of work shall be located in a remote location or such other location as the Parties may agree upon time to time
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>TERMS OF AGREEMENT</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    This Agreement shall be effective 30 days from the date of signing this Agreement (hereinafter referred to as the "Effective Date") and will remain in effect indefinitely
                </p>
                <p className='text-[8px] md:text-[14px] text-white pt-3 pl-4 md:pl-6'>
                    referred to as a sign on bonus will be payed within 30 days of employment effective date
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>TERMINATION</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    This Agreement may be terminated in case the following occurs:
                </p>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    1.Immediately in case one of the Parties breaches this Agreement.
                </p>
                <p className='text-[8px] md:text-[14px] text-white  pl-4 md:pl-6'>
                    At any given time by providing a written notice to the other party 5 business days prior to terminating the Agreement.
                </p>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    Upon terminating this Agreement, the Employee will be required to return all Employer's materials, products or any other content at his /her earliest 
                    convenience, but not beyond 5 business days
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>CONFIDENTIALITY</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    All terms and conditions of this Agreement and any materials provided during the term of the Agreement must be kept confidential by the Employee, 
                    unless the disclosure is required pursuant to process of law.
                </p>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    Disclosing or using this information for any purpose beyond the scope of this Agreement, or beyond the exceptions set forth above, is expressly 
                    forbidden without the prior consent of the Employer.
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>INTELLECTUAL PROPERTY</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    -Hereby, the Employee agrees that any intellectual property provided to him/her by the Employer will remain the sole property of the Employer 
                    including, but not limited to, copyrights, patents, trade secret rights, and other intellectual property rights associated with any ideas, concepts, 
                    techniques, inventions, processes, works of authorship, Confidential information or trade secrets
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>EXCLUSIVITY</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    The Parties agree that this Agreement is not an exclusive arrangement and that the Employer is entitled to enter into other similar agreements with 
                    other employees.
                </p>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    However, the Employee is not entitled to enter into a similar agreement as long as he/she remains a party to this Agreement
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>LIMITATIONS OF LIABILITY</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    In no event shall the Employer nor the Employee be individually liable for any damages for breach of duty by third parties, unless the Employer's or 
                    Employee's act or failure to act involves intentional misconduct, fraud, or a knowing violation of the law.
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>SEVERABILITY</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    In an event where any provision of this Agreement is found to be void and unenforceable by a court of competent jurisdiction, then the remaining 
                    provisions will remain to be enforced in accordance with the Parties' intention.
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>GOVERNING LAW</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    This Agreement shall be governed by and construed in accordance with the laws of Ontario, Canada
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>ALTERNATIVE DISPUTE RESOLUTIONS</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    Any dispute or difference whatsoever arising out of or in connection with the Agreement shall be submitted to (Arbitration/mediation/negotiation) in 
                    accordance with, and subject to the laws of Ontario, Canada.
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>ATTORNEY FEES</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    In the event of any dispute between the parties concerning the terms and provisions of this Agreement, the party prevailing in such dispute shall be 
                    entitled to collect from the other party all costs incurred in such dispute, including reasonable attorneys' fees.
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>ENTIRE AGREEMENT</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    This Agreement contains the entire agreement and understanding among the Parties hereto with respect to the subject matter hereof, and 
                    supersedes all prior agreements, understandings, inducements and conditions, express or implied, oral or written, of any nature whatsoever with 
                    respect to the subject matter hereof. The express terms hereof control and supersede any course of performance and/or usage of the trade 
                    inconsistent with any of the terms hereof.
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>AMENDMENTS</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    The Parties agree that any amendments made to this Agreement must be in writing where they must be signed by both Parties to this Agreement. 
                    As such, any amendments made by the Parties will be applied to this Agreement.
                </p>
            </div>
            <div className='w-full'>
                <h1 className='text-white text-[10px] md:text-[16px] underline'>SIGNATURE AND DATE</h1>
                <p className='text-[8px] md:text-[14px] text-white pt-4 pl-4 md:pl-6'>
                    The Parties hereby agree to the terms and conditions set forth in this Agreement and such is demonstrated by their signatures below:
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
                <p className='text-[10px] md:text-[16px] text-white'>Date: 08/04/2024</p>
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
export default EmployeeContract;