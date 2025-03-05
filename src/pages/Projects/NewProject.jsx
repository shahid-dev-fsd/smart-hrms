import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  Select,
  FormControl,
  FormControlLabel,
  FormLabel ,
  InputLabel ,
  OutlinedInput ,
  Checkbox ,
  ListItemText
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import useErrorHandler from "../../hooks/useErrorHandler";
import { Form, useForm } from "../../hooks/useForm/useForm";
import axios from "axios";
import { useMessage } from "../../components/Header";
import ReactQuill from "react-quill";
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddPayrollPage = () => {
  const [employees, setEmployees] = useState({});
  const [departments, setDepartments] = useState([]);
  const [text, setText] = useState("");
  const errorHandler = useErrorHandler();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handlers = useForm(
    useMemo(
      () => ({
        title: { required: true },
        employeeId: { required: true },
        priority: { required: true },
        department: { required: true },
        price: { required: true },
        client: { required: true },
        assignedTeam: { required: true },
        from: { required: true, type: "date" },
        to: { required: true, type: "date" },
        status: { required: true },
      }),
      []
    ),
    { Input: TextField }
  );

  const values = handlers.values;
  const setValues = handlers.setValues;

  const fetchEmployees = useCallback(
    async (employeeSearch = "") => {
      try {
        const response = await axios.get(
          `/hr/employee?pageSize=10${
            employeeSearch ? `&searchBy=firstName&search=${employeeSearch}` : ""
          }`
        );

        setEmployees([]);
        const employees = response.data.employees;

        const formattedEmployees = {};

        employees.forEach(
          (employee) =>
            (formattedEmployees[
              employee._id
            ] = `${employee.firstName} ${employee.lastName}`)
        );

        setEmployees(formattedEmployees);
      } catch (e) {
        console.log(e);
      }
    },
    [setEmployees]
  );

  console.log("employees" , employees)

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleChangeQuery = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ [name]: value });
    if (name === "employeeId") {
      console.log("Selected employeeId: ", value);
    }
  };

  const { showSuccess, showError } = useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload the file first
      await uploadFile();

      // Then submit the rest of the form data
      const response = await axios.post("/hr/projects/add", {
        title: values.title,
        description: text,
        employeeId: values.employeeId,
        priority: values.priority,
        department: values.department,
        price: values.price,
        client: values.client,
        assignedTeam: values.assignedTeam,
        from: values.from,
        to: values.to,
        status: values.status,
      });

      console.log("response", response);
      if (response.status === 200) {
        resetForm();
        showSuccess("Project created successfully");
      }
    } catch (error) {
      showError("Error creating project");
      console.error(error);
    }
  };

  const resetForm = () => {
    setValues({
      title: "",
      employeeId: "",
      priority: "",
      department: "",
      price: "",
      client: "",
      assignedTeam: "",
      from: "",
      to: "",
      status: "",
      assignedTo: "", // Reset assignedTo field
    });
    setText(""); // Reset the text state
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleChange = (value) => {
    setText(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setValues({ uploadedFiles: file }); // Store the selected file in form state
  };

  const fetchDepartment = useCallback(async () => {
    try {
      const response = await axios.get(`/hr/department`);
      setDepartments(response.data.departments);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchDepartment();
  }, [fetchDepartment]);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", values.uploadedFiles);

    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("File uploaded successfully");
        // Handle success as per your application requirements
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      // Handle error as per your application requirements
    }
  };

  return (
    <>
      <Box
        sx={{ backgroundColor: "background.main" }}
        className="h-full overflow-hidden"
      >
        <div
          className="h-full"
          style={{ overflowY: "auto", paddingRight: "1px" }}
        >
          <Grid container justifyContent="center" height="100%">
            <Grid item xs={11}>
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs>
                    <Typography variant="h5">New Project</Typography>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Info" placement="top">
                      <IconButton
                        disableRipple
                        variant="navIcon"
                        sx={{ mr: 0 }}
                      >
                        <InfoOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Box>

              <Box mb={4}>
                <Card elevation={0}>
                  <CardContent>
                    <Box pb={8}>
                      <Form
                        handlers={handlers}
                        onSubmit={handleSubmit}
                        onError={errorHandler}
                      >
                        <Grid container spacing={2}>
                          {/* <Grid item xs={12} md={6}>
                            <Typography
                              variant="subtitle1"
                              component="p"
                              mb={1}
                              mx={1}
                            >
                              Employee ID
                            </Typography>
                            <Select
                              name="employeeId"
                              fullWidth
                              variant="outlined"
                              size="small"
                              onChange={handleChangeQuery}
                              value={values.employeeId}
                            >
                              {Object.entries(employees).map(([id, name]) => (
                                <MenuItem key={id} value={id.toString()}>
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid> */}
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="subtitle1"
                              component="p"
                              mb={1}
                              mx={1}
                            >
                              Project Title
                            </Typography>
                            <TextField
                              name="title"
                              fullWidth
                              size="small"
                              placeholder="Enter project title"
                              onChange={handleChangeQuery}
                              value={values.title}
                              InputProps={{ style: { height: '37px' } }}
                              />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="subtitle1"
                              component="p"
                              mb={1}
                              mx={1}
                            >
                              Project Priority
                            </Typography>
                            <Select
                              name="priority"
                              fullWidth
                              variant="outlined"
                              size="small"
                              onChange={handleChangeQuery}
                              value={values.priority}
                            >
                              <MenuItem value="High">High</MenuItem>
                              <MenuItem value="Medium">Medium</MenuItem>
                              <MenuItem value="Low">Low</MenuItem>
                            </Select>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="subtitle1"
                              component="p"
                              mb={1}
                              mx={1}
                            >
                              Department
                            </Typography>
                            <Select
                              name="department"
                              fullWidth
                              variant="outlined"
                              size="small"
                              onChange={handleChangeQuery}
                              value={values.department}
                            >
                              {departments.map((department) => (
                                <MenuItem key={department._id} value={department._id}>
                                  {department.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="subtitle1"
                              component="p"
                              mb={1}
                              mx={1}

                            >
                              Price
                            </Typography>
                            <TextField
                              name="price"
                              fullWidth
                              size="small"
                              placeholder="Enter price"
                              onChange={handleChangeQuery}
                              value={values.price}
                              InputProps={{ style: { height: '37px' } }}

                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="subtitle1"
                              component="p"
                              mb={1}
                              mx={1}
                            >
                              Client
                            </Typography>
                            <TextField
                              name="client"
                              fullWidth
                              size="small"
                              placeholder="Enter client"
                              onChange={handleChangeQuery}
                              value={values.client}
                              InputProps={{ style: { height: '37px' } }}

                            />
                          </Grid>
                          {/* <Grid item xs={12} md={12}>
                            <Typography
                              variant="subtitle1"
                              component="p"
                              mb={1}
                              mx={1}
                            >
                              Assigned Team
                            </Typography>
                            <FormControl fullWidth>
                              <Select
                                name="assignedTeam"
                                multiple
                                value={values.assignedTeam || []}
                                onChange={handleChangeQuery}
                                input={<OutlinedInput label="Assigned Team" />}
                                renderValue={(selected) =>
                                  selected.map((id) => employees[id]).join(", ")
                                }
                                sx={{ height: '37px' }}
                                MenuProps={{
                                  PaperProps: {
                                    style: {
                                      maxHeight: 300,
                                    },
                                  },
                                }}
                              >
                                {Object.entries(employees).map(([id, name]) => (
                                  <MenuItem key={id} value={id}>
                                    <Checkbox checked={values.assignedTeam.indexOf(id) > -1} />
                                    <ListItemText primary={name} />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid> */}
                          <Grid item xs={12} md={12}>
  <Typography variant="subtitle1" component="p" mb={1} mx={1}>
    Assigned Team
  </Typography>
  <FormControl fullWidth>
    <Select
      name="assignedTeam"
      value={values.assignedTeam || ""}
      onChange={handleChangeQuery}
      input={<OutlinedInput label="Assigned Team" />}
      renderValue={(selected) => employees[selected] || ""}
      sx={{ height: '37px' }}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 300,
          },
        },
      }}
    >
      {Object.entries(employees).map(([id, name]) => (
        <MenuItem key={id} value={id}>
          <ListItemText primary={name} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>

                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="subtitle1"
                              component="p"
                              mb={1}
                              mx={1}
                            >
                              From
                            </Typography>
                            <TextField
                              name="from"
                              fullWidth
                              size="small"
                              type="date"
                              onChange={handleChangeQuery}
                              value={values.from}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="subtitle1"
                              component="p"
                              mb={1}
                              mx={1}
                            >
                              To
                            </Typography>
                            <TextField
                              name="to"
                              fullWidth
                              size="small"
                              type="date"
                              onChange={handleChangeQuery}
                              value={values.to}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Typography
                              variant="subtitle1"
                              component="p"
                              mb={1}
                              mx={1}
                            >
                              Description
                            </Typography>
                            <ReactQuill
                              value={text}
                              modules={modules}
                              formats={formats}
                              onChange={handleChange}
                              className="richtextWrap h-[200px] w-full rounded-lg"
                              placeholder="Enter description"
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Typography
                              variant="subtitle1"
                              component="p"
                              mt={7}
                              mx={1}
                            >
                              Uploaded files
                            </Typography>
                            <Box
                              display="flex"
                              flexDirection={{ xs: "column", md: "row" }}
                              mt={2}
                            >
                              <Box
                                flex={1}
                                mr={{ xs: 0, md: 2 }}
                                mb={{ xs: 2, md: 0 }}
                                sx={{border:"1px solid"}}
                              >
                                {/* <input
                                  name="uploadedFiles"
                                  accept="image/*, .pdf, .doc, .docx"
                                  id="upload-file"
                                  type="file"
                                  onChange={handleFileChange}
                                  fullWidth
                                  size="small"
                                  placeholder="No file chosen"
                                /> */}
                                <p
                             style={{
                              fontSize: "10px" ,
                                marginLeft: "8px" ,
                                marginTop: "6px" ,
                                padding: "3px" ,
                             }}   
                                >No file chosen
                                </p>
                              </Box>
                              <Box>
                                <Button variant="contained" color="primary"
                                 onClick={handleOpen}
                                >
                                  Choose file
                                </Button>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} md={12}>
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <div>Status</div>

                              <FormControl
                                style={{
                                  marginTop: "-8px",
                                  marginLeft: "10px",
                                }}
                              >
                                <RadioGroup
                                  aria-labelledby="status-radio-group-label"
                                  defaultValue="Active"
                                  name="status"
                                  onChange={handleChangeQuery}
                                  sx={{ display: 'flex', flexDirection: 'row' }}
                                  value={values.status}
                                >
                                  <div>
                                    {" "}
                                    <FormControlLabel
                                      value="Active"
                                      control={<Radio
                                      
                                      
                                        
                                        />}
                                      label="Active"
                                    />
                                  </div>
                                  <div>
                                    {" "}
                                    <FormControlLabel
                                      value="Pending"
                                      control={<Radio />}
                                      label="Pending"
                                    />
                                  </div>
                                  <div>
                                    <FormControlLabel
                                      value="OnGoing"
                                      control={<Radio />}
                                      label="On Going"
                                    />
                                  </div>
                                  <div>
                                    <FormControlLabel
                                      value="Completed"
                                      control={<Radio />}
                                      label="Completed"
                                    />
                                  </div>
                                  <div>
                                    <FormControlLabel
                                      value="NotStarted"
                                      control={<Radio />}
                                      label="Not Started"
                                    />
                                  </div>
                                  <div>
                                    <FormControlLabel
                                      value="Cancel"
                                      control={<Radio />}
                                      label="Cancel"
                                    />
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <div
                              style={{ display: "flex", justifyContent: "end" }}
                            >
                              <div className="mx-3">
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={handleSubmit}
                                >
                                  Submit
                                </Button>
                              </div>
                              <div className="mx-3">
                                <Button variant="outlined" color="error">
                                  Close
                                </Button>
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </Form>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </div>
        <style jsx>{`
          .h-full::-webkit-scrollbar {
            display: none;
          }
          .h-full {
            scrollbar-width: none;
          }
        `}</style>
       
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Select Image
          </Typography>
        <input   
         name="uploadedFiles"
         accept="image/*, .pdf, .doc, .docx"
         id="upload-file"
         type="file"
         onChange={handleFileChange}
         fullWidth
         size="small"
         placeholder="No file chosen"
        
        />
        </Box>
      </Modal>
    </>
  );
};

export default AddPayrollPage;
