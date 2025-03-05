import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  ListItemAvatar,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  Select,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useNavigate } from "react-router-dom";
import useErrorHandler from "../../hooks/useErrorHandler";
import { Form, Submit, useForm } from "../../hooks/useForm/useForm";
import axios from "axios";
import { useMessage } from "../../components/Header";
import { SelectWithSearch } from "../../components/Select";
import { Input } from "../../hooks/useForm/inputs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import view from "../ReceivedApp/viewicon.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Calendar from "react-calendar";
import "./projectStyle.css";

const OverTime = () => {
  const [employees, setEmployees] = useState({});
  const [currentScreen, setCurrentScreen] = useState(1);
  const [value, onChange] = useState(new Date());

  const handlePrevScreen = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleNextScreen = () => {
    if (currentScreen < 2) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const userData = [
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Holiday",
      clockIn: "-- -- --",
      clockOut: "-- -- --",
      progress: "Present & Late",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Late",
      clockIn: "09:50 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Holiday",
      clockIn: "-- -- --",
      clockOut: "-- -- --",
      progress: "Present & Late",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Late",
      clockIn: "09:50 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Holiday",
      clockIn: "-- -- --",
      clockOut: "-- -- --",
      progress: "Present & Late",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Late",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Holiday",
      clockIn: "-- -- --",
      clockOut: "-- -- --",
      progress: "Present & Late",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Present",
      clockIn: "09:00 AM",
      clockOut: "05:00 PM",
      progress: "Present",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
    {
      Id: "#29",
      date: "2024-04-18",
      Project: "Monday",
      status: "Late",
      clockIn: "09:09 AM",
      clockOut: "05:00 PM",
      progress: "Holiday",
      action: <img src={view} alt="view" className="w-4 h-4" />,
    },
  ];

  const getColor = (status) => {
    switch (status) {
      case "Present":
        return { bgColor: "bg-green-950", textColor: "text-green-500" };
      case "Holiday":
        return { bgColor: "bg-sky-950", textColor: "text-sky-500" };
      case "Late":
        return { bgColor: "bg-red-950", textColor: "text-red-500" };
      default:
        return { bgColor: "bg-gray-900", textColor: "text-gray-500" };
    }
  };

  const getProgressBarStyle = (status) => {
    switch (status) {
      case "Present":
        return { width: "100%", backgroundColor: "#34D399" };
      case "Holiday":
        return { width: "100%", backgroundColor: "#6B7280" };
      case "Late":
        return { width: "75%", backgroundColor: "#34D399" };
      case "Present & Late":
        return { width: "75%", backgroundColor: "#34D399" };
      default:
        return { width: "100%", backgroundColor: "#6B7280" };
    }
  };

  const avatarData = [
    {
      alt: "Remy Sharp",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
    },
    {
      alt: "Remy Sharp",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
    },
    {
      alt: "Remy Sharp",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
    },
    {
      alt: "Remy Sharp",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
    },
    {
      alt: "Remy Sharp",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
    },
    {
      alt: "Remy Sharp",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s",
    },
  ];

  const Months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  const [date, setDate] = useState({
    employeeId: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const Years = Array(41)
    .fill(1)
    .map((el, i) => i + 2009);

  const [tab, setTab] = useState("task");

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  console.log(tab);
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const handlers = useForm(
    useMemo(
      () => ({
        employeeId: { required: true },
        from: { required: true },
        to: { required: true },
        salary: { required: true },
        status: { required: true, value: "unPaid" },
        hraAllowance: { required: true },
        conveyance: { required: true },
        medicalAllowance: { required: true },
        bonusAllowance: { required: true },
        pf: { required: true },
        professionalTax: { required: true },
        tds: { required: true },
        loanAndOthers: { required: true },
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

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleChangeQuery = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ [name]: value });
  };

  const { showSuccess, showError } = useMessage();
  const submit = (res) => {
    const { success } = res.data;
    if (!success) return showError("payroll not added");
    navigate("/employee-salary");
    showSuccess("Add payroll successfully");
  };

  const calculatedSalary = useMemo(() => {
    const {
      hraAllowance,
      medicalAllowance,
      conveyance,
      bonusAllowance,
      pf,
      professionalTax,
      tds,
      loanAndOthers,
      salary,
    } = values;
    const totalAllowance =
      parseFloat(hraAllowance) +
        parseFloat(medicalAllowance) +
        parseFloat(conveyance) +
        parseFloat(bonusAllowance) || 0;
    const totalDeduction =
      parseFloat(pf) +
        parseFloat(professionalTax) +
        parseFloat(tds) +
        parseFloat(loanAndOthers) || 0;
    const netSalary = parseInt(salary) + totalAllowance - totalDeduction || 0;

    return { totalAllowance, totalDeduction, netSalary };
  }, [values]);

  return (
    <>
      <Box
        sx={{ backgroundColor: "background.main" }}
        className="h-full overflow-hidden overflow-y-scroll rounded-[8px] mx-4"
      >
        <div className="flex flex-col  rounded-t-[15px]">
          <div className="p-2 md:py-2 md:px-6">
            <div className="flex items-center justify-between md:w-full py-8 md:p-4">
              <div className="">
                <h1 className=" text-neutral-500 text-[18px] leading-[26.04px] md:text-[25px] font-[500] md:leading-[39.06px]">
                  Project Dashboard
                </h1>
              </div>
              <div className="flex flex-row items-center justify-center gap-3">
                <button className="text-[13px] font-[500] leading-[32.5px] bg-[#3767B1] rounded-[5px] py-[5px] px-[15px]">
                  Create New
                </button>
                <div className="bg-[#0D0D0D] p-[8px] rounded-[5px]">
                  {" "}
                  <InfoOutlinedIcon sx={{ color: "#ffffff" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-5" style={{ paddingRight: "1px" }}>
          <Grid container justifyContent="center" height="100%">
            <Grid item xs={12}>
              <Box mb={4}>
                <Card elevation={0}>
                  <CardContent>
                    <Box pb={8}>
                      <Form
                        handlers={handlers}
                        onSubmit={submit}
                        onError={errorHandler}
                        action="/hr/rules"
                        method="post"
                      >
                        <div className=" border-l-4 border-[#3767B1] ml-[-16px] pl-[16px] w-full text-[18px] md:text-[18px] md:font-[500] md:leading-[32.55px]">
                          Task Overview This Month
                        </div>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <div className="mt-[20px]">
                              <div className="text-[#BDBDBD] mx-3 mb-1 text-[14px] font-[500] leading-[26.04px]">
                                From
                              </div>
                            </div>

                            <Input
                              name="field3"
                              fullWidth
                              size="small"
                              type="date"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <div className="mt-[20px]">
                              <div className="mt-[20px]">
                                <div className="text-[#BDBDBD] mx-3 mb-1 text-[14px] font-[500] leading-[26.04px]">
                                  To
                                </div>
                              </div>
                            </div>

                            <Input
                              name="field4"
                              fullWidth
                              size="small"
                              type="date"
                            />
                          </Grid>

                          <Grid item xs={12} md={12}>
                            <div className="">
                              <div className="mt-[]">
                                <div className="text-[#BDBDBD] mx-3 mb-1 text-[14px] font-[500] leading-[26.04px]">
                                  Project Priority
                                </div>
                              </div>
                            </div>
                            <Select
                              name="priority"
                              fullWidth
                              variant="outlined"
                              size="small"
                            >
                              <MenuItem value="High">High</MenuItem>
                              <MenuItem value="Medium">Medium</MenuItem>
                              <MenuItem value="Low">Low</MenuItem>
                            </Select>
                          </Grid>
                        </Grid>
                        <Submit>
                          {(loader) => (
                            <Button
                              type="submit"
                              variant="contained"
                              disabled={loader}
                              sx={{
                                float: "right",
                                my: 4,
                                backgroundColor: "#3767B1",
                                paddingX: 5,
                              }}
                            >
                              Search
                            </Button>
                          )}
                        </Submit>
                      </Form>
                      <div className="md:px-24 mt-[100px] py-4">
                        <Calendar
                          style={{
                            textDecoration: "none",
                            WebkitTextDecoration: "none",
                          }}
                          defaultView="month"
                          onChange={onChange}
                          value={value}
                        />
                      </div>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </div>

        <div>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar  views={['day']} slotProps={{ textField: { size: "big" } }} />
          </LocalizationProvider> */}
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
    </>
  );
};

export default OverTime;
