import React, { useCallback, useEffect, useState } from "react";
import { Grid, Pagination, Tooltip, Typography, CircularProgress, Button, TextField } from "@mui/material";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import { Box, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "@mui/material/Modal";
import AddEmployee from "../../components/AddEmployee";

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonIcon from "@mui/icons-material/Person";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import axios from "axios";
import { useEmployees } from "../../hooks/Authorize";
import moment from "moment";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";
import useModal from "../../hooks/useModal";
import noRecord from "../../assets/initalScreen/employeeList.svg";
import TerminationModal from "./TerminationModal";
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery, useTheme } from '@mui/material';
import { useMessage } from "../../components/Header";

const EmployeePage = () => {
  const {
    modalState: viewOfferLetter,
    closeModal: closeOfferLetter,
    openModal: openOfferLetter,
  } = useModal();

  const [employLists, setEmployLists] = useState(null);
  const [employeeoverview, setEmployeeoverview] = useState(null);
  const [department, setDepartment] = useState(null);
  const [maleEmployee, setMaleEmployee] = useState(0);
  const [newEmployee, setNewEmployee] = useState(0);
  const [pageLimit, setPageLimit] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [totalActiveEmployee, setTotalActiveEmployee] = useState(0);
  const [totalTerminatedEmployee, setTotalTerminatedEmployee] = useState(0);
  const [suspenId, setSuspendId] = React.useState();


  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("Active");

  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [selecteduserID, setSelecteduserID] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteUserName, setDeleteUserName] = useState("");
  const { showSuccess, showError } = useMessage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const employees = useEmployees();

  console.log(employees);

  const fetchEmployeesOverview = async () => {
    try {
      const response = await axios.get(
        `/hr/employee?pageSize=all`
      );
      setEmployeeoverview(response?.data?.employees);
      setTotalEmployee(response?.data.pageData.totalData);
      const filteredFruits = response?.data?.employees?.filter(
        (male) => male.gender === "male" || male.gender === "Male"
      );
      setMaleEmployee(filteredFruits.length);

      const filterActiveEmployee = response?.data?.employees?.filter(
        (male) => male.status === "active" || male.status === "Active"
      );
      setTotalActiveEmployee(filterActiveEmployee.length);
      const filterTerminatedEmployee = response?.data?.employees?.filter(
        (male) => male.status === "terminated" || male.status === "Terminated"
      );
      setTotalTerminatedEmployee(filterTerminatedEmployee.length);
      filterNewEmployee(response?.data?.employees)
      // const newEmployeeFilter =  response.data.employees.filter(jod => jod.dateOfJoining === Date.now());
      // setNewEmployee(newEmployeeFilter)
      // console.log(Date.now())
    } catch (e) {
      console.log(e);
    }
  }

  const fetchEmploees = useCallback(
    async (search = "") => {
      try {
        const response = await axios.get(
          `/hr/employee?searchBy=firstName&search=${search}&sortBy=order&status=&page=${page}`
        );
        setEmployLists(response?.data?.employees);
        setPageLimit(response?.data?.pageData.totalPages);
        // setTotalEmployee(response?.data.pageData.totalData);
        // const filteredFruits = response?.data?.employees?.filter(
        //   (male) => male.gender === "male" || male.gender === "Male"
        // );
        // setMaleEmployee(filteredFruits.length);
        // filterNewEmployee(response?.data?.employees)
        // const newEmployeeFilter =  response.data.employees.filter(jod => jod.dateOfJoining === Date.now());
        // setNewEmployee(newEmployeeFilter)
        // console.log(Date.now())
      } catch (e) {
        console.log(e);
      }
    },
    [setEmployLists, page, status]
  );

  const handleCancelDelete = () => {
    setConfirmDeleteDialogOpen(false);
    setDeleteLoading(false);
  };

  const removeRecord = async (userdata) => {
    // eslint-disable-next-line no-restricted-globals
    setConfirmDeleteDialogOpen(true);
    setSelecteduserID(userdata);
    // if (confirm("Are you sure to remove employee records")) {
    //   const response = await axios.delete(`/hr/employee/remove-records/${id}`);
    //   fetchEmploees();
    // }
  };
  const handleConfirmDelete = () => {
    if (deleteUserName === selecteduserID.firstName + " " + selecteduserID.lastName) {
      setDeleteLoading(true);
      axios.delete(`/hr/employee/remove-records/${selecteduserID._id}`)
        .then(() => {
          showSuccess('User deleted successfully');
          // Close the confirmation dialog
          setConfirmDeleteDialogOpen(false);
          setDeleteLoading(false);

          fetchEmployeesOverview();
          fetchEmploees();
        })
        .catch(error => {
          // Handle error (e.g., show an error message)
          console.error('Error deleting User:', error);

          showError('Error deleting User');
          // Close the confirmation dialog
          setDeleteLoading(false);
          setConfirmDeleteDialogOpen(false);
        });
    } else {
      alert("User's full name does not match. Please try again.");
    }

  };

  const filterNewEmployee = (items) => {
    const today = new Date();
    const next7Days = new Date(today);
    next7Days.setDate(today.getDate() - 7);

    let NewEmployee = items.filter(item => {
      const itemDate = new Date(item.dateOfJoining);
      return itemDate >= next7Days;
    });

    console.log("NewEmployee ", NewEmployee)
    setNewEmployee(NewEmployee?.length || 0);
  };

  const fetchDepartment = useCallback(
    async function () {
      try {
        const response = await axios.get(`/hr/department`);
        setDepartment(response.data.departments);
      } catch (e) {
        console.log(e);
      }
    },
    [setDepartment]
  );
  const { modalState, closeModal, openModal } = useModal();

  const handleChangeTermination = (id) => {
    setSuspendId(id);
    openModal();
  };
  const convertToTwoDigits = (number) => number.toString().padStart(2, "0");

  useEffect(() => {
    fetchEmploees();
    fetchDepartment();
  }, [fetchEmploees, fetchDepartment]);

  useEffect(() => {
    fetchEmployeesOverview();
  }, []);

  const getDepartmentName = (id) => {
    let tempDep = department?.find((dep) => dep._id === id);
    return tempDep?.name || "N/A";
  };

  const boxesData = [
    {
      icon: (
        <Groups2OutlinedIcon
          fontSize="large"
          className="text-white  bg-orange-600 p-2 rounded-lg"
        />
      ),
      title: "Users",
      value: (
        <Typography
          variant="body1"
          style={{ color: "orange", fontSize: "1.2em" }}
        >
          {employeeoverview?.length}
        </Typography>
      ),
      description: "124 for last month",
      trendIcon: <TrendingUp className="text-green-500" />,
    },
    {
      icon: (
        <GroupOutlinedIcon
          fontSize="large"
          className="text-white  bg-green-600 p-2 rounded-lg"
        />
      ),
      title: "Active Users",
      value: (
        <Typography
          variant="body1"
          style={{ color: "#00FF00", fontSize: "1.2em" }}
        >
          {totalActiveEmployee}
        </Typography>
      ),
      description: "124 for last month",
      trendIcon: <TrendingUp className="text-green-500" />,
    },
    {
      icon: (
        <GroupOutlinedIcon
          fontSize="large"
          className="text-white  bg-red-600 p-2 rounded-lg"
        />
      ),
      title: "Terminated Users",
      value: (
        <Typography
          variant="body1"
          style={{ color: "red", fontSize: "1.2em" }}
        >
          {totalTerminatedEmployee}
        </Typography>
      ),
      description: "124 for last month",
      trendIcon: <TrendingUp className="text-green-500" />,
    },
    {
      icon: (
        <MaleOutlinedIcon
          fontSize="large"
          className="text-white bg-teal-700 p-2 rounded-lg"
        />
      ),
      title: "Male Employees",
      value: (
        <Typography
          variant="body1"
          style={{ color: "#5eead4", fontSize: "1.2em" }}
        >
          {maleEmployee}
        </Typography>
      ),
      description: "124 for last month,",
      trendIcon: <TrendingDown className="text-red-500" />,
    },
    {
      icon: (
        <FemaleOutlinedIcon
          fontSize="large"
          className="text-white bg-teal-950 p-2 rounded-lg"
        />
      ),
      title: "Female Employees",
      value: (
        <Typography
          variant="body1"
          style={{ color: "#f472b6", fontSize: "1.2em" }}
        >
          {employeeoverview?.length - maleEmployee}
        </Typography>
      ),
      description: "124 for last month",
      trendIcon: <TrendingDown className="text-red-500" />,
    },
    {
      icon: (
        <GroupsOutlinedIcon
          fontSize="large"
          className="text-white bg-red-800 p-2 rounded-lg"
        />
      ),
      title: "New Employees",
      value: (
        <Typography
          variant="body1"
          style={{ color: "#FF0000", fontSize: "1.2em" }}
        >
          {newEmployee || 0}
        </Typography>
      ),
      description: "124 for last month",
      trendIcon: <TrendingDown className="text-red-500" />,
    },
  ];
  console.log(employLists);
  console.log(department);

  const {
    modalState: addEmployeeState,
    closeModal: closeAddEmployee,
    openModal: openAddEmployee,
  } = useModal();

  return (
    <Box sx={{ backgroundColor: "background.main", height: '70vh' }}>
      <div className="flex flex-col p-4">
        <div className="flex items-center justify-between md:w-full ">
          <div className="p-2">
            <h1 className="text-2xl text-neutral-500">Employees</h1>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <button
              className="flex  items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700"
              onClick={openAddEmployee}
            >
              Add New Employee
            </button>
            <InfoOutlinedIcon />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-full">
            <div className="flex flex-col gap-4 mb-4 md:flex-row md:flex-row">
              {boxesData &&
                boxesData.map((box, index) => (
                  <Grid
                    sx={{ backgroundColor: "background.view" }}
                    key={index}
                    className="rounded-lg p-4 shadow-md md:w-1/4"
                  >
                    <p className="text-base">{box.title}</p>
                    <div className="flex items-center mb-2">
                      <p className="w-5/6 text-xl">{box.value}</p>
                      <div className="w-1/6">{box.icon}</div>
                    </div>
                  </Grid>
                ))}
            </div>
          </div>
        </div>
        <Box sx={{ width: { xs: "calc(100vw - 30px)", sm: "100%" } }}>
          {employLists?.length > 0 ? (
            <Box
              className="w-full  ml-2 md:ml-0 pt-4 rounded-lg mb-4"
              sx={{ backgroundColor: "background.view" }}
            >
              <div className="flex items-center justify-between md:w-full">
                <div>
                  <p
                    className=" mb-4 border-l-4 border-blue-500 pl-3 text-xl"
                    gutterBottom
                  >
                    Employees List
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center gap-4 mr-8">
                  <p className="text-sm md:text-base text-zinc-400 pl-2 md:pl-5">
                    Rows per page: 10{" "}
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="text-zinc-500 text-lg md:text-2xl text-center ml-2"
                    />
                  </p>
                </div>
              </div>
              <Box
                sx={{ width: { xs: "calc(100vw - 35px)", sm: "97%" } }}
                className=" md:ml-4 border border-zinc-500 overflow-x-auto md:overflow-x-hidden rounded-sm mt-10"
              >
                <Grid className="flex flex-row border-b border-zinc-500  w-[68rem] md:w-full">
                  <div className="w-[5%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs font-bold truncate">
                    No
                  </div>
                  <div className=" w-[15%] p-2  border-r border-zinc-500 text-sm md:text-xs font-bold truncate">
                    Emp Name
                  </div>
                  <div className="w-[13%] p-2 border-r border-zinc-500 text-sm md:text-xs font-bold truncate">
                    Emp ID
                  </div>
                  <div className="w-[12%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs font-bold">
                    Department
                  </div>
                  <div className="w-[15%] p-2 border-r border-zinc-500 text-sm md:text-xs font-bold">
                    Designation
                  </div>
                  <div className="w-[12%] p-2 border-r border-zinc-500 text-sm md:text-xs font-bold">
                    Phone No
                  </div>
                  <div className="w-[10%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs font-bold">
                    Join Date
                  </div>
                  {/* <div className='w-[10%] p-2 border-r border-zinc-500 text-sm md:text-xs font-bold'>
                            At Work
                        </div> */}
                  <div className="w-[8%] p-2 border-r border-zinc-500 text-sm md:text-xs font-bold">
                    Status
                  </div>
                  <div className="w-[10%] p-2  text-left text-sm md:text-xs font-bold">
                    Action
                  </div>
                </Grid>

                {employLists &&
                  employLists?.map((employee, index) => (
                    <Grid className="flex flex-row border-b border-zinc-500  w-[68rem] md:w-full">
                      <div className="w-[5%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs truncate">
                        {index + 1}
                      </div>
                      <div className="w-[15%] p-3 border-r border-zinc-500 text-sm md:text-xs ">
                        <div className="flex flex-row gap-3 items-center  pl-1 ">
                          <div className="flex justify-center items-center">
                            <PersonIcon
                              style={{ fontSize: "16px" }}
                              className="text-zinc-300"
                            />
                          </div>
                          <div className="flex flex-col gap-0">
                            {employee.firstName && employee.firstName}{" "}
                            {employee.lastName && employee.lastName}{" "}
                            <p className="text-[6px]">{employee.mail}</p>
                          </div>
                        </div>
                      </div>
                      <div className="w-[13%] p-2 border-r border-zinc-500 text-sm md:text-xs truncate">
                        {employee && employee._id}
                      </div>
                      <div className="w-[12%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs truncate">
                        {employee && getDepartmentName(employee?.department)}
                      </div>
                      <div className="w-[15%] p-2 border-r border-zinc-500 text-sm md:text-xs truncate">
                        {employee && employee?.designation}
                      </div>
                      <div className="w-[12%] p-2 border-r border-zinc-500 text-sm md:text-xs truncate">
                        {employee && employee.phone?.countryCode}{" "}
                        {employee && employee.phone?.phone}
                      </div>
                      <div className="w-[10%] p-2 border-r border-zinc-500 text-left text-sm md:text-xs truncate">
                        {moment(employee && employee.dateOfJoining)
                          .utc()
                          .format("MM-DD-YYYY")}
                      </div>
                      {/* <div className='w-[10%] p-2 border-r border-zinc-500 text-sm md:text-xs truncate'>
                        {employee && employee?.work}
                        </div> */}
                      <div className="w-[8%] p-2 border-r border-zinc-500 text-sm md:text-xs truncate">
                        {employee && employee.status}
                      </div>
                      <div className="w-[10%] p-2  text-left text-sm md:text-xs">
                        <div className="flex flex-row gap-2 justify-center items-center">
                          <Link to={`/performance/${employee._id}`}>
                            <Tooltip title="View Employee">
                              <IconButton>
                                <EditOutlinedIcon
                                  style={{ fontSize: "12px" }}
                                  className=" rounded-sm"
                                />
                              </IconButton>
                            </Tooltip>
                          </Link>

                          <Tooltip title="Delete User">
                            <IconButton
                              onClick={() =>
                                removeRecord(employee)
                              }
                            >
                              <CloseIcon
                                style={{ fontSize: "12px" }}
                                className="rounded-sm"
                                color="error"
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Terminate Employee">
                            <IconButton
                              onClick={() =>
                                handleChangeTermination(employee._id)
                              }
                            >
                              <DeleteOutlineOutlinedIcon
                                style={{ fontSize: "12px" }}
                                className=" rounded-sm"
                                color="warning"
                              />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    </Grid>
                  ))}
              </Box>
              <Box
                sx={{
                  float: "right",
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography sx={{ mr: 2 }} variant="caption">
                  Total Employee : {totalEmployee}
                </Typography>
                <Pagination
                  page={page}
                  onChange={(_, newPage) => setPage(newPage)}
                  color="primary"
                  count={pageLimit}
                />
              </Box>
            </Box>
          ) : (
            <div className="flex flex-col items-center justify-center  text-center">
              <div>
                <img
                  src={noRecord}
                  alt="No Record"
                  className="mb-1"
                  style={{ maxWidth: "70%", margin: "auto" }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">No Employee Record</h1>
              </div>
              <div>
                <p className="mb-[50px]">
                  When you employee people to work at your organization, their
                  information
                  <br /> will be seen here.
                </p>
              </div>
            </div>
          )}
        </Box>
      </div>
      <Modal
        open={addEmployeeState}
        onClose={closeAddEmployee}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          <AddEmployee
            closeModal={closeAddEmployee}
            // userId={jobApplication.userId}
            refetch={fetchEmploees}
          />
        </>
      </Modal>
      <Modal open={modalState} onClose={closeModal}>
        <TerminationModal
          handleClose={closeModal}
          fetchEmploees={fetchEmploees}
          fetchEmployeesOverview={fetchEmployeesOverview}
          suspenId={suspenId}
        />
      </Modal>
      <Modal
        open={confirmDeleteDialogOpen}
        onClose={handleCancelDelete}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
            borderRadius: "8px",
            maxWidth: "1300px",
            mx: 2,
            overflowX: "hidden",
            maxHeight: "85vh",
            overflowY: "auto",
            position: "absolute",
            top: "50%",
            left: isMobile ? "46%" : "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? 350 : 500,
            bgcolor: "background.paper",
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" component="h2" >
            Delete {selecteduserID.firstName} {selecteduserID.lastName}
          </Typography>
          <Typography variant="body1" fontSize={13} marginBottom={3}>
            Are you sure you want to delete the user <span className="text-blue-500 font-bold" > {selecteduserID.firstName}  {selecteduserID.lastName}</span> ?
          </Typography>
          <Typography variant="body2" sx={{ color: "red" }} marginBottom={3}>
            This action cannot be undone.
          </Typography>
          <Typography variant="body2" fontSize={13}>
            Please type the user's full name to confirm:
          </Typography>
          <TextField
            placeholder="Enter User's Full Name"
            variant="outlined"
            fullWidth
            defaultValue={deleteUserName}
            onChange={(e) => setDeleteUserName(e.target.value)}
            inputProps={{
              style: { fontSize: '13px', },
            }}
          />

          <Box textAlign="right">
            <Button
              onClick={handleCancelDelete}
              color='primary'> Cancel
            </Button>
            <Button
              variant='contained'
              onClick={handleConfirmDelete}
              disabled={deleteLoading}
              endIcon={
                deleteLoading && (
                  <CircularProgress size='20px' sx={{ color: 'inherit' }} />
                )
              }
              style={{ backgroundColor: '#ff2121' }}
              autoFocus>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EmployeePage;
