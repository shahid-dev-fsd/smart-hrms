import React, { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from 'axios'; // Assuming you're using axios for API calls
import { Button, useTheme as useMuiTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../../style/theme'; // Assuming you have a custom hook for theme

const EditSection = ({ job }) => {
  const navigate = useNavigate();
  const { toggleTheme, mode } = useTheme();
  const theme = useMuiTheme(); // MUI theme

  const [editableJob, setEditableJob] = useState({
    title: job.title || '',
    salary: { amount: job.salary.amount || '', currency: job.salary.currency || '' },
    experience: job.experience || '',
    location: job.location || '',
    category: job.category || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" || name === "currency") {
      setEditableJob((prevJob) => ({
        ...prevJob,
        salary: {
          ...prevJob.salary,
          [name]: value,
        }
      }));
    } else {
      setEditableJob({
        ...editableJob,
        [name]: value,
      });
    }
  };

  const handleEdit = async () => {
    try {
      const response = await axios.patch(`/hr/job-listing/${job._id}`, editableJob);
      console.log(response.data.message); // Handle success response
      toast.success('Updated Successfully');

      setTimeout(() => {
        navigate('/joblisting'); // Navigate to the job listing page after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("There was an error updating the job!", error); // Handle error
      toast.error("Failed to update job!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/joblisting/${job._id}`);
      console.log(response.data.message); // Handle success response
      toast.success("Job deleted successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      // Optionally navigate or handle UI update after delete
    } catch (error) {
      console.error("There was an error deleting the job!", error); // Handle error
      toast.error("Failed to delete job!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const titles = ["Job Title", "Salary", "Years of Experience", "Location", "Category"];
  const fields = [
    { name: "title", value: editableJob.title },
    { name: "amount", value: editableJob.salary.amount },
    { name: "experience", value: editableJob.experience },
    { name: "location", value: editableJob.location },
    { name: "category", value: editableJob.category },
  ];

  return (
    <>
      <ToastContainer />

      <div className="w-[85%] md:w-[90%] ml-0 md:ml-9 p-6 md:p-4 mb-4">
        {titles.map((title, index) => (
          <div key={index} className="mb-4">
            <p className='text-white text-[12px] md:text-[20px] pl-2'>{title}</p>
            <div className='w-full flex flex-row gap-4'>
              <div className='flex items-center w-[60%] md:w-[85%]'>
                <input
                  type="text"
                  className={`w-full rounded-lg p-4 ${theme.palette.mode === 'light' ? '' : 'text-white bg-gray-900'}`}
                  name={fields[index].name}
                  value={fields[index].value}
                  onChange={handleChange}
                  style={{ border: '1px solid', ...(theme.palette.mode === 'dark' && { color: 'white' }) }}
                />
              </div>
              <div className={`flex items-center w-[32%] md:w-[12%] ${theme.palette.mode === 'light' ? '' : 'text-white bg-gray-900'}`} style={{ border: '1px solid', borderRadius: '10px', ...(theme.palette.mode === 'dark' && { color: 'white' }) }}>
                <select className="rounded-lg border-1 mb-0 p-4 md:p-4 w-full">
                  <option value="line">Line</option>
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="email">Email</option>
                </select>
              </div>
              <div className='flex flex-row gap-2 items-center w-[3%]'>
                <button onClick={handleDelete}><DeleteOutlineOutlinedIcon className='text-red-700' /></button>
              </div>
            </div>
          </div>
        ))}
        <div style={{ justifyContent: 'end', display: 'flex' }}>
          <button onClick={handleEdit} className='text-white font-bold text-[18px] md:text-[18px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700'>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditSection;
