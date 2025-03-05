import React, { useRef, useState } from "react";
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
  Checkbox,
  Menu,
  RadioGroup,
  FormLabel,
  Radio,
} from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import { MdFormatListBulleted } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { CiFolderOn } from "react-icons/ci";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function EmployeeFiles() {
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
    const [addEmployeeFileModal, setAddEmployeeFileModal] = useState(false);

    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [description, setDescription] = useState("");
    const [folder, setFolder] = useState("");
    const [fileAccess, setFileAccess] = useState("activeEmployee");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [acknowledgement, setAcknowledgement] = useState("noDeadline");
    const [deadline, setDeadline] = useState(null);
    const [filePermissions, setFilePermissions] = useState({
      viewAccess: { employee: true, manager: true },
      downloadAccess: { employee: true, manager: true },
    });
    const [notifications, setNotifications] = useState({
      feeds: true,
      email: true,
    });

    const handleFormSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();

      if (fileInputRef.current?.files[0]) {
        formData.append("file", fileInputRef.current.files[0]);
      }
      formData.append("fileName", fileName);
      formData.append("description", description);
      formData.append("folder", folder);
      formData.append("fileAccess", fileAccess);
      formData.append("selectedEmployee", selectedEmployee || "");
      formData.append("selectedRoles", JSON.stringify(selectedRoles));
      formData.append("acknowledgement", acknowledgement);
      formData.append("deadline", deadline ? deadline.toISOString() : "");
      formData.append("filePermissions", JSON.stringify(filePermissions));
      formData.append("notifications", JSON.stringify(notifications));

      // fetch('/upload', { method: 'POST', body: formData })

      for (var pair of formData.entries()) {
        console.log(pair[0] + " :- " + pair[1]);
      }
      setAddEmployeeFileModal(false);
    };

    const handleFileChange = () => {
      const file = fileInputRef.current?.files[0];
      if (file) {
        setUploadedFile(file);
      }
    };

    const handleDeleteFile = () => {
      setUploadedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <div className="w-[30%] flex flex-col gap-6 justify-center items-center text-center">
          <h1>No employee file added</h1>
          <h1>
            Upload confidential documents pertaining to specific employees or
            important documents to share across employees of a specific role.
          </h1>
          <Button
            variant="contained"
            onClick={() => {
              setAddEmployeeFileModal(true);
            }}
          >
            Add Employee File
          </Button>
        </div>
        <Modal
          open={addEmployeeFileModal}
          onClose={() => {
            setAddEmployeeFileModal(false);
          }}
        >
          <form onSubmit={handleFormSubmit}>
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
                <h1>Add Employee File</h1>
              </div>
              <div>
                {uploadedFile ? (
                  <div className="flex p-3 border border-gray-800 rounded-lg items-center justify-between">
                    <span>{uploadedFile.name}</span>
                    <IconButton variant="outlined" onClick={handleDeleteFile}>
                      <MdDeleteOutline />
                    </IconButton>
                  </div>
                ) : (
                  <Button
                    sx={{ width: "100%", height: "50px" }}
                    variant="outlined"
                    component="label"
                    className="text-center"
                  >
                    <h1>
                      Upload employee-specific files and files with sensitive
                      information such as payslips, IT statements.
                    </h1>
                    <input
                      type="file"
                      hidden
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </Button>
                )}
              </div>
              <div>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="File Name"
                  placeholder="File Name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg border border-gray-800">
                <FormControl className="flex flex-col gap-6">
                  <FormLabel>
                    <div className="text-xl">
                      <h1>File Access</h1>
                    </div>
                  </FormLabel>
                  <RadioGroup
                    value={fileAccess}
                    name="fileAccess"
                    sx={{ flexDirection: "row" }}
                    className="flex gap-3"
                    onChange={(event) => {
                      setFileAccess(event.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="activeEmployee"
                      control={<Radio />}
                      label="Active Employee"
                    />
                    <FormControlLabel
                      value="role"
                      control={<Radio />}
                      label="Role"
                    />
                  </RadioGroup>
                </FormControl>
                {fileAccess === "activeEmployee" && (
                  <Autocomplete
                    sx={{ width: "100%" }}
                    options={["Employee 1", "Employee 2"]}
                    value={selectedEmployee}
                    onChange={(event, newValue) =>
                      setSelectedEmployee(newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Employee"
                        placeholder="Employee"
                        required
                      />
                    )}
                  />
                )}
                {fileAccess === "role" && (
                  <Autocomplete
                    sx={{ width: "100%" }}
                    multiple
                    options={[
                      "Admin",
                      "Manager",
                      "Director",
                      "Team Incharge",
                      "Team Member",
                    ]}
                    value={selectedRoles}
                    onChange={(event, newValue) => setSelectedRoles(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Role"
                        placeholder="Role"
                      />
                    )}
                  />
                )}
              </div>
              <div>
                <TextareaAutosize
                  sx={{ width: "100%" }}
                  className="w-full bg-transparent rounded-[0.3rem] border border-gray-400 border-opacity-50 px-3 py-4"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={["Folder 1", "Folder 2"]}
                  value={folder}
                  onChange={(event, newValue) => setFolder(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Folder" />
                  )}
                />
              </div>
              <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                <FormControl className="flex flex-col gap-6">
                  <FormLabel>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl">Acknowledgement</h1>
                      <h1>
                        When enabled, employees will be required to manually
                        acknowledge reading the sent documents.
                      </h1>
                    </div>
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    <RadioGroup
                      value={acknowledgement}
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
                    {acknowledgement === "enforceMandatoryDeadline" && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ minWidth: "100%", margin: "0px" }}
                          label="Enforce Mandatory Deadline"
                          value={deadline}
                          onChange={(newValue) => setDeadline(newValue)}
                        />
                        <h1 className="text-sm">
                          Employee will be required to acknowledge the document
                          on or before the last date. On the last date, access
                          to all actions in Clikkle HR will be restricted until
                          acknowledgement is received.
                        </h1>
                      </LocalizationProvider>
                    )}
                  </div>
                </FormControl>
              </div>
              <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                <FormControl className="flex gap-6">
                  <FormLabel>
                    <h1 className="text-xl">File Permissions</h1>
                  </FormLabel>
                  <div>
                    <FormLabel>
                      <h1>View Access</h1>
                    </FormLabel>
                    <RadioGroup
                      name="filePermissionsView"
                      className="flex"
                      sx={{ flexDirection: "row" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filePermissions.viewAccess.employee}
                            onChange={(e) =>
                              setFilePermissions((prev) => ({
                                ...prev,
                                viewAccess: {
                                  ...prev.viewAccess,
                                  employee: e.target.checked,
                                },
                              }))
                            }
                          />
                        }
                        label="Employee"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filePermissions.viewAccess.manager}
                            onChange={(e) =>
                              setFilePermissions((prev) => ({
                                ...prev,
                                viewAccess: {
                                  ...prev.viewAccess,
                                  manager: e.target.checked,
                                },
                              }))
                            }
                          />
                        }
                        label="Reporting Manager"
                      />
                    </RadioGroup>
                  </div>
                  <div>
                    <FormLabel>
                      <h1>Download Access</h1>
                    </FormLabel>
                    <RadioGroup
                      name="filePermissionsDownload"
                      className="flex"
                      sx={{ flexDirection: "row" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filePermissions.downloadAccess.employee}
                            onChange={(e) =>
                              setFilePermissions((prev) => ({
                                ...prev,
                                downloadAccess: {
                                  ...prev.downloadAccess,
                                  employee: e.target.checked,
                                },
                              }))
                            }
                          />
                        }
                        label="Employee"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filePermissions.downloadAccess.manager}
                            onChange={(e) =>
                              setFilePermissions((prev) => ({
                                ...prev,
                                downloadAccess: {
                                  ...prev.downloadAccess,
                                  manager: e.target.checked,
                                },
                              }))
                            }
                          />
                        }
                        label="Reporting Manager"
                      />
                    </RadioGroup>
                  </div>
                </FormControl>
              </div>
              <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                <FormControl className="flex gap-6">
                  <FormLabel>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl">Notifications</h1>
                      <h1>
                        Notify employees when a new file is added or edited
                      </h1>
                    </div>
                  </FormLabel>
                  <div>
                    <FormLabel>
                      <h1>Notify through</h1>
                    </FormLabel>
                    <RadioGroup
                      name="notifications"
                      className="flex"
                      sx={{ flexDirection: "row" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={notifications.feeds}
                            onChange={(e) =>
                              setNotifications((prev) => ({
                                ...prev,
                                feeds: e.target.checked,
                              }))
                            }
                          />
                        }
                        label="Feeds"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={notifications.email}
                            onChange={(e) =>
                              setNotifications((prev) => ({
                                ...prev,
                                email: e.target.checked,
                              }))
                            }
                          />
                        }
                        label="Email"
                      />
                    </RadioGroup>
                  </div>
                </FormControl>
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <div>
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      setAddEmployeeFileModal(false);
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
    );
  };

  const FolderView = () => {
    const [addEmployeeFileModal, setAddEmployeeFileModal] = useState(false);

    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [description, setDescription] = useState("");
    const [folder, setFolder] = useState("");
    const [fileAccess, setFileAccess] = useState("activeEmployee");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [acknowledgement, setAcknowledgement] = useState("noDeadline");
    const [deadline, setDeadline] = useState(null);
    const [filePermissions, setFilePermissions] = useState({
      viewAccess: { employee: true, manager: true },
      downloadAccess: { employee: true, manager: true },
    });
    const [notifications, setNotifications] = useState({
      feeds: true,
      email: true,
    });

    const handleFormSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();

      if (fileInputRef.current?.files[0]) {
        formData.append("file", fileInputRef.current.files[0]);
      }
      formData.append("fileName", fileName);
      formData.append("description", description);
      formData.append("folder", folder);
      formData.append("fileAccess", fileAccess);
      formData.append("selectedEmployee", selectedEmployee || "");
      formData.append("selectedRoles", JSON.stringify(selectedRoles));
      formData.append("acknowledgement", acknowledgement);
      formData.append("deadline", deadline ? deadline.toISOString() : "");
      formData.append("filePermissions", JSON.stringify(filePermissions));
      formData.append("notifications", JSON.stringify(notifications));

      // fetch('/upload', { method: 'POST', body: formData })

      for (var pair of formData.entries()) {
        console.log(pair[0] + " :- " + pair[1]);
      }
      setAddEmployeeFileModal(false);
    };

    const handleFileChange = () => {
      const file = fileInputRef.current?.files[0];
      if (file) {
        setUploadedFile(file);
      }
    };

    const handleDeleteFile = () => {
      setUploadedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <div className="w-[30%] flex flex-col gap-6 justify-center items-center text-center">
          <h1>No employee file added</h1>
          <h1>
            Upload confidential documents pertaining to specific employees or
            important documents to share across employees of a specific role.
          </h1>
          <Button
            variant="contained"
            onClick={() => {
              setAddEmployeeFileModal(true);
            }}
          >
            Add Employee File
          </Button>
        </div>
        <Modal
          open={addEmployeeFileModal}
          onClose={() => {
            setAddEmployeeFileModal(false);
          }}
        >
          <form onSubmit={handleFormSubmit}>
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
                <h1>Add Employee File</h1>
              </div>
              <div>
                {uploadedFile ? (
                  <div className="flex p-3 border border-gray-800 rounded-lg items-center justify-between">
                    <span>{uploadedFile.name}</span>
                    <IconButton variant="outlined" onClick={handleDeleteFile}>
                      <MdDeleteOutline />
                    </IconButton>
                  </div>
                ) : (
                  <Button
                    sx={{ width: "100%", height: "50px" }}
                    variant="outlined"
                    component="label"
                    className="text-center"
                  >
                    <h1>
                      Upload employee-specific files and files with sensitive
                      information such as payslips, IT statements.
                    </h1>
                    <input
                      type="file"
                      hidden
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </Button>
                )}
              </div>
              <div>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="File Name"
                  placeholder="File Name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 p-3 rounded-lg border border-gray-800">
                <FormControl className="flex flex-col gap-6">
                  <FormLabel>
                    <div className="text-xl">
                      <h1>File Access</h1>
                    </div>
                  </FormLabel>
                  <RadioGroup
                    value={fileAccess}
                    name="fileAccess"
                    sx={{ flexDirection: "row" }}
                    className="flex gap-3"
                    onChange={(event) => {
                      setFileAccess(event.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="activeEmployee"
                      control={<Radio />}
                      label="Active Employee"
                    />
                    <FormControlLabel
                      value="role"
                      control={<Radio />}
                      label="Role"
                    />
                  </RadioGroup>
                </FormControl>
                {fileAccess === "activeEmployee" && (
                  <Autocomplete
                    sx={{ width: "100%" }}
                    options={["Employee 1", "Employee 2"]}
                    value={selectedEmployee}
                    onChange={(event, newValue) =>
                      setSelectedEmployee(newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Employee"
                        placeholder="Employee"
                        required
                      />
                    )}
                  />
                )}
                {fileAccess === "role" && (
                  <Autocomplete
                    sx={{ width: "100%" }}
                    multiple
                    options={[
                      "Admin",
                      "Manager",
                      "Director",
                      "Team Incharge",
                      "Team Member",
                    ]}
                    value={selectedRoles}
                    onChange={(event, newValue) => setSelectedRoles(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Role"
                        placeholder="Role"
                      />
                    )}
                  />
                )}
              </div>
              <div>
                <TextareaAutosize
                  sx={{ width: "100%" }}
                  className="w-full bg-transparent rounded-[0.3rem] border border-gray-400 border-opacity-50 px-3 py-4"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={["Folder 1", "Folder 2"]}
                  value={folder}
                  onChange={(event, newValue) => setFolder(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Folder" />
                  )}
                />
              </div>
              <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                <FormControl className="flex flex-col gap-6">
                  <FormLabel>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl">Acknowledgement</h1>
                      <h1>
                        When enabled, employees will be required to manually
                        acknowledge reading the sent documents.
                      </h1>
                    </div>
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    <RadioGroup
                      value={acknowledgement}
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
                    {acknowledgement === "enforceMandatoryDeadline" && (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ minWidth: "100%", margin: "0px" }}
                          label="Enforce Mandatory Deadline"
                          value={deadline}
                          onChange={(newValue) => setDeadline(newValue)}
                        />
                        <h1 className="text-sm">
                          Employee will be required to acknowledge the document
                          on or before the last date. On the last date, access
                          to all actions in Clikkle HR will be restricted until
                          acknowledgement is received.
                        </h1>
                      </LocalizationProvider>
                    )}
                  </div>
                </FormControl>
              </div>
              <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                <FormControl className="flex gap-6">
                  <FormLabel>
                    <h1 className="text-xl">File Permissions</h1>
                  </FormLabel>
                  <div>
                    <FormLabel>
                      <h1>View Access</h1>
                    </FormLabel>
                    <RadioGroup
                      name="filePermissionsView"
                      className="flex"
                      sx={{ flexDirection: "row" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filePermissions.viewAccess.employee}
                            onChange={(e) =>
                              setFilePermissions((prev) => ({
                                ...prev,
                                viewAccess: {
                                  ...prev.viewAccess,
                                  employee: e.target.checked,
                                },
                              }))
                            }
                          />
                        }
                        label="Employee"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filePermissions.viewAccess.manager}
                            onChange={(e) =>
                              setFilePermissions((prev) => ({
                                ...prev,
                                viewAccess: {
                                  ...prev.viewAccess,
                                  manager: e.target.checked,
                                },
                              }))
                            }
                          />
                        }
                        label="Reporting Manager"
                      />
                    </RadioGroup>
                  </div>
                  <div>
                    <FormLabel>
                      <h1>Download Access</h1>
                    </FormLabel>
                    <RadioGroup
                      name="filePermissionsDownload"
                      className="flex"
                      sx={{ flexDirection: "row" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filePermissions.downloadAccess.employee}
                            onChange={(e) =>
                              setFilePermissions((prev) => ({
                                ...prev,
                                downloadAccess: {
                                  ...prev.downloadAccess,
                                  employee: e.target.checked,
                                },
                              }))
                            }
                          />
                        }
                        label="Employee"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={filePermissions.downloadAccess.manager}
                            onChange={(e) =>
                              setFilePermissions((prev) => ({
                                ...prev,
                                downloadAccess: {
                                  ...prev.downloadAccess,
                                  manager: e.target.checked,
                                },
                              }))
                            }
                          />
                        }
                        label="Reporting Manager"
                      />
                    </RadioGroup>
                  </div>
                </FormControl>
              </div>
              <div className="flex flex-col gap-3 p-3 rounded-lg border border-gray-800">
                <FormControl className="flex gap-6">
                  <FormLabel>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-xl">Notifications</h1>
                      <h1>
                        Notify employees when a new file is added or edited
                      </h1>
                    </div>
                  </FormLabel>
                  <div>
                    <FormLabel>
                      <h1>Notify through</h1>
                    </FormLabel>
                    <RadioGroup
                      name="notifications"
                      className="flex"
                      sx={{ flexDirection: "row" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={notifications.feeds}
                            onChange={(e) =>
                              setNotifications((prev) => ({
                                ...prev,
                                feeds: e.target.checked,
                              }))
                            }
                          />
                        }
                        label="Feeds"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={notifications.email}
                            onChange={(e) =>
                              setNotifications((prev) => ({
                                ...prev,
                                email: e.target.checked,
                              }))
                            }
                          />
                        }
                        label="Email"
                      />
                    </RadioGroup>
                  </div>
                </FormControl>
              </div>
              <div className="w-full flex flex-row justify-between items-center">
                <div>
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      setAddEmployeeFileModal(false);
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
                <CiImport className="text-2xl" />
                <h1>Import</h1>
              </div>
            </MenuItem>
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
              className="w-1/2 h-4/5 overflow-scroll p-4 flex flex-col gap-4 rounded-lg border border-gray-800"
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
                  options={["Employee 1", "Employee 2"]}
                  value={filterFormValues.employee}
                  onChange={(e, value) =>
                    handleFilterFormChange("employee", value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Employee" />
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
              <div>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={["Location 1", "Location 2"]}
                  value={filterFormValues.location}
                  onChange={(e, value) =>
                    handleFilterFormChange("location", value)
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Location" />
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
