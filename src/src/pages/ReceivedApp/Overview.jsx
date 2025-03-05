import React, { useState , useEffect , useCallback } from "react";
import icon1 from './icons/1.png';
import icon2 from './icons/2.png';
import icon3 from './icons/3.png';
import icon4 from './icons/4.png';
import icon5 from './icons/5.png';
import icon6 from './icons/6.png';
import icon7 from './icons/7.png';
import icon8 from './icons/8.png';
import icon9 from './icons/9.png';
import { Box } from "@mui/material";



const Overview = () => {
  const [applicationMetrics , setApplicationMetrics] = useState([]);
    const fetchMatrics = useCallback(
        async function () {
            try {
                const res = await axios.get('/hr/job-application/metrics');
                setApplicationMetrics(res.data.metrics);
            } catch (e) {
                console.log(e);
            }
        },
        [setApplicationMetrics]
    );
    useEffect(() => {
        fetchMatrics();
    }, [fetchMatrics]);

    return (
        <div className="md:w-full flex flex-col md:flex-row gap-2">
            <Box className="w-full md:w-[12%] h-[40px] flex flex-row items-center justify-between rounded-lg p-2 gap-10 overflow-hidden" sx={{ backgroundColor: 'background.rec', }}>
                <div className="flex-shrink-0">
                    <h1 className="text-[10px]">30000</h1>
                    <p className='text-[8px]'>Applied</p>
                </div>
                <div className="flex-shrink-0">
                <div className="bg-lime-600 p-1 rounded-lg"> 
                    <img src={icon1} alt="icon1" className="  w-[16px] h-[16px] flex items-center justify-center"/>
                </div> 
                </div>
            </Box>

            <Box className="w-full md:w-[12%] h-[40px] flex flex-row items-center justify-between bg-black rounded-lg p-2 gap-0 overflow-hidden" sx={{ backgroundColor: 'background.rec', }}>
                <div className="flex-shrink-0">
                    <h1 className="text-[10px]">120</h1>
                    <p className='text-[8px]'>Interview Sent</p>
                </div>
                <div className="flex-shrink-0">
                <div className="bg-amber-500 p-1 rounded-lg"> 
                    <img src={icon2} alt="icon2" className="  w-[16px] h-[16px] flex items-center justify-center"/>
                </div>
                </div>
            </Box>

            <Box className="w-full md:w-[12%] h-[40px] flex flex-row items-center justify-between bg-black rounded-lg p-2 gap-0 overflow-hidden" sx={{ backgroundColor: 'background.rec', }}>
                <div className="flex-shrink-0">
                    <h1 className="text-[10px]">80</h1>
                    <p className='text-[8px]'>Interviewed</p>
                </div>
                <div className="flex-shrink-0">
                <div className="bg-sky-400 p-1 rounded-lg"> 
                    <img src={icon3} alt="icon3" className="  w-[16px] h-[16px] flex items-center justify-center"/>
                </div>
                </div>
            </Box>

            <Box className="w-full md:w-[12%] h-[40px] flex flex-row items-center justify-between bg-black rounded-lg p-2 gap-0 overflow-hidden" sx={{ backgroundColor: 'background.rec', }}>
                <div className="flex-shrink-0">
                    <h1 className="text-[10px]">50</h1>
                    <p className='text-[8px]'>Offer Letter Sent</p>
                </div>
                <div className="flex-shrink-0">
                <div className="bg-rose-500 p-1 rounded-lg"> 
                    <img src={icon4} alt="icon4" className="  w-[16px] h-[16px] flex items-center justify-center"/>
                </div>
                </div>
            </Box>

            <Box className="w-full md:w-[12%] h-[40px] flex flex-row items-center justify-between bg-black rounded-lg p-2 gap-0 overflow-hidden" sx={{ backgroundColor: 'background.rec', }}>
                <div className="flex-shrink-0">
                    <h1 className="text-[10px]">45</h1>
                    <p className='text-[8px]'>Offer Letter Signed</p>
                </div>
                <div className="flex-shrink-0">
                <div className="bg-blue-600 p-1 rounded-lg"> 
                    <img src={icon5} alt="icon5" className="  w-[16px] h-[16px] flex items-center justify-center"/>
                </div>
                </div>
            </Box>

            <Box className="w-full md:w-[13%] h-[40px] flex flex-row items-center justify-between bg-black rounded-lg p-2 overflow-hidden" sx={{ backgroundColor: 'background.rec', }}>
                <div className="flex-shrink-0">
                    <h1 className="text-[10px]">40</h1>
                    <p className='text-[8px]'>Agreements Sent</p>
                </div>
                <div className="flex-shrink-0">
                <div className="bg-blue-700 p-1 rounded-lg"> 
                    <img src={icon6} alt="icon6" className="  w-[14px] h-[14px] flex items-center justify-center"/>
                </div>
                </div>
            </Box>

            <Box className="w-full md:w-[12%] h-[40px] flex flex-row items-center justify-between bg-black rounded-lg p-2 gap-0 overflow-hidden" sx={{ backgroundColor: 'background.rec', }}>
                <div className="flex-shrink-0">
                    <h1 className="text-[10px]">40</h1>
                    <p className='text-[8px]'>Agreements Signed</p>
                </div>
                <div className="flex-shrink-0">
                <div className="bg-green-300 p-1 rounded-lg"> 
                    <img src={icon7} alt="icon7" className="  w-[16px] h-[16px] flex items-center justify-center"/>
                </div>
                </div>
            </Box>

            <Box className="w-full md:w-[12%] h-[40px] flex flex-row items-center justify-between bg-black rounded-lg p-2 gap-0 overflow-hidden" sx={{ backgroundColor: 'background.rec', }}>
                <div className="flex-shrink-0">
                    <h1 className="text-[10px]">20</h1>
                    <p className='text-[8px]'>Employed</p>
                </div>
                <div className="flex-shrink-0">
                <div className="bg-yellow-400 p-1 rounded-lg"> 
                    <img src={icon8} alt="icon8" className="  w-[16px] h-[16px] flex items-center justify-center"/>
                </div>
                </div>
            </Box>

            <Box className="w-full md:w-[12%] h-[40px] flex flex-row items-center justify-between bg-black rounded-lg p-2 gap-0 overflow-hidden" sx={{ backgroundColor: 'background.rec', }}>
                <div className="flex-shrink-0">
                    <h1 className="text-[10px]">6</h1>
                    <p className='text-[8px]'>Terminated</p>
                </div>
                <div className="flex-shrink-0">
                <div className="bg-red-600 p-1 rounded-lg"> 
                    <img src={icon9} alt="icon9" className="  w-[16px] h-[16px] flex items-center justify-center"/>
                </div>
                </div>
            </Box>
        </div>
    );
};

export default Overview;
