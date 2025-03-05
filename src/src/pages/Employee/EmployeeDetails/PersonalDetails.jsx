import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import axios from 'axios';
import moment from 'moment';

const PersonalDetails = ({ employeeDetails }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        fatherName: '',
        phone: '',
        emergencyContact1: '',
        emergencyContact2: '',
        dob: '',
        gender: 'male',
        maritalStatus: '',
        bloodGroup: '',
        presentAddress: '',
        permanentAddress: '',
        email: '',
    });

    useEffect(() => {
        if (employeeDetails) {
            setFormData({
                firstName: employeeDetails.firstName || '',
                lastName: employeeDetails.lastName || '',
                fatherName: '',
                phone: employeeDetails.phone?.phone || '',
                emergencyContact1: employeeDetails.phone?.phone || '',
                emergencyContact2: employeeDetails.phone?.phone || '',
                dob: employeeDetails.dob ? moment(employeeDetails.dob).utc().format('YYYY-MM-DD') : '',
                gender: 'male',
                maritalStatus: '',
                bloodGroup: '',
                presentAddress: '',
                permanentAddress: '',
                email: employeeDetails.email || '',
            });
        }
    }, [employeeDetails]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/update-employee', formData);
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box className="w-full ml-2 md:ml-0 rounded-lg mb-4" sx={{ backgroundColor: 'background.view' }}>
                {currentPage === 1 && (
                    <div className="w-[99%] p-2 flex flex-col gap-4">
                        <h1 className="text-xl font-bold">Basic</h1>
                        <div className="flex flex-col md:flex-row w-full gap-8">
                            <div className="flex flex-row w-full md:w-1/2 gap-2">
                                <div className="w-1/4 flex items-center">
                                    <p className="text-[16px]">Full Name</p>
                                </div>
                                <div className="w-4/5 border border-gray-300 rounded-lg flex items-center">
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                        placeholder="first name" 
                                        value={formData.firstName} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 w-full md:w-1/2 flex items-center">
                                <div className="w-full border border-gray-300 rounded-lg">
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                        placeholder="last name" 
                                        value={formData.lastName} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-8">
                            <div className="flex flex-row w-full md:w-1/2 gap-2">
                                <div className="w-1/4 flex items-center">
                                    <p className="text-[16px]">Username</p>
                                </div>
                                <div className="w-4/5 border border-gray-300 rounded-lg flex items-center">
                                    <input 
                                        type="text" 
                                        name="username" 
                                        className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                        placeholder="enter username" 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 w-full md:w-1/2">
                                <div className="w-1/4 flex items-center">
                                    <p className="text-[16px]">Contact Number</p>
                                </div>
                                <div className="w-4/5 border border-gray-300 rounded-lg flex items-center">
                                    <input 
                                        type="text" 
                                        name="phone" 
                                        className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                        placeholder="enter contact number" 
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-8">
                            <div className="flex flex-row w-full md:w-1/2 gap-2">
                                <div className="w-1/4 flex items-center">
                                    <p className="text-[16px]">Emergency Contact No 1</p>
                                </div>
                                <div className="w-4/5 border border-gray-300 rounded-lg flex items-center">
                                    <input 
                                        type="text" 
                                        name="emergencyContact1" 
                                        className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                        placeholder="enter emergency contact 1" 
                                        value={formData.emergencyContact1} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 w-full md:w-1/2">
                                <div className="w-1/4 flex items-center">
                                    <p className="text-[16px]">Emergency Contact No 2</p>
                                </div>
                                <div className="w-4/5 border border-gray-300 rounded-lg flex items-center">
                                    <input 
                                        type="text" 
                                        name="emergencyContact2" 
                                        className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                        placeholder="enter emergency contact 2" 
                                        value={formData.emergencyContact2} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-8">
                            <div className="flex flex-row w-full md:w-1/2 gap-2">
                                <div className="w-1/4 flex items-center">
                                    <p className="text-[16px]">Date of Birth</p>
                                </div>
                                <div className="w-4/5 border border-gray-300 rounded-lg flex items-center">
                                    <input 
                                        type="date" 
                                        name="dob" 
                                        className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                        placeholder="enter date of birth" 
                                        value={formData.dob} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 w-full md:w-1/2">
                                <div className="w-1/4 flex items-center">
                                    <p className="text-[16px]">Blood Group</p>
                                </div>
                                <div className="w-4/5 border border-gray-300 rounded-lg flex items-center">
                                    <input 
                                        type="text" 
                                        name="bloodGroup" 
                                        className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                        placeholder="enter blood group" 
                                        value={formData.bloodGroup} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-8">
                            <div className="flex flex-row w-full md:w-full gap-2">
                                <div className="w-[13%] flex items-center">
                                    <p className="text-[16px]">Email</p>
                                </div>
                                <div className="w-full border border-gray-300 rounded-lg flex items-center">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                        placeholder="enter email address" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-8">
                            <div className="flex flex-row w-full md:w-1/2 gap-2">
                                <div className="w-1/4 flex items-center">
                                    <p className="text-[16px]">Present Address</p>
                                </div>
                                <div className="w-4/5 border border-gray-300 rounded-lg flex items-center">
                                    <input 
                                        type="text" 
                                        name="presentAddress" 
                                        className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                        placeholder="enter present address" 
                                        value={formData.presentAddress} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 w-full md:w-1/2">
                                <div className="w-1/4 flex items-center">
                                    <p className="text-[16px]">Permanent Address</p>
                                </div>
                                <div className="w-4/5 border border-gray-300 rounded-lg flex items-center">
                                    <input 
                                        type="text" 
                                        name="permanentAddress" 
                                        className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                        placeholder="enter permanent address" 
                                        value={formData.permanentAddress} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Other Pages Here */}
                <div className="flex justify-between mt-4">
                    {currentPage > 1 && (
                        <button type="button" onClick={prevPage}>
                            <KeyboardArrowLeftIcon />
                            Previous
                        </button>
                    )}
                    {currentPage < 2 && (
                        <button type="button" onClick={nextPage}>
                            Next
                            <KeyboardArrowRightIcon />
                        </button>
                    )}
                </div>
            </Box>
            <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
                Save
            </button>
        </form>
    );
};

export default PersonalDetails;
