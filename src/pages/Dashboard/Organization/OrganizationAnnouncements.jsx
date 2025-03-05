import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Modal,
  TextField,
  TextareaAutosize,
  Autocomplete,
  Checkbox,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
  InputAdornment,
  IconButton,
  FormHelperText,
  Menu,
} from "@mui/material";
import { BiLike } from "react-icons/bi";
import { LiaCommentDots } from "react-icons/lia";
import { LuSearch } from "react-icons/lu";
import { IoFilterSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function OrganizationAnnouncements() {
  const [openAddAnnouncement, setOpenAddAnnouncement] = useState(false);
  const [openViewAnnouncement, setOpenViewAnnouncement] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openOptionsMenu = Boolean(anchorEl);

  const [commentAnchor, setCommentAnchor] = useState(null);
  const openCommentMenu = Boolean(commentAnchor);

  const names = ["Hello"];

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-between items-center">
      <div className="w-full flex flex-row gap-3 justify-end items-center">
        {isSearch === true ? (
          <>
            <div className="w-full">
              <FormControl className="w-full" variant="outlined">
                <OutlinedInput
                  placeholder="Search Announcements"
                  className="w-full"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setIsSearch(false);
                        }}
                      >
                        <RxCross2 />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                setOpenAddAnnouncement(true);
              }}
              variant="contained"
            >
              Add Announcement
            </Button>
            <Button
              onClick={() => {
                setIsSearch(true);
              }}
            >
              <LuSearch className="text-2xl" />
            </Button>
            <Button
              onClick={() => {
                setOpenFilter(true);
              }}
            >
              <IoFilterSharp className="text-2xl" />
            </Button>
          </>
        )}
      </div>
      <button
        onClick={() => {
          setOpenViewAnnouncement(true);
        }}
        className="w-full flex flex-row p-3 justify-between items-center rounded-lg border border-gray-800"
      >
        <div className="flex gap-3 flex-row justify-center items-center">
          <div>
            <Avatar />
          </div>
          <div className="text-start">
            <h1>Hello</h1>
            <div className="flex flex-row gap-2 justify-center items-center text-sm text-gray-400">
              <h1>Steward graham</h1>
              <div className="h-1 w-1 rounded-full p-[1px ] bg-slate-400" />
              <h1>Today 1:13 AM</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="flex flex-row gap-1 justify-center items-center">
            <h1>0</h1>
            <BiLike className="text-2xl" />
          </div>
          <div className="flex flex-row gap-1 justify-center items-center">
            <h1>0</h1>
            <LiaCommentDots className="text-2xl" />
          </div>
        </div>
      </button>

      <Modal
        open={openViewAnnouncement}
        onClose={() => {
          setOpenViewAnnouncement(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            p: 4,
            width: 800,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
          }}
          className="flex flex-col gap-6 rounded-lg border border-gray-800"
        >
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex gap-3 flex-row justify-center items-center">
              <div>
                <Avatar />
              </div>
              <div className="text-start">
                <h1>Hello</h1>
                <div className="flex flex-row gap-2 justify-center items-center text-sm text-gray-400">
                  <h1>Steward graham</h1>
                  <div className="h-1 w-1 rounded-full p-[1px ] bg-slate-400" />
                  <h1>Today 1:13 AM</h1>
                </div>
              </div>
            </div>
            <div>
              <IconButton
                id="options"
                aria-controls={openOptionsMenu ? "optionsMenu" : undefined}
                aria-haspopup="true"
                aria-expanded={openOptionsMenu ? "true" : undefined}
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
              >
                <BsThreeDots />
              </IconButton>
              <Menu
                id="optionsMenu"
                anchorEl={anchorEl}
                open={openOptionsMenu}
                onClose={() => {
                  setAnchorEl(null);
                }}
                MenuListProps={{
                  "aria-labelledby": "options",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                  }}
                >
                  <div className="flex flex-row justify-center items-center gap-4">
                    <MdEdit className="text-xl" />
                    <h1>Edit</h1>
                  </div>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                  }}
                >
                  <div className="flex flex-row justify-center items-center gap-4">
                    <MdDeleteOutline className="text-xl" />
                    <h1>Delete</h1>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className="w-full flex flex-col gap-6 justify-between items-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-xl">Hello</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi tempore sapiente et corrupti, vitae necessitatibus
                suscipit. Nam, facere veniam. Aspernatur harum maiores animi
                exercitationem quibusdam blanditiis aliquid omnis, eveniet
                voluptatem!
              </p>
            </div>
            <div className="w-full flex flex-row gap-3 justify-start items-center">
              <div className="flex flex-row gap-1 justify-center items-center">
                <h1>0</h1>
                <BiLike className="text-2xl" />
              </div>
              <div className="flex flex-row gap-1 justify-center items-center">
                <h1>0</h1>
                <LiaCommentDots className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row gap-3 justify-center items-center">
            <Avatar />
            <TextField
              className="w-full"
              label="Write Your Comment"
              variant="outlined"
            />
          </div>
          <div className="w-full flex flex-row gap-3 justify-between items-center">
            <div className="flex gap-3 flex-row justify-center items-center">
              <div>
                <Avatar />
              </div>
              <div className="text-start">
                <h1>Good Morning</h1>
                <div className="flex flex-row gap-2 justify-center items-center text-sm text-gray-400">
                  <h1>Steward graham</h1>
                  <div className="h-1 w-1 rounded-full p-[1px ] bg-slate-400" />
                  <h1>Today 1:13 AM</h1>
                </div>
              </div>
            </div>
            <div>
              <IconButton
                id="comments"
                aria-controls={openCommentMenu ? "commentMenu" : undefined}
                aria-haspopup="true"
                aria-expanded={openCommentMenu ? "true" : undefined}
                onClick={(event) => {
                  setCommentAnchor(event.currentTarget);
                }}
              >
                <BsThreeDots />
              </IconButton>
              <Menu
                anchorEl={commentAnchor}
                open={openCommentMenu}
                onClose={() => {
                  setCommentAnchor(null);
                }}
                MenuListProps={{
                  "aria-labelledby": "comments",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setCommentAnchor(null);
                  }}
                >
                  <div className="flex flex-row justify-center items-center gap-4">
                    <MdEdit className="text-xl" />
                    <h1>Edit</h1>
                  </div>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    setCommentAnchor(null);
                  }}
                >
                  <div className="flex flex-row justify-center items-center gap-4">
                    <MdDeleteOutline className="text-xl" />
                    <h1>Delete</h1>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <IconButton
              onClick={() => {
                setOpenViewAnnouncement(false);
              }}
              variant="outlined"
            >
              <RxCross2 />
            </IconButton>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openAddAnnouncement}
        onClose={() => {
          setOpenAddAnnouncement(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            p: 4,
            width: 800,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
          }}
          className="flex flex-col gap-4 rounded-lg border border-gray-800"
        >
          <div>
            <h1>Announcement</h1>
          </div>
          <div className="flex flex-col justify-between items-center">
            <TextField label="Enter Title" variant="outlined" fullWidth />
            <TextareaAutosize
              className="w-full p-3 bg-transparent rounded-md border border-white border-opacity-25"
              placeholder="Enter Message"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1>Publish Settings</h1>
            </div>
            <div className="flex flex-col gap-3">
              <Autocomplete
                disablePortal
                options={["All"]}
                renderInput={(params) => (
                  <TextField {...params} label="Categories" />
                )}
              />
              <Autocomplete
                disablePortal
                options={["All"]}
                renderInput={(params) => (
                  <TextField {...params} label="Location" />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker className="w-full" label="Expiry" />
                </DemoContainer>
              </LocalizationProvider>
              <div className="flex flex-row gap-3 justify-start items-center">
                <Checkbox />
                <InputLabel>Disable Comments</InputLabel>
              </div>
              <div className="flex flex-row gap-3 justify-start items-center">
                <Checkbox />
                <InputLabel>Pin announcement</InputLabel>
              </div>
              <div className="flex flex-row gap-3 justify-start items-center">
                <Checkbox />
                <InputLabel>Notify All Employees</InputLabel>
              </div>
              <FormControl sx={{ m: 1, width: 500 }}>
                <InputLabel>Notify Any Other Employees</InputLabel>
                <Select
                  multiple
                  value={selectedNames}
                  onChange={(e) => setSelectedNames(e.target.value)}
                  input={<OutlinedInput label="Notify Any Other Employees" />}
                  renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap">
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          onDelete={() =>
                            setSelectedNames(
                              selectedNames.filter((item) => item !== value)
                            )
                          }
                          deleteIcon={
                            <CancelIcon
                              onMouseDown={(event) => event.stopPropagation()}
                            />
                          }
                        />
                      ))}
                    </Stack>
                  )}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      sx={{ justifyContent: "space-between" }}
                    >
                      {name}
                      {selectedNames.includes(name) ? (
                        <CheckIcon color="info" />
                      ) : null}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Button
              onClick={() => {
                setOpenAddAnnouncement(false);
              }}
              variant="contained"
              color="primary"
            >
              Publish
            </Button>
            <Button
              onClick={() => {
                setOpenAddAnnouncement(false);
              }}
              variant="outlined"
              color="error"
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openFilter}
        onClose={() => {
          setOpenFilter(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            p: 4,
            width: 800,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
          }}
          className="flex flex-col gap-4 rounded-lg border border-gray-800"
        >
          <div>
            <h1>Filter</h1>
          </div>
          <div className="flex flex-col gap-3">
            <Autocomplete
              disablePortal
              options={["All"]}
              renderInput={(params) => (
                <TextField {...params} label="Categories" />
              )}
            />
            <Autocomplete
              disablePortal
              options={["All"]}
              renderInput={(params) => (
                <TextField {...params} label="Location" />
              )}
            />
            <Autocomplete
              disablePortal
              options={["All"]}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </div>
          <div>
            <h1>Type</h1>
          </div>
          <div className="flex flex-row gap-3 justify-start items-center">
            <Checkbox />
            <InputLabel>Pin announcement</InputLabel>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Button
              onClick={() => {
                setOpenFilter(false);
              }}
              variant="contained"
              color="primary"
            >
              Apply
            </Button>
            <Button
              onClick={() => {
                setOpenFilter(false);
              }}
              variant="outlined"
              color="error"
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
