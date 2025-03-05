import React, { useCallback, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonIcon from "@mui/icons-material/Person";
import "./award.css";
import useErrorHandler from "../../hooks/useErrorHandler";
import useModal from "../../hooks/useModal";
import axios from "axios";
import AddAward from "../../components/AddAward";

const AwardPage = () => {
  const userData = [
    {
      no: "1",
      id: 29431,
      name: "Emma Stone",
      des: "Web Designer",
      attend: "94",
      type: "Employee of the Month",
      profile: "Cash",
    },
    {
      no: "2",
      id: 48592,
      name: "Daniell Waish",
      des: "QA Tester",
      attend: "53",
      type: "Early Bird Award",
      profile: "Trophy",
    },
    {
      no: "3",
      id: 39104,
      name: "Jason Hack",
      des: "Data Scientist",
      attend: "73",
      type: "Best Attendance",
      profile: "Cash",
    },
    {
      no: "4",
      id: 11945,
      name: "Ted Bobby",
      des: "Ux/UI Designer",
      attend: "38",
      type: "Most Creative",
      profile: "Trophy",
    },
    {
      no: "5",
      id: 11943,
      name: "Amina Hira",
      des: "Backend Developer",
      attend: "65",
      type: "Stand Out Performance",
      profile: "Cash",
    },
    {
      no: "6",
      id: 99032,
      name: "Nathan Percy",
      des: "Frontend Developer",
      attend: "52",
      type: "Work Anniversary",
      profile: "Trophy",
    },
    {
      no: "7",
      id: 28149,
      name: "Ashley Dan",
      des: "Data Scientist",
      attend: "32",
      type: "Character Award",
      profile: "Cash",
    },
    {
      no: "8",
      id: 38149,
      name: "Dustin Zack",
      des: "Full Stack Developer",
      attend: "58",
      type: "Best Team Player",
      profile: "Trophy",
    },
    {
      no: "9",
      id: 88563,
      name: "Nathalie Soa",
      des: "QA Tester",
      attend: "72",
      type: "Most improved",
      profile: "Cash",
    },
    {
      no: "10",
      id: 99034,
      name: "Vanessa Gad",
      des: "Data Analyst",
      attend: "50",
      type: "Sales Award",
      profile: "Trophy",
    },
  ];

  const errorHandler = useErrorHandler();
  const { modalState, openModal, closeModal } = useModal();

  const [awards, setAwards] = useState(null);
  const [award, setAward] = useState(null);

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchAwards = useCallback(async () => {
    try {
      const params = {
        page,
      };

      const response = await axios.get("/hr/awards", { params });

      setAwards(response.data);
    } catch (e) {
      errorHandler(e);
    }
  }, [errorHandler, page]);

  const editAward = (id) => {
    setAward(id);
    openModal();
  };

  useEffect(() => {
    fetchAwards();
  }, [fetchAwards]);
  console.log(awards);
  const getColor = (profile) => {
    switch (profile) {
      case "Cash":
        return { bgColor: "bg-green-950", textColor: "text-green-500" };
      case "Trophy":
        return { bgColor: "bg-sky-950", textColor: "text-sky-500" };

      default:
        return { bgColor: "bg-gray-900", textColor: "text-gray-500" };
    }
  };

  console.log(awards);
  return (
    <Box sx={{ backgroundColor: "background.main" }}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between md:w-full p-4">
          <div className="p-2">
            <h1 className="text-2xl text-neutral-500">Award</h1>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setAward(null);
                openModal();
              }}
              className="flex items-center text-white font-bold text-xs md:text-base py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700"
            >
              Add New Award
            </button>
            <InfoOutlinedIcon />
          </div>
        </div>

        <Box
          className="w-full ml-2 md:ml-0 pt-4 rounded-lg mb-4"
          sx={{ backgroundColor: "background.view" }}
        >
          <div className="flex items-center mb-5 md:w-full">
            <p className="text-[8px] md:text-[12px]  pl-2 md:pl-5">
              Rows per page: 10{" "}
              <FontAwesomeIcon
                icon={faCaretDown}
                className="text-zinc-500 text-sm md:text-[12px] text-center ml-2 mr-2 text-center"
              />
            </p>
          </div>
          <div className="w-[97%] ml-2 md:ml-4 border border-zinc-500 rounded-sm ">
            <div className="flex flex-row border-b border-zinc-500">
              <div className="w-[50%] md:w-[14.2%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold">
                No
              </div>
              <div className="w-[25%] md:w-[14.2%] p-3 border-r border-zinc-500 text-left text-sm md:text-xs font-bold">
                Emp ID
              </div>
              <div className="w-[50%] md:w-[14.2%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold">
                Emp Name
              </div>
              <div className="w-[25%] md:w-[14.2%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold">
                Designation
              </div>
              {/* <div className='w-[25%] md:w-[14.2%] p-3 border-r border-zinc-500 text-left text-sm md:text-xs font-bold'>
                           Attendance
                        </div> */}
              <div className="w-[25%] md:w-[14.2%] p-3 border-r border-zinc-500 text-sm md:text-xs font-bold">
                Award Type
              </div>

              <div className="w-[25%] md:w-[14.2%] p-3 text-sm md:text-xs font-bold">
                Gift Type
              </div>
            </div>
            {awards?.awards?.map((user, index) => (
              <div
                key={index}
                className="flex flex-row border-b border-zinc-500"
              >
                <div className="w-[50%] md:w-[14.2%] p-3 border-r border-zinc-500 text-sm md:text-[10px]">
                  {index + 1}
                </div>
                <div className="w-[25%] md:w-[14.2%] p-3 border-r border-zinc-500 text-left text-sm md:text-[10px]">
                  {user.employeeId}
                </div>
                <div className="w-[50%] md:w-[14.2%] p-1 border-r border-zinc-500 text-sm md:text-[10px] flex flex-row gap-2 flex items-center">
                  <div className="flex justify-center items-center pl-2">
                    <PersonIcon
                      style={{ fontSize: "16px" }}
                      className="text-zinc-300"
                    />
                  </div>
                  <div className="">{user.employee.firstName}</div>
                </div>
                <div className="w-[25%] md:w-[14.2%] p-3 border-r border-zinc-500 text-sm md:text-[10px]">
                  {user.employee.designation}
                </div>
                {/* <div className='w-[25%] md:w-[14.2%] p-3 border-r border-zinc-500 flex justify-center items-center text-sm md:text-[10px]'>
                        <div
                            className={`attendance-border ${getColor(user.profile).bgColor === 'bg-green-950' ? 'attendance-border-green' : 'attendance-border-sky'} ${getColor(user.profile).textColor}`}
                            style={{ color: getColor(user.profile).textColor }}
                        >
                            {user.attend}%
                        </div>
                    </div> */}

                <div className="w-[50%] md:w-[14.2%] p-3 border-r border-zinc-500 text-sm md:text-[10px]">
                  {user.name}
                </div>

                <div className="w-[25%] md:w-[14.2%] p-3 ">
                  <div
                    className={`px-3 py-0 rounded-lg text-sm md:text-[8px] flex w-1/3 items-center ${
                      getColor(user.profile).bgColor
                    } ${getColor(user.profile).textColor}`}
                  >
                    {user.gift}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-[95%] ml-2  md:ml-5 mt-5 flex justify-between items-center pb-2 mb-20 md:mb-0">
            <p className="text-sm md:text-[12px]  ">Showing Rows: 1-10 of 20</p>
            <div className="flex flex-row gap-4">
              <KeyboardArrowLeftOutlinedIcon className="text-zinc-400" />
              <p className="text-zinc-400">1</p>
              <p className="text-zinc-400 bg-blue-500 w-[20px] h-[20px] flex items-center justify-center p-1 rounded-full">
                2
              </p>
            </div>
          </div>
        </Box>
        <Modal open={modalState} onClose={closeModal}>
          <AddAward
            handleClose={closeModal}
            refetch={fetchAwards}
            award={award}
          />
        </Modal>
      </div>
    </Box>
  );
};

export default AwardPage;
