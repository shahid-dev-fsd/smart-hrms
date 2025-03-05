import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from "react-router-dom";
import { Box } from "@mui/material";


const JobCards = () => {
  const data = [
    { id: 1, title: "Full Stack Developer", date: "12 Nov 2023", name: "George Anikan", label: "Label1", link:'id' },
    { id: 2, title: "Frontend Developer", date: "12 Nov 2023", name: "Solomon Styles", label: "Label2", link:'id' },
    { id: 1, title: "Full Stack Developer", date: "12 Nov 2023", name: "Tyler Jones", label: "Label1", link:'id' },
    { id: 2, title: "Graphics Designer", date: "12 Nov 2023", name: "Nathan Idie", label: "Label2", link:'id' },
    { id: 1, title: "Backend Developer", date: "12 Nov 2023", name: "Gotham Reign", label: "Label1", link:'id' },
    { id: 2, title: "QA Tester", date: "12 Nov 2023", name: "Stephan Grant", label: "Label2", link:'id' },
    { id: 1, title: "Marketing Manager", date: "12 Nov 2023", name: "Angelina Rush", label: "Label1", link:'id' },
    
    { id: 1, title: "Full Stack Developer", date: "12 Nov 2023", name: "Marvin Kent", label: "Label1", link:'id' },
    { id: 2, title: "Frontend Developer", date: "12 Nov 2023", name: "Desmond Zuma", label: "Label2", link:'id' },
    { id: 1, title: "Full Stack Developer", date: "12 Nov 2023", name: "Raymond Emodi", label: "Label1", link:'id' },
    { id: 2, title: "Frontend Developer", date: "12 Nov 2023", name: "John Doe", label: "Label2", link:'id' },
    { id: 1, title: "Full Stack Developer", date: "12 Nov 2023", name: "George Anikan", label: "Label1", link:'id' },
    { id: 2, title: "Frontend Developer", date: "12 Nov 2023", name: "John Doe", label: "Label2", link:'id' },
    { id: 2, title: "Frontend Developer", date: "12 Nov 2023", name: "John Doe", label: "Label2", link:'id' },
    { id: 2, title: "Frontend Developer", date: "12 Nov 2023", name: "John Doe", label: "Label2", link:'id' },
    { id: 2, title: "Frontend Developer", date: "12 Nov 2023", name: "John Doe", label: "Label2", link:'id' },

    

   
  ];

  

  return (
    <div className="w-full flex flex-wrap justify-between mx-4 pt-4 gap-1 pr-6">
    {data.map((item, index) => (
        <Box key={index} className="w-full md:w-[48%] lg:w-[32%] xl:w-[24%] h-auto p-2 gap-4  rounded-lg mb-4" sx={{ backgroundColor: 'background.view', }}>
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-[14px]">{item.title}</h1>
                <p className="text-[8px] text-zinc-500">{item.date}</p>
            </div>
            <div className="flex flex-row justify-start gap-2 items-center">
                <p className="text-[12px] text-zinc-500"><PersonIcon fontSize="small" className="text-zinc-300"/> {item.name}</p>
            </div>
            <div className="flex flex-row gap-2 pt-2">
                <Link to={`/showmore:${item.link}`}>
                    <button className="flex text-zinc-200 p-1 bg-sky-500 rounded-sm text-[8px]">Show more</button>
                </Link>
                <button className="flex text-zinc-200 p-1 bg-amber-500 rounded-sm text-[8px]">Delete</button>
            </div>
            <div className="flex flex-row gap-1 w-full mt-2">
                <div className="flex items-center border-b border-solid border-zinc-50 w-[96%] ">
                    <div className="w-full relative ">
                        <select
                            className="outline-none border-none w-full bg-transparent  light:text-zinc-50 text-[12px] pr-6 appearance-none"
                        >
                            <option value="" >Add Label</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>
                    </div>
                    <ArrowDropDownIcon className="text-zinc-500"/>
                </div>
                <p className="text-[14px] text-zinc-500 flex items-bottom justify-bottom">+</p>
            </div>
            <div className="flex flex-row gap-2 pt-2">
                <Box sx={{backgroundColor: 'background.bond', color:'text.two'}} className="flex p-1 bg-neutral-800 text-[8px]">Applied</Box>
                <Box sx={{backgroundColor: 'background.bond', color:'text.two'}} className="flex p-1 bg-neutral-800 text-[8px]">Interview Sent</Box>
                <Box sx={{backgroundColor: 'background.bond', color:'text.two'}} className="flex p-1 bg-neutral-800 text-[8px]">Interviewed</Box>
                <Box sx={{backgroundColor: 'background.bond', color:'text.two'}} className="flex p-1 bg-neutral-800 text-[8px]">Offer Letter Sent</Box>
            </div>
        </Box>
    ))}
</div>
  );
};

export default JobCards;
