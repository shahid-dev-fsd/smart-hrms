import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Button,
  TextField,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import view from "../../../ReceivedApp/viewicon.png";
import HomeIcon from "@mui/icons-material/Home";
import { alignProperty } from "@mui/material/styles/cssUtils";
// import { Visibility, VisibilityOff } from '@material-ui/icons';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Profile = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [TitckPage, setTicketePage] = useState("Edit");
  const [tab, setTab] = useState("Edit");
  const [showPassword, setShowPassword] = React.useState(false);

  const ChnagePage = (tic) => {
    setTicketePage(tic);
  };

  const handleTabChange = (tab) => {
    setTicketePage(tab);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  console.log(TitckPage);

  return (
    <Box sx={{ backgroundColor: "background.main" }}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between md:w-full p-4">
          <div className="p-2">
            <h1 className="text-xs md:text-2xl text-neutral-500">
              User Pages <span className=" text-neutral-500">Ticket List</span>
            </h1>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <InfoOutlinedIcon />
          </div>
        </div>
      </div>
      <Box className="md:w-[96%] w-[88%] mr-[20px] md:ml-0 pb-4 rounded-lg ml-[20px] mb-[40px]">
        <div className="flex flex-col md:flex-row gap-8 mt-5">
          <Box
            className="w-full md:w-1/3  p-5 rounded-lg ml-0 md:ml-[20px] "
            sx={{ backgroundColor: "background.view" }}
          >
            <div className="text-center mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuaNLChfhGJgcaJ9outna1kfQ-oHbANj3wg&s"
                alt="User Avatar"
                className="w-20 h-20 rounded-full mx-auto"
              />
              <h1 className="text-blue-500 mt-2 font-weight-500">
                Stephan Grant
              </h1>
              <p className="text-gray-400">QA Tester</p>
            </div>
            <nav className="text-gray-400">
              <ul>
                <li className="py-2 cursor-pointer p-2">
                  <HomeIcon style={{ marginRight: "4px" }} /> Dashboard
                </li>
                <li className="py-3 cursor-pointer p-2">
                  <HomeIcon style={{ marginRight: "4px" }} />
                  Edit Profile
                </li>
                {TitckPage === "ticketList" ? (
                  <li
                    onClick={() => ChnagePage("ticketList")}
                    className="py-3 cursor-pointer bg-blue-500 border-[1px] rounded-md text-white p-2"
                  >
                    <HomeIcon style={{ marginRight: "4px" }} />
                    Ticket Lists
                  </li>
                ) : (
                  <li
                    onClick={() => ChnagePage("ticketList")}
                    className="py-3 cursor-pointer rounded-md p-2"
                  >
                    <HomeIcon style={{ marginRight: "4px" }} />
                    Ticket Lists
                  </li>
                )}
                {TitckPage === "activeTicket" ? (
                  <li
                    onClick={() => ChnagePage("activeTicket")}
                    className="py-3 cursor-pointer bg-blue-500 border-[1px] rounded-md text-white p-2"
                  >
                    <HomeIcon style={{ marginRight: "4px" }} />
                    Active Tickets{" "}
                  </li>
                ) : (
                  <li
                    onClick={() => ChnagePage("activeTicket")}
                    className="py-3 cursor-pointer rounded-md p-2"
                  >
                    <HomeIcon style={{ marginRight: "4px" }} />
                    Active Tickets
                  </li>
                )}
                {TitckPage === "closedTickets" ? (
                  <li
                    onClick={() => ChnagePage("closedTickets")}
                    className="py-3 cursor-pointer bg-blue-500 border-[1px] rounded-md text-white p-2"
                  >
                    <HomeIcon style={{ marginRight: "4px" }} />
                    Closed Tickets
                  </li>
                ) : (
                  <li
                    onClick={() => ChnagePage("closedTickets")}
                    className="py-3 cursor-pointer rounded-md p-2"
                  >
                    <HomeIcon style={{ marginRight: "4px" }} />
                    Closed Tickets
                  </li>
                )}
                <li className="py-3 cursor-pointer p-2">
                  <HomeIcon style={{ marginRight: "4px" }} />
                  Create Tickets
                </li>
                <li className="py-3 cursor-pointer p-2">
                  <HomeIcon style={{ marginRight: "4px" }} />
                  View Tickets
                </li>
              </ul>
            </nav>
          </Box>
          <Box className="w-full md:w-3/4 mt-[-14px">
            <div
              className="flex flex-col  overflow-y-auto"
              style={{
                WebkitOverflowScrolling: "touch",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              <div className="flex items-center flex-row md:flex-row md:w-full p-4 mt-[-14px]">
                {TitckPage === "Edit" ? (
                  <div
                    className="p-2 ml-2"
                    onClick={() => handleTabChange("Edit")}
                    style={{
                      backgroundColor: "rgb(14 165 233)",
                      color: "white",
                      borderTopRightRadius: "5px",
                      borderTopLeftRadius: "5px",
                    }}
                  >
                    <h1 className="text-[14px] md:text-[15px] w-[100px] text-center text-white">
                      Edit Profile
                    </h1>
                  </div>
                ) : (
                  <div
                    className="p-2 ml-2"
                    onClick={() => handleTabChange("Edit")}
                  >
                    <h1 className="text-[14px] md:text-[15px] w-[100px] text-center text-neutral-500">
                      Edit Profile
                    </h1>
                  </div>
                )}
                {TitckPage === "ChangePassword" ? (
                  <div
                    className="p-2 ml-2"
                    onClick={() => handleTabChange("ChangePassword")}
                    style={{
                      backgroundColor: "rgb(14 165 233)",
                      color: "white",
                      borderTopRightRadius: "5px",
                      borderTopLeftRadius: "5px",
                    }}
                  >
                    <h1 className="text-[14px] md:text-[15px] text-white-500">
                      Change Password
                    </h1>
                  </div>
                ) : (
                  <div
                    className="p-2 ml-2"
                    onClick={() => handleTabChange("ChangePassword")}
                  >
                    <h1 className="text-[14px] md:text-[15px] text-neutral-500">
                      Change Password
                    </h1>
                  </div>
                )}
              </div>
            </div>
            <Box
              className="w-full md:w-full ml-[-6px]   rounded-[8px] mt-[-15px] h-[380px] p-4"
              sx={{
                backgroundColor: "background.view",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
                height: "500px",
              }}
            >
              {TitckPage === "Edit" && (
                <form>
                  <Grid container sx={{ position: "relative" }} spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ padding: "10px" }}>
                        First Name
                      </InputLabel>
                      <TextField
                        placeholder="first name"
                        type="password"
                        fullWidth
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ padding: "10px" }}>
                        Last Name
                      </InputLabel>
                      <TextField
                        placeholder="last name"
                        fullWidth
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ padding: "10px" }}>Email </InputLabel>

                      <TextField
                        fullWidth
                        placeholder="email"
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ padding: "10px" }}>
                        Phone Number{" "}
                      </InputLabel>

                      <TextField
                        placeholder="fone number"
                        fullWidth
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel sx={{ padding: "10px" }}>Address </InputLabel>

                      <TextField
                        fullWidth
                        placeholder="address"
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputLabel sx={{ padding: "10px" }}>City </InputLabel>

                      <TextField
                        fullWidth
                        placeholder="city"
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputLabel sx={{ padding: "10px" }}>
                        Post Code{" "}
                      </InputLabel>

                      <TextField
                        fullWidth
                        placeholder="post code"
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputLabel sx={{ padding: "10px" }}>Country </InputLabel>

                      <TextField
                        fullWidth
                        placeholder="country"
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ padding: "10px" }}>
                        FaceBook{" "}
                      </InputLabel>

                      <TextField
                        fullWidth
                        placeholder="facebook"
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ padding: "10px" }}>Twitter </InputLabel>

                      <TextField
                        fullWidth
                        placeholder="twitter"
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ padding: "10px" }}>
                        Instagram{" "}
                      </InputLabel>

                      <TextField
                        fullWidth
                        placeholder="instagram"
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ padding: "10px" }}>
                        LinkedIn{" "}
                      </InputLabel>

                      <TextField
                        fullWidth
                        placeholder="linkedin"
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <InputLabel sx={{ padding: "10px" }}>
                        About me{" "}
                      </InputLabel>

                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        inputProps={{}}
                        placeholder="About me"
                      />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                      <InputLabel sx={{ padding: "10px" }}>
                        Upload Photo{" "}
                      </InputLabel>

                      <TextField
                        fullWidth
                        inputProps={{ style: { height: "7px" } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        className="md:mt-[45px] mt-2"
                        variant="contained"
                        sx={{
                          whiteSpace: "nowrap",
                          padding: "5px 30px",
                          marginTop: "45px",
                        }}
                        color="primary"
                        fullWidth
                        type="submit"
                      >
                        Choose File{" "}
                      </Button>
                    </Grid>
                    <div className="absolute bottom-[-190px] right-0 ">
                      {" "}
                      <div className="flex justify-end w-full mb-5">
                        <div className="flex gap-3 ">
                          <Button
                            variant="contained"
                            sx={{ whiteSpace: "nowrap", padding: "5px 30px" }}
                            color="primary"
                            fullWidth
                            type="submit"
                          >
                            Save Changes
                          </Button>
                          <Button
                            sx={{ padding: "5px 30px" }}
                            variant="outlined"
                            color="error"
                            fullWidth
                            type="submit"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </form>
              )}
              {TitckPage === "ChangePassword" && (
                <form>
                  <Grid
                    container
                    sx={{ position: "relative", border: "none" }}
                    spacing={1}
                  >
                    <Grid item xs={12} sm={12}>
                      <label className="mb-4 pl-4">Old Password</label>

                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="enter old password"
                        // label="Current Password"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          sx: { height: "41px", marginTop: "5px" },

                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <label className="mb-4 pl-4">New Password</label>

                      <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="enter new password"
                        // label="Current Password"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          sx: { height: "41px", marginTop: "5px" },

                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <label className="mb-4 pl-4">Confirm Password</label>
                      <TextField
                        variant="outlined"
                        fullWidth
                        // label="Confirm New Password"
                        placeholder="confirm new password"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          sx: { height: "41px", marginTop: "5px" },

                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <div className="absolute right-0 bottom-[-170px]">
                      {" "}
                      <div className="flex justify-end w-full">
                        <div className="flex gap-3 ">
                          <Button
                            variant="contained"
                            sx={{ whiteSpace: "nowrap", padding: "5px 30px" }}
                            color="primary"
                            fullWidth
                            type="submit"
                          >
                            Save Changes
                          </Button>
                          <Button
                            sx={{ padding: "5px 30px" }}
                            variant="outlined"
                            color="error"
                            fullWidth
                            type="submit"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </form>
              )}
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default Profile;
