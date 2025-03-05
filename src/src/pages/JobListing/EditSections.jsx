import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';



const EditSection = () => {


  const titles = ["Job Title", "Salary", "Years of Experience", "Location", "Category"];


  return (
    <div className="w-[85%] md:w-[90%] ml-0 md:ml-9 p-6 md:p-4 mb-4">
      {titles.map((title, index) => (
        <div key={index} className="mb-4">
          <p className='text-white text-[12px] md:text-[20px] pl-2'>{title}</p>
          <div className='w-full flex flex-row gap-4'>
            <div className='flex items-center w-[60%] md:w-[85%]'>
              <input type="text" className="w-full rounded-lg bg-neutral-900 focus:outline-none p-4" />
            </div>
            <div className='flex items-center w-[32%] md:w-[12%]'>
              <select className="rounded-lg bg-neutral-900 focus:outline-none mb-0 p-4 md:p-4 w-full">
                <option value="line">Line</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div className='flex flex-row gap-2 items-center w-[3%]'>
              <button><EditOutlinedIcon fontSize='small' /></button>
              <button><DeleteOutlineOutlinedIcon className='text-red-700' /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditSection;
