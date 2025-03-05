import { Box } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

const UploadDetails = ({ id }) => {
    const [files, setFiles] = useState({
        resume: null,
        idProof: null,
        offerLetter: null,
        joining: null,
        agreementLetter: null,
        experienceLetter: null
    });

    const handleFileChange = (e, fieldName) => {
        setFiles({ ...files, [fieldName]: e.target.files[0] });
    };

    const handleSave = async () => {
        const formData = new FormData();
        Object.keys(files).forEach(key => {
            if (files[key]) formData.append(key, files[key]);
        });

        try {
            const response = await axios.patch(`/employee/profile/picture?id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fileFields = [
        { name: 'resume', label: 'Resume' },
        { name: 'idProof', label: 'ID Proof' },
        { name: 'offerLetter', label: 'Offer Letter' },
        { name: 'joining', label: 'Joining' },
        { name: 'agreementLetter', label: 'Agreement Letter' },
        { name: 'experienceLetter', label: 'Experience Letter' }
    ];

    return (
        <Box className="w-full ml-2 md:ml-0 pt-4 rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
            <div className='w-[99%] p-2 flex flex-col gap-6'>
                {fileFields.map(field => (
                    <div key={field.name} className='flex flex-col md:flex-row w-full gap-2'>
                        <div className='flex flex-row w-full md:w-[85%] gap-2'>
                            <div className='w-[8%] flex items-center'>
                                <p className='text-[16px]'>{field.label}</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="file" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    onChange={(e) => handleFileChange(e, field.name)}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row w-full md:w-[14%] justify-end'>
                            <button className='flex items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-10 rounded bg-sky-500 hover:bg-sky-700'>
                                Choose File
                            </button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-end gap-5 md:mr-10 mr-4 mb-5 items-end">
                    <button 
                        className="flex items-center text-white text-[10px] md:text-[12px] h-[30px] py-1 md:py-1 px-2 md:px-6 rounded bg-sky-500 hover:bg-sky-700"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button className="flex items-center text-red-500 text-[10px] md:text-[12px] h-[30px] py-1 md:py-1 px-2 md:px-6 border border-red-500 rounded bg-transparent hover:bg-red-700">
                        Cancel
                    </button>
                </div>
            </div>
        </Box>
    );
};

export default UploadDetails;
