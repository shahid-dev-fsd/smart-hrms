import * as React from "react";
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const Customcssjs = () => {
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
        className="w-[95%] overflow-hidden overflow-y-scroll no-scrollbar  h-[60vh] mt-12 ml-2 md:ml-5 pt-4 rounded-lg mb-4"
        sx={{ backgroundColor: "background.view" }}
      >
        <p
          className=" mb-4 border-l-4 border-blue-500 pl-4 text-xl"
          gutterBottom
        >
          Custom (CSS/javascript)
        </p>

        <div className="w-[99%] p-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Css Styles </p>
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
                    label="type in css style "
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
                <p className="text-[16px]">Javascript Styles </p>
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
                    label="type in javascript style"
                    multiline
                    rows={4}
                    sx={{ color: "gray" }}
                  />
                </div>
              </Box>
            </div>
          </div>
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

export default Customcssjs;
