import React, { useCallback, useEffect } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import Overview from "./Overview";
import AddIcon from '@mui/icons-material/Add';
import OverviewCards from "./JobCards";
import { Box, Button, Grid, Modal, Pagination } from "@mui/material";
import CreateLabel from "./CreateLebel";
import axios from "axios";


const Newreceivedapplication = () => {
  const [open, setOpen] = React.useState(false);
  const [labels, setLabels] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchLabel = useCallback(
    async function () {
        try {
            const response = await axios.get(`hr/lists/application_status`);
            const Labels = response.data.list.items;

            setLabels(Labels);
        } catch (e) {
            console.log(e);
        }
    },
    [setLabels]
);


useEffect(() => {  
  console.log("ddd",fetchLabel)
  fetchLabel()
}, [fetchLabel]);


  return (
    <Box>
      <div className=" rounded-lg">
        <div className="flex items-center justify-between md:w-full  pb-2">
            <h1 className="text-2xl text-neutral-500">Received Applications</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Box>
            <AddIcon color="#1976d2" sx={{color : "#1976d2" }} onClick={handleOpen} />
              {/* <Button onClick={handleOpen} variant="contained">
               +
              </Button> */}
            </Box>
            <InfoOutlinedIcon />
          </div>
        </div>
        <OverviewCards labels={labels} />
        {/* <div className="flex items-center justify-between md:mx-4 pl-5 md:pl-0 pt-2">
          <div className="p-2 rounded-lg ">
            <div className="flex items-center  gap-0 md:gap-6"></div>
          </div>
          <div className="flex flex-row gap-4">
            <KeyboardArrowLeftOutlinedIcon className="text-zinc-300" />
            <p className="text-zinc-300">1</p>
            <p className="text-zinc-300 bg-blue-500 w-[20px] h-[20px] flex items-center justify-center p-1 rounded-full">
              2
            </p>
          </div>
        </div> */}
      </div>
      <Modal open={open} onClose={handleClose}>
        <CreateLabel handleClose={handleClose} fetchLabel={fetchLabel} />
      </Modal>
    </Box>
  );
};

export default Newreceivedapplication;
