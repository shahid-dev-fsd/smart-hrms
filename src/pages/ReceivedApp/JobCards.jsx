import React, { useState, useEffect, useCallback } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, Chip, CircularProgress, Modal, Pagination, Typography, TextField } from "@mui/material";
import axios from "axios";
import useQueryState from "../../hooks/useQueryState";
import { useMessage } from "../../components/Header";
import noRecord from "../../assets/initalScreen/recievedApplication.svg";
import AddLabels from "./AddLabels";
import Search from "../../components/Search";
import Overview from "./Overview";
import {  useMediaQuery, useTheme } from '@mui/material';

const JobCards = ({ labels }) => {
  const [jobApplications, setJobApplications] = useState(null);
  const [filters, setFilters] = useQueryState({
    search: "",
    sortBy: "createdAt",
    interviewSent: "",
    interviewed: "",
    offerSent: "",
    offerSigned: "",
    agreementSent: "",
    agreementSigned: "",
    employed: "",
    terminated: "",
    searchBy: "fullName",
    direction: -1,
    experience: null
  });
  const [pageNo, setPageNo] = useState(1);
  const [pageLimit, setPageLimit] = useState(0);
  const [selectedApplication, setSelectedApplication] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const { showSuccess, showError } = useMessage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const [deleteAppSelected, setDeleteAppSelected] = useState("");

  const fetchJobsApplication = useCallback(async () => {
    try {
      console.log("experience >", filters.experience)
      const response = await axios.get(
        `/hr/job-application?searchBy=${filters.searchBy}${(filters.experience == "null") ? "" : '&experience=' + filters.experience}&searchText=${filters.search}&sortBy=${filters.sortBy}&direction=${filters.direction}&page=${pageNo}&interviewSent=${filters.interviewSent}&interviewed=${filters.interviewed}&offerSent=${filters.offerSent}&offerSigned=${filters.offerSigned}&agreementSent=${filters.agreementSent}&agreementSigned=${filters.agreementSigned}&employed=${filters.employed}&terminated=${filters.terminated}`
      );
      //console.log("response.data",response.data);
      setJobApplications(response.data.applications);
      setPageLimit(response.data.pageData.totalPages);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  }, [
    filters.searchBy,
    filters.search,
    filters.sortBy,
    filters.direction,
    filters.interviewSent,
    filters.interviewed,
    filters.offerSent,
    filters.offerSigned,
    filters.agreementSent,
    filters.agreementSigned,
    filters.employed,
    filters.terminated,
    pageNo,
  ]);



  const handleShowMoreClick = (applicationId) => {
    // Navigate or expand application details
    console.log("Navigating to application details:", applicationId);
  };

  useEffect(() => {
    fetchJobsApplication();
  }, [fetchJobsApplication]);

  const handleDelete = useCallback(
    async function (statusId, ApplicationId) {
      try {
        const res = await axios.delete(
          `hr/job-application/status/${ApplicationId}?status=${statusId}`
        );
        const { success, errors } = res.data;

        if (!success) return showError(errors);

        showSuccess("label Delete successfully");
        fetchJobsApplication();
      } catch (e) {
        console.log(e);
      }
    },
    [showSuccess, showError, fetchJobsApplication]
  );

  const handleDeleteClick = application => {
    setSelectedApplication(application);
    setConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteAppSelected === selectedApplication.fullName) {
      setDeleteLoading(true);
      // axios.delete(`/hr/job-application/${selectedApplication._id}`)
      axios.delete(`/hr/employee/remove-records/${selectedApplication.userId}`)
        .then(() => {
          showSuccess('Application deleted successfully');
          // Close the confirmation dialog
          setConfirmDeleteDialogOpen(false);
          setDeleteLoading(false);
          // Refresh the application list (you can call fetchJobsApplication again)
          fetchJobsApplication();
        })
        .catch(error => {
          // Handle error (e.g., show an error message)
          console.error('Error deleting application:', error);

          showError('Cannot delete the application as offerLetter is sent already');
          // Close the confirmation dialog
          setDeleteLoading(false);
          setConfirmDeleteDialogOpen(false);
        });
    } else {
      alert("Applicant name does not match. Please try again.");
    }

  };


  const handleRest = () => {
    setFilters("search", "")
    setFilters("interviewSent", "")
    setFilters("offerSent", "")
    setFilters("offerSigned", "")
    setFilters("agreementSent", "")
    setFilters("agreementSigned", "")
    setFilters("employed", "")
    setFilters("terminated", "")
    setFilters("experience", null)

  }


  const handleCancelDelete = () => {
    setSelectedApplication({});
    setConfirmDeleteDialogOpen(false);
    setDeleteLoading(false);
  };

  const LabelTag = ({ label }) => {
    return (
      <Box
        sx={{ backgroundColor: "background.bond", color: "text.two" }}
        className="w-fit  p-1.5 bg-neutral-800 text-center text-[8px]"
      >
        {label}
      </Box>
    );
  };

  const selectFilters = filterName => {
    setFilters(filterName, filters[filterName] ? '' : '1');
  };

  return (
    <>
      <Box className="p-4 flex flex-col gap-4  rounded-lg"
        sx={{ backgroundColor: "background.view" }}
      >
        <h1 className="text-sm md:text-lg text-zinc-400">
          Job Application Overview
        </h1>
        <Overview filters={filters} handleRest={handleRest} selectFilters={selectFilters} />
      </Box>
      <Box
        className="flex flex-col  md:flex-row gap-4 justify-between"
        sx={{ my: 5 }}
      >
        <div>
          <Search
            placeholder="Search in Received Applications..."
            onChange={(e) => {
              const value = e.target.value;
              !(value.trim() === " ") && setFilters("search", value);
            }}
          />
        </div>

        <Pagination
          page={pageNo}
          onChange={(_, newPage) => setPageNo(newPage)}
          color="primary"
          count={pageLimit}
        />
      </Box>
      <div className="w-full flex flex-wrap justify-start gap-2 ">
        {jobApplications && jobApplications.length > 0 ? (
          <>
            {jobApplications.map((application, index) => (
              <Box
                key={index}
                className="w-full md:w-[48%] lg:w-[32%] xl:w-[24%] h-auto min-w-80  p-3 gap-4 rounded-lg mb-4"
                sx={{ backgroundColor: "background.view" }}
              >
                <div className="flex flex-row justify-between items-center">
                  <h1 onClick={() => { setFilters("search", application.jobTitle) }} className="text-[12px]">{application.jobTitle}</h1>
                  <p className="text-[8px] text-zinc-500">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-row justify-start gap-2 mt-2 items-center">
                  <p onClick={() => { setFilters("search", application.fullName) }} className="text-[10px] text-zinc-500">
                    <PersonIcon fontSize="small" className="text-zinc-300" />{" "}
                    {application.fullName}
                  </p>
                </div>
                <div className="flex flex-row gap-2 pt-2">
                  {/* <Link to={`/showmore/${application._id}`}> */}
                  {/* <Link to={`/showmore:${application._id}`}> */}
                  <Link to={`/jobApplicationDetail/${application._id}`}>
                    <button
                      className="flex text-zinc-200 py-[2px] px-1 bg-sky-500 rounded-sm text-[8px]"
                      onClick={() => handleShowMoreClick(application._id)}
                    >
                      Show more
                    </button>
                  </Link>
                  <button
                    className="flex text-zinc-200 py-[2px] px-2 bg-amber-500 rounded-sm text-[8px]"
                    onClick={() => handleDeleteClick(application)}
                  >
                    Delete
                  </button>
                </div>

                {/* <div className="flex items-center border-b border-solid border-zinc-50 w-[96%] ">
                  <div className="w-full relative ">
                    <select className="outline-none border-none w-full bg-transparent light:text-zinc-50 text-[12px] pr-6 appearance-none">
                      <option value="">Add Label</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                  </div>
                  <ArrowDropDownIcon className="text-zinc-500" />
                </div> */}

                <AddLabels
                  labels={labels}
                  id={application._id}
                  // status={status?.value}
                  fetchJobsApplication={fetchJobsApplication}
                />

                <Box sx={{ my: 1 }} className="flex flex-row flex-wrap gap-2 ">
                  {application.isInterviewDone ? (
                    <LabelTag label="Interviewed" />
                  ) : (
                    application.step === 1 && (
                      <LabelTag label="Interview sent" />
                    )
                  )}

                  {application.isOfferLetterSigned ? (
                    <LabelTag label="Offer Signed" />
                  ) : (
                    application.step === 2 && <LabelTag label="Offer sent" />
                  )}

                  {application.isAgreementSigned ? (
                    <LabelTag label="Agreements Signed" />
                  ) : (
                    application.step === 3 && (
                      <LabelTag label="Agreements sent" />
                    )
                  )}
                  {application.status === "Employed" && <LabelTag label="Employed" />}
                  {application.status === "Terminated" && <LabelTag label="Terminated" />}

                  {application.label &&
                    labels
                      ?.filter((label) =>
                        application.label.find(
                          (status) => status.status === label._id
                        )
                      )
                      .map((label) => (
                        // <Tooltip title='Click to see more'>
                        <Chip
                          variant="outlined"
                          size="small"
                          className=" bg-neutral-800 "
                          label={label.value}
                          onDelete={() =>
                            handleDelete(label._id, application._id)
                          }
                          sx={{
                            backgroundColor: "background.bond",
                            color: "text.two",
                            border: 0,
                            borderRadius: 0,
                            fontSize: "8px",
                          }}
                        />
                        // </Tooltip>
                      ))}
                </Box>

                {/* Example status labels */}
                {/* <Box
                  sx={{ backgroundColor: "background.bond", color: "text.two" }}
                  className="flex p-1 bg-neutral-800 text-[8px]"
                >
                  {application.isInterviewDone
                    ? "Interviewed"
                    : "Not Interviewed"}
                </Box>
                <Box
                  sx={{ backgroundColor: "background.bond", color: "text.two" }}
                  className="flex p-1 bg-neutral-800 text-[8px]"
                >
                  {application.isOfferLetterSigned
                    ? "Offer Signed"
                    : "Offer Not Signed"}
                </Box>
                <Box
                  sx={{ backgroundColor: "background.bond", color: "text.two" }}
                  className="flex p-1 bg-neutral-800 text-[8px]"
                >
                  {application.isAgreementSigned
                    ? "Agreement Signed"
                    : "Agreement Not Signed"}
                </Box> */}
              </Box>
            ))}
          </>
        ) : (
          <div className="flex w-full flex-col items-center justify-center  text-center">
            <div>
              <img
                src={noRecord}
                alt="No Record"
                className="mb-1"
                style={{ maxWidth: "60%", margin: "auto" }}
              />
            </div>
            <div>
              <h1
                className="text-2xl font-bold mb-2"
                style={{ fontSize: "36px" }}
              >
                No Job list Available
              </h1>
            </div>
            <div>
              <p className="mb-[50px]">
                {" "}
                You have not listed any availble job for application Click on
                add job now
                <br /> to start creating opportunites.
              </p>
            </div>
          </div>
        )}
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
              Delete {selectedApplication.fullName}
            </Typography>
            <Typography variant="body1" fontSize={13} marginBottom={3}>
              Are you sure you want to delete the job Application <span className="text-blue-500 font-bold" > {selectedApplication.fullName}  </span> ?
            </Typography>
            <Typography variant="body2" sx={{ color: "red" }} marginBottom={3}>
              This action cannot be undone.
            </Typography>
            <Typography variant="body2" fontSize={13}>
              Please type the job applicant full name to confirm:
            </Typography>
            <TextField
              placeholder="Enter Job Applicant Full Name"
              variant="outlined"
              fullWidth
              defaultValue={deleteAppSelected}
              onChange={(e) => setDeleteAppSelected(e.target.value)}
              inputProps={{
                style: { fontSize: '13px', },
              }}
            />

            <Box textAlign="right">
              <Button
                onClick={handleCancelDelete}
                color='primary'>
                {selectedApplication.step >= 1 ? 'Close' : 'Cancel'}
              </Button>
              {/* {selectedApplication.step >= 1 ? null : ( */}
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
      </div>
    </>
  );
};

export default JobCards;
