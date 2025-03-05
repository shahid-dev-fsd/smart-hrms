import { Box, Button, IconButton, Tooltip } from "@mui/material";
import React from "react";

import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTheme } from "../../../style/theme";

const Knowledgepage = () => {
  const { toggleTheme, mode } = useTheme();
  console.log(mode);
  return (
    <div>
      {" "}
      <Box
        sx={{ backgroundColor: "background.main" }}
        className="md:h-[87vh] overflow-y-scroll overflow-hidden  rounded-[12px]  "
      >
        <div className="flex  justify-between  mt-4 px-4 md:px-14">
          <h2 className="text-[22px] text-gray-400 whitespace-nowrap">
            Knowledge Page
          </h2>
          <div>
            <Button sx={{ marginRight: "5px" }} variant="contained">
              Submit Request
            </Button>
            <Tooltip title="info" placement="top">
              <IconButton disableRipple variant="navIcon" sx={{ mr: 0 }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <Box
          sx={{ backgroundColor: "background.view" }}
          className="mt-4 md:h-[73vh] overflow-y-scroll overflow-hidden rounded-[15px] mx-8  py-4 "
        >
          <h1 className="pl-5 border-l-4 py-2 border-l-orange-400 text-[27px]">
            Knowledge
          </h1>

          <div className="mt-8 md:flex justify-between   mx-7">
            <Box      sx={{ backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0" }}
               className={` py-[25px] my-3 px-[40px] rounded-[30px] `}>
              <h3 className=" bold text-[22px]">Recent Articles</h3>
              <p className="h-[3px] rounded w-[85px] bg-orange-400"></p>
              <div>
                <ul className="mt-7 text-xs ">
                  <li className="my-[5px]  flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div className=""> Navigating Remote Work</div>
                  </li>
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div>Mastering Time Management</div>
                  </li>{" "}
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div>Protecting Your Organization's Data</div>
                  </li>{" "}
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div> Best Practises For HR Proffessionals</div>
                  </li>{" "}
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div> Maximizing employee Management</div>
                  </li>{" "}
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div> Understanding Agile Project Management</div>
                  </li>
                </ul>
              </div>
            </Box>{" "}
            <Box 
               sx={{ backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0" }}
               className={` py-[25px] my-3 px-[40px] rounded-[30px] `}
            >
              <h3 className=" bold text-[22px]">Popular Articles</h3>
              <p className="h-[3px] rounded w-[85px] bg-orange-400"></p>
              <div>
                <ul className="mt-7 text-xs ">
                  <li className="my-[5px]  flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div className=""> Navigating Remote Work</div>
                  </li>
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div>Mastering Time Management</div>
                  </li>{" "}
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div>Protecting Your Organization's Data</div>
                  </li>{" "}
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div> Best Practises For HR Proffessionals</div>
                  </li>{" "}
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div> Maximizing employee Management</div>
                  </li>{" "}
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div> Understanding Agile Project Management</div>
                  </li>
                </ul>
              </div>
            </Box>
            <Box
              sx={{ backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0" }}
              className={` py-[25px] my-3 px-[40px] rounded-[30px] `}
            >
              <h3 className=" bold text-[22px]">Most Helpul Articles</h3>
              <p className="h-[3px] rounded w-[85px] bg-orange-400"></p>
              <div>
                <ul className="mt-7 text-xs ">
                  <li className="my-[5px]  flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div className=""> Navigating Remote Work</div>
                  </li>
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div>Mastering Time Management</div>
                  </li>{" "}
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div>Protecting Your Organization's Data</div>
                  </li>{" "}
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div> Best Practises For HR Proffessionals</div>
                  </li>{" "}
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div> Maximizing employee Management</div>
                  </li>{" "}
                  <li className="my-[5px] flex items-center">
                    <div>
                      {" "}
                      <TextSnippetIcon
                        sx={{
                          backgroundColor: "green",
                          padding: "2px",
                          borderRadius: "5px",
                          marginRight: "4px",
                        }}
                      />
                    </div>
                    <div> Understanding Agile Project Management</div>
                  </li>
                </ul>
              </div>
            </Box>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Knowledgepage;
