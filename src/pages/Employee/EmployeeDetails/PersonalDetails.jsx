import { Box } from '@mui/material';
import React, { useState , useEffect } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import moment from 'moment';
import axios from 'axios';

const PersonalDetails = ({ employeeDetails }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        phone: {
            countryCode: '',
            phone: ''
        },
        emergencyContact1: {
            countryCode: '',
            phone: ''
        },
        emergencyContact2: {
            countryCode: '',
            phone: ''
        },
        dob: '',
        bloodGroup: '',
        email: '',
        presentAddress: '',
        permanentAddress: '',
        gender: '',
        maritalStatus: '',
        photo: null,
        employeeEmail: '',
        password: '',
        notificationsEnabled: false
    });

    useEffect(() => {
        if (employeeDetails) {
            setFormData({
                firstName: employeeDetails?.firstName || '',
                lastName: employeeDetails?.lastName || '',
                username: '',
                phone: {
                    countryCode: employeeDetails?.phone?.countryCode || '',
                    phone: employeeDetails?.phone?.phone || ''
                },
                emergencyContact1: {
                    countryCode: '',
                    phone: ''
                },
                emergencyContact2: {
                    countryCode: '',
                    phone: ''
                },
                dob: employeeDetails?.dob ? moment(employeeDetails.dob).utc().format('MM-DD-YYYY') : '',
                bloodGroup: '',
                email: employeeDetails?.email || '',
                presentAddress: '',
                permanentAddress: '',
                gender: employeeDetails?.gender || 'male',
                maritalStatus: '',
                photo: null,
                employeeEmail: '',
                password: '',
                notificationsEnabled: false
            });
        }
    }, [employeeDetails]);

    if (!employeeDetails) {
        return <p>No Employee Details Available</p>;
    }

    const empId = employeeDetails._id;

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phoneCountryCode' || name === 'phonePhone') {
            setFormData((prevData) => ({
                ...prevData,
                phone: {
                    ...prevData.phone,
                    [name === 'phoneCountryCode' ? 'countryCode' : 'phone']: value
                }
            }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, photo: e.target.files[0] }));
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`/employee/profile/${empId}`, formData);
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box className="w-full ml-2 md:ml-0 rounded-lg mb-4" sx={{ backgroundColor: 'background.view' }}>
            {currentPage == 1 && (
                <div className='w-[99%] p-2 flex flex-col gap-4'>
                    <h1 className='text-xl font-bold'>Basic</h1>
                    {/* <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-1/2 gap-2'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>Full Name</p>
                            </div>
                            <div className='w-4/5 border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='first name' 
                                    name="firstName" 
                                    value={formData.firstName} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                     
                           <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-1/2 gap-2'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>Last Name</p>
                            </div>
                            <div className='w-4/5 border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='last name' 
                                    name="lastName" 
                                    value={formData.lastName} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                      
                    </div>
                    </div>  */}
                     <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-1/2 gap-2'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>First Name</p>
                            </div>
                            <div className='w-4/5 border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='first name' 
                                    name="firstName" 
                                    value={formData.firstName} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                        <div className='flex flex-row gap-2 w-full md:w-1/2'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>Last Name </p>
                            </div>
                            <div className='w-4/5 border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='last name' 
                                    name="lastName" 
                                    value={formData.lastName} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                    </div>
                 
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-1/2 gap-2'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>Username</p>
                            </div>
                            <div className='w-4/5 border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='enter username' 
                                    name="username" 
                                    value={formData.username} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                        <div className='flex flex-row gap-2 w-full md:w-1/2'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>Contact Number</p>
                            </div>
                            <div className='w-4/5 border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='enter contact number' 
                                    name="phonePhone" 
                                    value={formData.phone.phone} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-1/2 gap-2'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>Emergency Contact No 1</p>
                            </div>
                            <div className='w-4/5 border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='enter emergency contact 1' 
                                    name="emergencyContact1" 
                                    value={formData.emergencyContact1.phone} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                        <div className='flex flex-row gap-2 w-full md:w-1/2'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>Emergency Contact No 2</p>
                            </div>
                            <div className='w-4/5 border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='enter emergency contact 2' 
                                    name="emergencyContact2" 
                                    value={formData.emergencyContact2.phone} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-1/2 gap-2'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>Date of Birth</p>
                            </div>
                            <div className='w-4/5 border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='enter date of birth' 
                                    name="dob" 
                                    value={formData.dob} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                        <div className='flex flex-row gap-2 w-full md:w-1/2'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>Blood Group</p>
                            </div>
                            <div className='w-4/5 border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='enter blood group' 
                                    name="bloodGroup" 
                                    value={formData.bloodGroup} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-full gap-2'>
                            <div className='w-[13%] flex items-center'>
                                <p className='text-[16px]'>Email</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='enter email address' 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-1/2 gap-2'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>Present Address</p>
                            </div>
                            <div className='w-4/5 border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='enter present address' 
                                    name="presentAddress" 
                                    value={formData.presentAddress} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                        <div className='flex flex-row gap-2 w-full md:w-1/2'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>Permanent Address</p>
                            </div>
                            <div className='w-4/5 border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='enter permanent address' 
                                    name="permanentAddress" 
                                    value={formData.permanentAddress} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-2'>
                        <div className='flex flex-row w-full md:w-2/5 gap-10'>
                            <div className='w-1/3 flex items-center'>
                                <p className='text-[16px]'>Gender</p>
                            </div>
                            <div className="w-4/5 rounded-lg flex items-center flex flex-row gap-2">
                                <input 
                                    type="radio" 
                                    id="male" 
                                    name="gender" 
                                    className="hidden" 
                                    value="male"
                                    checked={formData.gender === 'male'}
                                    onChange={handleChange} 
                                />
                                <label htmlFor="male" className="flex items-center cursor-pointer mr-6">
                                    <span className="w-4 h-4 border-4 border-blue-500 rounded-full mr-2"></span>
                                    Male
                                </label>
    
                                <input 
                                    type="radio" 
                                    id="female" 
                                    name="gender" 
                                    className="hidden" 
                                    value="female"
                                    checked={formData.gender === 'female'}
                                    onChange={handleChange} 
                                />
                                <label htmlFor="female" className="flex items-center cursor-pointer">
                                    <span className="w-4 h-4 border-4 border-gray-500 rounded-full mr-2"></span>
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-row gap-2 w-full md:w-3/5'>
                            <div className='w-1/4 flex items-center'>
                                <p className='text-[16px]'>Marital Status</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='enter marital status' 
                                    name="maritalStatus" 
                                    value={formData.maritalStatus} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-2'>
                        <div className='flex flex-row w-full md:w-[85%] gap-2'>
                            <div className='w-1/6 flex items-center'>
                                <p className='text-[16px]'>Upload Photo</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="file" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    onChange={handleFileChange} 
                                />
                            </div>
                        </div>
                        <div className='flex flex-row w-full md:w-[14%] justify-end'>
                            <button className='flex items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-10 rounded bg-sky-500 hover:bg-sky-700'>
                                Choose File
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {currentPage === 2 && (
                <div className='w-[99%] p-2 flex flex-col gap-4'>
                    <h1 className='text-xl font-bold'>Account Login</h1>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-full gap-4'>
                            <div className='w-1/5 flex items-center'>
                                <p className='text-[16px]'>Employee Email</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="text" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='enter employee email' 
                                    name="employeeEmail" 
                                    value={formData.employeeEmail} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-8'>
                        <div className='flex flex-row w-full md:w-full gap-4'>
                            <div className='w-1/5 flex items-center'>
                                <p className='text-[16px]'>Password</p>
                            </div>
                            <div className='w-full border border-gray-300 rounded-lg flex items-center'>
                                <input 
                                    type="password" 
                                    className="w-full rounded-lg bg-transparent focus:outline-none p-2" 
                                    placeholder='enter password' 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-7 items-center'>
                        <p className='text-[18px]'>Enable Notifications</p>
                        <ToggleOffOutlinedIcon fontSize='large'/>
                    </div>
                    <div className="flex justify-end gap-5 md:mr-10 mr-4 h-[300px] items-end">
                        <button className="flex items-center text-white text-[10px] md:text-[12px] h-[30px] py-1 md:py-1 px-2 md:px-6 rounded bg-sky-500 hover:bg-sky-700"
                            onClick={updateProfile}
                        >
                            Update
                        </button>
                        <button className="flex items-center text-red-500 text-[10px] md:text-[12px] h-[30px] py-1 md:py-1 px-2 md:px-6 border border-red-500 rounded bg-transparent hover:bg-red-700">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <div className="flex justify-between p-4">
                <button onClick={prevPage} disabled={currentPage === 1} className="btn">
                    <KeyboardArrowLeftIcon/>
                </button>
                <button onClick={nextPage} disabled={currentPage === 2} className="btn">
                    <KeyboardArrowRightIcon/>
                </button>
            </div>
        </Box>
    );
};

export default PersonalDetails;
