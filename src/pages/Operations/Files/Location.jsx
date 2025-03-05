import React, { useState } from "react";
import {
  Button,
  IconButton,
  Modal,
  Grid,
  FormControl,
  MenuItem,
  Autocomplete,
  TextField,
  TextareaAutosize,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Menu,
  RadioGroup,
  FormLabel,
  Radio,
} from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiExport } from "react-icons/ci";
import { MdFormatListBulleted } from "react-icons/md";
import { CiFolderOn } from "react-icons/ci";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Location() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "list",
  });

  const [filterModal, setFilterModal] = useState(false);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const [filterFormValues, setFilterFormValues] = useState({
    fileName: "",
    fileFormat: "",
    folder: "",
    fileAccess: "",
    department: "",
    dateFrom: null,
    dateTo: null,
  });

  const handleFilterFormChange = (name, value) => {
    setFilterFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Values: ", filterFormValues);
    setFilterModal(false);
  };

  const ListView = () => {
    const [addOrganizationFileModal, setAddOrganizationFileModal] =
      useState(false);

    const [shareWith, setShareWith] = useState(
      "shareWithDepartmentAndShareWithLocation"
    );
    const [notifications, setNotifications] = useState("feeds");
    const [acknowledgement, setAcknowledgement] = useState("noDeadline");

    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <div className="w-[30%] flex flex-col gap-6 justify-center items-center text-center">
          <h1>No organization file added</h1>
          <h1>
            Upload important common files such as policies or company handbooks
            that can be shared across the entire organization or for selected
            business entities, locations, departments, etc.
          </h1>
          <Button
            variant="contained"
            onClick={() => {
              setAddOrganizationFileModal(true);
            }}
          >
            Add Organization File
          </Button>
        </div>
        <div>
          <Modal
            open={addOrganizationFileModal}
            onClose={() => {
              setAddOrganizationFileModal(false);
            }}
          >
            <form onSubmit={handleFilterFormSubmit}>
              <Grid
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "background.default",
                  flexDirection: "column",
                }}
                className="w-1/2 h-4/5 overflow-scroll p-4 flex flex-col gap-4 rounded-lg border border-gray-800"
              >
                <div>
                  <h1>Add organization file</h1>
                </div>
                <div>
                  <Button
                    sx={{ width: "100%", height: "50px" }}
                    variant="outlined"
                    component="label"
                  >
                    <h1>
                      Upload Important Organization-Wide Files Such As Policies
                      Or Company Handbooks.
                    </h1>
                    <input type="file" hidden />
                  </Button>
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    variant="outlined"
                    label="File Name"
                    placeholder="File Name"
                    required
                  />
                </div>
                <div>
                  <TextareaAutosize
                    sx={{ width: "100%" }}
                    className="w-full bg-transparent rounded-[0.3rem] border border-gray-400 border-opacity-50 px-3 py-4"
                    placeholder="Description"
                  />
                </div>
                <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                  <FormControl>
                    <FormLabel id="shareWith">Share With</FormLabel>
                    <RadioGroup
                      aria-labelledby="shareWith"
                      defaultValue={shareWith}
                      name="shareWith"
                      sx={{ flexDirection: "row" }}
                      className="flex gap-3"
                      onChange={(event) => {
                        setShareWith(event.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="shareWithDepartmentAndShareWithLocation"
                        control={<Radio />}
                        label="Share With Department And Share With Location"
                      />
                      <FormControlLabel
                        value="shareWithEntireOrganization"
                        control={<Radio />}
                        label="Share With Entire Organization"
                      />
                    </RadioGroup>
                  </FormControl>
                  {shareWith === "shareWithDepartmentAndShareWithLocation" ? (
                    <div className="flex flex-row gap-3">
                      <Autocomplete
                        sx={{ width: "100%" }}
                        multiple
                        options={["HR", "IT", "Management", "Marketing"]}
                        getOptionLabel={(option) => option}
                        disableCloseOnSelect
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Share With Department"
                            placeholder="Share With Department"
                          />
                        )}
                      />
                      <Autocomplete
                        sx={{ width: "100%" }}
                        multiple
                        options={[]}
                        getOptionLabel={(option) => option}
                        disableCloseOnSelect
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Share With Locations"
                            placeholder="Share With Locations"
                          />
                        )}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <Autocomplete
                    sx={{ width: "100%" }}
                    options={["Folder 1", "Folder 2"]}
                    renderInput={(params) => (
                      <TextField {...params} label="Format" />
                    )}
                  />
                </div>
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ minWidth: "100%" }}
                      label="File Expiry Date"
                    />
                  </LocalizationProvider>
                </div>
                <div className="p-3 rounded-lg border border-gray-800">
                  <FormGroup>
                    <FormLabel id="organizationPolicy">
                      <div className="flex flex-col gap-1">
                        <h1 className="text-xl">Organization Policy</h1>
                        <h1>
                          Identify as an important organization-wide policy
                          document. Example: Company guideline
                          document,harassment policy. Policy files will be
                          listed separately in Home {"> "}
                          Organization {"> "} Policies.
                        </h1>
                      </div>
                    </FormLabel>
                    <FormControlLabel
                      aria-labelledby="organizationPolicy"
                      name="organizationPolicy"
                      control={<Checkbox defaultChecked />}
                      label="Mark as organization policy document"
                    />
                  </FormGroup>
                </div>
                <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                  <FormControl>
                    <FormLabel id="acknowledgement">
                      <div className="flex flex-col gap-1">
                        <h1 className="text-xl">Acknowledgement</h1>
                        <h1>
                          When enabled, employees will be required to manually
                          acknowledge reading the sent documents.
                        </h1>
                      </div>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="acknowledgement"
                      defaultValue={acknowledgement}
                      name="acknowledgement"
                      sx={{ flexDirection: "row" }}
                      className="flex gap-3"
                      onChange={(event) => {
                        setAcknowledgement(event.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="noDeadline"
                        control={<Radio />}
                        label="No Deadline"
                      />
                      <FormControlLabel
                        value="enforceMandatoryDeadline"
                        control={<Radio />}
                        label="Enforce Mandatory Deadline"
                      />
                    </RadioGroup>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ minWidth: "100%", margin: "0px" }}
                      label="Enforce Mandatory Deadline"
                    />
                    <h1>
                      Employee will be required to acknowledge the document on
                      or before the last date. On the last date, access to all
                      actions in Clikkle HR will be restricted until
                      acknowledgement is received.
                    </h1>
                  </LocalizationProvider>
                </div>
                <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                  <FormControl>
                    <FormLabel id="filePermissions">
                      <div className="flex flex-col gap-1">
                        <h1 className="text-xl">File Permissions</h1>
                        <h1>Allow employees to download files</h1>
                        <h1>Download Access</h1>
                      </div>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="filePermissions"
                      name="filePermissions"
                    >
                      <FormControlLabel
                        aria-labelledby="filePermissions"
                        name="filePermissions"
                        control={<Checkbox defaultChecked />}
                        label="Employee"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                  <FormControl>
                    <FormLabel id="notifications">
                      <div className="flex flex-col gap-1">
                        <h1 className="text-xl">Notifications</h1>
                        <h1>
                          Notify employees when a new file is added or edited
                        </h1>
                        <h1>Notify through</h1>
                      </div>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="notifications"
                      defaultValue={notifications}
                      name="notifications"
                      sx={{ flexDirection: "row" }}
                      className="flex gap-3"
                      onChange={(event) => {
                        setNotifications(event.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="feeds"
                        control={<Radio />}
                        label="Feeds"
                      />
                      <FormControlLabel
                        value="email"
                        control={<Radio />}
                        label="Email"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                  <div>
                    <Button variant="contained">Save</Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        setAddOrganizationFileModal(false);
                      }}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Grid>
            </form>
          </Modal>
        </div>
      </div>
    );
  };
  const FolderView = () => {
    const [addOrganizationFileModal, setAddOrganizationFileModal] =
      useState(false);

    const [shareWith, setShareWith] = useState(
      "shareWithDepartmentAndShareWithLocation"
    );
    const [notifications, setNotifications] = useState("feeds");
    const [acknowledgement, setAcknowledgement] = useState("noDeadline");

    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <div className="w-[30%] flex flex-col gap-6 justify-center items-center text-center">
          <h1>No organization file added</h1>
          <h1>
            Upload important common files such as policies or company handbooks
            that can be shared across the entire organization or for selected
            business entities, locations, departments, etc.
          </h1>
          <Button
            variant="contained"
            onClick={() => {
              setAddOrganizationFileModal(true);
            }}
          >
            Add Organization File
          </Button>
        </div>
        <div>
          <Modal
            open={addOrganizationFileModal}
            onClose={() => {
              setAddOrganizationFileModal(false);
            }}
          >
            <Grid
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "background.default",
                flexDirection: "column",
              }}
              className="w-1/2 h-4/5 overflow-scroll p-4 flex flex-col gap-4 rounded-lg border border-gray-800"
            >
              <div>
                <h1>Add organization file</h1>
              </div>
              <div>
                <Button
                  sx={{ width: "100%", height: "50px" }}
                  variant="outlined"
                  component="label"
                >
                  <h1>
                    Upload Important Organization-Wide Files Such As Policies Or
                    Company Handbooks.
                  </h1>
                  <input type="file" hidden />
                </Button>
              </div>
              <div>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="File Name"
                  placeholder="File Name"
                  required
                />
              </div>
              <div>
                <TextareaAutosize
                  sx={{ width: "100%" }}
                  className="w-full bg-transparent rounded-[0.3rem] border border-gray-400 border-opacity-50 px-3 py-4"
                  placeholder="Description"
                />
              </div>
              <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                <FormControl>
                  <FormLabel id="shareWith">Share With</FormLabel>
                  <RadioGroup
                    aria-labelledby="shareWith"
                    defaultValue={shareWith}
                    name="shareWith"
                    sx={{ flexDirection: "row" }}
                    className="flex gap-3"
                    onChange={(event) => {
                      setShareWith(event.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="shareWithDepartmentAndShareWithLocation"
                      control={<Radio />}
                      label="Share With Department And Share With Location"
                    />
                    <FormControlLabel
                      value="shareWithEntireOrganization"
                      control={<Radio />}
                      label="Share With Entire Organization"
                    />
                  </RadioGroup>
                </FormControl>
                {shareWith === "shareWithDepartmentAndShareWithLocation" ? (
                  <div className="flex flex-row gap-3">
                    <Autocomplete
                      sx={{ width: "100%" }}
                      multiple
                      options={["HR", "IT", "Management", "Marketing"]}
                      getOptionLabel={(option) => option}
                      disableCloseOnSelect
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Share With Department"
                          placeholder="Share With Department"
                        />
                      )}
                    />
                    <Autocomplete
                      sx={{ width: "100%" }}
                      multiple
                      options={[]}
                      getOptionLabel={(option) => option}
                      disableCloseOnSelect
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Share With Locations"
                          placeholder="Share With Locations"
                        />
                      )}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={["Folder 1", "Folder 2"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Format" />
                  )}
                />
              </div>
              <div className="w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ minWidth: "100%" }}
                    label="File Expiry Date"
                  />
                </LocalizationProvider>
              </div>
              <div className="p-3 rounded-lg border border-gray-800">
                <FormGroup>
                  <FormLabel id="organizationPolicy">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl">Organization Policy</h1>
                      <h1>
                        Identify as an important organization-wide policy
                        document. Example: Company guideline document,harassment
                        policy. Policy files will be listed separately in Home{" "}
                        {"> "}
                        Organization {"> "} Policies.
                      </h1>
                    </div>
                  </FormLabel>
                  <FormControlLabel
                    aria-labelledby="organizationPolicy"
                    name="organizationPolicy"
                    control={<Checkbox defaultChecked />}
                    label="Mark as organization policy document"
                  />
                </FormGroup>
              </div>
              <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                <FormControl>
                  <FormLabel id="acknowledgement">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl">Acknowledgement</h1>
                      <h1>
                        When enabled, employees will be required to manually
                        acknowledge reading the sent documents.
                      </h1>
                    </div>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="acknowledgement"
                    defaultValue={acknowledgement}
                    name="acknowledgement"
                    sx={{ flexDirection: "row" }}
                    className="flex gap-3"
                    onChange={(event) => {
                      setAcknowledgement(event.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="noDeadline"
                      control={<Radio />}
                      label="No Deadline"
                    />
                    <FormControlLabel
                      value="enforceMandatoryDeadline"
                      control={<Radio />}
                      label="Enforce Mandatory Deadline"
                    />
                  </RadioGroup>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ minWidth: "100%", margin: "0px" }}
                    label="Enforce Mandatory Deadline"
                  />
                  <h1>
                    Employee will be required to acknowledge the document on or
                    before the last date. On the last date, access to all
                    actions in Clikkle HR will be restricted until
                    acknowledgement is received.
                  </h1>
                </LocalizationProvider>
              </div>
              <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                <FormControl>
                  <FormLabel id="filePermissions">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl">File Permissions</h1>
                      <h1>Allow employees to download files</h1>
                      <h1>Download Access</h1>
                    </div>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="filePermissions"
                    name="filePermissions"
                  >
                    <FormControlLabel
                      aria-labelledby="filePermissions"
                      name="filePermissions"
                      control={<Checkbox defaultChecked />}
                      label="Employee"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                <FormControl>
                  <FormLabel id="notifications">
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl">Notifications</h1>
                      <h1>
                        Notify employees when a new file is added or edited
                      </h1>
                      <h1>Notify through</h1>
                    </div>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="notifications"
                    defaultValue={notifications}
                    name="notifications"
                    sx={{ flexDirection: "row" }}
                    className="flex gap-3"
                    onChange={(event) => {
                      setNotifications(event.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="feeds"
                      control={<Radio />}
                      label="Feeds"
                    />
                    <FormControlLabel
                      value="email"
                      control={<Radio />}
                      label="Email"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <div>
                  <Button variant="contained">Save</Button>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      setAddOrganizationFileModal(false);
                    }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Grid>
          </Modal>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-fit flex flex-col">
      <div className="w-full flex gap-3 justify-end items-center">
        <Button
          title="List"
          variant={switchScreen.primary === "list" ? "contained" : "outlined"}
          onClick={() => {
            setSwitchScreen({ primary: "list" });
          }}
        >
          <MdFormatListBulleted className="text-2xl" />
        </Button>
        <Button
          title="Folder"
          variant={switchScreen.primary === "folder" ? "contained" : "outlined"}
          onClick={() => {
            setSwitchScreen({ primary: "folder" });
          }}
        >
          <CiFolderOn className="text-2xl" />
        </Button>
        <IconButton
          onClick={() => {
            setFilterModal(true);
          }}
        >
          <IoFilter />
        </IconButton>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={isMenuopen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuopen ? "true" : undefined}
            onClick={(event) => {
              setMenuAnchor(event.currentTarget);
            }}
          >
            <HiDotsHorizontal className="text-2xl" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={menuAnchor}
            open={isMenuopen}
            onClose={() => {
              setMenuAnchor(null);
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>
              <div className="flex flex-row gap-3 justify-between items-center">
                <CiExport className="text-2xl" />
                <h1>Export</h1>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>
      {switchScreen.primary === "list" ? (
        <>
          <ListView />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "folder" ? (
        <>
          <FolderView />
        </>
      ) : (
        <></>
      )}
      <div>
        <Modal
          open={filterModal}
          onClose={() => setFilterModal(false)}
          aria-labelledby="filterModal"
          aria-describedby="filterModal"
        >
          <form onSubmit={handleFilterFormSubmit}>
            <Grid
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "background.default",
                flexDirection: "column",
              }}
              className="w-1/2 p-4 flex flex-col gap-4 rounded-lg border border-gray-800"
            >
              <div>
                <h1>Filter</h1>
              </div>
              <div>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="File Name"
                  placeholder="File Name"
                  value={filterFormValues.fileName}
                  onChange={(e) =>
                    handleFilterFormChange("fileName", e.target.value)
                  }
                />
              </div>
              <div>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={[
                    "All",
                    "Documents",
                    "Spreadsheets",
                    "Presentations",
                    "PDF",
                    "Images",
                    "Audio",
                    "Video",
                  ]}
                  value={filterFormValues.fileFormat}
                  onChange={(e, value) =>
                    handleFilterFormChange("fileFormat", value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="File Format" />
                  )}
                />
              </div>
              <div>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={["Folder 1", "Folder 2"]}
                  value={filterFormValues.folder}
                  onChange={(e, value) =>
                    handleFilterFormChange("folder", value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Folder" />
                  )}
                />
              </div>
              <div>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={["Active Files", "Expired Files"]}
                  value={filterFormValues.fileAccess}
                  onChange={(e, value) =>
                    handleFilterFormChange("fileAccess", value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="File Access" />
                  )}
                />
              </div>
              <div>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={["All", "HR", "IT", "Management", "Marketing"]}
                  value={filterFormValues.department}
                  onChange={(e, value) =>
                    handleFilterFormChange("department", value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Department" />
                  )}
                />
              </div>
              <div className="flex flex-row gap-4">
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ minWidth: "100%" }}
                      label="From"
                      value={filterFormValues.dateFrom}
                      onChange={(date) =>
                        handleFilterFormChange(
                          "dateFrom",
                          date.$D + "/" + date.$M + "/" + date.$y
                        )
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <div className="w-full">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ minWidth: "100%" }}
                      label="To"
                      value={filterFormValues.dateTo}
                      onChange={(date) =>
                        handleFilterFormChange(
                          "dateTo",
                          date.$D + "/" + date.$M + "/" + date.$y
                        )
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <Button type="submit" variant="contained">
                  Apply
                </Button>
                <Button
                  onClick={() => setFilterModal(false)}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </div>
            </Grid>
          </form>
        </Modal>
      </div>
    </div>
  );
}
