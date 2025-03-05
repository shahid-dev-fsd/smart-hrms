import * as React from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Socialsetting = () => {
  return (
    <>
      <div className="flex items-center  justify-between md:w-[97%] p-4">
        <div className="p-2">
          <h1 className="text-2xl text-neutral-500">API Settings</h1>
        </div>
        <div className="flex  flex-row items-center bg-# justify-center gap-4">
          <Box sx={{ backgroundColor: "background.view" }}>
            {" "}
            <InfoOutlinedIcon />
          </Box>
        </div>
      </div>

      <Box
        className="w-[95%] mt-12 ml-2 md:ml-5 pt-4 relative h-[70vh] overflow-hidden overflow-y-scroll no-scrollbar rounded-lg mb-4"
        sx={{ backgroundColor: "background.view" }}
      >
        {" "}
        <p
          className=" mb-4 border-l-4 border-blue-500 pl-4 text-xl"
          gutterBottom
        >
          Social Settings
        </p>
        <div className="w-[96%] m-auto border rounded border-gray-500 p-4 flex flex-col gap-4">
          <div className="flex justify-between">
            <p
              className=" mb-4 ml-[-18px] border-l-4  border-blue-500 pl-4 "
              gutterBottom
            >
              Google Login
            </p>{" "}
            <FormGroup>
              <FormControlLabel
                sx={{ color: "gray" }}
                className=""
                control={<Switch />}
                label=""
              />
            </FormGroup>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px] whitespace-nowrap">Callback URL</p>
              </div>
              <div className="w-full border border-gray-300 rounded-lg flex items-center">
                <input
                  type="text"
                  className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                  placeholder="enter url"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Client ID </p>
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
                    label="enter text"
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
                <p className="text-[16px]">Secret </p>
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
                    label="enter text"
                    multiline
                    rows={4}
                    sx={{ color: "gray" }}
                  />
                </div>
              </Box>
            </div>
          </div>
        </div>
        <div className="w-[96%] mt-12 m-auto border rounded border-gray-500 p-4 flex flex-col gap-4">
          <div className="flex justify-between">
            <p
              className=" mb-4 ml-[-18px] border-l-4  border-blue-500 pl-4 "
              gutterBottom
            >
              Facebook Login
            </p>{" "}
            <FormGroup>
              <FormControlLabel
                sx={{ color: "gray" }}
                className=""
                control={<Switch />}
                label=""
              />
            </FormGroup>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px] whitespace-nowrap">Callback URL</p>
              </div>
              <div className="w-full border border-gray-300 rounded-lg flex items-center">
                <input
                  type="text"
                  className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                  placeholder="enter url"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Client ID </p>
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
                    label="enter text"
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
                <p className="text-[16px]">Secret </p>
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
                    label="enter text"
                    multiline
                    rows={4}
                    sx={{ color: "gray" }}
                  />
                </div>
              </Box>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-12   w-[98%]">
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
              size="large"
            >
              Cancel
            </Button>
          </Stack>
        </div>
      </Box>
    </>
  );
};

export default Socialsetting;
