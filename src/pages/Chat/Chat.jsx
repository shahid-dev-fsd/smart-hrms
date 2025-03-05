import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";

import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CallIcon from "@mui/icons-material/Call";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from '../../style/theme';

const Chat = () => {
    const { toggleTheme, mode } = useTheme();
     console.log(mode);

     const [tabs, setTabs] = useState("chat");
  return (
    <div>
      {" "}
      <Box
        sx={{ backgroundColor: "background.main" }}
        className="md:h-[87vh] no-scrollbar overflow-y-scroll overflow-hidden  rounded-[12px]  "
      >
        <div className="flex  justify-between  mt-4 px-4 md:px-14">
          <h2 className="text-[22px] text-gray-400 whitespace-nowrap">Chat</h2>
          <div>
            <Tooltip title="info" placement="top">
              <IconButton disableRipple variant="navIcon" sx={{ mr: 0 }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Box
          sx={{ backgroundColor: "background.view" }}
          className=" md:h-[77vh] mt-2 no-scrollbar  overflow-hidden rounded-[15px] mx-8  pb-4 "
        >
          <div className="flex  ">
            <div className="w-[30%] border-r-2  border-gray-500">
              <div className="sticky pt-3 top-0  ">
                {" "}
                <div className="flex overflow-hidden no-scrollbar overflow-y-scroll justify-evenly pb-3 px-8  border-gray-500 border-b-2">
                  {" "}
                  <Button
                    onClick={() => setTabs("chat")}
                    sx={{ padding: "5px 35px" }}
                    variant="contained"
                    // color="primary"
                  >
                    Chat
                  </Button>
                  <Button
                    onClick={() => setTabs("contacts")}
                    sx={{
                      padding: "5px 25px",
                      backgroundColor: "black",
                      border: "1px solid ",
                    }}
                    variant="contained"
                  >
                    Contacts
                  </Button>
                  <hr />
                </div>
              </div>
              {tabs === "chat" && (
                <div className="h-[70vh] no-scrollbar overflow-hidden overflow-y-scroll">
                  {" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <div className="relative">
                          {" "}
                          <img
                            className="h-[50px] w-[50px] rounded-[50%]"
                            src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                            alt=""
                          />
                          <div className="absolute bottom-0 right-0  rounded-[50%] bg-blue-500 border h-[12px] w-[12px]"></div>
                        </div>
                        <div>
                          Shakira <br />
                          <p className="text-[10px] w-[220px] text-gray-500 line-clamp-1">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Neque saepe deleniti expedita atque autem enim
                            sint quisquam beatae id animi voluptatem, reiciendis
                            soluta repellendus ad harum facere cumque fugit
                            impedit?
                          </p>
                        </div>
                      </div>

                      <div className="text-[12px]">
                        Now
                        <p className="bg-blue-500 text-[8px] ml-2 w-[50%] text-center rounded-[50%] ">
                          1
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <div className="relative">
                          {" "}
                          <img
                            className="h-[50px] w-[50px] rounded-[50%]"
                            src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                            alt=""
                          />
                          <div className="absolute bottom-0 right-0  rounded-[50%] bg-blue-500 border h-[12px] w-[12px]"></div>
                        </div>
                        <div>
                          Shakira <br />
                          <p className="text-[10px] w-[220px] text-gray-500 line-clamp-1">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Neque saepe deleniti expedita atque autem enim
                            sint quisquam beatae id animi voluptatem, reiciendis
                            soluta repellendus ad harum facere cumque fugit
                            impedit?
                          </p>
                        </div>
                      </div>

                      <div className="text-[12px]">
                        Now
                        <p className="bg-blue-500 text-[8px] ml-2 w-[50%] text-center rounded-[50%] ">
                          1
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <div className="relative">
                          {" "}
                          <img
                            className="h-[50px] w-[50px] rounded-[50%]"
                            src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                            alt=""
                          />
                          <div className="absolute bottom-0 right-0  rounded-[50%] bg-blue-500 border h-[12px] w-[12px]"></div>
                        </div>
                        <div>
                          Shakira <br />
                          <p className="text-[10px] w-[220px] text-gray-500 line-clamp-1">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Neque saepe deleniti expedita atque autem enim
                            sint quisquam beatae id animi voluptatem, reiciendis
                            soluta repellendus ad harum facere cumque fugit
                            impedit?
                          </p>
                        </div>
                      </div>

                      <div className="text-[12px]">
                        Now
                        <p className="bg-blue-500 text-[8px] ml-2 w-[50%] text-center rounded-[50%] ">
                          1
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <div className="relative">
                          {" "}
                          <img
                            className="h-[50px] w-[50px] rounded-[50%]"
                            src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                            alt=""
                          />
                          <div className="absolute bottom-0 right-0  rounded-[50%] bg-blue-500 border h-[12px] w-[12px]"></div>
                        </div>
                        <div>
                          Shakira <br />
                          <p className="text-[10px] w-[220px] text-gray-500 line-clamp-1">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Neque saepe deleniti expedita atque autem enim
                            sint quisquam beatae id animi voluptatem, reiciendis
                            soluta repellendus ad harum facere cumque fugit
                            impedit?
                          </p>
                        </div>
                      </div>

                      <div className="text-[12px]">
                        Now
                        <p className="bg-blue-500 text-[8px] ml-2 w-[50%] text-center rounded-[50%] ">
                          1
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <div className="relative">
                          {" "}
                          <img
                            className="h-[50px] w-[50px] rounded-[50%]"
                            src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                            alt=""
                          />
                          <div className="absolute bottom-0 right-0  rounded-[50%] bg-blue-500 border h-[12px] w-[12px]"></div>
                        </div>
                        <div>
                          Shakira <br />
                          <p className="text-[10px] w-[220px] text-gray-500 line-clamp-1">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Neque saepe deleniti expedita atque autem enim
                            sint quisquam beatae id animi voluptatem, reiciendis
                            soluta repellendus ad harum facere cumque fugit
                            impedit?
                          </p>
                        </div>
                      </div>

                      <div className="text-[12px]">
                        Now
                        <p className="bg-blue-500 text-[8px] ml-2 w-[50%] text-center rounded-[50%] ">
                          1
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <div className="relative">
                          {" "}
                          <img
                            className="h-[50px] w-[50px] rounded-[50%]"
                            src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                            alt=""
                          />
                          <div className="absolute bottom-0 right-0  rounded-[50%] bg-blue-500 border h-[12px] w-[12px]"></div>
                        </div>
                        <div>
                          Shakira <br />
                          <p className="text-[10px] w-[220px] text-gray-500 line-clamp-1">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Neque saepe deleniti expedita atque autem enim
                            sint quisquam beatae id animi voluptatem, reiciendis
                            soluta repellendus ad harum facere cumque fugit
                            impedit?
                          </p>
                        </div>
                      </div>

                      <div className="text-[12px]">
                        Now
                        <p className="bg-blue-500 text-[8px] ml-2 w-[50%] text-center rounded-[50%] ">
                          1
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <div className="relative">
                          {" "}
                          <img
                            className="h-[50px] w-[50px] rounded-[50%]"
                            src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                            alt=""
                          />
                          <div className="absolute bottom-0 right-0  rounded-[50%] bg-blue-500 border h-[12px] w-[12px]"></div>
                        </div>
                        <div>
                          Shakira <br />
                          <p className="text-[10px] w-[220px] text-gray-500 line-clamp-1">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Neque saepe deleniti expedita atque autem enim
                            sint quisquam beatae id animi voluptatem, reiciendis
                            soluta repellendus ad harum facere cumque fugit
                            impedit?
                          </p>
                        </div>
                      </div>

                      <div className="text-[12px]">
                        Now
                        <p className="bg-blue-500 text-[8px] ml-2 w-[50%] text-center rounded-[50%] ">
                          1
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <div className="relative">
                          {" "}
                          <img
                            className="h-[50px] w-[50px] rounded-[50%]"
                            src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                            alt=""
                          />
                          <div className="absolute bottom-0 right-0  rounded-[50%] bg-blue-500 border h-[12px] w-[12px]"></div>
                        </div>
                        <div>
                          Shakira <br />
                          <p className="text-[10px] w-[220px] text-gray-500 line-clamp-1">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Neque saepe deleniti expedita atque autem enim
                            sint quisquam beatae id animi voluptatem, reiciendis
                            soluta repellendus ad harum facere cumque fugit
                            impedit?
                          </p>
                        </div>
                      </div>

                      <div className="text-[12px]">
                        Now
                        <p className="bg-blue-500 text-[8px] ml-2 w-[50%] text-center rounded-[50%] ">
                          1
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <div className="relative">
                          {" "}
                          <img
                            className="h-[50px] w-[50px] rounded-[50%]"
                            src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                            alt=""
                          />
                          <div className="absolute bottom-0 right-0  rounded-[50%] bg-blue-500 border h-[12px] w-[12px]"></div>
                        </div>
                        <div>
                          Shakira <br />
                          <p className="text-[10px] w-[220px] text-gray-500 line-clamp-1">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Neque saepe deleniti expedita atque autem enim
                            sint quisquam beatae id animi voluptatem, reiciendis
                            soluta repellendus ad harum facere cumque fugit
                            impedit?
                          </p>
                        </div>
                      </div>

                      <div className="text-[12px]">
                        Now
                        <p className="bg-blue-500 text-[8px] ml-2 w-[50%] text-center rounded-[50%] ">
                          1
                        </p>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <div className="relative">
                          {" "}
                          <img
                            className="h-[50px] w-[50px] rounded-[50%]"
                            src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                            alt=""
                          />
                          <div className="absolute bottom-0 right-0  rounded-[50%] bg-blue-500 border h-[12px] w-[12px]"></div>
                        </div>
                        <div>
                          Shakira <br />
                          <p className="text-[10px] w-[220px] text-gray-500 line-clamp-1">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Neque saepe deleniti expedita atque autem enim
                            sint quisquam beatae id animi voluptatem, reiciendis
                            soluta repellendus ad harum facere cumque fugit
                            impedit?
                          </p>
                        </div>
                      </div>

                      <div className="text-[12px]">
                        Now
                        <p className="bg-blue-500 text-[8px] ml-2 w-[50%] text-center rounded-[50%] ">
                          1
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tabs === "contacts" && (
                <div className="h-[70vh] no-scrollbar overflow-hidden overflow-y-scroll">
                  {" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <img
                          className="h-[50px] w-[50px] rounded-[50%]"
                          src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                          alt=""
                        />
                        <div>
                          Shakira <br />
                          <p className="text-[10px] text-gray-500">
                            shakiradwain@hrickkle.com
                          </p>
                        </div>
                      </div>

                      <div>
                        {" "}
                        <MoreVertIcon />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <img
                          className="h-[50px] w-[50px] rounded-[50%]"
                          src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                          alt=""
                        />
                        <div>
                          Shakira <br />
                          <p className="text-[10px] text-gray-500">
                            shakiradwain@hrickkle.com
                          </p>
                        </div>
                      </div>

                      <div>
                        {" "}
                        <MoreVertIcon />
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <img
                          className="h-[50px] w-[50px] rounded-[50%]"
                          src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                          alt=""
                        />
                        <div>
                          Shakira <br />
                          <p className="text-[10px] text-gray-500">
                            shakiradwain@hrickkle.com
                          </p>
                        </div>
                      </div>

                      <div>
                        {" "}
                        <MoreVertIcon />
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <img
                          className="h-[50px] w-[50px] rounded-[50%]"
                          src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                          alt=""
                        />
                        <div>
                          Shakira <br />
                          <p className="text-[10px] text-gray-500">
                            shakiradwain@hrickkle.com
                          </p>
                        </div>
                      </div>

                      <div>
                        {" "}
                        <MoreVertIcon />
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <img
                          className="h-[50px] w-[50px] rounded-[50%]"
                          src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                          alt=""
                        />
                        <div>
                          Shakira <br />
                          <p className="text-[10px] text-gray-500">
                            shakiradwain@hrickkle.com
                          </p>
                        </div>
                      </div>

                      <div>
                        {" "}
                        <MoreVertIcon />
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <img
                          className="h-[50px] w-[50px] rounded-[50%]"
                          src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                          alt=""
                        />
                        <div>
                          Shakira <br />
                          <p className="text-[10px] text-gray-500">
                            shakiradwain@hrickkle.com
                          </p>
                        </div>
                      </div>

                      <div>
                        {" "}
                        <MoreVertIcon />
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <img
                          className="h-[50px] w-[50px] rounded-[50%]"
                          src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                          alt=""
                        />
                        <div>
                          Shakira <br />
                          <p className="text-[10px] text-gray-500">
                            shakiradwain@hrickkle.com
                          </p>
                        </div>
                      </div>

                      <div>
                        {" "}
                        <MoreVertIcon />
                      </div>
                    </div>
                  </div>{" "}
                  <div className="flex items-center justify-between pt-5 px-4">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-2">
                        {" "}
                        <img
                          className="h-[50px] w-[50px] rounded-[50%]"
                          src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                          alt=""
                        />
                        <div>
                          Shakira <br />
                          <p className="text-[10px] text-gray-500">
                            shakiradwain@hrickkle.com
                          </p>
                        </div>
                      </div>

                      <div>
                        {" "}
                        <MoreVertIcon />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-[70%]  ">
              <div className="sticky  pt-[3px]  top-0 ">
                {" "}
                <div className="flex w-full justify-between items-center pb-2 px-4  border-gray-500 border-b-2">
                  <div className="flex items-end gap-2">
                    {" "}
                    <div className="relative">
                      {" "}
                      <img
                        className="h-[50px] w-[50px] rounded-[50%]"
                        src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                        alt=""
                      />
                      <div className="absolute bottom-0 right-0 border bg-blue-500 rounded-[50%] h-[12px] w-[12px]"></div>
                    </div>
                    <div>
                      Shakira <br />
                      <p className="text-[10px] text-gray-500">Active</p>
                    </div>
                  </div>
                  <ul className="flex gap-4">
                    <li>
                      <CallIcon />
                    </li>

                    <li>
                      <FolderOpenIcon />
                    </li>
                    <li>
                      <DeleteOutlineIcon />
                    </li>
                    <li>
                      {" "}
                      <InfoOutlinedIcon />
                    </li>
                    <li>
                      <MoreHorizIcon />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="h-[60vh] no-scrollbar  overflow-hidden overflow-y-scroll">
                <div
                  className="flex gap-4 px-4 py-4
                "
                >
                  <div className="w-[]">
                    {" "}
                    <img
                      className="w-[90px] h-[44px] rounded-[50%]"
                      src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt=""
                    />
                  </div>
                  <div>
                    {" "}
                    <Box className={`${mode === "dark" ? "bg-[#202021]" : ""} p-4 text-sm rounded-lg border border-zinc-500`}>
    <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, tempora. Tempore cupiditate numquam ex consectetur
        facilis cum dolore est! Qui sit omnis dolore? Voluptate, eligendi laboriosam ad modi tenetur impedit!
    </Typography>
</Box>

                
                
                    <div className="text-[12px] text-gray-600 mt-2">9:30PM</div>
                  </div>
                </div>
                <div
                  className="flex gap-4 px-4 py-4
                "
                >
                  <div>
                    {" "}
                    <p className=" p-4 bg-blue-500 text-sm rounded-tl-lg rounded-tr-lg rounded-bl-lg">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veniam, tempora. Tempore cupiditate numquam ex consectetur
                      facilis cum dolore est! Qui sit omnis dolore? Voluptate,
                      eligendi laboriosam ad modi tenetur impedit!
                    </p>
                    <div className="text-[12px] text-gray-600 mt-2 text-end">
                      9:30PM
                    </div>
                  </div>
                  <div className="w-[]">
                    {" "}
                    <img
                      className="w-[90px] h-[44px] rounded-[50%]"
                      src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt=""
                    />
                  </div>
                </div>
                <div
                  className="flex gap-4 px-4 py-4
                "
                >
                  <div className="w-[]">
                    {" "}
                    <img
                      className="w-[90px] h-[44px] rounded-[50%]"
                      src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt=""
                    />
                  </div>
                  <Box className={`${mode === "dark" ? "bg-[#202021]" : ""} p-4 text-sm rounded-lg border border-zinc-500`}>
    <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, tempora. Tempore cupiditate numquam ex consectetur
        facilis cum dolore est! Qui sit omnis dolore? Voluptate, eligendi laboriosam ad modi tenetur impedit!
    </Typography>
</Box>
                </div>
                <div
                  className="flex gap-4 px-4 py-4
                "
                >
                  <div>
                    {" "}
                    <p className=" p-4 bg-blue-500 text-sm rounded-tl-lg rounded-tr-lg rounded-bl-lg">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veniam, tempora. Tempore cupiditate numquam ex consectetur
                      facilis cum dolore est! Qui sit omnis dolore? Voluptate,
                      eligendi laboriosam ad modi tenetur impedit!
                    </p>
                    <div className="text-[12px] text-gray-600 mt-2 text-end">
                      9:30PM
                    </div>
                  </div>
                  <div className="w-[]">
                    {" "}
                    <img
                      className="w-[90px] h-[44px] rounded-[50%]"
                      src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt=""
                    />
                  </div>
                </div>{" "}
                <div
                  className="flex gap-4 px-4 py-4
                "
                >
                  <div className="w-[]">
                    {" "}
                    <img
                      className="w-[90px] h-[44px] rounded-[50%]"
                      src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt=""
                    />
                  </div>
                  <Box className={`${mode === "dark" ? "bg-[#202021]" : ""} p-4 text-sm rounded-lg border border-zinc-500`}>
    <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, tempora. Tempore cupiditate numquam ex consectetur
        facilis cum dolore est! Qui sit omnis dolore? Voluptate, eligendi laboriosam ad modi tenetur impedit!
    </Typography>
</Box>
                </div>
                <div
                  className="flex gap-4 px-4 py-4
                "
                >
                  <div>
                    {" "}
                    <p className=" p-4 bg-blue-500 text-sm rounded-tl-lg rounded-tr-lg rounded-bl-lg">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veniam, tempora. Tempore cupiditate numquam ex consectetur
                      facilis cum dolore est! Qui sit omnis dolore? Voluptate,
                      eligendi laboriosam ad modi tenetur impedit!
                    </p>
                    <div className="text-[12px] text-gray-600 mt-2 text-end">
                      9:30PM
                    </div>
                  </div>
                  <div className="w-[]">
                    {" "}
                    <img
                      className="w-[90px] h-[44px] rounded-[50%]"
                      src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt=""
                    />
                  </div>
                </div>{" "}
                <div
                  className="flex gap-4 px-4 py-4
                "
                >
                  <div className="w-[]">
                    {" "}
                    <img
                      className="w-[90px] h-[44px] rounded-[50%]"
                      src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt=""
                    />
                  </div>
                  <Box className={`${mode === "dark" ? "bg-[#202021]" : ""} p-4 text-sm rounded-lg border border-zinc-500`}>
    <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, tempora. Tempore cupiditate numquam ex consectetur
        facilis cum dolore est! Qui sit omnis dolore? Voluptate, eligendi laboriosam ad modi tenetur impedit!
    </Typography>
</Box>
                </div>
                <div
                  className="flex gap-4 px-4 py-4
                "
                >
                  <div>
                    {" "}
                    <p className=" p-4 bg-blue-500 text-sm rounded-tl-lg rounded-tr-lg rounded-bl-lg">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Veniam, tempora. Tempore cupiditate numquam ex consectetur
                      facilis cum dolore est! Qui sit omnis dolore? Voluptate,
                      eligendi laboriosam ad modi tenetur impedit!
                    </p>
                    <div className="text-[12px] text-gray-600 mt-2 text-end">
                      9:30PM
                    </div>
                  </div>
                  <div className="w-[]">
                    {" "}
                    <img
                      className="w-[90px] h-[44px] rounded-[50%]"
                      src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-1 mt-4 mx-4 border rounded-[8px]">
                <div className="text-[12px] flex w-full mr-4 text-gray-700">
                  <AddCircleIcon
                    sx={{ fontSize: "20px", marginRight: "10px" }}
                  />{" "}
                  <input
                    className="w-full outline-none bg-transparent"
                    placeholder="Type message here"
                  />
                </div>
                <div>
                  <SendIcon
                    sx={{
                      color: "#3b82f6",
                      transform: "rotate(-20deg)",
                      paddingBottom: "6px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Chat;