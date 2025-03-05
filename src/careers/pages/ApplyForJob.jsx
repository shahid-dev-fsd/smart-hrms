import { ChangeEvent, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import './apply-for-job.css'
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import countryCodes from 'country-codes-list';
import { ToastContainer  , toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../components/Loading";
import { env } from "../../utilities/function";
import { setCookie } from "../../utilities/cookies";
const ApplyForJob = ({setCareerUser}) => {

const { organization } = useParams();
const [selected, setSelected] = useState("US");
const [user, setUser] = useState({});
const [show, setShow] = useState(false);
const [isLoading, setIsLoading] = useState({show:false , message :""});
const jobId = useParams().id;
const [job, setJob] = useState({});
const [checkBox, setCheckBox] = useState(false);
const [accessToken, setAccessToken] = useState("");
const navigate = useNavigate();
const location = useLocation();
const [picture, setPicture] = useState('');
const [resume, setResume] = useState('');
const [linkdin , setLinkdin] = useState('');
const [twitter ,setTwitter] = useState('');
const [exp , setExp] = useState('');
const [mob , setmob] = useState(user?.phoneNumber || "");
const [jobIds , setJobId] = useState();
const [adminId , setAdminId] = useState();
const resumeInputRef = useRef(null);
const photoInputRef = useRef(null);
const cvInputRef = useRef(null);


const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  const fetchJob = async  (jobId) => {
    const res = await axios.get("/open/job-listing/" + jobId);
    const job = res.data.job;
    setJob(job);
  } ;

  const handleButtonClick = (fileInputRef) => {
    fileInputRef.current.click();
  };


//   console.log("jobs" , job)

  const createSession = async (refreshToken, user) => {
    try {
        setCareerUser(user)
      const response = await axios.post(`/open/session`, {
        refreshToken,
        userId: user._id,
      });
      let data = response.data;
      if (data.success) {
        setCookie("accessToken", data.token);
        setAccessToken(data.token)
        if (jobId) fetchJob(jobId);

        const [year, month, day] = data.user?.dob?.split('-');
        const monthIndex = monthNames.indexOf(month) + 1;
        document.getElementById('month').value = monthIndex;
        document.getElementById('day').value = parseInt(day);
        document.getElementById('year').value = parseInt(year);

        setUser(user);
        setIsLoading({show:false , message :""})
      } else {
        setUser(null);
      }
    } catch (e) {
    //   toast.error('Something went wrong please reload page');
      setUser(null);
    }
  };

  useEffect(() => {
    setIsLoading({show:true , message :"Please wait user fetching data"})
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    (async () => {
      try {
        const queryParameters = new URLSearchParams(window.location.search);
        const userId = queryParameters.get("userId");
        const refreshToken = queryParameters.get("refreshToken");
        console.log(userId);

        if (userId) {
          var formData = new FormData();
          formData.append("id", userId);
          const response = await fetch(
            "https://accounts.clikkle.com:5000/api/auth/get_user_profile",
            // "https://api.campaigns.clikkle.com/get_user_profile",
            // "http://localhost:5000/api/auth/get_user_profile",
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            console.log("user found ...");
            const responseData = await response.json();
            let { user } = responseData;
            user.refreshToken = refreshToken;
            console.log(user);
            localStorage.setItem("careerUser", JSON.stringify(user));
            await createSession(refreshToken, user);
          } else {
            console.log("user not found");
            setUser(null);
          }
        } else if (localStorage.getItem("careerUser")) {
          let user = JSON.parse(localStorage.getItem("careerUser"));
          await createSession(user.refreshToken ,user );
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log(err);
        // handleAxiosError(err, showError);
        setUser(null);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


//   const UserDetails = JSON.parse(window.localStorage.getItem('careerUser'));

//   console.log("First Name:", UserDetails?.firstName);
//   console.log("Last Name:", UserDetails?.lastName);
//   console.log("Email:", UserDetails?.email);
//   console.log("Phone Number:", UserDetails?.phoneNumber);
//   console.log("Gender:", UserDetails?.gender);


//   useEffect(() => {
//     // Set the selected values for the select elements
//     document.getElementById('month').value = monthIndex;
//     document.getElementById('day').value = parseInt(day);
//     document.getElementById('year').value = parseInt(year);
//   }, [monthIndex, day, year]);

// useEffect(()=>{
    if (user == null) {
        let url =  encodeURIComponent(window.location.href)
        const redirectTo =
          env("AUTHENTICATION_CLIENT") +
          "/login?referrer="+window.location.href+"&&redirectto=" + url;
        return (
          <Loading
            message="Please wait, redirecting you to Clikkle Accounts"
            redirectTo={redirectTo}
          />
        );
      }
// },[user])
  


const handleResumeChange = (e) => {
    const { files } = e.target;
  
    const file = files[0];
    const isValidExtension = [
        'PDF', 'DOC', 'DOCX', 'DOCS', 'TXT', 'PNG', 'JPEG', 'JPG', 'AVIF', 'WEBP'
    ].some(ext => new RegExp(`(${ext})$`, 'gi').test(file.name));

    if (!isValidExtension || file.size > 10e6) {
        toast.error('Please provide a valid file format (PDF, DOC, TXT, PNG, JPEG, etc.) and ensure it is under 10MB in size.');
        return;
    }
    toast.success("Resume update successfully");
    setResume(file);
};

const handlePhotoChange = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) {
        toast.error('No file selected');
        return;
    }

    const file = files[0];
    const isValidExtension = ['PNG', 'JPEG', 'JPG', 'AVIF', 'WEBP'].some(ext =>
        new RegExp(`(${ext})$`, 'i').test(file.name)
    );

    if (!isValidExtension) {
        toast.warn('Please provide a valid photo file format (PNG, JPEG, JPG, AVIF, WEBP).');
        return;
    }
    toast.success("Photo update successfully");
    setPicture(file);
};


// const onSubmit = (res) => {
//     const { success, errors } = res.data;

//     if (success) {
//         // toast.success('Applied Successfully');
//         // Optionally, redirect or perform other actions upon successful submission
//     } else {
//         errors.forEach((err) => toast.error(err));
//     }
// };

const onError = (err) => {
    const { errors } = err.response?.data || { errors: ['Something went wrong please try again some time later'] };
    errors.forEach((err) => toast.error(err));
};

const handleSubmit = async (e) => {
    e.preventDefault();
  
     console.log("call the func")

     if(accessToken ==""){
        toast.error('Something went wrong please reload page');
        return;
     }
     
    if (!picture || !resume) {
        toast.error(`Please upload   ${!picture ? " a photo" :""} , ${!resume ?  "a  resume" :""} .`);
        return;
    }

    if (!picture || !resume || !exp || !selected || !linkdin || !jobId  ) {
        console.log( exp , selected , linkdin , jobId , mob )
        toast.error('Please fill out all fields.');
        return;
    }

    setIsLoading({show:true , message :"Job application Submitting please wait"})

    try {
    const formData = new FormData();
    formData.append('photo', picture); // Ensure 'photo' matches backend field name
    formData.append('resume', resume); // Ensure 'resume' matches backend field name
    formData.append('experience', exp);
    formData.append('countryCode', selected);
    formData.append('linkedinAccount', linkdin);
    formData.append('jobId', jobId); 
    formData.append('phone', mob||user?.phoneNumber);


    //  let  url =  env('SERVER')+"/user/job-application"

    //   const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`,
    //       },
    //     body: formData,
    //   });


        const res = await axios.post('/user/job-application', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(res)
        if(res.status=="200"){
        setPicture(null);
        setResume(null);
        setExp('');
        setSelected('');
        setLinkdin('');
        setJobId('');
        setmob('');
        toast.success('Application submitted successfully.');

        setTimeout(()=>{
            navigate(`/career/${organization}`)
        },[2000])
        }
        // onSubmit(res);
    } catch (e) {
        onError(e);
    }finally{
        setIsLoading({show:false  , message :""})
    }
};

const handleUrlChange = (e) => {
    const value = linkdin;
    const regex = /^(https?:\/\/)?(www\.)?linkedin\.com/
    if (!regex.test(value)) {
        toast.error('Please enter a valid LinkedIn URL starting with www.linkedin.com');
    }
};


    return (
        <>
        <ToastContainer/>
        {isLoading.show && 
        <div className="h-full z-10 absolute top-0 left-0 w-screen flex flex-col justify-center">
            <Loading  message={isLoading.message} /> 
        </div>}
         <div className={`${isLoading.show ?  "hidden" :"flex flex-col" }  h-screen mx-8 md:mx-16 lg:mx-24 xl:mx-32 gap-4 dark:text-zinc-500`}>
            <nav className="flex mt-6" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <div className="inline-flex items-center px-1 text-sm font-medium text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            Career
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" d="m1 9 4-4-4-4" />
                            </svg>
                            <span onClick={() => navigate(`/career/${organization}/job/${jobId}`)} className="ms-1 text-sm font-medium cursor-pointer text-blue-600 md:ms-2 px-1 dark:text-gray-400 dark:hover:text-white">{job?.title}</span>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 px-1 md:ms-2 dark:text-gray-400">Apply</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <form className="w-full mb-8" onSubmit={handleSubmit}>
                <h1 className="text-2xl dark:text-zinc-200 font-bold mt-4 mb-8">Personal Details</h1>
                <div className="formInputGrid gap-20 mb-6 sm:gap-10">
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="firstName" >
                            First Name
                        </label>
                        <input className="shadow appearance-none border rounded-lg placeholder-gray-600 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="firstName" name="firstName" type="text" placeholder="Enter First Name"
                        value={user?.firstName}
                        />
                    </div>
                
                    <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="lastName" >
                            Last Name
                        </label>
                        <input value={user?.lastName}  className="shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="lastName" name="lastName" type="text" placeholder="Enter Last Name" />
                    </div>
                </div>

                <div className="formInputGrid gap-20 mb-6">
                    <div className="mb-4 w-full">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="email" >
                            Email
                        </label>
                        <input value={user?.email} className="shadow appearance-none border rounded-lg placeholder-gray-600 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="email" name="email" type="email" placeholder="Enter Email" />
                    </div>

                    <div className="mb-4 w-full">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="phone" >
                            Phone Number
                        </label>
                        <div className="flex items-center">
                            <ReactFlagsSelect
                                selected={selected}
                                onSelect={(code) => setSelected(code)}
                                className="w-16"
                                showSelectedLabel={false}
                                showSecondaryOptionLabel={false}
                                showOptionLabel={false}
                                selectedSize={22}
                            />
                            <input className="flex-1 shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-3 dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="phone" name="phone" type="text" placeholder="Enter Phone Number"
                            onChange={(e)=>setmob(e.target.value)}
                            required
                            //value={user?.phoneNumber}
                            defaultValue={user?.phoneNumber}
                            readOnly
                            />
                        </div>
                    </div>
                    
                </div> 

                <div className="formInputGrid gap-20 mb-6">
                <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="dob" >
                            D.O.B
                        </label>
                        <div className="dobGrid">
                        <input name="month" readOnly id="month" className="border shadow border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#141414] dark:border-slate-600 dark:placeholder-slate-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Month" />
                        <input name="day" readOnly id="day" className="border shadow border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#141414] dark:border-slate-600 dark:placeholder-slate-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Date" />
                        <input name="year" readOnly id="year" className="border shadow border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#141414] dark:border-slate-600 dark:placeholder-slate-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Year" />
                        {/* <select name="month" id="month" className="border shadow border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#141414] dark:border-slate-600 dark:placeholder-slate-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Month</option>
                        <option value="1">Jan</option>
                        <option value="2">Feb</option>
                        <option value="3">Mar</option>
                        <option value="4">Apr</option>
                        <option value="5">May</option>
                        <option value="6">Jun</option>
                        <option value="7">Jul</option>
                        <option value="8">Aug</option>
                        <option value="9">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                        </select>
                        <select name="day"  id="day" className="border shadow border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#141414] dark:border-slate-600 dark:placeholder-slate-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Day</option>
                        {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <select name="year" id="year" className="border shadow border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#141414] dark:border-slate-600 dark:placeholder-slate-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Year</option>
                        {Array.from({ length: 50 }, (_, i) => (
                        <option key={i + 1960} value={i + 1960}>{i + 1960}</option>
                        ))}
                    </select> */}
                        </div>

                    </div>
                    <div className="mb-6">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="jobRole" >
                            Job Role
                        </label>
                        <input className="shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="jobRole"  name="jobRole" type="text" value={job?.title ?? ""} disabled placeholder="Enter Job Role" required/>
                    </div>
                </div>
                

                    {/* <div className="mb-4 w-full">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="phone" >
                            Phone Number
                        </label>
                        <div className="flex items-center">
                            <ReactFlagsSelect
                                selected={selected}
                                onSelect={(code) => setSelected(code)}
                                className="w-16"
                                showSelectedLabel={false}
                                showSecondaryOptionLabel={false}
                                showOptionLabel={false}
                                selectedSize={22}
                            />
                            <input className="flex-1 shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-3 dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="phone" name="phone" type="text" placeholder="Enter Phone Number"
                            onChange={(e)=>setmob(e.target.value)}
                            required/>
                        </div>
                    </div> */}

                <div className="mb-6">
                    <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="experience" >
                        Years of Experience
                    </label>
                    <input className="shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="experience"  name="experience" type="number" placeholder="Enter Whole Numbers Only"
                    onChange={(e)=>setExp(e.target.value)}
                    required/>
                </div>

                <div className="mb-2">
                    <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="address" >
                        Address
                    </label>
                    <textarea className="shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="address" name="address" rows={5} placeholder="Enter Address" />
                </div>



                <div className="formInputGrid gap-20 mb-6">
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="cityName" >
                            City Name
                        </label>
                        <input className="shadow appearance-none border rounded-lg placeholder-gray-600 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="cityName" name="cityName" type="text" placeholder="Enter City Name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="postal" >
                            Postal Code
                        </label>
                        <input className="shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="postal" name="postal" type="text" placeholder="Enter Postal Code" />
                    </div>
                </div> 

                <h1 className="text-2xl dark:text-zinc-200 font-bold mt-4 mb-8">Education</h1>
                <div className="formInputGrid gap-20 mb-6">
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="school" >
                            School
                        </label>
                        <input className="shadow appearance-none border rounded-lg placeholder-gray-600 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="school" name="school" type="text" placeholder="Enter School Name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="fieldOfStudy" >
                            Field Of Study
                        </label>
                        <input className="shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="fieldOfStudy" name="fieldOfStudy" type="text" placeholder="Enter Field Of Study" />
                    </div>
                </div>
                <div className="mb-2">
                    <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="edSummary" >
                        Summary
                    </label>
                    <textarea className="shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="edSummary" name="edSummary" rows={5} placeholder="Summary" />
                </div>
                <div className="mb-5">
                    <button type="button" className="d-block bg-transparent text-sky-600 text-sm">Delete</button>
                </div>
                <div className="mb-8">
                    <button type="button" className="bg-transparent text-sky-600">+ Add Education</button>
                </div> 

                <h1 className="text-2xl dark:text-zinc-200 font-bold mt-4 mb-2">Experience</h1>
                <h3 className="text-gray-400 text-sm mb-6">Work History</h3>
            
                <div className="formInputGrid gap-20 mb-6">
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="startDate" >
                            Start Date
                        </label>
                        <input className="shadow appearance-none border rounded-lg placeholder-gray-600 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="startDate"  name="startDate" type="date" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="endDate" >
                            End Date
                        </label>
                        <input className="shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="endDate" name="endDate" type="date" />
                    </div>
                </div>
                <div className="mb-2">
                    <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="workSummary" >
                        Summary
                    </label>
                    <textarea className="shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="workSummary" name="workSummary" rows={5} placeholder="Summary" />
                </div>
                <div className="mb-5">
                    <button type="button" className="d-block bg-transparent text-sky-600 text-sm">Delete</button>
                </div>
                <div className="mb-8">
                    <button type="button" className="bg-transparent text-sky-600">+ Add Position</button>
                </div>


                <h1 className="text-2xl dark:text-zinc-200 font-bold mt-4 mb-6">Upload Documents</h1>

                <div className="mb-4">
                     <h3  className="mb-2 mr font-bold dark:text-white">Upload Picture</h3>  
                    <button type="button" onClick={()=>{handleButtonClick(resumeInputRef)}} className="bg-sky-600 rounded text-white px-6 py-3 mr-2">Upload Picture</button>
                    <input type="file"   id="photo" name="photo" ref={resumeInputRef}  accept="*" className="hidden"    onChange={handlePhotoChange}/>
                </div>
                <div className="mb-4">
                    <h3  className="mb-2  font-bold dark:text-white">Resume/CV</h3>
                    <button type="button"  onClick={()=>{handleButtonClick(photoInputRef)}} className="bg-sky-600 rounded text-white px-6 py-3 mr-2">Upload Resume/CV</button>
                    <input type="file" name="resume" id="resume" ref={photoInputRef}  className="hidden" accept="*"   onChange={handleResumeChange}   />
                </div>
                <div className="mb-4">
                    <h3 htmlFor="cover" className="mb-2 font-bold dark:text-white">Cover Letter</h3>
                    <button type="button"  onClick={()=>{handleButtonClick(cvInputRef)}} className="bg-sky-600 rounded text-white px-6 py-3">Upload Cover Letter</button>
                    <input type="file" id='cover' name="cover" ref={cvInputRef}  accept=".pdf, .docx, .txt" className="hidden" />
                </div>

                <div className="mb-8">
                    <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="coverLetter" >
                        Or type in box
                    </label>
                    <textarea className="shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="coverLetter" name="coverLetter" rows={5} placeholder="Cover Letter" />
                </div>

                <h1 className="text-2xl dark:text-zinc-200 font-bold mt-4 mb-6">Socials</h1>
                <div className="mb-10">
                <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="linkedin" >
                            Add the link to your Linkedin Profile
                        </label>
                        <input className="shadow appearance-none border rounded-lg placeholder-gray-600 w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="linkedin" type="text" name="linkedin" placeholder="Enter Profile Link"
                        onChange={(e)=>setLinkdin(e.target.value)}
                        onBlur={handleUrlChange}
                        required />
                </div>

                {/* <div className="formInputGrid gap-20 mb-6">
                    <div className="mb-4">
                        
                    </div>
                    <div className="mb-12">
                        <label className="block text-black text-sm font-bold mb-4 dark:text-zinc-200" htmlFor="twitter" >
                            Add the link to your Twitter Profile
                        </label>
                        <input className="shadow appearance-none border placeholder-gray-600 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-[#141414] dark:text-white dark:border-slate-600 dark:placeholder-slate-600" id="twitter" type="text" placeholder="Enter Profile Link"
                                                onChange={(e)=>setTwitter(e.target.value)}

                        />
                    </div>
                </div> */}

                <div className="text-center mb-16">
                    <button className="bg-sky-600 rounded text-white px-6 py-3">Submit The Application</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default ApplyForJob
