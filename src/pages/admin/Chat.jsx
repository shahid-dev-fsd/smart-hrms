import * as React from "react";
import Box from "@mui/material/Box";
import { FormControl } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const Chat = () => {
  return (
    <>
      {" "}
      <div className="flex items-center justify-between md:w-[97%] p-4">
        <div className="p-2">
          <h1 className="text-2xl text-neutral-500">General Settings</h1>
        </div>
        <div className="flex  flex-row items-center bg-# justify-center gap-4">
          <Box sx={{ backgroundColor: "background.view" }}>
            {" "}
            <InfoOutlinedIcon />
          </Box>
        </div>
      </div>
      <Box
        className="w-[95%] overflow-hidden overflow-y-scroll no-scrollbar h-[70vh] mt-12 ml-2 md:ml-5 pt-4 rounded-lg mb-4"
        sx={{ backgroundColor: "background.view" }}
      >
        <p
          className=" mb-4 border-l-4 border-blue-500 pl-4 text-xl"
          gutterBottom
        >
          Chat Settings
        </p>

        <div className="w-[99%] p-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Chat </p>
              </div>
              <div className="w-full md:w-full   items-center">
                <FormGroup>
                  <FormControlLabel
                    className=""
                    sx={{ color: "gray" }}
                    control={<Switch />}
                    label="Enable/Disable"
                  />
                </FormGroup>
                <p className="text-xs  text-gray-700  ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px] whitespace-nowrap">Chat Type</p>
              </div>
              <div className="w-full  flex items-center">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Default Chat"
                      control={<Radio />}
                      label="Default Chat"
                    />
                    <FormControlLabel
                      value="Live Chat"
                      control={<Radio />}
                      label="Live Chat"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px]">Title</p>
              </div>
              <div className="w-full border border-gray-300 rounded-lg flex items-center">
                <input
                  type="text"
                  className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                  placeholder="Name"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px]">Tagline</p>
              </div>
              <div className="w-full border border-gray-300 rounded-lg flex items-center">
                <input
                  type="text"
                  className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                  placeholder="Name"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Offline Text </p>
              </div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    width: "100%",
                    outline: "gray",
                    color: "gray",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-multiline-static"
                    label="type in text"
                    multiline
                    rows={4}
                    sx={{ color: "gray" }}
                  />
                </div>
              </Box>
            </div>
          </div>{" "}
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Agent Welcome Text </p>
              </div>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    width: "100%",
                    outline: "gray",
                    color: "gray",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-multiline-static"
                    label="type in text"
                    multiline
                    rows={4}
                    sx={{ color: "gray" }}
                  />
                </div>
              </Box>
            </div>
          </div>{" "}
          <div className="flex justify-end  ">
            {" "}
            <Stack spacing={2} direction="row">
              <Button
                sx={{ padding: " 10px 50px" }}
                variant="contained"
                size="large"
              >
                Save
              </Button>
              <Button
                sx={{ padding: " 10px 50px" }}
                variant="outlined"
                color="error"
                size=""
              >
                Cancel
              </Button>
            </Stack>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Chat;
