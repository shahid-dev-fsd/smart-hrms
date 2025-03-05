import React, { useState } from 'react';

const Apps = () => {
    const [activeContent, setActiveContent] = useState('content1');

    const handleButtonClick = (content) => {
        setActiveContent(content); 
    };

    return (
        <div className="container mx-auto overscroll-auto overflow-hidden items-center w-full justify-center">
            <div className="flex items-center gap-8 justify-center">
                <button
                    onClick={() => handleButtonClick('content1')}
                    className={`${
                        activeContent === 'content1'
                            ? 'text-blue-500 border-b-2 border-blue-500'
                            : 'text-zinc-500'
                    } font-bold text-[16px] md:text-[18px] py-1 md:py-2 px-4 md:px-4 rounded`}
                >
                    Life
                </button>
                <button
                    onClick={() => handleButtonClick('content2')}
                    className={`${
                        activeContent === 'content2'
                            ? 'text-blue-500 border-b-2 border-blue-500'
                            : ' text-zinc-500'
                    } font-bold text-[16px] md:text-[18px] py-1 md:py-2 px-4 md:px-4 rounded`}
                >
                    Business
                </button>
                <button
                    onClick={() => handleButtonClick('content3')}
                    className={`${
                        activeContent === 'content3'
                            ? 'text-blue-500 border-b-2 border-blue-500'
                            : 'text-zinc-500'
                    } font-bold text-[16px] md:text-[18px] py-1 md:py-2 px-4 md:px-4 rounded`}
                >
                    Social
                </button>
            </div>
            <div className="p-4">
                {activeContent === 'content1' && <div>
                <div className='w-full flex flex-col justify-center gap-10'>
                    <div className='flex flex-row w-full gap-2'>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/swiprr/logo/2023/swiprr.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Swiprr</p>
                        </div>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/kept-up/logo/2023/kept-up.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Kept Up</p>
                        </div>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/tax/logo/2023/tax.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Tax</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full gap-2'>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/news/logo/2023/news.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>News</p>
                        </div>
                       
                    </div>

                </div>
                
                
                </div>}
                {activeContent === 'content2' && <div>
                <div className='w-full flex flex-col justify-center gap-10'>
                    <div className='flex flex-row w-full gap-2'>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/ads/logo/2023/ads.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Ads</p>
                        </div>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/cmail/logo/2023/cmail.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>C-Mail</p>
                        </div>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/hr/logo/2023/hr.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Hr</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full gap-2'>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/campaigns/logo/2023/campaigns.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Campaigns</p>
                        </div>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/e-sign/logo/2023/e-sign.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>E-sign</p>
                        </div>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/files/logo/2023/files.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Files</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full gap-2'>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/host/logo/2023/host.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Host</p>
                        </div>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/pitch/logo/2023/pitch.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Pitch</p>
                        </div>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/pitch/logo/2023/pitch.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Projects</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full gap-2'>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/launch/logo/2023/launch.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Launch</p>
                        </div>
                    </div>

                </div>
                </div>}
                {activeContent === 'content3' && <div>
                <div className='w-full flex flex-col justify-center gap-10'>
                    <div className='flex flex-row w-full gap-2'>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/crew/logo/2023/crew.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Crew</p>
                        </div>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/social/logo/2023/social.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Social</p>
                        </div>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/sms/logo/2023/sms.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Sms</p>
                        </div>
                    </div>
                    <div className='flex flex-row w-full gap-2'>
                        <div className='w-1/3 flex flex-col items-center gap-2'>
                        <img className="w-[40px] h-[40px]" src="https://cdn.clikkle.com/images/chat/logo/2023/chat.png" alt="logo"/>
                        <p className='text-[14px] text-zinc-500 text-center'>Chat</p>
                        </div>
                    </div>

                </div>
                </div>}
            </div>
        </div>
    );
};

export default Apps;
