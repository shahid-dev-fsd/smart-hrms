import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditSection from './EditSections';


const EditCards = ({job}) => {

console.log("job" , job);
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between md:w-full p-4">
                <div className="p-2">
                    <h1 className="text-lg md:text-2xl text-neutral-500">Edit/Create Job Details</h1>
                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                            <button className='flex  items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
                                Add Details
                            </button>
                    <InfoOutlinedIcon />
                </div>
            </div>
            <EditSection/>
                
                      
        </div>
    );
};

export default EditCards;
